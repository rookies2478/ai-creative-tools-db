#!/usr/bin/env node
// Regression test: the shared header (BaseLayout .nv-topbar) must never cause
// horizontal overflow at common viewport widths.
//
// Serves ./dist (run `npm run build` first) with a tiny static server and
// measures, in headless Chromium, for every built page and every width:
//   - header content (.nv-inner) scrollWidth <= clientWidth
//   - header children stay inside the viewport (right edge <= width)
//   - header itself adds no page-level overflow
//
// Needs `playwright-core` plus a Chromium. Neither is a repo dependency, so:
//   PLAYWRIGHT_CORE_PATH=<path to playwright-core dir>  (optional)
//   CHROMIUM_PATH=<path to chrome/chromium/msedge exe>  (optional)
// If playwright-core cannot be found the script exits 2 (NOT_RUN).
//
// Usage: node scripts/test-header-overflow.mjs [--all]
//   default: representative pages; --all: every page in dist.

import { createServer } from "node:http";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { createRequire } from "node:module";
import { homedir } from "node:os";

const DIST = resolve("dist");
const WIDTHS = [320, 360, 375, 390, 414, 768, 1024, 1366, 1440];
const REPRESENTATIVE = [
  "/",
  "/tools/",
  "/comparisons/",
  "/categories/video-generation/",
  "/guides/commercial-use-copyright/",
  "/conditions/free/",
];

if (!existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(2);
}

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const candidates = [process.env.PLAYWRIGHT_CORE_PATH, "playwright-core", "playwright"].filter(Boolean);
  for (const c of candidates) {
    try {
      return require(c);
    } catch {}
  }
  return null;
}

function findChromium() {
  if (process.env.CHROMIUM_PATH && existsSync(process.env.CHROMIUM_PATH)) return process.env.CHROMIUM_PATH;
  const fixed = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ];
  return fixed.find((p) => existsSync(p));
}

function listPages(dir, base = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...listPages(p, `${base}/${name}`));
    else if (name === "index.html") out.push(`${base}/`);
  }
  return out;
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

const pw = loadPlaywright();
if (!pw) {
  console.log("NOT_RUN: playwright-core not found (set PLAYWRIGHT_CORE_PATH).");
  process.exit(2);
}

const server = createServer((req, res) => {
  let path = decodeURIComponent((req.url || "/").split("?")[0]);
  if (path.endsWith("/")) path += "index.html";
  const file = join(DIST, path);
  if (!file.startsWith(DIST) || !existsSync(file) || statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;

const pages = process.argv.includes("--all") ? listPages(DIST).sort() : REPRESENTATIVE.filter((p) => existsSync(join(DIST, p, "index.html")));
// add one tool detail, one comparison article, one guide article
if (!process.argv.includes("--all")) {
  for (const dir of ["tools", "comparisons", "guides"]) {
    const sub = readdirSync(join(DIST, dir)).find((n) => existsSync(join(DIST, dir, n, "index.html")));
    if (sub) pages.push(`/${dir}/${sub}/`);
  }
}

const launchOpts = { headless: true };
const exe = findChromium();
if (exe) launchOpts.executablePath = exe;
const browser = await pw.chromium.launch(launchOpts);

const failures = [];
const rows = [];
let checked = 0;
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 } });
  // Block external hosts (web fonts, analytics) so the run is offline and deterministic.
  await ctx.route((url) => url.hostname !== "127.0.0.1", (route) => route.abort());
  const page = await ctx.newPage();
  for (const path of pages) {
    await page.goto(`http://127.0.0.1:${port}${path}`, { waitUntil: "domcontentloaded" });
    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const inner = document.querySelector(".nv-topbar .nv-inner");
      if (!inner) return { noHeader: true };
      const vw = de.clientWidth;
      // right edge of the inner content box (viewport minus right padding, capped by max-width)
      const ir = inner.getBoundingClientRect();
      const limit = ir.right - parseFloat(getComputedStyle(inner).paddingRight);
      let maxRight = 0;
      let worst = "";
      for (const el of inner.querySelectorAll("*")) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.position === "fixed") continue;
        if (el.closest(".nv-mobile-panel")) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        if (r.right > maxRight) {
          maxRight = r.right;
          worst = el.className || el.tagName;
        }
      }
      return {
        vw,
        pageScroll: de.scrollWidth,
        innerScroll: inner.scrollWidth,
        innerClient: inner.clientWidth,
        limit: Math.round(limit * 10) / 10,
        maxRight: Math.round(maxRight * 10) / 10,
        worst: String(worst),
      };
    });
    checked++;
    if (m.noHeader) {
      failures.push(`${width}px ${path}: .nv-topbar not found`);
      continue;
    }
    rows.push({ width, path, ...m });
    if (m.innerScroll > m.innerClient) failures.push(`${width}px ${path}: header inner scrollWidth ${m.innerScroll} > clientWidth ${m.innerClient}`);
    if (m.maxRight > m.limit + 0.5) failures.push(`${width}px ${path}: header element "${m.worst}" right edge ${m.maxRight} > header content limit ${m.limit}`);
    // Page-level scrollWidth is reported (VERBOSE) but not asserted: other page content
    // (filter chips, router rows, CTA buttons) is outside this test's scope.
    if (width <= 720) {
      await page.click(".nv-mobile-details > summary");
      const pr = await page.evaluate(() => {
        const r = document.querySelector(".nv-mobile-panel").getBoundingClientRect();
        return { left: r.left, right: r.right, vw: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth };
      });
      if (pr.left < 0 || pr.right > pr.vw + 0.5) failures.push(`${width}px ${path}: open mobile panel outside viewport (${pr.left}..${pr.right} / ${pr.vw})`);
      await page.click(".nv-mobile-details > summary");
    }
  }
  await ctx.close();
}
await browser.close();
server.close();

if (process.env.VERBOSE) {
  for (const w of WIDTHS) {
    const r = rows.filter((x) => x.width === w);
    console.log(`${w}px: max header right=${Math.max(...r.map((x) => x.maxRight))} inner=${Math.max(...r.map((x) => x.innerScroll))}/${r[0]?.innerClient} page=${Math.max(...r.map((x) => x.pageScroll))}/${r[0]?.vw}`);
  }
}

if (failures.length) {
  const uniq = [...new Set(failures)];
  console.error(`FAIL: ${uniq.length} issue(s) in ${checked} checks`);
  for (const f of uniq.slice(0, 30)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`PASS: header has no horizontal overflow (${pages.length} pages x ${WIDTHS.length} widths = ${checked} checks)`);
