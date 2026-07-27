# GSC Analytics 保存構造

## 取得方式の正式定義

**Current official acquisition method: GSC UI manual ZIP export**

理由：

- 現在の運用で実際に利用されている（`aicreative-db.com-Performance-on-Search-*.zip`等）
- 認証情報・API実装が不要
- API実装前でも再現可能
- property全体とページ単位の両方を取得可能

**将来候補: GSC Search Analytics API**

APIは現時点で未実装であり、正式取得方式としては扱わない。API化した場合も`manifest_version`の1.x系のまま互換性を維持する方針とする（`acquisition.method`の値が`"manual-ui-export"`から`"api"`へ変わるのみで、他のmanifest構造は変更しない設計）。

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

## 分析期間

- 現在の既存ZIPはいずれも期間ラベル`3m`（過去3か月間）。
- 今後の効果測定では`28d`や`14d`も利用可能とする。
- `period.start_date` / `period.end_date`を必ず記録する。
- ファイル名の日付だけで期間を決めない。フィルタCSVの内容またはユーザー入力から期間を確定する。
- 全datasetで同一期間であることを検証する。

## GSCとClarityの混同禁止

GSCの数値とClarityの行動データは性質が異なるため、分析要約内で混同しないこと。少数データで断定的な結論を出さないこと。GSCプロパティやsitemap設定の変更直後は数値変動の原因が判別できないためHOLD判断があり得る。実装判断はrawではなく`analysis-summary.md`に記録する。
