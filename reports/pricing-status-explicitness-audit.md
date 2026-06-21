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

## 2026-06-22 DB反映済み（第2バッチ）

| slug | field | before | after | 判定理由 |
|---|---|---|---|---|
| canva-ai-image-generator | pricingStatus | （未設定） | confirmed | 公式料金URL（canva.com/pricing/）・USD・$15/月 明確 |
| canva-ai-image-generator | needsReview | （未設定） | false | confirmed化に伴い更新 |
| playground-ai | pricingStatus | （未設定） | confirmed | 公式料金URL（playground.com/design/pricing）・USD・$12/月 明確 |
| playground-ai | needsReview | （未設定） | false | confirmed化に伴い更新 |

### 見送り

| slug | 理由 |
|---|---|
| invideo-ai | lowestPaidPlan に「約」付き（約$20/月〜）で金額が明確でない。手順条件「金額が明確」を満たさず confirmed 化見送り |
| kling-ai | 前回確認結果との矛盾あり・今回対象外 |

build：PASS（79ページ・終了コード0・WARNゼロ・.astroキャッシュクリア後）  
commit：849e9f1

---

## B候補 partial / no_fixed_price 明示化監査（2026-06-22）

対象8件：invideo-ai / capcut-ai / dalle / gemini-image-generation / microsoft-designer / nightcafe / ideogram / clipdrop  
方針：DB値変更なし。suggestedStatus の分類のみ。

| slug | 現状 | suggestedStatus | 理由 | 次回対応 |
|---|---|---|---|---|
| invideo-ai | 未設定 | partial | lowestPaidPlan「約$20/月〜」で「約」付き。公式URL（invideo.io/pricing/）はあるが月額が断定できない | 公式料金ページで正確な月額確認後にconfirmed検討。「約」解消まで confirmed 化しない |
| capcut-ai | 未設定 | no_fixed_price | 地域・プラットフォームにより料金が異なる。公式も「アプリ内確認」案内。固定月額なし | DB反映候補：yes。needsReview=yes 維持 |
| dalle | 未設定 | partial | ChatGPT Plus等有料プランに内包。DALL·E単体の独立料金ページなし | DB反映候補：yes。needsReview=yes 維持 |
| gemini-image-generation | 未設定 | partial | Google One AI Premium等に内包。Gemini画像生成単体の独立料金ページなし | DB反映候補：yes。needsReview=yes 維持 |
| microsoft-designer | 未設定 | partial | Microsoft 365 / Copilot Pro等に内包の可能性。独立料金ページ未確認 | DB反映候補：yes。needsReview=yes 維持 |
| nightcafe | 未設定 | partial | pricingSourceUrl がブログURL（料金表でない）。currency=unknown。有料プラン月額未確認 | DB反映候補：yes。専用料金ページURL確認後に再評価 |
| ideogram | 未設定 | partial | 公式docsURLあり・currency=USD。ただし最安有料プラン月額が未確認 | DB反映候補：yes。透かし条件・月額確認後にconfirmed検討 |
| clipdrop | 未設定 | partial | 公式料金ページあり（clipdrop.co/pricing）。Proプラン「--per month」で金額非開示 | DB反映候補：yes。Jasper AI統合後の料金公開を待って再確認 |

### DB反映候補まとめ

| slug | suggestedStatus | 反映可否 |
|---|---|---|
| capcut-ai | no_fixed_price | yes |
| dalle | partial | yes |
| gemini-image-generation | partial | yes |
| microsoft-designer | partial | yes |
| nightcafe | partial | yes |
| ideogram | partial | yes |
| clipdrop | partial | yes |
| invideo-ai | partial | hold（「約」解消後にconfirmed再検討） |

### 明示見送り候補

| slug | 理由 |
|---|---|
| invideo-ai | 「約$20/月〜」で金額不明確。partial として DB 反映はできるが confirmed 化は不可。慎重扱い継続 |
| kling-ai | 今回対象外。前回矛盾未解消のまま保留継続 |

---

## 注意事項

- A候補9件中7件（runway/midjourney/leonardo-ai/luma-ai/pika/canva-ai-image-generator/playground-ai）を2026-06-22に反映済み
- 見送り：kling-ai（前回確認結果と矛盾あり）・invideo-ai（「約」付きで金額不明確）
- B 候補は CSV 記録の status を .md に反映させる際、needsReview=yes を維持
- 商用利用・著作権・透かし条件は断定しない
- haiper（service_changed）・hailuo-ai（confirmed済み）・seaart-ai・pixverse・vidu-ai（unconfirmed維持）は今回対象外

---

## 2026-06-22 DB反映済み（第3バッチ）

