# ツール料金DB 次フェーズアクションリスト

作成日: 2026-06-17 / 更新日: 2026-06-18（優先度C 3件確認・microsoft-designer/stable-diffusion pricingSourceUrl追加）  
根拠: reports/tool-pricing-source-audit.md / tool-pricing-source-audit.csv  
対象: needsReview=yes 14件（haiper対応済みで15→14）

---

## 前提・禁止事項

- 料金の自動修正・推測補完は行わない
- USD→JPY自動変換は行わない
- 公式サイトの自動スクレイピングは行わない
- slug / URL / DB構造の変更は行わない
- 商用利用・著作権・肖像権・商標の断定は行わない
- 確認できない情報は `unknown` / `要確認` のまま維持する
- 修正は公式情報を確認した上で、別タスクで承認後に実施する

---

## 優先度A：公式料金根拠が実質未確認（6件）— 精査済み（2026-06-17）

> **精査結果サマリー**  
> - pixverse・seaart-ai: 前フェーズ対応済み。追加変更なし（確認済みURLなし）。  
> - hailuo-ai: `pricingSourceUrl` = payment-policy URL 追加。専用料金ページは未確認。  
> - vidu-ai: `pricingSourceUrl` = vidu.com/pricing 追加。currency=unknown は変更不可。  
> - tensor-art: `pricingSourceUrl` = event/proupdate 追加。`currency: "unknown"` 新規追加。  
> - nightcafe: `pricingSourceUrl` = 公式ブログ追加。`currency: "unknown"` 新規追加。  
> 全6件 needsReview=yes 継続（公式料金表ページURL未確認または currency 未解決）。
>
> **フェーズ5追加修正（2026-06-17）**  
> - pixverse: `lowestPaidPlan` を `"要公式確認"` に簡略化（カードに第三者価格が表示されていたため除去）。  
> - hailuo-ai: `lowestPaidPlan` を `"要公式確認"` に簡略化（同上）。  
> - 全6件の公開ページ（ToolsListCard・ToolCard・comparison pages）で未確認料金の断定表示なし確認済み。
>
> **フェーズ6修正（2026-06-18）**  
> - pixverse: specs `料金目安: '$10〜$199/月程度（要確認）'` → `料金: '要公式確認'` に修正。basicInfoカード・quickTable の具体的ドル金額も除去。  
> - hailuo-ai: specs `料金目安: '$9.99〜$14.99/月程度（要確認）'` → `料金: '要公式確認'` に修正。同上。  
> - 修正理由: `pricingStatus=unconfirmed/partial`・`needsReview=yes` の場合、「程度（要確認）」付きでも具体的ドル金額は公開ページに表示しない方針を適用。  
> - seaart-ai / vidu-ai / tensor-art / nightcafe は修正不要（金額なし・「公式確認」表示のみ）を確認済み。

pricingSourceUrl が `unknown` / 未設定 / 利用規約URLのいずれか、かつ月額が要公式確認または第三者情報由来。

### pixverse ✅ 精査完了（2026-06-17・追加変更なし）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `unknown`（前フェーズ追加済み） |
| officialSourceUrl | 利用規約URL（pixverse.ai/en/terms-of-service） |
| monthlyPrice | 第三者情報由来（「Standard約$10」）|
| currency | USD |
| sourcesCount | 4 |

**精査結果**: sourceRefs に Platform API 料金ページ（docs.platform.pixverse.ai/pricing-796039m0）あり。ただしこれは API 開発者向けで一般ユーザー向けではない。コンシューマー向け料金ページ URL は確認不可のため追加変更なし。

**残課題（人間が確認すること）**: pixverse.ai にログインまたは /pricing ページを直接確認し、コンシューマー向けプランの月額・currency を取得する。確認後に pricingSourceUrl と monthlyPrice を更新すること。  
**DB修正可能条件**: 公式料金ページURLが確認できた場合のみ。

