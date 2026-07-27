---
task_id: "align-gsc-manual-export-contract"
created_at: "2026-07-27"
status: DONE
completed_at: "2026-07-27"
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Align the GSC analytics documentation and manifest template with the actual Google Search Console UI ZIP export format while preserving future API compatibility."

non_goals:
  - ZIP展開処理
  - CSV読み込み処理
  - 文字コード変換
  - 日本語ファイル名変換
  - totals集計処理
  - manifest生成スクリプト
  - importer実装
  - GSC API実装
  - OAuth／service account
  - package.json変更
  - npm script追加
  - rawデータ作成
  - ZIP移動
  - .gitignore変更
  - Clarity設計変更
  - validator変更
  - GitHub Actions変更
  - 本番反映

target_files:
  - docs/analytics/gsc/README.md
  - docs/analytics/gsc/templates/manifest.template.json
  - docs/tasks/active/align-gsc-manual-export-contract.md
  - docs/tasks/completed/2026-07-27-align-gsc-manual-export-contract.md
  - docs/tasks/LATEST.md
  - docs/analytics/README.md

reference_files:
  - docs/analytics/README.md
  - docs/analytics/gsc/templates/analysis-summary.template.md
  - docs/decisions/current-governance-documents.md
  - .gitignore

unknowns:
  - Import and normalization implementation will be defined later.
  - GSC API acquisition may be added later.
  - Query-page cross aggregation is unavailable in the current UI export.
  - Sitemap data requires a separate source or later API implementation.
  - Export file names may be localized or misleading, so future import must use headers rather than names alone.

required_checks:
  - npm run validate:task
  - JSON parse check
  - npm run validate:data
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - Manual GSC UI export is documented as the current official acquisition method.
  - The contract reflects the actual ZIP contents.
  - Required and optional datasets are clearly distinguished.
  - Page-filtered and property-wide exports are distinguishable in the manifest.
  - Totals are documented as derived, not directly exported.
  - query-pages and sitemaps are optional or unavailable for manual export.
  - Localized file names are not treated as reliable dataset identifiers.
  - Manifest JSON remains valid.
  - No importer, API, credential, raw data, or runtime implementation is added.
  - All validators and build pass.

forbidden_operations:
  - PRODUCTION_DEPLOY
  - EXTERNAL_NETWORK
  - SECRET_ACCESS

preexisting_untracked_files:
  - aicreative-db.com-Performance-on-Search-2026-07-10.zip
  - gsc-fotor-ai-queries-2026-07-10.zip
  - gsc-kling-ai-queries-2026-07-10.zip
  - gsc-luma-ai-queries-2026-07-10.zip
  - gsc-microsoft-designer-queries-2026-07-10.zip
  - gsc-runway-queries-2026-07-10.zip
  - gsc-stable-diffusion-queries-2026-07-10.zip
  - prod_check.html
---

# Task

## Background

前回のaudit（create-analytics-storage-foundation完了後）で、docs/analytics/gsc/README.mdとmanifest.template.jsonが、API取得前提の8データセット構成であり、実際に運用中のGSC UI手動ZIPエクスポート（7ファイル・query-pages/sitemapsなし・totalsはderived）と一致していないことが判明した。本タスクではmanual-first / API-compatibleの設計方針に沿って、ドキュメントとJSONテンプレートのみを実態に合わせて改定する。

## Result Schema

```
RESULT: PASS | HOLD | BLOCKED

SUMMARY:
1-3 lines

CHANGED_FILES:
count and paths

CHECKS:
- task_validation:
- json_parse:
- validate_data:
- build:
- validate_publish:
- diff_check:
- scope_validation:

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

- decision: manual-first / API-compatible。現行の正式取得方式はGSC UI手動ZIPエクスポート、将来API移行時もmanifest_versionの1.x系のまま互換性を維持する方針をREADMEに明記。
- actual_zip_findings: 実測7ファイル構成（日次推移／クエリ／ページ／国／デバイス／検索での見え方／フィルタ）。ファイル名はローカライズ・文字化けにより信頼できず、ヘッダー（「日付」「上位のクエリ」等）で識別する方針を確定。
- required_datasets: daily, queries, pages, countries, devices, search-appearance, filters（7件、manual exportで常時取得可能なもの）
- optional_datasets: totals（derived）, query-pages（unavailable）, sitemaps（unavailable）
- derived_datasets: totals（dailyから正規化時に集計。sum(clicks)/sum(impressions)/CTR=合算比/positionはimpression加重平均の考え方をREADMEに記載。計算ロジック自体は未実装）
- scope_filters_added: manifestに`scope.type`（property|page）・`scope.page_url`、`filters`（search_type/page/query/country/device/search_appearance）を追加
- run_id_policy: `run-HHMMSS`はimporter実行時に採番する方針。ZIP内部mtimeやGSC画面操作時刻からは推測しない。`source_export_date`（ZIP名由来の日付のみ）と`imported_at`を区別して記録する構造をmanifestに追加
- header_first_policy: データセット識別優先順位（1.CSVヘッダー 2.フィルタCSV内容 3.ファイル名 4.ZIP内順序）をREADMEに明記。ファイル名は最も信頼度が低いと明記
- post_audit_fix: 独立監査で、旧版にあった保存先ディレクトリ構造（`docs/analytics/gsc/YYYY-MM-DD/raw/run-HHMMSS/`とGit管理範囲）の説明が改定時に削除されたまま補完されていないことが判明したため、README「実測済みGSC UI ZIP構造」節の直前に「保存先ディレクトリ構造」節を復元・追記した。
- changed_files: 3件（docs/analytics/gsc/README.md, docs/analytics/gsc/templates/manifest.template.json, docs/tasks/LATEST.md）+ task管理ファイル2件（active削除→completed作成）。docs/analytics/README.mdは既存のlatest-successルールと矛盾しないため変更不要と判断し無変更。
- checks: validate:task PASS / JSON parse PASS / validate:data PASS（Files 29, Errors 0, Warnings 0, Verify 0）/ build PASS（92ページ）/ validate:publish PASS（Errors 0, Warnings 4、新規違反なし）/ git diff --check PASS / validate:scope PASS
- git: commit・push未実行時点でこのファイルを作成。実SHAはGIT欄で別途確定する。
- production: NOT_DEPLOYED
- unresolved: importer実装・CSVパース処理・sha256計算・totals集計ロジック・GSC API取得は本タスク非対象のまま未実装。
- next: Implement a dry-run GSC manual ZIP importer and normalization plan.
