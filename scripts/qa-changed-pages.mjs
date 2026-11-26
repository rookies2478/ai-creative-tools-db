#!/usr/bin/env node
// Browser + static QA for a fixed set of changed pages (SEO snippets, Dreamina price reconciliation).
// Serves ./dist, loads each page at 320/360/390/1440 (override with --widths=) in headless Chromium using the
// shared low-memory launcher (scripts/lib/qa-browser.mjs; same options: --progress-file --resume --shard --only ...).
//
// Per (page,width): no page-level horizontal overflow (html/body not clipping), header visible, mobile menu opens and
// closes (only the <summary> is clicked), CTA anchors present with href inspected (NEVER clicked), tables fit the
// viewport or sit in a fitting in-container scroller, no clipped text (overflow hidden/clip on text boxes).
// Per page (static, width 0): canonical == https://aicreative-db.com/<path>/, JSON-LD parses, datePublished <= dateModified <= today,
// internal links resolve to files in dist, Dreamina price text consistent with src/content/tools/dreamina.md.
// Fully offline: non-127.0.0.1 hosts are aborted. Exit: 0 PASS, 1 FAIL, 2 NOT_RUN.
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { arg, loadPlaywright, startServer, selectPages, runCases, NotRun } from "./lib/qa-browser.mjs";

const DIST = resolve("dist");
const SITE = "https://aicreative-db.com";
const WIDTHS = (arg("widths") || "320,360,390,1440").split(",").map(Number);
const TODAY = arg("today") || "2026-11-26";
const PAGES = [
  "/tools/fotor-ai/", "/tools/tensor-art/", "/tools/dreamstudio/", "/comparisons/canva-ai-vs-adobe-firefly/",
  "/categories/avatar-video/", "/comparisons/avatar-video-ai-tools/", "/comparisons/ad-banner-ai-tools/",
  "/categories/design/", "/use-cases/faceless-video/",
  "/tools/dreamina/", "/tools/runway/", "/comparisons/seedream-vs-seedance/", "/comparisons/runway-vs-kling-ai/",
  "/comparisons/runway-vs-pika/", "/guides/commercial-use-copyright/", "/tools/", "/comparisons/", "/tools/adobe-express/",
];
const DREAMINA_PRICE_PAGES = new Set(["/tools/dreamina/", "/comparisons/seedream-vs-seedance/"]);
// Source-of-truth amounts from src/content/tools/dreamina.md (Basic monthly / first month / annual / other payment).
const BASIC_ALLOWED = new Set(["2,380", "45", "26,800", "1,430"]);

if (!existsSync(DIST)) { console.error("dist/ not found. Run `npm run build` first."); process.exit(2); }
const pw = loadPlaywright();
if (!pw) { console.log("NOT_RUN: playwright-core not found (set PLAYWRIGHT_CORE_PATH)."); process.exit(2); }

const fileFor = (p) => (p.endsWith("/") ? join(DIST, p, "index.html") : join(DIST, p));

