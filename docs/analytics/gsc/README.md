# GSC Analytics 保存構造

## 取得方式の正式定義

**Current official acquisition method: GSC Search Analytics API（`scripts/analytics-gsc-fetch.mjs`）**

**Fallback acquisition method: GSC UI manual ZIP export（`scripts/import-gsc-manual-export.mjs`）**

API経路が使えない場合（未認証・権限不足・API無効化・ネットワーク不通等）のフォールバックとして、手動ZIP方式は削除せず維持する。手動ZIP方式への切替が必要な条件：

- `GOOGLE_APPLICATION_CREDENTIALS`が設定できない、または認証ファイルを用意できない
- `GSC_AUTH_FAILED` / `GSC_PERMISSION_DENIED` / `GSC_API_DISABLED` / `GSC_PROPERTY_NOT_FOUND`のいずれかで実行が失敗する
- ネットワーク到達性がない環境で実行する必要がある

manual importerの詳細は本ファイル後半の「importer（scripts/import-gsc-manual-export.mjs）」節を参照。

## GSC Search Analytics API 取得（`scripts/analytics-gsc-fetch.mjs`）

### 対応dataset

`totals` / `daily` / `queries` / `pages` / `query-pages` / `devices` / `countries` / `search-appearance` / `sitemaps`

`query-pages`と`sitemaps`はGSC UI手動exportでは取得できないが、API経路では取得できる。

### 認証方式（読み取り専用）

- 環境変数 `GOOGLE_APPLICATION_CREDENTIALS` に、**リポジトリ外**に保存したサービスアカウントJSONの絶対パスを設定する。
- 使用スコープ: `https://www.googleapis.com/auth/webmasters.readonly`（読み取り専用）。
- `GOOGLE_APPLICATION_CREDENTIALS`が未設定の場合、`GSC_CREDENTIALS_NOT_CONFIGURED`で明確に停止する（値の探索・推測は行わない）。
- 認証ファイルの内容・鍵・メールアドレス・トークンはコード・ログ・manifest・Gitのいずれにも保存・出力しない。

**Windows PowerShellでの設定例（値はダミー、実パスはユーザー環境ごとに異なる）**

```powershell
# 一時セッション用（このPowerShellウィンドウを閉じると消える）
$env:GOOGLE_APPLICATION_CREDENTIALS = "C:\secure-outside-repo\gsc-service-account.json"

# 永続設定（ユーザー環境変数として登録、新しいシェルから有効）
setx GOOGLE_APPLICATION_CREDENTIALS "C:\secure-outside-repo\gsc-service-account.json"
```

一時セッション用（`$env:...`）は現在のシェルのみ有効、`setx`は新しいシェルから恒久的に有効になる点を区別すること。認証ファイルは本リポジトリ配下に置かない。

### 設定（環境変数、非秘密）

```
GSC_SITE_URL=sc-domain:aicreative-db.com
GSC_DEFAULT_DAYS=14
GSC_DATA_LAG_DAYS=3
```

いずれも実行引数で上書き可能。

### 実行例

```
# 既定（14日間、GSC_SITE_URL/GSC_DEFAULT_DAYS/GSC_DATA_LAG_DAYSに従う）
npm run analytics:gsc:fetch

# 日数指定
npm run analytics:gsc:fetch -- --days 28

# 期間指定（start/endとdaysの同時指定はエラー）
npm run analytics:gsc:fetch -- --start 2026-07-14 --end 2026-07-27
```

### 保存先

`docs/analytics/gsc/YYYY-MM-DD/raw/run-HHMMSS/`（既存のmanual export runと同一の保存構造。`YYYY-MM-DD`は`endDate`を使用）。

出力ファイル: `totals.json` / `daily.csv` / `queries.csv` / `pages.csv` / `query-pages.csv` / `devices.csv` / `countries.csv` / `search-appearance.csv` / `sitemaps.json` / `manifest.json`。CSV/JSONいずれもUTF-8。

`raw/`はGit管理外（既存の`docs/analytics/gsc/**/raw/`除外ルールをそのまま使用）。

### ページングとtruncatedの意味

- GSC Search Analytics APIの`rowLimit`/`startRow`でページングする。APIは全行の取得を保証しない。
- 安全上限（最大ページ数・最大行数）を超えた場合、それ以上は取得を打ち切り、`success`扱いにせず`manifest.truncated`へ該当datasetキーを記録する。
- `query-pages`は行数が増えやすいため、他datasetより低い安全上限（`QUERY_PAGES_MAX_ROWS`）を設定している。
- truncated発生時、run全体は`failed`にはせず`partial`として扱う（取得できた範囲のデータは書き込むが、不完全であることをmanifestで明示する）。

