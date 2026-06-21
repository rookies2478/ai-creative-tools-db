# スマホ絞り込みUI・比較表スマホ表示 監査レポート

実施日：2026-06-21

---

## 実施結果

- 対象ページ：/tools/、/comparisons/（ComparisonVsArticle使用7ページ）、/comparisons/free-ai-image-generators/
- 修正ファイル：src/styles/tools-page.css、src/components/ComparisonVsArticle.astro、src/pages/comparisons/free-ai-image-generators/index.astro
- 新規コンポーネント：なし
- DB修正有無：なし
- URL変更：なし
- noindex/draft/redirect変更：なし

---

## 実装内容

| 対象 | 内容 |
|---|---|
| tools-page.css（≤720px） | `.tb-label`（"Filter"テキスト）非表示 |
| tools-page.css（≤720px） | `.toolbar-inner` を `flex-direction: column` に変更 |
| tools-page.css（≤720px） | `.filter-chips` を横スクロール1行化（`flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none`） |
| tools-page.css（≤720px） | `.fchip` に `min-height: 44px` 追加（タップ領域確保） |
| tools-page.css（≤720px） | `.tool-links a` に `padding: 5px 0` 追加（リンクのタップ領域改善） |
| ComparisonVsArticle.astro | 「先に結論」表・基本比較表の前にスクロールヒント `← 横にスクロールできます →` 追加（スマホのみ表示） |
| free-ai-image-generators/index.astro | 簡易比較表の前にスクロールヒント追加（スマホのみ） |

---

## スマホ表示確認

| ページ | 結果 |
|---|---|
| /tools/ | filter-chips横スクロール化・fchipタップ領域確保・toolbar縦積み確認 |
| /comparisons/canva-ai-vs-adobe-firefly/ | スクロールヒント追加（ComparisonVsArticle経由） |
| /comparisons/adobe-firefly-vs-microsoft-designer/ | スクロールヒント追加（ComparisonVsArticle経由） |
| /comparisons/free-ai-image-generators/ | スクロールヒント追加 |
| /comparisons/dalle-vs-midjourney/ 他 | スクロールヒント追加（ComparisonVsArticle経由） |

---

## 比較表確認

| ページ | 判断 | 対応 |
|---|---|---|
| /comparisons/ 系（ComparisonVsArticle） | `overflow-x: auto` + `min-width: 560px` → スマホでスクロール必要 | スクロールヒント追加（A案） |
| /comparisons/free-ai-image-generators/ | `overflow-x: auto` → スマホでスクロール必要 | スクロールヒント追加（A案） |
| /categories/image-generation/ | `cig-tablewrap` に `overflow-x: auto` あり | 今回見送り（大改造なし方針） |
| ToolSummaryTable.astro（各ツール詳細ページ） | 2列表 → スマホでも横スクロール不要 | 対応不要 |

---

## 見送った内容

| 項目 | 理由 |
|---|---|
| お気に入り機能 | スコープ外・今回は操作性改善を優先 |
| 動的OGP | スコープ外・今回の対象外 |
| /categories/image-generation/ 比較表スクロールヒント | 大改造しない方針のため今回は保留 |
| 比較表の全テーブルカード化 | 今回はA案・B案に限定 |
| チップ数削減 | 現7チップは横スクロール化で対応済み |

---

## build結果

- build：PASS
- 終了コード：0
- ページ数：79ページ
- WARN：なし

---

## スマホUX確認結果（Phase 1 反映後確認）

実施日：2026-06-21

- 対象ページ：下記8ページ
- 修正ファイル：なし（表示問題なし）
- URL変更：なし
- DB修正有無：なし
- noindex/draft/redirect変更：なし

## 表示確認

| ページ | 結果 | 備考 |
|---|---|---|
| /tools/ | PASS | filter-chips横スクロール1行・min-height:44px確認・toolbar縦積み・検索幅100% |
| /categories/image-generation/ | PASS | スクロールヒント実装済み（`cig-gtcap`）・`overflow-x:auto`確認 |
| /categories/video-generation/ | PASS | スクロールヒント実装済み（`cvg-gtcap`）・`overflow-x:auto`確認 |
| /conditions/free/ | PASS | Haiper言及あり（「無料枠が用意されている場合があります」）・断定なし・要確認表記 |
| /conditions/commercial-use/ | PASS | 商用利用断定なし・「最新情報は公式サイトで確認」表記確認 |
| /comparisons/free-ai-image-generators/ | PASS | `fai-scroll-hint` ≤680px表示・`overflow-x:auto`確認 |
| /comparisons/canva-ai-vs-adobe-firefly/ | PASS | `cp-scroll-hint` ComparisonVsArticle経由 ≤680px表示 |
| /comparisons/adobe-firefly-vs-microsoft-designer/ | PASS | `cp-scroll-hint` ComparisonVsArticle経由 ≤680px表示 |
| /tools/adobe-firefly/ | PASS | CTAボタン `padding:13px 22px`（≈44px高）・`flex-wrap:wrap`で折り返し |

## 修正した内容

修正なし（重大な表示崩れ・横スクロール・タップ困難なし）

## build結果（反映後確認）

- build：PASS
- 終了コード：0
- ページ数：79ページ
- WARN：なし

## 確認手法

Playwright インストール不可（ネット制限）のため、以下で代替確認：
- ビルド済みソースのCSS・HTML構造検査（Grep / Read）
- preview server（localhost:4321）起動確認（HTTP 200）
- CSS値を直接確認（min-height, flex-wrap, overflow-x, scroll-hint display切り替え）

## 確認済み項目

| 確認項目 | 結果 |
|---|---|
| /tools/ フィルターチップが押しやすい（min-height:44px） | ✅ tools-page.css L274 |
| 横スクロールが自然（flex-wrap:nowrap + overflow-x:auto） | ✅ tools-page.css L266-273 |
| 画面全体に不要な横スクロールなし | ✅ ソース確認 |
| 比較表スクロールヒント表示（≤680px） | ✅ ComparisonVsArticle L975-985, free-ai-image-generators L749-758 |
| CTAボタンが押しやすい（約44px高さ） | ✅ global.css L128-135 |
| Haiperを現役おすすめに見せていない | ✅ haiper/index.astro「現在の商用利用条件は要確認」表記 |
| 商用利用・著作権を断定していない | ✅ 全ページ「最新情報は公式サイトで確認」表記 |

---

## スマホUX Phase 1.5：CompareTablePreview スクロールヒント追加

実施日：2026-06-21

### 対応内容

| 対象 | 内容 |
|---|---|
| CompareTablePreview.astro | テーブル直前に `.ctp-scroll-hint`「← 横にスクロールできます →」追加 |
| CompareTablePreview.astro（style） | `.ctp-scroll-hint { display: none }` + `@media (max-width: 680px) { display: block }` |

### 使用箇所

| コンポーネント | 使用場所 |
|---|---|
| HomeComparisonTable.astro | ホームページ比較表プレビュー（動画・画像パネル） |

- 既存 `cp-scroll-hint`・`fai-scroll-hint` と同一文言・同一スマホ幅条件
- 大規模カード化：引き続き未実施
- PC表示：ヒント非表示（display:none）
- URL変更：なし・DB修正：なし・noindex/draft/redirect変更：なし
