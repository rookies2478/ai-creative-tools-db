---
task_id: "verify-review-overdue-clipdrop-gemini"
created_at: "2026-07-26"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: false
official_verification_required: true

goal: "Re-verify the current official Clipdrop and Gemini image-generation information, update only supported tool-data fields, and clear the two review-overdue warnings."

non_goals:
  - "他ツールの再確認"
  - "全DB監査"
  - "validator変更"
  - "schema変更"
  - "URL route変更"
  - "slug変更"
  - "比較ロジック変更"
  - "カテゴリページ変更"
  - "ガイド記事変更"
  - "タイトルやmeta変更"
  - "validate:publish実装"
  - "GitHub Actions変更"
  - "公式情報で確認できない内容の推測"
  - "外部非公式記事を一次根拠として採用"
  - "本番反映"

target_files:
  - src/content/tools/clipdrop.md
  - src/content/tools/gemini-image-generation.md
  - docs/tasks/active/verify-review-overdue-clipdrop-gemini.md
  - docs/tasks/completed/*.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - scripts/validate-data.mjs
  - src/content/config.ts

unknowns:
  - "Whether Clipdrop pricing, free access, credits, or product availability have changed."
  - "Whether Gemini image-generation access, plan naming, limits, or billing descriptions have changed."
  - "Whether existing pricingSourceUrl and sourceRefs still point to current official pages."
  - "Whether Google One AI Premium is still the correct current product reference for the stored Gemini description."
  - "Official pages may be region-dependent, dynamically rendered, redirected, or inaccessible."

preexisting_untracked_files:
  - aicreative-db.com-Performance-on-Search-2026-07-10.zip
  - gsc-fotor-ai-queries-2026-07-10.zip
  - gsc-kling-ai-queries-2026-07-10.zip
  - gsc-luma-ai-queries-2026-07-10.zip
  - gsc-microsoft-designer-queries-2026-07-10.zip
  - gsc-runway-queries-2026-07-10.zip
  - gsc-stable-diffusion-queries-2026-07-10.zip
  - prod_check.html

required_checks:
  - npm run validate:task
  - npm run validate:data
  - npm run build
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "Official primary sources are actually checked for both tools."
  - "The exact official URLs and check date are recorded."
  - "Unsupported or outdated claims are corrected or marked unknown."
  - "lastReviewed reflects the actual verification date."
  - "nextReviewDue follows the repository's existing review cadence."
  - "pricingSourceNote accurately describes what was confirmed and what remains uncertain."
  - "sources/sourceRefs contain no unsupported or duplicate entry."
  - "npm run validate:data reports Errors: 0 and Warnings: 0."
  - "No unrelated tool files change."
  - "No validator or schema changes."
  - "Build succeeds."
  - "Scope validation succeeds."
  - "No secret or credential is used."

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

Clipdrop・Gemini画像生成の公式一次情報を実際に再確認し、review-overdue WARNING 2件を解消する。

## Background

validate:dataがnextReviewDue超過を検出。両ファイルとも前回確認以降、機械的な日付更新は行っていない。

## Implementation Notes

- WebFetchで公式ページを実際に取得・確認する。
- 確認不能・地域差・動的表示等で確定できない項目はunknownまたは既存記述を維持し、confirmedとしない。

## Result

PASS

## Summary

Clipdrop・Gemini画像生成の公式一次情報をWebFetchで実際に再確認し、review-overdue WARNING 2件を解消（Warnings: 0達成）。日付のみの機械的更新ではなく、確認できた事実・確認不能事項を区別して記録。

## Verification Records

### Clipdrop（src/content/tools/clipdrop.md）

- verification_date: 2026-07-26
- checked_official_urls:
  - https://clipdrop.co/pricing
  - https://clipdrop.co/
  - https://clipdrop.co/terms-visitor（アクセス試行したがナビゲーション/フッターのみ取得、本文条項は取得不能）
- confirmed_items:
  - Free枠の利用上限（Background Removal・Upscaler x2・Cleanup・Relightが20回/24時間、Text Removerが50回/24時間）は変更なし
  - Proプラン料金は引き続き「--per month」表示で非開示
  - 運営体制（InitML → Stability AI買収2023年2月 → Jasper.ai移管2024年2月）は既存記述と一致、変更なし
  - APIの提供継続を確認
- changed_items:
  - lastReviewed: "2026-06-21" → "2026-07-26"（実確認日）
  - nextReviewDue: "2026-07-21" → "2026-08-25"（既存30日サイクルを踏襲）
  - verifiedAt: "2026-06-08" → "2026-07-26"
  - reviewed.pricing: "2026-06-21" → "2026-07-26"
  - reviewed.features: "2026-06-06" → "2026-07-26"
  - pricingSourceNote: 再確認日・Free上限変更なしの旨・text-to-image表記の不一致を追記
  - freePlanNote: 公式料金表のFreeプラン列に"Text to image"の記載がある旨を追記し、既存の「管理者環境では有料版でのみ利用可能」という過去の実地確認結果と表記が一致しない状態であることを明記（どちらかを断定せず両論併記）
  - japanBilling.pricingCheckedAt: "2026-07-13" → "2026-07-26"
  - japanBilling.pricingNote: 運営体制の再確認日を追記
  - needsReview: 新規追加（"yes"） — text-to-image無料提供の実挙動差異が未解決のため
- unchanged_items: commercialUse（"unknown"のまま。利用規約本文が動的表示のため今回も本文条項を取得できず、断定不可）、japaneseUi、japanesePrompt、watermark、officialUrl、affiliateUrl、sources、reviewed.terms（terms本文未取得のため変更なし）
- unresolved_items: 公式料金表のFree列に "Text to image" の記載があるが、実際のアカウントレベルでのアクセス可否は今回未検証。過去の管理者環境での確認結果（有料版限定）との整合性が取れていない。needsReview="yes"として次回のハンズオン再確認候補とした。
- inaccessible_pages: https://clipdrop.co/terms-visitor（本文条項が動的レンダリングのため取得不能。フッターナビゲーションのみ取得）

### Gemini画像生成（src/content/tools/gemini-image-generation.md）

- verification_date: 2026-07-26
- checked_official_urls:
  - https://gemini.google/jp/subscriptions/
  - https://gemini.google/jp/overview/image-generation/?hl=ja-JP
- confirmed_items:
  - プラン名称は現在も「Google AI Plus / Pro / Ultra」（"Google One AI Premium"という名称は現行ページに見当たらず、既存の要確認扱いを解消）
  - 価格: Free ¥0/月、Plus ¥725/月、Pro ¥2,900/月、Ultra ¥14,500/月（5倍上限）または¥32,000/月（20倍上限）
  - 画像生成関連機能はGoogle Flowクレジット制（Plus:200／Pro:1,000／Ultra:10,000または25,000）で上限が拡張される仕組みを確認
  - SynthID（不可視・可視の両透かし）の使用を継続確認、既存watermarkCondition記述と一致
  - 日本語UI・日本語プロンプト対応を継続確認
- changed_items:
  - lastReviewed: "2026-06-13" → "2026-07-26"
  - nextReviewDue: "2026-07-13" → "2026-08-25"
  - verifiedAt: "2026-06-13" → "2026-07-26"
  - pricingSourceUrl: "https://gemini.google.com/advanced?hl=ja" → "https://gemini.google/jp/subscriptions/"（実際に料金確認に使った公式ページへ更新）
  - pricingSourceNote: プラン名称・価格を確定情報として更新（「要確認」の表現を解消）
  - pricingStatus: "partial" → "confirmed"
  - freePlanNote: Free ¥0/月であることを追記
  - paidPlanNote: 確認済みの価格・Google Flowクレジット数を具体的に追記
  - reviewed.pricing: "2026-05-15" → "2026-07-26"
  - reviewed.features: "2026-05-15" → "2026-07-26"
  - japanBilling.pricingCheckedAt: "2026-07-13" → "2026-07-26"
  - japanBilling.pricingNote: Ultra価格（¥14,500/¥32,000）を追記
- unchanged_items: commercialUse（"limited"のまま。商用利用条件の公式ページは今回未取得のため未変更）、japaneseUi、japanesePrompt、watermark、officialUrl、reviewed.terms（利用ポリシー本文は今回未取得のため変更なし）
- unresolved_items: なし（今回の確認範囲では新たな不明点は残らなかった）
- inaccessible_pages: なし（対象2ページとも取得成功）

## Verification Result

- Clipdrop: PARTIALLY_CONFIRMED（料金・Free上限・運営体制は確認できたが、text-to-image無料提供の実挙動は確認不能のためneedsReview="yes"を維持）
- Gemini画像生成: CONFIRMED_WITH_DATA_UPDATE（価格・プラン名称・クレジット制を確定情報として更新）

## Changed Files

- src/content/tools/clipdrop.md
- src/content/tools/gemini-image-generation.md
- docs/tasks/active/verify-review-overdue-clipdrop-gemini.md → docs/tasks/completed/2026-07-26-verify-review-overdue-clipdrop-gemini.md（移動）
- docs/tasks/LATEST.md（更新）

## Checks

- task validation: PASS
- build: PASS（92ページ）
- diff check: PASS
- scope validation: PASS
- data quality (validate:data): PASS（Errors: 0, Warnings: 0, Verify: 0, Files checked: 29）
- publish check: NOT_REQUIRED
- preview: NOT_REQUIRED
- GitHub Actions: 変更なし

## Git

- branch: master
- commit: (push後に確定、GIT欄で報告)
- push: 実施予定
- origin sync: 実装完了時点 SYNCED (HEAD a121892)
- working tree: clipdrop.md、gemini-image-generation.md、タスク運用ファイルのみ変更

## Production

- state: NOT_DEPLOYED
- checked URLs: なし（本番未確認）

## Decisions

- scripts/validate-data.mjs、src/content/config.tsは無変更。他ツールファイルも無変更。
- Clipdropのtext-to-image無料提供に関する表記不一致は、どちらか一方を断定せず両論併記し、needsReview="yes"として次回のハンズオン再確認候補に残した（未確認情報の推測を避けるため）。

## LATEST Update

docs/tasks/LATEST.mdを事実ベースで更新済み（本コミットに含む）。

## Next

Implement validate:publish for generated dist HTML.

---
生ログ全文は保存していない。
