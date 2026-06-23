export interface GeneratedVideo {
  file: string;
  poster: string;
  alt: string;
  caption: string;
  sampleType: 'tool-video-output';
  comparisonEligible: false;
  isSameToolAsPage: boolean;
  sourceToolSlug: string;
  promptVersion: string;
  prompt: string;
  negativePrompt: string;
  model: string;
  provider: string;
  modelUrl?: string;
  durationSec: number;
  resolution: string;
  generatedAt: string;
  reviewedAt: string;
  pageSlug: string;
  usageNote: string;
}

// promptVersion の運用ルール：
// - video-tool-benchmark-v1: 同一プロンプト横断比較用。
//   comparisonEligible は false 固定（初期運用）。
//   1本の動画だけでツールの品質・性能を断定しない。

export const generatedVideos: GeneratedVideo[] = [
  {
    file: '/videos/generated/tools/kling-ai-tool-video-output-01.mp4',
    poster: '/videos/generated/tools/kling-ai-tool-video-output-01-poster.webp',
    alt: 'Kling AIで作成した短尺実例サンプル動画。公式出力・代表結果・性能証明ではありません。',
    caption: 'このツールで作成した短尺実例動画',
    sampleType: 'tool-video-output',
    comparisonEligible: false,
    isSameToolAsPage: true,
    sourceToolSlug: 'kling-ai',
    promptVersion: 'video-tool-benchmark-v1',
    prompt: 'A cinematic 5-second video of a modern creative workspace, a laptop on a desk showing abstract colorful motion graphics, soft natural light, slow camera push-in, clean minimal interior, high detail, no text, no logo, no people, no brand.',
    negativePrompt: 'text, letters, logo, watermark, brand mark, celebrity, real person, existing character, distorted objects, flicker, low quality, blurry, violent, sexual, medical, legal, financial, nsfw',
    model: 'Kling AI 2.0',
    provider: 'Kling AI',
    modelUrl: 'https://klingai.com',
    durationSec: 5,
    resolution: '1280x720',
    generatedAt: '2026-06-24',
    reviewedAt: '2026-06-24',
    pageSlug: 'kling-ai',
    usageNote: 'この動画は管理者がKling AIで作成した短尺サンプルです。1本の動画だけでツールの品質や性能を断定するものではありません。無料プランで生成したため透かし（KlingAI 3.0）が含まれています。商用利用条件や素材の権利は公式情報をご確認ください。本記事は法的助言ではありません。',
  },
  {
    file: '/videos/generated/tools/pika-tool-video-output-01.mp4',
    poster: '/videos/generated/tools/pika-tool-video-output-01-poster.webp',
    alt: 'Pikaで作成した短尺実例サンプル動画。公式出力・代表結果・性能証明ではありません。',
    caption: 'このツールで作成した短尺実例動画',
    sampleType: 'tool-video-output',
    comparisonEligible: false,
    isSameToolAsPage: true,
    sourceToolSlug: 'pika',
    promptVersion: 'video-tool-benchmark-v1',
    prompt: 'A clean modern creative workspace for AI video generation, a stylish desk with a large monitor showing abstract colorful digital motion graphics, soft natural light, minimal interior, smooth camera movement, professional blog eyecatch style, no text, no logo, no brand, no people',
    negativePrompt: 'text, letters, words, logo, watermark, trademark, brand mark, celebrity, real person, existing character, distorted hands, face, low quality, blurry, messy layout, medical, legal, financial, violent, sexual',
    model: 'Pika（モデル詳細不明）',
    provider: 'Pika',
    modelUrl: 'https://pika.art',
    durationSec: 5,
    resolution: '要確認',
    generatedAt: '2026-06-24',
    reviewedAt: '2026-06-24',
    pageSlug: 'pika',
    usageNote: 'この動画は管理者がPikaで生成した短尺実例動画です。生成結果はプロンプト・設定・モデル・タイミングによって変わる場合があります。商用利用条件や素材の権利は公式情報をご確認ください。本記事は法的助言ではありません。',
  },
  {
    file: '/videos/generated/tools/runway-tool-video-output-01.mp4',
    poster: '/videos/generated/tools/runway-tool-video-output-01-poster.webp',
    alt: 'Runwayで作成した短尺実例サンプル動画。公式出力・代表結果・性能証明ではありません。',
    caption: 'このツールで作成した短尺実例動画',
    sampleType: 'tool-video-output',
    comparisonEligible: false,
    isSameToolAsPage: true,
    sourceToolSlug: 'runway',
    promptVersion: 'video-tool-benchmark-v1',
    prompt: 'A cinematic 3-second video of a modern creative workspace, a laptop on a desk showing abstract colorful motion graphics, soft natural light, slow camera push-in, clean minimal interior, high detail, no text, no logo, no people, no brand.',
    negativePrompt: 'text, letters, logo, watermark, brand mark, celebrity, real person, existing character, distorted objects, flicker, low quality, blurry, violent, sexual, medical, legal, financial, nsfw',
    model: 'Runway Gen-4',
    provider: 'Runway',
    modelUrl: 'https://runwayml.com',
    durationSec: 3,
    resolution: '1280x720',
    generatedAt: '2026-06-15',
    reviewedAt: '2026-06-15',
    pageSlug: 'runway',
    usageNote: 'この動画は管理者がRunwayで作成した短尺サンプルです。1本の動画だけでツールの品質や性能を断定するものではありません。商用利用条件や素材の権利は公式情報をご確認ください。本記事は法的助言ではありません。',
  },
  {
    file: '/videos/generated/tools/luma-ai-tool-video-output-01.mp4',
    poster: '/videos/generated/tools/luma-ai-tool-video-output-01-poster.webp',
    alt: 'Luma AIで作成した短尺実例サンプル動画。公式出力・代表結果・性能証明ではありません。',
    caption: 'このツールで作成した短尺実例動画',
    sampleType: 'tool-video-output',
    comparisonEligible: false,
    isSameToolAsPage: true,
    sourceToolSlug: 'luma-ai',
    promptVersion: 'video-tool-benchmark-v1',
    prompt: 'A clean modern creative workspace for AI video generation, a stylish desk with a large monitor showing abstract colorful digital motion graphics, soft natural light, minimal interior, smooth camera movement, professional blog eyecatch style, no text, no logo, no brand, no people',
    negativePrompt: 'text, letters, words, logo, watermark, trademark, brand mark, celebrity, real person, existing character, distorted hands, face, low quality, blurry, messy layout, medical, legal, financial, violent, sexual',
    model: 'Luma AI（モデル詳細要確認）',
    provider: 'Luma AI',
    modelUrl: 'https://lumalabs.ai/',
    durationSec: 5,
    resolution: '960x540',
    generatedAt: '2026-06-24',
    reviewedAt: '2026-06-24',
    pageSlug: 'luma-ai',
    usageNote: 'この動画は管理者がLuma AIで生成した短尺実例動画です。生成結果はプロンプト・設定・モデル・タイミングによって変わる場合があります。商用利用条件や素材の権利は公式情報をご確認ください。本記事は法的助言ではありません。',
  },
];