### sitemaps取得

`sitemaps.list`（読み取り専用）を実行し、`path` / `lastSubmitted` / `lastDownloaded` / `isPending` / `isSitemapsIndex` / `type` / `warnings` / `errors` / `contents[].type` / `contents[].submitted`を記録する。`contents[].indexed`は使用しない。sitemapの送信・削除・更新は実装しない。

### 秘密情報禁止

- 認証ファイルのパス・メールアドレス・トークン・HTTP Authorizationヘッダー・JSON鍵の内容は、コード・ログ・manifest・commit・Gitのいずれにも含めない。
- `manifest.credentialPathStored`は常に`false`。

### mockテスト

`scripts/test-analytics-gsc-fetch.mjs`（`npm run analytics:gsc:fetch:test`）は実Google APIへ一切接続せず、注入可能なmockクライアントで正常系・ページング・`query-pages`複合dimension・sitemaps・認証未設定・permission denied・rate limit・部分失敗・truncated・日付不正・totals/daily不一致・秘密情報非出力を検証する。GitHub Actionsでもこのmockテストのみ実行可能（実API接続なし）。

## 将来候補としてのAPI化に関する既存注記（履歴）

上記API実装により、`acquisition.method`が`"manual-ui-export"`から`"api"`相当（`analytics-gsc-fetch.mjs`のmanifestでは`method: "api"`）に対応する経路が追加された。`manifest_version`は1.x系のまま互換性を維持している。manual export側のmanifest構造（`acquisition.method: "manual-ui-export"`）自体は変更していない。

## 保存先ディレクトリ構造

```
docs/analytics/gsc/
├─ README.md
├─ templates/
│  ├─ manifest.template.json
│  └─ analysis-summary.template.md
└─ YYYY-MM-DD/
   ├─ raw/
   │  └─ run-HHMMSS/
   │     ├─ 手動exportしたZIP由来のCSV一式
   │     └─ manifest.json
   └─ analysis-summary.md
```

`YYYY-MM-DD/raw/`配下はGitで管理しない（`.gitignore`の`docs/analytics/gsc/**/raw/`により除外）。`analysis-summary.md`のみGit管理する。

## 実測済みGSC UI ZIP構造

GSC UIの「エクスポート」機能でダウンロードされるZIPには、通常以下のCSVが含まれる。**実ファイル名は日本語・ローカライズ文字列であり、環境によって文字化けする場合がある。ファイル名だけでデータセットを判定してはならない。**

| 実ヘッダー（1行目） | 内容 | 備考 |
| --- | --- | --- |
| 日付, クリック数, 表示回数, CTR, 掲載順位 | 日次推移 | ファイル名が内容と一致しない場合がある（例: 「平均読み込み時間のチャート.csv」という名前で日次パフォーマンスデータが入っている、というGSC UI側の既知の命名不一致を確認済み）。データセット識別は「日付」列の存在を優先する。 |
| 上位のクエリ, クリック数, 表示回数, CTR, 掲載順位 | クエリ別 | |
| 上位のページ, クリック数, 表示回数, CTR, 掲載順位 | ページ別 | |
| 国, クリック数, 表示回数, CTR, 掲載順位 | 国別 | 実exportにより列差があり得るため、最低限「国」列で識別する。 |
| デバイス, クリック数, 表示回数, CTR, 掲載順位 | デバイス別 | |
| 検索での見え方, クリック数, 表示回数, CTR, 掲載順位 | 検索での見え方 | データがない場合はヘッダーのみの空ファイルになる。**absent（ファイル自体がない）とempty（ヘッダーのみ）は区別する。** 空ファイルでも正規のexport結果として扱う。 |
| フィルタ, 値 | 適用フィルタ | 検索タイプ・期間・（単一ページexportの場合のみ）ページURL等を記録。property全体exportではページフィルタの行が存在しない。 |

## データセット区分

### A. exported datasets（手動ZIPに直接含まれる可能性があるもの）

- daily
- queries
- pages
- countries
- devices
- search-appearance
- filters

### B. derived datasets（rawから正規化時に生成するもの）

- totals

totalsはdailyから集計する。ただしCTRと掲載順位は単純平均しない。後続のimporter実装では以下の考え方を用いる予定（**今回は計算ロジックを実装しない**）。

- total clicks = sum(clicks)
- total impressions = sum(impressions)
- CTR = total clicks / total impressions
- position = impression-weighted average where possible

