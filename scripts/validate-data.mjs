#!/usr/bin/env node
//
// validate:data — src/content/tools/*.md のfrontmatterに対するデータ品質チェック。
//
// 対象: src/content/tools/*.md のfrontmatterのみ（本文・DB以外・ページHTMLは対象外）。
// ERROR   = 機械的に違反と確定できる。exit code 1の原因になる。
// WARNING = 品質上の懸念だが誤りと断定できない。exit codeには影響しない。
// VERIFY  = 人間・公式確認が必要で、このスクリプトでは確定できない。exit codeには影響しない。
//
// このスクリプトは:
// - 外部通信を一切行わない（HTTP到達性・URL生存確認はしない）。
// - 公式情報（料金・規約・対応状況）の真偽は判定しない。
// - src/content/tools/*.md や src/content/config.ts を自動修正しない。
// - `astro build` の代替ではない（型・enum違反はbuildでも一部検出されるが、
//   本スクリプトは未知フィールド・日付整合性・重複・slug形式など、
//   build単体では検出されない項目を対象とする）。

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const TOOLS_DIR = "src/content/tools";

const args = process.argv.slice(2);
if (args.includes("--help")) {
  console.log(`validate:data - src/content/tools/*.md のデータ品質チェック

Usage: npm run validate:data

ERROR   : 違反確定。exit code 1の原因。
WARNING : 品質懸念（exit codeに影響しない）。
VERIFY  : 人間・公式確認が必要（exit codeに影響しない）。

外部通信なし。DB自動修正なし。astro buildの代替ではない。`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Minimal indentation-based YAML subset parser
// (supports: scalars, quoted strings, block mappings, block sequences of
//  scalars, block sequences of mapping-objects, nested mappings)
// ---------------------------------------------------------------------------

function stripQuotes(raw) {
  const s = raw.trim();
  if (s.length >= 2 && s[0] === '"' && s[s.length - 1] === '"') {
    return s
      .slice(1, -1)
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  if (s.length >= 2 && s[0] === "'" && s[s.length - 1] === "'") {
    return s.slice(1, -1).replace(/''/g, "'");
  }
  return s;
}

function parseScalar(raw) {
  const s = raw.trim();
  if (s === "") return null;
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null" || s === "~") return null;
  if (s === "[]") return [];
  if (s === "{}") return {};
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  return stripQuotes(s);
}

function indentOf(line) {
  const m = line.match(/^ */);
  return m[0].length;
}

// lines: array of raw (non-empty, non-comment) lines with original indentation
function parseBlock(lines, pos, indent) {
  if (pos.i >= lines.length) return {};
  const first = lines[pos.i];
  if (indentOf(first) < indent) return {};

  const isSeq = /^ *-(\s|$)/.test(first);
  if (isSeq) {
    const result = [];
    while (pos.i < lines.length) {
      const line = lines[pos.i];
      const ind = indentOf(line);
      if (ind < indent) break;
      if (ind > indent) break; // shouldn't happen at well-formed input
      if (!/^ *-(\s|$)/.test(line)) break;

      const afterDash = line.replace(/^ *-\s?/, "");
      const dashCol = line.indexOf("-");
      const childIndent = dashCol + 2;

      if (afterDash === "") {
        pos.i++;
        const child = parseBlock(lines, pos, childIndent);
        result.push(child);
        continue;
      }

      const kvMatch = afterDash.match(/^([A-Za-z0-9_]+):\s?(.*)$/);
      const looksLikeScalar =
        afterDash.startsWith('"') || afterDash.startsWith("'");

      if (!looksLikeScalar && kvMatch) {
        // object item starting inline: "- key: value"
        const obj = {};
        const key = kvMatch[1];
        const rest = kvMatch[2];
        if (rest.trim() === "") {
          pos.i++;
          obj[key] = parseBlock(lines, pos, childIndent + 2);
        } else {
          obj[key] = parseScalar(rest);
          pos.i++;
        }
        // continue reading sibling keys at childIndent
        while (pos.i < lines.length) {
          const l2 = lines[pos.i];
          const ind2 = indentOf(l2);
          if (ind2 !== childIndent) break;
          const kv2 = l2.trim().match(/^([A-Za-z0-9_]+):\s?(.*)$/);
          if (!kv2) break;
          const k2 = kv2[1];
          const r2 = kv2[2];
          if (r2.trim() === "") {
            pos.i++;
            obj[k2] = parseBlock(lines, pos, ind2 + 2);
          } else {
            obj[k2] = parseScalar(r2);
            pos.i++;
          }
        }
        result.push(obj);
      } else {
        result.push(parseScalar(afterDash));
        pos.i++;
      }
    }
    return result;
  }

  // mapping
  const result = {};
  while (pos.i < lines.length) {
    const line = lines[pos.i];
    const ind = indentOf(line);
    if (ind < indent) break;
    if (ind > indent) break;
    const kv = line.trim().match(/^([A-Za-z0-9_]+):\s?(.*)$/);
    if (!kv) break;
    const key = kv[1];
    const rest = kv[2];
    if (rest.trim() === "") {
      pos.i++;
      if (
        pos.i < lines.length &&
        indentOf(lines[pos.i]) > indent
      ) {
        result[key] = parseBlock(lines, pos, indentOf(lines[pos.i]));
      } else {
        result[key] = null;
      }
    } else {
      result[key] = parseScalar(rest);
      pos.i++;
    }
  }
  return result;
}

function splitFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;
  return match[1];
}

function parseFrontmatter(yamlText) {
  const rawLines = yamlText.split(/\r?\n/);
  const lines = [];
  for (const l of rawLines) {
    if (l.trim() === "" || l.trim().startsWith("#")) continue;
    lines.push(l);
  }
  const pos = { i: 0 };
  return parseBlock(lines, pos, 0);
}

// ---------------------------------------------------------------------------
// Schema knowledge (derived from src/content/config.ts, tools collection)
// ---------------------------------------------------------------------------

const CATEGORY_ENUM = ["image", "video", "both"];
const COMMERCIAL_USE_ENUM = ["ok", "paid-only", "limited", "no", "unknown"];
const CURRENCY_ENUM = ["JPY", "USD", "EUR", "unknown"];
const WATERMARK_ENUM = ["yes", "no", "limited", "unknown"];
const PRICING_MODEL_ENUM = [
  "free",
  "subscription",
  "credit",
  "subscription_credit",
  "local_free",
  "unknown",
];
const PLATFORM_ENUM = ["web", "discord", "ios", "android", "desktop", "api", "local"];
const USE_CASE_ENUM = [
  "sns",
  "blog",
  "ad_creative",
  "illustration",
  "photo_real",
  "product_image",
  "design",
  "video",
  "youtube",
  "business",
];
const SOURCE_REF_TYPE_ENUM = [
  "official",
  "pricing",
  "terms",
  "help",
  "policy",
  "commercial",
  "docs",
];
const DIFFICULTY_ENUM = ["beginner", "intermediate", "advanced", "unknown"];

// Fields required by src/content/config.ts (no .optional())
const REQUIRED_FIELDS = [
  "name",
  "shortDescription",
  "category",
  "officialUrl",
  "freePlan",
  "commercialUse",
  "commercialUseNote",
  "japaneseUi",
  "japanesePrompt",
  "watermark",
  "bestFor",
  "strengths",
  "weaknesses",
  "lastReviewed",
  "nextReviewDue",
  "sources",
];

// All schema-defined top-level keys (required + optional)
const SCHEMA_FIELDS = new Set([
  ...REQUIRED_FIELDS,
  "affiliateUrl",
  "lowestPaidPlan",
  "currency",
  "verifiedAt",
  "officialSourceUrl",
  "pricingModel",
  "freePlanNote",
  "paidPlanNote",
  "platforms",
  "signupRequired",
  "features",
  "watermarkCondition",
  "japaneseDocs",
  "useCases",
  "limitations",
  "faqs",
  "reviewed",
  "sourceRefs",
  "notBestFor",
  "difficulty",
  "pricingDecision",
  "usagePolicy",
  "capabilityFit",
  "japanBilling",
  "conversionGuide",
]);

// Schema-external fields intentionally used across multiple repository files
// (documented allowlist — not defined in src/content/config.ts, but observed
//  as deliberate, repeated operational extensions rather than typos):
//   - needsReview        : used in 8 files, boolean or "yes"/"no" review flag
//   - notFor             : used in 6 files (video tools), distinct in meaning
//                          from notBestFor (usage-caution list vs. alt-tool list)
//   - pricingSourceNote  : used in 14 files, free-text pricing source note
//   - pricingSourceUrl   : used in 14 files, URL of the pricing source
//   - pricingStatus      : used in 22 files, enum-like pricing confirmation state
const ALLOWED_EXTENSION_FIELDS = new Set([
  "needsReview",
  "notFor",
  "pricingSourceNote",
  "pricingSourceUrl",
  "pricingStatus",
]);
const PRICING_STATUS_ENUM = [
  "confirmed",
  "no_fixed_price",
  "partial",
  "service_changed",
  "unconfirmed",
];

// ---------------------------------------------------------------------------
// Violation collection
// ---------------------------------------------------------------------------

const violations = []; // { level: ERROR|WARNING|VERIFY, file, rule, field, value, expected }

function report(level, file, rule, extra = {}) {
  violations.push({ level, file, rule, ...extra });
}

function isUrlLike(v) {
  if (typeof v !== "string") return false;
  if (/\s/.test(v)) return false;
  if (/^javascript:/i.test(v)) return false;
  if (/^data:/i.test(v)) return false;
  return /^https?:\/\/[^\s]+$/i.test(v);
}

function isDateString(v) {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
}

function isValidCalendarDate(v) {
  if (!isDateString(v)) return false;
  const [y, m, d] = v.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

function checkEnum(file, field, value, allowed, ruleName = "invalid-enum") {
  if (value === undefined) return;
  if (!allowed.includes(value)) {
    report("ERROR", file, ruleName, {
      field,
      value,
      expected: allowed.join(" | "),
    });
  }
}

function checkTriState(file, field, value) {
  if (value === undefined) return;
  if (value !== true && value !== false && value !== "partial" && value !== "unknown") {
    report("ERROR", file, "invalid-tri-state", {
      field,
      value,
      expected: "true | false | 'partial' | 'unknown'",
    });
  }
}

function checkStringArray(file, field, value, { requireNonEmpty } = {}) {
  if (value === undefined) return;
  if (!Array.isArray(value)) {
    report("ERROR", file, "invalid-type", { field, value, expected: "array" });
    return;
  }
  if (requireNonEmpty && value.length === 0) {
    report("WARNING", file, "empty-array", { field });
  }
  value.forEach((item, idx) => {
    if (typeof item !== "string" || item.trim() === "") {
      report("ERROR", file, "invalid-array-item", {
        field: `${field}[${idx}]`,
        value: item,
        expected: "non-empty string",
      });
    }
  });
}

function checkEnumArray(file, field, value, allowed) {
  if (value === undefined) return;
  if (!Array.isArray(value)) {
    report("ERROR", file, "invalid-type", { field, value, expected: "array" });
    return;
  }
  value.forEach((item, idx) => {
    if (!allowed.includes(item)) {
      report("ERROR", file, "invalid-enum", {
        field: `${field}[${idx}]`,
        value: item,
        expected: allowed.join(" | "),
      });
    }
  });
}

function checkUrl(file, field, value, required = false) {
  if (value === undefined) {
    return;
  }
  if (typeof value !== "string" || value.trim() === "") {
    report("ERROR", file, "invalid-url", { field, value, expected: "http(s) URL" });
    return;
  }
  if (!isUrlLike(value)) {
    report("ERROR", file, "invalid-url", { field, value, expected: "http(s) URL" });
  }
}

function checkDate(file, field, value, { required = false } = {}) {
  if (value === undefined) {
    if (required) report("ERROR", file, "missing-required-field", { field });
    return;
  }
  if (!isValidCalendarDate(value)) {
    report("ERROR", file, "invalid-date", {
      field,
      value,
      expected: "YYYY-MM-DD (calendar-valid)",
    });
  }
}

function checkBoolean(file, field, value) {
  if (value === undefined) return;
  if (typeof value !== "boolean") {
    report("ERROR", file, "invalid-type", { field, value, expected: "boolean" });
  }
}

function checkNonEmptyString(file, field, value, required) {
  if (value === undefined || value === null) {
    if (required) report("ERROR", file, "missing-required-field", { field });
    return;
  }
  if (typeof value !== "string" || value.trim() === "") {
    report("ERROR", file, "empty-required-value", { field, value });
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  let files;
  try {
    files = readdirSync(TOOLS_DIR).filter((f) => f.endsWith(".md"));
  } catch (e) {
    console.error(`validate:data FAILED\n  - ${TOOLS_DIR} を読み込めません (${e.message})`);
    process.exit(1);
  }

  const slugMap = new Map(); // lowercased slug -> [filenames]

  for (const fname of files) {
    const filePath = `${TOOLS_DIR}/${fname}`;
    const slug = fname.replace(/\.md$/, "");

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
      report("ERROR", filePath, "invalid-slug-format", {
        field: "filename",
        value: slug,
        expected: "lowercase kebab-case (a-z 0-9 and hyphen only)",
      });
    }

    const slugKey = slug.toLowerCase();
    if (!slugMap.has(slugKey)) slugMap.set(slugKey, []);
    slugMap.get(slugKey).push(filePath);

    let raw;
    try {
      raw = readFileSync(join(process.cwd(), filePath), "utf8");
    } catch (e) {
      report("ERROR", filePath, "unreadable-file", { value: e.message });
      continue;
    }

    if (raw.trim() === "") {
      report("ERROR", filePath, "empty-file");
      continue;
    }

    const yamlText = splitFrontmatter(raw);
    if (yamlText === null) {
      report("ERROR", filePath, "missing-frontmatter");
      continue;
    }

    let data;
    try {
      data = parseFrontmatter(yamlText);
    } catch (e) {
      report("ERROR", filePath, "unparsable-frontmatter", { value: e.message });
      continue;
    }

    validateToolEntry(filePath, data);
  }

  for (const [slugKey, filesForSlug] of slugMap.entries()) {
    if (filesForSlug.length > 1) {
      for (const f of filesForSlug) {
        report("ERROR", f, "duplicate-slug", {
          field: "filename",
          value: slugKey,
          expected: "unique slug across src/content/tools/",
        });
      }
    }
  }

  printReportAndExit(files.length);
}

function validateToolEntry(file, data) {
  // A. Unknown / allowed-extension key detection (top-level only)
  for (const key of Object.keys(data)) {
    if (!SCHEMA_FIELDS.has(key) && !ALLOWED_EXTENSION_FIELDS.has(key)) {
      report("ERROR", file, "unknown-field", { field: key, value: data[key] });
    }
  }

  // B. Required fields
  checkNonEmptyString(file, "name", data.name, true);
  checkNonEmptyString(file, "shortDescription", data.shortDescription, true);
  checkNonEmptyString(file, "commercialUseNote", data.commercialUseNote, true);

  if (data.category === undefined) {
    report("ERROR", file, "missing-required-field", { field: "category" });
  } else {
    checkEnum(file, "category", data.category, CATEGORY_ENUM);
  }

  if (data.officialUrl === undefined) {
    report("ERROR", file, "missing-required-field", { field: "officialUrl" });
  } else {
    checkUrl(file, "officialUrl", data.officialUrl);
  }

  if (data.freePlan === undefined) {
    report("ERROR", file, "missing-required-field", { field: "freePlan" });
  } else if (
    data.freePlan !== true &&
    data.freePlan !== false &&
    data.freePlan !== "limited" &&
    data.freePlan !== "unknown"
  ) {
    report("ERROR", file, "invalid-enum", {
      field: "freePlan",
      value: data.freePlan,
      expected: "true | false | 'limited' | 'unknown'",
    });
  }

  if (data.commercialUse === undefined) {
    report("ERROR", file, "missing-required-field", { field: "commercialUse" });
  } else {
    checkEnum(file, "commercialUse", data.commercialUse, COMMERCIAL_USE_ENUM);
  }

  if (data.japaneseUi === undefined) {
    report("ERROR", file, "missing-required-field", { field: "japaneseUi" });
  } else {
    checkTriState(file, "japaneseUi", data.japaneseUi);
  }

  if (data.japanesePrompt === undefined) {
    report("ERROR", file, "missing-required-field", { field: "japanesePrompt" });
  } else {
    checkTriState(file, "japanesePrompt", data.japanesePrompt);
  }

  if (data.watermark === undefined) {
    report("ERROR", file, "missing-required-field", { field: "watermark" });
  } else {
    checkEnum(file, "watermark", data.watermark, WATERMARK_ENUM);
  }

  if (data.bestFor === undefined) {
    report("ERROR", file, "missing-required-field", { field: "bestFor" });
  } else {
    checkStringArray(file, "bestFor", data.bestFor, { requireNonEmpty: true });
  }
  if (data.strengths === undefined) {
    report("ERROR", file, "missing-required-field", { field: "strengths" });
  } else {
    checkStringArray(file, "strengths", data.strengths, { requireNonEmpty: true });
  }
  if (data.weaknesses === undefined) {
    report("ERROR", file, "missing-required-field", { field: "weaknesses" });
  } else {
    checkStringArray(file, "weaknesses", data.weaknesses, { requireNonEmpty: true });
  }

  checkDate(file, "lastReviewed", data.lastReviewed, { required: true });
  checkDate(file, "nextReviewDue", data.nextReviewDue, { required: true });

  if (
    isValidCalendarDate(data.lastReviewed) &&
    isValidCalendarDate(data.nextReviewDue) &&
    data.lastReviewed > data.nextReviewDue
  ) {
    report("ERROR", file, "date-order-violation", {
      field: "lastReviewed/nextReviewDue",
      value: `${data.lastReviewed} > ${data.nextReviewDue}`,
      expected: "lastReviewed <= nextReviewDue",
    });
  }

  if (isValidCalendarDate(data.lastReviewed)) {
    const today = new Date().toISOString().slice(0, 10);
    if (data.lastReviewed > today) {
      report("ERROR", file, "future-date", { field: "lastReviewed", value: data.lastReviewed });
    }
  }
  if (isValidCalendarDate(data.nextReviewDue)) {
    const today = new Date().toISOString().slice(0, 10);
    if (data.nextReviewDue < today) {
      report("WARNING", file, "review-overdue", { field: "nextReviewDue", value: data.nextReviewDue });
    }
  }

  if (data.sources === undefined) {
    report("ERROR", file, "missing-required-field", { field: "sources" });
  } else if (!Array.isArray(data.sources)) {
    report("ERROR", file, "invalid-type", { field: "sources", expected: "array" });
  } else {
    if (data.sources.length === 0) {
      report("WARNING", file, "empty-array", { field: "sources" });
    }
    const seenUrls = new Set();
    data.sources.forEach((s, idx) => {
      if (typeof s !== "object" || s === null) {
        report("ERROR", file, "invalid-array-item", { field: `sources[${idx}]`, expected: "object" });
        return;
      }
      checkNonEmptyString(file, `sources[${idx}].title`, s.title, true);
      checkUrl(file, `sources[${idx}].url`, s.url);
      if (s.title === undefined) report("ERROR", file, "missing-required-field", { field: `sources[${idx}].title` });
      if (s.url === undefined) report("ERROR", file, "missing-required-field", { field: `sources[${idx}].url` });
      if (typeof s.url === "string") {
        if (seenUrls.has(s.url)) {
          report("WARNING", file, "duplicate-source-url", { field: `sources[${idx}].url`, value: s.url });
        }
        seenUrls.add(s.url);
      }
    });
  }

  // C. Optional schema fields
  checkUrl(file, "affiliateUrl", data.affiliateUrl);
  checkNonEmptyString(file, "lowestPaidPlan", data.lowestPaidPlan === undefined ? undefined : data.lowestPaidPlan, false);
  checkEnum(file, "currency", data.currency, CURRENCY_ENUM);
  checkDate(file, "verifiedAt", data.verifiedAt);
  checkUrl(file, "officialSourceUrl", data.officialSourceUrl);
  checkEnum(file, "pricingModel", data.pricingModel, PRICING_MODEL_ENUM);
  checkEnumArray(file, "platforms", data.platforms, PLATFORM_ENUM);
  checkBoolean(file, "signupRequired", data.signupRequired);
  checkBoolean(file, "japaneseDocs", data.japaneseDocs);
  checkEnumArray(file, "useCases", data.useCases, USE_CASE_ENUM);
  checkStringArray(file, "limitations", data.limitations);
  checkStringArray(file, "notBestFor", data.notBestFor);
  checkEnum(file, "difficulty", data.difficulty, DIFFICULTY_ENUM);

  if (data.features !== undefined && typeof data.features !== "object") {
    report("ERROR", file, "invalid-type", { field: "features", expected: "object" });
  }

  if (data.faqs !== undefined) {
    if (!Array.isArray(data.faqs)) {
      report("ERROR", file, "invalid-type", { field: "faqs", expected: "array" });
    } else {
      const seenQ = new Set();
      data.faqs.forEach((f, idx) => {
        if (typeof f !== "object" || f === null) {
          report("ERROR", file, "invalid-array-item", { field: `faqs[${idx}]`, expected: "object" });
          return;
        }
        checkNonEmptyString(file, `faqs[${idx}].question`, f.question, true);
        checkNonEmptyString(file, `faqs[${idx}].answer`, f.answer, true);
        if (typeof f.question === "string") {
          if (seenQ.has(f.question)) {
            report("WARNING", file, "duplicate-faq-question", { field: `faqs[${idx}].question`, value: f.question });
          }
          seenQ.add(f.question);
        }
      });
    }
  }

  if (data.sourceRefs !== undefined) {
    if (!Array.isArray(data.sourceRefs)) {
      report("ERROR", file, "invalid-type", { field: "sourceRefs", expected: "array" });
    } else {
      const seenUrls = new Set();
      data.sourceRefs.forEach((s, idx) => {
        if (typeof s !== "object" || s === null) {
          report("ERROR", file, "invalid-array-item", { field: `sourceRefs[${idx}]`, expected: "object" });
          return;
        }
        checkNonEmptyString(file, `sourceRefs[${idx}].label`, s.label, true);
        checkUrl(file, `sourceRefs[${idx}].url`, s.url);
        checkEnum(file, `sourceRefs[${idx}].type`, s.type, SOURCE_REF_TYPE_ENUM);
        if (typeof s.url === "string") {
          if (seenUrls.has(s.url)) {
            report("WARNING", file, "duplicate-source-url", { field: `sourceRefs[${idx}].url`, value: s.url });
          }
          seenUrls.add(s.url);
        }
      });
    }
  }

  if (data.pricingDecision !== undefined) {
    const pd = data.pricingDecision;
    checkEnum(file, "pricingDecision.hasFreePlan", pd.hasFreePlan, ["yes", "no", "limited", "unknown"]);
    checkEnum(file, "pricingDecision.watermarkStatus", pd.watermarkStatus, [
      "free-only",
      "paid-only",
      "none",
      "always",
      "unknown",
    ]);
    checkBoolean(file, "pricingDecision.creditSystem", pd.creditSystem);
    checkBoolean(file, "pricingDecision.paidPlanRequiredForExport", pd.paidPlanRequiredForExport);
  }

  if (data.usagePolicy !== undefined) {
    const up = data.usagePolicy;
    checkEnum(file, "usagePolicy.commercialUseStatus", up.commercialUseStatus, COMMERCIAL_USE_ENUM);
    checkEnum(file, "usagePolicy.rightsStatus", up.rightsStatus, [
      "user-owns",
      "platform-owns",
      "shared",
      "unknown",
    ]);
    checkEnum(file, "usagePolicy.inputMaterialRisk", up.inputMaterialRisk, ["low", "medium", "high", "unknown"]);
    checkEnum(file, "usagePolicy.peopleLogoRisk", up.peopleLogoRisk, ["low", "medium", "high", "unknown"]);
    checkEnum(file, "usagePolicy.creditRequiredStatus", up.creditRequiredStatus, [
      "required",
      "optional",
      "not-required",
      "unknown",
    ]);
    checkUrl(file, "usagePolicy.officialSourceUrl", up.officialSourceUrl);
    checkUrl(file, "usagePolicy.termsUrl", up.termsUrl);
    checkDate(file, "usagePolicy.lastReviewed", up.lastReviewed);
  }

  if (data.capabilityFit !== undefined) {
    const cf = data.capabilityFit;
    checkEnum(file, "capabilityFit.styleControl", cf.styleControl, ["high", "medium", "low", "unknown"]);
    checkEnum(file, "capabilityFit.consistencyControl", cf.consistencyControl, ["high", "medium", "low", "unknown"]);
  }

  if (data.japanBilling !== undefined) {
    const jb = data.japanBilling;
    checkUrl(file, "japanBilling.japanOfficialUrl", jb.japanOfficialUrl);
    checkUrl(file, "japanBilling.pricingUrl", jb.pricingUrl);
    checkBoolean(file, "japanBilling.isJapaneseService", jb.isJapaneseService);
    checkEnum(file, "japanBilling.jpyDirectBilling", jb.jpyDirectBilling, [
      "jpy-direct",
      "card-conversion",
      "app-store-only",
      "channel-dependent",
      "unknown",
    ]);
    checkEnum(file, "japanBilling.taxDisplay", jb.taxDisplay, [
      "tax-included",
      "tax-excluded",
      "tax-at-checkout",
      "region-dependent",
      "unknown",
    ]);
    checkEnum(file, "japanBilling.billingCategory", jb.billingCategory, ["A", "B", "C", "D", "E"]);
    if (jb.sourceUrls !== undefined) {
      if (!Array.isArray(jb.sourceUrls)) {
        report("ERROR", file, "invalid-type", { field: "japanBilling.sourceUrls", expected: "array" });
      } else {
        jb.sourceUrls.forEach((u, idx) => checkUrl(file, `japanBilling.sourceUrls[${idx}]`, u));
      }
    }
  }

  if (data.conversionGuide !== undefined) {
    checkStringArray(file, "conversionGuide.beforeClickChecklist", data.conversionGuide.beforeClickChecklist);
  }

  // D. Allowed extension fields
  if (data.needsReview !== undefined) {
    const v = data.needsReview;
    if (v !== true && v !== false && v !== "yes" && v !== "no") {
      report("ERROR", file, "invalid-type", {
        field: "needsReview",
        value: v,
        expected: "boolean | 'yes' | 'no'",
      });
    }
  }
  checkStringArray(file, "notFor", data.notFor);
  checkNonEmptyString(file, "pricingSourceNote", data.pricingSourceNote, false);
  checkUrl(file, "pricingSourceUrl", data.pricingSourceUrl);
  checkEnum(file, "pricingStatus", data.pricingStatus, PRICING_STATUS_ENUM);
}

function printReportAndExit(filesChecked) {
  const errors = violations.filter((v) => v.level === "ERROR");
  const warnings = violations.filter((v) => v.level === "WARNING");
  const verifies = violations.filter((v) => v.level === "VERIFY");

  for (const v of [...errors, ...warnings, ...verifies]) {
    console.log(`[${v.level}] ${v.file}`);
    console.log(`  rule: ${v.rule}`);
    if (v.field !== undefined) console.log(`  field: ${v.field}`);
    if (v.value !== undefined) console.log(`  value: ${JSON.stringify(v.value)}`);
    if (v.expected !== undefined) console.log(`  expected: ${v.expected}`);
  }

  console.log("");
  console.log(`Files checked: ${filesChecked}`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log(`Verify: ${verifies.length}`);

  process.exit(errors.length > 0 ? 1 : 0);
}

main();
