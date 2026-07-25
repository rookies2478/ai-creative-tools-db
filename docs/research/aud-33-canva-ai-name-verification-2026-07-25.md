# AUD-33 Canva AI画像生成 name表記ゆれ検証記録

- **確認日**: 2026-07-25
- **対象ツール**: Canva AI画像生成
- **対象ファイル**: `src/content/tools/canva-ai-image-generator.md`(name) vs `src/pages/comparisons/canva-ai-vs-adobe-firefly/index.astro`

## 監査指摘
DB正本の`name`は`"Canva AI画像生成"`だが、比較記事`canva-ai-vs-adobe-firefly`内で短縮表記「Canva AI」が使われていた（表記ゆれ、実害小）。

## DB値
`name: "Canva AI画像生成"`

## 表示値（修正前）
`src/pages/comparisons/canva-ai-vs-adobe-firefly/index.astro`内で以下6箇所が短縮表記「Canva AI」だった。
- L119 `toolAName="Canva AI"`
- L124, L127 `candidate: 'Canva AI'`（quickDecisionRows）
- L132 `toolName: 'Canva AI'`（conclusionA）
- L160 `<h3 class="cp-card-h3">Canva AI</h3>`
- L221 `toolAName="Canva AI"`（SamePromptImageComparison）

## 不一致分類
表記ゆれ。

## 確認した一次情報
不要。DB正本のname値をそのまま採用する表記統一のみ。

## 採用した値
DBの`name: "Canva AI画像生成"`を採用。

## 修正内容
`src/pages/comparisons/canva-ai-vs-adobe-firefly/index.astro`内の6箇所すべてを「Canva AI」→「Canva AI画像生成」に統一。他の比較記事・ページには同様の短縮表記は監査本文で指摘されていないため変更していない。

## 判断できなかった項目
なし。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
特になし。今回の修正で対象記事内の表記ゆれは解消。
