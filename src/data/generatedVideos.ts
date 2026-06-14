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

// 動画ファイルおよびposter画像を /public/videos/generated/tools/ に配置してから
// 下記テンプレートをコメント解除してここに追加してください。
// ファイルが存在しない状態でエントリーを追加すると、ブラウザで黒背景・broken表示になります。
//
// {
//   file: '/videos/generated/tools/runway-tool-video-output-01.mp4',
//   poster: '/videos/generated/tools/runway-tool-video-output-01-poster.webp',
//   alt: 'Runwayで作成した短尺実例サンプル動画。公式出力・代表結果・性能証明ではありません。',
//   caption: 'このツールで作成した短尺実例動画',
//   sampleType: 'tool-video-output',
//   comparisonEligible: false,
//   isSameToolAsPage: true,
//   sourceToolSlug: 'runway',
//   promptVersion: 'video-tool-benchmark-v1',
//   prompt: 'A cinematic 3-second video of a modern creative workspace, a laptop on a desk showing abstract colorful motion graphics, soft natural light, slow camera push-in, clean minimal interior, high detail, no text, no logo, no people, no brand.',
//   negativePrompt: 'text, letters, logo, watermark, brand mark, celebrity, real person, existing character, distorted objects, flicker, low quality, blurry, violent, sexual, medical, legal, financial, nsfw',
//   model: 'Runway Gen-4',
//   provider: 'Runway',
//   modelUrl: 'https://runwayml.com',
//   durationSec: 3,
//   resolution: '1280x720',
//   generatedAt: '2026-06-15',
//   reviewedAt: '2026-06-15',
//   pageSlug: 'runway',
//   usageNote: 'この動画は管理者がRunwayで作成した短尺サンプルです。1本の動画だけでツールの品質や性能を断定するものではありません。商用利用条件や素材の権利は公式情報をご確認ください。本記事は法的助言ではありません。',
// },

export const generatedVideos: GeneratedVideo[] = [];
