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
// Usage: node scripts/test-header-overflow.mjs [--all] [--progress-file=<f> [--resume]] [--shard=i/n] [--only=/tools/]
//   default: representative pages; --all: every page in dist.

import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { arg, loadPlaywright, listPages, startServer, selectPages, runCases, NotRun } from "./lib/qa-browser.mjs";

// Low-memory options (see docs/operations/regression-tests.md): --progress-file=<f> --resume --shard=i/n
// --only=<route-prefix> --restart-every=N --min-free-mb=200 --max-mem-waits=30 (one page at a time).
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

const pw = loadPlaywright();
if (!pw) {
  console.log("NOT_RUN: playwright-core not found (set PLAYWRIGHT_CORE_PATH).");
  process.exit(2);
}

const { server, port } = await startServer(DIST);

let pages = process.argv.includes("--all") ? listPages(DIST).sort() : REPRESENTATIVE.filter((p) => existsSync(join(DIST, p, "index.html")));
// add one tool detail, one comparison article, one guide article
if (!process.argv.includes("--all")) {
  for (const dir of ["tools", "comparisons", "guides"]) {
    const sub = readdirSync(join(DIST, dir)).find((n) => existsSync(join(DIST, dir, n, "index.html")));
    if (sub) pages.push(`/${dir}/${sub}/`);
  }
}

pages = selectPages(pages);

const cases = [];
for (const width of WIDTHS) {
  for (const path of pages) {
    cases.push({
      page: path,
      width,
      async run(page) {
        const failures = [];
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
        if (m.noHeader) return { status: "FAIL", detail: `${width}px ${path}: .nv-topbar not found` };
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
        return { status: failures.length ? "FAIL" : "PASS", detail: failures.join(" | "), m };
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

const checked = records.length;
const resumed = records.resumed || 0;
const failures = records.filter((r) => r.status !== "PASS").flatMap((r) => r.detail.split(" | "));

if (process.env.VERBOSE) {
  for (const w of WIDTHS) {
    const r = records.filter((x) => x.width === w && x.m);
    if (!r.length) continue;
    console.log(`${w}px: max header right=${Math.max(...r.map((x) => x.m.maxRight))} inner=${Math.max(...r.map((x) => x.m.innerScroll))}/${r[0].m.innerClient} page=${Math.max(...r.map((x) => x.m.pageScroll))}/${r[0].m.vw}`);
  }
}

if (failures.length) {
  const uniq = [...new Set(failures)];
  console.error(`FAIL: ${uniq.length} issue(s) in ${checked} checks (${resumed} resumed)`);
  for (const f of uniq.slice(0, 30)) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`PASS: header has no horizontal overflow (${pages.length} pages x ${WIDTHS.length} widths = ${checked} checks, ${resumed} resumed)`);
