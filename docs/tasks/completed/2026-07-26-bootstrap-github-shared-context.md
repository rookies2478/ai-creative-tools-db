---
task_id: "bootstrap-github-shared-context"
created_at: "2026-07-26"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "AIクリエイティブナビに、GitHub共有コンテキスト・構造化タスク・task validation・scope validation・build専用GitHub Actionsを導入する。"

non_goals:
  - "src配下の変更"
  - "DB品質検証の新規実装"
  - "Pre-Publish Checkの新規実装"
  - "GSC取得処理の変更"
  - "Clarity取得処理の変更"
  - "rawローテーションの実装"
  - "Credential Managerの設定"
  - "認証情報の変更"
  - "本番反映"
  - "旧Wordファイルの削除（削除は commit bfe7840 で完了済み）"
  - "サイトコンテンツの変更"

target_files:
  - CLAUDE.md
  - README.md
  - package.json
  - .gitignore
  - .github/workflows/build.yml
  - scripts/validate-task.mjs
  - scripts/validate-scope.mjs
  - docs/tasks/TEMPLATE.md
  - docs/tasks/COMPLETED_TEMPLATE.md
  - docs/tasks/LATEST.md
  - docs/tasks/active/README.md
  - docs/tasks/completed/README.md
  - docs/tasks/active/bootstrap-github-shared-context.md
  - docs/tasks/completed/*.md
  - docs/decisions/README.md
  - docs/decisions/current-governance-documents.md
  - docs/operations/README.md

reference_files:
  - docs/tasks/LATEST.md

unknowns: []

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
  - npm run build
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "Formal documents are identified as Plan Ver2.0 and Operations Ver4.0."
  - "CLAUDE.md contains the minimal persistent safety rules and fixed result schema."
  - "Exactly one active task is detected."
  - "npm run validate:task passes."
  - "npm run build passes."
  - "git diff --check passes."
  - "npm run validate:scope passes."
  - "No src file changes."
  - "No secret, ZIP, raw analytics file, build output, or prod_check.html is committed."
  - "GitHub Actions performs build verification only and does not deploy."
  - "A completed task record and fact-based LATEST.md are saved before commit."

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

GitHub共有コンテキスト・構造化タスク・scope validationの運用基盤を導入する。

## Background

正式方針：計画書Ver2.0（方針判断）／運用ルールVer4.0（作業手順）。旧計画書v1.1・旧運用ルールVer3.7相当のWordファイルは commit bfe7840 で削除済み（ユーザー確認済み、本タスクの対象外）。

## Implementation Notes

- 事前監査時点：docs/tasks, docs/decisions, docs/operations, CLAUDE.md, README.md, .nvmrc, .github/workflows は全て未存在。
- .nvmrc無し、package.jsonにenginesフィールド無し。ローカルNode実態(v24)に基づきpackage.jsonにenginesを追加し、workflowはnode-version-file: package.jsonを使用。
- bootstrap特例につき、validate-task.mjs実装前にactive task作成 → 実装後に検証、の順で進める。

## Result

PASS

## Summary

GitHub共有コンテキスト・構造化タスク・task/scope validation・build専用GitHub Actionsを導入。src・DB・比較ロジック・本番環境は無変更。

## Changed Files

count: 12
- .gitignore
- package.json
- .github/workflows/build.yml
- CLAUDE.md
- README.md
- scripts/validate-task.mjs
- scripts/validate-scope.mjs
- docs/tasks/TEMPLATE.md
- docs/tasks/COMPLETED_TEMPLATE.md
- docs/tasks/LATEST.md
- docs/tasks/active/README.md
- docs/tasks/completed/README.md
- docs/tasks/completed/2026-07-26-bootstrap-github-shared-context.md（本ファイル、active→completed移動）
- docs/decisions/README.md
- docs/decisions/current-governance-documents.md
- docs/operations/README.md

## Checks

- task validation: PASS
- build: PASS (92 pages)
- diff check: PASS
- scope validation: PASS
- data quality: NOT_REQUIRED
- publish check: NOT_REQUIRED
- preview: NOT_REQUIRED
- GitHub Actions: NEEDS_VERIFICATION（push後にActions実行結果を確認）

## Git

- branch: master
- commit: (push後に確定、次コミットで報告)
- push: 実施予定
- origin sync: push前時点 SYNCED (HEAD bfe7840)
- working tree: 許可範囲内のファイルのみ変更、preexisting_untracked_filesは無変更

## Production

- state: NOT_DEPLOYED
- checked URLs: なし（本番未確認・未反映）

## Decisions

- 計画書Ver2.0・運用ルールVer4.0を正式版として識別（docs/decisions/current-governance-documents.md）。

## LATEST Update

docs/tasks/LATEST.mdを事実ベースで更新済み（本コミットに含む）。

## Next

Audit existing Data Quality Check and Pre-Publish Check implementations before adding validate:data and validate:publish.

---
生ログ全文は保存していない。
