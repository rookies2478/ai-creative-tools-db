/**
 * labelDictionary.ts
 * ラベル表示ロジックの一元定義。
 * 商用利用・著作権を断定しない。公式情報の確認状態を示す。
 */

// ---- 型定義 ----

export type CommercialUse = 'ok' | 'paid-only' | 'limited' | 'no' | 'unknown';
export type WatermarkState = 'yes' | 'no' | 'limited' | 'unknown';
export type FreePlan = boolean | 'limited' | 'unknown';
export type TriState = boolean | 'partial' | 'unknown';

// ---- 商用利用ステータス ----

export interface CommercialLabel {
  badge: string;
  badgeCls: string;
  desc: string;
  filterLabel: string;
}

export const COMMERCIAL_LABELS: Record<CommercialUse, CommercialLabel> = {
  ok: {
    badge: '案内あり',
    badgeCls: 'bg-emerald-100 text-emerald-800',
    desc: '公式情報では商用利用可能と案内されています。プランや用途によって条件が異なる場合があります。最新情報は公式サイトをご確認ください。',
    filterLabel: '公式案内あり',
  },
  'paid-only': {
    badge: '有料プラン向け',
    badgeCls: 'bg-sky-100 text-sky-800',
    desc: '有料プランで商用利用可能と案内されています。無料プランでは制限がある場合があります。最新情報は公式サイトをご確認ください。',
    filterLabel: '有料プラン向け',
  },
  limited: {
    badge: '条件あり',
    badgeCls: 'bg-amber-100 text-amber-800',
    desc: '用途やプランによって条件が異なる場合があります。公式規約をご確認ください。',
    filterLabel: '条件あり',
  },
  no: {
    badge: '非対応',
    badgeCls: 'bg-red-100 text-red-800',
    desc: '公式規約で商用利用が禁止または制限されている可能性があります。最新の公式情報をご確認ください。',
    filterLabel: '非対応',
  },
  unknown: {
    badge: '要公式確認',
    badgeCls: 'bg-gray-100 text-gray-600',
    desc: '公式情報の確認が必要です。最新情報は公式サイトをご確認ください。',
    filterLabel: '要確認',
  },
};

// ---- 無料枠ラベル ----

export interface FreePlanLabel {
  text: string;
  cls: string;
}

export function getFreePlanLabel(val: FreePlan): FreePlanLabel {
  if (val === true)      return { text: 'あり',       cls: 'bg-green-100 text-green-800' };
  if (val === false)     return { text: 'なし',       cls: 'bg-red-100 text-red-800' };
  if (val === 'limited') return { text: '条件付き',   cls: 'bg-yellow-100 text-yellow-800' };
                         return { text: '要公式確認', cls: 'bg-gray-100 text-gray-600' };
}

/** フィルター用: '1' = 無料枠あり, '0' = それ以外 */
export function getFreePlanFilterValue(val: FreePlan): '1' | '0' {
  return val === true ? '1' : '0';
}

// ---- 透かしラベル ----

export interface WatermarkLabel {
  text: string;
  cls: string;
}

export function getWatermarkLabel(val: WatermarkState): WatermarkLabel {
  if (val === 'no')      return { text: '透かしなし',         cls: 'bg-green-100 text-green-800' };
  if (val === 'yes')     return { text: '透かしあり',         cls: 'bg-red-100 text-red-800' };
  if (val === 'limited') return { text: 'プランによって異なる', cls: 'bg-yellow-100 text-yellow-800' };
                         return { text: '要確認',             cls: 'bg-gray-100 text-gray-600' };
}

/** フィルター用: '1' = 透かしなし, '0' = それ以外 */
export function getWatermarkFilterValue(val: WatermarkState): '1' | '0' {
  return val === 'no' ? '1' : '0';
}

// ---- 日本語対応ラベル ----

export interface TriLabel {
  text: string;
  cls: string;
}

export function getTriLabel(val: TriState): TriLabel {
  if (val === true)      return { text: '○', cls: 'font-bold text-green-600' };
  if (val === false)     return { text: '×', cls: 'font-bold text-red-500' };
  if (val === 'partial') return { text: '△', cls: 'font-bold text-yellow-600' };
                         return { text: '要確認', cls: 'text-gray-400' };
}

/** フィルター用: '1' = 対応, '0' = それ以外 */
export function getJapaneseFilterValue(ui: TriState, prompt: TriState): '1' | '0' {
  return ui === true ? '1' : '0';
}

// ---- 入力素材リスクラベル ----

export type InputMaterialRisk = 'low' | 'medium' | 'high' | 'unknown';

export interface InputMaterialLabel {
  text: string;
  cls: string;
  desc: string;
}

