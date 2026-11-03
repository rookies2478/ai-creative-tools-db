# CTA計測 静的監査

生成: `npm run audit:cta -- --write`（手編集禁止）。契約: `docs/analytics/cta-event-schema.md`

- ツール数: 32
- errors: 0 / warnings: 53

| tool_slug | template | CTA計測 | affiliate(resolver) | 未計測インライン外部リンク | status |
|---|---|---|---|---|---|
| adobe-firefly | AdobeFireflyTool | 2/2 | - | 0 | OK |
| canva-ai-image-generator | ToolDetailPage | 2/2 | - | 1 | OK |
| capcut-ai | ToolDetailPage | 2/2 | - | 1 | OK |
| clipdrop | ToolDetailPage | 2/2 | - | 1 | OK |
| creatify | [slug].astro | 3/3 | - | 0 | OK |
| d-id | ToolDetailPage | 2/2 | - | 1 | OK |
| dalle | ToolDetailPage | 2/2 | - | 1 | OK |
| dreamstudio | ToolDetailPage | 2/2 | - | 1 | OK |
| fotor-ai | ToolDetailPage | 2/2 | - | 1 | OK |
| gemini-image-generation | ToolDetailPage | 2/2 | - | 1 | OK |
| hailuo-ai | ToolDetailPage | 2/2 | - | 1 | OK |
| haiper | ToolDetailPage | 2/2 | - | 1 | OK |
| heygen | ToolDetailPage | 2/2 | - | 1 | OK |
| ideogram | ToolDetailPage | 2/2 | - | 1 | OK |
| invideo-ai | ToolDetailPage | 2/2 | yes | 1 | OK |
| kling-ai | ToolDetailPage | 2/2 | - | 1 | OK |
| leonardo-ai | ToolDetailPage | 2/2 | - | 1 | OK |
| luma-ai | ToolDetailPage | 2/2 | - | 1 | OK |
| microsoft-designer | ToolDetailPage | 2/2 | - | 1 | OK |
| midjourney | ToolDetailPage | 2/2 | - | 1 | OK |
| nightcafe | ToolDetailPage | 2/2 | - | 1 | OK |
| photoroom | [slug].astro | 3/3 | - | 0 | OK |
| pika | ToolDetailPage | 2/2 | - | 1 | OK |
| pixverse | ToolDetailPage | 2/2 | - | 1 | OK |
| playground-ai | ToolDetailPage | 2/2 | - | 1 | OK |
| recraft | [slug].astro | 3/3 | - | 0 | OK |
| runway | ToolDetailPage | 2/2 | - | 1 | OK |
| seaart-ai | ToolDetailPage | 2/2 | - | 1 | OK |
| stable-diffusion | ToolDetailPage | 2/2 | - | 1 | OK |
| synthesia | ToolDetailPage | 2/2 | - | 1 | OK |
| tensor-art | ToolDetailPage | 2/2 | - | 1 | OK |
| vidu-ai | ToolDetailPage | 2/2 | - | 1 | OK |

## CTA一覧

