---
task_id: "2026-10-31-gpt-creative-audit"
created_at: "2026-10-31"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "GPT監査で公開ページに確認されたPixVerseとHailuo AIのHTMLタグ露出を、専用ページの表示用プレーンテキストに限定して修正し、監査記録を残す。"

non_goals:
  - "料金・商用利用・モデルなどの事実変更"
  - "CTA、外部URL、アフィリエイト設定、DBスキーマの変更"
  - "本番デプロイ"
  - "未接続GSCやGA4実データの推測"

target_files:
  - docs/tasks/active/2026-10-31-gpt-creative-audit.md
  - docs/audits/gpt-creative-2026-10-31.md
  - src/pages/tools/pixverse/index.astro
  - src/pages/tools/hailuo-ai/index.astro

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - src/components/ToolDetailPage.astro
  - docs/tasks/completed/2026-10-18-invideo-lead-html-tags.md

unknowns:
  - "実ブラウザと本番表示の再確認は未実施"
  - "GSC/GA4の最新実測取得権限が現チャットで利用不可"

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "プレーンテキストとして描画される6箇所から<b>と</b>の文字が消える"
  - "set:htmlで意図的に利用するHTMLタグはそのまま維持"
  - "既存URL・PR表記・CTA・価格・商用条件・構造化データは不変"
  - "監査記録に実測不在と優先課題が記載されている"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

公開ページ https://aicreative-db.com/tools/pixverse/ および
https://aicreative-db.com/tools/hailuo-ai/ のリード、基本情報サマリー、商用利用リードで
文字列としての `<b>` / `</b>` 露出を確認。共通ToolDetailPageはこれらをプレーンテキストとして描画する。
既存のInVideo同種修正を参照する。

## Implementation Notes

対象の3箇所/ページのみHTML装飾タグを削除。
`set:html` に渡されるabout/useCases等の装飾タグには触れない。
本チャットからはローカルCLIと本番デプロイを実行していないため、
Claude Codeでrequired_checks・プレビュー・差分レビューを行ってから完了判断する。

## Result Schema

RESULT: HOLD（変更はPRでレビュー待ち、ローカル検証未実施）

CHANGED_FILES:
- docs/tasks/active/2026-10-31-gpt-creative-audit.md
- docs/audits/gpt-creative-2026-10-31.md
- src/pages/tools/pixverse/index.astro
- src/pages/tools/hailuo-ai/index.astro

CHECKS:
- task_validation: NOT_RUN
- build: NOT_RUN
- diff_check: NOT_RUN
- scope_validation: NOT_RUN
- data_quality: NOT_RUN
- publish_check: NOT_RUN
- preview: NOT_RUN
- github_actions: TO_VERIFY

GIT:
- commit: review branch
- push: GitHub connector branch writes
- origin_sync: NOT_VERIFIED

PRODUCTION: NOT_DEPLOYED
LATEST_UPDATED: no（承認・検証後に更新）
NEXT: Claude Codeで検証し、問題なければ完了タスクへ移動・LATEST更新して人間レビュー
