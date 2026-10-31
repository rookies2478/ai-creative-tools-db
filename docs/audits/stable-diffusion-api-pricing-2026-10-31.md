# Stable Diffusion API pricing accuracy audit — 2026-10-31

**Issue:** [#16](https://github.com/rookies2478/ai-creative-tools-db/issues/16)
**Status:** Official-source verified; code prepared in review branch. Not deployed.

## Verified primary references
- https://platform.stability.ai/pricing (official Stability AI Developer Platform pricing; retrieved 2026-10-31)
  - API usage billed in credits; **1 credit = USD $0.01**; image services list model-specific generation credits (e.g. Ultra 8, SD3.5 Large 6.5, Core 3) and are subject to change.
  - No general mandatory **$20/month / 6,000 credits** API tier was shown as the standard API unit price on this official page.
- https://platform.stability.ai/docs/getting-started (official; retrieved 2026-10-31): new accounts get **25 free credits**; additional credits can be purchased. Distinguish one-time API credits from **free local model execution**.
- https://stability.ai/license (license reference only; pricing correction does not alter license claims). The Community vs Enterprise $1M threshold is separate from per-API credit pricing.

## Before / after

| Field | Before | After |
| --- | --- | --- |
| ToolDetailPage basicInfo 最安料金 | Local free / API $20/month from legacy June 2026 | Local free / API credits-based usage |
| basicInfo detail | $20/month 6,000 credits | 1 credit $0.01, varies by model; new accounts 25 credits |
| quickTable 最安料金 | API $20/month | Credits per use, 1 credit $0.01 |
| pricing table | $20/month, 6,000 credits | Credits per use, 1 credit $0.01 |
| Canonical paidPlanNote | June 2026 $20/month | Credits per use; 25 free credits for new API accounts |
| Canonical pricing section | June 2026 $20/month | Credits per use, verified official link |
| Canonical pricing metadata | Old source note and pricing date | Pricing reviewed 2026-10-31; other review dates unchanged |

## Editorial guardrails

- Stable Diffusion is a model ecosystem, not a single monthly SaaS subscription: local model execution is free with hardware and setup costs; official API is a separate paid service; third-party hosted services have their own models of billing.
- Do not change SEO title/meta, canonical, H1, rights/license claims, CTA destinations, affiliate status or global pricing comparison logic in this task.
- Prices are not permanent. **Do not state a guaranteed monthly fee or stable minimum monthly charge.**
- This is a **data-correction** based on official evidence, not a GSC CTR optimization. Query-level raw may inform future separate optimization but is not evidence of price facts.

## Validation and release boundary
- GPT edit scope: src/pages/tools/stable-diffusion/index.astro, src/content/tools/stable-diffusion.md, active task and this audit only.
- This GPT session did not execute npm/CLI, Astro preview or live-browser tests; required checks delegated to Claude Code. GitHub Actions on PR may validate build/data/publish but not all required checks.
- Master merge requires scope, build, data, publish, affiliate-links and preview evidence. Production release is human-only.
