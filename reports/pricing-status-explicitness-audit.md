# pricingStatus 明示化可否監査

作成日：2026-06-22  
対象：pricingStatus フィールド未設定の18ツール（src/content/tools/ 配下 .md ファイル）  
方針：DB値は変更しない。レポート・提案のみ。

---

## サマリー

| 項目 | 件数 |
|---|---:|
| pricingStatus 未設定ツール（調査対象） | 18 |
| A：confirmed 候補（明示してよい可能性が高い） | 9 |
| B：partial / no_fixed_price 候補（条件付き明示） | 9 |
| C：明示見送り | 0 |

CSV との照合で全18件はすでに `tool-pricing-source-audit.csv` に pricingStatus 記録あり。  
ただし .md frontmatter に `pricingStatus` フィールド自体が存在しないため、本監査で分類・整理する。

---

## pricingStatus 未設定ツール一覧

| slug | toolName | pricingText（CSV） | currency（.md） | pricingSourceUrl | CSV記録status | 候補 |
|---|---|---|---|---|---|---|
| canva-ai-image-generator | Canva AI画像生成 | $15/月（Canva Pro・月払い）／$120/年 | USD | https://www.canva.com/pricing/ | confirmed | **A** |
| capcut-ai | CapCut AI | 地域・プラットフォームにより異なる | N/A | https://www.capcut.com/help/new-capcut-subscription-pricing | no_fixed_price | **B** |
| clipdrop | Clipdrop | 無料枠あり。有料プランは公式ページ参照 | Unknown | https://clipdrop.co/pricing | partial | **B** |
| dalle | DALL·E | ChatGPT Plus等の有料プランで利用枠拡大 | USD | https://openai.com/chatgpt/pricing/ | partial | **B** |
| gemini-image-generation | Gemini画像生成 | Google AIプランで利用可。無料枠・有料枠あり | （未設定） | https://gemini.google.com/advanced?hl=ja | partial | **B** |
| ideogram | Ideogram | 要公式確認 | USD | https://docs.ideogram.ai/plans-and-pricing/available-plans | partial | **B** |
| invideo-ai | InVideo AI | 約$20/月〜（透かしあり無料プランあり） | USD | （未設定） | confirmed | **A** |
| kling-ai | Kling AI | $6.99/月〜。無料プランあり | USD | （未設定） | confirmed | **A** |
| leonardo-ai | Leonardo AI | $10/月（Apprentice年払い）／$12/月（月払い） | USD | （未設定） | confirmed | **A** |
| luma-ai | Luma AI | $30/月（Plusプラン・月払い）。三段階 | USD | （未設定） | confirmed | **A** |
| microsoft-designer | Microsoft Designer | Microsoftアカウントで無料利用可 | USD | https://support.microsoft.com/ja-JP/designer/... | partial | **B** |
| midjourney | Midjourney | $10/月（Basicプラン・月払い）／$8/月（年払い） | USD | （未設定） | confirmed | **A** |
| nightcafe | NightCafe | 無料利用・無料クレジットあり | unknown | https://nightcafe.studio/blogs/info/is-nightcafe-free | partial | **B** |
| pika | Pika | $8/月（年払い）。無料プランあり | USD | （未設定） | confirmed | **A** |
| playground-ai | Playground AI | $12/月（Pro年払い）／$15/月（月払い） | USD | （未設定） | confirmed | **A** |
| runway | Runway | $12/月（Standard年払い）／$14/月（月払い） | USD | （未設定） | confirmed | **A** |
| stable-diffusion | Stable Diffusion | ローカル実行は無料。クラウドAPIは要確認 | USD | https://platform.stability.ai/pricing | partial | **B** |
| tensor-art | Tensor.Art | 無料利用枠・クレジット制あり | unknown | https://tensor.art/event/proupdate | partial | **B** |

---

## 明示化してよい候補 A（confirmed候補・9件）