### C. optional or unavailable datasets（manual exportでは取得できない、または必須としないもの）

- **query-pages**: GSC UIの通常エクスポートでは取得できない（API取得または別処理が必要）。手動export runの成功条件には含めない。
- **sitemaps**: パフォーマンスレポートのZIPには含まれない（GSCの「サイトマップ」画面または別取得方式が必要）。手動performance exportの成功条件には含めない。

## required_datasets（manual export）

- daily
- queries
- pages
- countries
- devices
- search-appearance
- filters

search-appearanceはヘッダーのみ（空）でも`present: true`としてよい。

## optional_datasets（manual export）

- totals（derived。raw段階ではoptional、正規化後manifestではpresentにできる）
- query-pages（manual exportでは常にunavailable）
- sitemaps（manual exportでは常にunavailable）

## processing_stage

manual raw runとnormalized runを区別するため、manifestに`processing_stage: "raw" | "normalized"`を設ける。raw段階ではtotalsは`present: false, derived: true`、normalized段階では`present: true`にできる設計とする。

## scope（property全体 / ページ単位）

- `scope.type: "property"` — property全体のexport。ページフィルタなし。
- `scope.type: "page"` — 単一ページに絞ったexport。`scope.page_url`に絶対URLを記録する。

property全体exportとページ単位exportは、フィルタCSVの内容（ページURL行の有無）で判別する。

## run_idと時刻の扱い

GSC ZIPファイル名には通常日付のみが含まれ、正確な取得時刻を復元できない。

- `run_id`（`run-HHMMSS`形式）はimporter実行時に採番する方針とする。ZIP内部のファイルmtimeから時刻を推測しない。GSC画面上の操作時刻とも断定しない。
- `source_export_date`: ZIPファイル名またはユーザー入力から得られる日付（時刻は含まない）。
- `imported_at`: importerが実行された日時。
- 正確なexport時刻が不明な場合は、無理に記録しない（null許容）。

## acquisitionの構造

```json
{
  "method": "manual-ui-export",
  "source": "google-search-console",
  "source_report": "performance",
  "input_format": "zip",
  "tool": "Google Search Console UI",
  "script": null
}
```

将来API取得に移行する場合は`method: "api"`とする。credential・token・cookie・browser sessionはmanifestに記録しない。

## source_files

```json
"source_files": [
  {
    "name": "REPLACE_WITH_SOURCE_ZIP_NAME.zip",
    "type": "zip",
    "sha256": null,
    "size_bytes": 0
  }
]
```

- source ZIPの絶対ローカルpath・usernameを含むpathは記録しない。
- sha256計算は後続のimporter実装で行う。本テンプレートではplaceholder（null）のみ。

## status判定

**success**:
- ZIPが読み取り可能
- required_datasetsがすべて識別できる
- required CSVがparse可能
- filtersが取得できる
- validation.errorsが0
- manifestが生成可能

**partial**:
- required datasetが一部欠損
- filtersが取得不能
- CSVの一部がparse不能
- 列不足がある
- （query-pages・sitemapsが欠損しているだけではpartialにしない）

**failed**:
- ZIP破損
- CSVを一件も識別できない
- encodingを判定できない
- manifest生成不能
- required datasetの大部分が欠損

query-pagesやsitemapsが存在しないことは、それ単体ではstatusをpartialにする理由にならない（optional/unavailableとして定義済みのため）。

## データセット識別の優先順位（将来importerの必須方針）

1. CSVヘッダー
2. フィルタCSVの内容
3. ファイル名
4. ZIP内順序

**ファイル名は最も信頼度が低い。** ローカライズ・文字化け・GSC UI側の命名不具合・内容と名前の不一致・ブラウザやOSによる差異があるため。日本語ファイル名を固定値としてコードへ埋め込まない。

エンコーディングはUTF-8を第一候補とするが、importer実装時にはBOMの有無とdecode failureを検証する必要がある（**今回はコードを実装しない**）。

## importer（scripts/import-gsc-manual-export.mjs）

初期実装済み。GSC UI手動ZIPエクスポートを読み取り専用で検査し、標準raw構造とmanifestへ変換する。新規npm依存は追加していない（Node標準の`zlib`/`crypto`/`fs`のみで、ZIP読み取り・展開・SHA-256計算まで完結）。

### 実行方法

