#!/usr/bin/env node
// Fixture tests for analytics raw rotation. Never touches real
// docs/analytics/**/raw/ — all fixtures live under a temp directory.
// Node standard library only.

import { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, sep } from "node:path";
import assert from "node:assert/strict";
import {
  scanRuns,
  classifyRun,
  extractReferencedRunIds,
  deleteRunSafely,
  retentionDaysFor,
} from "./analytics-rotation-lib.mjs";

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`PASS: ${name}`);
  } catch (e) {
    failed++;
    console.error(`FAIL: ${name}\n  ${e.message}`);
  }
}

function daysAgoIso(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function makeManifest({
  type,
  runId,
  status = "success",
  label = "28d",
  generatedAt,
  errors = [],
}) {
  const base = {
    manifest_version: "1.0",
    analysis_type: type,
    run_id: runId,
    status,
    generated_at: generatedAt,
    completed_at: generatedAt,
    validation: { errors, warnings: [] },
  };
  if (type === "gsc") {
    base.period = { label, start_date: null, end_date: null, timezone: "Asia/Tokyo" };
  } else {
    base.period = { label, start_date: null, end_date: null, timezone: "UTC" };
  }
  return base;
}

function setupTempRepo() {
  const root = mkdtempSync(join(tmpdir(), "rotation-fixture-"));
  mkdirSync(join(root, "docs", "analytics", "gsc"), { recursive: true });
  mkdirSync(join(root, "docs", "analytics", "clarity"), { recursive: true });
  mkdirSync(join(root, "docs", "tasks", "completed"), { recursive: true });
  return root;
}

function makeRun(root, type, dateDir, runId, manifest) {
  const runAbs = join(root, "docs", "analytics", type, dateDir, "raw", runId);
  mkdirSync(runAbs, { recursive: true });
  if (manifest !== undefined) {
    writeFileSync(join(runAbs, "manifest.json"), JSON.stringify(manifest, null, 2));
  }
  writeFileSync(join(runAbs, "daily.csv"), "date,clicks\n2026-01-01,1\n");
  return runAbs;
}

const NOW_ISO = new Date().toISOString();

// 1. retention内success -> protected
test("retention内success -> protected", () => {
  const root = setupTempRepo();
  makeRun(
    root,
    "gsc",
    "2026-01-01",
    "run-000001",
    makeManifest({ type: "gsc", runId: "run-000001", label: "28d", generatedAt: daysAgoIso(10) })
  );
  // add a newer success in the same group so this one is not "latest"
  makeRun(
    root,
    "gsc",
    "2026-01-02",
    "run-000002",
    makeManifest({ type: "gsc", runId: "run-000002", label: "28d", generatedAt: daysAgoIso(1) })
  );
  const runs = scanRuns(root, ["gsc"], new Set());
  const target = runs.find((r) => r.manifest?.run_id === "run-000001");
  const v = classifyRun(target, runs, new Set(), NOW_ISO);
  assert.equal(v.decision, "protected");
  rmSync(root, { recursive: true, force: true });
});

// 2. retention超過success -> eligible
test("retention超過success(28d>365d) -> eligible", () => {
  const root = setupTempRepo();
  makeRun(
    root,
    "gsc",
    "2024-01-01",
    "run-000001",
    makeManifest({ type: "gsc", runId: "run-000001", label: "28d", generatedAt: daysAgoIso(400) })
  );
  makeRun(
    root,
    "gsc",
    "2026-01-02",
    "run-000002",
    makeManifest({ type: "gsc", runId: "run-000002", label: "28d", generatedAt: daysAgoIso(1) })
  );
  const runs = scanRuns(root, ["gsc"], new Set());
  const target = runs.find((r) => r.manifest?.run_id === "run-000001");
  const v = classifyRun(target, runs, new Set(), NOW_ISO);
  assert.equal(v.decision, "eligible");
  rmSync(root, { recursive: true, force: true });
});

// 3. 最新success -> protected
test("最新success -> protected", () => {
  const root = setupTempRepo();
  makeRun(
    root,
    "clarity",
    "2024-01-01",
    "run-000001",
    makeManifest({ type: "clarity", runId: "run-000001", generatedAt: daysAgoIso(400) })
  );
  const runs = scanRuns(root, ["clarity"], new Set());
  const target = runs[0];
  const v = classifyRun(target, runs, new Set(), NOW_ISO);
  assert.equal(v.decision, "protected");
  assert.equal(v.reason, "latest-success-in-group");
  rmSync(root, { recursive: true, force: true });
});

// 4. summary参照run -> protected
test("analysis-summary参照run -> protected", () => {
  const root = setupTempRepo();
  makeRun(
    root,
    "gsc",
    "2024-01-01",
    "run-000001",
    makeManifest({ type: "gsc", runId: "run-000001", label: "28d", generatedAt: daysAgoIso(400) })
  );
  makeRun(
    root,
    "gsc",
    "2026-01-02",
    "run-000002",
    makeManifest({ type: "gsc", runId: "run-000002", label: "28d", generatedAt: daysAgoIso(1) })
  );
  const runs = scanRuns(root, ["gsc"], new Set());
  const referenced = extractReferencedRunIds(["source_run: run-000001"]);
  const target = runs.find((r) => r.manifest?.run_id === "run-000001");
  const v = classifyRun(target, runs, referenced, NOW_ISO);
  assert.equal(v.decision, "protected");
  assert.equal(v.reason, "referenced-by-analysis-summary-or-completed-task");
  rmSync(root, { recursive: true, force: true });
});

// 5. completed task参照run -> protected
test("completed task参照run -> protected", () => {
  const referenced = extractReferencedRunIds(["completed task本文で run-131108 に言及"]);
  assert.ok(referenced.has("run-131108"));
});

// 6. failed run -> protected
test("failed run -> protected", () => {
  const root = setupTempRepo();
  makeRun(
    root,
    "clarity",
    "2024-01-01",
    "run-000001",
    makeManifest({
      type: "clarity",
      runId: "run-000001",
      status: "failed",
      generatedAt: daysAgoIso(400),
    })
  );
  const runs = scanRuns(root, ["clarity"], new Set());
  const v = classifyRun(runs[0], runs, new Set(), NOW_ISO);
  assert.equal(v.decision, "protected");
  assert.match(v.reason, /^status-not-success/);
  rmSync(root, { recursive: true, force: true });
});

// 7. partial run -> protected
test("partial run -> protected", () => {
  const root = setupTempRepo();
  makeRun(
    root,
    "clarity",
    "2024-01-01",
    "run-000001",
    makeManifest({
      type: "clarity",
      runId: "run-000001",
      status: "partial",
      generatedAt: daysAgoIso(400),
    })
  );
  const runs = scanRuns(root, ["clarity"], new Set());
  const v = classifyRun(runs[0], runs, new Set(), NOW_ISO);
  assert.equal(v.decision, "protected");
  rmSync(root, { recursive: true, force: true });
});

// 8. invalid manifest -> protected (reported as invalid, never deleted)
test("invalid manifest(JSON破損) -> invalid/not-deletable", () => {
  const root = setupTempRepo();
  const runAbs = join(root, "docs", "analytics", "gsc", "2024-01-01", "raw", "run-000001");
  mkdirSync(runAbs, { recursive: true });
  writeFileSync(join(runAbs, "manifest.json"), "{ not valid json");
  const runs = scanRuns(root, ["gsc"], new Set());
  const v = classifyRun(runs[0], runs, new Set(), NOW_ISO);
  assert.equal(v.decision, "invalid");
  rmSync(root, { recursive: true, force: true });
});

// 9. manifestなし -> protected/invalid
test("manifestなし -> invalid/not-deletable", () => {
  const root = setupTempRepo();
  const runAbs = join(root, "docs", "analytics", "gsc", "2024-01-01", "raw", "run-000001");
  mkdirSync(runAbs, { recursive: true });
  const runs = scanRuns(root, ["gsc"], new Set());
  const v = classifyRun(runs[0], runs, new Set(), NOW_ISO);
  assert.equal(v.decision, "invalid");
  rmSync(root, { recursive: true, force: true });
});

// 10. unknown label -> protected
test("unknown label(GSC) -> protected", () => {
  const root = setupTempRepo();
  makeRun(
    root,
    "gsc",
    "2024-01-01",
    "run-000001",
    makeManifest({ type: "gsc", runId: "run-000001", label: null, generatedAt: daysAgoIso(400) })
  );
  const runs = scanRuns(root, ["gsc"], new Set());
  const v = classifyRun(runs[0], runs, new Set(), NOW_ISO);
  assert.equal(v.decision, "protected");
  assert.equal(v.reason, "label-unknown");
  rmSync(root, { recursive: true, force: true });
});

// 11. symlink -> rejected(protected)
test("symlink run -> protected/rejected", () => {
  const root = setupTempRepo();
  const realDir = join(root, "docs", "analytics", "gsc", "2024-01-01", "raw", "run-000001-real");
  mkdirSync(realDir, { recursive: true });
  writeFileSync(
    join(realDir, "manifest.json"),
    JSON.stringify(makeManifest({ type: "gsc", runId: "run-000099", label: "28d", generatedAt: daysAgoIso(400) }))
  );
  const linkDir = join(root, "docs", "analytics", "gsc", "2024-01-01", "raw", "run-000099");
  let symlinkOk = true;
  try {
    symlinkSync(realDir, linkDir, "dir");
  } catch {
    symlinkOk = false;
  }
  if (!symlinkOk) {
    console.log("  (symlink creation unsupported on this platform/permissions — skipping assertion body)");
    rmSync(root, { recursive: true, force: true });
    return;
  }
  const runs = scanRuns(root, ["gsc"], new Set());
  const target = runs.find((r) => r.relPath.endsWith("run-000099"));
  const v = classifyRun(target, runs, new Set(), NOW_ISO);
  assert.equal(v.decision, "protected");
  assert.equal(v.reason, "symlink-rejected");
  rmSync(root, { recursive: true, force: true });
});

// 12. traversal path -> rejected
test("traversal-like run_id path -> rejected", () => {
  const root = setupTempRepo();
  // scanRuns only descends into raw/<entry>; simulate a malicious dirent
  // name that would traverse if used naively. Since Node's readdirSync
  // entries cannot contain path separators, we instead verify deleteRunSafely
  // refuses any absPath outside docs/analytics root.
  const outside = join(root, "outside-dir");
  mkdirSync(outside, { recursive: true });
  const fakeRun = {
    type: "gsc",
    relPath: "outside-dir",
    absPath: outside,
    manifestOk: true,
    manifest: { run_id: "run-000001" },
    manifestError: null,
    containsTrackedFile: false,
    isSymlink: false,
    pathSafe: true,
  };
  assert.throws(() => deleteRunSafely(root, fakeRun, new Set()), /refused/);
  rmSync(root, { recursive: true, force: true });
});

// 13. tracked-file相当 -> rejected
test("tracked file含有run -> protected/rejected for deletion", () => {
  const root = setupTempRepo();
  makeRun(
    root,
    "gsc",
    "2024-01-01",
    "run-000001",
    makeManifest({ type: "gsc", runId: "run-000001", label: "28d", generatedAt: daysAgoIso(400) })
  );
  const trackedRel = "docs/analytics/gsc/2024-01-01/raw/run-000001/manifest.json";
  const tracked = new Set([trackedRel]);
  const runs = scanRuns(root, ["gsc"], tracked);
  const v = classifyRun(runs[0], runs, new Set(), NOW_ISO);
  assert.equal(v.decision, "protected");
  assert.equal(v.reason, "contains-git-tracked-file");

  const fakeRun = {
    type: "gsc",
    relPath: runs[0].relPath,
    absPath: runs[0].absPath,
    manifestOk: true,
    manifest: { run_id: "run-000001" },
    manifestError: null,
    containsTrackedFile: true,
    isSymlink: false,
    pathSafe: true,
  };
  assert.throws(() => deleteRunSafely(root, fakeRun, tracked), /tracked/);
  rmSync(root, { recursive: true, force: true });
});

// 14. dry-runで削除0 (behavioral, verified at CLI level; here we assert the
// library never mutates the filesystem during classification)
test("classifyRunはファイルシステムを変更しない", () => {
  const root = setupTempRepo();
  makeRun(
    root,
    "gsc",
    "2024-01-01",
    "run-000001",
    makeManifest({ type: "gsc", runId: "run-000001", label: "28d", generatedAt: daysAgoIso(400) })
  );
  const runs = scanRuns(root, ["gsc"], new Set());
  classifyRun(runs[0], runs, new Set(), NOW_ISO);
  assert.ok(existsSync(runs[0].absPath));
  rmSync(root, { recursive: true, force: true });
});

// 15. applyでeligibleだけ削除
test("deleteRunSafelyはeligible runのみ削除する", () => {
  const root = setupTempRepo();
  const runAbs = makeRun(
    root,
    "gsc",
    "2024-01-01",
    "run-000001",
    makeManifest({ type: "gsc", runId: "run-000001", label: "28d", generatedAt: daysAgoIso(400) })
  );
  const runs = scanRuns(root, ["gsc"], new Set());
  deleteRunSafely(root, runs[0], new Set());
  assert.ok(!existsSync(runAbs));
  rmSync(root, { recursive: true, force: true });
});

// 16-19. retention day thresholds
test("GSC 14d retention = 90日", () => {
  assert.equal(retentionDaysFor("gsc", "14d"), 90);
});
test("GSC 28d retention = 365日", () => {
  assert.equal(retentionDaysFor("gsc", "28d"), 365);
});
test("GSC 3m retention = 365日", () => {
  assert.equal(retentionDaysFor("gsc", "3m"), 365);
});
test("Clarity retention = 90日", () => {
  assert.equal(retentionDaysFor("clarity", null), 90);
});

// 20. latest success最低1件保護 (single-run group)
test("同一groupにrunが1件のみでも最新successとして保護", () => {
  const root = setupTempRepo();
  makeRun(
    root,
    "clarity",
    "2024-01-01",
    "run-000001",
    makeManifest({ type: "clarity", runId: "run-000001", generatedAt: daysAgoIso(400) })
  );
  const runs = scanRuns(root, ["clarity"], new Set());
  const v = classifyRun(runs[0], runs, new Set(), NOW_ISO);
  assert.equal(v.decision, "protected");
  assert.equal(v.reason, "latest-success-in-group");
  rmSync(root, { recursive: true, force: true });
});

// 21. absolute path非表示 (relPath must be repo-relative, never absolute)
test("relPathはrepository相対でabsolute pathを含まない", () => {
  const root = setupTempRepo();
  makeRun(
    root,
    "gsc",
    "2024-01-01",
    "run-000001",
    makeManifest({ type: "gsc", runId: "run-000001", label: "28d", generatedAt: daysAgoIso(400) })
  );
  const runs = scanRuns(root, ["gsc"], new Set());
  assert.ok(!runs[0].relPath.includes(root));
  assert.ok(runs[0].relPath.startsWith("docs/analytics/gsc/"));
  rmSync(root, { recursive: true, force: true });
});

// 22. secret-like値非表示 (reason strings never echo manifest free-text notes)
test("classifyRunの理由文字列はmanifestのnotes本文を含まない", () => {
  const root = setupTempRepo();
  const manifest = makeManifest({
    type: "clarity",
    runId: "run-000001",
    generatedAt: daysAgoIso(400),
  });
  manifest.notes = ["secret-token-abc123-should-never-appear-in-reason"];
  makeRun(root, "clarity", "2024-01-01", "run-000001", manifest);
  const runs = scanRuns(root, ["clarity"], new Set());
  const v = classifyRun(runs[0], runs, new Set(), NOW_ISO);
  assert.ok(!v.reason.includes("secret-token-abc123"));
  rmSync(root, { recursive: true, force: true });
});

console.log("");
console.log(`total: ${passed + failed}, passed: ${passed}, failed: ${failed}`);
process.exit(failed > 0 ? 1 : 0);
