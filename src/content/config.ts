import { defineCollection, z } from 'astro:content';

const freePlanSchema = z.union([z.boolean(), z.literal('limited'), z.literal('unknown')]);
const triStateSchema = z.union([z.boolean(), z.literal('partial'), z.literal('unknown')]);
const fourStateSchema = z.enum(['yes', 'no', 'limited', 'unknown']);
const commercialUseSchema = z.enum(['ok', 'paid-only', 'limited', 'no', 'unknown']);

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    shortDescription: z.string(),
    // slug はファイル名から自動生成されるため schema 定義不要 (entry.slug で参照)
    category: z.enum(['image', 'video', 'both']),
    officialUrl: z.string().url(),
    freePlan: freePlanSchema,
    lowestPaidPlan: z.string().optional(),
    currency: z.enum(['JPY', 'USD', 'EUR', 'unknown']).optional(),
    commercialUse: commercialUseSchema,
    commercialUseNote: z.string(),
    japaneseUi: triStateSchema,
    japanesePrompt: triStateSchema,
    watermark: fourStateSchema,
    bestFor: z.array(z.string()),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    lastReviewed: z.string(),
    nextReviewDue: z.string(),
    verifiedAt: z.string().optional(),
    officialSourceUrl: z.string().url().optional(),
    sources: z.array(
      z.object({
        title: z.string(),
        url: z.string().url(),
      })
    ),

    pricingModel: z.enum([
      "free",
      "subscription",
      "credit",
      "subscription_credit",
      "local_free",
      "unknown"
    ]).optional(),

    freePlanNote: z.string().optional(),
    paidPlanNote: z.string().optional(),

    platforms: z.array(
      z.enum([
        "web",
        "discord",
        "ios",
        "android",
        "desktop",
        "api",
        "local"
      ])
    ).optional(),

    signupRequired: z.boolean().optional(),

    features: z.object({
      textToImage: z.boolean().optional(),
      imageToImage: z.boolean().optional(),
      inpainting: z.boolean().optional(),
      outpainting: z.boolean().optional(),
      upscale: z.boolean().optional(),
      backgroundRemoval: z.boolean().optional(),
      stylePresets: z.boolean().optional(),
      promptAssist: z.boolean().optional(),
      textToVideo: z.boolean().optional(),
      imageToVideo: z.boolean().optional(),
      videoExtend: z.boolean().optional(),
      apiAvailable: z.boolean().optional(),
      maxResolution: z.string().optional(),
      maxVideoDuration: z.string().optional()
    }).optional(),

    watermarkCondition: z.string().optional(),
    japaneseDocs: z.boolean().optional(),

    useCases: z.array(
      z.enum([
        "sns",
        "blog",
        "ad_creative",
        "illustration",
        "photo_real",
        "product_image",
        "design",
        "video",
        "youtube",
        "business"
      ])
    ).optional(),

    limitations: z.array(z.string()).optional(),

    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),

    reviewed: z.object({
      pricing: z.string().optional(),
      terms: z.string().optional(),
      features: z.string().optional()
    }).optional(),

    sourceRefs: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
        type: z.enum([
          "official",
          "pricing",
          "terms",
          "help",
          "policy",
          "commercial",
          "docs"
        ])
      })
    ).optional(),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastReviewed: z.string(),
    nextReviewDue: z.string(),
  }),
});

export const collections = { tools, guides };