export const INPUT_MATERIAL_LABELS: Record<InputMaterialRisk, InputMaterialLabel> = {
  low: {
    text: '入力素材：別途確認',
    cls: 'bg-slate-50 text-slate-500 ring-1 ring-inset ring-slate-200',
    desc: '通常利用でも入力素材の権利確認は必要です。最新情報は公式サイトをご確認ください。',
  },
  medium: {
    text: '入力素材：注意あり',
    cls: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
    desc: 'アップロード画像・人物・第三者素材などで注意が必要な場合があります。公式規約をご確認ください。',
  },
  high: {
    text: '入力素材：要注意',
    cls: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200',
    desc: '入力素材の権利関係・モデルライセンスを個別に確認する必要があります。本記事は法的助言ではありません。',
  },
  unknown: {
    text: '入力素材：要公式確認',
    cls: 'bg-slate-50 text-slate-400 ring-1 ring-inset ring-slate-100',
    desc: '入力素材に関する公式情報の確認が必要です。最新情報は公式サイトをご確認ください。',
  },
};

export function getInputMaterialLabel(val: InputMaterialRisk | undefined): InputMaterialLabel | null {
  if (!val) return null;
  return INPUT_MATERIAL_LABELS[val] ?? null;
}

// ---- プラットフォームラベル ----

const PLATFORM_LABELS: Record<string, string> = {
  web:     'Web',
  browser: 'ブラウザ',
  desktop: 'デスクトップ',
  mobile:  'スマホ',
  ios:     'iOS',
  android: 'Android',
  local:   'ローカル',
  api:     'API',
  discord: 'Discord',
};

export function getPlatformLabel(platform: string): string {
  return PLATFORM_LABELS[platform.toLowerCase()] ?? platform;
}

// ---- カテゴリラベル ----

export function getCategoryLabel(cat: 'image' | 'video' | 'both'): string {
  if (cat === 'image') return '画像生成';
  if (cat === 'video') return '動画生成';
  return '画像・動画生成';
}

// ---- 免責フッター（共通テキスト） ----

export const DISCLAIMER_NOTE =
  '※ 値は確認日時点の参考値です。無料枠・商用利用・対応状況はプランや用途により異なる場合があります。最新情報は必ず公式サイトでご確認ください。';

export const LEGAL_DISCLAIMER =
  'このページは法的助言ではありません。商用利用・著作権・肖像権・商標等の判断は、最新の公式規約をご確認のうえ、必要に応じて専門家にご相談ください。';

// ---- 商用条件 補足ラベル（一覧表示用） ----

export interface CommercialBreakdownLabel {
  text: string;
  cls: string;
}

export const COMMERCIAL_BREAKDOWN_LABELS: Record<CommercialUse, CommercialBreakdownLabel> = {
  ok:          { text: '商用条件：公式案内あり',   cls: 'imr-low' },
  'paid-only': { text: '商用条件：有料向け',       cls: 'imr-med' },
  limited:     { text: '商用条件：条件あり',       cls: 'imr-med' },
  no:          { text: '商用条件：非対応の可能性', cls: 'imr-high' },
  unknown:     { text: '商用条件：要公式確認',     cls: 'imr-low' },
};

// ---- 表記/透かし 補足ラベル ----

export interface AttributionLabel {
  text: string;
  cls: string;
}

/**
 * watermark=yes は cond グリッドで「透かしあり」と表示済みのため null を返す。
 * それ以外はプラン・表記条件の補足ノートとして表示する。
 */
export function getAttributionLabel(val: WatermarkState): AttributionLabel | null {
  if (val === 'limited') return { text: '表記/透かし：プランによって異なる', cls: 'attr-limited' };
  if (val === 'unknown') return { text: '表記/透かし：要公式確認',          cls: 'attr-unknown' };
  if (val === 'no')      return { text: '表記条件：公式確認を推奨',          cls: 'attr-note' };
  return null;
}

// ---- 商用利用プラン別テキスト（既知ツール分のみ。推測補完しない） ----

/**
 * ToolsListCard に表示するプラン別商用条件サマリー。
 * 根拠のないツールは含めない（推測で埋めない）。
 */
export const COMMERCIAL_PLAN_SUMMARIES: Record<string, string> = {
  'adobe-firefly':            '有料:商用案内あり / 無料:条件付き',
  'runway':                   '全プランで商用案内あり（入力素材は別確認）',
  'midjourney':               '無料プランなし / 有料:商用案内あり',
  'kling-ai':                 '無料:商用不可 / 有料(Standard以上):案内あり',
  'pika':                     '無料:商用不可 / 有料:条件付き（要確認）',
  'luma-ai':                  '無料:商用不可 / 有料(Plus以上):案内あり',
  'canva-ai-image-generator': '条件付き / AI生成明示等が条件の場合あり',
  'leonardo-ai':              '無料:商用不可 / 有料+Private設定:案内あり',
  'ideogram':                 '条件付き（要公式確認）',
  'stable-diffusion':         'モデル・利用形態による（要個別確認）',
};
