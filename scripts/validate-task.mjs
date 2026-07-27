#!/usr/bin/env node
// Validates the single active task file under docs/tasks/active/.
// No external dependencies — minimal hand-rolled YAML frontmatter parser
// (sufficient for the flat/simple structure used in task files).

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ACTIVE_DIR = "docs/tasks/active";
const PAUSED_DIR = "docs/tasks/paused";
const errors = [];

function fail(msg) {
  errors.push(msg);
}

function listTaskFiles() {
  let entries;
  try {
    entries = readdirSync(ACTIVE_DIR);
  } catch {
    fail(`${ACTIVE_DIR} が存在しません`);
    return [];
  }
  return entries.filter((f) => f.endsWith(".md") && f !== "README.md");
}

function splitFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return null;
  return match[1];
}

// Minimal YAML subset parser: top-level scalars, lists (- item), and
// block lists under a key. Good enough for our fixed task schema.
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
      if (rest === "" ) {
        result[key] = null; // may become a list on subsequent lines
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

function isDangerousTarget(pattern) {
  const DANGEROUS = ["**", "/**", "*", "src/**"];
  if (DANGEROUS.includes(pattern)) return true;
  if (pattern === "." || pattern === "./") return true;
  if (pattern.startsWith("src/") && pattern.includes("**")) return true;
  return false;
}

function main() {
  const files = listTaskFiles();

  if (files.length === 0) {
    fail("docs/tasks/active/ にtaskファイルが存在しません");
  } else if (files.length > 1) {
    fail(`docs/tasks/active/ に複数のtaskファイルがあります: ${files.join(", ")}`);
  }

  if (errors.length > 0) {
    printAndExit();
  }

  const filePath = join(ACTIVE_DIR, files[0]);
  const content = readFileSync(filePath, "utf8");
  const yamlText = splitFrontmatter(content);

  if (yamlText === null) {
    fail(`${filePath}: YAML frontmatterが見つかりません`);
    printAndExit();
  }

  let data;
  try {
    data = parseYaml(yamlText);
  } catch (e) {
    fail(`${filePath}: YAML frontmatterの解析に失敗しました (${e.message})`);
    printAndExit();
  }

  if (data.status !== "READY") {
    fail(`status が READY ではありません: ${data.status}`);
  }

  if (!["LOW", "MEDIUM", "HIGH"].includes(data.risk)) {
    fail(`risk が LOW/MEDIUM/HIGH のいずれでもありません: ${data.risk}`);
  }

  if (!data.goal || typeof data.goal !== "string" || data.goal.trim() === "") {
    fail("goal が空です");
  } else {
    // Heuristic: many "、" separated distinct clauses combined with multiple
    // verbs suggests goal is listing multiple unrelated themes. We only flag
    // an extreme case: goal containing more than 3 top-level 。 sentences.
    const sentenceCount = data.goal.split("。").filter((s) => s.trim()).length;
    if (sentenceCount > 3) {
      fail("goal が複数テーマを列挙しているように見えます（文が多すぎます）");
    }
  }

  if (!Array.isArray(data.target_files) || data.target_files.length === 0) {
    fail("target_files が空です");
  } else {
    for (const t of data.target_files) {
      if (isDangerousTarget(t)) {
        fail(`target_files に危険な無制限指定があります: ${t}`);
      }
    }
  }

  if (!Array.isArray(data.reference_files)) {
    fail("reference_files が配列ではありません");
  }

  if (!Array.isArray(data.unknowns)) {
    fail("unknowns が配列ではありません");
  }

  if (!Array.isArray(data.required_checks) || data.required_checks.length === 0) {
    fail("required_checks が空です");
  }

  if (!Array.isArray(data.acceptance_criteria) || data.acceptance_criteria.length === 0) {
    fail("acceptance_criteria が空です");
  }

  if (
    !Array.isArray(data.forbidden_operations) ||
    !data.forbidden_operations.includes("PRODUCTION_DEPLOY")
  ) {
    fail("forbidden_operations に PRODUCTION_DEPLOY がありません");
  }

  if (data.production_required !== "false" && data.production_required !== false) {
    if (data.production_required === undefined || data.production_required === null) {
      fail("production_required が明示されていません");
    }
  }

  if (!Array.isArray(data.preexisting_untracked_files)) {
    fail("preexisting_untracked_files が配列ではありません");
  }

  validatePausedTasks();

  printAndExit();
}

function listPausedTaskFiles() {
  let entries;
  try {
    entries = readdirSync(PAUSED_DIR);
  } catch {
    return [];
  }
  return entries.filter((f) => f.endsWith(".md") && f !== "README.md");
}

function validatePausedTasks() {
  for (const file of listPausedTaskFiles()) {
    const filePath = join(PAUSED_DIR, file);
    const content = readFileSync(filePath, "utf8");
    const yamlText = splitFrontmatter(content);
    if (yamlText === null) {
      fail(`${filePath}: YAML frontmatterが見つかりません`);
      continue;
    }
    let data;
    try {
      data = parseYaml(yamlText);
    } catch (e) {
      fail(`${filePath}: YAML frontmatterの解析に失敗しました (${e.message})`);
      continue;
    }

    if (data.status !== "PAUSED") {
      fail(`${filePath}: status が PAUSED ではありません: ${data.status}`);
    }
    if (!data.task_id) {
      fail(`${filePath}: task_id が空です`);
    }
    if (!data.goal || typeof data.goal !== "string" || data.goal.trim() === "") {
      fail(`${filePath}: goal が空です`);
    }
    if (!["LOW", "MEDIUM", "HIGH"].includes(data.risk)) {
      fail(`${filePath}: risk が LOW/MEDIUM/HIGH のいずれでもありません: ${data.risk}`);
    }
    if (!Array.isArray(data.target_files) || data.target_files.length === 0) {
      fail(`${filePath}: target_files が空です`);
    }
    if (!data.pause_reason || typeof data.pause_reason !== "string" || data.pause_reason.trim() === "") {
      fail(`${filePath}: pause_reason が空です`);
    }
    if (!data.resume_condition || typeof data.resume_condition !== "string" || data.resume_condition.trim() === "") {
      fail(`${filePath}: resume_condition が空です`);
    }
    if (!Array.isArray(data.preserved_changes) || data.preserved_changes.length === 0) {
      fail(`${filePath}: preserved_changes が空です`);
    }
    if (!Array.isArray(data.required_checks) || data.required_checks.length === 0) {
      fail(`${filePath}: required_checks が空です`);
    }
  }
}

function printAndExit() {
  if (errors.length > 0) {
    console.error("validate:task FAILED");
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log("validate:task PASS");
  process.exit(0);
}

main();