---

### seaart-ai ✅ 精査完了（2026-06-17・追加変更なし）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | 未設定のまま |
| officialSourceUrl | `https://www.seaart.ai/`（前フェーズ修正済み） |
| monthlyPrice | 要公式確認（VIP・SVIPプランあり） |
| currency | USD |
| sourcesCount | 2（最少クラス） |

**精査結果**: sourceRefs に料金ページURLが存在しない（公式トップ・利用規約CDN URLのみ）。VIP/SVIP料金はログイン後の会員ページでのみ確認可能とされており、URL特定不可。追加変更なし。

**残課題（人間が確認すること）**: seaart.ai/ja にアクセスし、ログインなしで料金ページが存在するか確認する（/pricing, /plans, /subscribe 等）。存在する場合は pricingSourceUrl に追加すること。  
**DB修正可能条件**: ログインなしで閲覧できる料金ページURLが確認できた場合のみ。

---

### hailuo-ai ✅ 部分対応済み（2026-06-17）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://hailuoai.video/doc/payment-policy.html`（追加済み） |
| officialSourceUrl | 利用規約URL（hailuoai.video/doc/terms-of-service.html） |
| monthlyPrice | 「$9.99〜$14.99」（範囲表記・第三者情報由来） |
| currency | USD |
| sourcesCount | 3（少ない） |

**精査結果**: payment-policy.html は sourceRefs に既存（type: pricing）。frontmatter の pricingSourceUrl に昇格させた。ただしこれは商用利用条件を記述した文書であり、月額の料金表ページではない。pricingSourceNote で補足。

**残課題（人間が確認すること）**: hailuoai.video/subscribe または /pricing 等の専用料金ページを直接確認し、各プランの正確な月額を取得する。確認後に monthlyPrice と lowestPaidPlan を更新すること。  
**DB修正可能条件**: 専用料金ページで月額が確認できた場合のみ。

---

### vidu-ai ✅ 部分対応済み（2026-06-17）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://www.vidu.com/pricing`（追加済み） |
| officialSourceUrl | `https://www.vidu.com/pricing`（変更なし） |
| monthlyPrice | 要公式確認 |
| currency | `unknown`（変更不可） |
| sourcesCount | 3（少ない） |

**精査結果**: officialSourceUrl が既に vidu.com/pricing のため、同 URL を pricingSourceUrl にも設定した。ただし DB の記述通り料金は動的ロード（JavaScript生成）のため静的確認不可。currency は推測で変更しないため unknown 維持。

**残課題（人間が確認すること）**: vidu.com/pricing を実際にブラウザで開き、currency（USD か否か）と各プランの月額を確認する。確認後に currency・monthlyPrice・lowestPaidPlan を更新すること。  
**DB修正可能条件**: ブラウザで直接 currency と月額が確認できた場合のみ。

---

### tensor-art ✅ 部分対応済み（2026-06-17）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://tensor.art/event/proupdate`（追加済み） |
| officialSourceUrl | 利用規約URL（変更なし） |
| monthlyPrice | 要確認 |
| currency | `unknown`（フィールド新規追加済み） |
| sourcesCount | 5 |

**精査結果**: sourceRefs の "Tensor.Art Proプラン案内（公式）"（type: pricing）を pricingSourceUrl に昇格。currency フィールドが存在しなかったため `"unknown"` で新規追加。event URL は恒久性に懸念があるため pricingSourceNote に注記済み。

**残課題（人間が確認すること）**: tensor.art/pricing または tensor.art/plans 等の専用料金ページが存在するか確認する。event/proupdate が現在も有効か確認する。currency（USD か否か）と月額を取得する。  
**DB修正可能条件**: 専用料金ページで currency と月額が確認できた場合のみ。

---

