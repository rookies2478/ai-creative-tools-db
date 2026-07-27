#!/usr/bin/env node
// Fixture-based tests for scripts/import-gsc-manual-export.mjs.
// No real user ZIP is used or committed; fixtures are built in-memory with
// fictitious numbers and written to a temp directory that is removed after
// the run. Run: npm run analytics:gsc:test

import { mkdtempSync, rmSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
import { writeStoreZip } from "./gsc-import-lib.mjs";
import { runImport, applyResult, UsageError } from "./import-gsc-manual-export.mjs";

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`PASS: ${name}`);
  } catch (e) {
    failed++;
    failures.push({ name, error: e });
    console.log(`FAIL: ${name}`);
    console.log(`  ${e.message}`);
  }
}

function csv(header, rows) {
  return [header.join(","), ...rows.map((r) => r.join(","))].join("\n") + "\n";
}

const DAILY_HEADER = ["日付", "クリック数", "表示回数", "CTR", "掲載順位"];
const QUERIES_HEADER = ["上位のクエリ", "クリック数", "表示回数", "CTR", "掲載順位"];
const PAGES_HEADER = ["上位のページ", "クリック数", "表示回数", "CTR", "掲載順位"];
const COUNTRIES_HEADER = ["国", "クリック数", "表示回数", "CTR", "掲載順位"];
const DEVICES_HEADER = ["デバイス", "クリック数", "表示回数", "CTR", "掲載順位"];
const SEARCH_APPEARANCE_HEADER = ["検索での見え方", "クリック数", "表示回数", "CTR", "掲載順位"];
const FILTERS_HEADER = ["フィルタ", "値"];

function baseFiles({ pageUrl } = {}) {
  const files = [
    {
      name: "平均読み込み時間のチャート.csv",
      content: Buffer.from(
        csv(DAILY_HEADER, [
          ["2026-05-05", "0", "0", "", ""],
          ["2026-05-06", "1", "10", "10%", "5"],
          ["2026-05-07", "2", "20", "10%", "3"],
        ]),
        "utf8"
      ),
    },
    {
      name: "クエリ.csv",
      content: Buffer.from(
        csv(QUERIES_HEADER, [["fictitious query", "1", "3", "33.33%", "11.67"]]),
        "utf8"
      ),
    },
    {
      name: "ページ.csv",
      content: Buffer.from(
        csv(PAGES_HEADER, [["https://example.invalid/tools/fictitious/", "2", "131", "1.53%", "17.59"]]),
        "utf8"
      ),
    },
    {
      name: "国.csv",
      content: Buffer.from(csv(COUNTRIES_HEADER, [["日本", "2", "50", "4%", "27.86"]]), "utf8"),
    },
    {
      name: "デバイス.csv",
      content: Buffer.from(
        csv(DEVICES_HEADER, [
          ["PC", "1", "39", "2.56%", "32.31"],
          ["モバイル", "1", "11", "9.09%", "12.09"],
        ]),
        "utf8"
      ),
    },
    {
      name: "検索での見え方.csv",
      content: Buffer.from(csv(SEARCH_APPEARANCE_HEADER, []), "utf8"),
    },
  ];

  const filterRows = [
    ["検索タイプ", "ウェブ"],
    ["日付", "過去 3 か月間"],
  ];
  if (pageUrl) filterRows.push(["ページ", `+${pageUrl}`]);
  files.push({ name: "フィルタ.csv", content: Buffer.from(csv(FILTERS_HEADER, filterRows), "utf8") });

  return files;
}

let workDir;
function setup() {
  workDir = mkdtempSync(join(tmpdir(), "gsc-import-test-"));
}
function teardown() {
  rmSync(workDir, { recursive: true, force: true });
}

function writeZip(files, name = "fixture.zip") {
  const zipPath = join(workDir, name);
  writeFileSync(zipPath, writeStoreZip(files));
  return zipPath;
}

setup();

