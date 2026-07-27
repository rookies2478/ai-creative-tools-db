#!/usr/bin/env node
// Safe, dry-run-first rotation for GSC and Clarity raw runs.
// Node standard library only. No external network, no credential access.
//
// Usage:
//   node scripts/rotate-analytics-raw.mjs --dry-run [--type gsc|clarity|all] [--as-of YYYY-MM-DD]
//   node scripts/rotate-analytics-raw.mjs --apply    [--type gsc|clarity|all] [--as-of YYYY-MM-DD]
//
// --dry-run is the default when neither flag is given. --dry-run and
// --apply together is an error. Output paths are always repository-relative;
// no absolute path, username, token, or personal data is ever printed.

import { execSync } from "node:child_process";
import { readdirSync, statSync, readFileSync as rf } from "node:fs";
import { join, resolve } from "node:path";
import {
  scanRuns,
  classifyRun,
  extractReferencedRunIds,
  deleteRunSafely,
} from "./analytics-rotation-lib.mjs";

const REPO_ROOT = resolve(process.cwd());

function parseArgs(argv) {
  const args = { mode: null, type: "all", asOf: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") {
      if (args.mode === "apply") failArgs("--dry-run と --apply は同時指定できません");
      args.mode = "dry-run";
    } else if (a === "--apply") {
      if (args.mode === "dry-run") failArgs("--dry-run と --apply は同時指定できません");
      args.mode = "apply";
    } else if (a === "--type") {
      args.type = argv[++i];
    } else if (a === "--as-of") {
      args.asOf = argv[++i];
    } else {
      failArgs(`不明な引数: ${a}`);
    }
  }
  if (!args.mode) args.mode = "dry-run";
  if (!["gsc", "clarity", "all"].includes(args.type)) {
    failArgs(`--type は gsc|clarity|all のいずれかである必要があります: ${args.type}`);
  }
  if (args.asOf && Number.isNaN(new Date(args.asOf).getTime())) {
    failArgs(`--as-of の日付形式が不正です: ${args.asOf}`);
  }
  return args;
}

function failArgs(msg) {
  console.error(`rotate-analytics-raw: 引数エラー: ${msg}`);
  process.exit(1);
}

function gitTrackedFiles() {
  const out = execSync("git ls-files", { encoding: "utf8", cwd: REPO_ROOT });
  return new Set(
    out
      .split(/\r?\n/)
      .filter(Boolean)
      .map((p) => p.replace(/\\/g, "/"))
  );
}

function collectAnalysisSummaryText(types) {
  const texts = [];
  for (const type of types) {
    const baseAbs = join(REPO_ROOT, "docs", "analytics", type);
    let dateDirs;
    try {
      dateDirs = readdirSync(baseAbs, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const d of dateDirs) {
      if (!d.isDirectory() || d.name === "templates") continue;
      const summaryPath = join(baseAbs, d.name, "analysis-summary.md");
      try {
        texts.push(rf(summaryPath, "utf8"));
      } catch {
        // no summary yet for this date — fine
      }
    }
  }
  return texts;
}

function collectCompletedTaskText() {
  const dir = join(REPO_ROOT, "docs", "tasks", "completed");
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const texts = [];
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith(".md")) continue;
    texts.push(rf(join(dir, e.name), "utf8"));
  }
  return texts;
}

function typesToScan(typeArg) {
  if (typeArg === "all") return ["gsc", "clarity"];
  return [typeArg];
}

function formatBytes(n) {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${(n / 1024 / 1024).toFixed(1)}MB`;
}

function dirSizeBytes(absPath) {
  let total = 0;
  let entries;
  try {
    entries = readdirSync(absPath, { withFileTypes: true });
  } catch {
    return 0;
  }
  for (const e of entries) {
    const p = join(absPath, e.name);
    if (e.isDirectory()) {
      total += dirSizeBytes(p);
    } else if (e.isFile()) {
      try {
        total += statSync(p).size;
      } catch {
        // ignore transient stat failures
      }
    }
  }
  return total;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const asOfIso = args.asOf ? new Date(args.asOf).toISOString() : new Date().toISOString();
  const types = typesToScan(args.type);

  const trackedFiles = gitTrackedFiles();
  const runs = scanRuns(REPO_ROOT, types, trackedFiles);

  const referencedTexts = [
    ...collectAnalysisSummaryText(types),
    ...collectCompletedTaskText(),
  ];
  const referencedRunIds = extractReferencedRunIds(referencedTexts);

  const results = runs.map((run) => ({
    run,
    verdict: classifyRun(run, runs, referencedRunIds, asOfIso),
  }));

  const eligible = results.filter((r) => r.verdict.decision === "eligible");
  const protected_ = results.filter((r) => r.verdict.decision === "protected");
  const invalid = results.filter((r) => r.verdict.decision === "invalid");

  console.log(`as_of: ${asOfIso.slice(0, 10)}`);
  console.log(`mode: ${args.mode}`);
  console.log(`type: ${args.type}`);
  console.log(`scanned_runs: ${runs.length}`);
  console.log(`eligible_runs: ${eligible.length}`);
  console.log(`protected_runs: ${protected_.length}`);
  console.log(`invalid_runs: ${invalid.length}`);

  let totalEligibleBytes = 0;
  for (const r of eligible) totalEligibleBytes += dirSizeBytes(r.run.absPath);
  console.log(`total_bytes_eligible: ${formatBytes(totalEligibleBytes)}`);

  console.log("");
  console.log("-- runs --");
  for (const r of results) {
    const m = r.run.manifest;
    const generatedAt = m?.generated_at || m?.completed_at || "unknown";
    console.log(
      `[${r.verdict.decision}] type=${r.run.type} run_id=${m?.run_id || "unknown"} path=${r.run.relPath} generated_at=${generatedAt} reason=${r.verdict.reason}`
    );
  }

  if (args.mode === "dry-run") {
    console.log("");
    console.log("dry-run: 0 files deleted (no filesystem changes made)");
    process.exit(0);
  }

  // --apply: re-scan and re-classify fresh (never trust the dry-run pass
  // above), then delete only what is eligible, re-validating safety
  // immediately before each deletion and stopping on first failure.
  const freshTrackedFiles = gitTrackedFiles();
  const freshRuns = scanRuns(REPO_ROOT, types, freshTrackedFiles);
  const freshReferenced = extractReferencedRunIds([
    ...collectAnalysisSummaryText(types),
    ...collectCompletedTaskText(),
  ]);
  const freshResults = freshRuns.map((run) => ({
    run,
    verdict: classifyRun(run, freshRuns, freshReferenced, asOfIso),
  }));
  const freshEligible = freshResults.filter((r) => r.verdict.decision === "eligible");

  console.log("");
  console.log(`apply: re-validated eligible_runs=${freshEligible.length}`);

  const deleted = [];
  for (const r of freshEligible) {
    try {
      deleteRunSafely(REPO_ROOT, r.run, freshTrackedFiles);
      deleted.push(r.run.relPath);
      console.log(`deleted: ${r.run.relPath}`);
    } catch (e) {
      console.error(`apply stopped: failed to delete ${r.run.relPath}: ${e.message}`);
      console.error(`already_deleted: ${deleted.length} run(s)`);
      console.error("rollback is not guaranteed for already-deleted runs.");
      process.exit(1);
    }
  }

  console.log("");
  console.log(`apply complete: ${deleted.length} run(s) deleted`);
  process.exit(0);
}

main();
