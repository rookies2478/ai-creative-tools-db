---
task_id: "implement-gsc-manual-zip-importer"
created_at: "2026-07-27"
status: DONE
completed_at: "2026-07-27"
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Implement a safe manual GSC ZIP importer that identifies localized CSV datasets by headers, supports dry-run and apply modes, writes the standardized raw run structure, derives totals, and generates a manifest without using credentials or external APIs."

non_goals:
  - GSC API
  - OAuth
  - service account
  - Credential Manager
  - Clarity importer
  - raw rotation
  - 古いraw削除
  - GitHub Actions変更
  - analysis-summary自動生成
  - SEO改善判断
  - Hailuo AI実機確認
  - DB変更
  - ページ変更
  - sitemap変更
  - 本番反映

target_files:
  - scripts/import-gsc-manual-export.mjs
  - scripts/gsc-import-lib.mjs
  - scripts/test-import-gsc-manual-export.mjs
  - package.json
  - docs/analytics/gsc/README.md
  - docs/tasks/active/implement-gsc-manual-zip-importer.md
  - docs/tasks/completed/2026-07-27-implement-gsc-manual-zip-importer.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/analytics/README.md
  - docs/analytics/gsc/templates/manifest.template.json
  - .gitignore
  - scripts/validate-data.mjs
  - scripts/validate-publish.mjs

unknowns:
  - localized header variantsの範囲（今回実測できたのは既存7ZIPのみ）
  - filters.csvの行構造差（ページ/クエリ/国/デバイス/検索での見え方の同時フィルタ組み合わせ実例は未確認）
  - 実データでのCTR表記が常に百分率文字列か（小数表記のケース有無）

required_checks:
  - npm run validate:task
  - node scripts/test-import-gsc-manual-export.mjs
  - npm run validate:data
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - Default mode is dry-run.
  - Source ZIP is never modified.
  - Dataset identification uses headers before filenames.
  - UTF-8 and UTF-8 BOM are supported; decode failure does not silently fall back.
  - Property and page scopes are distinguishable.
  - Required datasets are validated; query-pages/sitemaps are optional.
  - totals.csv is derived via impression-weighted calculation, not simple average.
  - Manifest follows the documented contract with no secrets or absolute paths.
  - Output raw path remains ignored by Git.
  - Existing site build and validators pass.
  - No external network access occurs.

forbidden_operations:
  - PRODUCTION_DEPLOY
  - SECRET_ACCESS
  - EXTERNAL_NETWORK
  - RAW_DELETE

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

manual-first / API-compatible契約（align-gsc-manual-export-contract, commit ff73fe6）で定義したGSC手動ZIPエクスポートのraw構造・manifest契約を、実際に読み取り検査してdry-run/apply変換するimporterとして実装する。既存依存（Node標準機能のみ、zlib/crypto/fs）で完結させ、新規npm依存は追加しない。

## Result Schema

