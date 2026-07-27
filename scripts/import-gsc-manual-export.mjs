#!/usr/bin/env node
// GSC manual ZIP export importer — manual-first / API-compatible.
//
// Reads a GSC UI manual ZIP export read-only, detects datasets by CSV header
// (never by localized/garbled file name), normalizes rows to English headers,
// derives totals.csv from daily.csv, and writes the standardized raw run
// structure plus manifest.json documented in docs/analytics/gsc/README.md.
//
// Default mode is --dry-run (no writes). --apply writes only after the same
// validation dry-run would have reported success.
//
// No network access, no credentials, no API calls.

import { readFileSync, existsSync, mkdirSync, writeFileSync, rmSync, renameSync } from "node:fs";
import { basename, join } from "node:path";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
import {
  readZipEntries,
  ZipSafetyError,
  sha256Hex,
  decodeCsvBuffer,
  parseCsvText,
  detectDataset,
  normalizeMetricRows,
  rowsToCsv,
  deriveTotals,
  parseFilters,
  REQUIRED_DATASETS,
  OPTIONAL_DATASETS,
} from "./gsc-import-lib.mjs";

const MANIFEST_VERSION = "1.1";
const OUTPUT_ROOT = "docs/analytics/gsc";

function parseArgs(argv) {
  const args = { mode: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case "--input":
        args.input = argv[++i];
        break;
      case "--date":
        args.date = argv[++i];
        break;
      case "--label":
        args.label = argv[++i];
        break;
      case "--scope":
        args.scope = argv[++i];
        break;
      case "--page-url":
        args.pageUrl = argv[++i];
        break;
      case "--dry-run":
        if (args.mode === "apply") throw new UsageError("--dry-run and --apply cannot both be specified");
        args.mode = "dry-run";
        break;
      case "--apply":
        if (args.mode === "dry-run") throw new UsageError("--dry-run and --apply cannot both be specified");
        args.mode = "apply";
        break;
      case "--out-root":
        // internal/test-only override of the output root; not documented as
        // public CLI surface (production runs always use docs/analytics/gsc).
        args.outRoot = argv[++i];
        break;
      case "--run-id":
        // test-only deterministic run id override.
        args.runIdOverride = argv[++i];
        break;
      default:
        throw new UsageError(`Unknown argument: ${a}`);
    }
  }
  if (!args.mode) args.mode = "dry-run";
  if (!args.input) throw new UsageError("--input is required");
  if (!args.date) throw new UsageError("--date is required");
  if (!args.label) throw new UsageError("--label is required");
  if (!args.scope) throw new UsageError("--scope is required (property|page)");
  if (args.scope !== "property" && args.scope !== "page") {
    throw new UsageError('--scope must be "property" or "page"');
  }
  if (args.scope === "page" && !args.pageUrl) {
    throw new UsageError("--page-url is required when --scope page");
  }
  if (args.scope === "property" && args.pageUrl) {
    throw new UsageError("--page-url must not be set when --scope property");
  }
  return args;
}

export class UsageError extends Error {}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function runIdFromNow(now) {
  return `run-${pad2(now.getHours())}${pad2(now.getMinutes())}${pad2(now.getSeconds())}`;
}