### nightcafe ✅ 部分対応済み（2026-06-17）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://nightcafe.studio/blogs/info/is-nightcafe-free`（追加済み・公式ブログ） |
| officialSourceUrl | 利用規約URL（変更なし） |
| monthlyPrice | 要確認 |
| currency | `unknown`（フィールド新規追加済み） |
| sourcesCount | 8（多い） |

**精査結果**: sourceRefs の公式ブログ URL を pricingSourceUrl として設定。ただしこれは「無料で使えるか」の説明ブログであり、有料プランの料金表ページではない。pricingSourceNote に補足済み。currency フィールドが存在しなかったため `"unknown"` で新規追加。

**残課題（人間が確認すること）**: nightcafe.studio/pricing または creator.nightcafe.studio/pricing 等の専用料金ページが存在するか確認する。currency（USD か否か）と有料プランの月額 tier を取得する。  
**DB修正可能条件**: 専用料金ページで currency と月額が確認できた場合のみ。

---

## 優先度B：料金URLは存在するが月額・currency未確認（5件）— 精査済み（2026-06-18）

officialSourceUrl または pricingSourceUrl に料金ページURLが設定済みだが、月額または currency が未記載・不明。

> **精査結果サマリー（2026-06-18）**
> 全5件について pricingSourceUrl + pricingSourceNote を追加。料金 URL はすべて正規の公式料金ページを指すことを確認。
> ただし月額・currency は web ブラウザでの直接確認なしには断定できないため、すべて needsReview=yes・partial のまま継続。
> confirmed 化：0件 / needsReview 解消：0件

### clipdrop ✅ 部分対応済み（2026-06-18）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://clipdrop.co/pricing` ✅（frontmatterに追加済み） |
| officialSourceUrl | `https://clipdrop.co/pricing` ✅ |
| monthlyPrice | 要確認 |
| currency | `Unknown` |
| pricingSourceNote | Proプラン料金はログイン要の可能性ありを明記 |

**精査結果**: 料金ページURL自体は正規の公式ページ。ただし weaknessに「Proプランの料金が公式サイトで非表示・ログイン要」と記載済み。currency=Unknown・月額未確認。2024年にJasper AI傘下に統合済みのため料金体系変更の可能性あり。

**残課題（人間が確認すること）**: clipdrop.co/pricing をブラウザで開き、Proプランのcurrency（USD か否か）と月額を確認する。ログイン要であれば「ログイン後のみ確認可能」として記録。  
**DB修正可能条件**: ブラウザで currency・月額が確認できた場合のみ。

---

### dreamstudio（Brand Studio） ✅ 部分対応済み（2026-06-18）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://stability.ai/brand-studio-plans` ✅（frontmatterに追加済み） |
| officialSourceUrl | `https://stability.ai/brand-studio-plans` ✅ |
| monthlyPrice | 要確認 |
| currency | `Unknown` |
| pricingSourceNote | Brand Studioリブランド済み・currency・月額要確認を明記 |

**精査結果**: 料金ページURL自体は正規の公式ページ。旧DreamStudioからBrand Studioへのリブランドが完了しており、料金体系も変更されている可能性がある。currency=Unknown・月額未確認。

**残課題（人間が確認すること）**: stability.ai/brand-studio-plans をブラウザで開き、currency・月額・クレジット条件を確認する。Brand Studio リブランド後の料金体系を取得すること。  
**DB修正可能条件**: ブラウザで currency・月額が確認できた場合のみ。

---

### ideogram ✅ 部分対応済み（2026-06-18）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://docs.ideogram.ai/plans-and-pricing/available-plans` ✅（frontmatterに追加済み） |
| officialSourceUrl | `https://docs.ideogram.ai/plans-and-pricing/available-plans` ✅ |
| monthlyPrice | 要公式確認 |
| currency | USD |
| pricingSourceNote | currency=USD推定・月額は要公式確認を明記 |

**精査結果**: 料金ドキュメントURL自体は正規の公式ページ。currency=USDは設定済み。最安有料プランの月額は「要公式確認」のまま未確認。

