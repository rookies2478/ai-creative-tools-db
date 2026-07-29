---
task_id: "add-gsc-api-fetcher"
created_at: "2026-07-30"
status: DONE
completed_at: "2026-07-30"
risk: HIGH
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Google Search Console Search Analytics APIによる自動取得機構（API取得コード・保存処理・mockテスト・運用資料）を新規構築する。実Google Cloud設定・サービスアカウント作成・実認証・実データ取得は行わない。既存の手動ZIPインポーターは削除せず、API障害時のフォールバックとして維持する。"

non_goals:
  - Google Cloud Consoleの操作
  - Search Console APIの実際の有効化
  - サービスアカウントの作成
  - GSCプロパティへのユーザー追加
  - 認証JSONの作成・取得・内容表示
  - 実APIへの認証接続
  - 実GSCデータ取得
  - 既存記事・DB・UI・CSSの変更
  - 本番反映
  - 手動ZIPインポーターの削除
  - URL Inspection APIの実装
  - sitemapの送信・削除
  - Search Consoleプロパティの追加・削除
---

# Task Result

## Goal

上記参照。

## Result

PASS

## Summary

- 新規実装:
  - `scripts/gsc-api-errors.mjs`: `GscApiError`とエラーコード一覧（`GSC_CREDENTIALS_NOT_CONFIGURED` / `GSC_CREDENTIAL_FILE_NOT_FOUND` / `GSC_AUTH_FAILED` / `GSC_PERMISSION_DENIED` / `GSC_PROPERTY_NOT_FOUND` / `GSC_API_DISABLED` / `GSC_RATE_LIMITED` / `GSC_INVALID_DATE_RANGE` / `GSC_PARTIAL_DATA` / `GSC_DATASET_TRUNCATED` / `GSC_NETWORK_ERROR` / `GSC_WRITE_FAILED`）。googleapis非依存。
  - `scripts/gsc-api-lib.mjs`: 日付範囲解決・検証（`--days`と`--start/--end`同時指定エラー、未来日拒否、`GSC_DEFAULT_DAYS`/`GSC_DATA_LAG_DAYS`既定値）、`fetchAllRows`（rowLimit/startRowページング、安全上限、重複検出）、単一dimension/`query-pages`のCSV正規化、totals/daily整合チェック（許容差: clicks/impressions=0, ctr=0.0005, position=0.05）、daily欠損日検出。googleapis非依存の純粋ロジックのためmockテストが認証なしで実行可能。
  - `scripts/gsc-api-client.mjs`: 実googleapisクライアント生成（`google.auth.GoogleAuth`、`keyFile: GOOGLE_APPLICATION_CREDENTIALS`、スコープ`webmasters.readonly`のみ）。HTTPエラーをステータスコードのみで安全に分類（401→`GSC_AUTH_FAILED`、403→`GSC_API_DISABLED`/`GSC_PERMISSION_DENIED`、404→`GSC_PROPERTY_NOT_FOUND`、429→`GSC_RATE_LIMITED`、ネットワーク不通→`GSC_NETWORK_ERROR`）。生のエラーオブジェクト・ヘッダー・鍵内容は一切転送しない。
  - `scripts/analytics-gsc-fetch.mjs`: CLIエントリ（`--days` / `--start` / `--end` / `--site-url`）。`getClient`注入可能な`runFetch()`をexport。totals（dimensionsなし）・daily/queries/pages/devices/countries/search-appearance（単一dimension、ページング対応）・query-pages（複合dimension、`QUERY_PAGES_MAX_ROWS`で他datasetより低い安全上限）・sitemaps（`sitemaps.list`、`contents[].indexed`は不使用）を取得。一時ディレクトリ→rename方式で書き込み（manual importerと同一パターン）、全必須dataset取得失敗時は何も書き込まない。truncated発生時は`run status: partial`（`failed`にはしない）とし、`manifest.truncated`へdatasetキーを記録。
  - `scripts/test-analytics-gsc-fetch.mjs`: mockクライアント注入によるテスト14件。正常系・ページング・query-pages複合dimension・sitemaps・認証未設定・permission denied・rate limit・部分失敗（truncation→partial降格）・truncated記録・日付不正2種・既定14日ウィンドウ（dataLagDays考慮）・totals/daily不一致・秘密情報非出力を検証。**実Google APIへは一切接続しない。**
- 既存資産の維持:
  - `scripts/import-gsc-manual-export.mjs` / `scripts/gsc-import-lib.mjs`は無変更。既存回帰テスト（`npm run analytics:gsc:test`）18件全PASSを維持確認。
  - `docs/analytics/gsc/README.md`を更新し、API方式を主経路・手動ZIPをフォールバックと明記。認証設定（PowerShell、一時セッション用/永続設定の区別）、`GSC_SITE_URL`/`GSC_DEFAULT_DAYS`/`GSC_DATA_LAG_DAYS`、実行例、保存先、dataset一覧、ページングとtruncatedの意味、sitemaps取得、秘密情報禁止、フォールバック条件を追記。既存の手動export節・raw保持期間節は無変更。
