// Shared low-memory helpers for the Playwright QA scripts (test-page-overflow, test-header-overflow,
// qa-changed-pages). No repository dependency: playwright-core + a Chromium come from the local machine.
//
// Common CLI options (all optional, backward compatible):
//   --max-pages-parallel=1    pages open at once (only 1 is supported; kept for explicitness)
//   --restart-every=N         relaunch Chromium every N page loads (default 40)
//   --progress-file=<path>    append one JSON line per completed (page,width) case
//   --resume                  skip cases already PASS in --progress-file
//   --shard=i/n               run only every n-th case-page (1-based i), stable sorted order
//   --only=<path-prefix>      run only pages whose route starts with the prefix
//   --min-free-mb=200         wait while os.freemem() is below this
//   --max-mem-waits=30        after this many consecutive 5 s waits abort with NOT_RUN (exit 2)
//   --no-lowmem-args          do not add the low-memory Chromium flags
import { createServer } from "node:http";
import { readFileSync, readdirSync, statSync, existsSync, appendFileSync, mkdirSync } from "node:fs";
import { join, extname, resolve, sep, dirname } from "node:path";
import { createRequire } from "node:module";
import { freemem } from "node:os";

export const arg = (name) => process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
export const flag = (name) => process.argv.includes(`--${name}`);

export const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json",
  ".xml": "application/xml", ".txt": "text/plain",
};

export function loadPlaywright() {
  const require = createRequire(import.meta.url);
  for (const c of [process.env.PLAYWRIGHT_CORE_PATH, "playwright-core", "playwright"].filter(Boolean)) {
    try { return require(c); } catch {}
  }
  return null;
}

export function findChromium() {
  if (process.env.CHROMIUM_PATH && existsSync(process.env.CHROMIUM_PATH)) return process.env.CHROMIUM_PATH;
  return [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((p) => existsSync(p));
}

export function listPages(dir, base = "", with404 = false) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...listPages(p, `${base}/${name}`, with404));
    else if (name === "index.html") out.push(`${base}/`);
    else if (with404 && name === "404.html" && base === "") out.push("/404.html");
  }
  return out;
}

export async function startServer(DIST) {
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
  return { server, port: server.address().port };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export class NotRun extends Error {}

/** Apply --only / --shard to a sorted page list. */
export function selectPages(pages) {
  const only = arg("only");
  if (only) pages = pages.filter((p) => p.startsWith(only));
  const shard = arg("shard");
  if (shard) {
    const [i, n] = shard.split("/").map(Number);
    if (!(i >= 1 && n >= 1 && i <= n)) throw new Error(`bad --shard=${shard} (expected i/n)`);
    pages = pages.filter((_, idx) => idx % n === i - 1);
  }
  return pages;
}

export function loadProgress() {
  const file = arg("progress-file");
  const done = new Map(); // key -> last record
  if (file && flag("resume") && existsSync(file)) {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      if (!line.trim()) continue;
      try { const r = JSON.parse(line); done.set(`${r.page}|${r.width}`, r); } catch {}
    }
  }
  return done;
}

export function appendProgress(rec) {
  const file = arg("progress-file");
  if (!file) return;
  mkdirSync(dirname(resolve(file)), { recursive: true });
  appendFileSync(file, JSON.stringify({ ...rec, t: new Date().toISOString() }) + "\n");
}

/** Wait until enough free RAM; throws NotRun after repeated waits. */
export async function memoryGuard() {
  const minMb = Number(arg("min-free-mb") || 200);
  const maxWaits = Number(arg("max-mem-waits") || 30);
  let waits = 0;
  while (freemem() / 1048576 < minMb) {
    if (++waits > maxWaits) throw new NotRun(`free memory stayed below ${minMb} MB for ${maxWaits * 5}s (now ${(freemem() / 1048576) | 0} MB)`);
    await sleep(5000);
  }
}

const LOWMEM_ARGS = ["--disable-gpu", "--disable-dev-shm-usage", "--disable-extensions", "--disable-background-networking", "--no-first-run", "--mute-audio", "--js-flags=--max-old-space-size=256"];

/**
 * Runs `cases` one at a time with a single Chromium, a fresh context+page per case (closed afterwards),
 * restarting the browser every N cases.
 * cases: [{ page, width, run(page, ctx) -> {status:'PASS'|'FAIL', detail?, ...extra} }]
 * ctxOptions(width) -> newContext options. Returns array of records (incl. resumed).
 */
export async function runCases(pw, cases, { ctxOptions, route = true } = {}) {
  const restartEvery = Number(arg("restart-every") || 40);
  const done = loadProgress();
  const launchOpts = { headless: true };
  if (!flag("no-lowmem-args")) launchOpts.args = LOWMEM_ARGS;
  const exe = findChromium();
  if (exe) launchOpts.executablePath = exe;
  let browser = null;
  let sinceLaunch = 0;
  const records = [];
  let resumed = 0;
  try {
    for (const c of cases) {
      const key = `${c.page}|${c.width}`;
      const prev = done.get(key);
      if (prev && prev.status === "PASS") { records.push({ ...prev, resumed: true }); resumed++; continue; }
      await memoryGuard();
      if (browser && sinceLaunch >= restartEvery) { await browser.close().catch(() => {}); browser = null; }
      if (!browser) { browser = await pw.chromium.launch(launchOpts); sinceLaunch = 0; }
      sinceLaunch++;
      let rec;
      let ctx;
      try {
        ctx = await browser.newContext(ctxOptions(c.width));
        if (route) await ctx.route((url) => url.hostname !== "127.0.0.1", (r) => r.abort());
        const page = await ctx.newPage();
        rec = await c.run(page, ctx);
      } catch (e) {
        rec = { status: "FAIL", detail: `exception: ${String(e.message || e).split("\n")[0]}` };
        // a crashed browser must not poison later cases
        await browser.close().catch(() => {}); browser = null;
      } finally {
        if (ctx) await ctx.close().catch(() => {});
      }
      rec = { page: c.page, width: c.width, ...rec };
      records.push(rec);
      appendProgress(rec);
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
  records.resumed = resumed;
  return records;
}
