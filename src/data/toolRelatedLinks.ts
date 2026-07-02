/*
  toolRelatedLinks.ts
  主要ツールページ（ToolDetailPage / AdobeFireflyTool）に渡す関連リンクの一元管理データ。
  各ツールページ側は buildNextReads() / buildConditionTags() を通して
  nextReads / conditions props を組み立てる。

  表示件数の上限:
    比較記事: 最大3件 / ガイド: 最大2件 / 条件別+用途別タグ: 最大7件（4+3）
  リンク先URLは実装時に実ファイル存在を確認済み。存在しないURLは追加しないこと。
*/

export interface RelatedReadLink {
  href: string;
  title: string;
  desc?: string;
}

export interface RelatedTag {
  href: string;
  label: string;
}

export interface ToolRelatedLinks {
  /** 関連比較記事（最大3件） */
  comparisons: RelatedReadLink[];
  /** 関連ガイド記事（最大2件） */
  guides: RelatedReadLink[];
  /** 条件別リンク（最大4件） */
  conditionTags: RelatedTag[];
  /** 用途別リンク（最大3件） */
  useCaseTags: RelatedTag[];
  /** 比較記事が無いツール用のカテゴリ代替リンク */
  categoryTag?: RelatedTag;
}

export const toolRelatedLinks: Record<string, ToolRelatedLinks> = {
  'kling-ai': {
    comparisons: [
      { href: '/comparisons/runway-vs-kling-ai/', title: 'Runway と Kling AI を比較', desc: '映像制作向け多機能かコスト重視かで選び分け' },
    ],
    guides: [
      { href: '/guides/video-generation-credit-cost-comparison/', title: 'AI動画生成の料金・クレジット比較ガイド', desc: '主要ツールのクレジット消費・料金体系を比較' },
      { href: '/guides/watermark-credit-guide/', title: '透かし・クレジット表記の確認ガイド', desc: '無料プランの透かし条件を確認する手順' },
    ],
    conditionTags: [
      { href: '/conditions/commercial-use/', label: '商用利用を確認しやすいツール' },
      { href: '/conditions/no-watermark/', label: '透かしなしツール' },
      { href: '/conditions/japanese/', label: '日本語対応ツール' },
    ],
    useCaseTags: [
      { href: '/use-cases/shorts/', label: '縦型・Shorts向けAIツール' },
      { href: '/use-cases/youtube/', label: 'YouTube動画向けAIツール' },
      { href: '/use-cases/sns-post-image/', label: 'SNS投稿画像向けAIツール' },
    ],
  },

  runway: {
    comparisons: [
      { href: '/comparisons/runway-vs-kling-ai/', title: 'Runway と Kling AI を比較', desc: '映像制作向け多機能かコスト重視かで選び分け' },
      { href: '/comparisons/runway-vs-pika/', title: 'Runway と Pika を比較', desc: 'プロ向け多機能か手軽な操作性かで選び分け' },
    ],
    guides: [
      { href: '/guides/video-generation-credit-cost-comparison/', title: 'AI動画生成の料金・クレジット比較ガイド', desc: '主要ツールのクレジット消費・料金体系を比較' },
    ],
    conditionTags: [
      { href: '/conditions/commercial-use/', label: '商用利用を確認しやすいツール' },
      { href: '/conditions/free/', label: '無料で使えるAIツール' },
    ],
    useCaseTags: [
      { href: '/use-cases/shorts/', label: '縦型・Shorts向けAIツール' },
      { href: '/use-cases/faceless-video/', label: '顔出しなし動画向けAIツール' },
    ],
  },

  pika: {
    comparisons: [
      { href: '/comparisons/runway-vs-pika/', title: 'Runway と Pika を比較', desc: 'プロ向け多機能か手軽な操作性かで選び分け' },
    ],
    guides: [
      { href: '/guides/watermark-credit-guide/', title: '透かし・クレジット表記の確認ガイド', desc: '無料プランの透かし条件を確認する手順' },
    ],
    conditionTags: [
      { href: '/conditions/commercial-use/', label: '商用利用を確認しやすいツール' },
      { href: '/conditions/free/', label: '無料で使えるAIツール' },
    ],
    useCaseTags: [
      { href: '/use-cases/shorts/', label: '縦型・Shorts向けAIツール' },
    ],
  },

  'luma-ai': {
    comparisons: [],
    guides: [
      { href: '/guides/video-generation-credit-cost-comparison/', title: 'AI動画生成の料金・クレジット比較ガイド', desc: '主要ツールのクレジット消費・料金体系を比較' },
    ],
    conditionTags: [
      { href: '/conditions/commercial-use/', label: '商用利用を確認しやすいツール' },
      { href: '/conditions/free/', label: '無料で使えるAIツール' },
    ],
    useCaseTags: [
      { href: '/use-cases/shorts/', label: '縦型・Shorts向けAIツール' },
    ],
    categoryTag: { href: '/categories/video-generation/', label: 'AI動画生成ツール一覧' },
  },

  'adobe-firefly': {
    comparisons: [
      { href: '/comparisons/midjourney-vs-adobe-firefly/', title: 'Midjourney と Adobe Firefly を比較', desc: 'アート調かデザイン制作か、用途で選び分け' },
      { href: '/comparisons/adobe-firefly-vs-microsoft-designer/', title: 'Adobe Firefly と Microsoft Designer を比較', desc: '無料枠・商用利用・連携の違い' },
      { href: '/comparisons/canva-ai-vs-adobe-firefly/', title: 'Canva AI と Adobe Firefly を比較', desc: 'テンプレート制作と画像生成の違い' },
    ],
    guides: [
      { href: '/guides/ai-image-commercial-use-checklist/', title: '商用利用前チェックリスト', desc: '商用利用条件の確認ポイントをまとめて整理' },
      { href: '/guides/commercial-use-copyright/', title: '商用利用・著作権ガイド', desc: '商用利用や著作権まわりの確認ポイント' },
    ],
    conditionTags: [
      { href: '/conditions/commercial-use/', label: '商用利用を確認しやすいツール' },
      { href: '/conditions/free/', label: '無料で使えるAIツール' },
    ],
    useCaseTags: [
      { href: '/use-cases/ec-product-image/', label: 'EC商品画像向けAIツール' },
      { href: '/use-cases/ad-banner/', label: '広告バナー向けAIツール' },
      { href: '/use-cases/blog-eyecatch/', label: 'ブログアイキャッチ向けAIツール' },
    ],
  },

  midjourney: {
    // 比較記事は4件あるが表示上限（最大3件）に合わせて優先度の高い3件に絞る
    comparisons: [
      { href: '/comparisons/midjourney-vs-adobe-firefly/', title: 'Midjourney と Adobe Firefly を比較', desc: 'アート調かデザイン制作か、用途で選び分け' },
      { href: '/comparisons/midjourney-vs-leonardo-ai/', title: 'Midjourney と Leonardo AI を比較', desc: 'アート性重視か使いやすさ重視かで選び分け' },
      { href: '/comparisons/dalle-vs-midjourney/', title: 'DALL·E と Midjourney を比較', desc: '自然言語での指示のしやすさと表現力の違い' },
    ],
    guides: [
      { href: '/guides/ai-image-commercial-use-checklist/', title: '商用利用前チェックリスト', desc: '商用利用条件の確認ポイントをまとめて整理' },
      { href: '/guides/watermark-credit-guide/', title: '透かし・クレジット表記の確認ガイド', desc: '透かし・クレジット表記の確認方法' },
    ],
    conditionTags: [
      { href: '/conditions/commercial-use/', label: '商用利用を確認しやすいツール' },
      { href: '/conditions/no-watermark/', label: '透かしなしツール' },
    ],
    useCaseTags: [
      { href: '/use-cases/anime-illustration/', label: 'アニメ・イラスト風に強いAIツール' },
      { href: '/use-cases/realistic-photo/', label: '実写・写真風に強いAIツール' },
      { href: '/use-cases/sns-post-image/', label: 'SNS投稿画像向けAIツール' },
    ],
  },

  'leonardo-ai': {
    comparisons: [
      { href: '/comparisons/midjourney-vs-leonardo-ai/', title: 'Midjourney と Leonardo AI を比較', desc: 'アート性重視か使いやすさ重視かで選び分け' },
    ],
    guides: [
      { href: '/guides/free-ai-image-tools/', title: '無料で使えるAI画像ツールガイド', desc: '無料枠の種類・透かし・商用利用の確認手順' },
    ],
    conditionTags: [
      { href: '/conditions/commercial-use/', label: '商用利用を確認しやすいツール' },
      { href: '/conditions/free/', label: '無料で使えるAIツール' },
    ],
    useCaseTags: [
      { href: '/use-cases/anime-illustration/', label: 'アニメ・イラスト風に強いAIツール' },
      { href: '/use-cases/realistic-photo/', label: '実写・写真風に強いAIツール' },
    ],
  },

  'stable-diffusion': {
    comparisons: [
      { href: '/comparisons/stable-diffusion-vs-midjourney/', title: 'Stable Diffusion と Midjourney を比較', desc: '自由度・カスタマイズ性か手軽さかで選び分け' },
    ],
    guides: [
      { href: '/guides/free-ai-image-tools/', title: '無料で使えるAI画像ツールガイド', desc: '無料枠の種類・透かし・商用利用の確認手順' },
      { href: '/guides/japanese-ai-image-tools/', title: '日本語対応AI画像ツール比較', desc: '日本語UI・プロンプトの対応状況を比較' },
    ],
    conditionTags: [
      { href: '/conditions/free/', label: '無料で使えるAIツール' },
      { href: '/conditions/no-watermark/', label: '透かしなしツール' },
    ],
    useCaseTags: [
      { href: '/use-cases/anime-illustration/', label: 'アニメ・イラスト風に強いAIツール' },
      { href: '/use-cases/realistic-photo/', label: '実写・写真風に強いAIツール' },
    ],
  },
};

/** comparisons(最大3) + guides(最大2) を nextReads 用配列として結合する */
export function buildNextReads(slug: string): RelatedReadLink[] {
  const d = toolRelatedLinks[slug];
  if (!d) return [];
  return [...d.comparisons.slice(0, 3), ...d.guides.slice(0, 2)];
}

/** conditionTags(最大4) + useCaseTags(最大3)。比較記事が無い場合はcategoryTagを先頭に追加 */
export function buildConditionTags(slug: string): RelatedTag[] {
  const d = toolRelatedLinks[slug];
  if (!d) return [];
  const base = d.comparisons.length === 0 && d.categoryTag ? [d.categoryTag] : [];
  return [...base, ...d.conditionTags.slice(0, 4), ...d.useCaseTags.slice(0, 3)];
}
