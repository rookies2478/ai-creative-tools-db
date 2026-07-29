#!/usr/bin/env node
// Fixture/mock-based tests for scripts/analytics-gsc-fetch.mjs.
//
// No real Google API is contacted. A fake client is injected via the
// getClient dependency, so these tests never require GOOGLE_APPLICATION_CREDENTIALS
// or network access. Run: npm run analytics:gsc:fetch:test

import { mkdtempSync, rmSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
import { GscApiError } from "./gsc-api-errors.mjs";
import { runFetch, applyResult, UsageError } from "./analytics-gsc-fetch.mjs";
import { fetchAllRows } from "./gsc-api-lib.mjs";

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  return (async () => {
    try {
      await fn();
      passed++;
      console.log(`PASS: ${name}`);
    } catch (e) {
      failed++;
      failures.push({ name, error: e });
      console.log(`FAIL: ${name}`);
      console.log(`  ${e.stack || e.message}`);
    }
  })();
}

const NOW = new Date("2026-07-30T12:00:00.000Z");

function dimKey(dimensions) {
  return JSON.stringify([...dimensions].sort());
}

// Builds a mock client. `pages` maps a dimension-key to an array of "pages"
// (each page is an array of API rows), so pagination can be simulated by
// providing more than one page for a given dataset.
function makeMockClient({ pages = {}, sitemapRows = [], onQuery = null, onSitemaps = null } = {}) {
  const callCounts = {};
  return {
    searchanalytics: {
      query: async ({ requestBody }) => {
        if (onQuery) onQuery(requestBody);
        const key = dimKey(requestBody.dimensions ?? []);
        callCounts[key] = (callCounts[key] ?? 0) + 1;
        const pageList = pages[key] ?? [[]];
        const pageIndex = Math.floor((requestBody.startRow ?? 0) / requestBody.rowLimit);
        return { rows: pageList[pageIndex] ?? [] };
      },
    },
    sitemaps: {
      list: async (params) => {
        if (onSitemaps) onSitemaps(params);
        return { sitemap: sitemapRows };
      },
    },
    _callCounts: callCounts,
  };
}

function row(keys, clicks, impressions, ctr, position) {
  return { keys, clicks, impressions, ctr, position };
}

function baselineFixtures() {
  const dailyRows = [
    row(["2026-07-14"], 2, 40, 0.05, 8.5),
    row(["2026-07-15"], 3, 50, 0.06, 7.2),
  ];
  return {
    pages: {
      [dimKey(["date"])]: [dailyRows],
      [dimKey(["query"])]: [[row(["fictitious query"], 4, 60, 0.0666, 9.1)]],
      [dimKey(["page"])]: [[row(["https://example.invalid/tools/fictitious/"], 5, 90, 0.055, 6.4)]],
      [dimKey(["device"])]: [[row(["DESKTOP"], 5, 90, 0.055, 6.4)]],
      [dimKey(["country"])]: [[row(["jpn"], 5, 90, 0.055, 6.4)]],
      [dimKey(["searchAppearance"])]: [[]],
      [dimKey(["query", "page"])]: [
        [row(["fictitious query", "https://example.invalid/tools/fictitious/"], 4, 60, 0.0666, 9.1)],
      ],
      [dimKey([])]: [[row([], 5, 90, 0.0555, 7.907)]],
    },
    sitemapRows: [
      {
        path: "https://aicreative-db.com/sitemap.xml",
        lastSubmitted: "2026-07-01T00:00:00.000Z",
        lastDownloaded: "2026-07-29T00:00:00.000Z",
        isPending: false,
        isSitemapsIndex: false,
        type: "sitemap",
        warnings: 0,
        errors: 0,
        contents: [{ type: "web", submitted: 90 }],
      },
    ],
  };
}