test("fixture_property: property scope success", () => {
  const zipPath = writeZip(baseFiles());
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000001",
    outRoot: join(workDir, "out"),
  });
  assert.equal(result.status, "success");
  assert.equal(result.manifest.validation.errors.length, 0);
});

test("fixture_page: page scope success with matching page-url", () => {
  const pageUrl = "https://example.invalid/tools/fictitious/";
  const zipPath = writeZip(baseFiles({ pageUrl }), "page.zip");
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "page",
    pageUrl,
    runIdOverride: "run-000002",
    outRoot: join(workDir, "out"),
  });
  assert.equal(result.status, "success");
  assert.equal(result.manifest.scope.page_url, pageUrl);
});

test("empty search-appearance is accepted as present+empty, not a failure", () => {
  const zipPath = writeZip(baseFiles());
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000003",
    outRoot: join(workDir, "out"),
  });
  assert.equal(result.manifest.datasets["search-appearance"].present, true);
  assert.equal(result.manifest.datasets["search-appearance"].empty, true);
  assert.equal(result.status, "success");
});

test("query-pages absent does not block success", () => {
  const zipPath = writeZip(baseFiles());
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000004",
    outRoot: join(workDir, "out"),
  });
  assert.equal(result.manifest.datasets["query-pages"].present, false);
  assert.equal(result.status, "success");
});

test("sitemaps absent does not block success", () => {
  const zipPath = writeZip(baseFiles());
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000005",
    outRoot: join(workDir, "out"),
  });
  assert.equal(result.manifest.datasets.sitemaps.present, false);
  assert.equal(result.status, "success");
});

test("totals calculation: impression-weighted, not simple average", () => {
  const zipPath = writeZip(baseFiles());
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000006",
    outRoot: join(workDir, "out"),
  });
  // daily rows: (0 clicks,0 impr,-), (1,10,pos5), (2,20,pos3)
  // clicks=3 impressions=30 ctr=0.1 position=(5*10+3*20)/30=(50+60)/30=110/30
  assert.equal(result.totals.row.clicks, 3);
  assert.equal(result.totals.row.impressions, 30);
  assert.ok(Math.abs(result.totals.row.ctr - 0.1) < 1e-9);
  assert.ok(Math.abs(result.totals.row.position - 110 / 30) < 1e-9);
});

test("percent CTR is converted to a 0-1 decimal", () => {
  const zipPath = writeZip(baseFiles());
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000007",
    outRoot: join(workDir, "out"),
  });
  const queriesRow = result.normalizedByDataset.queries.rows[0];
  assert.ok(Math.abs(queriesRow.ctr - 0.3333) < 0.001);
});

test("missing required dataset (pages removed) is reported and blocks success", () => {
  const files = baseFiles().filter((f) => f.name !== "ページ.csv");
  const zipPath = writeZip(files, "missing.zip");
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000008",
    outRoot: join(workDir, "out"),
  });
  assert.notEqual(result.status, "success");
  assert.ok(result.manifest.validation.errors.some((e) => e.includes("pages")));
});

test("duplicate dataset candidates are reported as an error, not auto-selected", () => {
  const files = baseFiles();
  files.push({
    name: "duplicate-daily.csv",
    content: Buffer.from(csv(DAILY_HEADER, [["2026-05-08", "0", "0", "", ""]]), "utf8"),
  });
  const zipPath = writeZip(files, "dup.zip");
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000009",
    outRoot: join(workDir, "out"),
  });
  assert.notEqual(result.status, "success");
  assert.ok(result.manifest.validation.errors.some((e) => e.includes("Duplicate candidates")));
});

test("invalid UTF-8 entry is skipped with a warning, not silently accepted", () => {
  const files = baseFiles();
  // Invalid UTF-8 byte sequence disguised as a .csv entry.
  files.push({ name: "broken-encoding.csv", content: Buffer.from([0xff, 0xfe, 0x00, 0x01]) });
  const zipPath = writeZip(files, "badenc.zip");
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000010",
    outRoot: join(workDir, "out"),
  });
  assert.ok(result.manifest.validation.warnings.some((w) => w.includes("broken-encoding.csv")));
  // Required datasets are still all present, so this alone should not fail the run.
  assert.equal(result.status, "success");
});

