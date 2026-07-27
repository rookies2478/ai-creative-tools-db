// Shared library for GSC manual ZIP import: minimal ZIP reader (store/deflate,
// no external dependency), CSV dataset detection, normalization, and manifest
// construction. Used by scripts/import-gsc-manual-export.mjs and its tests.

import { inflateRawSync } from "node:zlib";
import { createHash } from "node:crypto";

export const MAX_ENTRIES = 64;
export const MAX_ENTRY_UNCOMPRESSED_BYTES = 20 * 1024 * 1024; // 20 MB per entry
export const MAX_TOTAL_UNCOMPRESSED_BYTES = 100 * 1024 * 1024; // 100 MB total

export class ZipSafetyError extends Error {}

// ---------------------------------------------------------------------------
// Minimal ZIP reader (End Of Central Directory + Central Directory + Local
// File Header). Supports compression method 0 (store) and 8 (deflate).
// ---------------------------------------------------------------------------

function findEOCD(buf) {
  const sig = 0x06054b50;
  const minLen = 22;
  for (let i = buf.length - minLen; i >= 0 && i >= buf.length - minLen - 65557; i--) {
    if (buf.readUInt32LE(i) === sig) return i;
  }
  throw new ZipSafetyError("End of Central Directory record not found (not a valid ZIP)");
}

export function readZipEntries(buf) {
  const eocdOffset = findEOCD(buf);
  const totalEntries = buf.readUInt16LE(eocdOffset + 10);
  const cdSize = buf.readUInt32LE(eocdOffset + 12);
  const cdOffset = buf.readUInt32LE(eocdOffset + 16);

  if (totalEntries > MAX_ENTRIES) {
    throw new ZipSafetyError(
      `Archive has ${totalEntries} entries, exceeds MAX_ENTRIES=${MAX_ENTRIES}`
    );
  }
  if (cdOffset + cdSize > buf.length) {
    throw new ZipSafetyError("Central directory extends beyond file bounds");
  }

  const entries = [];
  let ptr = cdOffset;
  let totalUncompressed = 0;

  for (let i = 0; i < totalEntries; i++) {
    const sig = buf.readUInt32LE(ptr);
    if (sig !== 0x02014b50) {
      throw new ZipSafetyError("Corrupt central directory record");
    }
    const versionMadeBy = buf.readUInt16LE(ptr + 4);
    const generalFlag = buf.readUInt16LE(ptr + 8);
    const method = buf.readUInt16LE(ptr + 10);
    const compressedSize = buf.readUInt32LE(ptr + 20);
    const uncompressedSize = buf.readUInt32LE(ptr + 24);
    const nameLen = buf.readUInt16LE(ptr + 28);
    const extraLen = buf.readUInt16LE(ptr + 30);
    const commentLen = buf.readUInt16LE(ptr + 32);
    const externalAttrs = buf.readUInt32LE(ptr + 38);
    const localHeaderOffset = buf.readUInt32LE(ptr + 42);
    const nameBytes = buf.subarray(ptr + 46, ptr + 46 + nameLen);
    const isUtf8 = (generalFlag & 0x0800) !== 0;
    const rawName = isUtf8
      ? nameBytes.toString("utf8")
      : nameBytes.toString("binary");

    if (uncompressedSize > MAX_ENTRY_UNCOMPRESSED_BYTES) {
      throw new ZipSafetyError(
        `Entry "${rawName}" declares ${uncompressedSize} bytes, exceeds MAX_ENTRY_UNCOMPRESSED_BYTES`
      );
    }
    totalUncompressed += uncompressedSize;
    if (totalUncompressed > MAX_TOTAL_UNCOMPRESSED_BYTES) {
      throw new ZipSafetyError(
        "Archive declared uncompressed total exceeds MAX_TOTAL_UNCOMPRESSED_BYTES"
      );
    }

    assertSafeEntryName(rawName);

    // Unix symlink bit: upper 16 bits of externalAttrs hold st_mode when
    // versionMadeBy high byte indicates a unix host (3).
    const hostOS = versionMadeBy >> 8;
    if (hostOS === 3) {
      const unixMode = externalAttrs >>> 16;
      const S_IFLNK = 0xa000;
      if ((unixMode & 0xf000) === S_IFLNK) {
        throw new ZipSafetyError(`Entry "${rawName}" is a symlink, rejected`);
      }
    }

    entries.push({
      name: rawName,
      method,
      compressedSize,
      uncompressedSize,
      localHeaderOffset,
      isDirectory: rawName.endsWith("/"),
    });

    ptr += 46 + nameLen + extraLen + commentLen;
  }

  return entries.map((e) => ({
    ...e,
    read: () => readEntryData(buf, e),
  }));
}

