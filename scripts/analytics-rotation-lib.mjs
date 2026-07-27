// Pure logic for analytics raw run rotation (GSC + Clarity).
// Node standard library only — no new npm dependency.
//
// This module never touches the filesystem directly except via the small
// I/O helpers exposed at the bottom (scanRuns, deleteRun). All retention /
// protection decisions are pure functions of manifest data so they can be
// unit-tested against in-memory fixtures.

import { readFileSync, readdirSync, statSync, lstatSync, rmSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

export const RETENTION_DAYS = {
  gsc: {
    "14d": 90,
    "28d": 365,
    "3m": 365,
  },
  clarity: {
    default: 90,
  },
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function ageDays(generatedAtIso, asOfIso) {
  const generated = new Date(generatedAtIso).getTime();
  const asOf = new Date(asOfIso).getTime();
  if (Number.isNaN(generated) || Number.isNaN(asOf)) return null;
  return (asOf - generated) / MS_PER_DAY;
}

export function retentionDaysFor(type, label) {
  if (type === "clarity") return RETENTION_DAYS.clarity.default;
  if (type === "gsc") {
    if (label && RETENTION_DAYS.gsc[label] !== undefined) {
      return RETENTION_DAYS.gsc[label];
    }
    return null; // unknown label -> retention undetermined
  }
  return null;
}

// A "run" record shape (built by scanRuns or by fixtures directly):
// {
//   type: "gsc" | "clarity",
//   relPath: "docs/analytics/gsc/2026-07-10/raw/run-094504", (repo-relative, posix-ish)
//   absPath: absolute path (only used for filesystem ops, never printed),
//   manifestOk: boolean,
//   manifestError: string | null,
//   manifest: parsed manifest object | null,
//   containsTrackedFile: boolean,
//   isSymlink: boolean,
//   pathSafe: boolean,
// }

function safeDeep(obj, path, fallback = undefined) {
  let cur = obj;
  for (const key of path) {
    if (cur == null || typeof cur !== "object") return fallback;
    cur = cur[key];
  }
  return cur === undefined ? fallback : cur;
}

// Decide protection / eligibility for a single run given the full run set
// (needed for "latest success per type+period" comparison) and the set of
// referenced run ids (from analysis-summary + completed tasks).
export function classifyRun(run, allRuns, referencedRunIds, asOfIso) {
  const reasons = [];

  if (run.isSymlink) {
    return { decision: "protected", reason: "symlink-rejected" };
  }
  if (!run.pathSafe) {
    return { decision: "protected", reason: "path-safety-check-failed" };
  }
  if (run.containsTrackedFile) {
    return { decision: "protected", reason: "contains-git-tracked-file" };
  }
  if (!run.manifestOk) {
    return { decision: "invalid", reason: run.manifestError || "manifest-invalid-or-missing" };
  }

  const manifest = run.manifest;
  const status = manifest.status;
  const runId = manifest.run_id;

  if (referencedRunIds.has(runId)) {
    return { decision: "protected", reason: "referenced-by-analysis-summary-or-completed-task" };
  }

  if (status !== "success") {
    return { decision: "protected", reason: `status-not-success:${status || "unknown"}` };
  }

  const generatedAt = manifest.generated_at || manifest.completed_at;
  if (!generatedAt) {
    return { decision: "protected", reason: "generated-at-unknown" };
  }

  const label = safeDeep(manifest, ["period", "label"], null);
  if (run.type === "gsc" && !label) {
    return { decision: "protected", reason: "label-unknown" };
  }

  const retention = retentionDaysFor(run.type, label);
  if (retention === null) {
    return { decision: "protected", reason: `retention-undetermined:label=${label || "unknown"}` };
  }

  const groupKey = periodGroupKey(run);
  const isLatestSuccess = isLatestSuccessInGroup(run, allRuns, groupKey);
  if (isLatestSuccess) {
    return { decision: "protected", reason: "latest-success-in-group" };
  }

  const age = ageDays(generatedAt, asOfIso);
  if (age === null) {
    return { decision: "protected", reason: "age-undeterminable" };
  }
  if (age <= retention) {
    return {
      decision: "protected",
      reason: `within-retention:${Math.floor(age)}d<=${retention}d`,
    };
  }

  const errors = safeDeep(manifest, ["validation", "errors"], []);
  if (!Array.isArray(errors) || errors.length > 0) {
    return { decision: "protected", reason: "validation-errors-present" };
  }

  reasons.push(`retention-exceeded:${Math.floor(age)}d>${retention}d`);
  return { decision: "eligible", reason: reasons.join(",") };
}

// Group by type + scope-ish period so "latest success" is computed per
// (type, label) for GSC and per (type) for Clarity, matching README rules.
function periodGroupKey(run) {
  const label = safeDeep(run.manifest, ["period", "label"], "unknown");
  return `${run.type}:${label}`;
}

function isLatestSuccessInGroup(run, allRuns, groupKey) {
  const successesInGroup = allRuns.filter((r) => {
    if (!r.manifestOk) return false;
    if (r.manifest.status !== "success") return false;
    if (periodGroupKey(r) !== groupKey) return false;
    return true;
  });
  if (successesInGroup.length === 0) return false;

  const completedAt = (r) => {
    const c = r.manifest.completed_at || r.manifest.generated_at;
    const t = new Date(c).getTime();
    return Number.isNaN(t) ? -Infinity : t;
  };

  let latest = successesInGroup[0];
  for (const r of successesInGroup) {
    if (completedAt(r) > completedAt(latest)) latest = r;
  }
  return latest.relPath === run.relPath;
}

// ---------------------------------------------------------------------------
// Referenced-run extraction (analysis-summary.md + completed tasks)
// ---------------------------------------------------------------------------

const RUN_ID_PATTERN = /run-\d{6}(?:-[a-z]+)?/g;

export function extractReferencedRunIds(texts) {
  const ids = new Set();
  for (const text of texts) {
    if (!text) continue;
    const matches = text.match(RUN_ID_PATTERN);
    if (matches) {
      for (const m of matches) ids.add(m);
    }
  }
  return ids;
}

// ---------------------------------------------------------------------------
// Filesystem I/O helpers (kept thin; classifyRun above stays pure/testable)
// ---------------------------------------------------------------------------

export function isPathInside(parentAbs, childAbs) {
  const rel = relative(parentAbs, childAbs);
  return rel !== "" && !rel.startsWith("..") && !rel.split(sep).includes("..") && !resolve(childAbs).startsWith("..");
}

function isUnderRoot(rootAbs, targetAbs) {
  const rel = relative(rootAbs, targetAbs);
  if (rel === "") return false;
  if (rel.startsWith("..")) return false;
  if (rel.split(/[\\/]/).includes("..")) return false;
  return true;
}

function checkContainsTrackedFile(absPath, trackedFilesSet, repoRootAbs) {
  // trackedFilesSet contains repo-relative posix paths of all git-tracked files.
  const relFromRoot = relative(repoRootAbs, absPath).split(sep).join("/");
  for (const tracked of trackedFilesSet) {
    if (tracked === relFromRoot || tracked.startsWith(relFromRoot + "/")) {
      return true;
    }
  }
  return false;
}

function readManifest(runAbsPath) {
  const manifestPath = join(runAbsPath, "manifest.json");
  let raw;
  try {
    raw = readFileSync(manifestPath, "utf8");
  } catch {
    return { manifestOk: false, manifestError: "manifest.json missing", manifest: null };
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { manifestOk: false, manifestError: "manifest.json parse failure", manifest: null };
  }
  if (!parsed || typeof parsed !== "object" || !parsed.run_id || !parsed.status) {
    return { manifestOk: false, manifestError: "manifest.json missing required fields", manifest: parsed };
  }
  return { manifestOk: true, manifestError: null, manifest: parsed };
}

// Scans docs/analytics/<type>/**/raw/run-* directories under repoRootAbs.
// trackedFilesSet: Set<string> of git-tracked repo-relative posix paths
// (from `git ls-files`), used for the tracked-file-protection check.
export function scanRuns(repoRootAbs, types, trackedFilesSet) {
  const runs = [];
  for (const type of types) {
    const baseAbs = join(repoRootAbs, "docs", "analytics", type);
    let dateDirs;
    try {
      dateDirs = readdirSync(baseAbs, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const dateDir of dateDirs) {
      if (!dateDir.isDirectory()) continue;
      if (dateDir.name === "templates") continue;
      const rawAbs = join(baseAbs, dateDir.name, "raw");
      let runDirs;
      try {
        runDirs = readdirSync(rawAbs, { withFileTypes: true });
      } catch {
        continue;
      }
      for (const runDir of runDirs) {
        const runAbs = join(rawAbs, runDir.name);
        let lst;
        try {
          lst = lstatSync(runAbs);
        } catch {
          continue;
        }
        const isSymlink = lst.isSymbolicLink();
        const pathSafe =
          !isSymlink &&
          isUnderRoot(repoRootAbs, runAbs) &&
          isUnderRoot(baseAbs, runAbs) &&
          runDir.name.startsWith("run-") &&
          !runDir.name.includes("..");

        let manifestOk = false;
        let manifestError = "symlink-rejected";
        let manifest = null;
        if (!isSymlink && pathSafe) {
          const r = readManifest(runAbs);
          manifestOk = r.manifestOk;
          manifestError = r.manifestError;
          manifest = r.manifest;
        }

        const containsTrackedFile = pathSafe
          ? checkContainsTrackedFile(runAbs, trackedFilesSet, repoRootAbs)
          : true; // fail safe: treat unsafe paths as if they contained tracked files

        runs.push({
          type,
          relPath: relative(repoRootAbs, runAbs).split(sep).join("/"),
          absPath: runAbs,
          manifestOk,
          manifestError,
          manifest,
          containsTrackedFile,
          isSymlink,
          pathSafe,
        });
      }
    }
  }
  return runs;
}

// Deletes a single run directory after re-validating safety in isolation.
// Throws on any safety violation instead of silently skipping, so the
// caller can stop the apply loop.
export function deleteRunSafely(repoRootAbs, run, trackedFilesSet) {
  const runAbs = resolve(run.absPath);
  const analyticsRootAbs = resolve(join(repoRootAbs, "docs", "analytics"));

  if (!isUnderRoot(analyticsRootAbs, runAbs)) {
    throw new Error("refused: target is outside docs/analytics/");
  }
  if (!/[\\/]raw[\\/]run-[^\\/]+$/.test(runAbs)) {
    throw new Error("refused: target is not a raw/run-* directory");
  }
  let lst;
  try {
    lst = lstatSync(runAbs);
  } catch {
    throw new Error("refused: target does not exist");
  }
  if (lst.isSymbolicLink()) {
    throw new Error("refused: target is a symlink");
  }
  if (!lst.isDirectory()) {
    throw new Error("refused: target is not a directory");
  }
  if (checkContainsTrackedFile(runAbs, trackedFilesSet, repoRootAbs)) {
    throw new Error("refused: target contains a git-tracked file");
  }

  rmSync(runAbs, { recursive: true, force: false });

  let stillExists = true;
  try {
    statSync(runAbs);
  } catch {
    stillExists = false;
  }
  if (stillExists) {
    throw new Error("post-delete verification failed: path still exists");
  }
}