```
# dry-run（既定・書き込みなし）
npm run analytics:gsc:import -- --input "path/to/export.zip" --date 2026-07-10 --label 3m --scope property

# apply（validation success時のみ書き込み）
npm run analytics:gsc:import -- --input "path/to/export.zip" --date 2026-07-10 --label 3m --scope property --apply

# ページ単位export
npm run analytics:gsc:import -- --input "path/to/export.zip" --date 2026-07-10 --label 3m --scope page --page-url https://aicreative-db.com/tools/example/
```

- `--dry-run`と`--apply`の同時指定は禁止。未指定時は`--dry-run`扱い。
- `--input` / `--date` / `--label` / `--scope`は必須。`--scope page`時は`--page-url`必須、`--scope property`時は`--page-url`指定不可。
- 出力先はrepository root基準の規定path（`docs/analytics/gsc/YYYY-MM-DD/raw/run-HHMMSS/`）固定で、直接指定はできない。

### 対応エンコーディング

UTF-8・UTF-8 BOM付きに対応。デコード失敗（U+FFFD置換文字の混入）を検出した場合はcp932等へ自動フォールバックせず、当該エントリを`warnings`に記録してスキップする（required datasetがそれで欠落すればstatusはpartial/failedになる）。

### dataset識別

ヘッダー優先（1.CSVヘッダー 2.フィルタCSV内容 3.ファイル名 4.archive内順序）で実装済み。同一datasetの候補が複数見つかった場合は自動選択せず`validation.errors`へ記録し、成功扱いにしない。

### 正規化ヘッダー

`daily.csv`/`queries.csv`/`pages.csv`/`countries.csv`/`devices.csv`/`search-appearance.csv`はいずれも`date|query|page|country|device|search_appearance, clicks, impressions, ctr, position`へ統一する。CTRは`"33.33%"`のような百分率文字列を0〜1の小数へ変換する（`1`を超える数値も百分率とみなして/100する）。不正な数値は0へ黙って丸めず`validation.errors`に記録する。

### totals計算

`daily.csv`から`totals.csv`を導出する。単純平均は行わない。

- `clicks = sum(clicks)`
- `impressions = sum(impressions)`
- `ctr = clicks / impressions`
- `position = sum(position * impressions) / sum(impressions)`（impression加重平均）
- `impressions`合計が0の場合は`ctr = 0`、`position`は空欄とし、manifestの`validation.warnings`に記録する。

### 出力構造とエラー処理

apply時は`docs/analytics/gsc/YYYY-MM-DD/raw/run-HHMMSS/`へ、一時ディレクトリに全ファイルを書き込んでから最終ディレクトリへrenameする（途中失敗時は不完全runを残さない）。既存の同名run directoryがある場合は上書きせずエラー終了する。`query-pages.csv`/`sitemaps.csv`は生成せず、manifestに`present: false`として記録する。manifestは最後に書き込む。`raw/`はGit管理対象外（既存`.gitignore`ルールをそのまま利用）。source ZIPは読み取り専用で扱い、一切変更・削除しない。

### ZIP安全性

MAX_ENTRIES=64、MAX_ENTRY_UNCOMPRESSED_BYTES=20MB、MAX_TOTAL_UNCOMPRESSED_BYTES=100MBの上限を設定。絶対path・`../`を含むentry・Unix symlink entryは読み取り前に拒否する。store（method 0）とdeflate（method 8）のみ対応し、それ以外の圧縮方式は拒否する。

### status判定とapply可否

partial/failed状態ではapplyしない（`validation.errors`が1件でもあれば書き込みを拒否する）方針で初期実装している。

### secret・APIについて

credential・token・cookie・APIは一切扱わない。manifestにabsolute local pathやusernameは記録しない（source_filesはbasenameのみ）。

## 分析期間

- 現在の既存ZIPはいずれも期間ラベル`3m`（過去3か月間）。
- 今後の効果測定では`28d`や`14d`も利用可能とする。
- `period.start_date` / `period.end_date`を必ず記録する。
- ファイル名の日付だけで期間を決めない。フィルタCSVの内容またはユーザー入力から期間を確定する。
- 全datasetで同一期間であることを検証する。

## raw retention

`scripts/rotate-analytics-raw.mjs`によるraw run整理のretentionは、label別に90日（14d）／365日（28d, 3m）。詳細は[docs/analytics/README.md](../README.md)を参照。label不明のrunは自動削除しない。

## GSCとClarityの混同禁止

GSCの数値とClarityの行動データは性質が異なるため、分析要約内で混同しないこと。少数データで断定的な結論を出さないこと。GSCプロパティやsitemap設定の変更直後は数値変動の原因が判別できないためHOLD判断があり得る。実装判断はrawではなく`analysis-summary.md`に記録する。
