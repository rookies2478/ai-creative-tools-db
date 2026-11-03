# ASP sub-id design (proposal, NOT implemented)

Status: design only. No affiliate URL, ASP setting or link table was changed. Implementing requires human approval (affiliate links are a protected path).

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

## Implementation sketch (future PR, human-approved)
1. Add optional `subId` builder in `resolveToolOutboundLink` (single place that emits affiliate URLs): append the ASP-specific param from `${toolSlug}.${placement}`.
2. `LinkPlacement` currently = `primary | pricing` in `toolAffiliateLinks.ts`, while DOM placements are `hero | pricing | checklist` (see cta-event-schema.md). Map explicitly: primary->hero (+checklist), pricing->pricing, or extend the type; do this in the same PR.
3. Keep `data-affiliate-provider` for GA4; sub-id is only for the ASP report.
4. `destination_url` sent to GA4 stays origin+pathname, so the sub-id never reaches GA4.
5. Add `audit:cta` rule: every affiliate URL emitted by the resolver contains the sub-id param.

## Join
ASP report (sub-id) <-> GA4 (`tool_slug` + `placement` + `affiliate_provider`) <-> GSC (`/tools/<tool_slug>/`).
