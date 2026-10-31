# AI Creative DB GPT audit — 2026-10-31

## Sources and execution boundary
- GitHub master and published site were read; the audit branch is review-only.
- Existing system: scripts/analytics-gsc-fetch.mjs, import-gsc-manual-export.mjs, validate-data.mjs, validate-publish.mjs, validate-affiliate-links.mjs, .github/workflows/build.yml.
- GSC read access: no selected site was available in the connected HYPD account; Windsor has zero connected accounts. GA4: connected HYPD account has no selected property. Thus NO 2026-10-31 GSC/GA4 figures were obtained.
- No live GSC pull, npm build, local diff validation, or production deployment was performed in this GPT session.

## Findings

| Priority | Finding | Evidence | Next action |
| --- | --- | --- | --- |
| P0 | InVideo alone has enabled approved URLs (primary/pricing) in toolAffiliateLinks.ts | src/data/toolAffiliateLinks.ts | Verify production CTA + GA4 affiliate_click receipt, don't fabricate conversions |
| P0 | PixVerse program approval conflicts with another October ledger; approved != link published | src/data/affiliatePrograms.ts | Confirm Impact account, reconcile evidence before activation |
| P0 | Fotor and Runway have applications, no confirmed approved tracking links | src/data/affiliatePrograms.ts | Verify externally; keep official links |
| P0 | GSC fetch is already implemented but this GPT run has no site authorization | docs/analytics/gsc/README.md | Run existing API fetch in authenticated environment with 28d and prior 28d |
| P0 | Recent docs/tasks/LATEST.md snapshot predates current GitHub commit | docs/tasks/LATEST.md | Reconcile local/origin/current task after checks |
| P1 | Plain-string HTML tag leakage: lead, InfoCard.sum, commercial.lead in PixVerse/Hailuo | src/components/ToolDetailPage.astro, src/pages/tools/{pixverse,hailuo-ai}/index.astro | Remove literal tags only in plain-string contexts (this branch); preserve set:html |
| P1 | Multiple dedicated Astro pages duplicate tool facts while .md may be dead display data | prior docs/tasks/LATEST.md audits | Scope reconciliation task |
| P1 | Home comparison price parsing via first-number regex and unconditional /month label can misinterpret credit/year price | src/pages/index.astro | Add tests then migrate structured price fields, separately |
| P1 | Sample metadata covers 19 image records (including reference visuals) and 9 video output records | src/data/generatedImages.ts, src/data/generatedVideos.ts | Audit provenance, model/date freshness, physical file existence |
| P1 | Official fact dates and old-model descriptions need revalidation | src/content/tools, dedicated pages | Verify authoritative sources before editing claims |
| P2 | Only the Build workflow verified; no scheduled GSC action was confirmed | .github/workflows/build.yml | Decide whether local/manual trigger or explicit schedule is appropriate |

## SEO next cycle
Existing August big-keyword audit prioritised stable-diffusion/kling-ai/hailuo-ai and they subsequently received SEO edits. Do not repeat until performance is measured. Re-evaluate PixVerse, Luma AI, Vidu AI, Runway, InVideo using finalized current 28 days vs prior 28 days, per-page query distribution, position and CTR. Hold keyword-specific copy changes without fresh data.

## Revenue discipline
Maintain a funnel ledger: GSC clicks and page impressions -> GA4 page views -> official_site_click / affiliate_click -> ASP conversions -> approved payouts. Never label outbound clicks as approved conversions or revenue. Continue editorial ranking independence from affiliate terms.

## Work on this branch
- Only removes five `<b>` / `</b>` pairs from plain text fields across PixVerse and Hailuo. Does not alter set:html areas, copy facts, prices, disclosures, destinations or URLs.
- Review PR is draft; local tests NOT_RUN. Verification and task completion are delegated to Claude Code in the existing task workflow; deployment remains manual.
