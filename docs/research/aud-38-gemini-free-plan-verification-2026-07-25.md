# AUD-38 Gemini画像生成 freePlanバッジ粒度不統一検証記録

- **確認日**: 2026-07-25
- **対象ツール**: Gemini画像生成
- **対象項目**: freePlan
- **監査指摘**: DB`freePlan: true`だが、ツール詳細ページのbadgeが「限定的」（`cond`ステータス）となっており、他コンポーネント（Free.astro/JapaneseAiToolsGuide.astro/WatermarkCreditGuide.astro）は「あり」（`ok`ステータス）で統一されている。

## DB値
`freePlan: true`
`freePlanNote`: "Google AIの無料プランでもGeminiアプリの画像生成・編集が案内されています。利用上限・モデル・機能はプランや時期によって変わる可能性があるため、最新の公式情報をご確認ください。"

## 表示値（修正前）
- `src/components/Free.astro:102`: `freePlan:'あり'`
- `src/components/JapaneseAiToolsGuide.astro:124`: `freePlan: { s: 'ok', label: '〇 無料プランあり' }`
- `src/components/WatermarkCreditGuide.astro:174`: `freePlan: { s: 'ok', label: '〇 無料プランあり' }`
- `src/pages/tools/gemini-image-generation/index.astro`: 4箇所（L68 specs, L83 basicInfo, L133 quickTable, L209 versusTable）で`badge: { s: 'cond', label: '限定的' }`

## 不一致分類
表示記号不統一（`unknown`と`false`の混同ではなく、確定`true`値に対して過度に保守的な`cond`(条件付き)表現を使っている粒度不統一）。

## 一次情報
新規確認は不要。DBの`freePlan: true`は既存の一次情報確認済みの確定値であり、他3コンポーネントも既にこの値を正しく反映している。

## 採用した値
DBの`freePlan: true`を採用し、他3コンポーネントと同じ「あり」表記・`ok`ステータスに統一。

## 修正内容
`src/pages/tools/gemini-image-generation/index.astro`
- L68: `{ s: 'cond', label: '限定的' }` → `{ s: 'ok', label: 'あり' }`
- L83: `{ s: 'cond', label: '限定的' }` → `{ s: 'ok', label: 'あり' }`
- L133: `<span class="tdp-st cond sm">...限定的</span>` → `<span class="tdp-st ok sm">...あり</span>`
- L209（versusTable、Gemini画像生成列のみ）: `'限定的'` → `'あり'`

## 修正しなかった内容
L209のversusTableは DALL·E列・Adobe Firefly列も同じく「限定的」と表示しているが、これらはGemini画像生成以外のツールの値であり、AUD-38の対象外のため変更していない。

## 判断できなかった項目
なし。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
同一ツールの同一フィールド（freePlan）が、ツール詳細ページ内で4箇所に手動でハードコードされており、DB更新時にすべて同期する必要がある構造的リスク（AUD-42「専用astroページのmd本文非表示」と同根の課題）。

## 他AUDとの関係
AUD-42（専用astroページのprops手動指定リスク）と同じ構造的課題の具体例。
