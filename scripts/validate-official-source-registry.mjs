#!/usr/bin/env node
// Validates structure only. This never fetches third-party sites or verifies claims.
// Usage: node scripts/validate-official-source-registry.mjs

import { readFileSync, readdirSync } from "node:fs";

const REGISTRY = "docs/operations/official-source-registry.csv";
const TOOLS = "src/content/tools";
const COLUMNS = [
  "slug", "tool_name",
  "jp_product_url", "jp_pricing_url", "jp_terms_url", "jp_help_url",
  "fallback_pricing_url", "fallback_terms_url", "fallback_help_url",
  "jp_evidence_status", "registry_updated_at", "last_content_verified_at", "notes"
];
const URL_FIELDS = COLUMNS.filter((x) => x.endsWith("_url"));
const JP_URL_FIELDS = URL_FIELDS.filter((x) => x.startsWith("jp_"));
const FALLBACK_FIELDS = URL_FIELDS.filter((x) => x.startsWith("fallback_"));
const STATUSES = new Set(["source_in_repo", "website_lookup", "jp_not_identified"]);
const errors = [];

function parseCsv(source) {
  const lines = [];
  let row = [], field = "", inQuotes = false;
  const normalized = source.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  for (let i = 0; i < normalized.length; i++) {
    const c = normalized[i];
    if (c === '"') {
      if (inQuotes && normalized[i + 1] === '"') {
        field += '"';
        i++;
      } else if (!inQuotes && field === "") {
        inQuotes = true;
      } else if (inQuotes) {
        inQuotes = false;
      } else {
        throw new Error("Unexpected quote in CSV at char " + i);
      }
    } else if (c === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if (c === "\n" && !inQuotes) {
      row.push(field);
      if (!(row.length === 1 && row[0] === "")) lines.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (inQuotes) throw new Error("Unclosed CSV quote");
  if (field !== "" || row.length) {
    row.push(field);
    lines.push(row);
  }
  return lines;
}

function validDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const date = new Date(s + "T00:00:00Z");
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === s;
}

function testUrl(url, label, slug) {
  if (!url) return;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || !parsed.hostname || parsed.username || parsed.password) {
      errors.push(slug + " " + label + ": must be a public HTTPS official URL");
    }
    if (/^(localhost|127\.|0\.0\.0\.0)/.test(parsed.hostname)) {
      errors.push(slug + " " + label + ": local URL is disallowed");
    }
  } catch {
    errors.push(slug + " " + label + ": invalid URL " + url);
  }
}

let rows;
try {
  rows = parseCsv(readFileSync(REGISTRY, "utf8"));
} catch (err) {
  console.error("REGISTRY FAIL: " + err.message);
  process.exit(1);
}
if (!rows.length || rows[0].join(",") !== COLUMNS.join(",")) {
  errors.push("Unexpected columns. Header must exactly match registry schema.");
}
const actualSlugs = new Set(
  readdirSync(TOOLS).filter((x) => x.endsWith(".md")).map((x) => x.slice(0, -3))
);
const seen = new Set();

for (let i = 1; i < rows.length; i++) {
  const values = rows[i];
  if (values.length !== COLUMNS.length) {
    errors.push("Row " + (i + 1) + " has " + values.length + " cells (want " + COLUMNS.length + ")");
    continue;
  }
  const row = Object.fromEntries(COLUMNS.map((key, j) => [key, values[j].trim()]));
  const slug = row.slug || "(missing slug at row " + (i + 1) + ")";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push(slug + " has invalid slug");
  if (seen.has(slug)) errors.push("Duplicate slug: " + slug);
  seen.add(slug);
  if (!row.tool_name) errors.push(slug + " tool_name missing");
  if (!STATUSES.has(row.jp_evidence_status)) errors.push(slug + " invalid jp_evidence_status");
  if (!validDate(row.registry_updated_at)) errors.push(slug + " registry_updated_at invalid");
  if (row.last_content_verified_at && !validDate(row.last_content_verified_at)) {
    errors.push(slug + " last_content_verified_at invalid");
  }
  for (const key of URL_FIELDS) testUrl(row[key], key, slug);
  const hasJapaneseSource = JP_URL_FIELDS.some((key) => row[key]);
  if (row.jp_evidence_status === "jp_not_identified" && hasJapaneseSource) {
    errors.push(slug + " cannot be jp_not_identified while JP URLs exist");
  }
  if (row.jp_evidence_status !== "jp_not_identified" && !hasJapaneseSource) {
    errors.push(slug + " JP source status is set but all JP URLs are empty");
  }
  if (!FALLBACK_FIELDS.some((key) => row[key])) {
    errors.push(slug + " must have at least one fallback official source");
  }
  if (!row.notes) errors.push(slug + " missing contextual notes");
  if (!actualSlugs.has(slug)) errors.push(slug + " is not in " + TOOLS);
}
for (const slug of actualSlugs) {
  if (!seen.has(slug)) errors.push("Missing source-registry row for tool: " + slug);
}
if (errors.length) {
  console.error("REGISTRY FAIL: " + errors.length + " issues");
  for (const e of errors) console.error("- " + e);
  process.exit(1);
}
const jpCount = rows.slice(1).filter((r) => r[COLUMNS.indexOf("jp_evidence_status")] !== "jp_not_identified").length;
console.log("REGISTRY PASS: " + seen.size + " tools exactly match " + actualSlugs.size + " content files; " + jpCount + " with identified JP references; structural URL/date checks passed.");
console.log("NOTE: This does NOT fetch URLs or verify prices, terms, UI language, or licenses.");