| tool_slug | cta | placement | href | type | event |
|---|---|---|---|---|---|
| adobe-firefly | primaryCta | hero | (component prop) | official | official_site_click |
| adobe-firefly | secondaryCta | pricing | (component prop) | official | official_site_click |
| canva-ai-image-generator | primaryCta | primary | https://www.canva.com | official | official_site_click |
| canva-ai-image-generator | secondaryCta | secondary | https://www.canva.com/pricing/ | official | official_site_click |
| capcut-ai | primaryCta | primary | https://www.capcut.com/ | official | official_site_click |
| capcut-ai | secondaryCta | secondary | https://www.capcut.com/help/new-capcut-subscription-pricing | official | official_site_click |
| clipdrop | primaryCta | primary | https://clipdrop.co/ | official | official_site_click |
| clipdrop | secondaryCta | secondary | https://clipdrop.co/pricing | official | official_site_click |
| creatify | slug-cta-1 | checklist | data.affiliateUrl ?? data.officialUrl | official|affiliate (frontmatter) | official_site_click|affiliate_click |
| creatify | slug-cta-2 | hero | data.affiliateUrl ?? data.officialUrl | official|affiliate (frontmatter) | official_site_click|affiliate_click |
| creatify | slug-cta-3 | pricing | data.affiliateUrl ?? data.officialUrl | official|affiliate (frontmatter) | official_site_click|affiliate_click |
| d-id | primaryCta | primary | https://www.d-id.com/ | official | official_site_click |
| d-id | secondaryCta | secondary | https://www.d-id.com/pricing/studio/ | official | official_site_click |
| dalle | primaryCta | primary | https://openai.com/dall-e-3 | official | official_site_click |
| dalle | secondaryCta | secondary | https://openai.com/policies/usage-policies | official | official_site_click |
| dreamstudio | primaryCta | primary | https://stability.ai/brandstudio | official | official_site_click |
| dreamstudio | secondaryCta | secondary | https://stability.ai/license | official | official_site_click |
| fotor-ai | primaryCta | hero | https://www.fotor.com/jp/ai-image-generator/ | official | official_site_click |
| fotor-ai | secondaryCta | pricing | https://www.fotor.com/jp/pricing/ | official | official_site_click |
| gemini-image-generation | primaryCta | primary | https://gemini.google/jp/overview/image-generation/?hl=ja-JP | official | official_site_click |
| gemini-image-generation | secondaryCta | secondary | https://policies.google.com/terms/generative-ai/use-policy | official | official_site_click |
| hailuo-ai | primaryCta | primary | https://hailuoai.video | official | official_site_click |
| hailuo-ai | secondaryCta | secondary | https://hailuoai.video/doc/terms-of-service.html | official | official_site_click |
| haiper | primaryCta | primary | https://haiper.ai/ | official | official_site_click |
| haiper | secondaryCta | secondary | https://docs.haiper.ai/pricing | official | official_site_click |
| heygen | primaryCta | primary | https://www.heygen.com/ | official | official_site_click |
| heygen | secondaryCta | secondary | https://www.heygen.com/pricing | official | official_site_click |
| ideogram | primaryCta | primary | https://ideogram.ai/ | official | official_site_click |
| ideogram | secondaryCta | secondary | https://ideogram.ai/legal/tos | official | official_site_click |
| invideo-ai | primaryCta | hero | (resolver:outboundLink.url) | affiliate(resolver) | affiliate_click|official_site_click |
| invideo-ai | secondaryCta | pricing | (resolver:pricingOutboundLink.url) | affiliate(resolver) | affiliate_click|official_site_click |
| kling-ai | primaryCta | primary | https://kling.ai | official | official_site_click |
| kling-ai | secondaryCta | secondary | https://kling.ai/membership/membership-plan | official | official_site_click |
| leonardo-ai | primaryCta | primary | https://leonardo.ai | official | official_site_click |
| leonardo-ai | secondaryCta | secondary | https://leonardo.ai/pricing/ | official | official_site_click |
| luma-ai | primaryCta | primary | https://lumalabs.ai/ | official | official_site_click |
| luma-ai | secondaryCta | secondary | https://lumalabs.ai/pricing | official | official_site_click |
| microsoft-designer | primaryCta | primary | https://designer.microsoft.com/ | official | official_site_click |
| microsoft-designer | secondaryCta | secondary | https://support.microsoft.com/ja-JP/designer/frequently-asked-questions-about-microsoft-designer | official | official_site_click |
| midjourney | primaryCta | primary | https://www.midjourney.com | official | official_site_click |
| midjourney | secondaryCta | secondary | https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans | official | official_site_click |
| nightcafe | primaryCta | primary | https://creator.nightcafe.studio/ | official | official_site_click |
| nightcafe | secondaryCta | secondary | https://nightcafe.studio/policies/terms-of-service | official | official_site_click |
| photoroom | slug-cta-1 | checklist | data.affiliateUrl ?? data.officialUrl | official|affiliate (frontmatter) | official_site_click|affiliate_click |
| photoroom | slug-cta-2 | hero | data.affiliateUrl ?? data.officialUrl | official|affiliate (frontmatter) | official_site_click|affiliate_click |
| photoroom | slug-cta-3 | pricing | data.affiliateUrl ?? data.officialUrl | official|affiliate (frontmatter) | official_site_click|affiliate_click |
| pika | primaryCta | primary | https://pika.art | official | official_site_click |
| pika | secondaryCta | secondary | https://pika.art/pricing | official | official_site_click |
| pixverse | primaryCta | primary | https://pixverse.ai | official | official_site_click |
| pixverse | secondaryCta | secondary | https://pixverse.ai/en/terms-of-service | official | official_site_click |
| playground-ai | primaryCta | primary | https://playgroundai.com/ | official | official_site_click |
| playground-ai | secondaryCta | secondary | https://playgroundai.com/design/pricing | official | official_site_click |
| recraft | slug-cta-1 | checklist | data.affiliateUrl ?? data.officialUrl | official|affiliate (frontmatter) | official_site_click|affiliate_click |
| recraft | slug-cta-2 | hero | data.affiliateUrl ?? data.officialUrl | official|affiliate (frontmatter) | official_site_click|affiliate_click |
| recraft | slug-cta-3 | pricing | data.affiliateUrl ?? data.officialUrl | official|affiliate (frontmatter) | official_site_click|affiliate_click |
| runway | primaryCta | hero | https://runwayml.com | official | official_site_click |
| runway | secondaryCta | pricing | https://runwayml.com/pricing/ | official | official_site_click |
| seaart-ai | primaryCta | primary | https://www.seaart.ai/ja | official | official_site_click |
| seaart-ai | secondaryCta | secondary | https://image.cdn2.seaart.me/20250802/d2790ce8-f8e8-4ea4-a4a1-c958c728566e.html | official | official_site_click |
| stable-diffusion | primaryCta | primary | https://stability.ai | official | official_site_click |
| stable-diffusion | secondaryCta | secondary | https://stability.ai/license | official | official_site_click |
| synthesia | primaryCta | primary | https://www.synthesia.io/ | official | official_site_click |
| synthesia | secondaryCta | secondary | https://www.synthesia.io/pricing | official | official_site_click |
| tensor-art | primaryCta | primary | https://tensor.art/ | official | official_site_click |
| tensor-art | secondaryCta | secondary | https://tensor.art/about/terms-of-service-new | official | official_site_click |
| vidu-ai | primaryCta | primary | https://www.vidu.com | official | official_site_click |
| vidu-ai | secondaryCta | secondary | https://www.vidu.com/terms | official | official_site_click |

