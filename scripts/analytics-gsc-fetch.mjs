#!/usr/bin/env node
// GSC Search Analytics API fetcher — API-first acquisition path.
//
// Fetches totals/daily/queries/pages/query-pages/devices/countries/
// search-appearance/sitemaps for a single date range from the real Google
// Search Console API (via googleapis, readonly scope) and writes them into
// the same docs/analytics/gsc/YYYY-MM-DD/raw/run-HHMMSS/ structure used by
// the manual ZIP importer (scripts/import-gsc-manual-export.mjs), which
// remains the fallback acquisition method.
//
// No credential content, token, or Authorization header is ever read from
// disk directly by this script or logged — see scripts/gsc-api-client.mjs
// for the auth boundary. This script never queries the real API unless a
// client is not injected via the getClient dependency (used by tests).

import { mkdirSync, writeFileSync, existsSync, rmSync, renameSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
import { GscApiError } from "./gsc-api-errors.mjs";
import { createRealClient } from "./gsc-api-client.mjs";
import {
  SINGLE_DIMENSION_DATASETS,
  DEFAULT_ROW_LIMIT,
  DEFAULT_MAX_PAGES,
  DEFAULT_MAX_ROWS,
  QUERY_PAGES_MAX_ROWS,
  resolveDateRange,
  fetchAllRows,
  normalizeSingleDimensionRows,
  normalizedRowsToCsv,
  normalizeQueryPageRows,
  queryPageRowsToCsv,
  totalsFromApiRow,
  checkTotalsAgainstDaily,
  checkDailyCoverage,
} from "./gsc-api-lib.mjs";

export const MANIFEST_VERSION = "1.1";
export const SCRIPT_VERSION = "1.0.0";
const OUTPUT_ROOT = "docs/analytics/gsc";
const REQUIRED_DATASET_KEYS = [
  "totals",
  "daily",
  "queries",
  "pages",
  "query-pages",
  "devices",
  "countries",
  "search-appearance",
  "sitemaps",
];

export class UsageError extends Error {}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case "--days":
        args.days = Number(argv[++i]);
        break;
      case "--start":
        args.start = argv[++i];
        break;
      case "--end":
        args.end = argv[++i];
        break;
      case "--site-url":
        args.siteUrl = argv[++i];
        break;
      case "--out-root":
        // internal/test-only override; production runs always use docs/analytics/gsc.
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
  return args;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function runIdFromNow(now) {
  return `run-${pad2(now.getHours())}${pad2(now.getMinutes())}${pad2(now.getSeconds())}`;
}

function env(name, fallback) {
  const v = process.env[name];
  return v === undefined || v === "" ? fallback : v;
}

// ---------------------------------------------------------------------------
// Core orchestration (client is injectable — real client for production runs,
// mock client for tests). Never touches the network directly.
// ---------------------------------------------------------------------------

export async function runFetch(rawArgs, { getClient = createRealClient, now = new Date() } = {}) {
  const args = { ...rawArgs };
  const siteUrl = args.siteUrl || env("GSC_SITE_URL", "sc-domain:aicreative-db.com");
  const defaultDays = Number(env("GSC_DEFAULT_DAYS", "14"));
  const dataLagDays = Number(env("GSC_DATA_LAG_DAYS", "3"));

  let startDate, endDate;
  try {
    ({ startDate, endDate } = resolveDateRange({
      start: args.start,
      end: args.end,
      days: args.days,
      defaultDays,
      dataLagDays,
      now,
    }));
  } catch (e) {
    if (e instanceof GscApiError) return failResult(e, { args, siteUrl, now });
    throw e;
  }

  let client;
  try {
    client = await getClient();
  } catch (e) {
    if (e instanceof GscApiError) return failResult(e, { args, siteUrl, now, startDate, endDate });
    throw e;
  }

  const datasets = {};
  const warnings = [];
  const errors = [];
  let fatal = null;

  const baseBody = {
    startDate,
    endDate,
    type: "web",
  };

  // totals: no dimensions, single aggregated row, no pagination.
  try {
    const res = await client.searchanalytics.query({
      siteUrl,
      requestBody: { ...baseBody, dimensions: [], rowLimit: 1, startRow: 0 },
    });
    const totalsRow = totalsFromApiRow(res.rows?.[0]);
    datasets.totals = { status: "success", rowCount: 1, pageCount: 1, truncated: false, data: totalsRow };
  } catch (e) {
    fatal = e instanceof GscApiError ? e : new GscApiError("GSC_NETWORK_ERROR", "totals fetch failed");
  }

  if (!fatal) {
    for (const [key, def] of Object.entries(SINGLE_DIMENSION_DATASETS)) {
      try {
        const { rows, pageCount, truncated } = await fetchAllRows(
          (body) => client.searchanalytics.query({ siteUrl, requestBody: body }),
          { ...baseBody, dimensions: [def.apiDimension] },
          { rowLimit: DEFAULT_ROW_LIMIT, maxPages: DEFAULT_MAX_PAGES, maxRows: DEFAULT_MAX_ROWS }
        );
        const normalized = normalizeSingleDimensionRows(rows);
        datasets[key] = {
          status: truncated ? "truncated" : "success",
          rowCount: normalized.length,
          pageCount,
          truncated,
          data: normalized,
        };
        if (truncated) warnings.push(`${key}: truncated at safety limit (rows=${normalized.length})`);
      } catch (e) {
        fatal = e instanceof GscApiError ? e : new GscApiError("GSC_NETWORK_ERROR", `${key} fetch failed`);
        break;
      }
    }
  }

  if (!fatal) {
    try {
      const { rows, pageCount, truncated, duplicateCount } = await fetchAllRows(
        (body) => client.searchanalytics.query({ siteUrl, requestBody: body }),
        { ...baseBody, dimensions: ["query", "page"] },
        { rowLimit: DEFAULT_ROW_LIMIT, maxPages: DEFAULT_MAX_PAGES, maxRows: QUERY_PAGES_MAX_ROWS }
      );
      const normalized = normalizeQueryPageRows(rows);
      datasets["query-pages"] = {
        status: truncated ? "truncated" : "success",
        rowCount: normalized.length,
        pageCount,
        truncated,
        data: normalized,
      };
      if (truncated) {
        warnings.push(`query-pages: truncated at safety limit (rows=${normalized.length})`);
        errors.push("GSC_DATASET_TRUNCATED: query-pages was truncated and must not be treated as a complete dataset");
      }
      if (duplicateCount > 0) warnings.push(`query-pages: ${duplicateCount} duplicate rows detected across pages`);
    } catch (e) {
      fatal = e instanceof GscApiError ? e : new GscApiError("GSC_NETWORK_ERROR", "query-pages fetch failed");
    }
  }

  if (!fatal) {
    try {
      const res = await client.sitemaps.list({ siteUrl });
      const sitemapList = (res.sitemap ?? []).map((s) => ({
        path: s.path ?? null,
        lastSubmitted: s.lastSubmitted ?? null,
        lastDownloaded: s.lastDownloaded ?? null,
        isPending: s.isPending ?? null,
        isSitemapsIndex: s.isSitemapsIndex ?? null,
        type: s.type ?? null,
        warnings: s.warnings ?? null,
        errors: s.errors ?? null,
        contents: Array.isArray(s.contents)
          ? s.contents.map((c) => ({ type: c.type ?? null, submitted: c.submitted ?? null }))
          : [],
      }));
      datasets.sitemaps = {
        status: "success",
        rowCount: sitemapList.length,
        pageCount: 1,
        truncated: false,
        data: sitemapList,
      };
    } catch (e) {
      fatal = e instanceof GscApiError ? e : new GscApiError("GSC_NETWORK_ERROR", "sitemaps fetch failed");
    }
  }

  if (fatal) {
    return failResult(fatal, { args, siteUrl, now, startDate, endDate });
  }

  const totalsDailyCheck = checkTotalsAgainstDaily(datasets.totals.data, datasets.daily.data);
  if (totalsDailyCheck.status === "mismatch") {
    warnings.push(
      `totals/daily mismatch beyond tolerance: clicks=${totalsDailyCheck.clicksDifference} impressions=${totalsDailyCheck.impressionsDifference} ctr=${totalsDailyCheck.ctrDifference}`
    );
  }

  const coverage = checkDailyCoverage(startDate, endDate, datasets.daily.data);
  let actualStartDate = startDate;
  let actualEndDate = endDate;
  if (datasets.daily.data.length > 0) {
    const returnedDates = datasets.daily.data.map((r) => r.label).sort();
    actualStartDate = returnedDates[0];
    actualEndDate = returnedDates[returnedDates.length - 1];
  }
  const periodMismatch = actualStartDate < startDate || actualEndDate > endDate;
  if (periodMismatch) {
    errors.push(
      `GSC_INVALID_DATE_RANGE: daily rows returned outside requested period (requested ${startDate}..${endDate}, actual ${actualStartDate}..${actualEndDate})`
    );
  }
  if (coverage.missingDates.length > 0) {
    warnings.push(`daily: ${coverage.missingDates.length} date(s) with no returned row (likely zero-traffic days)`);
  }

  const anyDatasetTruncated = Object.values(datasets).some((d) => d.truncated);
  const status = periodMismatch ? "failed" : anyDatasetTruncated || errors.length > 0 ? "partial" : "success";

  const manifest = buildManifest({
    status,
    siteUrl,
    startDate,
    endDate,
    actualStartDate,
    actualEndDate,
    now,
    datasets,
    totalsDailyCheck,
    missingDates: coverage.missingDates,
    warnings,
    errors,
  });

  const runId = args.runIdOverride || runIdFromNow(now);
  const outRoot = args.outRoot || OUTPUT_ROOT;
  const dateDir = endDate;
  const outputDir = join(outRoot, dateDir, "raw", runId);

  return {
    status,
    manifest,
    outputDir,
    datasets,
    canApply: status === "success" || status === "partial",
  };
}

function failResult(err, { args, siteUrl, now, startDate = null, endDate = null }) {
  const manifest = buildManifest({
    status: "failed",
    siteUrl,
    startDate,
    endDate,
    actualStartDate: null,
    actualEndDate: null,
    now,
    datasets: {},
    totalsDailyCheck: null,
    missingDates: [],
    warnings: [],
    errors: [`${err.code}: ${err.message}`],
  });
  const runId = args.runIdOverride || runIdFromNow(now);
  const outRoot = args.outRoot || OUTPUT_ROOT;
  const dateDir = endDate || now.toISOString().slice(0, 10);
  const outputDir = join(outRoot, dateDir, "raw", runId);
  return { status: "failed", manifest, outputDir, datasets: {}, canApply: false, errorCode: err.code };
}

function buildManifest({
  status,
  siteUrl,
  startDate,
  endDate,
  actualStartDate,
  actualEndDate,
  now,
  datasets,
  totalsDailyCheck,
  missingDates,
  warnings,
  errors,
}) {
  const datasetsManifest = {};
  for (const key of REQUIRED_DATASET_KEYS) {
    const d = datasets[key];
    datasetsManifest[key] = {
      status: d?.status ?? "error",
      rowCount: d?.rowCount ?? 0,
      pageCount: d?.pageCount ?? 0,
      truncated: d?.truncated ?? false,
      outputFile: d ? outputFileNameFor(key) : null,
      errorCode: d ? null : status === "failed" ? errors[0]?.split(":")[0] ?? null : null,
    };
  }

  return {
    manifest_version: MANIFEST_VERSION,
    analysis_type: "gsc",
    method: "api",
    scriptVersion: SCRIPT_VERSION,
    siteUrl,
    searchType: "web",
    requestedStartDate: startDate,
    requestedEndDate: endDate,
    actualStartDate,
    actualEndDate,
    generatedAt: now.toISOString(),
    timezoneBasis: "PT",
    datasets: datasetsManifest,
    rowCounts: Object.fromEntries(
      Object.entries(datasets).map(([k, d]) => [k, d.rowCount])
    ),
    apiPages: Object.fromEntries(Object.entries(datasets).map(([k, d]) => [k, d.pageCount])),
    rowLimits: {
      default: DEFAULT_ROW_LIMIT,
      queryPagesMaxRows: QUERY_PAGES_MAX_ROWS,
      defaultMaxRows: DEFAULT_MAX_ROWS,
      defaultMaxPages: DEFAULT_MAX_PAGES,
    },
    truncated: Object.entries(datasets)
      .filter(([, d]) => d.truncated)
      .map(([k]) => k),
    missingDates,
    warnings,
    errors,
    totalsSource: "api-aggregate",
    totalsDailyCheck,
    credentialMethod: "service-account",
    credentialPathStored: false,
    success: status === "success",
    fallback: {
      method: "manual-ui-export",
      script: "scripts/import-gsc-manual-export.mjs",
      note: "Manual ZIP import remains available if the API path fails or is unavailable.",
    },
  };
}

function outputFileNameFor(key) {
  if (key === "totals") return "totals.json";
  if (key === "sitemaps") return "sitemaps.json";
  if (key === "query-pages") return "query-pages.csv";
  return `${key}.csv`;
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

    for (const [key, def] of Object.entries(SINGLE_DIMENSION_DATASETS)) {
      const d = result.datasets[key];
      if (!d) continue;
      writeFileSync(join(tmpDir, `${key}.csv`), normalizedRowsToCsv(def.label, d.data), "utf8");
    }
    if (result.datasets["query-pages"]) {
      writeFileSync(
        join(tmpDir, "query-pages.csv"),
        queryPageRowsToCsv(result.datasets["query-pages"].data),
        "utf8"
      );
    }
    if (result.datasets.totals) {
      writeFileSync(
        join(tmpDir, "totals.json"),
        JSON.stringify(result.datasets.totals.data, null, 2) + "\n",
        "utf8"
      );
    }
    if (result.datasets.sitemaps) {
      writeFileSync(
        join(tmpDir, "sitemaps.json"),
        JSON.stringify(result.datasets.sitemaps.data, null, 2) + "\n",
        "utf8"
      );
    }
    // manifest is written last, once all datasets have been serialized.
    writeFileSync(join(tmpDir, "manifest.json"), JSON.stringify(result.manifest, null, 2) + "\n", "utf8");

    mkdirSync(join(result.outputDir, ".."), { recursive: true });
    renameSync(tmpDir, result.outputDir);
  } catch (e) {
    rmSync(tmpDir, { recursive: true, force: true });
    throw new UsageError(`GSC_WRITE_FAILED: ${e.message}`);
  }
  return result.outputDir;
}

