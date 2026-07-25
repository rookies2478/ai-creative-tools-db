# AUD-30 DALL·E lastReviewed日付ズレ検証記録

- **確認日**: 2026-07-25
- **対象ツール**: DALL·E
- **対象ファイル**: `src/content/tools/dalle.md`(lastReviewed) vs `src/pages/categories/image-generation/index.astro:120`

## 監査指摘
DB`lastReviewed: "2026-06-15"`に対し、カテゴリ一覧の`date`列が`'2026-06-10'`で5日のズレがあった。内容矛盾はないが日付不一致。

## DB値
`lastReviewed: "2026-06-15"`

## 表示値（修正前）
`date: '2026-06-10'`

## 不一致分類
更新日不一致。

## 確認した一次情報
不要。日付の同期のみで、内容自体の一次情報確認は不要と判断。

## 採用した値
DBの`lastReviewed: "2026-06-15"`を採用。

## 修正内容
`src/pages/categories/image-generation/index.astro:120`の`date: '2026-06-10'`→`date: '2026-06-15'`。

## 判断できなかった項目
なし。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
カテゴリページの`date`列がハードコードで、DBの`lastReviewed`更新時に手動同期が必要な構造（AUD-15/16/20/25と同根）。