## Errors

- なし

## Warnings

- canva-ai-image-generator: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- canva-ai-image-generator: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- capcut-ai: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- capcut-ai: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- clipdrop: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- clipdrop: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- d-id: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- d-id: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- dalle: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- dalle: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- dreamstudio: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- dreamstudio: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- gemini-image-generation: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- gemini-image-generation: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- hailuo-ai: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- hailuo-ai: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- haiper: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- haiper: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- heygen: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- heygen: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- ideogram: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- ideogram: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- kling-ai: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- kling-ai: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- leonardo-ai: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- leonardo-ai: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- luma-ai: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- luma-ai: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- microsoft-designer: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- microsoft-designer: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- midjourney: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- midjourney: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- nightcafe: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- nightcafe: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- pika: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- pika: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- pixverse: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- pixverse: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- playground-ai: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- playground-ai: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- seaart-ai: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- seaart-ai: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- stable-diffusion: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- stable-diffusion: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- synthesia: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- synthesia: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- tensor-art: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- tensor-art: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- vidu-ai: primaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- vidu-ai: secondaryCta has no explicit outboundType (relies on ToolDetailPage default 'official')
- component AdobeFireflyTool.astro renders a primary CTA but no tool page imports it (dead/duplicate CTA implementation)
- component TdpToolPage.astro renders a primary CTA but no tool page imports it (dead/duplicate CTA implementation)
- component ToolDetailPage.astro renders a primary CTA but no tool page imports it (dead/duplicate CTA implementation)
