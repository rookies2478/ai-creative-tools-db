# Canva AI 料金一次情報確認記録（2026-07-24）

## 確認日
2026-07-24

## AUD-08の対象表記
- P1: `src/pages/comparisons/canva-ai-vs-adobe-firefly/index.astro`(51)の比較表セルが旧USD表記「$15/月〜（Canva Pro・月払い）／$120/年（年払い）」のまま残置。
- DB本体（`src/content/tools/canva-ai-image-generator.md`）も一部フィールド（`paidPlanNote`(36)、本文料金表(231)）に同じ旧USD表記が残っており、`lowestPaidPlan`(7)・`japanBilling`セクション（163-179、2026-07-13 日本課金監査で更新済み）とDB内部で不整合だった。
- 同一の旧USD表記が以下にも残置していることを全文grep（`\$15/月|\$120/年|15/月〜|120/年`）で確認：
  - `src/content/guides/commercial-use-cost-comparison.md`（67, 84, 106行目、Canva AI行）
  - `src/pages/guides/commercial-use-cost-comparison/index.astro`（22, 60, 103行目、Canva AI行、mdの表示側ミラー）
  - `src/pages/categories/image-generation/index.astro`（117行目、Canva AIカードのprice欄）
  - `src/components/CanvaAiTool.astro`（オーファンコンポーネント、AUD-18で別途指摘済み。今回はAUD-08スコープ外のため未修正）
  - `src/content/tools/playground-ai.md`, `src/pages/tools/playground-ai/index.astro` に類似のUSD表記があるが、これはPlayground AIの実際の料金であり別ツール・別問題。**Canva AI以外は変更していない。**

## 確認した公式情報
- `https://www.canva.com/ja_jp/pricing/` をWebFetchで取得試行。JS描画に依存したページのため、取得結果は「ブラウザ更新を促す」静的シェルのみで料金情報を抽出できず（公式ページから直接の価格確認は不可）。
- WebSearchで補助的に確認した第三者比較サイト（Designrr, Vendr, StockPhotoSecrets等、いずれも二次情報）では、Canva Pro（グローバル/米ドル）月額$18・年払い相当$144/年という記載があり、DBに残っていた旧表記「$15/月・$120/年」自体が既に古い可能性を示唆している。ただし二次情報のみで確定はできないため、本記録・サイト表記には採用していない。
- 一次情報として直接確認できたのは、本DBが2026-07-13の日本課金監査（`docs/dq-check`系メモ、`japanBilling`フィールド）で既に確認済みの「App Store日本のアプリ内課金でCanva Proが¥1,180/月・¥11,800/年」という情報のみ（`japanBilling.pricingNote`、`sourceUrls`にApp Store日本のURLあり）。

## 対象地域・表示通貨
- 対象地域: 日本（本サイトの主要読者層）。
- 表示通貨: 購入経路により異なる。
  - App Store（iOS、日本）: JPY建てで確認済み（¥1,180/月、¥11,800/年）。
  - Web契約: 表示通貨・請求通貨は今回も一次情報で確認できず「要公式確認」のまま。

## Canva Free / Pro / Business / Enterprise / 旧Teams
- Canva Free: DBの`freePlan: "limited"`（無料プランで一定回数のAI生成、Dream Lab月20回程度）。今回変更なし。
- Canva Pro: 唯一、App Store日本の価格（¥1,180/月・¥11,800/年）が一次情報で確認済み。
- Canva Business / Enterprise: 今回は価格の一次情報確認対象外（AUD-08はProプランの表記のみが問題）。DB本文中に「現行プラン名はCanva Pro／Canva Business等」との記述があり、旧Canva Teams表記への言及・修正は本タスクのスコープ外（該当箇所なし）。
- 旧Canva Teams: DB・修正対象ファイル内に旧Teams表記は見当たらず、対応不要。

## 無料トライアル
- 一次情報未確認。DBの`freePlan`はboolean/limited/unknownの粒度のみで、トライアル有無を区別するフィールドがない（監査報告書 DB設計上の問題3、AUD-08のスコープ外）。今回のサイト側修正でも無料トライアルの有無を断定する表現は追加していない。

## 月払い・年払い・年払い月額換算
- 月払い: ¥1,180/月（App Store日本、確認済み）。
- 年払い: ¥11,800/年（App Store日本、確認済み）。年払い時の月額換算（¥11,800÷12≈¥983/月）は一次情報に明記されていないため、本記録・サイト表記では計算値を新たに断定表示せず、年額そのもの（¥11,800/年）を表記するに留めた。
- Web契約時の月払い・年払い価格は要公式確認のまま。

## 税の扱い
- App Store表示価格の税込/税別区分は一次情報で明記を確認できず、既存DBの`japanBilling.taxDisplay: "unknown"`を維持。

## AI機能の料金上の位置づけ
- 「Canva AI」は独立商品ではなく、Canva Pro/Business等の既存プラン内でのAI機能（Premium AI tools、Dream Lab等）の利用枠として提供されている。「Canva AI 月額○円」という単独契約商品的表現は使用していない（既存のトーンを維持）。

## 判断できなかった項目
- Web契約時の表示通貨・価格・税込表記
- 年払い時の月額換算値（公式な明記なし）
- Canva Business/Enterpriseの現行価格
- 無料トライアルの有無・期間

## DBで採用する値（このタスクでの修正内容）
- `src/content/tools/canva-ai-image-generator.md`
  - `paidPlanNote`（36行目）: 旧「Canva Pro $15/月〜（月払い）／$120/年（年払い）。」→ 新「Canva Pro ¥1,180/月〜・¥11,800/年〜（App Store日本の公式表記）。Web契約時の価格・通貨は要公式確認です。」
  - 本文料金表（231行目）: 旧「$15/月〜」→ 新「¥1,180/月〜（App Store日本、Web契約は要公式確認）」
- `lowestPaidPlan`（7行目）・`japanBilling`セクション（163-179行目）は既に正しいため変更なし。

## サイトで採用する表現
- `src/pages/comparisons/canva-ai-vs-adobe-firefly/index.astro`(51): 旧「$15/月〜（Canva Pro・月払い）／$120/年（年払い）」→ 新「¥1,180/月〜（Canva Pro・App Store日本のアプリ内課金）。Web契約の通貨は要公式確認」（同記事内の他箇所(87-88,133,155)と表記統一）
- `src/content/guides/commercial-use-cost-comparison.md`（67,84,106、Canva AI行のみ）とそのミラーである`src/pages/guides/commercial-use-cost-comparison/index.astro`（22,60,103、Canva AI行のみ）を同じ¥1,180/月〜表記に統一。1枚あたり単価（旧「約$0.03/枚」）は通貨換算が不要な精度で確認できないため「要公式確認（通貨換算のため参考値外）」に変更。
- `src/pages/categories/image-generation/index.astro`(117、Canva AIカードのprice欄): 旧「$15/月（Canva Pro・月払い）」→ 新「¥1,180/月〜（Canva Pro・App Store日本）」

## 一次情報未確認の項目（サイト表記に反映済みの注記）
- Web契約時の価格・通貨・税込表記 → 「要公式確認」と明記し、固定USD価格を現在価格として残さない方針を徹底。
- 年払い時の月額換算値 → 明記せず、年額（¥11,800/年）のみ表記。
