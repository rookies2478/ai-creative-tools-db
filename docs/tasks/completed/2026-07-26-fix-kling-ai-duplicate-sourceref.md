---
task_id: "fix-kling-ai-duplicate-sourceref"
created_at: "2026-07-26"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: false
official_verification_required: false

goal: "Resolve the duplicate and mislabeled Kling AI source reference without changing unrelated tool data, validator rules, routes, or production systems."

non_goals:
  - "No Clipdrop or Gemini changes"
  - "No review date changes"
  - "No validator changes"
  - "No schema changes"
  - "No external verification"
  - "No production deployment"

target_files:
  - src/content/tools/kling-ai.md
  - docs/tasks/active/fix-kling-ai-duplicate-sourceref.md
  - docs/tasks/completed/*.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - scripts/validate-data.mjs
  - src/content/config.ts

unknowns:
  - "Whether sourceRefs[4] contains any unique metadata that must be preserved before deletion."

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
  - "The duplicate-source-url warning for kling-ai.md is resolved."
  - "sourceRefs[4] is removed or its unique information is merged into sourceRefs[1]."
  - "No useful source information is lost."
  - "npm run validate:data reports Errors: 0."
  - "npm run validate:data reports Warnings: 2."
  - "The remaining warnings are only review-overdue for clipdrop.md and gemini-image-generation.md."
  - "No other tool file changes."
  - "No validator or schema changes."
  - "Build succeeds."
  - "Scope validation succeeds."
  - "No external network or secret access."

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

kling-ai.mdのsourceRefs重複（https://kling.ai）を解消する。

## Background

前段の監査で、sourceRefs[4]（label: "Kling AI メンバーシッププラン（確認時点でHTTP 446により直接確認不可）"、url: "https://kling.ai"）がsourceRefs[0]（homepage）と同一URLで、意図としてはsourceRefs[1]（"https://kling.ai/membership/membership-plan"）と役割が重複していると判断された。

## Implementation Notes

- sourceRefs[4]を削除する前に、固有情報（label文言の"確認時点でHTTP 446により直接確認不可"という注記）がsourceRefs[1]に既に同等の記載として存在するか確認する。

## Result

PASS

## Summary

kling-ai.mdのsourceRefs[4]（ラベルは料金ページを示すがURLはhomepageと重複、かつsourceRefs[1]と役割重複）を削除。validate:dataのduplicate-source-url警告を解消。情報損失なし。

## Changed Files

- src/content/tools/kling-ai.md
- docs/tasks/active/fix-kling-ai-duplicate-sourceref.md → docs/tasks/completed/2026-07-26-fix-kling-ai-duplicate-sourceref.md（移動）
- docs/tasks/LATEST.md（更新）

## Source Ref Decision

- action: REMOVE_EXACT_DUPLICATE
- removed_entry: sourceRefs[4]（label: "Kling AI メンバーシッププラン（確認時点でHTTP 446により直接確認不可）", url: "https://kling.ai", type: official）
- preserved_entries: sourceRefs[0]（公式トップページ, https://kling.ai）、sourceRefs[1]（料金ページ, https://kling.ai/membership/membership-plan、同一の「確認時点でHTTP 446により直接確認不可」注記を既に保持）、sourceRefs[2]（ユーザーポリシー）、sourceRefs[3]（決済ポリシー）
- information_loss: なし。sourceRefs[4]のラベル・注記文言はsourceRefs[1]に既に同等の内容（料金ページ・HTTP 446注記）として存在しており、削除により失われる固有情報はない。
- rationale: sourceRefs[4]はURLがhomepageのままで、ラベルが示す「メンバーシッププラン」の実際のURL（/membership/membership-plan）はsourceRefs[1]に既に正しく登録済み。ページ（src/pages/tools/[slug].astro）はsourceRefsを個別クリック可能リンクとして描画するため、修正前は「メンバーシッププラン」をクリックしてもhomepageに遷移する不整合があった。外部再確認は不要、repository内情報のみで解決。

## Checks

- task validation: PASS
- build: PASS（92ページ）
- diff check: PASS
- scope validation: PASS
- data quality (validate:data): PASS（Errors: 0, Warnings: 2, Verify: 0, Files checked: 29。duplicate-source-url 0件）
- publish check: NOT_REQUIRED
- preview: NOT_REQUIRED
- GitHub Actions: 変更なし

## Git

- branch: master
- commit: (push後に確定、GIT欄で報告)
- push: 実施予定
- origin sync: 実装完了時点 SYNCED (HEAD b4242d2)
- working tree: kling-ai.mdとタスク運用ファイルのみ変更

## Production

- state: NOT_DEPLOYED
- checked URLs: なし

## Decisions

- scripts/validate-data.mjs、src/content/config.tsは無変更。他ツールファイルも無変更。

## LATEST Update

docs/tasks/LATEST.mdを事実ベースで更新済み（本コミットに含む）。

## Next

Verify overdue Clipdrop and Gemini tool data against official sources in a separate MEDIUM task.
（review-overdue×2: clipdrop.md, gemini-image-generation.mdが未解決のまま残存。外部公式確認を要するため、今回は意図的に対象外。）

---
生ログ全文は保存していない。