**残課題（人間が確認すること）**: docs.ideogram.ai/plans-and-pricing/available-plans をブラウザで開き、最安有料プランの月額（USD）を確認する。  
**DB修正可能条件**: ブラウザで月額が確認できた場合のみ。

---

### fotor-ai ✅ 部分対応済み（2026-06-18）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://www.fotor.com/jp/pricing/` ✅（frontmatterに追加済み） |
| officialSourceUrl | `https://www.fotor.com/jp/pricing/` ✅ |
| monthlyPrice | 要確認 |
| currency | USD |
| pricingSourceNote | currency=USD推定（香港企業）・月額は要公式確認を明記 |

**精査結果**: 料金ページURL自体は正規の公式ページ（日本語版）。currency=USDはEverimaging Ltd.（香港企業）として整合。具体的月額は未確認。

**残課題（人間が確認すること）**: fotor.com/jp/pricing/ をブラウザで開き、最安有料プランの月額（USD）を確認する。USD表記維持は方針上問題なし。  
**DB修正可能条件**: ブラウザで月額（USD）が確認できた場合のみ。

---

### dalle ✅ 部分対応済み（2026-06-18）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://openai.com/chatgpt/pricing/` ✅（sourceRefs内URLをfrontmatterに昇格） |
| officialSourceUrl | 利用規約URL（openai.com/policies/usage-policies）— 変更禁止ルール適用で維持 |
| monthlyPrice | 要確認（ChatGPT Plus依存） |
| currency | USD |
| pricingSourceNote | 独立料金なし・ChatGPT Plus依存を明記 |

**精査結果**: pricingSourceUrl を `openai.com/pricing` から `openai.com/chatgpt/pricing/` に更新（sourceRefs内の既存URLを昇格）。DALL·E は独立した月額プランを持たず ChatGPT Plus 等に内包されるため、この URL が最も適切な料金根拠。月額は要公式確認のまま。  
**注意**: DALL·E API の料金（per-image課金）と ChatGPT 内の料金は別物。

**残課題（人間が確認すること）**: openai.com/chatgpt/pricing/ をブラウザで開き、ChatGPT Plus の現在の月額（USD）を確認する。  
**DB修正可能条件**: ブラウザで月額が確認できた場合のみ。

---

## 優先度C：軽微・料金以外の補足確認（3件）— 精査済み（2026-06-18）

月額の問題より構造・表現上の確認が主。緊急度は低い。

> **精査結果サマリー（2026-06-18）**
> - gemini-image-generation: 前フェーズ対応済み。公開ページ断定なし・pricingSourceNote完備。追加変更なし。
> - microsoft-designer: pricingSourceUrl（FAQ URL）+ pricingSourceNote を frontmatter に追加。独立料金ページ未確認のため needsReview=yes 継続。
> - stable-diffusion: pricingSourceUrl を frontmatter に追加（audit CSV内の既存URLを昇格）。ローカル/API料金の最新性未確認のため pricingStatus=partial・needsReview=yes に設定。
> confirmed化：0件 / needsReview解消：0件 / partial維持：3件（gemini/microsoft-designer/stable-diffusion）

### gemini-image-generation ✅ 部分対応済み（2026-06-18）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://gemini.google.com/advanced?hl=ja`（追加済み） |
| officialSourceUrl | 利用規約URL（policies.google.com） |
| monthlyPrice | 要確認（Google AI プランに依存） |
| currency | USD |

**対応内容**: sourceRefs内の既存 Gemini Advanced URL（type: official）を pricingSourceUrl に昇格させた。pricingSourceNote を追加し「独立料金なし・Google One AI Premium相当」を明記。

**残課題（人間が確認すること）**: gemini.google.com/advanced を実際にブラウザで開き、現在の月額・プラン名称（「Google One AI Premium」か「Google AI Premium」か等）を確認する。確認後に monthlyPrice・lowestPaidPlan を更新すること。  
**DB修正可能条件**: ブラウザで料金が直接確認できた場合のみ。

