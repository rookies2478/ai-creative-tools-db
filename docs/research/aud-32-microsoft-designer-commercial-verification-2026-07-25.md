# AUD-32 Microsoft Designer カテゴリ一覧commercialUse未反映検証記録

- **確認日**: 2026-07-25
- **対象ツール**: Microsoft Designer
- **対象ファイル**: `src/content/tools/microsoft-designer.md`(9) vs `src/pages/categories/image-generation/index.astro:122`

## 監査指摘
DB`commercialUse: "no"`（確定・非商用限定）だが、カテゴリ一覧の`commercial`列は「要確認」の定型文言のまま。監査は「他ツール行も同様の定型文言で個別欠陥ではない」と注記し、カテゴリページ一括棚卸しを推奨していた。

## DB値
`commercialUse: "no"`
`commercialUseNote`: "Microsoft Designer利用規約（Designer for Web Image Generator and Brand Kit Terms）では、Designerの利用は個人的利用に限定され、trade or commerce（取引・商業）の過程での利用は認められていないと明記されています。公式FAQでも個人的・非商用利用向けと案内されており...最新の利用条件は公式規約でご確認ください。"

## 表示値（修正前）
`commercial: '要確認'`

## 不一致分類
ハードコード未反映（ページが古い）。

## 確認した一次情報
新規の一次情報確認は不要。DBの`commercialUse: "no"`は既存の一次情報確認済み（`verifiedAt`/`officialSourceUrl`充足、利用規約の具体的な条項を引用済み）の確定値。

## 採用した値
DBの`commercialUse: "no"`を採用し、「商用利用不可（個人利用限定）」と表記。

## 修正内容
`src/pages/categories/image-generation/index.astro:122`の`commercial: '要確認'`→`commercial: '商用利用不可（個人利用限定）'`。

## 判断できなかった項目
監査が「他ツール行も同様の定型文言」と指摘する通り、カテゴリ一覧には他にも「要確認」のままのツールが複数存在する（Ideogram, SeaArt AI, NightCafe, Playground AI, Clipdrop, Tensor.Art等）。これらはAUD-32の対象ツール（Microsoft Designer）ではないため、今回は変更していない。カテゴリページ全体の一括棚卸しは監査第8章でも「別タスク」として扱われており、本バッチの対象外。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
カテゴリページがハードコード配列（`getCollection`不使用）のため、DB更新の反映漏れが構造的に起きやすい（AUD-15/16/20/25/30と同根）。「要確認」の定型文言が複数ツールに残存している問題は、次回以降のバッチでカテゴリページ全体の一括棚卸しタスクとして扱うことを推奨する。
