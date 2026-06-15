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
    affiliateUrl: z.string().url().optional(),
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

    notBestFor: z.array(z.string()).optional(),

    difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'unknown']).optional(),

    pricingDecision: z.object({
      hasFreePlan: z.enum(['yes', 'no', 'limited', 'unknown']).optional(),
      freePlanLimitNote: z.string().optional(),
      watermarkStatus: z.enum(['free-only', 'paid-only', 'none', 'always', 'unknown']).optional(),
      creditSystem: z.boolean().optional(),
      paidPlanRequiredForExport: z.boolean().optional(),
      pricingNote: z.string().optional(),
    }).optional(),

    usagePolicy: z.object({
      commercialUseStatus: z.enum(['ok', 'paid-only', 'limited', 'no', 'unknown']).optional(),
      commercialUseByPlan: z.object({
        free: z.string().optional(),
        paid: z.string().optional(),
        enterprise: z.string().optional(),
      }).optional(),
      commercialUseNote: z.string().optional(),
      rightsStatus: z.enum(['user-owns', 'platform-owns', 'shared', 'unknown']).optional(),
      rightsNote: z.string().optional(),
      inputMaterialRisk: z.enum(['low', 'medium', 'high', 'unknown']).optional(),
      inputMaterialNote: z.string().optional(),
      peopleLogoRisk: z.enum(['low', 'medium', 'high', 'unknown']).optional(),
      peopleLogoNote: z.string().optional(),
      creditRequiredStatus: z.enum(['required', 'optional', 'not-required', 'unknown']).optional(),
      creditRequiredNote: z.string().optional(),
      officialSourceUrl: z.string().url().optional(),
      termsUrl: z.string().url().optional(),
      lastReviewed: z.string().optional(),
    }).optional(),

    capabilityFit: z.object({
      imageGeneration: z.boolean().optional(),
      videoGeneration: z.boolean().optional(),
      videoEditing: z.boolean().optional(),
      avatarVideo: z.boolean().optional(),
      textToImage: z.boolean().optional(),
      imageToImage: z.boolean().optional(),
      textToVideo: z.boolean().optional(),
      imageToVideo: z.boolean().optional(),
      styleControl: z.enum(['high', 'medium', 'low', 'unknown']).optional(),
      consistencyControl: z.enum(['high', 'medium', 'low', 'unknown']).optional(),
    }).optional(),

    conversionGuide: z.object({
      primaryCtaLabel: z.string().optional(),
      primaryCtaReason: z.string().optional(),
      beforeClickChecklist: z.array(z.string()).optional(),
    }).optional(),
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
