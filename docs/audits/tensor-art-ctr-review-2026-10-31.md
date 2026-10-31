# Tensor.Art CTR review — 2026-10-31

**Issue:** [#12](https://github.com/rookies2478/ai-creative-tools-db/issues/12)
**Scope:** `/tools/tensor-art/` metadata only; no deployment or affiliate changes
**Final decision (2026-10-31):** **HOLD_NO_CHANGE / REVIEW COMPLETED.** Claude Code reviewed the query-level GSC raw, and there was no demonstrated informational-intent gap justifying a title or description edit. Refer to Sections 5–6 for the final evidence. Re-evaluate using the next finalized 28-day data window.

## 1. Evidence and limits

Latest GSC via Claude Code authenticated API (summarized in `docs/audits/gpt-creative-2026-10-31.md`):
- Property: `sc-domain:aicreative-db.com`
- Current finalized period: **2026-10-01 to 2026-10-28** (28 days; 3-day data lag)
- Previous finalized period: **2026-09-03 to 2026-09-30** (28 days)
- Site: 16 → 29 clicks, 2,571 → 2,807 impressions, CTR 0.62% → 1.03%, average position 10.85 → 12.73.
- Tensor.Art page: 1,220 impressions, 9 clicks, page CTR `9/1220 = 0.7377%`, average position ~8.6.
- Exact brand query `tensor art`: **867 impressions (~71.1% of this page's impressions)**, CTR ~0.1%. Searcher motivation is **UNKNOWN**; possible official-site navigation intent is a hypothesis, not verified causation. Brand-only CTR cannot simply be assumed recoverable by rewriting snippet.
- Overall site had 2,807 impressions, so Tensor.Art contributed about 43.5%.
- 9 total page clicks is a small sample; changing one or two clicks noticeably changes CTR.
- **Not yet locally read by GPT:** queries.csv, query-pages.csv, manifest.json, previous-period URL-level rows, complete query distribution and truncation. Raw is gitignored and not available via GitHub. `query-pages` coverage can be truncated; do not assume query rows sum to page aggregate because rare queries are anonymized.

## 2. Current on-page facts / source audit

Page URL: https://aicreative-db.com/tools/tensor-art/

Astro route: `src/pages/tools/tensor-art/index.astro`.

Current title:
> Tensor.Artの商用利用・料金・無料枠まとめ｜AIクリエイティブナビ

Current description:
> Tensor.ArtのSD系モデル・LoRA活用・商用利用条件・料金プラン・無料枠を公式情報をもとに整理。モデルごとのライセンス確認の重要性も解説。最新情報は公式サイトをご確認ください。

The live page already covers the service definition, browser use of SD-derived models and LoRA, free tier, pricing categories, commercial-license cautions, model-specific rights and distinction from local Stable Diffusion. **It does not provide a detailed step-by-step setup tutorial**, so do not promise a comprehensive `使い方` guide. Some factual information confirmation dates are old, but verification of those facts is separate from this metadata-only task.

## 3. Candidate metadata — hold until query breakdown

| Candidate | Title | Rationale | Concern |
| --- | --- | --- | --- |
| A (conditional default) | Tensor.Artとは？無料枠・料金・商用利用とLoRAの特徴を解説 | Introduces what it is, which is directly covered, while retaining commercial/free search intent | Brand-only navigation may remain low CTR |
| B | Tensor.Artの料金・無料枠は？商用利用とモデル別ライセンスを解説 | Favors paid/free/commercial evaluators | Could decrease broad brand informational relevance |
| C | Tensor.Artとは？Stable Diffusion・LoRA・無料枠の特徴と注意点 | Favors capabilities/comparison intents | Could lose commercial/price interest |
| Baseline | Tensor.Artの商用利用・料金・無料枠まとめ｜AIクリエイティブナビ | Current indexed metadata / no implementation risk | Does not open with definition ("とは") |

**Conditional candidate A description (only if supported by actual query breakdown):**

> Tensor.ArtはブラウザでStable Diffusion系モデルやLoRAを使えるAI画像生成サービス。無料枠・料金プラン、商用利用時のモデル別ライセンス、ローカル版との違いを解説します。

This candidate adds no new specific price or legal claim. It reflects sections already present on the live page.

## 4. Required local data read-back and decision

1. Read the two GSC API run manifests from `docs/analytics/gsc/YYYY-MM-DD/raw/run-*/`; verify site, coverage, acquisition method, `status`, `truncated`, `dataState`.
2. Extract Tensor.Art page's query distribution for each period via the stored `query-pages.csv` or filtered Search Analytics query API; never invent prior period if not available.
3. Produce query table (5–10 meaningful queries; clicks/impressions/CTR/average position for each period; signed deltas; brand/navigation vs informational vs transaction/commercial classification). Query classification is a *review judgment*, not Google-provided intent.
4. Verify top intent against title + visible copy. If brand-only navigational demand dominates and no under-served information queries emerge, **HOLD metadata**; don't change the page merely to force a PR.
5. If a different informational intent is materially represented by impressions and absent from the baseline metadata, choose candidate A/B/C or a grounded alternative, then modify only the title + description attributes. Do not change H1, body, JSON-LD, canonical, source timestamps, affiliate links or tools database.
6. Required validations: `npm run validate:task`, `npm run build`, `npm run validate:data`, `npm run validate:publish`, `npm run validate:affiliate-links`, `npm run validate:scope`, `git diff --check`, plus built HTML title/meta validation.
7. For evaluation: record prechange (2026-10-01..28) as a baseline and assess matched page/query impressions, CTR, positions over subsequent finalized windows; do not attribute observational changes solely to the metadata edit.

## 5. Local raw read-back (Claude Code, 2026-10-31)

Source: `docs/analytics/gsc/2026-10-28/raw/run-124522` (current) and `docs/analytics/gsc/2026-09-30/raw/run-124530` (previous). Both manifests: method `api`, site `sc-domain:aicreative-db.com`, `truncated: []`. Raw is gitignored. Listed query rows cover 85.8% (current, 1,047/1,220) and 85.6% (previous, 648/757) of page impressions; the remainder is anonymized/unlisted and not inferred.

| Query | Class | Prev clk/imp/pos | Cur clk/imp/pos | Cur CTR |
| --- | --- | --- | --- | --- |
| tensor art | brand/navigational | 1 / 576 / 8.5 | 1 / 867 / 8.9 | 0.12% |
| tensor.art | brand/navigational | 1 / 41 / 9.6 | 0 / 115 / 8.6 | 0% |
| tensor.art 料金 | commercial | 1 / 12 / 5.7 | 0 / 14 / 6.6 | 0% |
| tensor lora | informational | 0 / 3 / 9.7 | 0 / 8 / 8.8 | 0% |
| tensor hub art | brand variant | - | 0 / 8 / 9.6 | 0% |
| tensorart | brand variant | - | 0 / 7 / 4.0 | 0% |
| tensor art lora | informational | 0 / 1 / 8.0 | 0 / 2 / 9.5 | 0% |

Findings:
- Brand/navigational queries (tensor art, tensor.art, spelling and spacing variants) dominate: `tensor art` alone is 71.1% of current page impressions (867/1,220). Searcher intent is a review judgment, not Google data.
- Informational/commercial queries (料金, 無料, LoRA, 使い方, 規制, etc.) total 32 impressions (2.6%) current and 21 (2.8%) previous, with 0 clicks except one previous 料金 click. The share did not grow.
- Baseline title/description already contain 商用利用・料金・無料枠 and LoRA. No materially represented informational intent is missing from the baseline.
- Page position is stable (8.4 -> 8.6). Impression growth (757 -> 1,220) came from brand queries; CTR of a brand query is mainly driven by users seeking the official site, which a snippet rewrite is unlikely to recover. 9 page clicks is too small a sample to attribute any CTR difference to metadata.
- Candidates A/B/C add "とは" or reorder keywords for intents that the data does not show. Expected benefit is unsupported.

## 6. Decision

**HOLD. No change to `src/pages/tools/tensor-art/index.astro`.** The acceptance criterion (a materially represented informational intent absent from baseline metadata) is not met. Re-evaluate after the next finalized 28-day window (e.g. 2026-11-01..11-28) if 料金/LoRA/使い方 impressions grow to a meaningful share, using per-query rows with the same raw read-back.

## 7. Current status
- Source code modified: NO.
- Query-level local raw verification: DONE.
- Production: NOT DEPLOYED by this task.
