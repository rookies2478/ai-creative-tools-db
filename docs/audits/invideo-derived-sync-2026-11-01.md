# InVideo derived-surface sync audit — 2026-11-01

## Scope

Issue #25. PR #24で確定したInVideo AI正本を、ハードコードされた3つの派生表示へ同期する。

## Canonical source

- `src/content/tools/invideo-ai.md`
- verified/reviewed: 2026-11-01
- commercialUse: unknown
- watermark: unknown
- Japanese UI/prompt: unknown
- pricing: Starter / Plus / Max、正確な通常価格は要公式確認
- product position: agentic AI video creation platform

## Changes

### video-generation category

InVideoカードを以下へ同期:
- role: エージェント型動画制作
- commercial: 要公式確認
- price: 要公式確認
- Japanese: 要確認
- review date: 2026-11-01

### Japanese support component

InVideoのUI / promptを未確認（－）へ変更。docsは、確認できたHelpが英語版のみという正本判断に合わせて×を維持。verifiedAtとnoteを追加。

### InVideo vs CapCut comparison

InVideo側だけを更新:
- template/script-centric framingをagentic制作プラットフォームへ修正
- 約$20/月の旧価格を削除
- paid-only商用利用の断定を削除
- Free Plan watermark/exportの断定を削除
- Japanese UI/promptの断定を未確認へ変更
- Runway/Pika等との差を「生成しない」ではなく「制作工程全体 vs 生成機能中心」へ修正
- dateModified: 2026-11-01

CapCut側の事実・URLは変更していない。

## Non-changes

- `src/content/tools/invideo-ai.md`: no change
- `src/data/toolAffiliateLinks.ts`: no change
- GA4 / Clarity: no change
- affiliate CTA / URLs: no change
- unrelated tools: no intentional change

## Remaining VERIFY

- exact regular pricing
- Japanese UI / prompt / narration / subtitles
- Free Plan commercial-use gating
- watermark / export limits
- whether templates remain available as a secondary feature

## Production

NOT_DEPLOYED by this task. PR / Preview / CI evidence must be reviewed before merge.
