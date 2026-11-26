# Regression tests: horizontal overflow (Playwright)

Two browser-based checks guard the layout against horizontal overflow. Neither is run by CI and neither
adds a repository dependency: `playwright-core` and a Chromium are supplied from the local machine.

| Script | Scope |
| --- | --- |
| `scripts/test-header-overflow.mjs` | Shared header (`.nv-topbar`) only. Default: representative pages; `--all`: every page. |
| `scripts/test-page-overflow.mjs` | **Every** built page (`dist/**/index.html` + `404.html`): page-level `scrollWidth` must not exceed the viewport. |

Widths: 320, 360, 375, 390, 414, 768, 1024, 1366, 1440 px.

## What `test-page-overflow.mjs` asserts

- `document.documentElement.scrollWidth <= clientWidth` and `document.body.scrollWidth <= clientWidth`.
- Intentional in-container horizontal scroll (e.g. comparison tables inside an `overflow-x:auto` wrapper that itself fits
  the viewport) is allowed and only counted as information. A wrapper that is itself wider than the viewport is a failure.
- Offending elements are listed (right edge beyond the viewport, not contained by a fitting scroller). Text that
  overflows its own box (nowrap pills/buttons) can show `offenders: none-detected`; inspect text ranges / `scrollWidth > clientWidth`.
- Hiding the problem on `html`/`body` (`overflow-x: hidden|clip`) is **not** an accepted fix: the test fails if root
  clipping coexists with overflowing content. `html { overflow-x: clip }` was removed from `src/styles/global.css` for this reason.
- Hidden content (closed `<details>` mobile menu, `display:none`) is ignored via `checkVisibility()`.

## Prerequisites

1. Node >= 24 and `npm ci`.
2. `playwright-core` somewhere on disk (not a repo dependency). Either `npm i --no-save playwright-core` in a scratch
   directory, or reuse an existing install, and point to it with `PLAYWRIGHT_CORE_PATH=<dir of playwright-core>`.
   - Git Bash on Windows rewrites `/c/...` style env values: use `C:/path/to/node_modules/playwright-core`
     (or `export MSYS_NO_PATHCONV=1`).
3. A Chromium. Either set `CHROMIUM_PATH=<chrome/chromium/msedge executable>`, or let Playwright use its own browser:
   `npx playwright-core install chromium` (downloads once to the Playwright cache; on Linux add `--with-deps`
   for system libraries, which needs root). If neither Playwright's browser nor `CHROMIUM_PATH` exists the
   script falls back to the system Chrome/Edge/chromium paths it knows.
4. If `playwright-core` cannot be loaded the scripts print `NOT_RUN` and exit with code 2 (report this as NOT_RUN, not PASS).

## Run

```sh
npm run build                                   # produces dist/ (about 1-3 minutes)
export PLAYWRIGHT_CORE_PATH=C:/path/to/node_modules/playwright-core   # optional if resolvable
export CHROMIUM_PATH=...                                              # optional
node scripts/test-page-overflow.mjs                         # all pages x all widths (~8-10 min; 127 pages x 9 widths)
node scripts/test-page-overflow.mjs --widths=320,360        # quick pass
node scripts/test-page-overflow.mjs --filter=/tools/        # subset of routes (substring match)
node scripts/test-header-overflow.mjs                       # header, representative pages
node scripts/test-header-overflow.mjs --all                 # header, every page
```

Exit codes: 0 PASS, 1 FAIL (offenders listed), 2 NOT_RUN.

## Low-memory procedure (small RAM / user browser running)

Both scripts (and `scripts/qa-changed-pages.mjs`) share `scripts/lib/qa-browser.mjs`. Assertions and the page x width
matrix are unchanged; only the execution is memory-safe. Defaults are already low-memory: one Chromium, one page at a
time, a fresh context and page per case (closed right after), Chromium relaunched every 40 cases, and flags
`--disable-gpu --disable-dev-shm-usage --disable-extensions --js-flags=--max-old-space-size=256`.

| Option | Meaning |
| --- | --- |
| `--progress-file=<path>` | Append one JSON line per completed case: `{page,width,status,detail,t}`. |
| `--resume` | Skip cases already `PASS` in the progress file (FAIL/missing cases are re-run). Resumed count is reported. |
| `--shard=i/n` | Run every n-th page (1-based i) of the sorted page list, e.g. `--shard=1/4`. |
| `--only=<route-prefix>` | Only routes starting with the prefix, e.g. `--only=/tools/` (`--filter=` in test-page-overflow is substring). |
| `--restart-every=N` | Relaunch Chromium every N cases (default 40). |
| `--min-free-mb=200`, `--max-mem-waits=30` | Before each case wait (5 s steps) while `os.freemem()` is below the threshold; after 30 consecutive waits print `NOT_RUN` and exit 2 cleanly. Re-run with `--resume` later. |
| `--no-lowmem-args` | Do not add the low-memory Chromium flags. |
| `--max-pages-parallel` | Accepted for clarity; always 1. |

```sh
node scripts/test-page-overflow.mjs --progress-file=C:/tmp/po.jsonl --resume          # interrupted? just re-run
node scripts/test-header-overflow.mjs --all --progress-file=C:/tmp/ho.jsonl --resume
node scripts/qa-changed-pages.mjs --progress-file=C:/tmp/qa.jsonl --resume              # SEO / Dreamina page QA
```

A run killed by the OS leaves a valid progress file; `NOT_RUN` (exit 2) is reported, never PASS, when memory stays low.

## Serving and offline behaviour

The scripts do not need `npm run preview`: each starts its own static server on `127.0.0.1:<random port>` over `./dist`.
(If you prefer manual inspection, `npm run preview` serves the same output.) All requests to hosts other than
`127.0.0.1` (web fonts, analytics, affiliate pixels) are aborted in the browser context, so the run is offline,
deterministic, and sends no tracking hits. Only Chromium itself and `playwright-core` have to be present beforehand.

## Debugging a failure

1. Re-run with `--filter=<route> --widths=<w>`.
2. Look at the listed offenders. Common root causes seen so far:
   - a flex container with `flex-wrap: wrap` in a column direction sizes each line to its widest item, so a
     `nowrap` child with `overflow-x:auto` is not constrained (fix: `flex-wrap: nowrap`);
   - fixed `min-width` larger than a narrow container (fix: `min(280px, 100%)`);
   - `white-space: nowrap` buttons/pills with long Japanese labels (fix: allow wrapping, `max-width: 100%`).
3. Fix the element, never the root (`html`/`body` overflow).