function assertSafeEntryName(name) {
  if (name.startsWith("/") || /^[A-Za-z]:/.test(name)) {
    throw new ZipSafetyError(`Entry "${name}" uses an absolute path, rejected`);
  }
  const normalized = name.replace(/\\/g, "/");
  const segments = normalized.split("/");
  if (segments.some((s) => s === "..")) {
    throw new ZipSafetyError(`Entry "${name}" contains path traversal ("../"), rejected`);
  }
}

function readEntryData(buf, entry) {
  const off = entry.localHeaderOffset;
  const sig = buf.readUInt32LE(off);
  if (sig !== 0x04034b50) {
    throw new ZipSafetyError("Corrupt local file header");
  }
  const nameLen = buf.readUInt16LE(off + 26);
  const extraLen = buf.readUInt16LE(off + 28);
  const dataStart = off + 30 + nameLen + extraLen;
  const dataEnd = dataStart + entry.compressedSize;
  if (dataEnd > buf.length) {
    throw new ZipSafetyError("Entry data extends beyond file bounds");
  }
  const raw = buf.subarray(dataStart, dataEnd);

  if (entry.method === 0) {
    return Buffer.from(raw);
  }
  if (entry.method === 8) {
    const out = inflateRawSync(raw);
    if (out.length > MAX_ENTRY_UNCOMPRESSED_BYTES) {
      throw new ZipSafetyError(
        `Entry "${entry.name}" inflated beyond MAX_ENTRY_UNCOMPRESSED_BYTES`
      );
    }
    return out;
  }
  throw new ZipSafetyError(
    `Entry "${entry.name}" uses unsupported compression method ${entry.method}`
  );
}

// ---------------------------------------------------------------------------
// Minimal ZIP writer (store method only) — used by tests to build fixtures.
// ---------------------------------------------------------------------------

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      table[n] = c >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export function writeStoreZip(files) {
  // files: [{ name: string, content: Buffer }]
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const f of files) {
    const nameBuf = Buffer.from(f.name, "utf8");
    const content = f.content;
    const crc = crc32(content);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0x0800, 6); // UTF-8 flag
    local.writeUInt16LE(0, 8); // method: store
    local.writeUInt16LE(0, 10); // mod time
    local.writeUInt16LE(0, 12); // mod date
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(content.length, 18);
    local.writeUInt32LE(content.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);

    localParts.push(local, nameBuf, content);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4); // version made by (host=0)
    central.writeUInt16LE(20, 6); // version needed
    central.writeUInt16LE(0x0800, 8); // UTF-8 flag
    central.writeUInt16LE(0, 10); // method: store
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(content.length, 20);
    central.writeUInt32LE(content.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);

    centralParts.push(central, nameBuf);

    offset += local.length + nameBuf.length + content.length;
  }

  const centralStart = offset;
  const centralBuf = Buffer.concat(centralParts);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(centralBuf.length, 12);
  eocd.writeUInt32LE(centralStart, 16);
  eocd.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, centralBuf, eocd]);
}

