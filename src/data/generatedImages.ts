export interface GeneratedImage {
  file: string;
  alt: string;
  caption: string;
  sampleType: 'reference-visual' | 'tool-output';
  comparisonEligible?: boolean;
  isSameToolAsPage?: boolean;
  promptVersion: string;
  prompt: string;
  negativePrompt: string;
  model: string;
  provider: string;
  modelUrl: string;
  generatedAt: string;
  reviewedAt: string;
  pageSlug: string;
  purpose: string;
  usageNote: string;
}

export const generatedImages: GeneratedImage[] = [
  {
    file: '/images/generated/tools/stable-diffusion-sample-image-01.webp',
    alt: 'AI画像生成サンプル：黄金色の光が差し込む日本の禅庭園。石灯籠、紅葉、砂紋を描いた砂利が印象的な風景。',
    caption: 'AI生成サンプル（参考）。Stable Diffusion本体の出力結果・公式サンプルではありません。FLUX.1-schnell（black-forest-labs）でページ補足用に生成した参考ビジュアルです。生成結果はモデル・設定・タイミングによって変わる場合があります。',
    sampleType: 'reference-visual',
    comparisonEligible: false,
    isSameToolAsPage: false,
    promptVersion: 'v1',
    prompt: 'a serene Japanese zen garden at golden hour, raked gravel patterns, stone lantern, maple leaves, soft cinematic light, 16:9 wide shot, photorealistic',
    negativePrompt: 'logo, trademark, celebrity, real person, existing character, text artifacts, brand mark, watermark, blurry, low quality',
    model: 'FLUX.1-schnell',
    provider: 'Hugging Face Inference API (hf-inference)',
    modelUrl: 'https://huggingface.co/black-forest-labs/FLUX.1-schnell',
    generatedAt: '2026-06-06',
    reviewedAt: '2026-06-06',
    pageSlug: 'stable-diffusion',
    purpose: 'ツール詳細ページの説明補足用サンプル表示。使用モデルはFLUX.1-schnell（black-forest-labs）であり、Stable Diffusion本体の出力ではない。AI画像生成の参考例として掲載。',
    usageNote: '本サイトでの紹介目的のみ。商用利用・二次配布は行いません。生成モデルの利用条件はHugging Face上の各モデルカードおよびライセンスをご確認ください。',
  },
  {
    file: '/images/generated/categories/image-generation-reference-visual-01.webp',
    alt: 'AI生成サンプル（参考）：色彩豊かな抽象的なデジタルアート。幾何学模様と光の粒子が調和した1200×675pxの参考ビジュアル。',
    caption: 'AI生成サンプル（参考）。特定ツールの出力結果・公式サンプルではありません。FLUX.1-schnell（black-forest-labs）で生成した参考ビジュアルです。',
    sampleType: 'reference-visual',
    comparisonEligible: false,
    isSameToolAsPage: false,
    promptVersion: 'v1',
    prompt: 'colorful abstract digital art, geometric patterns, glowing particles, vibrant colors, smooth gradients, wide composition, 16:9, high quality',
    negativePrompt: 'logo, trademark, celebrity, real person, existing character, text artifacts, brand mark, watermark, blurry, low quality, nsfw',
    model: 'FLUX.1-schnell',
    provider: 'Hugging Face Inference API (hf-inference)',
    modelUrl: 'https://huggingface.co/black-forest-labs/FLUX.1-schnell',
    generatedAt: '2026-06-06',
    reviewedAt: '2026-06-06',
    pageSlug: 'categories/image-generation',
    purpose: 'AI画像生成カテゴリトップページの参考ビジュアル。特定ツールの出力・公式結果・比較材料ではない。カテゴリの雰囲気を伝える参考例として掲載。',
    usageNote: '本サイトでの紹介目的のみ。商用利用・二次配布は行いません。生成モデルの利用条件はHugging Face上の各モデルカードおよびライセンスをご確認ください。',
  },
  {
    file: '/images/generated/categories/video-generation-reference-visual-01.webp',
    alt: 'AI生成サンプル（参考）：映画的な夜景のシネマティックビジュアル。街の光と動きを表現した16:9の参考画像。',
    caption: 'AI生成サンプル（参考）。特定ツールの出力結果・公式サンプルではありません。FLUX.1-schnell（black-forest-labs）で生成した参考ビジュアルです。',
    sampleType: 'reference-visual',
    comparisonEligible: false,
    isSameToolAsPage: false,
    promptVersion: 'v1',
    prompt: 'cinematic night cityscape, motion blur lights, dramatic atmosphere, wide shot, film grain, high contrast, 16:9, photorealistic',
    negativePrompt: 'logo, trademark, celebrity, real person, existing character, text artifacts, brand mark, watermark, blurry, low quality, nsfw',
    model: 'FLUX.1-schnell',
    provider: 'Hugging Face Inference API (hf-inference)',
    modelUrl: 'https://huggingface.co/black-forest-labs/FLUX.1-schnell',
    generatedAt: '2026-06-06',
    reviewedAt: '2026-06-06',
    pageSlug: 'categories/video-generation',
    purpose: 'AI動画生成カテゴリトップページの参考ビジュアル。特定ツールの出力・公式結果・比較材料ではない。動画生成の雰囲気を伝える参考例として掲載。',
    usageNote: '本サイトでの紹介目的のみ。商用利用・二次配布は行いません。生成モデルの利用条件はHugging Face上の各モデルカードおよびライセンスをご確認ください。',
  },
  {
    file: '/images/generated/guides/free-ai-image-tools-reference-visual-01.webp',
    alt: 'AI生成サンプル（参考）：明るくシンプルなデジタルワークスペースのイラスト。創造的な作業環境を表現した16:9の参考ビジュアル。',
    caption: 'AI生成サンプル（参考）。特定ツールの出力結果・公式サンプルではありません。FLUX.1-schnell（black-forest-labs）で生成した参考ビジュアルです。',
    sampleType: 'reference-visual',
    comparisonEligible: false,
    isSameToolAsPage: false,
    promptVersion: 'v1',
    prompt: 'bright minimal digital workspace illustration, creative tools, soft pastel colors, clean composition, friendly atmosphere, 16:9, digital art style',
    negativePrompt: 'logo, trademark, celebrity, real person, existing character, text artifacts, brand mark, watermark, blurry, low quality, nsfw',
    model: 'FLUX.1-schnell',
    provider: 'Hugging Face Inference API (hf-inference)',
    modelUrl: 'https://huggingface.co/black-forest-labs/FLUX.1-schnell',
    generatedAt: '2026-06-06',
    reviewedAt: '2026-06-06',
    pageSlug: 'guides/free-ai-image-tools',
    purpose: '無料AI画像ツールガイドページの参考ビジュアル。特定ツールの出力・公式結果・比較材料ではない。ガイドの雰囲気を伝える参考例として掲載。',
    usageNote: '本サイトでの紹介目的のみ。商用利用・二次配布は行いません。生成モデルの利用条件はHugging Face上の各モデルカードおよびライセンスをご確認ください。',
  },
];
