---
task_id: "2026-11-28-seedream-seedance-toc-official-99"
created_at: "2026-11-28"
status: DONE
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

## Result

PASS（ローカルのみ）。未push・PR未作成・本番未反映。実機QAはHOLD。

## Summary

seedream-vs-seedance 記事に、目次（本文7見出し+FAQの8項目、ページ内リンク）と「まず確認する公式情報3点」を追加。3点は既存sourcesのURLのみ（Dreamina料金・プラン / Runway Dev公式料金・課金式 / Runway Dev公式 商用利用ガイド）。Dreamina規約の地域差は対象外のため、規約URLは下部の出典欄の案内に留めた。ComparisonVsArticle に任意プロパティ tocItems / officialChecks を追加（未指定なら出力なし）。

## Changed Files

- src/components/ComparisonVsArticle.astro
- src/pages/comparisons/seedream-vs-seedance/index.astro
- docs/tasks/completed/2026-11-28-seedream-seedance-toc-official-99.md
- docs/tasks/completed/2026-11-26-header-overflow-360.md（#101で完了済みの古いactiveを退避）
- docs/tasks/LATEST.md（参照更新）

## Checks

validate:task PASS / validate:scope PASS / build PASS（警告0）/ git diff --check PASS / validate:data exit 0 / validate:publish exit 0（警告4は未変更ページ、既存）/ validate:affiliate-links PASS / qa-changed-pages 18ページ・90ブラウザケース PASS（320/360/390/768/1440）/ test-page-overflow comparisons 21ページ×9幅 PASS。
ビルド成果物差分: seedream-vs-seedance は追加のみ（削除0行、title/description/canonical/JSON-LD/料金/アフィリエイト不変）。他の比較ページは本文同一（HTMLコメント1行とscoped CSSのみ）。
新ブロック実測: リンク高さ44px、アンカー8件すべて解決、全幅で横溢れなし。
最終CSS調整（リンク色・下線のみ）後は build・qa-changed-pages・validate 系を再実行しPASS。test-page-overflow は色変更のみのため再実行していない。
Evidence: C:/dev/movance-qa-evidence/ai-creative-tools-db-99-20261128
