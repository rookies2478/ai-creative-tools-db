# ツール 根拠URL 一覧

生成日: 2026-06-18（初版）/ 更新日: 2026-06-18（優先度C完了・stable-diffusion pricingStatus=partial統一）  
ソース: src/content/tools/ 全26件 + reports/tool-pricing-source-audit.csv  
目的: 各ツールのURL根拠整理・信頼度分類

---

## サマリー

| 項目 | 件数 |
|---|---|
| 全ツール数 | 26 |
| 全URL件数（重複排除） | 141 |
| evidenceLevel = strong | 131 |
| evidenceLevel = medium | 3 |
| evidenceLevel = weak | 5 |
| evidenceLevel = missing | 2 |

### 変更サマリー（2026-06-18 累計）

| 項目 | 件数 |
|---|---|
| pricingSourceUrl追加（優先度A missing解消） | 1件（gemini-image-generation） |
| pricingSourceUrl追加（優先度B frontmatter昇格） | 5件（clipdrop/dreamstudio/ideogram/fotor-ai/dalle） |
| pricingSourceUrl追加（優先度C frontmatter追加） | 2件（microsoft-designer/stable-diffusion） |
| confirmed 化 | 0件（優先度A/B/C共通） |
| needsReview解消 | 0件（優先度A/B/C共通） |
| weak維持（代替URL未確認） | 3件（hailuo-ai / nightcafe / tensor-art） |
| missing維持（代替URL未確認） | 2件（pixverse / seaart-ai） |

### URL種別内訳

| urlType | 件数 |
|---|---|
| official-top | 42 |
| official-terms | 35 |
| official-pricing | 27 |
| official-help | 21 |
| official-docs | 8 |
| official-blog | 2 |
| missing | 2 |
| cdn-image | 2 |
| official-news | 2 |

### weak/missing 件一覧（要確認）

| slug | urlType | evidenceLevel | usedFor | 状況 |
|---|---|---|---|---|
| hailuo-ai | official-docs | weak | pricingSourceUrl | payment-policy.htmlは商用利用・プランごとの権利条件を案内する公式ドキュメント。料金額の一覧表ページで |
| nightcafe | official-blog | weak | pricingSourceUrl | 公式ブログ記事（料金専用ページではない）。無料枠の案内はあるが有料プランの月額・tier構成を明示した料金表ページURL |
| pixverse | missing | missing | pricingSourceUrl | pricingSourceUrl=unknown（公式料金ページURL未確認） |
| seaart-ai | missing | missing | pricingSourceUrl | pricingSourceUrl未設定 |
| seaart-ai | cdn-image | weak | sourceRef:terms | SeaArt AI 利用規約（公式・2025年8月版） |
| seaart-ai | cdn-image | weak | sourceRef:policy | SeaArt AI プライバシーポリシー（公式） |
| tensor-art | official-news | weak | pricingSourceUrl | Proプラン案内の公式イベントページ。料金額の詳細は変更される可能性あり。専用の公式料金ページURL（/pricing等 |

---

## evidenceLevel 定義

| level | 対象 |
|---|---|
| strong | 公式料金ページ・公式トップ・公式ドキュメント・公式利用規約・公式ヘルプ |
| medium | 公式ブログ・公式ニュース（pricingSourceUrl以外）・公式docs/help（pricingSourceUrl使用時） |
| weak | CDN画像URL・第三者サイト・pricingSourceUrlに使ったblog/event/payment-policy |
| missing | unknown・未設定・空欄 |

---

## ツール別 URL一覧

### adobe-firefly（Adobe Firefly）