export function runImport(args, { now = new Date() } = {}) {
  const errors = [];
  const warnings = [];
  const notes = [];

  if (!existsSync(args.input)) {
    throw new UsageError(`Input ZIP not found: ${basename(args.input)}`);
  }
  const zipBuf = readFileSync(args.input);
  const sourceSha256 = sha256Hex(zipBuf);
  const sourceSizeBytes = zipBuf.length;
  const sourceName = basename(args.input);

  let entries;
  try {
    entries = readZipEntries(zipBuf).filter((e) => !e.isDirectory);
  } catch (e) {
    if (e instanceof ZipSafetyError) {
      return finalize({
        status: "failed",
        errors: [`ZIP safety/parse error: ${e.message}`],
        warnings,
        notes,
        args,
        now,
        sourceName,
        sourceSha256,
        sourceSizeBytes,
        detected: {},
        unknownFiles: [],
        filters: null,
        rowCounts: {},
      });
    }
    throw e;
  }

  const candidatesByDataset = {};
  const unknownFiles = [];
  const rawContentByDataset = {};

  for (const entry of entries) {
    let data;
    try {
      data = entry.read();
    } catch (e) {
      if (e instanceof ZipSafetyError) {
        errors.push(`Entry "${entry.name}": ${e.message}`);
        continue;
      }
      throw e;
    }
    const decoded = decodeCsvBuffer(data);
    if (!decoded.ok) {
      warnings.push(`Entry "${entry.name}": could not decode as UTF-8, skipped`);
      unknownFiles.push(entry.name);
      continue;
    }
    if (!/\.csv$/i.test(entry.name)) {
      notes.push(`Non-CSV entry ignored: ${entry.name}`);
      continue;
    }
    const rows = parseCsvText(decoded.text);
    const dataset = detectDataset(rows);
    if (!dataset) {
      unknownFiles.push(entry.name);
      notes.push(`Unrecognized CSV header, treated as unknown: ${entry.name}`);
      continue;
    }
    if (!candidatesByDataset[dataset]) candidatesByDataset[dataset] = [];
    candidatesByDataset[dataset].push(entry.name);
    rawContentByDataset[dataset] = rows;
  }

  for (const [dataset, files] of Object.entries(candidatesByDataset)) {
    if (files.length > 1) {
      errors.push(
        `Duplicate candidates for dataset "${dataset}": ${files.join(", ")} — refusing to auto-select`
      );
    }
  }

  const detected = {};
  const rowCounts = {};
  const normalizedByDataset = {};

  for (const dataset of REQUIRED_DATASETS) {
    if (dataset === "filters") continue;
    const rows = rawContentByDataset[dataset];
    if (!rows) {
      detected[dataset] = { present: false, empty: false };
      continue;
    }
    const isEmpty = rows.length <= 1;
    detected[dataset] = { present: true, empty: isEmpty };
    rowCounts[dataset] = Math.max(0, rows.length - 1);
    if (dataset !== "search-appearance" || !isEmpty) {
      const normalized = normalizeMetricRows(dataset, rows);
      normalizedByDataset[dataset] = normalized;
      for (const e of normalized.errors) errors.push(`${dataset}: ${e}`);
      for (const w of normalized.warnings) warnings.push(`${dataset}: ${w}`);
    } else {
      normalizedByDataset[dataset] = { header: [], rows: [], warnings: [], errors: [] };
    }
  }

  let filters = null;
  if (rawContentByDataset.filters) {
    filters = parseFilters(rawContentByDataset.filters);
    detected.filters = { present: true, empty: rawContentByDataset.filters.length <= 1 };
  } else {
    detected.filters = { present: false, empty: false };
  }

  const missingRequired = REQUIRED_DATASETS.filter((d) => {
    if (d === "search-appearance") return !detected[d]?.present;
    return !detected[d]?.present;
  });
  if (missingRequired.length > 0) {
    errors.push(`Missing required datasets: ${missingRequired.join(", ")}`);
  }

  // scope / filters consistency check
  if (filters) {
    if (args.scope === "property" && filters.page) {
      errors.push(
        `--scope property specified but filters.csv records a page filter (${filters.page})`
      );
    }
    if (args.scope === "page" && filters.page && filters.page !== args.pageUrl) {
      errors.push(
        `--page-url "${args.pageUrl}" does not match filters.csv page filter "${filters.page}"`
      );
    }
    if (args.scope === "page" && !filters.page) {
      notes.push("filters.csv did not record a page URL; using --page-url as provided");
    }
  } else if (args.scope === "page") {
    notes.push("filters.csv unavailable; scope=page relies solely on --page-url");
  }

  let totals = null;
  if (normalizedByDataset.daily && normalizedByDataset.daily.rows.length > 0) {
    totals = deriveTotals(normalizedByDataset.daily.rows);
    for (const w of totals.warnings) warnings.push(`totals: ${w}`);
  }

  const status = errors.length > 0 ? "failed_or_partial" : "success";
  const finalStatus =
    errors.length > 0
      ? missingRequired.length >= REQUIRED_DATASETS.length - 1
        ? "failed"
        : "partial"
      : "success";

  return finalize({
    status: finalStatus,
    errors,
    warnings,
    notes,
    args,
    now,
    sourceName,
    sourceSha256,
    sourceSizeBytes,
    detected,
    unknownFiles,
    filters,
    rowCounts,
    normalizedByDataset,
    totals,
  });
}

