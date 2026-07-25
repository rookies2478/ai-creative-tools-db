# AUD-36 SeaArt AI カテゴリ一覧freePlan曖昧表現検証記録

- **確認日**: 2026-07-25
- **対象ツール**: SeaArt AI
- **対象項目**: freePlan
- **監査指摘**: DB`freePlan: true`（確定）だが、カテゴリ一覧の補助テーブル（`freeCount`）が「△あり（要確認）」という曖昧表現のままだった。

## DB値
`freePlan: true`
`freePlanNote`: "無料プランあり。詳細な機能制限・クレジット数は変更される可能性があるため、最新の公式サイトをご確認ください。"

## 表示値（修正前）
- `src/pages/categories/image-generation/index.astro:123` `free: '無料枠あり'`（メイン列は既に反映済み）
- `src/pages/categories/image-generation/index.astro:145` `freeCount: '△あり（要確認）'`（補助テーブルが未反映）

## 不一致分類
ハードコード未反映（ページが古い。同一ファイル内でメイン列は既に修正済みだが補助テーブルが未反映という内部不整合）。

## 一次情報
新規確認は不要。DBの`freePlan: true`は既存の一次情報確認済みの確定値。

## 採用した値
DBの`freePlan: true`を反映し「○あり」と表記（同テーブル内でStable Diffusion行が使用している「○あり（形態による）」に準じた確信度の高い記号）。

## 修正内容
`src/pages/categories/image-generation/index.astro:145`
- 修正前: `freeCount: '△あり（要確認）'`
- 修正後: `freeCount: '○あり'`

## 修正しなかった内容
同テーブルの他のツール行（leonardo-ai, dalle, ideogram等）も同様に`'△あり（要確認）'`だが、それらはAUD-36の対象外（DB値が"true"や"limited"等さまざまで個別確認が必要）のため変更していない。

## 判断できなかった項目
なし。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
同一カテゴリページ内に「メイン一覧テーブル」と「補助詳細テーブル」の2つの類似データ表現が存在し、片方だけ更新されると内部矛盾が生じる構造（AUD-22 NightCafeのpricingSourceUrl/japanBilling.pricingUrl矛盾と同型）。

## 他AUDとの関係
AUD-22（NightCafe pricingUrl DB内部矛盾）と類似の「同一ファイル内の複数テーブル間の不整合」パターン。
