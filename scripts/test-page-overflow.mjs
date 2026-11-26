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
//        [--progress-file=<f> [--resume]] [--shard=i/n] [--only=/tools/] [--restart-every=40] [--min-free-mb=200]

import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { arg, loadPlaywright, listPages, startServer, selectPages, runCases, NotRun } from "./lib/qa-browser.mjs";

// Low-memory options (see docs/operations/regression-tests.md): --progress-file=<f> --resume --shard=i/n
// --only=<route-prefix> --restart-every=N --min-free-mb=200 --max-mem-waits=30 (one page at a time).
const DIST = resolve("dist");
const WIDTHS = (arg("widths") || "320,360,375,390,414,768,1024,1366,1440").split(",").map(Number);
const FILTER = arg("filter");
const LIMIT = Number(arg("limit") || 0);

if (!existsSync(DIST)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(2);
}

const pw = loadPlaywright();
if (!pw) {
  console.log("NOT_RUN: playwright-core not found (set PLAYWRIGHT_CORE_PATH).");
  process.exit(2);
}

const { server, port } = await startServer(DIST);

let pages = listPages(DIST, "", true).sort();
if (FILTER) pages = pages.filter((p) => p.includes(FILTER));
pages = selectPages(pages);
if (LIMIT) pages = pages.slice(0, LIMIT);

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

const cases = [];
for (const width of WIDTHS) {
  for (const path of pages) {
    cases.push({
      page: path,
      width,
      async run(page) {
        await page.goto(`http://127.0.0.1:${port}${path}`, { waitUntil: "load" });
        const m = await page.evaluate(measure);
        const over = m.docScroll > m.vw || m.bodyScroll > m.vw;
        // root-level overflow clipping that masks wide content is itself a failure
        const masked = m.hiddenXOnRoot && m.offenders.length > 0;
        if (over || masked) {
          const off = m.offenders.map((o) => `${o.el}[${o.left}..${o.right}]`).join(", ");
          return { status: "FAIL", scrollers: m.scrollers, detail: `doc ${m.docScroll}/body ${m.bodyScroll} > viewport ${m.vw}${masked ? " (masked by overflow-x on html/body)" : ""}; offenders: ${off || "none-detected"}` };
        }
        return { status: "PASS", scrollers: m.scrollers };
      },
    });
  }
}

let records;
try {
  records = await runCases(pw, cases, { ctxOptions: (width) => ({ viewport: { width, height: 800 } }) });
} catch (e) {
  server.close();
  if (e instanceof NotRun) {
    console.log(`NOT_RUN: ${e.message}`);
    process.exit(2);
  }
  throw e;
}
server.close();

const failures = [];
const perWidth = new Map(WIDTHS.map((w) => [w, { pages: 0, fail: 0, scrollers: 0 }]));
for (const r of records) {
  const st = perWidth.get(r.width);
  st.pages++;
  st.scrollers += r.scrollers || 0;
  if (r.status !== "PASS") {
    st.fail++;
    failures.push(`${r.width}px ${r.page}: ${r.detail}`);
  }
}
const checked = records.length;
const resumed = records.resumed || 0;

for (const [w, s] of perWidth) {
  console.log(`${String(w).padStart(5)}px: ${s.pages} pages, ${s.fail} overflowing, ${s.scrollers} intentional in-container scrollers (info)`);
}
if (failures.length) {
  console.error(`FAIL: ${failures.length} overflowing page/width combination(s) in ${checked} checks (${resumed} resumed from progress file)`);
  for (const f of failures.slice(0, 60)) console.error(`  - ${f}`);
  if (failures.length > 60) console.error(`  ... ${failures.length - 60} more`);
  process.exit(1);
}
console.log(`PASS: no page-level horizontal overflow (${pages.length} pages x ${WIDTHS.length} widths = ${checked} checks, ${resumed} resumed)`);
