# スマホ比較表 モバイル読みやすさ監査

**監査日：** 2026-06-21  
**監査者：** Claude Code  
**対象：** 比較表を含む主要ページ・コンポーネント

---

## 対象ファイル

- `src/pages/categories/image-generation/index.astro`
- `src/pages/categories/video-generation/index.astro`
- `src/pages/comparisons/free-ai-image-generators/index.astro`
- `src/pages/comparisons/canva-ai-vs-adobe-firefly/index.astro`
- `src/pages/comparisons/adobe-firefly-vs-microsoft-designer/index.astro`
- `src/pages/comparisons/dalle-vs-midjourney/index.astro`
- `src/pages/comparisons/midjourney-vs-adobe-firefly/index.astro`
- `src/components/ComparisonVsArticle.astro`
- `src/components/ToolSummaryTable.astro`
- `src/components/CompareTablePreview.astro`

---

## 監査結果サマリー

| 項目 | 件数 |
|---|---:|
| 監査対象テーブル | 13 |
| スクロールヒントなし（要対応） | 4 |
| スクロールヒントあり | 9 |
| カード型化候補 | 0（今回見送り） |
| 軽微修正実施 | 4 |
| 現状維持 | 9 |

---

## テーブル別監査結果

### categories/image-generation/index.astro

| テーブル名 | 列数 | 行数 | min-width | スクロールヒント | mobileRisk | 判定 | 推奨対応 |
|---|---:|---:|---|---|---|---|---|
| 用途別おすすめ早見表 | 5 | 7 | 880px | **なし→追加済み** | high | B | スクロールヒント追加 ✅ |
| ツールカテゴリ比較表 | 4 | 3 | 720px | **なし→追加済み** | medium | B | スクロールヒント追加 ✅ |
| 横断比較表 | 8 | 16 | 1000px | あり | medium | C | 現状維持 |
| 主要ツール特徴表 | 3 | 8 | 760px | あり | low | C | 現状維持 |

**備考：** 横断比較表（8列・1000px）はスクロールヒントあり。「商用利用条件」「日本語対応」「透かし」が右側にあるが、表直前に説明文あり。重要判断軸の「無料枠」は左側4列目にあり許容範囲。

### categories/video-generation/index.astro

| テーブル名 | 列数 | 行数 | min-width | スクロールヒント | mobileRisk | 判定 | 推奨対応 |
|---|---:|---:|---|---|---|---|---|
| 用途別おすすめ早見表 | 5 | 7 | 880px | **なし→追加済み** | high | B | スクロールヒント追加 ✅ |
| ツールカテゴリ比較表 | 4 | 3 | 720px | **なし→追加済み** | medium | B | スクロールヒント追加 ✅ |
| 横断比較表 | 5 | ~12 | 1100px | あり | medium | C | 現状維持 |
| 主要ツール特徴表 | 3 | ~8 | 760px | あり | low | C | 現状維持 |

**備考：** video-generation の横断比較表は min-width:1100px と特に広い。スクロールヒントあり・表直前説明あり。

### comparisons/free-ai-image-generators/index.astro

| テーブル名 | 列数 | 行数 | min-width | スクロールヒント | mobileRisk | 判定 | 推奨対応 |
|---|---:|---:|---|---|---|---|---|
| 簡易比較表 | 8 | 14 | 780px | あり | high | B | 列順見直し候補 |

**備考：** 8列のうち「無料プラン商用」が col6（スマホで隠れる位置）にあった。優先度低い「生成後の編集」（◯/△のみ）と入れ替えを実施。新列順：ツール名→無料枠の種類→透かし→日本語対応→**無料プラン商用**→生成後の編集→商用利用メモ→詳細CTA。

### free-ai-image-generators 列順監査結果

| 項目 | 内容 |
|---|---|
| 変更前列順 | ツール名 / 無料枠の種類 / 透かし / 日本語対応 / 生成後の編集 / 無料プラン商用※1 / 商用利用メモ※2 / 詳細CTA |
| 変更後列順 | ツール名 / 無料枠の種類 / 透かし / 日本語対応 / **無料プラン商用※1** / 生成後の編集 / 商用利用メモ※2 / 詳細CTA |
| 判定 | B：列順軽微調整実施 |
| 理由 | 商用利用条件（高優先度）が col6 でモバイルで隠れていた。生成後の編集（◯/△のみ・低優先度）と入れ替えで改善 |
| 実施内容 | theadとtbodyのcol5・col6を入れ替え（2箇所のみ） |
| 断定表現 | なし（変更前から存在しない） |
| build結果 | PASS / 終了コード0 / 79ページ / WARNなし（2026-06-21） |

