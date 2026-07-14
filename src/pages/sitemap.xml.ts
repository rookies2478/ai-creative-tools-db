import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://aicreative-db.com';

const STATIC_PATHS = [
  '/',
  '/tools/',
  '/categories/video-generation/',
  '/categories/video-editing/',
  '/categories/avatar-video/',
  '/categories/image-generation/',
  '/categories/design/',
  '/categories/voice-narration/',
  '/comparisons/',
  '/comparisons/runway-vs-pika/',
  '/comparisons/free-ai-image-generators/',
  '/comparisons/midjourney-vs-adobe-firefly/',
  '/comparisons/dalle-vs-midjourney/',
  '/comparisons/stable-diffusion-vs-midjourney/',
  '/comparisons/adobe-firefly-vs-microsoft-designer/',
  '/comparisons/canva-ai-vs-adobe-firefly/',
  '/comparisons/runway-vs-kling-ai/',
  '/comparisons/invideo-ai-vs-capcut-ai/',
  '/comparisons/midjourney-vs-leonardo-ai/',
  '/comparisons/ai-image-video-tools/',
  '/comparisons/ec-product-image-ai-tools/',
  '/comparisons/ad-banner-ai-tools/',
  '/comparisons/ai-image-generation-sample-comparison/',
  '/comparisons/ai-video-generation-sample-comparison/',
  '/comparisons/free-ai-image-generation-samples/',
  '/conditions/free/',
  '/conditions/commercial-use/',
  '/conditions/japanese/',
  '/conditions/no-watermark/',
  '/use-cases/',
  '/use-cases/ai-image-use-case-comparison/',
  '/use-cases/youtube-thumbnail/',
  '/use-cases/sns-post-image/',
  '/use-cases/sns-post-image-samples/',
  '/use-cases/ad-banner/',
  '/use-cases/ec-product-image/',
  '/use-cases/blog-eyecatch/',
  '/use-cases/sns-blog-eyecatch/',
  '/use-cases/anime-illustration/',
  '/use-cases/realistic-photo/',
  '/use-cases/faceless-video/',
  '/use-cases/shorts/',
  '/use-cases/youtube/',
  '/guides/',
  '/guides/commercial-use-copyright/',
  '/guides/free-ai-image-tools/',
  '/guides/watermark-credit-guide/',
  '/guides/japanese-ai-image-tools/',
  '/guides/ai-image-commercial-use-checklist/',
  '/guides/video-generation-credit-cost-comparison/',
  '/guides/commercial-use-cost-comparison/',
  '/guides/ai-tool-pricing-currency-japan/',
  '/guides/ai-generation-credits-guide/',
  '/prompts/',
  '/templates/',
  '/about/',
  '/contact/',
  '/privacy-policy/',
  '/disclaimer/',
  '/editorial-policy/',
];

const SITEMAP_EXCLUDED_PATHS = new Set([
  '/tools/haiper/',
]);

export const GET: APIRoute = async () => {
  const tools = await getCollection('tools');
  const toolUrls = tools.map((t) => `/tools/${t.slug}/`);

  const allPaths = [...STATIC_PATHS, ...toolUrls].filter(
    (p) => !SITEMAP_EXCLUDED_PATHS.has(p)
  );

  const urls = allPaths
    .map((path) => `  <url><loc>${SITE}${path}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
