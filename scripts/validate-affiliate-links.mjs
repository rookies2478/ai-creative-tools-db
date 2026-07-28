#!/usr/bin/env node
// Validates src/data/toolAffiliateLinks.ts invariants and the
// resolveToolOutboundLink() fallback/rel/disclosure contract.
// Minimal hand-rolled checks, no test framework, matching existing
// validate-*.mjs scripts in this repo.

import { readFileSync } from 'node:fs';

const errors = [];
const fail = (msg) => errors.push(msg);

function extractArrayLiteral(source, exportName) {
  const marker = `export const ${exportName}`;
  const idx = source.indexOf(marker);
  if (idx === -1) {
    fail(`${exportName} が見つかりません`);
    return null;
  }
  const start = source.indexOf('[', idx);
  if (start === -1) {
    fail(`${exportName} の配列開始位置が見つかりません`);
    return null;
  }
  let depth = 0;
  let end = -1;
  for (let i = start; i < source.length; i++) {
    if (source[i] === '[') depth++;
    else if (source[i] === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) {
    fail(`${exportName} の配列終端が見つかりません`);
    return null;
  }
  return source.slice(start, end + 1);
}

function parseObjectEntries(arrayLiteral) {
  // Split top-level object literals inside the array (depth-aware, string-aware).
  const entries = [];
  let depth = 0;
  let current = '';
  let inString = null;
  for (let i = 1; i < arrayLiteral.length - 1; i++) {
    const ch = arrayLiteral[i];
    if (inString) {
      current += ch;
      if (ch === inString && arrayLiteral[i - 1] !== '\\') inString = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      inString = ch;
      current += ch;
      continue;
    }
    if (ch === '{') {
      depth++;
      current += ch;
      continue;
    }
    if (ch === '}') {
      depth--;
      current += ch;
      if (depth === 0) {
        entries.push(current.trim());
        current = '';
      }
      continue;
    }
    if (depth > 0) current += ch;
  }
  return entries;
}

function getField(objText, field) {
  const re = new RegExp(`${field}\\s*:\\s*(?:'([^']*)'|"([^"]*)"|(true|false))`);
  const m = objText.match(re);
  if (!m) return undefined;
  if (m[3] !== undefined) return m[3] === 'true';
  return m[1] ?? m[2];
}

function isValidHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function main() {
  const linksSource = readFileSync('src/data/toolAffiliateLinks.ts', 'utf8');
  const arrayLiteral = extractArrayLiteral(linksSource, 'toolAffiliateLinks');

  if (/example\.com/i.test(linksSource)) {
    fail('toolAffiliateLinks.ts に example.com のようなplaceholder URLが含まれています');
  }

  if (arrayLiteral) {
    const entries = parseObjectEntries(arrayLiteral);
    const seenSlugs = new Set();

    for (const entryText of entries) {
      const toolSlug = getField(entryText, 'toolSlug');
      const url = getField(entryText, 'url');
      const enabled = getField(entryText, 'enabled');
      const approvalStatus = getField(entryText, 'approvalStatus');
      const disclosureRequired = getField(entryText, 'disclosureRequired');

      if (!toolSlug) {
        fail('toolAffiliateLinks に toolSlug のないエントリがあります');
        continue;
      }
      if (seenSlugs.has(toolSlug)) {
        fail(`toolAffiliateLinks に toolSlug の重複があります: ${toolSlug}`);
      }
      seenSlugs.add(toolSlug);

      if (enabled === true) {
        if (approvalStatus !== 'approved') {
          fail(`${toolSlug}: enabled:true だが approvalStatus が approved ではありません (${approvalStatus})`);
        }
        if (!url || !isValidHttpUrl(url)) {
          fail(`${toolSlug}: enabled:true だが url が有効なURLではありません`);
        }
        if (disclosureRequired !== true) {
          fail(`${toolSlug}: enabled:true（affiliate）の場合 disclosureRequired は true である必要があります`);
        }
      }
    }
  }

  // Contract checks on resolveToolOutboundLink source (static assertions,
  // since dynamic import of .ts requires a bundler in this script context).
  const helperSource = readFileSync('src/utils/resolveToolOutboundLink.ts', 'utf8');
  if (!helperSource.includes("'sponsored nofollow noopener noreferrer'")) {
    fail('resolveToolOutboundLink.ts に affiliate時のrel文字列 "sponsored nofollow noopener noreferrer" が見つかりません');
  }
  if (!helperSource.includes("'noopener noreferrer'")) {
    fail('resolveToolOutboundLink.ts に official時のrel文字列 "noopener noreferrer" が見つかりません');
  }
  if (!helperSource.includes("'../data/toolAffiliateLinks'") ) {
    fail('resolveToolOutboundLink.ts が toolAffiliateLinks.ts を参照していません');
  }
  if (helperSource.includes("affiliatePrograms")) {
    fail('resolveToolOutboundLink.ts が affiliatePrograms.ts を直接参照しています（禁止）');
  }

  if (errors.length > 0) {
    console.error('validate:affiliate-links FAIL');
    for (const e of errors) console.error(`- ${e}`);
    process.exit(1);
  }
  console.log('validate:affiliate-links PASS');
}

main();