function staticChecks(path) {
  const errs = [];
  const info = {};
  const file = fileFor(path);
  if (!existsSync(file)) return { errs: [`page missing in dist: ${path}`], info };
  const html = readFileSync(file, "utf8");
  const canon = html.match(/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  if (canon !== `${SITE}${path}`) errs.push(`canonical ${canon} != ${SITE}${path}`);
  // JSON-LD
  const blocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  info.jsonld = blocks.length;
  if (!blocks.length) errs.push("no JSON-LD");
  const dates = [];
  const walk = (o) => {
    if (Array.isArray(o)) return o.forEach(walk);
    if (o && typeof o === "object") {
      for (const [k, v] of Object.entries(o)) {
        if ((k === "dateModified" || k === "datePublished") && typeof v === "string") dates.push([k, v]);
        else walk(v);
      }
    }
  };
  for (const b of blocks) {
    try { walk(JSON.parse(b)); } catch (e) { errs.push(`JSON-LD parse error: ${e.message}`); }
  }
  const pub = dates.filter(([k]) => k === "datePublished").map(([, v]) => v);
  const mod = dates.filter(([k]) => k === "dateModified").map(([, v]) => v);
  info.datePublished = pub;
  info.dateModified = mod;
  for (const [k, v] of dates) {
    if (!/^\d{4}-\d{2}-\d{2}/.test(v) || Number.isNaN(Date.parse(v))) errs.push(`${k} not ISO: ${v}`);
    else if (v.slice(0, 10) > TODAY) errs.push(`${k} ${v} is in the future (> ${TODAY})`);
  }
  if (pub[0] && mod[0] && pub[0].slice(0, 10) > mod[0].slice(0, 10)) errs.push(`datePublished ${pub[0]} after dateModified ${mod[0]}`);
  // internal links (anchors only)
  const missing = new Set();
  let internal = 0;
  for (const m of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    let h = m[1].replace(/&#x26;|&amp;/g, "&");
    if (h.startsWith(SITE)) h = h.slice(SITE.length) || "/";
    if (!h.startsWith("/") || h.startsWith("//")) continue;
    h = h.split("#")[0].split("?")[0];
    if (!h) continue;
    internal++;
    const f = h.endsWith("/") ? join(DIST, h, "index.html") : join(DIST, h);
    const ok = (existsSync(f) && statSync(f).isFile()) || (!h.endsWith("/") && existsSync(join(DIST, h, "index.html")));
    if (!ok) missing.add(h);
  }
  info.internalLinks = internal;
  if (missing.size) errs.push(`unresolved internal links: ${[...missing].slice(0, 10).join(", ")}`);
  // prices
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");
  if (DREAMINA_PRICE_PAGES.has(path) && !text.includes("2,380円")) errs.push('Dreamina price text "2,380円" missing');
  if (/Dreamina|ドリーミナ/.test(text)) {
    const all = [...text.matchAll(/Basic\s*([\d,]+)\s*円/g)].map((m) => m[1]);
    info.dreaminaBasicPrices = [...new Set(all)];
    const bad = [...new Set(all.filter((v) => !BASIC_ALLOWED.has(v)))];
    if (bad.length) errs.push(`Dreamina Basic price differs from dreamina.md: ${bad.join(", ")}`);
  }
  return { errs, info };
}

function browserChecks(pageNeedsCta) {
  const out = { errs: [], info: {} };
  const de = document.documentElement;
  const vw = de.clientWidth;
  const ox = (el) => getComputedStyle(el).overflowX;
  if (de.scrollWidth > vw || document.body.scrollWidth > vw) out.errs.push(`page overflow doc ${de.scrollWidth}/body ${document.body.scrollWidth} > ${vw}`);
  if ([de, document.body].some((el) => ["hidden", "clip"].includes(ox(el)))) out.errs.push("overflow-x hidden/clip on html/body");
  const hd = document.querySelector(".nv-topbar");
  const hr = hd?.getBoundingClientRect();
  if (!hd || !hd.checkVisibility() || hr.height < 20 || hr.right > vw + 0.5 || hr.left < -0.5) out.errs.push("header not visible/inside viewport");
  // CTA anchors: inspect only, never clicked
  const ctas = [...document.querySelectorAll("a[data-outbound-type]")].map((a) => ({ type: a.dataset.outboundType, href: a.getAttribute("href") || "", rel: a.rel }));
  out.info.ctas = ctas.length;
  out.info.ctaTypes = [...new Set(ctas.map((c) => c.type))];
  if (pageNeedsCta && !ctas.length) out.errs.push("no CTA anchors (a[data-outbound-type])");
  for (const c of ctas) {
    if (!/^https:\/\//.test(c.href)) out.errs.push(`CTA href not https: ${c.href}`);
  }
  // tables
  let tables = 0;
  let tableScrollers = 0;
  for (const t of document.querySelectorAll("table")) {
    if (!t.checkVisibility()) continue;
    tables++;
    let sc = null;
    for (let a = t.parentElement; a && a !== document.body; a = a.parentElement) {
      if (["auto", "scroll"].includes(ox(a))) { sc = a; break; }
    }
    const tr = t.getBoundingClientRect();
    if (sc) {
      const r = sc.getBoundingClientRect();
      if (sc.scrollWidth > sc.clientWidth + 1) tableScrollers++;
      if (r.right > vw + 0.5 || r.left < -0.5) out.errs.push(`table scroller wider than viewport (${Math.round(r.left)}..${Math.round(r.right)})`);
    } else if (tr.right > vw + 0.5) out.errs.push(`table without scroller exceeds viewport (right ${Math.round(tr.right)} > ${vw})`);
  }
  out.info.tables = tables;
  out.info.tableScrollers = tableScrollers;
  // clipped text: text boxes whose content is cut by overflow hidden/clip, or text sticking out past the viewport
  const clipped = [];
  let softOverflow = 0;
  const tag = (el) => `${el.tagName.toLowerCase()}.${String(el.className).split(/\s+/)[0]}: ${el.textContent.trim().slice(0, 30)}`;
  for (const el of document.body.querySelectorAll("a,button,span,p,li,h1,h2,h3,h4,td,th,summary,label,small,strong,em,div")) {
    if (!el.checkVisibility() || !el.textContent.trim()) continue;
    if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) {
      const cs = getComputedStyle(el);
      const clips = ["hidden", "clip"].includes(cs.overflowX);
      if (clips && (el.children.length === 0 || cs.textOverflow === "ellipsis")) clipped.push(tag(el));
      else if (!clips && el.children.length === 0 && el.getBoundingClientRect().right > vw + 0.5) clipped.push(`beyond viewport ${tag(el)}`);
      else softOverflow++;
    }
  }
  out.info.softTextOverflow = softOverflow;
  if (clipped.length) out.errs.push(`clipped text (${clipped.length}): ${clipped.slice(0, 4).join(" ; ")}`);
  return out;
}

const { server, port } = await startServer(DIST);
const pages = selectPages([...PAGES].sort());
const cases = [];
for (const path of pages) {
  cases.push({
    page: path,
    width: 0,
    async run() {
      const { errs, info } = staticChecks(path);
      return { status: errs.length ? "FAIL" : "PASS", detail: errs.join(" | "), kind: "static", info };
    },
  });
}
for (const width of WIDTHS) {
  for (const path of pages) {
    cases.push({
      page: path,
      width,
      async run(page) {
        if (!existsSync(fileFor(path))) return { status: "FAIL", detail: "page missing in dist" };
        await page.goto(`http://127.0.0.1:${port}${path}`, { waitUntil: "load" });
        const needsCta = /^\/tools\/[^/]+\/$/.test(path);
        const r = await page.evaluate(browserChecks, needsCta);
        if (width <= 720) {
          const sum = ".nv-mobile-details > summary";
          const state = () => page.evaluate(() => {
            const d = document.querySelector(".nv-mobile-details");
            const b = document.querySelector(".nv-mobile-panel")?.getBoundingClientRect();
            return { open: !!d?.open, left: b?.left, right: b?.right, vw: document.documentElement.clientWidth, h: b?.height };
          });
          await page.click(sum);
          const o = await state();
          if (!o.open || o.h < 10 || o.left < -0.5 || o.right > o.vw + 0.5) r.errs.push(`mobile menu open state bad ${JSON.stringify(o)}`);
          await page.click(sum);
          const c = await state();
          if (c.open) r.errs.push("mobile menu did not close");
        }
        return { status: r.errs.length ? "FAIL" : "PASS", detail: r.errs.join(" | "), kind: "browser", info: r.info };
      },
    });
  }
}

let records;
try {
  records = await runCases(pw, cases, { ctxOptions: (width) => ({ viewport: { width: width || 1440, height: 800 } }) });
} catch (e) {
  server.close();
  if (e instanceof NotRun) { console.log(`NOT_RUN: ${e.message}`); process.exit(2); }
  throw e;
}
server.close();

const failed = records.filter((r) => r.status !== "PASS");
const resumed = records.resumed || 0;
for (const p of pages) {
  const rs = records.filter((r) => r.page === p);
  const st = rs.find((r) => r.width === 0)?.info || {};
  const br = rs.find((r) => r.width === 1440)?.info || rs.find((r) => r.width)?.info || {};
  console.log(`${rs.every((r) => r.status === "PASS") ? "ok  " : "FAIL"} ${p} jsonld=${st.jsonld} pub=${st.datePublished} mod=${st.dateModified} internal=${st.internalLinks} cta=${br.ctas}[${(br.ctaTypes || []).join(",")}] tables=${br.tables}/${br.tableScrollers} basic=${(st.dreaminaBasicPrices || []).join("/")}`);
}
if (failed.length) {
  console.error(`FAIL: ${failed.length} of ${records.length} cases (${resumed} resumed)`);
  for (const f of failed.slice(0, 60)) console.error(`  - ${f.width}px ${f.page}: ${f.detail}`);
  process.exit(1);
}
console.log(`PASS: ${pages.length} pages, ${records.length} cases (${pages.length} static + ${pages.length * WIDTHS.length} browser), ${resumed} resumed`);
