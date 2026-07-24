# AUD-16 Hailuo AI カテゴリ一覧検証記録

- **確認日**: 2026-07-25
- **対象ツール**: Hailuo AI
- **対象ファイル**: `src/pages/categories/video-generation/index.astro:103`

## 監査指摘
DB（`src/content/tools/hailuo-ai.md`）で`commercialUse: "paid-only"`、`freePlan: "limited"`、`lowestPaidPlan: "Standard $14.99/月（USD・通常価格。期間限定割引あり）"`が全て確定情報だが、カテゴリ一覧ページでは`commercial`/`free`/`price`が全て「要確認」「要公式確認」のプレースホルダーのまま。

## DB値
- `freePlan: "limited"`
- `lowestPaidPlan: "Standard $14.99/月（USD・通常価格。期間限定割引あり）"`
- `commercialUse: "paid-only"`
- `commercialUseNote`: 公式payment-policy.htmlで有料プラン（Standard以上）加入者が商用利用可と記載。

## ページ値（修正前）
`commercial: '要確認'`, `free: '要確認'`, `price: '要公式確認'`。

## 一次情報
新規の一次情報確認は不要。DBの`verifiedAt`/`officialSourceUrl`充足済みであり、DB自体が一次情報確認済みの正本。

## 採用した値
DBの3フィールドをそのまま反映。`price`はカテゴリ一覧の他ツール表記（例: Luma AI「$30/月（Plus・月払い）」）に合わせ「Standard $14.99/月〜（USD）」と表記。

## 修正内容
`src/pages/categories/video-generation/index.astro:103`
- `commercial: '要確認'` → `'有料プランのみ'`
- `free: '要確認'` → `'無料枠あり'`
- `price: '要公式確認'` → `'Standard $14.99/月〜（USD）'`

## 判断できなかった項目
なし。

## HOLD理由
なし（FIXED）。

## DB設計または構造上の課題
AUD-15と同根。カテゴリページのハードコード構造がDB更新の反映漏れの根本原因。
