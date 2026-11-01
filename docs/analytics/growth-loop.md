# Growth Loop: AI Creative DB site record

Common procedure: shared Core `docs/OPERATIONS.md` (movance-growth-loop). This file holds only site-specific facts. Record date: 2026-11-01. States: VERIFIED / NOT_VERIFIED / HOLD.

## Current state

| Item | State | Evidence |
|---|---|---|
| Core registration | `sites/ai-creative-db.json` `enabled:false`, GSC `NOT_VERIFIED` | Core main; draft profile in Core PR #23 (Draft) |
| Core run | **HOLD**: not run. A disabled site is SKIPPED; enabling needs a human-reviewed change and a verified read-only GSC grant | `growth run --site ai-creative-db --source gsc` -> SKIPPED, nothing collected |
| GSC (legacy path) | Last data 2026-08-13 (manual export) and 2026-08-10 (API); nothing since | `docs/analytics/gsc/`, `scripts/analytics-gsc-fetch.mjs` (needs `GOOGLE_APPLICATION_CREDENTIALS`, value never read) |
| GA4 | Tag `G-YTH7GM5ZGT` loads only on exact host `aicreative-db.com` (PR #29); Realtime verified in that task. No Core property registered | `docs/tasks/completed/2026-11-01-measurement-safety.md` |
| Clarity | Project `wo9noh1ex6`, one prior analysis (2026-07-27, quality LOW) | `docs/analytics/clarity/` |
| Affiliate | Only InVideo AI has an approved link; every other tool falls back to the official URL | `src/data/toolAffiliateLinks.ts`, `validate:affiliate-links` |
| Issue #1 (InVideo CTA GA4 event) | Implemented in code (PR #2); live HTML attributes NOT_VERIFIED. Close or live-check separately | task record 2026-10-10 |

## Differences from AI議事録ナビ (for the third site)

- Routes: `/tools/`, `/comparisons/`, `/use-cases/`, `/guides/` (not `/compare/`); protected legal pages include `/editorial-policy/`.
- Tool titles/meta mostly live in `src/pages/tools/<slug>/index.astro` (STATIC_OVERRIDES), not in `.md` front matter; `src/content/tools/*.md` is the protected DB. A CTR change therefore touches `.astro`, which needs its own task and the accuracy gate.
- Accuracy risk is commercial use / copyright / watermark / pricing; these need dated official sources (see PR #24 removing unsupported claims).
- Hosting Cloudflare Pages; measurement host-gated; one active task file per work item with `validate:task` / `validate:scope`.
- Very small volume (about 2,200 impressions per 14 days in 2026-08), so navi thresholds are not tuned here (profile is DRAFT).

## Per-site setup needed for a new site

1. `sites/<id>.json` + `profiles/<id>/{thresholds,routing}.json` (Core).
2. Local credential map entry for `credentialRef` and a read-only GSC grant (human).
3. Site repo: task/validate scripts, host-gated tags, result file.

## Candidates (evidence-limited; none implemented)

- Tensor.Art CTR: HOLD (brand-dependent, 2.6% informational); re-evaluate with finalized 2026-11-01..11-28 data (`docs/audits/tensor-art-ctr-review-2026-10-31.md`).
- Banner-generation comparison pages lost impressions; possible cannibalization with `/categories/design/` (2026-08 summary, stale).
- Stale `nextReviewDue` on some tool pages (for example runway, 2026-08-11): needs official-source review.
- No candidate is ranked from current data: the newest page-level data is 2.5 months old.

## Human gates

- Approve and verify read-only GSC access for `ai-creative-db-gsc`, then a reviewed change setting `enabled:true`; then one manual GSC-only run.
- Optional GA4 property registration; schedule stays disabled.
- Any content/CTA/affiliate/pricing change: own Issue, active task, official-source check.
