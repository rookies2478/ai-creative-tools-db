# ASP sub-id design

Status: builder IMPLEMENTED but DISABLED. `ASP_SUBID_CONFIG.enabled = false` and `providerParams = {}` (src/utils/aspSubId.ts), so no live href changes. No affiliate URL, ASP console setting or link table was changed. Enabling requires human approval (affiliate links are a protected path) and a console-verified parameter name (`subId1` is NOT_VERIFIED).

## Goal
Join ASP-side conversions to site-side `affiliate_click` events by `tool_slug` and `placement`.

## Proposed sub-id format
`<tool_slug>.<placement>` ASCII, lowercase, `[a-z0-9-]` and one `.` separator, max 40 chars. Examples: `invideo-ai.hero`, `invideo-ai.pricing`.
- No user id, no page URL, no query values, no timestamp (no personal data; stable aggregation key).
- Optional page-type suffix is NOT proposed (placement already identifies the slot).

## Per-ASP mapping (verify in each ASP console; values NOT_VERIFIED)
| ASP | parameter (to confirm) | note |
|---|---|---|
| Impact (InVideo, `sjv.io`) | `subId1` (and `sharedid`) | confirm allowed params for the program in Impact before use |
| A8.net | `a8mat` is fixed; use per-link "ID" or `argument` if the program allows | confirm in console |
| Others | confirm per ASP | do not assume |

## Implementation (this PR)
1. `src/utils/aspSubId.ts` (pure): `buildAspSubId(toolSlug, placement)` -> `<tool_slug>.<placement>` (lowercase, `[a-z0-9-]` + one `.`, <= 40 chars, slug truncated first, null if empty); `applyAspSubId(url, provider, subId, config)`; `ASP_SUBID_CONFIG`.
2. `resolveToolOutboundLink` computes `subId` from `toolSlug` + DOM placement (`toCtaPlacement(linkPlacement)`: primary->hero, pricing->pricing, see cta-event-schema.md "Placement mapping") and returns it as `ResolvedOutboundLink.subId` (informational) while `url = applyAspSubId(entry.url, ...)`.
3. Guard: `applyAspSubId` returns the URL byte-for-byte unchanged unless `enabled === true` AND the provider entry exists with `verified: true`. Default: off, empty.
4. `destination_url` sent to GA4 stays origin+pathname, so the sub-id never reaches GA4.
5. `audit:cta` (`auditAspSubId`) enforces: `enabled` literal present; `enabled: true` requires all providerParams `verified: true`; resolver builds and applies the sub-id; no sub-id query param hard-coded in `toolAffiliateLinks.ts` while disabled. Unit tests: `scripts/test-audit-cta-tracking.mjs`.

## How to enable (human steps, future)
1. Confirm in the ASP console/program terms the exact sub-id parameter and allowed characters/length (the `.` separator and 40-char limit included).
2. Add `providerParams['Impact / InVideo'] = { param: '<confirmed>', verified: true }` and set `enabled: true` in one approved PR; check built hrefs and ASP click reports before release.
3. Keep `data-affiliate-provider` for GA4; sub-id is for the ASP report only.

## Join
ASP report (sub-id) <-> GA4 (`tool_slug` + `placement` + `affiliate_provider`) <-> GSC (`/tools/<tool_slug>/`).
