---
task_id: "create-analytics-storage-foundation"
created_at: "2026-07-26"
status: DONE
completed_at: "2026-07-26"
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Create the repository structure and documentation templates for GSC and Clarity analytics runs without implementing acquisition, credentials, or retention automation."

non_goals:
  - GSC API取得
  - Clarity API取得
  - OAuth
  - service account
  - token保存
  - Credential Manager連携
  - .env作成
  - rawデータ保存
  - rawデータ削除
  - rotationスクリプト
  - package.json変更
  - npm script追加
  - GitHub Actions変更
  - validator変更
  - sitemap変更
  - ページ変更
  - DB変更
  - 本番反映

target_files:
  - docs/analytics/README.md
  - docs/analytics/gsc/README.md
  - docs/analytics/gsc/templates/manifest.template.json
  - docs/analytics/gsc/templates/analysis-summary.template.md
  - docs/analytics/clarity/README.md
  - docs/analytics/clarity/templates/manifest.template.json
  - docs/analytics/clarity/templates/analysis-summary.template.md
  - docs/tasks/active/create-analytics-storage-foundation.md
  - docs/tasks/completed/2026-07-26-create-analytics-storage-foundation.md
  - docs/tasks/LATEST.md

reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - .gitignore
  - docs/seo-monitoring.md
  - docs/gsc-resubmission-log-2026-05-24.md

unknowns:
  - Acquisition method will be defined in a later task.
  - Credential storage will be defined in a later task.
  - Retention and rotation implementation will be defined in a later task.
  - Clarity may remain MCP/manual-export based initially.

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
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - docs/analytics/ exists with documented GSC and Clarity structures.
  - Raw directories are defined but raw data is not committed.
  - Manifest templates are valid JSON.
  - Analysis summary templates contain all required governance fields.
  - Latest-success identification is documented.
  - Failed runs and partial runs are distinguishable.
  - No API, credentials, token, secret, or external network implementation is added.
  - No page, DB, route, validator, or sitemap change.
  - Build and validators pass.
  - Scope validation passes.

forbidden_operations:
  - PRODUCTION_DEPLOY
  - EXTERNAL_NETWORK
  - SECRET_ACCESS
---

# Task

## Background

GSC・Clarity分析の保存と引き継ぎを標準化するため、docs/analytics/配下にGSC/Clarity両方の保存構造・manifestテンプレート・分析要約テンプレート・READMEを新規作成する。取得スクリプトや認証は本タスクの対象外。

## Result Schema

```
RESULT: PASS | HOLD | BLOCKED

SUMMARY:
1-3 lines

CHANGED_FILES:
count and paths

CHECKS:
- task_validation:
- build:
- diff_check:
- scope_validation:
- data_quality:
- publish_check:

GIT:
- commit:
- push:
- origin_sync:

PRODUCTION:
NOT_DEPLOYED | DEPLOYED | NEEDS_VERIFICATION

LATEST_UPDATED:
yes | no

NEXT:
one concrete next action
```

## Result

- created_structure: docs/analytics/README.md, docs/analytics/gsc/README.md, docs/analytics/clarity/README.md を新規作成。実データ日付ディレクトリ・rawディレクトリ・.gitkeepは作成せず。
- manifest_templates: docs/analytics/gsc/templates/manifest.template.json（8 datasets定義）、docs/analytics/clarity/templates/manifest.template.json（5 datasets + privacy初期値定義）。両方JSON parse検証PASS。secret/token/credential項目なし。
- analysis_templates: docs/analytics/gsc/templates/analysis-summary.template.md、docs/analytics/clarity/templates/analysis-summary.template.md を新規作成。指定frontmatter・セクション構成をすべて反映。
- raw_tracking_policy: `.gitignore`に`docs/analytics/gsc/**/raw/`・`docs/analytics/clarity/**/raw/`が既存済みのため変更なし。
- latest_success_rule: docs/analytics/README.mdに、status=success かつ completed_at存在 かつ required_datasets全present かつ validation.errors=0 を条件として記載。同日複数runはcompleted_at最新を採用、failed/partialは対象外と明記。symlinkは作成せず。
- secret_handling: manifestテンプレート・READMEともtoken/cookie/credential/session identifierを含めていないことを確認。
- changed_files: 10件（docs/analytics/README.md, docs/analytics/gsc/README.md, docs/analytics/gsc/templates/manifest.template.json, docs/analytics/gsc/templates/analysis-summary.template.md, docs/analytics/clarity/README.md, docs/analytics/clarity/templates/manifest.template.json, docs/analytics/clarity/templates/analysis-summary.template.md, docs/tasks/active/create-analytics-storage-foundation.md→削除, docs/tasks/completed/2026-07-26-create-analytics-storage-foundation.md, docs/tasks/LATEST.md）
- checks: validate:task PASS / validate:data PASS（Files 29, Errors 0, Warnings 0, Verify 0）/ build PASS（92ページ）/ validate:publish PASS（Errors 0, Warnings 4、既存long-meta-descriptionのみ、新規違反なし）/ git diff --check PASS / validate:scope PASS
- git: commit・push未実行時点でこのファイルを作成。実SHAはGIT欄で別途確定する。
- production: NOT_DEPLOYED
- unresolved: GSC/Clarityの取得方式（manual/API/MCP）、認証情報の保存方式、raw rotationの実装は本タスク非対象のため未定義のまま。
- next: Define GSC acquisition method and input contract.