### comparisons/ — ComparisonVsArticle.astro 共通

| テーブル名 | 列数 | min-width | スクロールヒント | mobileRisk | 判定 | 推奨対応 |
|---|---:|---|---|---|---|---|
| 先に結論テーブル（quickDecision） | 3 | 420px | あり | low | C | 現状維持 |
| 基本比較表 | 3 | 560px | あり | low | C | 現状維持 |

**備考：** ComparisonVsArticle はコンポーネント側でスクロールヒントを管理。列数が少なく（3列）、左端「比較項目」が常に見える構造。スマホでも情報把握しやすい。

### コンポーネント

| コンポーネント | テーブル名 | 列数 | min-width | スクロールヒント | mobileRisk | 判定 | 推奨対応 |
|---|---|---:|---|---|---|---|---|
| CompareTablePreview.astro | ツール比較プレビュー | 6 | 560px | あり（680px以下で表示） | medium | C | 現状維持 |
| ToolSummaryTable.astro | 比較ポイント早見表 | 2 | なし | なし（2列不要） | low | C | 現状維持 |

**備考：** ToolSummaryTable は2列縦並びのため横スクロール不要。overflow-x-auto はあるが実際には使われない。

---

## スマホ改善優先ランキング

| 順位 | ページ | 対象表 | 課題 | 推奨対応 |
|---:|---|---|---|---|
| 1 | /categories/image-generation/ | 用途別おすすめ早見表（5列・880px） | スクロールヒントなし | スクロールヒント追加 ✅ 実施済み |
| 2 | /categories/video-generation/ | 用途別おすすめ早見表（5列・880px） | スクロールヒントなし | スクロールヒント追加 ✅ 実施済み |
| 3 | /categories/image-generation/ | ツールカテゴリ比較表（4列・720px） | スクロールヒントなし | スクロールヒント追加 ✅ 実施済み |
| 4 | /categories/video-generation/ | ツールカテゴリ比較表（4列・720px） | スクロールヒントなし | スクロールヒント追加 ✅ 実施済み |
| 5 | /comparisons/free-ai-image-generators/ | 簡易比較表（8列・780px） | 右端2列が長文・情報密度高 | 列順見直し候補（次回対応） |

---

## 軽微修正 実施内容

| ファイル | 追加箇所 | 内容 |
|---|---|---|
| `src/pages/categories/image-generation/index.astro` | 用途別早見表（guide）直前 | `<p class="cig-gtcap">← 横にスクロールできます →</p>` 追加 |
| `src/pages/categories/image-generation/index.astro` | カテゴリ比較表（diff）直前 | `<p class="cig-gtcap">← 横にスクロールできます →</p>` 追加 |
| `src/pages/categories/video-generation/index.astro` | 用途別早見表（guide）直前 | `<p class="cvg-gtcap">← 横にスクロールできます →</p>` 追加 |
| `src/pages/categories/video-generation/index.astro` | カテゴリ比較表（diff）直前 | `<p class="cvg-gtcap">← 横にスクロールできます →</p>` 追加 |

**既存スタイル再利用：** `cig-gtcap` / `cvg-gtcap` クラスは各ページの既存CSSに定義済み（横断比較表・特徴表で使用中）。新規CSSは不要。

---

## 見送った内容

| 項目 | 理由 |
|---|---|
| free-ai-image-generators 簡易比較表のカード型化 | 禁止事項（比較表の全面カード化は行わない） |
| 横断比較表（8列）の分割表示 | 大規模テーブル構造変更に相当・テーブル構造変更禁止 |
| CompareTablePreview の列削減 | DBコンポーネント共通使用・DB構造変更なし方針 |
| midjourney-vs-adobe-firefly のインラインテーブル最適化 | ComparisonVsArticle スロット内・影響範囲確認が必要 |

---

## スクロールヒントの文言統一状況

現在のヒント文言：**`← 横にスクロールできます →`**

全対象テーブルでこの文言を統一。既存テーブルも同じ文言を使用しており整合性あり。

---

## Pre-Publish Check 確認結果

| チェック項目 | 結果 |
|---|---|
| URL変更なし | ✅ |
| DB構造変更なし | ✅ |
| noindex/draft/redirect変更なし | ✅ |
| 商用利用・著作権の断定なし | ✅ |
| Haiper表示維持 | ✅（変更なし） |
| 既存スクロールヒントを壊していない | ✅（追加のみ） |
| 新規コンポーネント作成なし | ✅ |
| React/Preact/Nano Stores/Tailwind 導入なし | ✅ |