export function sha256Hex(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

// ---------------------------------------------------------------------------
// Dataset detection (header-first) and CSV parsing.
// ---------------------------------------------------------------------------

export const DATASET_HEADER_SIGNATURES = {
  daily: ["日付", "クリック数", "表示回数", "CTR", "掲載順位"],
  queries: ["上位のクエリ", "クリック数", "表示回数", "CTR", "掲載順位"],
  pages: ["上位のページ", "クリック数", "表示回数", "CTR", "掲載順位"],
  countries: ["国", "クリック数", "表示回数", "CTR", "掲載順位"],
  devices: ["デバイス", "クリック数", "表示回数", "CTR", "掲載順位"],
  "search-appearance": ["検索での見え方", "クリック数", "表示回数", "CTR", "掲載順位"],
  filters: ["フィルタ", "値"],
};

const OUTPUT_HEADERS = {
  daily: ["date", "clicks", "impressions", "ctr", "position"],
  queries: ["query", "clicks", "impressions", "ctr", "position"],
  pages: ["page", "clicks", "impressions", "ctr", "position"],
  countries: ["country", "clicks", "impressions", "ctr", "position"],
  devices: ["device", "clicks", "impressions", "ctr", "position"],
  "search-appearance": ["search_appearance", "clicks", "impressions", "ctr", "position"],
};

const REQUIRED_DATASETS = [
  "daily",
  "queries",
  "pages",
  "countries",
  "devices",
  "search-appearance",
  "filters",
];
const OPTIONAL_DATASETS = ["totals", "query-pages", "sitemaps"];

export { REQUIRED_DATASETS, OPTIONAL_DATASETS, OUTPUT_HEADERS };

export function decodeCsvBuffer(buf) {
  let b = buf;
  let bom = false;
  if (b.length >= 3 && b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf) {
    b = b.subarray(3);
    bom = true;
  }
  const text = b.toString("utf8");
  // Detect decode failure: presence of the U+FFFD replacement character
  // that wasn't already in the source bytes.
  if (text.includes("�")) {
    return { ok: false, bom, text: null };
  }
  return { ok: true, bom, text };
}

export function parseCsvLine(line) {
  // Minimal RFC4180-ish CSV split: handles quoted fields with embedded commas.
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

export function parseCsvText(text) {
  const lines = text.split(/\r?\n/).filter((l, idx, arr) => !(idx === arr.length - 1 && l === ""));
  return lines.map(parseCsvLine);
}

export function detectDataset(rows) {
  if (rows.length === 0) return null;
  const header = rows[0].map((h) => h.trim());
  for (const [key, sig] of Object.entries(DATASET_HEADER_SIGNATURES)) {
    if (sig.length <= header.length && sig.every((h, i) => header[i] === h)) {
      return key;
    }
  }
  return null;
}

export function parseCtr(raw) {
  const s = String(raw).trim();
  if (s === "") return { value: null, error: null };
  if (s.endsWith("%")) {
    const num = Number(s.slice(0, -1));
    if (Number.isNaN(num)) return { value: null, error: `invalid CTR percent value: "${raw}"` };
    return { value: num / 100, error: null };
  }
  const num = Number(s);
  if (Number.isNaN(num)) return { value: null, error: `invalid CTR value: "${raw}"` };
  if (num > 1) return { value: num / 100, error: null };
  return { value: num, error: null };
}

export function parseNumber(raw, field) {
  const s = String(raw).trim();
  if (s === "") return { value: null, error: null };
  const num = Number(s);
  if (Number.isNaN(num)) return { value: null, error: `invalid ${field} value: "${raw}"` };
  return { value: num, error: null };
}

export function normalizeMetricRows(datasetKey, rows) {
  const [, ...dataRows] = rows;
  const outHeader = OUTPUT_HEADERS[datasetKey];
  const normalized = [];
  const warnings = [];
  const errors = [];

  for (const row of dataRows) {
    if (row.length === 1 && row[0].trim() === "") continue; // skip blank trailing line
    const [label, clicksRaw, impressionsRaw, ctrRaw, positionRaw] = row;
    const clicks = parseNumber(clicksRaw, "clicks");
    const impressions = parseNumber(impressionsRaw, "impressions");
    const ctr = parseCtr(ctrRaw);
    const position = parseNumber(positionRaw, "position");

    for (const r of [clicks, impressions, ctr, position]) {
      if (r.error) errors.push(r.error);
    }

    normalized.push({
      label,
      clicks: clicks.value ?? 0,
      impressions: impressions.value ?? 0,
      ctr: ctr.value,
      position: position.value,
    });
  }

  return { header: outHeader, rows: normalized, warnings, errors };
}

export function rowsToCsv(header, rows, labelField) {
  const lines = [header.join(",")];
  for (const r of rows) {
    const fields = [
      csvEscape(r.label),
      r.clicks ?? "",
      r.impressions ?? "",
      r.ctr === null || r.ctr === undefined ? "" : r.ctr,
      r.position === null || r.position === undefined ? "" : r.position,
    ];
    lines.push(fields.join(","));
  }
  return lines.join("\n") + "\n";
}

function csvEscape(v) {
  const s = String(v ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

// ---------------------------------------------------------------------------
// totals derivation (impression-weighted, not simple average).
// ---------------------------------------------------------------------------

export function deriveTotals(dailyRows) {
  let clicks = 0;
  let impressions = 0;
  let weightedPositionSum = 0;
  const warnings = [];

  for (const r of dailyRows) {
    clicks += r.clicks || 0;
    impressions += r.impressions || 0;
    if (r.position !== null && r.position !== undefined && r.impressions) {
      weightedPositionSum += r.position * r.impressions;
    }
  }

  let ctr = 0;
  let position = null;
  if (impressions > 0) {
    ctr = clicks / impressions;
    position = weightedPositionSum / impressions;
  } else {
    warnings.push("impressions total is 0; ctr set to 0 and position left null");
  }

  return {
    header: ["clicks", "impressions", "ctr", "position"],
    row: { clicks, impressions, ctr, position },
    warnings,
  };
}

// ---------------------------------------------------------------------------
// filters.csv parsing (key,value pairs, not a metric table).
// ---------------------------------------------------------------------------

const FILTER_KEY_MAP = {
  検索タイプ: "search_type",
  期間: "period",
  ページ: "page",
  クエリ: "query",
  国: "country",
  デバイス: "device",
  検索での見え方: "search_appearance",
};

export function parseFilters(rows) {
  const [, ...dataRows] = rows;
  const result = {
    search_type: null,
    period: null,
    page: null,
    query: null,
    country: null,
    device: null,
    search_appearance: null,
  };
  for (const row of dataRows) {
    if (row.length < 2) continue;
    const [rawKey, rawValue] = row;
    const key = FILTER_KEY_MAP[rawKey.trim()];
    if (key) {
      result[key] = rawValue.trim().replace(/^\+/, "");
    }
  }
  return result;
}
