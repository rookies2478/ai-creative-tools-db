#!/usr/bin/env node
// Regression test: NO built public page may overflow the viewport horizontally.
//
// Serves ./dist (run `npm run build` first) with a tiny static server and, in headless
// Chromium, loads EVERY dist/**/index.html (+ 404.html) at every width, asserting
//   document.documentElement.scrollWidth <= clientWidth   (page-level overflow)
//   document.body.scrollWidth            <= clientWidth
// When a page overflows, offending elements are listed (right edge beyond the viewport
// and NOT contained in an intentional in-container scroller such as a table wrapper with
// overflow-x:auto/scroll, which is legitimate and only counted as informational).
// Hiding overflow on html/body is not accepted as a fix: the test also fails if
// html/body have overflow-x hidden/clip while their content is wider than the viewport.
//
// Needs `playwright-core` + a Chromium (neither is a repo dependency):
//   PLAYWRIGHT_CORE_PATH=<dir of playwright-core>   (optional)
//   CHROMIUM_PATH=<chrome/chromium/msedge exe>      (optional)
// Exits 2 (NOT_RUN) when playwright-core is unavailable. Fully offline: external hosts
// are blocked.
//
// Usage: node scripts/test-page-overflow.mjs [--widths=320,360] [--filter=/tools/] [--limit=N]

import { createServer } from "node:http";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, resolve, sep } from "node:path";
import { createRequire } from "node:module";

const DIST = resolve("dist");
const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
const WIDTHS = (arg("widths") || "320,360,375,390,414,768,1024,1366,1440").split(",").map(Number);
const FILTER = arg("filter");
const LIMIT = Number(arg("limit") || 0);

if (!existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(2);
}

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  for (const c of [process.env.PLAYWRIGHT_CORE_PATH, "playwright-core", "playwright"].filter(Boolean)) {
    try {
      return require(c);
    } catch {}
  }
  return null;
}

function findChromium() {
  if (process.env.CHROMIUM_PATH && existsSync(process.env.CHROMIUM_PATH)) return process.env.CHROMIUM_PATH;
  return [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((p) => existsSync(p));
}

function listPages(dir, base = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...listPages(p, `${base}/${name}`));
    else if (name === "index.html") out.push(`${base}/`);
    else if (name === "404.html" && base === "") out.push("/404.html");
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
  if (!file.startsWith(DIST + sep) || !existsSync(file) || statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;

let pages = listPages(DIST).sort();
if (FILTER) pages = pages.filter((p) => p.includes(FILTER));
if (LIMIT) pages = pages.slice(0, LIMIT);

const launchOpts = { headless: true };
const exe = findChromium();
if (exe) launchOpts.executablePath = exe;
const browser = await pw.chromium.launch(launchOpts);

function measure() {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const out = {
    vw,
    docScroll: de.scrollWidth,
    bodyScroll: document.body ? document.body.scrollWidth : 0,
    hiddenXOnRoot: false,
    offenders: [],
    scrollers: 0,
  };
  const ox = (el) => getComputedStyle(el).overflowX;
  const rootHides = [de, document.body].some((el) => el && ["hidden", "clip"].includes(ox(el)));
  const isScroller = (el) => ["auto", "scroll", "hidden", "clip"].includes(ox(el));
  const sel = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) s += `#${el.id}`;
    if (typeof el.className === "string" && el.className.trim()) s += "." + el.className.trim().split(/\s+/).slice(0, 3).join(".");
    return s;
  };
  for (const el of document.body.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    if (cs.position === "fixed" || !el.checkVisibility({ visibilityProperty: true })) continue;
    if (el.scrollWidth > el.clientWidth + 1 && ["auto", "scroll"].includes(cs.overflowX)) out.scrollers++;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || (r.right <= vw + 0.5 && r.left >= -0.5)) continue;
    // contained inside an ancestor scroller/clipper (intentional in-container scroll)?
    let contained = false;
    for (let a = el.parentElement; a && a !== document.body && a !== de; a = a.parentElement) {
      if (isScroller(a)) {
        // only a scroller that itself fits the viewport really contains the overflow
        const ar = a.getBoundingClientRect();
        contained = ar.right <= vw + 0.5 && ar.left >= -0.5;
        break;
      }
    }
    if (contained) continue;
    // elements purely decorative & off-canvas by transform/absolute are still reported if they widen the page
    out.offenders.push({ el: sel(el), left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) });
  }
  out.hiddenXOnRoot = rootHides;
  out.offenders.sort((a, b) => b.right - a.right);
  out.offenders = out.offenders.slice(0, 5);
  return out;
}

const failures = [];
const perWidth = new Map(WIDTHS.map((w) => [w, { pages: 0, fail: 0, scrollers: 0 }]));
let checked = 0;
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 } });
  await ctx.route((url) => url.hostname !== "127.0.0.1", (route) => route.abort());
  const page = await ctx.newPage();
  for (const path of pages) {
    await page.goto(`http://127.0.0.1:${port}${path}`, { waitUntil: "load" });
    const m = await page.evaluate(measure);
    checked++;
    const st = perWidth.get(width);
    st.pages++;
    st.scrollers += m.scrollers;
    const over = m.docScroll > m.vw || m.bodyScroll > m.vw;
    // root-level overflow clipping that masks wide content is itself a failure
    const masked = m.hiddenXOnRoot && m.offenders.length > 0;
    if (over || masked) {
      st.fail++;
      const off = m.offenders.map((o) => `${o.el}[${o.left}..${o.right}]`).join(", ");
      failures.push(`${width}px ${path}: doc ${m.docScroll}/body ${m.bodyScroll} > viewport ${m.vw}${masked ? " (masked by overflow-x on html/body)" : ""}; offenders: ${off || "none-detected"}`);
    }
  }
  await ctx.close();
}
await browser.close();
server.close();

for (const [w, s] of perWidth) {
  console.log(`${String(w).padStart(5)}px: ${s.pages} pages, ${s.fail} overflowing, ${s.scrollers} intentional in-container scrollers (info)`);
}
if (failures.length) {
  console.error(`FAIL: ${failures.length} overflowing page/width combination(s) in ${checked} checks`);
  for (const f of failures.slice(0, 60)) console.error(`  - ${f}`);
  if (failures.length > 60) console.error(`  ... ${failures.length - 60} more`);
  process.exit(1);
}
console.log(`PASS: no page-level horizontal overflow (${pages.length} pages x ${WIDTHS.length} widths = ${checked} checks)`);
