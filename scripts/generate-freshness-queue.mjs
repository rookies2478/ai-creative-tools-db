#!/usr/bin/env node
// Freshness queue generator (Issue #32). Read-only on src/content/** and src/data/**.
// Usage: node scripts/generate-freshness-queue.mjs --as-of YYYY-MM-DD [--out-dir DIR] [--stdout]
// Deterministic: never reads the current clock. No network. Overdue != content wrong.
// Missing / invalid dates are reported as UNKNOWN, never 0.

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const opt = (n) => {
  const i = args.indexOf(n);
  return i >= 0 ? args[i + 1] : undefined;
};

function validDate(s) {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

const asOf = opt("--as-of");
const outDir = opt("--out-dir") ?? "docs/audits";
if (!validDate(asOf)) {
  console.error("ERROR: --as-of YYYY-MM-DD is required (valid calendar date).");
  process.exit(2);
}
const dayNum = (s) => Date.parse(`${s}T00:00:00Z`) / 86400000;

function frontmatter(file) {
  const m = readFileSync(file, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1].split(/\r?\n/) : [];
}
const unq = (v) => v.trim().replace(/^["']|["']$/g, "");
function scalar(lines, key) {
  const l = lines.find((x) => x.startsWith(`${key}:`));
  if (!l) return undefined;
  const v = unq(l.slice(key.length + 1));
  return v === "" ? undefined : v;
}
function block(lines, key) {
  const i = lines.findIndex((x) => x.startsWith(`${key}:`));
  if (i < 0) return [];
  const out = [];
  for (let j = i + 1; j < lines.length && /^\s/.test(lines[j]); j++) out.push(lines[j]);
  return out;
}
const urlCount = (lines, key) =>
  block(lines, key).filter((l) => /\burl:\s*"?https?:\/\//.test(l)).length;

// Approved + enabled affiliate links (read-only parse of the canonical table).
function approvedAffiliateSlugs() {
  const src = readFileSync("src/data/toolAffiliateLinks.ts", "utf8");
  const body = src.slice(src.indexOf("toolAffiliateLinks: ToolAffiliateLink[]"));
  const slugs = new Set();
  for (const m of body.matchAll(/\{[^{}]*\}/g)) {
    const e = m[0];
    const slug = e.match(/toolSlug:\s*'([^']+)'/)?.[1];
    if (slug && /enabled:\s*true/.test(e) && /approvalStatus:\s*'approved'/.test(e)) slugs.add(slug);
  }
  return slugs;
}
const affiliate = approvedAffiliateSlugs();

function dateState(v) {
  if (v === undefined) return { state: "UNKNOWN", reason: "missing" };
  if (!validDate(v)) return { state: "UNKNOWN", reason: "invalid" };
  const diff = dayNum(asOf) - dayNum(v);
  return diff > 0 ? { state: "OVERDUE", days: diff } : { state: "OK", days: 0, until: -diff };
}

const rows = [];
function addRow(kind, slug, lines) {
  const lastReviewed = scalar(lines, "lastReviewed");
  const nextReviewDue = scalar(lines, "nextReviewDue");
  const ds = dateState(nextReviewDue);
  const lrValid = lastReviewed !== undefined && validDate(lastReviewed);
  const pricingStatus = scalar(lines, "pricingStatus");
  const commercialUse = scalar(lines, "commercialUse");
  const sourceCount =
    (scalar(lines, "officialSourceUrl") ? 1 : 0) +
    (scalar(lines, "pricingSourceUrl") ? 1 : 0) +
    urlCount(lines, "sources") +
    urlCount(lines, "sourceRefs");
  const aspect = block(lines, "reviewed")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => l.replace(/["']/g, "").replace(/:[ ]*/, "="))
    .join(" ");

  const claimTypes = [];
  if (kind === "tool") {
    if (scalar(lines, "lowestPaidPlan") || pricingStatus) claimTypes.push("pricing");
    if (commercialUse) claimTypes.push("license");
    if (lines.some((l) => l.startsWith("features:"))) claimTypes.push("features");
  } else {
    claimTypes.push("pricing", "features");
  }
  const flags = [];
  if (["partial", "unconfirmed", "service_changed"].includes(pricingStatus))
    flags.push(`pricingStatus=${pricingStatus}`);
  if (["limited", "unknown", "paid-only"].includes(commercialUse))
    flags.push(`commercialUse=${commercialUse}`);

  let importance;
  if (kind === "tool" && affiliate.has(slug)) importance = "HIGH(approved affiliate link)";
  else if (flags.length) importance = "MEDIUM(claim exposure)";
  else if (kind === "guide" && /commercial|pricing|cost|credit|free/.test(slug))
    importance = "MEDIUM(commercial-intent guide)";
  else importance = "LOW";

  let priority;
  if (ds.state === "OK") priority = "P3";
  else if (ds.state === "UNKNOWN") priority = "P2";
  else if (importance.startsWith("HIGH") || ["unconfirmed", "service_changed"].includes(pricingStatus))
    priority = "P0";
  else if (importance.startsWith("MEDIUM")) priority = "P1";
  else priority = "P2";

  rows.push({
    page: kind === "tool" ? `/tools/${slug}/` : `/guides/${slug}/`,
    kind,
    lastReviewed:
      lastReviewed === undefined ? "UNKNOWN" : lrValid ? lastReviewed : "UNKNOWN(invalid)",
    nextReviewDue: ds.state === "UNKNOWN" ? `UNKNOWN(${ds.reason})` : nextReviewDue,
    status: ds.state,
    overdueDays: ds.state === "OVERDUE" ? String(ds.days) : ds.state === "OK" ? "0" : "UNKNOWN",
    daysUntilDue: ds.state === "OK" ? String(ds.until) : "",
    claimTypes: claimTypes.join(";"),
    riskFlags: flags.join(";") || "none",
    commercialImportance: importance,
    traffic: "UNKNOWN",
    sourceAvailable: sourceCount > 0 ? "YES" : "NO",
    sourceCount: String(sourceCount),
    aspectReviewed: aspect || "n/a",
    priority,
  });
}

for (const [dir, kind] of [
  ["src/content/tools", "tool"],
  ["src/content/guides", "guide"],
]) {
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".md")).sort()) {
    addRow(kind, f.replace(/\.md$/, ""), frontmatter(join(dir, f)));
  }
}
rows.sort(
  (a, b) =>
    a.priority.localeCompare(b.priority) ||
    (Number(b.overdueDays) || -1) - (Number(a.overdueDays) || -1) ||
    a.page.localeCompare(b.page),
);

const cols = [
  "page", "kind", "lastReviewed", "nextReviewDue", "status", "overdueDays", "daysUntilDue",
  "claimTypes", "riskFlags", "commercialImportance", "traffic", "sourceAvailable",
  "sourceCount", "aspectReviewed", "priority",
];
const csvEsc = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const csv =
  [cols.join(","), ...rows.map((r) => cols.map((c) => csvEsc(r[c])).join(","))].join("\n") + "\n";

const count = (p) => rows.filter(p).length;
const md = `# Content Freshness Queue (as-of ${asOf})

Generated by \`node scripts/generate-freshness-queue.mjs --as-of ${asOf}\` (Issue #32). Internal, non-public. Deterministic for a fixed as-of date and fixed source files.

**overdue means "re-review needed", not "content is wrong".** Verify official sources before any public edit; public edits require a separate repo task and QA gates.

## Method
- Source of truth: \`lastReviewed\` / \`nextReviewDue\` (required by \`src/content/config.ts\`) in \`src/content/tools/*.md\` and \`src/content/guides/*.md\`. Per-aspect \`reviewed.{pricing,terms,features}\` shown where present (informational only).
- overdueDays = as-of minus nextReviewDue when positive. Missing/invalid date => UNKNOWN (never 0). Not-yet-due => 0 with daysUntilDue in the CSV.
- Source available: YES if officialSourceUrl, pricingSourceUrl, sources[] or sourceRefs[] has a URL. Guides carry no source fields in their schema, so NO means "no machine-readable source metadata", not "unsourced".
- Commercial importance (heuristic, repo data only): HIGH = enabled+approved entry in \`src/data/toolAffiliateLinks.ts\`; MEDIUM = pricingStatus partial/unconfirmed/service_changed or commercialUse limited/unknown/paid-only (claim exposure), or commercial-intent guide slug; else LOW. Page traffic is UNKNOWN: no verified per-page traffic is joined (GSC summaries are aggregate; raw exports are not read).
- Priority: P0 = overdue and (HIGH importance or pricingStatus unconfirmed/service_changed); P1 = overdue and MEDIUM; P2 = other overdue or UNKNOWN date; P3 = not yet due.

## Summary
- Rows: ${rows.length} (tools ${count((r) => r.kind === "tool")}, guides ${count((r) => r.kind === "guide")})
- OVERDUE: ${count((r) => r.status === "OVERDUE")} / OK: ${count((r) => r.status === "OK")} / UNKNOWN: ${count((r) => r.status === "UNKNOWN")}
- P0 ${count((r) => r.priority === "P0")} / P1 ${count((r) => r.priority === "P1")} / P2 ${count((r) => r.priority === "P2")} / P3 ${count((r) => r.priority === "P3")}

## Queue
| priority | page | last reviewed | next review due | overdue days | claim types | risk flags | commercial importance | source available | per-aspect reviewed |
|---|---|---|---|---|---|---|---|---|---|
${rows
  .map(
    (r) =>
      `| ${r.priority} | ${r.page} | ${r.lastReviewed} | ${r.nextReviewDue} | ${r.overdueDays} | ${r.claimTypes} | ${r.riskFlags} | ${r.commercialImportance} | ${r.sourceAvailable} (${r.sourceCount}) | ${r.aspectReviewed} |`,
  )
  .join("\n")}
`;

if (args.includes("--stdout")) {
  process.stdout.write(md);
} else {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `freshness-queue-${asOf}.md`), md);
  writeFileSync(join(outDir, `freshness-queue-${asOf}.csv`), csv);
  console.log(`wrote ${outDir}/freshness-queue-${asOf}.{md,csv} rows=${rows.length}`);
}