test("ZIP Slip entry (../) is rejected before any content is trusted", () => {
  const files = baseFiles();
  files.push({ name: "../../evil.csv", content: Buffer.from("x", "utf8") });
  const zipPath = writeZip(files, "slip.zip");
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000011",
    outRoot: join(workDir, "out"),
  });
  assert.equal(result.status, "failed");
});

test("scope mismatch (property claimed but filters.csv has a page filter) is an error", () => {
  const pageUrl = "https://example.invalid/tools/fictitious/";
  const zipPath = writeZip(baseFiles({ pageUrl }), "mismatch.zip");
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000012",
    outRoot: join(workDir, "out"),
  });
  assert.notEqual(result.status, "success");
  assert.ok(result.manifest.validation.errors.some((e) => e.includes("filters.csv records a page filter")));
});

test("existing output directory blocks apply (no overwrite)", () => {
  const zipPath = writeZip(baseFiles(), "overwrite.zip");
  const outRoot = join(workDir, "out-overwrite");
  const result1 = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000013",
    outRoot,
  });
  applyResult(result1);
  const result2 = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000013",
    outRoot,
  });
  assert.throws(() => applyResult(result2), UsageError);
});

test("dry-run performs zero writes", () => {
  const outRoot = join(workDir, "out-dry");
  const zipPath = writeZip(baseFiles(), "dry.zip");
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000014",
    outRoot,
  });
  assert.equal(existsSync(result.outputDir), false);
});

test("apply writes normalized headers and a parseable manifest.json", () => {
  const outRoot = join(workDir, "out-apply");
  const zipPath = writeZip(baseFiles(), "apply.zip");
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000015",
    outRoot,
  });
  const dir = applyResult(result);
  const manifestRaw = readFileSync(join(dir, "manifest.json"), "utf8");
  const manifest = JSON.parse(manifestRaw);
  assert.equal(manifest.manifest_version, "1.1");
  const dailyCsv = readFileSync(join(dir, "daily.csv"), "utf8");
  assert.ok(dailyCsv.startsWith("date,clicks,impressions,ctr,position"));
  const totalsCsv = readFileSync(join(dir, "totals.csv"), "utf8");
  assert.ok(totalsCsv.startsWith("clicks,impressions,ctr,position"));
});

test("manifest never records an absolute local path", () => {
  const outRoot = join(workDir, "out-abspath");
  const zipPath = writeZip(baseFiles(), "abspath.zip");
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000016",
    outRoot,
  });
  const serialized = JSON.stringify(result.manifest);
  assert.ok(!serialized.includes(workDir));
  assert.ok(!serialized.includes(process.env.USERNAME || process.env.USER || "\0no-such-user\0"));
});

test("no secret-like fields appear in the manifest output", () => {
  const outRoot = join(workDir, "out-secret");
  const zipPath = writeZip(baseFiles(), "fixture-export.zip");
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000017",
    outRoot,
  });
  const serialized = JSON.stringify(result.manifest).toLowerCase();
  for (const forbidden of ["token", "cookie", "password", "secret", "credential"]) {
    assert.ok(!serialized.includes(forbidden), `manifest unexpectedly contains "${forbidden}"`);
  }
});

test("source ZIP file is left unchanged after dry-run and apply", () => {
  const outRoot = join(workDir, "out-unchanged");
  const files = baseFiles();
  const zipBytes = writeStoreZip(files);
  const zipPath = join(workDir, "unchanged.zip");
  writeFileSync(zipPath, zipBytes);
  const before = readFileSync(zipPath);
  const result = runImport({
    input: zipPath,
    date: "2026-07-10",
    label: "3m",
    scope: "property",
    runIdOverride: "run-000018",
    outRoot,
  });
  applyResult(result);
  const after = readFileSync(zipPath);
  assert.ok(before.equals(after));
});

teardown();

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}
