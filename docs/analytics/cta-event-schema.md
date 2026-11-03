# CTA Event Schema (official_site_click / affiliate_click)

Canonical for outbound CTA measurement. Emitter: delegated click handler in `src/layouts/BaseLayout.astro`.
Markup contract: `data-*` attributes on the CTA anchor (set by `ToolDetailPage.astro`, `AdobeFireflyTool.astro`, `pages/tools/[slug].astro`).
Static check: `npm run audit:cta` (CI) -> `reports/cta-tracking-audit.md`.

## Events

| event | when |
|---|---|
| `official_site_click` | anchor has `data-outbound-type="official"` (or any value other than `affiliate`) |
| `affiliate_click` | anchor has `data-outbound-type="affiliate"` (resolved by `resolveToolOutboundLink`) |

## Parameters

| param | source attribute | note |
|---|---|---|
| `tool_slug` | `data-tool-slug` | **JOIN KEY.** = `src/content/tools/<slug>.md` = URL `/tools/<slug>/` = `toolAffiliateLinks.toolSlug` |
| `tool_name` | `data-tool-name` | display name (legacy, kept) |
| `placement` | `data-cta-position` | `hero` / `pricing` / `primary` / `secondary` / `checklist` (main CTAs); `table` (official link inside comparison/quick table cell), `source` (official info/usage-guide button), `terms` (terms-of-use button). `table` links in `ToolDetailPage` are tagged at render by `trackCellLinks`. |
| `cta_position` | same | legacy duplicate of `placement`, kept for GA4 continuity; drop after migration |
| `link_type` | `data-outbound-type` | `official` / `affiliate` |
| `affiliate_provider` | `data-affiliate-provider` | e.g. `Impact / InVideo`; empty for official |
| `destination_url` | `href` | origin + pathname only (query/hash never sent) |
| `destination_domain` | derived | hostname of `destination_url` |
| `page_path` | `location.pathname` | landing/page for GSC page join |

## Join design (GSC / GA4 / ASP)

- GSC: page URL `https://aicreative-db.com/tools/<tool_slug>/` <-> `tool_slug` (`page_path`).
- GA4: `tool_slug` + `placement` + `link_type`.
- ASP: `affiliate_provider` + `tool_slug` (ASP-side sub-id is NOT set; no link change was made).

## Rules enforced by `audit:cta`

1. Every tool page CTA carries tracking (no silent untracked primary/secondary CTA).
2. Affiliate URLs only via `resolveToolOutboundLink` (no hard-coded affiliate URL / known affiliate host in pages).
3. Affiliate CTA must pass `affiliateProvider`; official URL must not be marked affiliate and vice versa.
4. `target="_blank"` needs `noopener`.
5. gtag event contains all params above.

## Placement mapping (canonical)

Code: `src/utils/ctaPlacement.ts` (`CTA_PLACEMENTS`, `LINK_PLACEMENT_TO_CTA_PLACEMENT`, `CTA_PLACEMENT_TO_LINK_PLACEMENT`). Enforced by `audit:cta` (`auditPlacements`).

| DOM / GA4 `placement` | meaning | `toolAffiliateLinks.LinkPlacement` | can carry affiliate? |
|---|---|---|---|
| `hero` | main CTA at page top | `primary` | yes |
| `primary` | primaryCta fallback when `ctaPosition` omitted | `primary` | yes |
| `checklist` | CTA at end of checklist | `primary` | yes |
| `pricing` | pricing-plan CTA | `pricing` | yes |
| `secondary` | secondaryCta fallback when `ctaPosition` omitted | - | no (official only) |
| `table` / `source` / `terms` | table-cell link / info button / terms button | - | no (official only) |

Rules: `LinkPlacement` (link table key) stays `primary|pricing`; the DOM placement is what GA4 and the ASP sub-id use. A resolver call with link placement `L` must be rendered with a DOM placement `P` where `CTA_PLACEMENT_TO_LINK_PLACEMENT[P] === L` (audit-checked; e.g. invideo-ai: `primary`->`hero`, `pricing`->`pricing`). Any `data-cta-position`/`ctaPosition` literal outside the 8 documented values fails the audit.

