# InVideo AI official refresh audit (2026-11-01)

- task_id: 2026-11-01-invideo-ai-official-refresh (Issue #23, Track B)
- verification date: 2026-11-01 JST
- PRODUCTION: NOT DEPLOYED (Draft PR only, no merge)
- affiliate URLs: UNCHANGED (`src/data/toolAffiliateLinks.ts` has no diff)

## Official sources read (2026-11-01)

| URL | Result |
|---|---|
| https://invideo.io/pricing/ | OK. Starter / Plus / Max, credit and seat based. Annual 50% promotional discount shown with crossed-out regular figures. |
| https://help.invideo.io/en/articles/14717491-get-started-with-ai-filmmaking | OK. Article dated 2026-07-30. |
| https://help.invideo.io/en/articles/11528140-invideo-plans-and-credits-everything-you-need-to-know | OK. Article dated 2026-09-24. No plan prices stated. |
| https://help.invideo.io/en/articles/9387980-can-i-generate-a-video-in-other-languages | HTTP 404 (also 404 without slug). Not verifiable. |
| https://invideo.io/terms-and-conditions/ | OK. Last updated 2026-08-12. |
| https://invideo.io/make/ai-subtitle-generator/ (supplementary, marketing page) | OK. States "50+ languages"; Japanese not named; interface language not stated. |

## Old claim -> evidence -> final claim

### A. Product positioning
- Old: template-centric "AI video maker", "テンプレート型", "テンプレート編集支援型", "純粋なAI映像生成よりテンプレート型".
- Evidence: Help (2026-07-30) calls it an agentic AI video creation platform, says it is not a template tool and not a one-shot generator; script-to-final-cut flow (writing, storyboarding, shot generation, editing); 200+ AI models; Agent mode default on prompt page. Pricing page lists timeline editor, premium stock footage, credit-based generative models. Help body does not describe templates beyond denying it is a template tool.
- Final: agentic/generative/editor platform. Editor and stock footage kept as secondary features (supported by pricing page). Template emphasis removed; no claim that templates still exist (VERIFY if needed).

### B. Pricing
- Old: lowestPaidPlan "約$20/月〜", "Plus 約$20/月〜（年払い）", plans "Plus / Max / Generative / Elite".
- Evidence: Pricing page shows Starter / Plus / Max (per seat, credits 400 / 2,000 / 8,000 per month). Displayed prices are annual with a promotional 50% discount; regular figures appear crossed out (Starter 20, Plus 60, Max 250 per seat per month) but regular vs promo vs billing-cycle semantics could not be separated with certainty from the extracted text. No promo end date. Credits reset monthly, no rollover; extra purchased credits expire (Help 2026-09-24).
- Final: all plan prices written as "要公式確認"; plan structure, credit amounts and key features recorded. The old "約$20/月〜" removed from the canonical file and the detail page.
- Promotional pricing was NOT treated as evergreen baseline. No sale price stored.
- VERIFY: exact regular monthly vs annual prices.

### C. Japanese support (each item separately)
| Item | Old claim | Evidence 2026-11-01 | Final |
|---|---|---|---|
| UI | canonical `partial`; detail page `非対応` (contradiction) | No official statement found. Pricing and help pages fetched are English. | `unknown` / 未確認 on both |
| Japanese prompt | canonical `true`; detail page 部分対応 | Original source (language help) is 404. No other official statement. | `unknown` / 未確認 |
| JP narration | "full optimization language" via help | Source 404. Marketing pages say 50+ languages only. | VERIFY |
| JP subtitles | same | Marketing page says 50+ languages, Japanese not named. | VERIFY |
| Help/docs in Japanese | `japaneseDocs: false` | Only English help articles found. | unchanged (false), described as "英語版のみ確認" |
- UI support was not inferred from generation-language support.
- Contradiction removed: canonical and detail page now both say unknown / 要確認. Listing pages (see remaining findings) still carry their own values.

### D. Terms / commercial use (revised after GPT review on PR #24)
- Evidence: Terms (updated 2026-08-12) grant a perpetual royalty-free non-exclusive license to commercialize Outputs, surviving cancellation; Free and Paid plans are defined but the output license is not limited to paid plans. Stock, music and fonts remain bound to third-party licenses; user is responsible for AI disclosure where required.
- Final: `commercialUse` changed from `paid-only` to `unknown`. Rendered wording says the Terms grant an output commercialization license while Free vs Paid gating is not confirmed; paid-only is no longer claimed anywhere in the four target files. VERIFY: plan-specific commercial rules from an official plan-specific source.

### D2. Free plan / watermark / export (revised)
- Additional official sources read 2026-11-01: https://help.invideo.io/en/articles/9380226-can-i-use-invideo-ai-for-free (dated 2026-07-28) and https://help.invideo.io/en/articles/9387948-why-are-there-still-watermarks-on-my-video-if-i-m-on-a-paid-plan (updated 2025-09-23).
- Confirmed: a Free Plan exists, no card needed, limited credit allowance (amount not stated), reset weekly Monday 00:00 UTC, credit cost depends on model/settings, paid plans give a higher monthly allocation, free users may use and share videos on social media.
- Not confirmed by current official evidence: free-plan watermark on exports, export count limits or formats, resolution cap, commercial use on the free plan. The 2025 watermark article only covers watermarks on preview and on projects exported before subscribing.
- Final: `freePlan` stays true; `watermark` changed `limited` -> `unknown`; freePlanNote / watermarkCondition / FAQ / badges / tables now state only the confirmed facts and mark the rest 要公式確認. The prior claims "透かしあり・エクスポート回数制限" and "有料プランは透かしなし" were removed.

### E. Review dates
- Updated to 2026-11-01: `lastReviewed`, `verifiedAt`, `reviewed.pricing/terms/features`, `japanBilling.pricingCheckedAt`. `nextReviewDue` = 2026-12-01 (pricing is promotion-driven).
- Caveat: Japanese-support items remain VERIFY despite the updated date; the date reflects the review, not confirmation.

## Sources list changes
- Removed the dead language-help URL (404) from `sources` / `sourceRefs`; added the Get-started help page. Fixed a stale `japanBilling.sourceUrls` entry to the plans/credits help URL. Added help and terms links to the detail page sources.

## Affiliate safety
- `src/data/toolAffiliateLinks.ts`: no diff. Detail page still uses `resolveToolOutboundLink` for hero (`ctaPosition: 'hero'`) and pricing (`placement: 'pricing'`, `ctaPosition: 'pricing'`); `outboundType`, `rel`, and the affiliate disclosure expression were not edited.

## Unresolved (VERIFY)
1. Regular (non-promotional) monthly and annual prices per plan.
2. Japanese UI, prompt, narration, subtitles (official language help is unreachable).
3. Free-plan commercial use, watermark, export limits and resolution.
4. Whether templates still exist as a feature.
