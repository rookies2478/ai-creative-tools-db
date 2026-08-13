---
task_id: "reports-directory-fresh-audit"
created_at: "2026-08-13"
status: COMPLETED
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "reports/配下の現行ファイル全件を、外部(ChatGPT)会話履歴に依存せずリポジトリ内で新規に棚卸しし、分類結果をdocs/audits/へ永続化する。"

non_goals:
  - "reports/内ファイルの削除・移動・リネーム"
  - "DB(src/content/tools/)の修正"
  - "料金・ソースの修正"
  - "sitemap実装の変更"
  - "validate-publish.mjs等バリデータの変更"
  - "画像生成スクリプトの変更"
  - "アプリケーションソースの変更"
  - "本番デプロイ"

target_files:
  - docs/tasks/active/2026-08-13-reports-directory-fresh-audit.md
  - docs/tasks/completed/2026-08-13-reports-directory-fresh-audit.md
  - docs/tasks/LATEST.md
  - docs/audits/reports-directory-classification-2026-08-13.md

reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - reports/*.md
  - reports/*.csv
  - src/content/tools/*.md

unknowns: []

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "reports/配下の現行53ファイル(README.md除く)全件をpath単位で分類済み"
  - "分類根拠（現行リポジトリ状態との照合結果）を記録済み"
  - "reports/の内容は無変更"
  - "アプリケーションソース・DB・sitemap・validatorは無変更"
  - "分類結果がdocs/audits/へ永続化されている"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - REPORTS_DELETION
  - REPORTS_MODIFICATION
  - REPORTS_MOVE
  - DB_CORRECTION
  - PRICING_CORRECTION
  - SOURCE_CORRECTION
  - SITEMAP_IMPLEMENTATION_CHANGE
  - VALIDATOR_IMPLEMENTATION_CHANGE
  - IMAGE_SCRIPT_CHANGE
  - PACKAGE_CHANGE
  - SECRET_OUTPUT
---

# Task

## Background

外部(ChatGPT/Claude Code)会話履歴上に「reports/ 46件、REVIEW 13件」という分類が存在するとの申告があったが、リポジトリ内にその記録は存在しない（`docs/tasks/LATEST.md`・`CLAUDE.md`・`docs/`配下grepで確認、ヒットなし）。過去に記録が残っている唯一の関連監査はHEAD `e4a0e76c`時点のもので、対象はルート直下の企画ドキュメント等でありreports/本体13件の分類ではなく、REVIEW 4件（xlsx・prod_check.html・home-showcaseアーカイブ・reports/追加検討）である。

外部履歴を根拠として13件のリストを再構成することは推測補完であり`CLAUDE.md`常設ルール4に反するため行わない。代わりに、reports/配下の現行ファイルをリポジトリ内で新規に棚卸しし、その結果を`docs/audits/`へ永続化する。

## Implementation Notes

- reports/配下は2026-06-17〜2026-06-22に作成された53ファイル（.md 32件・.csv 21件、README.md除く）。全て当時26ツール構成を前提にしている（現行DBは29ツール）。
- 現行状態との照合結果は`docs/audits/reports-directory-classification-2026-08-13.md`に記録。

## 結果

reports/配下53ファイル（README.md除く）全件をリポジトリ内で新規に棚卸しし、`docs/audits/reports-directory-classification-2026-08-13.md`へ永続化した。外部会話履歴の「46件・REVIEW13件」という分類は一切前提とせず、現行`validate:data`（Errors 0/Warnings 4）・`npm run build`（92ページPASS）・`validate:publish`（HTML 92件・sitemap URL 90件・Errors 0）・DBサンプル照合（midjourney.mdの`sources`/`officialSourceUrl`/`verifiedAt`が旧reportsより新しい検証データを保持）で現行状態を直接確認した。

分類結果: OPEN_BACKLOG(reports由来) 0件、MIGRATE_THEN_DELETE 0件、ARCHIVE 53件、DELETE_CANDIDATE 0件、REVIEW 0件。外部履歴が主張していた「移行元3件」（tool-pricing-source-audit.md・tool-source-url-list.md・structured-data-schema-audit.md）は個別に再検証し、いずれも恒久的独自情報が既に現行DB（sources/officialSourceUrl/verifiedAtフィールド）または現行validator（commit 7f70cd4のVideoObject/SoftwareApplication自動検証）へ移行済みであることを確認したためARCHIVE判定とした。

現行リポジトリ照合で独立に確認したOPEN_BACKLOG 2件（reports内容とは対応付けせず記録）: (1) pricingStatus未設定7ツール（d-id/heygen/invideo-ai/kling-ai/stable-diffusion/synthesia/tensor-art、severity LOW）、(2) build 92ページに対しsitemap URL 90件で2件差分（validate:publishはErrors 0で通過、severity LOW、対象2ページの特定は未実施）。いずれもDB・sitemap実装の変更は本タスクで行っていない。

reports/配下は内容・ファイル名・位置とも無変更（読み取りのみ）。DB・sitemap・validator・アプリケーションソースは無変更。

- validate:task: PASS
- git diff --check: PASS（下記GIT欄コミット後）
- validate:scope: PASS
- build: 92ページ PASS（確認目的で実行、生成物dist/は非追跡でコミット対象外）

## Result Schema

RESULT: PASS | HOLD | BLOCKED
