# AUD-34 HeyGen lowestPaidPlan未反映検証記録

- **確認日**: 2026-07-25
- **対象ツール**: HeyGen
- **対象項目**: lowestPaidPlan
- **監査指摘**: DBに`lowestPaidPlan: "Creator $29/月（USD・月払い）／年払い時$24/月"`という既知の確定情報があるが、ツールページの料金テーブルで「要確認（公式Pricing参照）」に丸められていた。意図的な簡略化の可能性ありとして優先度低で記録されていた。

## DB値
`lowestPaidPlan: "Creator $29/月（USD・月払い）／年払い時$24/月"`

## 表示値（修正前）
`src/pages/tools/heygen/index.astro:147`
```
[{ html: 'Creator以上', rk: true }, { html: '要確認（公式Pricing参照）', mono: true }, { html: '商用利用に対応する条件が案内・透かし削除機能あり（要確認）' }],
```

## 不一致分類
料金更新漏れ（DBに既知の確定値があるのにページが未反映）。

## 一次情報
新規確認は不要と判断。DBの`lowestPaidPlan`は既存の一次情報確認済み（`verifiedAt`/`officialSourceUrl`充足）の確定値であり、DB→ページの反映のみ実施。

## 採用した値
DBの`lowestPaidPlan`をそのまま料金テーブルに反映。

## 修正内容
`src/pages/tools/heygen/index.astro:147`
- 修正前: `[{ html: 'Creator以上', ... }, { html: '要確認（公式Pricing参照）', ... }, ...]`
- 修正後: `[{ html: 'Creator', ... }, { html: '$29/月（月払い）／年払い時$24/月', ... }, ...]`

## 修正しなかった内容
プラン名を「Creator以上」から「Creator」に変更したが、Creatorより上位のプラン（Team/Enterprise等）の価格詳細は今回追加していない（DBに確定情報がないため）。

## 判断できなかった項目
Creatorより上位プラン（もしあれば）の価格。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
ツール詳細ページの料金テーブルが手動記述のため、DBの`lowestPaidPlan`更新が自動反映されない構造的な課題（AUD-14と同根）。

## 他AUDとの関係
AUD-14（Luma AI paidPlanNote未反映）と同種の「DB確定値のページ未反映」パターン。