function finalize(ctx) {
  const {
    status,
    errors,
    warnings,
    notes,
    args,
    now,
    sourceName,
    sourceSha256,
    sourceSizeBytes,
    detected,
    unknownFiles,
    filters,
    rowCounts,
    normalizedByDataset = {},
    totals = null,
  } = ctx;

  const runId = args.runIdOverride || runIdFromNow(now);
  const outRoot = args.outRoot || OUTPUT_ROOT;
  const outputDir = join(outRoot, args.date, "raw", runId);

  const datasetsManifest = {};
  for (const d of REQUIRED_DATASETS) {
    if (d === "filters") {
      datasetsManifest.filters = {
        file: detected.filters?.present ? "filters.csv" : null,
        source_type: "exported",
        present: !!detected.filters?.present,
        empty: !!detected.filters?.empty,
        rows: 0,
        required: true,
        derived: false,
        notes: [],
      };
      continue;
    }
    datasetsManifest[d] = {
      file: detected[d]?.present ? `${d}.csv` : null,
      source_type: "exported",
      present: !!detected[d]?.present,
      empty: !!detected[d]?.empty,
      rows: rowCounts[d] ?? 0,
      required: true,
      derived: false,
      notes: [],
    };
  }
  datasetsManifest.totals = {
    file: totals ? "totals.csv" : null,
    source_type: "derived",
    present: !!totals,
    empty: false,
    rows: totals ? 1 : 0,
    required: false,
    derived: true,
    notes: ["dailyから正規化時に集計"],
  };
  datasetsManifest["query-pages"] = {
    file: null,
    source_type: "unavailable",
    present: false,
    empty: false,
    rows: 0,
    required: false,
    derived: false,
    notes: ["GSC UIの通常エクスポートでは取得不可"],
  };
  datasetsManifest.sitemaps = {
    file: null,
    source_type: "unavailable",
    present: false,
    empty: false,
    rows: 0,
    required: false,
    derived: false,
    notes: ["パフォーマンスレポートのZIPには含まれない"],
  };

  const manifest = {
    manifest_version: MANIFEST_VERSION,
    analysis_type: "gsc",
    processing_stage: "normalized",
    run_id: runId,
    status,
    generated_at: now.toISOString(),
    completed_at: status === "success" ? now.toISOString() : null,
    source_export_date: args.date,
    imported_at: now.toISOString(),
    property: args.scope === "property" ? "REPLACE_WITH_PROPERTY" : null,
    scope: {
      type: args.scope,
      page_url: args.scope === "page" ? args.pageUrl : null,
    },
    filters: filters || {
      search_type: null,
      page: args.scope === "page" ? args.pageUrl : null,
      query: null,
      country: null,
      device: null,
      search_appearance: null,
    },
    period: {
      label: args.label,
      start_date: null,
      end_date: null,
      timezone: "Asia/Tokyo",
    },
    comparison_period: { enabled: false, start_date: null, end_date: null },
    acquisition: {
      method: "manual-ui-export",
      source: "google-search-console",
      source_report: "performance",
      input_format: "zip",
      tool: "Google Search Console UI",
      script: "scripts/import-gsc-manual-export.mjs",
    },
    source_files: [
      {
        name: sourceName,
        type: "zip",
        sha256: sourceSha256,
        size_bytes: sourceSizeBytes,
      },
    ],
    datasets: datasetsManifest,
    required_datasets: REQUIRED_DATASETS,
    optional_datasets: OPTIONAL_DATASETS,
    validation: { errors, warnings },
    notes: [...notes, ...(unknownFiles.length ? [`Unknown files: ${unknownFiles.join(", ")}`] : [])],
  };

  return {
    status,
    manifest,
    outputDir,
    normalizedByDataset,
    totals,
    canApply: status === "success",
  };
}

