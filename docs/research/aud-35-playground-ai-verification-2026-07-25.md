# AUD-35 Playground AI カテゴリ一覧commercialUse未反映検証記録

- **確認日**: 2026-07-25
- **対象ツール**: Playground AI
- **対象項目**: commercialUse
- **監査指摘**: DBに詳細な確定情報（`limited`、無料は非商用限定）があるが、カテゴリ一覧の`commercial`列が「要確認」のまま粒度が粗い。

## DB値
`commercialUse: "limited"`
`commercialUseNote`: 公式料金ページで無料プランは「Non-commercial use（非商用のみ）」、Pro/Pro Plusプランでは「World-wide, royalty free license」として商用利用が案内されている旨を明記。

## 表示値（修正前）
`src/pages/categories/image-generation/index.astro:127` `commercial: '要確認'`

## 不一致分類
ハードコード未反映（ページが古い）。

## 一次情報
新規確認は不要。DBの`commercialUse`/`commercialUseNote`は既に公式料金ページ・利用規約の具体的な条項を引用した確定情報。

## 採用した値
DBの内容を要約し「無料:非商用のみ／Pro以上:商用可（案内あり）」と表記。

## 修正内容
`src/pages/categories/image-generation/index.astro:127`
- 修正前: `commercial: '要確認'`
- 修正後: `commercial: '無料:非商用のみ／Pro以上:商用可（案内あり）'`

## 修正しなかった内容
同ページの`freeCount`/`smartphone`等の詳細補助テーブル（145行目付近）は今回AUD-35の対象外のため変更していない。

## 判断できなかった項目
なし。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
カテゴリページのハードコード構造による反映漏れ（AUD-15/16/20/25/30/32と同根）。

## 他AUDとの関係
AUD-32（Microsoft Designer commercialUse未反映）と同型のパターン。
