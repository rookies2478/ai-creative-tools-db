# AUD-14 Luma AI paidPlanNote 検証記録

- **確認日**: 2026-07-25
- **対象ツール**: Luma AI
- **対象ファイル**: `src/pages/tools/luma-ai/index.astro`（pricing.table、修正前148-154行付近）

## 監査指摘
DB（`src/content/tools/luma-ai.md:42` paidPlanNote）ではPlus $30/月・Pro $90/月・Ultra $300/月が既知情報として記載されているが、ツールページの料金テーブルでは上位プランが「要公式確認」のまま反映されていなかった。

## DB値
`paidPlanNote`: "公式料金ページではPlus $30/月、Pro $90/月、Ultra $300/月が案内されています。…"
`officialSourceUrl`: `https://lumalabs.ai/pricing`（verifiedAt: 2026-06-15）

## ページ値（修正前）
料金テーブル: Plus $30/月のみ記載、上位プランは「要公式確認」×2セル。

## 一次情報
- 情報源: `https://lumalabs.ai/pricing`（公式料金ページ、WebFetchで直接取得）
- 確認日: 2026-07-25
- 内容: Plus $30/月、Pro $90/月、Ultra $300/月（年払い割引あり）。DB記載値と完全一致を確認。

## 採用した値
Pro $90/月・Ultra $300/月をそのまま採用（DBのpaidPlanNoteと公式ページが一致）。

## 修正内容
`src/pages/tools/luma-ai/index.astro` の料金テーブルに Pro/Ultra 行を追加し「要公式確認」の1行を具体値2行に置き換え。

## 判断できなかった項目
なし。

## HOLD理由
なし（FIXED）。

## DB設計または構造上の課題
特になし。paidPlanNoteのような自由記述フィールドはページ側への反映が手動同期依存であり、AUD-14はその典型例。将来的にはpaidPlanNoteの構造化（プラン名・価格の配列化）を検討の余地あり。