```
RESULT: PASS | HOLD | BLOCKED

SUMMARY:
1-3 lines

CHANGED_FILES:
count and paths

CHECKS:
- task_validation:
- importer_tests:
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

- CLI: `npm run analytics:gsc:import -- --input <zip> --date YYYY-MM-DD --label 14d|28d|3m|custom --scope property|page [--page-url <url>] [--dry-run|--apply]`。既定は`--dry-run`。`--dry-run`と`--apply`の同時指定はUsageError。
- dry-run behavior: 書き込みなし。source ZIP basename・size・sha256・検出dataset一覧（present/empty/rows/required/derived）・notes・warnings・errors・planned output directory・final status・apply可否を表示。secretやabsolute local pathは出力しない。
- apply behavior: dry-run相当のvalidationがsuccessの場合のみ書き込み。一時ディレクトリに生成後renameで最終ディレクトリへ移動。既存run directoryがあれば上書きせずエラー。途中失敗時は一時ディレクトリを削除し不完全runを残さない。
- dataset detection: CSVヘッダー優先（1.ヘッダー 2.フィルタCSV内容 3.ファイル名 4.archive内順序）。同一datasetの複数候補はvalidation.errorsへ記録し自動選択しない。未知CSVはnotesへ記録。
- encoding: UTF-8・UTF-8 BOM対応。デコード失敗（U+FFFD混入検知）はwarningとしてスキップし、cp932等へのフォールバックは行わない。
- normalization: daily/queries/pages/countries/devices/search-appearanceを英語ヘッダー（date|query|page|country|device|search_appearance, clicks, impressions, ctr, position）へ統一。CTRは百分率文字列を0-1小数へ変換。不正値はvalidation.errorsへ記録（黙って0にしない）。
- totals calculation: dailyから導出。clicks=sum、impressions=sum、ctr=合算比、position=impression加重平均（単純平均ではない）。impressions合計が0の場合はctr=0・position=空欄・warning記録。
- manifest: manifest_version 1.1、processing_stage=normalized、scope（property|page）、filters、source_export_date/imported_at、source_files（basenameのみ、sha256実測、絶対path・username記録なし）を生成。secret系フィールドなし。
- ZIP safety: 独自実装のZIP読み取り（store/deflateのみ対応）。MAX_ENTRIES=64、MAX_ENTRY_UNCOMPRESSED_BYTES=20MB、MAX_TOTAL_UNCOMPRESSED_BYTES=100MB。絶対path・`../`・Unixシンボリックリンクentryは読み取り前に拒否。
- fixtures: 実ユーザーZIPはcommitせず、架空データの最小fixtureをテスト実行時にstore方式ZIPとしてメモリ生成（scripts/gsc-import-lib.mjsのwriteStoreZip）。property scope・page scope両方をカバー。
- tests: scripts/test-import-gsc-manual-export.mjsで18項目（property/page scope成功、空search-appearance許容、query-pages/sitemaps欠如許容、totals加重平均計算、CTR百分率変換、必須dataset欠損検知、重複dataset候補検知、不正UTF-8検知、ZIP Slip拒否、scope不整合検知、既存ディレクトリ上書き拒否、dry-run書き込みゼロ、apply正常書き込み、manifest JSON parse、absolute path非記録、secret的語彙非出現、source ZIP不変）全PASS。
- real_zip_dry_run: 実施済み。`aicreative-db.com-Performance-on-Search-2026-07-10.zip`（property全体export、7453 bytes）に対しdry-run実行、status=success（daily 65行/queries 295行/pages 97行/countries 44行/devices 3行/search-appearance空/filters/totals導出、query-pages・sitemapsは想定通りabsent）。続けてrepository外の一時out-root（`/tmp_gsc_apply_test`、リポジトリ外）へのapplyも実施し、manifest.json・totals.csv等の生成とJSON parse成功を確認後、生成物は全て削除・元ZIPは無変更・repository内には一切コピーしていない。
- changed_files: 7件（scripts/import-gsc-manual-export.mjs, scripts/gsc-import-lib.mjs, scripts/test-import-gsc-manual-export.mjs, package.json, docs/analytics/gsc/README.md, docs/tasks/completed/2026-07-27-implement-gsc-manual-zip-importer.md, docs/tasks/LATEST.md）。package-lock.jsonは存在せず変更なし。新規npm依存追加なし。
- checks: validate:task PASS / importer tests 18/18 PASS / validate:data PASS（Files 29, Errors 0, Warnings 0, Verify 0）/ build PASS（92ページ）/ validate:publish PASS（Errors 0, Warnings 4、新規違反なし）/ git diff --check PASS / validate:scope PASS
- git: commit・push未実行時点でこのファイルを作成。実SHAはGIT欄で別途確定する。
- production: NOT_DEPLOYED
- unresolved: page scope export（単一ツールページzip）での実データdry-runは未実施（property全体exportのみ実施）。partial/failed時の挙動は初期実装として「applyしない」方針のみでREADMEに明記、より柔軟な部分apply等は今後の検討課題。
- next: Run the GSC importer against a real 3-month property export and create the first analysis summary.
