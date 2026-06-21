# /tools/ 絞り込み・CTA・スマホ比較表 監査レポート

実施日: 2026-06-21

---

## 1. /tools/ 絞り込みUI現状

| 確認項目 | 状態 | 備考 |
|---|---|---|
| 選択中チップの視認 | ✓ PASS | `aria-pressed="true"` で背景黒/カテゴリ色に変化 |
| リセット操作の分かりやすさ | △ 要注意 → 修正済み | 「すべて」→「すべて表示」に変更。絞り込み中にリセット導線が不明確だった |
| 絞り込み結果件数 | ✓ PASS | `result-count` で動的更新（N件） |
| 0件時の案内 | ✓ PASS | `imgEmpty`/`vidEmpty` で「条件に一致するツールはありません」表示 |
| スマホタップしやすさ | ✓ PASS | `.fchip { min-height: 44px }` 実装済み |
| 横スクロール操作性 | ✓ PASS | `flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none` |
| 条件名の長さ | ✓ PASS | 最長「商用利用の案内あり」（10文字）。許容範囲 |
| platformLabels 日本語統一 | ✓ PASS | `getPlatformLabel()` で一元管理 |

---

## 2. 詳細ページCTA現状

| 確認項目 | 状態 | 備考 |
|---|---|---|
| 一覧カード→詳細ページ遷移 | ✓ PASS | 「詳しく見る →」リンク統一 |
| ToolSummaryTableのCTA | ✓ PASS | 「料金・利用条件を公式サイトで確認する ↗」統一 |
| 比較表→詳細ページ遷移 | ✓ PASS | ComparisonVsArticle / CompareTablePreview でツール名リンクあり |
| ボタン文言の表記揺れ | ✓ PASS | 「詳しく見る」と「公式サイト ↗」で統一されている |
| 強すぎる表現 | ✓ PASS | 「おすすめ」「今すぐ登録」等なし |
| Haiper通常CTAの有無 | 確認済み | Haiper は ToolsListCard に通常カードとして表示されるが「おすすめ」等の表現はない。現行方針維持 |

---

## 3. スマホ比較表の読みやすさ

| ページ | スクロールヒント | 列数 | 評価 |
|---|---|---|---|
| /comparisons/free-ai-image-generators/ | ✓ `fai-scroll-hint`（720px以下表示） | 6列 | 横スクロールで対応。現状で十分 |
| /categories/image-generation/ | CompareTablePreview使用 → `ctp-scroll-hint` あり | ツール一覧形式 | 問題なし |
| /categories/video-generation/ | 同上 | 同上 | 問題なし |
| /comparisons/canva-ai-vs-adobe-firefly/ | ✓ `cp-scroll-hint`（720px以下表示） | 2列 | 2ツール比較、スマホで読みやすい |
| /comparisons/adobe-firefly-vs-microsoft-designer/ | ✓ `cp-scroll-hint`（720px以下表示） | 2列 | 同上 |

ToolSummaryTable（詳細ページ）: `overflow-x-auto` あり・スクロールヒントなし。2列のみなのでヒント不要。

---

## 4. 軽微修正内容

| ファイル | 修正内容 |
|---|---|
| `src/pages/tools/index.astro` | フィルターチップ「すべて」→「すべて表示」に変更。絞り込み解除の操作がより明確に |

---

## 5. 今回見送った内容

- React / Preact / Nano Stores 導入（禁止）
- localStorageお気に入り実装（禁止）
- 比較表の全面カード化（禁止）
- ToolSummaryTable へのスクロールヒント追加（2列のみ→不要）
- Haiper の表示非表示切り替え（DB変更に該当、禁止）
- フィルター複数選択対応（大規模クライアントサイド実装に該当、今回スコープ外）

---

## 6. 次回改善候補

- フィルター複数選択対応（例：「無料で試せる」AND「日本語対応」の組み合わせ）
- 絞り込み中の「選択中フィルターを解除」インジケーター表示（現状は「すべて表示」クリックが必要）
- free-ai-image-generators 比較表の列数削減（freePlanCommercial と paidPlanCommercial を統合）
- スマホでのフィルターツールバー高さ最適化（toolbar が2段になった場合のコンテンツ押し下げ量）