- **category**: image / **pricingStatus**: confirmed / **needsReview**: no
- **lastReviewed**: 2026-06-15 / **verifiedAt**: 2026-06-15

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://firefly.adobe.com) | strong | officialUrl |
| official-terms | [link](https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html) | strong | officialSourceUrl |
| official-pricing | [link](https://www.adobe.com/products/firefly/plans.html) | strong | pricingSourceUrl |
| official-help | [link](https://helpx.adobe.com/firefly/web/get-started/learn-the-basics/adobe-firefly-faq.html) | strong | sourceRef:policy |
| official-top | [link](https://helpx.adobe.com/firefly/web/get-started/learn-the-basics/generative-credits-overview.html) | strong | sourceRef:pricing |

### canva-ai-image-generator（Canva AI画像生成）

- **category**: image / **pricingStatus**: confirmed / **needsReview**: no
- **lastReviewed**: 2026-06-15 / **verifiedAt**: 2026-06-15

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://www.canva.com) | strong | officialUrl |
| official-pricing | [link](https://www.canva.com/pricing/) | strong | officialSourceUrl |
| official-terms | [link](https://www.canva.com/policies/ai-product-terms/) | strong | sourceRef:policy |
| official-top | [link](https://www.canva.com/policies/content-license-agreement/) | strong | sourceRef:commercial |
| official-terms | [link](https://www.canva.com/policies/terms-of-use/) | strong | sourceRef:terms |
| official-help | [link](https://www.canva.com/help/generate-with-dreamlab/) | strong | sourceRef:help |
| official-help | [link](https://www.canva.com/help/ai-access/) | strong | sourceRef:help |

### capcut-ai（CapCut AI）

- **category**: video / **pricingStatus**: no_fixed_price / **needsReview**: no
- **lastReviewed**: 2026-06-15 / **verifiedAt**: 2026-06-15

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://www.capcut.com/) | strong | officialUrl |
| official-help | [link](https://www.capcut.com/help/new-capcut-subscription-pricing) | strong | officialSourceUrl |
| official-top | [link](https://www.capcut.com/ja-jp/tools/ai-video-generator) | strong | sourceRef:official |
| official-terms | [link](https://www.capcut.com/clause/terms-of-service) | strong | sourceRef:terms |
| official-terms | [link](https://www.capcut.com/clause/privacy-policy) | strong | sourceRef:policy |
| official-help | [link](https://www.capcut.com/help/how-to-export-video-without-watermark) | strong | sourceRef:help |
| official-help | [link](https://www.capcut.com/help/remove-watermark-when-exporting-video) | strong | sourceRef:help |

### clipdrop（Clipdrop）

- **category**: image / **pricingStatus**: partial / **needsReview**: yes
- **lastReviewed**: 2026-06-06 / **verifiedAt**: 2026-06-08

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://clipdrop.co/) | strong | officialUrl |
| official-pricing | [link](https://clipdrop.co/pricing) | strong | officialSourceUrl |
| official-top | [link](https://clipdrop.co/tools) | strong | sourceRef:official |
| official-terms | [link](https://clipdrop.co/terms-visitor) | strong | sourceRef:terms |
| official-terms | [link](https://clipdrop.co/privacy) | strong | sourceRef:policy |
| official-top | [link](https://clipdrop.co/apis) | strong | sourceRef:docs |

### dalle（DALL·E）

- **category**: image / **pricingStatus**: partial / **needsReview**: yes
- **lastReviewed**: 2026-06-15 / **verifiedAt**: 2026-06-15

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://openai.com/dall-e-3) | strong | officialUrl |
| official-terms | [link](https://openai.com/policies/usage-policies) | strong | officialSourceUrl |
| official-pricing | [link](https://openai.com/chatgpt/pricing/) | strong | pricingSourceUrl |
| official-pricing | [link](https://openai.com/pricing) | strong | sourceRef:pricing |
| official-help | [link](https://help.openai.com/en/articles/8912793-c2pa-and-synthid-in-openai-generated-images) | strong | sourceRef:help |
| official-top | [link](https://developers.openai.com/api/docs/deprecations) | strong | sourceRef:official |

### dreamstudio（Brand Studio（旧DreamStudio））

- **category**: image / **pricingStatus**: partial / **needsReview**: yes
- **lastReviewed**: 2026-06-14 / **verifiedAt**: 2026-06-14

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://stability.ai/brandstudio) | strong | officialUrl |
| official-pricing | [link](https://stability.ai/brand-studio-plans) | strong | officialSourceUrl |
| official-top | [link](https://stability.ai/license) | strong | sourceRef:policy |
| official-terms | [link](https://stability.ai/acceptable-use-policy) | strong | sourceRef:policy |
| official-terms | [link](https://stability.ai/privacy-policy) | strong | sourceRef:policy |

### fotor-ai（Fotor AI）

- **category**: image / **pricingStatus**: partial / **needsReview**: yes
- **lastReviewed**: 2026-06-13 / **verifiedAt**: 2026-06-13

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://www.fotor.com/jp/ai-image-generator/) | strong | officialUrl |
| official-pricing | [link](https://www.fotor.com/jp/pricing/) | strong | officialSourceUrl |
| official-help | [link](https://support.fotor.com/hc/en-us/articles/17767970123417-Are-the-AI-generated-images-commercially-available-Do-I-have-ownership-of-them) | strong | sourceRef:commercial |
| official-help | [link](https://support.fotor.com/hc/en-us/articles/900006654446-Commercial-Use) | strong | sourceRef:commercial |
| official-terms | [link](https://www.fotor.com/termsofservice) | strong | sourceRef:terms |
| official-terms | [link](https://www.fotor.com/privacy) | strong | sourceRef:policy |

### gemini-image-generation（Gemini画像生成）

- **category**: image / **pricingStatus**: partial / **needsReview**: yes
- **lastReviewed**: 2026-06-13 / **verifiedAt**: 2026-06-13

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://gemini.google/jp/overview/image-generation/?hl=ja-JP) | strong | officialUrl |
| official-terms | [link](https://policies.google.com/terms/generative-ai/use-policy) | strong | officialSourceUrl |
| official-pricing | [link](https://gemini.google.com/advanced?hl=ja) | strong | pricingSourceUrl |
| official-terms | [link](https://policies.google.com/terms?hl=ja) | strong | sourceRef:terms |
| official-terms | [link](https://policies.google.com/privacy?hl=ja) | strong | sourceRef:policy |

### hailuo-ai（Hailuo AI）

- **category**: video / **pricingStatus**: partial / **needsReview**: yes
- **lastReviewed**: 2026-06-17 / **verifiedAt**: 2026-06-17

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://hailuoai.video) | strong | officialUrl |
| official-terms | [link](https://hailuoai.video/doc/terms-of-service.html) | strong | officialSourceUrl |
| official-docs | [link](https://hailuoai.video/doc/payment-policy.html) | weak | pricingSourceUrl |

### haiper（Haiper）

- **category**: video / **pricingStatus**: service_changed / **needsReview**: no
- **lastReviewed**: 2026-06-15 / **verifiedAt**: 2026-06-15

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://haiper.ai/) | strong | officialUrl |
| official-pricing | [link](https://docs.haiper.ai/pricing) | strong | officialSourceUrl |
| official-docs | [link](https://docs.haiper.ai/introduction) | strong | sourceRef:docs |
| official-pricing | [link](https://docs.haiper.ai/api-reference/api-pricing) | strong | sourceRef:pricing |
| official-help | [link](https://book.haiper.ai/haiper-video-generator/faq) | strong | sourceRef:help |
| official-terms | [link](https://static2.haiper.ai/public/terms-of-use-11072024.html) | strong | sourceRef:terms |
| official-top | [link](https://netmind.ai/blogDetail/Forging-the-Future-of-AI-NetMind-ai-Pioneering-Collaboration-with-Haiper-AI) | strong | sourceRef:official |

### ideogram（Ideogram）

- **category**: image / **pricingStatus**: partial / **needsReview**: yes
- **lastReviewed**: 2026-06-14 / **verifiedAt**: 2026-06-14

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://ideogram.ai/) | strong | officialUrl |
| official-pricing | [link](https://docs.ideogram.ai/plans-and-pricing/available-plans) | strong | officialSourceUrl |
| official-docs | [link](https://docs.ideogram.ai/) | strong | sourceRef:docs |
| official-help | [link](https://docs.ideogram.ai/frequently-asked-questions) | strong | sourceRef:help |
| official-terms | [link](https://ideogram.ai/legal/tos) | strong | sourceRef:terms |
| official-pricing | [link](https://ideogram.ai/pricing) | strong | sourceRef:pricing |
| official-docs | [link](https://docs.ideogram.ai/using-ideogram/getting-started/signup-and-registration) | strong | sourceRef:docs |

### invideo-ai（InVideo AI）

- **category**: video / **pricingStatus**: confirmed / **needsReview**: no
- **lastReviewed**: 2026-06-15 / **verifiedAt**: 2026-06-15

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://invideo.io) | strong | officialUrl |
| official-pricing | [link](https://invideo.io/pricing/) | strong | officialSourceUrl |
| official-terms | [link](https://invideo.io/terms-and-conditions/) | strong | sourceRef:terms |
| official-pricing | [link](https://help.invideo.io/en/articles/11528140-invideo-plans-and-credits-everything-you-need-to-know) | strong | sourceRef:help |
| official-help | [link](https://help.invideo.io/en/articles/9387980-can-i-generate-a-video-in-other-languages) | strong | sourceRef:help |

### kling-ai（Kling AI）

- **category**: video / **pricingStatus**: confirmed / **needsReview**: no
- **lastReviewed**: 2026-06-04 / **verifiedAt**: 2026-06-08

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://klingai.com) | strong | officialUrl |
| official-pricing | [link](https://klingai.com/global/pricing) | strong | officialSourceUrl |
| official-top | [link](https://klingai.com/docs/user-policy) | strong | sourceRef:official |
| official-top | [link](https://klingai.com/global/docs/payment-policy) | strong | sourceRef:official |
| official-pricing | [link](https://app.klingai.com/global/membership/membership-plan) | strong | sourceRef:official |

### leonardo-ai（Leonardo AI）

- **category**: image / **pricingStatus**: confirmed / **needsReview**: no
- **lastReviewed**: 2026-06-15 / **verifiedAt**: 2026-06-15

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://leonardo.ai) | strong | officialUrl |
| official-pricing | [link](https://leonardo.ai/pricing/) | strong | officialSourceUrl |
| official-terms | [link](https://leonardo.ai/terms-of-service/) | strong | sourceRef:terms |
| official-top | [link](https://leonardo.ai/news/can-you-use-ai-generated-images-commercially/) | strong | sourceRef:commercial |
| official-help | [link](https://leonardo.ai/faq/) | strong | sourceRef:help |

### luma-ai（Luma AI）

- **category**: video / **pricingStatus**: confirmed / **needsReview**: no
- **lastReviewed**: 2026-06-15 / **verifiedAt**: 2026-06-15

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://lumalabs.ai/) | strong | officialUrl |
| official-pricing | [link](https://lumalabs.ai/pricing) | strong | officialSourceUrl |
| official-top | [link](https://dream-machine.lumalabs.ai/) | strong | sourceRef:official |
| official-pricing | [link](https://lumalabs.ai/learning-hub/dream-machine-support-pricing-information) | strong | sourceRef:help |
| official-terms | [link](https://lumalabs.ai/terms) | strong | sourceRef:terms |
| official-terms | [link](https://lumalabs.ai/privacy) | strong | sourceRef:policy |

### microsoft-designer（Microsoft Designer）

- **category**: image / **pricingStatus**: partial / **needsReview**: yes
- **lastReviewed**: 2026-06-14 / **verifiedAt**: 2026-06-14

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://designer.microsoft.com/) | strong | officialUrl |
| official-terms | [link](https://www.microsoft.com/servicesagreement) | strong | officialSourceUrl |
| official-help | [link](https://support.microsoft.com/ja-JP/designer/frequently-asked-questions-about-microsoft-designer) | medium | pricingSourceUrl |

### midjourney（Midjourney）

- **category**: image / **pricingStatus**: confirmed / **needsReview**: no
- **lastReviewed**: 2026-06-06 / **verifiedAt**: 2026-06-08

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://www.midjourney.com) | strong | officialUrl |
| official-pricing | [link](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans) | strong | officialSourceUrl |
| official-terms | [link](https://docs.midjourney.com/docs/terms-of-service) | strong | sourceRef:terms |
| official-terms | [link](https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service) | strong | sourceRef:terms |
| official-top | [link](https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially) | strong | sourceRef:commercial |

### nightcafe（NightCafe）

- **category**: image / **pricingStatus**: partial / **needsReview**: yes
- **lastReviewed**: 2026-06-17 / **verifiedAt**: 2026-06-17

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://creator.nightcafe.studio/) | strong | officialUrl |
| official-terms | [link](https://nightcafe.studio/policies/terms-of-service) | strong | officialSourceUrl |
| official-blog | [link](https://nightcafe.studio/blogs/info/is-nightcafe-free) | weak | pricingSourceUrl |
| official-top | [link](https://nightcafe.studio/) | strong | sourceRef:official |
| official-help | [link](https://help.nightcafe.studio/portal/en/kb/articles/does-the-license-allow-me-to-sell-my-creations-or-use-them-for-commercial-purposes) | strong | sourceRef:commercial |
| official-help | [link](https://help.nightcafe.studio/portal/en/kb/articles/can-i-sell-my-creations-through-nightcafe) | strong | sourceRef:commercial |
| official-help | [link](https://help.nightcafe.studio/portal/en/kb/articles/can-i-sell-my-creations-as-nfts) | strong | sourceRef:help |
| official-terms | [link](https://nightcafe.studio/policies/privacy-policy) | strong | sourceRef:policy |

### pika（Pika）

- **category**: video / **pricingStatus**: confirmed / **needsReview**: no
- **lastReviewed**: 2026-06-15 / **verifiedAt**: 2026-06-15

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://pika.art) | strong | officialUrl |
| official-pricing | [link](https://pika.art/pricing) | strong | officialSourceUrl |
| official-terms | [link](https://pika.art/terms-of-service) | strong | sourceRef:terms |

### pixverse（PixVerse）

- **category**: video / **pricingStatus**: unconfirmed / **needsReview**: yes
- **lastReviewed**: 2026-06-17 / **verifiedAt**: 2026-06-17

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://pixverse.ai) | strong | officialUrl |
| official-terms | [link](https://pixverse.ai/en/terms-of-service) | strong | officialSourceUrl |
| missing | [link](unknown) | missing | pricingSourceUrl |
| official-blog | [link](https://pixverse.ai/blog) | medium | sourceRef:official |
| official-docs | [link](https://docs.platform.pixverse.ai) | strong | sourceRef:official |
| official-pricing | [link](https://docs.platform.pixverse.ai/pricing-796039m0) | strong | sourceRef:official |

### playground-ai（Playground AI）

- **category**: image / **pricingStatus**: confirmed / **needsReview**: no
- **lastReviewed**: 2026-06-06 / **verifiedAt**: 2026-06-08

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://playground.com/) | strong | officialUrl |
| official-pricing | [link](https://playground.com/design/pricing) | strong | officialSourceUrl |
| official-terms | [link](https://playground.com/terms) | strong | sourceRef:terms |
| official-help | [link](https://help.playgroundai.com/en/articles/6848773-how-does-copyright-work-do-i-own-the-designs-i-create) | strong | sourceRef:commercial |
| official-help | [link](https://help.playgroundai.com/en/) | strong | sourceRef:help |

### runway（Runway）

- **category**: video / **pricingStatus**: confirmed / **needsReview**: no
- **lastReviewed**: 2026-06-05 / **verifiedAt**: 2026-06-08

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://runwayml.com) | strong | officialUrl |
| official-pricing | [link](https://runwayml.com/pricing/) | strong | officialSourceUrl |
| official-terms | [link](https://runwayml.com/terms-of-use/) | strong | sourceRef:terms |
| official-help | [link](https://help.runwayml.com/hc/en-us/articles/18927776141715-Usage-rights) | strong | sourceRef:commercial |
| official-help | [link](https://help.runwayml.com/hc/en-us/articles/21668707517587-Can-I-use-the-content-I-made-in-Runway-for-commercial-purposes) | strong | sourceRef:commercial |
| official-pricing | [link](https://help.runwayml.com/hc/en-us/articles/50404627334547-Free-plan-details) | strong | sourceRef:help |

### seaart-ai（SeaArt AI）

- **category**: image / **pricingStatus**: unconfirmed / **needsReview**: yes
- **lastReviewed**: 2026-06-17 / **verifiedAt**: 2026-06-17

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://www.seaart.ai/) | strong | officialUrl |
| missing | （未設定） | missing | pricingSourceUrl |
| official-top | [link](https://www.seaart.ai/ja) | strong | sourceRef:official |
| cdn-image | [link](https://image.cdn2.seaart.me/20250802/d2790ce8-f8e8-4ea4-a4a1-c958c728566e.html) | weak | sourceRef:terms |
| cdn-image | [link](https://image.cdn2.seaart.me/20250710/e6a1e6bb-9c1b-4f63-af4e-011f28596d77.html) | weak | sourceRef:policy |

### stable-diffusion（Stable Diffusion）

- **category**: image / **pricingStatus**: partial / **needsReview**: yes
- **lastReviewed**: 2026-06-06 / **verifiedAt**: 2026-06-08

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://stability.ai) | strong | officialUrl |
| official-terms | [link](https://stability.ai/license) | strong | officialSourceUrl |
| official-pricing | [link](https://platform.stability.ai/pricing) | strong | pricingSourceUrl |
| official-news | [link](https://stability.ai/news-updates/introducing-stable-diffusion-3-5) | medium | sourceRef:official |
| official-docs | [link](https://github.com/CompVis/stable-diffusion) | strong | sourceRef:docs |
| official-docs | [link](https://github.com/AUTOMATIC1111/stable-diffusion-webui) | strong | sourceRef:docs |
| official-docs | [link](https://docs.comfy.org) | strong | sourceRef:docs |

### tensor-art（Tensor.Art）

- **category**: image / **pricingStatus**: partial / **needsReview**: yes
- **lastReviewed**: 2026-06-17 / **verifiedAt**: 2026-06-17

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://tensor.art/) | strong | officialUrl |
| official-terms | [link](https://tensor.art/about/terms-of-service-new) | strong | officialSourceUrl |
| official-news | [link](https://tensor.art/event/proupdate) | weak | pricingSourceUrl |
| official-top | [link](https://tensorart.me/workflow) | strong | sourceRef:docs |
| official-terms | [link](https://tensor.art/about/privacy-policy) | strong | sourceRef:policy |

### vidu-ai（Vidu AI）

- **category**: video / **pricingStatus**: unconfirmed / **needsReview**: yes
- **lastReviewed**: 2026-06-17 / **verifiedAt**: 2026-06-17

| urlType | url | evidenceLevel | usedFor |
|---|---|---|---|
| official-top | [link](https://www.vidu.com) | strong | officialUrl |
| official-pricing | [link](https://www.vidu.com/pricing) | strong | officialSourceUrl |
| official-terms | [link](https://www.vidu.com/terms) | strong | sourceRef:terms |

