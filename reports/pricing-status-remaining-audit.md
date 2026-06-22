# pricingStatus 未設定残数再集計

作成日：2026-06-22  
対象：src/content/tools/ 全26ファイル（実データ）  
方針：DB変更なし。監査・提案のみ。

---

## サマリー

| 項目 | 件数 |
|---|---:|
| 総ツール数 | 26 |
| pricingStatus: confirmed | 10 |
| pricingStatus: partial | 7 |
| pricingStatus: unconfirmed | 3 |
| pricingStatus: no_fixed_price | 1 |
| pricingStatus: service_changed | 1 |
| pricingStatus: フィールドなし（未設定） | **4** |
| 不正値・表記揺れ | 0 |

> 前回バックログ（2026-06-21時点）では未設定9件と記録されていたが、  
> 本日 2026-06-22 の実ファイル確認では **4件** に減少。  
> confirmed/partial等への移行作業が進んだ結果と判断する。

---

## pricingStatus フィールドなし 4件一覧

| slug | pricingModel | currency | lowestPaidPlan | pricingSourceUrl | needsReview | 現在の表示リスク | nextSuggestedStatus | 次回対応 | dbUpdateRecommended |
|---|---|---|---|---|---|---|---|---|---|
| invideo-ai | subscription | USD | 約$20/月〜 | （未設定） | （未設定） | 低〜中（約表記のため断定でない） | partial | 「約$20/月〜」の根拠URL確認後にpartial追加 | hold |
| kling-ai | subscription_credit | USD | $6.99 | （未設定） | （未設定） | 中（金額明記あり・根拠URLなし） | partial | 公式料金ページURL取得後にpartial追加 | hold |
| stable-diffusion | local_free | USD | （未設定） | https://platform.stability.ai/pricing | （未設定） | 低（ローカル無料の案内は安全） | partial | ローカル無料＋クラウドAPIの2軸をpartialで整理 | hold |
| tensor-art | subscription_credit | unknown | （未設定） | https://tensor.art/event/proupdate | （未設定） | 中（イベントURLは料金根拠として弱い） | partial | 専用料金ページURL確認・currency確認後にpartial | hold |

---

## 保留継続

| slug | 理由 |
|---|---|
| invideo-ai | 「約$20/月〜」は曖昧表記。公式料金ページURLなし。金額断定不可のためpartial候補だが根拠URL取得まで保留 |
| kling-ai | 過去に料金ページアクセス不可（HTTP 446）問題あり。現在アクセス可能かは未確認。pricingStatus追加・confirmed化しない |
| stable-diffusion | ローカル実行は無料。クラウドAPIはクレジット制で変動。local_free + partial の2軸整理が必要だが実テストなしに断定しない |
| tensor-art | currency:unknown 継続。pricingSourceUrlはイベントページで安定性低い。専用料金ページ確認まで保留 |

---

## confirmed/partial ツール一覧（参考）

| slug | pricingStatus | currency | pricingSourceUrl |
|---|---|---|---|
| adobe-firefly | confirmed | JPY | https://www.adobe.com/jp/products/firefly/plans.html |
| canva-ai-image-generator | confirmed | USD | （未設定） |
| capcut-ai | no_fixed_price | — | — |
| clipdrop | partial | — | https://clipdrop.co/pricing |
| dalle | partial | USD | https://openai.com/chatgpt/pricing/ |
| dreamstudio | confirmed | USD | https://stability.ai/brand-studio-plans |
| fotor-ai | partial | USD | https://www.fotor.com/jp/pricing/ |
| gemini-image-generation | partial | — | https://gemini.google.com/advanced?hl=ja |
| hailuo-ai | confirmed | USD | https://hailuoai.video/subscribe |
| haiper | service_changed | unknown | — |
| ideogram | partial | USD | https://docs.ideogram.ai/plans-and-pricing/available-plans |
| leonardo-ai | confirmed | USD | — |
| luma-ai | confirmed | USD | — |
| microsoft-designer | partial | USD | https://support.microsoft.com/ja-JP/designer/frequently-asked-questions-about-microsoft-designer |
| midjourney | confirmed | USD | — |
| nightcafe | partial | unknown | https://nightcafe.studio/blogs/info/is-nightcafe-free |
| pika | confirmed | USD | — |
| pixverse | unconfirmed | unknown | unknown |
| playground-ai | confirmed | USD | — |
| runway | confirmed | USD | — |
| seaart-ai | unconfirmed | unknown | — |
| vidu-ai | unconfirmed | unknown | https://www.vidu.com/pricing |

---

## 禁止表現チェック

対象：src/content/tools/*.md 全26件

| 表現 | 検出件数 |
|---|---:|
| 商用利用できます | 0 |
| 著作権的に問題ありません | 0 |
| 安全です | 0 |
| 自由に使えます | 0 |
| 著作権的にクリアです | 0 |
| 問題ありません | 0 |

> 質問文（「〜できますか？」形式）は断定文ではないため対象外。  
> 全件クリア。

---

## Haiper 取り扱い

- pricingStatus: service_changed を維持
- noindex / sitemap除外方針は変更なし
- 今回DB変更なし

---

## 今回DB変更

**なし**（監査・レポートのみ）
