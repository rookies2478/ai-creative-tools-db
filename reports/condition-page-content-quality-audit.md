# 条件ページ本文品質改善レポート

## 確認日
2026-06-22

## 対象ページ
- /conditions/free/
- /conditions/commercial-use/
- /conditions/no-watermark/
- /conditions/japanese/

## 改善概要
比較表だけの薄いページに見えないよう、関連リンク・FAQを強化。
DB・URL・pricingStatus・noindex・sitemapは変更なし。

## Free条件ページ
- 変更ファイル：src/pages/conditions/free/index.astro
- 選び方ガイド：既存FAQで十分（注意点5点・商用利用・日本語・透かし・登録不要など7問）
- 関連リンク追加：`/comparisons/free-ai-image-generators/`（無料AI画像生成ツール比較）をcustomRelatedに追加
- FAQ追加：なし（既存7問が「無料プランだけで商用利用できますか？」相当を含む）
- Haiper確認：カード非表示維持（freePlan=trueでないため表示なし）

## Commercial-use条件ページ
- 変更ファイル：src/components/CommercialUse.astro
- 選び方ガイド：既存ポイント6項目（公式規約・プラン差・透かし・日本語・権利・用途別）維持
- 関連リンク追加：`/comparisons/canva-ai-vs-adobe-firefly/` を DEFAULT related に追加、`/categories/image-generation/` も追加
- FAQ追加：1問追加「商用利用の可否だけ確認すれば十分ですか？」（入力素材・第三者素材・透かし・クレジット表記義務への言及含む）
- Haiper確認：service_changed note維持（CommercialUse DEFAULT_TOOLS のHaiperカードのnote維持）

## No-watermark条件ページ
- 変更ファイル：src/components/NoWatermark.astro
- 選び方ガイド：既存ポイント5項目（プラン・機能・用途・商用利用は別問題・公式確認）維持
- 関連リンク：既存DEFAULT related に `/guides/watermark-credit-guide/` ・`/conditions/commercial-use/` 含む
- FAQ追加：1問追加「透かしがなければ自由に使えますか？」（商用利用条件・クレジット表記は別問題と明示）
- Haiper確認：非掲載維持（DEFAULT_TOOLSにHaiperなし）

## Japanese条件ページ
- 変更ファイル：src/components/Japanese.astro
- 日本語対応3分類（UI/プロンプト/ドキュメント）：既存TypeCardで実装済み
- 選び方ガイド：既存ポイント5項目（UI・プロンプト・画像内文字・商用利用・ドキュメント）維持
- 関連リンク：既存DEFAULT related に `/guides/japanese-ai-image-tools/` ・`/conditions/commercial-use/` 含む
- FAQ追加：1問追加「日本語対応なら画像内の日本語文字も得意ですか？」（UI対応≠文字生成と明示）
- Haiper確認：DEFAULT_TOOLSのHaiperは ui='×' prompt='○' docs='×' ja='unknown'（「要確認」表示）維持

## FAQ追加・変更
| ページ | 追加Q | 追加理由 |
|--------|-------|----------|
| free | なし | 既存7問が仕様をカバー済み |
| commercial-use | 商用利用の可否だけ確認すれば十分ですか？ | 入力素材・透かし・クレジット表記への誘導が必要 |
| no-watermark | 透かしがなければ自由に使えますか？ | 透かし≠商用利用OKの混同を解消 |
| japanese | 日本語対応なら画像内の日本語文字も得意ですか？ | UI対応≠文字生成能力の混同を解消 |

## Haiper確認
| ページ | 状態 |
|--------|------|
| free | 非表示維持（freePlan条件不一致） |
| commercial-use | service_changed note維持 |
| no-watermark | 非掲載維持 |
| japanese | 要確認表示維持 |
| noindex/sitemap除外 | 変更なし |

## 禁止表現確認
新規追加テキストに以下なし：
- 商用利用できます ✓
- 著作権的に問題ありません ✓
- 安全です / 自由に使えます ✓
- 透かしなしで使えます ✓
- 日本語対応です（断定文） ✓

すべて「場合があります」「別途確認が必要」「法的助言ではありません」で記載。

## 残課題
- なし（今回対象外の改善は別タスクで対応）

## 判定
PASS