`cta_position` (legacy duplicate of `placement`) is NOT removed: it is a live GA4 payload key and GA4 report/continuity impact cannot be verified from the repo. Instead `audit:cta` enforces that both keys are emitted from the same variable so they cannot diverge. Remove only after GA4 reports are confirmed not to use it (human decision).

## Human-only follow-ups

- Register custom dimensions in GA4 Admin (`tool_slug`, `placement`, `link_type`, `affiliate_provider`, `destination_domain`) before they appear in reports.
- Browser real-click verification: see "Claude in Chrome確認待ち" in `reports/cta-tracking-audit.md` PR notes.

## GA4 custom dimensions to register (event-scoped)

`tool_slug`, `placement`, `link_type`, `affiliate_provider`, `destination_domain`, `page_path`, `tool_name`.
Not needed: `cta_position` (legacy duplicate of `placement`), `destination_url` (high cardinality; keep for DebugView only, or register only if needed).

## Known untracked (by design)

- Related-tool "公式 ↗" links and source-list links in `ToolDetailPage` (point to other tools / reference sources; `tool_slug` would be misattributed).
- Middle-click / keyboard-open in new tab (`auxclick`) is not captured; only `click`.
- Removed: `TdpToolPage.astro`, `LeonardoAiTool.astro`, `MidjourneyTool.astro` (orphan components, imported nowhere, with untracked CTAs). `audit:cta` still warns if a new CTA-rendering component is not imported by any tool page.

ASP sub-id proposal: `asp-subid-design.md`.

## Browser QA checklist (human / Claude in Chrome; run on a Preview URL before any merge to master)

Never click affiliate links through to the ASP on Preview/production QA (creates real click records). Inspect `href` and listeners instead; for official links, open in a new tab and close.

### Measurement gating (what decides whether anything is sent)
- `src/layouts/BaseLayout.astro` initializes gtag/GA4 (`G-YTH7GM5ZGT`) and Clarity only if `shouldInitializeMeasurement(window.location.hostname, import.meta.env.PROD)` is true.
- `src/utils/measurementSafety.mjs`: true only when the build is production AND `hostname === 'aicreative-db.com'` (exact match). `www.`, `*.pages.dev` previews and `localhost` are all false (asserted in `scripts/test-measurement-safety.mjs`, which runs before `astro build` in `npm run build`).
- The click handler returns early when `typeof window.gtag !== 'function'`, so on non-production hosts no `gtag`, no `dataLayer`, no gtag/Clarity script and no collect request exist; clicks emit nothing.
- Only the HTML/JS is gated by host; the GA4 data stream itself has no server-side filter in this repo (GA4 settings are human-only).

### Per-CTA checks (repeat for each type: hero, primary, secondary, pricing, table, affiliate, official)
1. Display: CTA is visible, label unchanged, not overlapped.
2. Attributes: `data-outbound-type` (affiliate|official), `data-cta-position` (one of 8 documented values), `data-tool-slug` = page slug, `data-tool-name`, `data-affiliate-provider` (affiliate only, empty on official).
3. `href`: valid https, no broken/placeholder URL, no query/sub-id added while `ASP_SUBID_CONFIG.enabled === false` (affiliate hrefs byte-identical to master).
4. `target="_blank"` with `rel` containing `noopener`; affiliate also `sponsored nofollow`.
5. Affiliate vs official never both on the same anchor; the same anchor never carries both `data-outbound-type` values.
6. Expected event (production host only): affiliate -> `affiliate_click`, official -> `official_site_click`; params `tool_slug`, `tool_name`, `placement` (= `cta_position`), `link_type`, `affiliate_provider`, `destination_url` (origin+path, no query/hash), `destination_domain`, `page_path`.
7. 1 click = 1 event: exactly one handler (document-level delegated listener, no per-element duplicate); nested elements inside the anchor still produce one event; no double fire on touch/keyboard Enter.

### Preview / localhost safety (must all hold on `*.pages.dev` and `localhost`)
- `typeof window.gtag === 'undefined'`, `window.dataLayer` undefined, `window.clarity` undefined.
- Network panel: no request to `googletagmanager.com`, `google-analytics.com` / `/g/collect`, or `clarity.ms`.
- Clicking an official CTA navigates normally and sends nothing.

### Production (post-release, human only)
Verify in GA4 DebugView / Realtime on `aicreative-db.com` only after the human-approved release; register custom dimensions first (see above).
