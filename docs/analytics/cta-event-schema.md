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
| `placement` | `data-cta-position` | `hero` / `pricing` / `primary` / `secondary` / `checklist` |
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

## Human-only follow-ups

- Register custom dimensions in GA4 Admin (`tool_slug`, `placement`, `link_type`, `affiliate_provider`, `destination_domain`) before they appear in reports.
- Browser real-click verification: see "Claude in Chrome確認待ち" in `reports/cta-tracking-audit.md` PR notes.
