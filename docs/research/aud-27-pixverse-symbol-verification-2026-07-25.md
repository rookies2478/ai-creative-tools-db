# AUD-27 PixVerse japanesePrompt記号不統一検証記録

- **確認日**: 2026-07-25
- **対象ツール**: PixVerse
- **対象ファイル**: `src/content/tools/pixverse.md:12` vs `src/components/Japanese.astro:97`

## 監査指摘
DB`japanesePrompt: "unknown"`だが、`Japanese.astro`のマトリクス表で`prompt:'－'`と表示されており、他のunknown系ツールが`prompt:'△'`で統一されているのに対し記号が不統一。

## DB値
`japanesePrompt: "unknown"`

## 表示値（修正前）
`src/components/Japanese.astro:97` `prompt:'－'`

## 不一致分類
表記ゆれ（記号統一の欠如）。AUD-21の「JaStatus型に非対応状態がない」構造課題とは別種の問題（`prompt`フィールドの型`Mark`は`'○'|'△'|'×'|'－'`の4値を既に持ち、値の選択ミスであり型自体の欠陥ではない）。

## 全文検索結果
`Japanese.astro`内の全29行を確認したところ、`japanesePrompt`が"unknown"に相当する他ツール（Haiper, Leonardo AI, Luma AI, NightCafe, Midjourney, Pika, InVideo AI, Runway, Stable Diffusion, Tensor.Art等）は全て`prompt:'△'`で表示されており、PixVerseの`prompt:'－'`のみが例外だった。

## 確認した一次情報
不要。表示記号の統一のみで、DB値自体は変更しない。

## 採用した値
他のunknown系ツールと同じ`'△'`を採用。

## 修正内容
`src/components/Japanese.astro:97`の`prompt:'－'`→`prompt:'△'`（1文字のみの変更。`JaStatus`型・`ja`フィールド・他ツール行には一切触れていない）。

## 判断できなかった項目
なし。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。AUD-21で凍結されている`JaStatus`型・`ja`フィールドとは無関係の`prompt`（`Mark`型）フィールドの値修正であり、AUD-21の構造課題には影響しないことを確認済み。

## 構造上の課題
特になし（今回の修正で解消）。