---

### microsoft-designer ✅ 部分対応済み（2026-06-18）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://support.microsoft.com/ja-JP/designer/frequently-asked-questions-about-microsoft-designer` ✅（frontmatterに追加済み） |
| officialSourceUrl | サービス契約URL（microsoft.com/servicesagreement）— 変更禁止ルール適用で維持 |
| monthlyPrice | 要確認（Microsoft 365依存） |
| currency | USD |
| sourcesCount | 3（少ない・変更なし） |
| pricingSourceNote | 独立料金ページなし・Microsoft 365/Copilot Pro内包の可能性・月額要公式確認を明記 |

**精査結果**: sourceRefs内の公式FAQページURLをpricingSourceUrlに昇格させた。Microsoft Designerの有料機能はMicrosoft 365 / Copilot Pro等に内包されており独立した月額料金ページは存在しない可能性が高い。公開ページの「料金プラン」セクションは「最新の情報は公式サイトでご確認ください」のみ（断定なし）。

**残課題（人間が確認すること）**: designer.microsoft.com またはMicrosoft 365プランページをブラウザで確認し、Copilot Pro等の独立料金・月額・currency を確認する。  
**DB修正可能条件**: ブラウザで独立料金の有無・月額が確認できた場合のみ。

---

### stable-diffusion ✅ 部分対応済み（2026-06-18）
| 項目 | 現状 |
|---|---|
| pricingSourceUrl | `https://platform.stability.ai/pricing` ✅（frontmatterに追加済み） |
| officialSourceUrl | `https://stability.ai/license` |
| monthlyPrice | 要確認 |
| currency | USD |
| pricingStatus | `partial` |
| needsReview | `yes` |
| pricingSourceNote | 公式料金ページURLは設定済み。ローカル/API料金・月額プラン・クレジット体系の最新性は要確認を明記 |

**精査結果**: pricingSourceUrl を frontmatter に追加した。ローカル/API料金の二重構造・月額プラン・クレジット体系の最新性がブラウザ確認なしには断定できないため、pricingStatus=partial・needsReview=yes に設定。

**残課題（人間が確認すること）**: platform.stability.ai/pricing でローカル/APIの料金プラン・月額・クレジット数が現在も有効か確認する。確認後に monthlyPrice・paidPlanNote を更新すること。  
**DB修正可能条件**: ブラウザで料金・プラン構成が確認できた場合のみ。

---

## 作業順序の推奨

```
フェーズ1（優先度A）: 公式料金ページURLの特定
  → pixverse / seaart-ai / hailuo-ai / vidu-ai / tensor-art / nightcafe

フェーズ2（優先度B）: 既存料金URLから月額・currency確認
  → clipdrop / dreamstudio / ideogram / fotor-ai / dalle

フェーズ3（優先度C）: 構造・表現確認・補足
  → gemini-image-generation / microsoft-designer / stable-diffusion
```

---

## 判断ルール（各フェーズ共通）

| 確認結果 | DBへの対応 |
|---|---|
| 公式料金ページで月額・currencyを直接確認できた | 更新可（要別タスク承認） |
| ブログ・ヘルプ記事など二次的公式ページのみで確認 | 更新可だが「参照元は公式ブログ」と注記 |
| 第三者記事・レビューサイトのみで確認 | 更新不可。`要公式確認` 維持 |
| ログイン後のみ確認できる情報 | 更新不可。`要公式確認（ログイン要）` と注記 |
| 公式ページが見つからない / 404 | `unknown` に設定 |
| サービス終了・サービス変更が確認された | pricingNote に「サービス変更あり」と記載 |

---

*このファイルはアクション計画のみ。DBへの修正は各フェーズで公式確認後に別タスクで実施すること。*