async function run() {
  await test("mock_success: full run writes all datasets with method=api", async () => {
    const client = makeMockClient(baselineFixtures());
    const outRoot = mkdtempSync(join(tmpdir(), "gsc-api-test-"));
    try {
      const result = await runFetch(
        { start: "2026-07-14", end: "2026-07-15", outRoot, runIdOverride: "run-000001" },
        { getClient: async () => client, now: NOW }
      );
      assert.equal(result.status, "success");
      assert.equal(result.manifest.method, "api");
      assert.equal(result.manifest.siteUrl, "sc-domain:aicreative-db.com");
      const dir = applyResult(result);
      assert.ok(existsSync(join(dir, "manifest.json")));
      assert.ok(existsSync(join(dir, "totals.json")));
      assert.ok(existsSync(join(dir, "daily.csv")));
      assert.ok(existsSync(join(dir, "query-pages.csv")));
      assert.ok(existsSync(join(dir, "sitemaps.json")));
      const manifest = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8"));
      assert.equal(manifest.credentialPathStored, false);
      assert.equal(manifest.datasets.daily.rowCount, 2);
    } finally {
      rmSync(outRoot, { recursive: true, force: true });
    }
  });

  await test("pagination: multiple pages are concatenated and counted", async () => {
    // Exercised directly against fetchAllRows with a small rowLimit — the
    // real API's rowLimit (25000) is too large to fixture meaningfully here,
    // but the paging loop itself is rowLimit-agnostic.
    const allRows = [
      row(["q1"], 1, 10, 0.1, 5),
      row(["q2"], 1, 10, 0.1, 5),
      row(["q3"], 1, 10, 0.1, 5),
    ];
    const queryFn = async ({ startRow, rowLimit }) => ({
      rows: allRows.slice(startRow, startRow + rowLimit),
    });
    const result = await fetchAllRows(queryFn, {}, { rowLimit: 2, maxPages: 10, maxRows: 100 });
    assert.equal(result.rows.length, 3);
    assert.equal(result.pageCount, 2);
    assert.equal(result.truncated, false);
  });

  await test("query_pages: composite dimension rows normalize to query/page columns", async () => {
    const client = makeMockClient(baselineFixtures());
    const outRoot = mkdtempSync(join(tmpdir(), "gsc-api-test-"));
    try {
      const result = await runFetch(
        { start: "2026-07-14", end: "2026-07-15", outRoot, runIdOverride: "run-000003" },
        { getClient: async () => client, now: NOW }
      );
      const dir = applyResult(result);
      const csv = readFileSync(join(dir, "query-pages.csv"), "utf8");
      assert.match(csv, /^query,page,clicks,impressions,ctr,position/);
      assert.match(csv, /fictitious query,https:\/\/example\.invalid\/tools\/fictitious\//);
    } finally {
      rmSync(outRoot, { recursive: true, force: true });
    }
  });

  await test("sitemaps: list is captured with required fields, indexed is never used", async () => {
    const client = makeMockClient(baselineFixtures());
    const outRoot = mkdtempSync(join(tmpdir(), "gsc-api-test-"));
    try {
      const result = await runFetch(
        { start: "2026-07-14", end: "2026-07-15", outRoot, runIdOverride: "run-000004" },
        { getClient: async () => client, now: NOW }
      );
      const dir = applyResult(result);
      const sitemaps = JSON.parse(readFileSync(join(dir, "sitemaps.json"), "utf8"));
      assert.equal(sitemaps.length, 1);
      assert.equal(sitemaps[0].contents[0].submitted, 90);
      assert.equal("indexed" in sitemaps[0].contents[0], false);
    } finally {
      rmSync(outRoot, { recursive: true, force: true });
    }
  });

  await test("auth_missing: credentials not configured yields GSC_CREDENTIALS_NOT_CONFIGURED and writes nothing", async () => {
    const outRoot = mkdtempSync(join(tmpdir(), "gsc-api-test-"));
    try {
      const result = await runFetch(
        { start: "2026-07-14", end: "2026-07-15", outRoot, runIdOverride: "run-000005" },
        {
          getClient: async () => {
            throw new GscApiError("GSC_CREDENTIALS_NOT_CONFIGURED", "not set");
          },
          now: NOW,
        }
      );
      assert.equal(result.status, "failed");
      assert.equal(result.errorCode, "GSC_CREDENTIALS_NOT_CONFIGURED");
      assert.equal(result.canApply, false);
      assert.throws(() => applyResult(result), UsageError);
      assert.equal(existsSync(result.outputDir), false);
    } finally {
      rmSync(outRoot, { recursive: true, force: true });
    }
  });

  await test("permission_denied: GSC_PERMISSION_DENIED aborts the run without partial writes", async () => {
    const outRoot = mkdtempSync(join(tmpdir(), "gsc-api-test-"));
    try {
      const client = makeMockClient({
        ...baselineFixtures(),
        onQuery: (body) => {
          if (dimKey(body.dimensions ?? []) === dimKey(["query"])) {
            throw new GscApiError("GSC_PERMISSION_DENIED", "no access");
          }
        },
      });
      const result = await runFetch(
        { start: "2026-07-14", end: "2026-07-15", outRoot, runIdOverride: "run-000006" },
        { getClient: async () => client, now: NOW }
      );
      assert.equal(result.status, "failed");
      assert.equal(result.errorCode, "GSC_PERMISSION_DENIED");
      assert.equal(existsSync(result.outputDir), false);
    } finally {
      rmSync(outRoot, { recursive: true, force: true });
    }
  });

  await test("rate_limit: GSC_RATE_LIMITED is classified and aborts the run", async () => {
    const outRoot = mkdtempSync(join(tmpdir(), "gsc-api-test-"));
    try {
      const client = makeMockClient({
        ...baselineFixtures(),
        onQuery: (body) => {
          if (dimKey(body.dimensions ?? []) === dimKey(["page"])) {
            throw new GscApiError("GSC_RATE_LIMITED", "rate limited");
          }
        },
      });
      const result = await runFetch(
        { start: "2026-07-14", end: "2026-07-15", outRoot, runIdOverride: "run-000007" },
        { getClient: async () => client, now: NOW }
      );
      assert.equal(result.status, "failed");
      assert.equal(result.errorCode, "GSC_RATE_LIMITED");
    } finally {
      rmSync(outRoot, { recursive: true, force: true });
    }
  });

  await test("partial_failure: query-pages truncation degrades status to partial, not failed", async () => {
    const fixtures = baselineFixtures();
    const outRoot = mkdtempSync(join(tmpdir(), "gsc-api-test-"));
    try {
      const bigPage = Array.from({ length: 25000 }, (_, i) =>
        row([`q${i}`, `https://example.invalid/${i}/`], 1, 10, 0.1, 5)
      );
      const client = {
        searchanalytics: {
          query: async ({ requestBody }) => {
            const key = dimKey(requestBody.dimensions ?? []);
            if (key === dimKey(["query", "page"])) {
              // Every page comes back full, forcing the safety cap to trigger.
              return { rows: bigPage };
            }
            const pageList = fixtures.pages[key] ?? [[]];
            const pageIndex = Math.floor((requestBody.startRow ?? 0) / requestBody.rowLimit);
            return { rows: pageList[pageIndex] ?? [] };
          },
        },
        sitemaps: { list: async () => ({ sitemap: fixtures.sitemapRows }) },
      };
      const result = await runFetch(
        {
          start: "2026-07-14",
          end: "2026-07-15",
          outRoot,
          runIdOverride: "run-000008",
        },
        { getClient: async () => client, now: NOW }
      );
      // With DEFAULT_MAX_PAGES/QUERY_PAGES_MAX_ROWS this will hit the safety cap.
      assert.equal(result.manifest.datasets["query-pages"].truncated, true);
      assert.equal(result.status, "partial");
      assert.ok(result.manifest.errors.some((e) => e.startsWith("GSC_DATASET_TRUNCATED")));
      const dir = applyResult(result);
      assert.ok(existsSync(join(dir, "query-pages.csv")));
    } finally {
      rmSync(outRoot, { recursive: true, force: true });
    }
  });

  await test("truncated: manifest.truncated lists the affected dataset key", async () => {
    const fixtures = baselineFixtures();
    const bigPage = Array.from({ length: 25000 }, (_, i) =>
      row([`q${i}`, `https://example.invalid/${i}/`], 1, 10, 0.1, 5)
    );
    const client = {
      searchanalytics: {
        query: async ({ requestBody }) => {
          const key = dimKey(requestBody.dimensions ?? []);
          if (key === dimKey(["query", "page"])) return { rows: bigPage };
          const pageList = fixtures.pages[key] ?? [[]];
          const pageIndex = Math.floor((requestBody.startRow ?? 0) / requestBody.rowLimit);
          return { rows: pageList[pageIndex] ?? [] };
        },
      },
      sitemaps: { list: async () => ({ sitemap: fixtures.sitemapRows }) },
    };
    const result = await runFetch(
      { start: "2026-07-14", end: "2026-07-15", runIdOverride: "run-000009" },
      { getClient: async () => client, now: NOW }
    );
    assert.deepEqual(result.manifest.truncated, ["query-pages"]);
  });

  await test("date_validation: start and days specified together is rejected", async () => {
    const result = await runFetch(
      { start: "2026-07-14", end: "2026-07-15", days: 14 },
      { getClient: async () => makeMockClient(baselineFixtures()), now: NOW }
    );
    assert.equal(result.status, "failed");
    assert.equal(result.errorCode, "GSC_INVALID_DATE_RANGE");
  });

  await test("date_validation: future end date is rejected", async () => {
    const result = await runFetch(
      { start: "2026-08-01", end: "2026-08-05" },
      { getClient: async () => makeMockClient(baselineFixtures()), now: NOW }
    );
    assert.equal(result.status, "failed");
    assert.equal(result.errorCode, "GSC_INVALID_DATE_RANGE");
  });

  await test("date_validation: default 14-day window ends dataLagDays before now", async () => {
    const client = makeMockClient({
      pages: {
        [dimKey(["date"])]: [[]],
        [dimKey(["query"])]: [[]],
        [dimKey(["page"])]: [[]],
        [dimKey(["device"])]: [[]],
        [dimKey(["country"])]: [[]],
        [dimKey(["searchAppearance"])]: [[]],
        [dimKey(["query", "page"])]: [[]],
        [dimKey([])]: [[row([], 0, 0, 0, null)]],
      },
      sitemapRows: [],
    });
    const result = await runFetch({}, { getClient: async () => client, now: NOW });
    assert.equal(result.manifest.requestedEndDate, "2026-07-27"); // NOW - 3 days
    assert.equal(result.manifest.requestedStartDate, "2026-07-14"); // 14 days inclusive
  });

  await test("totals_daily_validation: mismatch beyond tolerance is recorded, not silently corrected", async () => {
    const fixtures = baselineFixtures();
    fixtures.pages[dimKey([])] = [[row([], 999, 999, 0.5, 1)]]; // deliberately inconsistent with daily
    const client = makeMockClient(fixtures);
    const result = await runFetch(
      { start: "2026-07-14", end: "2026-07-15", runIdOverride: "run-000010" },
      { getClient: async () => client, now: NOW }
    );
    assert.equal(result.manifest.totalsDailyCheck.status, "mismatch");
    assert.equal(result.manifest.datasets.totals.rowCount, 1); // value not altered
  });

  await test("secret_check: manifest never contains credential path, email, or token-like fields", async () => {
    const client = makeMockClient(baselineFixtures());
    const result = await runFetch(
      { start: "2026-07-14", end: "2026-07-15", runIdOverride: "run-000011" },
      { getClient: async () => client, now: NOW }
    );
    const serialized = JSON.stringify(result.manifest);
    for (const forbidden of ["private_key", "client_email", "Authorization", "Bearer ", "GOOGLE_APPLICATION_CREDENTIALS"]) {
      assert.equal(serialized.includes(forbidden), false, `manifest must not contain "${forbidden}"`);
    }
    assert.equal(result.manifest.credentialPathStored, false);
  });

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) {
    process.exitCode = 1;
  }
}

run();
