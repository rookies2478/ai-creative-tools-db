# カテゴリ・条件ページ 内部導線監査

## 確認日

2026-06-22

---

## 対象ページ

| ページ | 種別 |
|---|---|
| /categories/image-generation/ | カテゴリ |
| /categories/video-generation/ | カテゴリ |
| /categories/video-editing/ | カテゴリ |
| /categories/avatar-video/ | カテゴリ |
| /categories/design/ | カテゴリ |
| /categories/voice-narration/ | カテゴリ |
| /conditions/free/ | 条件 |
| /conditions/commercial-use/ | 条件 |
| /conditions/no-watermark/ | 条件 |
| /conditions/japanese/ | 条件 |
| /tools/index.astro | 参照 |
| src/components/Free.astro | 参照コンポーネント |
| src/components/CommercialUse.astro | 参照コンポーネント |
| src/components/NoWatermark.astro | 参照コンポーネント |
| src/components/Japanese.astro | 参照コンポーネント |

---

## 総評

カテゴリ・条件ページともに主要導線（ツール詳細・比較記事・条件ページ・ガイド）は概ね整備されていた。
コンポーネントに委譲している条件ページはコンポーネント内に導線が適切に実装されている。
3件の軽微修正を実施した。

---

## カテゴリページ確認

| ページ | ツール導線 | 比較記事導線 | 条件導線 | ガイド導線 | カテゴリ間導線 | FAQ | 問題 |
|---|---|---|---|---|---|---|---|
| image-generation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | なし |
| video-generation | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | なし |
| video-editing | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | なし |
| avatar-video | ✅ | ✅ | ✅ | △→✅ | ✅ | ✅ | guides直リンクなし→修正済み |
| design | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | なし |
| voice-narration | ✅ | ✅ | ✅ | △→✅ | ✅ | ✅ | guides直リンクなし→修正済み |

### カテゴリ間相互リンク確認

| ページ | video-gen↔image-gen | video-gen↔video-edit | video-gen↔avatar | image-gen↔design |
|---|---|---|---|---|
| image-generation | ✅ | — | — | ✅ |
| video-generation | ✅ | ✅ | ✅ | — |
| video-editing | ✅ | ✅ | ✅ | — |
| avatar-video | ✅ | ✅ | — | — |
| voice-narration | ✅ | ✅ | ✅ | ✅ |

---

## 条件ページ確認

条件ページ（/conditions/）は各専用コンポーネントに委譲。コンポーネント内にすべての導線が実装されている。

| ページ（コンポーネント） | ツール導線 | 比較記事導線 | カテゴリ導線 | ガイド導線 | 料金表示 | 権利表現 | Haiper | 問題 |
|---|---|---|---|---|---|---|---|---|
| /conditions/free/ (Free.astro) | ✅（slug→/tools/） | ✅ | ✅ | ✅ | 断定なし | 断定なし | リスト掲載・warning未表示△ | 後述 |
| /conditions/commercial-use/ (CommercialUse.astro) | ✅（slug→/tools/） | ✅ | ✅ | ✅ | 断定なし | 断定なし | note更新済み ✅ | 修正済み |
| /conditions/no-watermark/ (NoWatermark.astro) | ✅ | ✅ | ✅ | ✅ | 断定なし | 断定なし | 掲載なし ✅ | なし |
| /conditions/japanese/ (Japanese.astro) | ✅（slug→/tools/） | ✅ | ✅ | ✅ | 断定なし | 断定なし | リスト掲載・warning未表示△ | 後述 |

---

## 関連比較記事導線

| 対象ページ | 比較記事リンク |
|---|---|
| image-generation | free-ai-image-generators / canva-ai-vs-adobe-firefly / midjourney-vs-adobe-firefly 等 ✅ |
| video-generation | runway-vs-kling-ai / runway-vs-pika / invideo-ai-vs-capcut-ai 等 ✅ |
| avatar-video | invideo-ai-vs-capcut-ai ✅ |
| voice-narration | invideo-ai-vs-capcut-ai ✅ |
| /conditions/free/ | Free.astroコンポーネント内に比較記事リンクあり ✅ |
| /conditions/commercial-use/ | CommercialUse.astroコンポーネント内に /comparisons/ リンクあり ✅ |

---

## 商用利用・著作権ガイド導線

| 対象ページ | /guides/commercial-use-copyright/ への導線 |
|---|---|
| image-generation | ✅ 直リンクあり |
| video-generation | ✅ 直リンクあり |
| video-editing | ✅ 直リンクあり |
| avatar-video | ✅ 修正にて追加 |
| voice-narration | ✅ 修正にて追加 |
| design | ✅ あり |
| /conditions/free/ | ✅ FAQおよびcautionNoteに直リンクあり |
| /conditions/commercial-use/ | ✅ relatedリンクあり |
| /conditions/no-watermark/ | ✅ relatedリンクあり |
| /conditions/japanese/ | ✅ relatedリンクあり |

---

## スマホ表示確認

- カテゴリページ・条件ページともにスコープCSSを使用（`.fp-x` / `.cu-x` / `.cp-x` 等）
- taglinksは `flex-wrap: wrap` による折り返しあり
- 比較表はオーバーフロースクロール対応
- ソース確認では崩れの懸念なし

---

## 修正した項目

| ファイル | 修正内容 | 理由 |
|---|---|---|
| src/components/CommercialUse.astro | Haiper noteを更新。「コンシューマー向けWebアプリは2025年2月にシャットダウン」情報を追加 | Haiperが現役商用利用可能ツールとして誤認されるリスク |
| src/pages/categories/avatar-video/index.astro | taglinksに `/guides/commercial-use-copyright/` を追加 | 関連ガイドへの直導線が欠落 |
| src/pages/categories/voice-narration/index.astro | taglinksに `/guides/commercial-use-copyright/` を追加 | 関連ガイドへの直導線が欠落 |

---

## 残課題

| 項目 | 内容 | 優先度 |
|---|---|---|
| Free.astro の Haiper 表示 | `freePlan:'あり'` として掲載。Tool型に note フィールドがなく個別警告不可。slug経由で詳細ページに誘導されるため即時影響は限定的 | 低 |
| Japanese.astro の Haiper 表示 | `ja:'unknown'` として掲載。詳細ページ誘導あり。service_changed 警告なし | 低 |
| avatar-video・voice-narration の比較記事 | invideo-ai-vs-capcut-ai 以外の比較記事リンクが少ない | 低（次回拡充検討） |

---

## 禁止表現チェック

| 表現 | 断定文検出 |
|---|---|
| 商用利用できます | 0件 |
| 著作権的に問題ありません | 0件 |
| 安全です | 0件 |
| 自由に使えます | 0件 |
| 著作権的にクリアです | 0件 |
| 問題ありません | 0件 |

---

## build結果

| 項目 | 値 |
|---|---|
| 終了コード | 0 |
| ページ数 | 79 |
| WARN | なし |
| 実行日時 | 2026-06-22 |

---

## 判定

**PASS_WITH_NOTES**

- カテゴリ・条件ページの主要導線はすべて確認済み
- 軽微修正3件（guides導線追加×2・Haiper note更新×1）実施
- Haiper は CommercialUse条件ページで service_changed 文言を追記済み
- Free.astro / Japanese.astro の Haiper 掲載は残課題（Tool型修正が必要・影響限定的）
- 禁止表現0件
- build 79ページ・終了コード0・WARNなし ✅