| slug | field | before | after | 判定理由 |
|---|---|---|---|---|
| capcut-ai | pricingStatus | （未設定） | no_fixed_price | 地域・プラットフォームにより料金が異なる・公式が「アプリ内確認」案内・固定月額なし |
| dalle | pricingStatus | （未設定） | partial | ChatGPT Plus等有料プランに内包・DALL·E単体の独立料金ページなし |

build：PASS（79ページ・終了コード0・WARNゼロ）

---

## 2026-06-22 DB反映済み（第4バッチ）

| slug | field | before | after | 判定理由 |
|---|---|---|---|---|
| gemini-image-generation | pricingStatus | （未設定） | partial | Google One AI Premium等に内包。Gemini画像生成単体の独立料金ページなし。pricingSourceUrl（gemini advanced）あり |
| microsoft-designer | pricingStatus | （未設定） | partial | Microsoft 365 / Copilot Pro等に内包の可能性。独立料金ページ未確認。公式FAQあり |

needsReview：既存DB形式に合わせ未追加（他ファイルに同フィールド存在しないため）

---

## 次回アクション推奨順

1. ~~**B候補 DB反映（残3件）**：~~capcut-ai~~ ~~dalle~~ ~~gemini-image-generation~~ ~~microsoft-designer~~ / nightcafe・ideogram・clipdrop(partial) を .md に追加~~【2026-06-22 第5バッチ反映済み】
2. **invideo-ai**：公式料金ページで「約」なしの正確月額確認後に confirmed 検討。それまで partial 維持
3. **kling-ai**：前回矛盾解消後に confirmed 再検討
4. **ideogram・nightcafe**：公式料金ページURL（専用ページ）確認後に confirmed への昇格を検討

---

## 2026-06-22 DB反映済み（第5バッチ）

| slug | field | before | after | 判定理由 |
|---|---|---|---|---|
| ideogram | pricingStatus | （未設定） | partial | 公式docsURLあり・currency=USD確認済み・週10クレジット確認済み。subscription_creditのため固定月額比較に向かない。最安有料プラン月額未確認のためconfirmed化しない |
| nightcafe | pricingStatus | （未設定） | partial | pricingSourceUrlが料金表ではなくブログURL。currency=unknown維持。有料プラン月額・tier構成が未確認 |
| clipdrop | pricingStatus | （未設定） | partial | 公式料金ページあり（clipdrop.co/pricing）。Proプランは「--per month」で金額非開示（2026-06-21確認）。currency=unknown維持。Jasper AI統合後の料金体系不透明 |

needsReview：既存DB形式に合わせ未追加（他ファイルに同フィールド存在しないため）
confirmed化：なし
build：（build実行予定）

---

## 残り pricingStatus 未設定候補 3件監査（2026-06-22）

対象：ideogram / nightcafe / clipdrop  
方針：DB値変更なし。suggestedStatus の分類・確認のみ。

| slug | currentPricingStatus | suggestedStatus | 理由 | 次回対応 | dbUpdateRecommended |
|---|---|---|---|---|---|
| ideogram | 未設定 | partial | 公式docs URLあり・currency=USD確認済み・週10クレジット確認済み。subscription_creditのため固定月額比較に向かない。最安有料プラン月額が公式docs上で未確認 | 公式料金ページ（ideogram.ai/pricing）で最安プラン月額確認後にconfirmed検討 | yes |
| nightcafe | 未設定 | partial | pricingSourceUrlが料金表でなくブログURL。currency=unknown。有料プラン月額・tier構成が公式情報のみでは未確認。subscription_creditのためクレジット制での固定月額比較に向かない | 専用料金ページURL確認・currency確認後に再評価 | yes |
| clipdrop | 未設定 | partial | 公式料金ページあり（clipdrop.co/pricing）・Freeプラン確認済み。Proプランは「--per month」で金額非開示（2026-06-21確認）。currency=unknown。Jasper AI統合後の料金体系不透明 | Jasper AI統合後の料金公開を待って再確認。confirmed化不可 | yes |

### 禁止表現チェック（2026-06-22）

断定表現「商用利用できます / 著作権的に問題ありません / 安全です / 自由に使えます」の増加：なし（DB変更なし）

### 明示見送り候補

| slug | 理由 |
|---|---|
| なし | 3件ともpartialとして扱える。clipdropはPro料金非開示・Jasper統合後の不透明さからconfirmed化は不可 |

### DB反映候補まとめ

| slug | suggestedStatus | 反映可否 |
|---|---|---|
| ideogram | partial | yes |
| nightcafe | partial | yes |
| clipdrop | partial | yes |
