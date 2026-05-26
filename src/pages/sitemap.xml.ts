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
  '/comparisons/',
  '/comparisons/runway-vs-pika/',
  '/comparisons/free-ai-image-generators/',
  '/comparisons/midjourney-vs-adobe-firefly/',
  '/comparisons/dalle-vs-midjourney/',
  '/comparisons/stable-diffusion-vs-midjourney/',
  '/comparisons/adobe-firefly-vs-microsoft-designer/',
  '/comparisons/canva-ai-vs-adobe-firefly/',
  '/comparisons/ai-image-video-tools/',
  '/conditions/free/',
  '/conditions/commercial-use/',
  '/conditions/japanese/',
  '/conditions/no-watermark/',
  '/use-cases/',
  '/use-cases/ai-image-use-case-comparison/',
  '/use-cases/youtube-thumbnail/',
  '/use-cases/sns-post-image/',
  '/use-cases/ad-banner/',
  '/use-cases/ec-product-image/',
  '/use-cases/blog-eyecatch/',
  '/use-cases/sns-blog-eyecatch/',
  '/use-cases/anime-illustration/',
  '/use-cases/realistic-photo/',
  '/guides/',
  '/guides/commercial-use-copyright/',
  '/guides/free-ai-image-tools/',
  '/guides/watermark-credit-guide/',
  '/guides/japanese-ai-image-tools/',
  '/guides/ai-image-commercial-use-checklist/',
  '/about/',
  '/contact/',
  '/privacy-policy/',
  '/disclaimer/',
  '/editorial-policy/',
];

export const GET: APIRoute = async () => {
  const tools = await getCollection('tools');
  const toolUrls = tools.map((t) => `/tools/${t.slug}/`);

  const allPaths = [...STATIC_PATHS, ...toolUrls];

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
