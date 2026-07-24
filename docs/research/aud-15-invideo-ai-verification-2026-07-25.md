# AUD-15 InVideo AI commercialUse検証記録

- **確認日**: 2026-07-25
- **対象ツール**: InVideo AI
- **対象ファイル**: `src/pages/categories/video-generation/index.astro:111`

## 監査指摘
DB（`src/content/tools/invideo-ai.md:9`）で`commercialUse: "paid-only"`（確定）だが、カテゴリ一覧ページの`commercial`列は「要確認」のまま未反映。

## DB値
`commercialUse: "paid-only"`、`commercialUseNote`（144文字程度、有料プランで商用ロイヤリティフリーライセンス付与と明記）、`freePlan: true`、`freePlanNote`（無料プランあり・透かしあり・エクスポート制限あり）。

## ページ値（修正前）
`commercial: '要確認'`, `free: '無料枠あり'`（freeは既に反映済み、commercialのみ未反映）。

## 一次情報
新規の一次情報確認は不要と判断。DB側に`verifiedAt`/`officialSourceUrl`が既に充足しており、DB自体が既存の一次情報確認済み正本のため、DB→ページの反映のみ実施。

## 採用した値
DBの`commercialUse: "paid-only"`を採用し、他ツール行の表記パターン（Hailuo AI等）に合わせ「有料プランのみ」と表記。

## 修正内容
`src/pages/categories/video-generation/index.astro:111`の`commercial: '要確認'`→`commercial: '有料プランのみ'`。

## 判断できなかった項目
なし。

## HOLD理由
なし（FIXED）。

## DB設計または構造上の課題
カテゴリページ（video-generation含む一部）が`getCollection`不使用でハードコード配列のため、DB更新のたびに手動同期が必要（監査報告書 第7章9項と同根）。長期的にはDBドリブン化を推奨。
