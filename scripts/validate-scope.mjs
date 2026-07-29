#!/usr/bin/env node
// Validates that all changed files (staged, unstaged tracked, untracked)
// are within the active task's declared target_files, excluding files
// listed as preexisting_untracked_files.

import { readdirSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const ACTIVE_DIR = "docs/tasks/active";
const PAUSED_DIR = "docs/tasks/paused";

const DANGEROUS_PATTERNS = [
  /^\.env$/,
  /^\.env\..+$/,
  /\.pem$/,
  /\.key$/,
  /^service-account.*\.json$/,
  /credentials.*\.json$/i,
  /^credentials\//,
  /^secrets\//,
  /^node_modules\//,
  /^\.astro\//,
  /^dist\//,
  /\.zip$/,
  /^prod_check\.html$/,
];

function normalize(p) {
  return p.replace(/\\/g, "/").trim();
}

function splitFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;
  return match[1];
}

function parseYaml(yamlText) {
  const lines = yamlText.split(/\r?\n/);
  const result = {};
  let currentKey = null;
  let currentList = null;

  for (const rawLine of lines) {
    if (!rawLine.trim() || rawLine.trim().startsWith("#")) continue;
    const listItemMatch = rawLine.match(/^\s+-\s?(.*)$/);
    if (listItemMatch && currentKey) {
      if (!currentList) {
        currentList = [];
        result[currentKey] = currentList;
      }
      currentList.push(stripQuotes(listItemMatch[1].trim()));
      continue;
    }

    const kvMatch = rawLine.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      const rest = kvMatch[2].trim();
      currentKey = key;
      currentList = null;
      if (rest === "") {
        result[key] = null;
      } else if (rest === "[]") {
        result[key] = [];
      } else {
        result[key] = stripQuotes(rest);
      }
      continue;
    }
  }
  return result;
}

function stripQuotes(s) {
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1);
  }
  return s;
}

function loadActiveTask() {
  const entries = readdirSync(ACTIVE_DIR).filter(
    (f) => f.endsWith(".md") && f !== "README.md"
  );
  if (entries.length !== 1) {
    console.error(
      `validate:scope FAILED\n  - docs/tasks/active/ にtaskファイルが1件ではありません: ${entries.join(", ")}`
    );
    process.exit(1);
  }
  const filePath = join(ACTIVE_DIR, entries[0]);
  const content = readFileSync(filePath, "utf8");
  const yamlText = splitFrontmatter(content);
  if (yamlText === null) {
    console.error(`validate:scope FAILED\n  - ${filePath}: frontmatterがありません`);
    process.exit(1);
  }
  return { filePath, data: parseYaml(yamlText) };
}

function gitChangedFiles() {
  const files = new Set();

  const staged = execSync("git diff --cached --name-only", { encoding: "utf8" });
  const unstaged = execSync("git diff --name-only", { encoding: "utf8" });
  const untracked = execSync("git ls-files --others --exclude-standard", {
    encoding: "utf8",
  });

  for (const block of [staged, unstaged, untracked]) {
    for (const line of block.split(/\r?\n/)) {
      const t = line.trim();
      if (t) files.add(normalize(t));
    }
  }
  return files;
}

function matchesTarget(file, targets) {
  for (const target of targets) {
    const t = normalize(target);
    if (t === file) return true;
    if (t.endsWith("/**")) {
      const prefix = t.slice(0, -3);
      if (file === prefix || file.startsWith(prefix + "/")) return true;
    } else if (t.includes("*")) {
      // simple single-segment glob like scripts/*.mjs or *.md within a dir
      const dir = t.slice(0, t.lastIndexOf("/") + 1);
      const filePattern = t.slice(t.lastIndexOf("/") + 1);
      const fileDir = file.slice(0, file.lastIndexOf("/") + 1);
      const fileName = file.slice(file.lastIndexOf("/") + 1);
      if (fileDir === dir) {
        const regex = new RegExp(
          "^" + filePattern.split("*").map(escapeRegex).join(".*") + "$"
        );
        if (regex.test(fileName)) return true;
      }
    }
  }
  return false;
}

function escapeRegex(s) {
  return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
}

function loadPausedTasks() {
  let entries;
  try {
    entries = readdirSync(PAUSED_DIR);
  } catch {
    return [];
  }
  const files = entries.filter((f) => f.endsWith(".md") && f !== "README.md");
  const tasks = [];
  for (const file of files) {
    const filePath = join(PAUSED_DIR, file);
    const content = readFileSync(filePath, "utf8");
    const yamlText = splitFrontmatter(content);
    if (yamlText === null) continue;
    tasks.push({ filePath, data: parseYaml(yamlText) });
  }
  return tasks;
}

function main() {
  const { data } = loadActiveTask();
  const targetFiles = Array.isArray(data.target_files) ? data.target_files : [];
  const preexisting = new Set(
    (Array.isArray(data.preexisting_untracked_files)
      ? data.preexisting_untracked_files
      : []
    ).map(normalize)
  );

  const pausedTasks = loadPausedTasks();
  const pausedAllowedFiles = [];
  for (const task of pausedTasks) {
    const preserved = Array.isArray(task.data.preserved_changes)
      ? task.data.preserved_changes
      : [];
    for (const f of preserved) {
      const nf = normalize(f);
      if (matchesTarget(nf, targetFiles)) {
        console.error(
          `validate:scope FAILED\n  - active taskとpaused task(${task.filePath})のscopeが重複しています: ${nf}`
        );
        process.exit(1);
      }
      pausedAllowedFiles.push(nf);
    }
  }

  const changed = gitChangedFiles();
  const outOfScope = [];
  const dangerous = [];

  for (const file of changed) {
    if (preexisting.has(file)) continue;

    for (const pattern of DANGEROUS_PATTERNS) {
      if (pattern.test(file)) {
        dangerous.push(file);
        break;
      }
    }

    if (matchesTarget(file, targetFiles)) continue;
    if (matchesTarget(file, pausedAllowedFiles)) continue;

    outOfScope.push(file);
  }

  if (dangerous.length > 0 || outOfScope.length > 0) {
    console.error("validate:scope FAILED");
    if (dangerous.length > 0) {
      console.error("  危険ファイルの変更が検出されました:");
      for (const f of dangerous) console.error(`    - ${f}`);
    }
    if (outOfScope.length > 0) {
      console.error("  target_files範囲外の変更が検出されました:");
      for (const f of outOfScope) console.error(`    - ${f}`);
    }
    process.exit(1);
  }

  console.log("validate:scope PASS");
  process.exit(0);
}

main();
