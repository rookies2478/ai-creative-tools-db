# GSC Analytics 保存構造

## 対象データセット

1つのrunにつき、以下8データセットを同一期間で取得する想定。

- totals
- daily
- queries
- pages
- query-pages
- devices
- countries
- sitemaps

全データセットは同一の`period_start`／`period_end`を使用する。

## ディレクトリ構造

```
docs/analytics/gsc/
├─ README.md
├─ templates/
│  ├─ manifest.template.json
│  └─ analysis-summary.template.md
└─ YYYY-MM-DD/
   ├─ raw/
   │  └─ run-HHMMSS/
   │     ├─ totals.csv
   │     ├─ daily.csv
   │     ├─ queries.csv
   │     ├─ pages.csv
   │     ├─ query-pages.csv
   │     ├─ devices.csv
   │     ├─ countries.csv
   │     ├─ sitemaps.csv
   │     └─ manifest.json
   └─ analysis-summary.md
```

`YYYY-MM-DD/raw/`配下はGitで管理しない（`.gitignore`の`docs/analytics/gsc/**/raw/`により除外）。`analysis-summary.md`のみGit管理する。

## manifestに記録する主要項目

- `period_start` / `period_end`
- `comparison_period`（前期間比較の有無）
- `property`（GSCプロパティURL）
- `search_type`（web / image / video等）
- `row_limit`（APIまたはUIのページング上限）
- `pagination`（複数ページ取得した場合の情報）
- `timezone`（Asia/Tokyo固定を想定）

## 取得方式について

取得方式（手動export／API取得）は本タスクでは確定しない。どちらの方式でも、rawファイル一式とmanifest.jsonの両方が揃っていることを必須とする。rawは取得後に改変しない。

## 分析種別の識別

14日／28日／3か月等の分析期間の種別は、manifestの`period.label`で識別する（例: `"14d"`, `"28d"`, `"3m"`, `"custom"`）。

## 注意事項

- GSCの数値とClarityの行動データは性質が異なるため、分析要約内で混同しないこと。
- 少数データ（該当クエリ・ページの表示回数やクリック数が極端に少ない場合）で断定的な結論を出さないこと。
- GSCプロパティやsitemap設定の変更直後は、数値変動が設定変更由来か施策由来か判別できないためHOLD判断があり得る。
- 実装するかどうかの判断は、rawそのものではなく`analysis-summary.md`に記録する。

## GSC rawファイルの期待列（例）

実際の取得スキーマ（API/UIエクスポート）によって列名は変わり得るため、以下は期待される列の目安であり断定ではない。

- `totals.csv`: date, clicks, impressions, ctr, position
- `daily.csv`: date, clicks, impressions, ctr, position
- `queries.csv`: query, clicks, impressions, ctr, position
- `pages.csv`: page, clicks, impressions, ctr, position
- `query-pages.csv`: query, page, clicks, impressions, ctr, position
- `devices.csv`: device, clicks, impressions, ctr, position
- `countries.csv`: country, clicks, impressions, ctr, position
- `sitemaps.csv`: sitemap, submitted, indexed, last_submitted, last_downloaded
