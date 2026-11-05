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
goal: "AI画像・動画生成の新規6サービスと関連する比較記事3本を、既存の編集方針とSEO構造を維持して追加する"
non_goals:
  - 既存のDBスキーマや計測設定の変更
  - 実機未確認サンプルの掲載
  - 既存DALL-Eレガシー記事の改訂
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
  - 各ツールの公式URL、公式ソースと確認日を記録する
  - 6件のツールと3件の比較記事の重複がない
  - 未確認の価格・権利・透かし・日本語対応は断定しない
  - 比較ハブから3記事を発見できる
  - 本番反映しない
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# 2026-11 AI creative editorial expansion

## Background
GitHub Issue #55。32件掲載のAIクリエイティブナビに、画像・動画生成の新規6サービスと比較記事3本を追加する。実機での生成作例や検索順位実績を装わず、公式URLと情報不確実性を明示する。

## Implementation Notes
DBの正本 src/content/tools/*.md と、既存汎用ツールページおよび ComparisonVsArticle コンポーネントを再利用。ツール情報は保守的にunknownを設定する。比較ハブへのリンク追加を行う。既存アフィリエイト・計測・公開設定は変更しない。

## Result Schema
RESULT: PASS | HOLD | BLOCKED
