---
task_id: "2026-11-06-creative-expansion"
created_at: "2026-11-06"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: true
official_verification_required: true
goal: "既存32ツールの日本向け公式サイト・料金・商用利用・日本語対応を比較監査し、裏付けのある不一致を修正して監査結果を残す"
non_goals:
  - 既存サイトのURL・スラッグ変更、スキーマ変更
  - 実機未検証なのに操作画面の完全な日本語対応を主張すること
  - アフィリエイト・GA4・Clarity・公開設定変更
target_files:
  - docs/tasks/active/2026-11-06-creative-expansion.md
  - src/content/tools/dreamina.md
  - src/content/tools/google-flow.md
  - src/content/tools/krea-ai.md
  - src/content/tools/higgsfield-ai.md
  - src/content/tools/openart.md
  - src/content/tools/magnific.md
  - src/pages/comparisons/chatgpt-image-vs-gemini-image/index.astro
  - src/pages/comparisons/google-flow-vs-kling-ai/index.astro
  - src/pages/comparisons/seedream-vs-seedance/index.astro
  - src/components/ComparisonHub.astro
  - src/pages/sitemap.xml.ts
  - src/content/tools/dalle.md
  - src/content/tools/dreamstudio.md
  - src/content/tools/creatify.md
  - src/content/tools/synthesia.md
  - src/content/tools/heygen.md
  - src/content/tools/vidu-ai.md
  - src/content/tools/capcut-ai.md
  - src/pages/tools/dalle/index.astro
  - src/pages/tools/dreamstudio/index.astro
  - src/pages/tools/synthesia/index.astro
  - src/pages/tools/heygen/index.astro
  - docs/audits/existing-tools-jp-official-audit-2026-11-06.md
reference_files:
  - docs/tasks/LATEST.md
  - docs/tasks/TEMPLATE.md
  - docs/decisions/current-governance-documents.md
  - src/content/config.ts
  - src/components/ComparisonVsArticle.astro
  - src/pages/tools/[slug].astro
unknowns:
  - 公式画面での確定利用可能料金と付与クレジット
  - 生成物の各国・プラン別商用利用条件
  - 実際の生成品質と日本語対応
preexisting_untracked_files: []
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - git diff --check
  - npm run validate:scope
acceptance_criteria:
  - 既存32件すべてを公式情報照合の監査台帳へ記録（検証不能事項は理由付きで保留）
  - DALL-E提供終了やBrand Studio料金など根拠確定の重要不一致を改訂する
  - 日本語公式ページとUIの日本語化を混同しない
  - 専用Astroページに残るハードコードの不一致も修正する
  - ビルド・データ・公開HTML品質チェックが通る
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# 2026-11 AI creative editorial expansion

## Background
GitHub Issue #55。32件掲載のAIクリエイティブナビに、画像・動画生成の新規6サービスと比較記事3本を追加する。実機での生成作例や検索順位実績を装わず、公式URLと情報不確実性を明示する。

## Implementation Notes
Issue #61: 2026-11-06の日本向け公式情報横断監査。既存32件全ての公式ページ・DB・専用ページを分類し、客観的に判明した差分のみ修正。日本語公式ページが存在しないサービスには架空のローカライズ情報を記載しない。

Issue #59: 日本語公式サイトを照合し、具体的な記載が既にある情報をunknownのままにしない。既存6件の正本のみ編集し、global schemaやaffiliate/analyticsは変更しない。

2026-11-06 user request follow-up: 11/06の公開後に、公式規約および一次情報を調査して正本DBのunknownを更新する継続タスク。調査は公開範囲のみであり、ログインが必要な個別契約条件は確認できない。URL/DB schema変更なし。

DBの正本 src/content/tools/*.md と、既存汎用ツールページおよび ComparisonVsArticle コンポーネントを再利用。ツール情報は保守的にunknownを設定する。比較ハブへのリンク追加を行う。既存アフィリエイト・計測・公開設定は変更しない。

## Result Schema
RESULT: PASS | HOLD | BLOCKED
