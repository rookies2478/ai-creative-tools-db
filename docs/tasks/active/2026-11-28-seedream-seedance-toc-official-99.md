---
task_id: "2026-11-28-seedream-seedance-toc-official-99"
created_at: "2026-11-28"
status: READY
risk: LOW
current_phase: editorial-ui
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "Issue #99 の未完了項目のうち、seedream-vs-seedance 記事の目次と『まず確認する公式情報3点』の表示だけを、既存の出典URLと既存比較テンプレートの任意プロパティで追加する。"

non_goals:
  - "title・description・料金・規約・アフィリエイトリンクを変更しない"
  - "公式料金CTAボタン・Dreamina規約の地域差・四半期/税込別/決済通貨/バナー期限の追加をしない"
  - "新しい外部URL・新しい事実を追加しない（既存sourcesのURLのみ使う）"
  - "他の比較記事の表示を変えない（新プロパティは任意・未指定なら出力なし）"
  - "有料画像・動画生成をしない"

target_files:
  - src/components/ComparisonVsArticle.astro
  - src/pages/comparisons/seedream-vs-seedance/index.astro
  - docs/tasks/active/2026-11-28-seedream-seedance-toc-official-99.md
  - docs/tasks/completed/2026-11-28-seedream-seedance-toc-official-99.md
  - docs/tasks/completed/2026-11-26-header-overflow-360.md
  - docs/tasks/active/2026-11-26-header-overflow-360.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md

unknowns:
  - "実機（iOS Safari / Android Chrome）での表示: HOLD"

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run build
  - git diff --check
  - npm run validate:scope
  - node scripts/test-page-overflow.mjs
  - node scripts/qa-changed-pages.mjs
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links

acceptance_criteria:
  - "seedream-vs-seedance に目次（本文7見出しへのページ内リンク）と『まず確認する公式情報3点』が表示され、リンク先は既存sourcesのURLのみ"
  - "title/description/canonical/JSON-LD・料金表記・アフィリエイトリンクはビルド成果物で不変"
  - "他の比較記事のHTMLはビルド前後で同一"
  - "320/360/390/768/1440pxで横溢れなし、タップ領域44px以上"
  - "必須チェックPASS、新規警告ゼロ"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - GIT_PUSH
---

# Task

## Background

Issue #99 残件。Dreamina料金・逆リンクは PR #101 で対応済み。stale な active タスク（#101で完了済みの 2026-11-26-header-overflow-360）は completed へ退避（validate:task が active 1件を要求するため）。