function printSummary(result) {
  const m = result.manifest;
  console.log(`site_url: ${m.siteUrl}`);
  console.log(`method: ${m.method}`);
  console.log(`requested_period: ${m.requestedStartDate}..${m.requestedEndDate}`);
  console.log(`actual_period: ${m.actualStartDate}..${m.actualEndDate}`);
  console.log("datasets:");
  for (const [k, v] of Object.entries(m.datasets)) {
    console.log(`  - ${k}: status=${v.status} rows=${v.rowCount} pages=${v.pageCount} truncated=${v.truncated}`);
  }
  if (m.warnings.length) {
    console.log("warnings:");
    m.warnings.forEach((w) => console.log(`  - ${w}`));
  }
  if (m.errors.length) {
    console.log("errors:");
    m.errors.forEach((e) => console.log(`  - ${e}`));
  }
  console.log(`planned_output_directory: ${result.outputDir}`);
  console.log(`final_status: ${result.status}`);
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

  const result = await runFetch(args);
  printSummary(result);

  if (result.status === "failed") {
    console.error(`fetch aborted: ${result.errorCode ?? "GSC_PARTIAL_DATA"}`);
    process.exit(1);
  }

  const dir = applyResult(result);
  console.log(`written: ${dir}`);
  process.exit(result.status === "success" ? 0 : 1);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main().catch((e) => {
    if (e instanceof GscApiError) {
      console.error(`${e.code}: ${e.message}`);
      process.exit(1);
    }
    console.error(`Unexpected error: ${e.message}`);
    process.exit(1);
  });
}