- 依存追加:
  - `package.json`へ`googleapis`を依存追加し、`npm install`でlockfile（`package-lock.json`、既存トラック済みファイルへ557行相当の差分）を正規更新。`analytics:gsc:fetch` / `analytics:gsc:fetch:test`スクリプトを新規追加、既存4スクリプトは無変更。
  - `.gitignore`へ`*credentials*.json`を追加（既存の`service-account*.json`除外と同種の予防策）。
  - `scripts/validate-scope.mjs`のDANGEROUS_PATTERNSへ`/credentials.*\.json$/i`を追加。
- 秘密情報: コード・テスト・manifest・ログのいずれにも認証ファイルの内容・パス・メールアドレス・トークン・Authorizationヘッダーを含めていない（`credentialPathStored: false`固定、secret_checkテストで機械的に確認）。
- 実施していないこと: Google Cloud Console操作、Search Console API有効化、サービスアカウント作成、GSCプロパティへのユーザー追加、認証JSON作成・取得・内容表示、実APIへの認証接続、実GSCデータ取得。
- GitHub Actions: 既存`.github/workflows/build.yml`は無変更（validate:data→build→validate:publishのみ、analytics系テストは元々CIに含まれておらず、今回もCIへは追加していない）。

## Changed Files

13件
- `package.json`（変更、依存追加・script追加）
- `package-lock.json`（変更、`npm install`による正規更新）
- `.gitignore`（変更、`*credentials*.json`追加）
- `scripts/analytics-gsc-fetch.mjs`（新規）
- `scripts/gsc-api-client.mjs`（新規）
- `scripts/gsc-api-errors.mjs`（新規）
- `scripts/gsc-api-lib.mjs`（新規）
- `scripts/test-analytics-gsc-fetch.mjs`（新規）
- `scripts/validate-scope.mjs`（変更、危険ファイルパターン追加）
- `docs/analytics/gsc/README.md`（変更、API方式の追記）
- `docs/tasks/active/2026-07-30-add-gsc-api-fetcher.md`（新規→completedへ移動）
- `docs/tasks/completed/2026-07-30-add-gsc-api-fetcher.md`（新規）
- `docs/tasks/LATEST.md`（更新予定）

## Checks

- task validation: PASS
- npm installとlockfile整合: PASS（`npm install`実行、`package-lock.json`正規更新）
- mock unit tests（`analytics:gsc:fetch:test`）: PASS（14 passed, 0 failed、実API接続なし）
- manual importer回帰テスト（`analytics:gsc:test`）: PASS（18 passed, 0 failed、既存挙動を維持）
- build: PASS（92ページ維持）
- diff check: PASS
- scope validation: PASS
- secret scan: PASS（新規ファイルへの`private_key`/`client_email`/`Authorization`等のハードコードなし。テストファイル内の当該文字列は「manifestに含まれないことを検証する禁止語リスト」としての参照のみ）
- .gitignore確認: PASS（`service-account*.json` / `*credentials*.json` / `.env` / `.env.*` / `docs/analytics/gsc/**/raw/`が既存または今回追加で除外済み）
- package script確認: PASS（`analytics:gsc:fetch` / `analytics:gsc:fetch:test`新規、既存4件無変更）
- 実Google APIへ接続していないこと: PASS（`getClient`未注入時のみ`createRealClient()`＝実googleapis経路を使うが、今回のテスト・実行はすべてmock注入のみで実施し、実行時に`GOOGLE_APPLICATION_CREDENTIALS`も未設定のため実APIには到達し得ない）
- target_files外の変更: なし（`git status --short`で確認した変更ファイルはすべてtarget_files内）

## Git

- branch: master
- commit: push後に確定
- push: 実施
- origin sync: push後に確認
- working tree: push後clean見込み

## Production

- state: NOT_DEPLOYED
- checked URLs: なし（本番デプロイなし）

## 未実施事項・次に必要な本人操作

- Google CloudプロジェクトでSearch Console APIを有効化
- サービスアカウントを作成し、JSON鍵を発行
- JSON鍵をリポジトリ外の安全な場所へ保存
- サービスアカウントのメールアドレスをGSCプロパティ（`sc-domain:aicreative-db.com`）へ読み取りユーザーとして追加
- `GOOGLE_APPLICATION_CREDENTIALS`環境変数を、保存したJSON鍵の絶対パスに設定
- 上記完了後、最小限の読み取り専用認証テスト（例: `npm run analytics:gsc:fetch -- --days 1`）を実行し、実データ取得が成功することを確認

## Decisions

なし（既存の`docs/analytics/gsc/README.md`に記載済みだった「API化時は`acquisition.method`のみ変更し、他のmanifest構造・保存契約は維持する」という既存方針に従って実装した。新規の設計判断ドキュメントは作成していない）

## LATEST Update

`docs/tasks/LATEST.md`を本タスクの結果で更新。

## Next

Configure Google Cloud service account and run minimal GSC API authentication test.
