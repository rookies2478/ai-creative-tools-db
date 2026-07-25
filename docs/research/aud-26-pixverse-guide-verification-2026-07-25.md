# AUD-26 PixVerse 日本語対応3区分ガイド網羅性検証記録

- **確認日**: 2026-07-25
- **対象ツール**: PixVerse
- **対象ファイル**: `src/pages/guides/japanese-support-three-types/index.astro`

## 監査指摘
DB`japaneseUi: true`（対応確定）だが、「日本語対応3区分ガイド」の比較表にPixVerse行が存在しない（Vidu AI・Kling AI等の同カテゴリツールは掲載済み）。

## DB値
`japaneseUi: true`
`japanesePrompt: "unknown"`

## 表示値（修正前）
比較表（crossRows配列）にPixVerse行が存在せず、Adobe Firefly/Canva AI画像生成/Gemini画像生成/Microsoft Designer/Ideogram/Midjourney/Runway/Kling AI/Vidu AI/HeyGenの10件のみ掲載。

## 不一致分類
単なる未掲載（網羅性の欠如）。

## 確認した一次情報
新規の一次情報確認は不要。過去のAUD-13対応時（2026-07-25、`docs/research/pixverse-japanese-ui-verification-2026-07-25.md`）に、`pixverse.ai`のURLパスベース日本語ローカライズ（`/ja`）実装済み・法務ページのみ英語という一次情報確認結果が既にあり、これをそのまま参照。

## 採用した値
既存のPixVerse一次情報確認結果（UI対応・法務ページ除く、日本語プロンプト精度は未確認）をそのまま比較表の行に反映。

## 修正内容
`src/pages/guides/japanese-support-three-types/index.astro`のcrossRows配列末尾にPixVerse行を追加：
```
日本語UI: 〇 対応 / 日本語プロンプト: ？ 要確認 / 日本語文字生成: 要実テスト / 日本語公式ページ: ？ 未確認 / 注意点: UIは日本語対応（法務ページ除く）とされるが、日本語プロンプトの精度は公式情報から未確認
```

## 判断できなかった項目
「日本語公式ページ」欄・「日本語文字生成」欄は他ツール同様「？未確認」「要実テスト」とし、実テスト・追加確認は今回のバッチ範囲外。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
このガイドの比較表もハードコード配列であり、DBに新しい確定値が追加されてもガイド側への反映が保証されない（カテゴリページと同型の構造的課題）。
