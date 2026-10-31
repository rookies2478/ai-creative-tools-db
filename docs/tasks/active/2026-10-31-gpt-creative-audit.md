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

RESULT: PASS（ローカル検証完了。人間レビュー待ち）

SUMMARY:
PR #11の5箇所に加え、PRが見落としたHailuo AIのヒーローlead（plain描画）の`<b>`を追加修正。build後のdistで両ページの`&lt;b&gt;`は0件。

CHANGED_FILES:
- docs/tasks/active/2026-10-31-gpt-creative-audit.md
- docs/audits/gpt-creative-2026-10-31.md
- src/pages/tools/pixverse/index.astro
- src/pages/tools/hailuo-ai/index.astro（追加修正: hero lead）

CHECKS:
- task_validation: PASS
- build: PASS（95ページ）
- diff_check: PASS
- scope_validation: PASS
- data_quality: PASS（Errors 0 / Warnings 29）
- publish_check: PASS（Errors 0 / Warnings 4）
- affiliate_links: PASS
- preview: PASS（astro preview。PixVerse/Hailuo AIに`&lt;b&gt;`なし。set:html領域のbはHTMLとして維持）
- github_actions: TO_VERIFY

GIT:
- commit: local commit（pushは人間判断）
- push: NOT_DONE
- origin_sync: NOT_VERIFIED

PRODUCTION: NOT_DEPLOYED
LATEST_UPDATED: no（target_filesにLATEST.mdがないため未更新）
NEXT: 人間がPR #11をレビュー・merge後、GSC分析に基づく次タスクを起票する