export function applyResult(result) {
  if (!result.canApply) {
    throw new UsageError(`Refusing to write: status=${result.status}`);
  }
  if (existsSync(result.outputDir)) {
    throw new UsageError(`Output directory already exists, refusing to overwrite: ${result.outputDir}`);
  }

  const tmpDir = `${result.outputDir}.tmp-${randomUUID()}`;
  try {
    mkdirSync(tmpDir, { recursive: true });

    for (const [dataset, normalized] of Object.entries(result.normalizedByDataset)) {
      if (dataset === "filters") continue;
      if (!normalized.header.length) continue;
      const csv = rowsToCsv(normalized.header, normalized.rows);
      writeFileSync(join(tmpDir, `${dataset}.csv`), csv, "utf8");
    }
    if (result.totals) {
      const line = [
        result.totals.row.clicks,
        result.totals.row.impressions,
        result.totals.row.ctr,
        result.totals.row.position === null ? "" : result.totals.row.position,
      ].join(",");
      writeFileSync(
        join(tmpDir, "totals.csv"),
        `${result.totals.header.join(",")}\n${line}\n`,
        "utf8"
      );
    }
    // manifest is written last, once all datasets succeeded.
    writeFileSync(join(tmpDir, "manifest.json"), JSON.stringify(result.manifest, null, 2) + "\n", "utf8");

    mkdirSync(join(result.outputDir, ".."), { recursive: true });
    renameSync(tmpDir, result.outputDir);
  } catch (e) {
    rmSync(tmpDir, { recursive: true, force: true });
    throw e;
  }
  return result.outputDir;
}

function printDryRun(result, args) {
  const m = result.manifest;
  console.log(`source: ${m.source_files[0].name}`);
  console.log(`source_size_bytes: ${m.source_files[0].size_bytes}`);
  console.log(`source_sha256: ${m.source_files[0].sha256}`);
  console.log(`scope: ${m.scope.type}${m.scope.page_url ? ` (${m.scope.page_url})` : ""}`);
  console.log(`period_label: ${m.period.label}`);
  console.log("datasets:");
  for (const [k, v] of Object.entries(m.datasets)) {
    console.log(
      `  - ${k}: present=${v.present} empty=${v.empty} rows=${v.rows} required=${v.required} derived=${v.derived}`
    );
  }
  if (m.notes.length) {
    console.log("notes:");
    m.notes.forEach((n) => console.log(`  - ${n}`));
  }
  if (m.validation.warnings.length) {
    console.log("warnings:");
    m.validation.warnings.forEach((w) => console.log(`  - ${w}`));
  }
  if (m.validation.errors.length) {
    console.log("errors:");
    m.validation.errors.forEach((e) => console.log(`  - ${e}`));
  }
  console.log(`planned_output_directory: ${result.outputDir}`);
  console.log(`final_status: ${result.status}`);
  console.log(`apply_possible: ${result.canApply ? "yes" : "no"}`);
}

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (e) {
    if (e instanceof UsageError) {
      console.error(`Usage error: ${e.message}`);
      process.exit(2);
    }
    throw e;
  }

  const result = runImport(args);
  printDryRun(result, args);

  if (args.mode === "apply") {
    if (!result.canApply) {
      console.error(`apply aborted: status=${result.status}`);
      process.exit(1);
    }
    const dir = applyResult(result);
    console.log(`written: ${dir}`);
  }

  process.exit(result.status === "success" ? 0 : 1);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main();
}