| slug | 候補status | 理由 | 必要な確認 |
|---|---|---|---|
| canva-ai-image-generator | confirmed | 公式料金URL（canva.com/pricing/）あり。USD・$15/月・CSV confirmed済み | pricingSourceUrl・pricingText・monthlyPrice を .md に追加確認 |
| invideo-ai | confirmed | 公式料金URL（invideo.io/pricing/）あり。USD・$20/月・CSV confirmed済み | pricingSourceUrl を .md に追記確認。「約」付きのため精度注意 |
| kling-ai | confirmed | 公式料金URL（klingai.com/global/pricing）あり。USD・$6.99/月・CSV confirmed済み | pricingSourceUrl を .md に追記確認 |
| leonardo-ai | confirmed | 公式料金URL（leonardo.ai/pricing/）あり。USD・$10/月・CSV confirmed済み | pricingSourceUrl を .md に追記確認 |
| luma-ai | confirmed | 公式料金URL（lumalabs.ai/pricing）あり。USD・$30/月・CSV confirmed済み | pricingSourceUrl を .md に追記確認 |
| midjourney | confirmed | 公式ドキュメントURL・USD・$10/月・CSV confirmed済み | pricingSourceUrl を .md に追記確認 |
| pika | confirmed | 公式料金URL（pika.art/pricing）あり。USD・$8/月・CSV confirmed済み | pricingSourceUrl を .md に追記確認 |
| playground-ai | confirmed | 公式料金URL（playground.com/design/pricing）あり。USD・$12/月・CSV confirmed済み | .md に pricingStatus 追加のみ（pricingSourceUrl は CSVで確認済み） |
| runway | confirmed | 公式料金URL（runwayml.com/pricing/）あり。USD・$12/月・CSV confirmed済み | .md に pricingStatus 追加のみ |

---

## partial 等の明示候補 B（9件）

| slug | 候補status | 理由 | 必要な確認 |
|---|---|---|---|
| capcut-ai | no_fixed_price | 公式が「アプリ内確認」案内。地域・プラットフォームにより料金が異なる | .md に no_fixed_price 追加。monthlyPrice=要確認・currency=N/A維持 |
| clipdrop | partial | 公式料金ページあり（clipdrop.co/pricing）。ただし金額「--per month」で非開示 | currency=Unknown・月額未確認のまま partial |
| dalle | partial | ChatGPT Plus依存（独立料金なし）。pricingSourceUrl あり | partial。独立料金がないため confirmed 不可 |
| gemini-image-generation | partial | Google One AI Premium内包。独立料金なし | partial。pricingSourceUrl（gemini advanced）あり |
| ideogram | partial | docs URLあり・currency=USD設定済み。ただし月額は要公式確認 | needsReview=yes維持。料金表ページで月額確認後に confirmed 検討 |
| microsoft-designer | partial | FAQ URLあり。Microsoft 365/Copilot Pro内包の可能性。独立料金ページ未確認 | partial。confirmed は不可 |
| nightcafe | partial | 公式ブログURL（料金表ではない）。currency=unknown | partial。専用料金ページURL確認後に再評価 |
| stable-diffusion | partial | ローカル無料・クラウドAPI有料の二重構造。ライセンスも複雑 | partial維持。ローカル/API料金を混在させない |
| tensor-art | partial | クレジット制。pricingSourceUrl がイベントURLで変更リスクあり | partial。専用料金ページURL確認が先決 |

---

## 明示見送り C

なし（全18件は A または B として分類可能）

---

## 2026-06-22 DB反映済み（第1バッチ）

| slug | field | before | after |
|---|---|---|---|
| runway | pricingStatus | （未設定） | confirmed |
| midjourney | pricingStatus | （未設定） | confirmed |
| leonardo-ai | pricingStatus | （未設定） | confirmed |
| luma-ai | pricingStatus | （未設定） | confirmed |
| pika | pricingStatus | （未設定） | confirmed |

build：PASS（79ページ・終了コード0・WARNゼロ）

---

## 注意事項

- A候補9件中5件（runway/midjourney/leonardo-ai/luma-ai/pika）を2026-06-22に反映済み
- 見送り：kling-ai（前回確認結果と矛盾あり・今回対象外）・canva-ai-image-generator/invideo-ai/playground-ai（次バッチ候補）
- B 候補は CSV 記録の status を .md に反映させる際、needsReview=yes を維持
- 商用利用・著作権・透かし条件は断定しない
- haiper（service_changed）・hailuo-ai（confirmed済み）・seaart-ai・pixverse・vidu-ai（unconfirmed維持）は今回対象外

---

## 次回アクション推奨順

1. **A候補 残4件**（canva-ai-image-generator/invideo-ai/playground-ai/kling-ai）：kling-aiは前回矛盾解消後に確認
2. **B候補 no_fixed_price（capcut-ai）**：.md に `pricingStatus: "no_fixed_price"` 追加
3. **B候補 partial（8件）**：needsReview=yes のまま `pricingStatus: "partial"` 追加
4. **ideogram・nightcafe・tensor-art**：公式料金ページURL再確認後に confirmed への昇格を検討
