import { defineCollection, z } from 'astro:content';

const freePlanSchema = z.union([z.boolean(), z.literal('limited'), z.literal('unknown')]);
const triStateSchema = z.union([z.boolean(), z.literal('partial'), z.literal('unknown')]);
const fourStateSchema = z.enum(['yes', 'no', 'limited', 'unknown']);

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    // slug はファイル名から自動生成されるため schema 定義不要 (entry.slug で参照)
    category: z.enum(['image', 'video', 'both']),
    officialUrl: z.string().url(),
    freePlan: freePlanSchema,
    lowestPaidPlan: z.string().optional(),
    currency: z.enum(['JPY', 'USD', 'EUR', 'unknown']).optional(),
    commercialUse: fourStateSchema,
    commercialUseNote: z.string(),
    japaneseUi: triStateSchema,
    japanesePrompt: triStateSchema,
    watermark: fourStateSchema,
    bestFor: z.array(z.string()),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    lastReviewed: z.string(),
    nextReviewDue: z.string(),
    sources: z.array(
      z.object({
        title: z.string(),
        url: z.string().url(),
      })
    ),
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
