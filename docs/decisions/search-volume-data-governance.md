# 検索需要データ（キーワード検索ボリューム）のガバナンス

## 決定

外部キーワード検索需要データの正本（canonical source）は以下1ファイルとする。

```
docs/seo-research/ai-tools-search-volume-master.xlsx
```

（git管理外・ローカルファイル。`docs/seo-research/**/*.xlsx` は `.gitignore` 対象）

## データ種別の分離

| データ種別 | 正本 | 用途 |
|---|---|---|
| 外部キーワード検索需要（月間検索数・競合・CPC等） | `docs/seo-research/ai-tools-search-volume-master.xlsx` | 記事化・KW拡張の優先度判断 |
| 自社サイトの実測検索パフォーマンス（表示回数・クリック・掲載順位） | `docs/analytics/gsc/` | サイト内SEO効果測定 |
| 派生分析（クラスタ化・優先度スコア・記事化推奨） | 上記2つを参照する分析シート（例: 旧`article_brushup_recommendations.xlsx`） | コンテンツ企画の補助資料。自身は正本ではない |

**GSCのインプレッション数を外部検索ボリュームの代替として扱わない。** 概念的に別物（自社での表示回数 vs 市場全体の検索需要）であり、混同禁止。

## ワークブック構造

- `MASTER_SUMMARY`: ツール単位の要約（1ツール1行、`src/content/tools/*.md` の全ツールを収録）
- `KEYWORD_DATA`: キーワード単位の生データ（ツール横断・正規化済み）
- `SOURCE_LOG`: データ取得バッチの出典・期間・収集日ログ

## research_status の意味

- `RESEARCHED`: 当該ツールについて主キーワード＋関連キーワードをGKPで一括取得済み
- `VERIFY`: 部分的なデータのみ存在（網羅的な調査ではない。要再調査）
- `NOT_RESEARCHED`: 未調査。**検索ボリューム0とは意味が異なる。0は「調査済みで検索数0」を意味し、未調査には数値を入力しない（空欄のまま）**

## 旧ワークブックの位置づけ

`docs/seo-research/article_brushup_recommendations.xlsx` は **HISTORICAL / DERIVED ANALYSIS** として扱う。

- 作成日: 2026-06-15
- 内容: GSC×ラッコキーワード×Googleキーワードプランナーを組み合わせたコンテンツ企画用クラスタ分析（記事化優先度・対応方針などの派生判断を含む）
- 対象ツールが限定的（動画/画像生成系の一部、Photoroom/Creatify/Recraftは非対応）で、収録キーワードも「コンテンツ戦略上関連性が高いと判定されたもの」のみに絞られており、当該ツールの完全なキーワードセットを網羅していない
- 2026-08-13にこの中の生GKP数値部分（`04_全KW整理`シート、ツールを確実に識別できる9ツール分・202行）を`ai-tools-search-volume-master.xlsx`の`KEYWORD_DATA`へ移行済み（`research_status = VERIFY`として記録、派生判断列は移行対象外）
- 移行できなかった内容（優先度スコア・記事化推奨・想定ページ種別などの派生分析、および対象ツール不明な757行）は移行せず、当該ファイルに残置。今後もコンテンツ企画の参考資料として保持し、削除しない
- **本ファイルは検索ボリュームの正本ではない**

## 更新方針

- 新規ツール追加時: `MASTER_SUMMARY`に`NOT_RESEARCHED`行を追加。GKP調査実施後に`KEYWORD_DATA`へ実データ追加、`MASTER_SUMMARY`のstatus/日付を更新
- 検索ボリュームは経時変化するため、`collected_at`・`period_start`・`period_end`を必ず記録し、古い調査を無断上書きしない（新しい観測を現在値として記録しつつ、古い観測の存在が分かる形を維持）
- 出典が不明な場合は`data_source = UNKNOWN`とし、推測で埋めない
