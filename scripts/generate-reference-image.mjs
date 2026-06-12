import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sharp from 'sharp';
import { InferenceClient } from '@huggingface/inference';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// --- トークン読み取り ---
const TOKEN_FILE = process.env.HF_TOKEN_FILE ?? 'C:\\dev\\Studio\\huggingface.co_API.txt';
if (!existsSync(TOKEN_FILE)) {
  console.error('C:\\dev\\Studio\\huggingface.co_API.txt に作業用トークンファイルを配置してください');
  process.exit(1);
}
const token = readFileSync(TOKEN_FILE, 'utf-8').trim();
if (!token) {
  console.error('C:\\dev\\Studio\\huggingface.co_API.txt に作業用トークンファイルを配置してください');
  process.exit(1);
}

// --- 対象定義 ---
const TARGETS = {
  'image-generation': {
    out: 'public/images/generated/categories/image-generation-reference-visual-01.webp',
    prompt: 'colorful abstract digital art, geometric patterns, glowing light particles, vibrant gradient colors, smooth flowing shapes, wide cinematic composition, no text, no people, no faces, no logos, 16:9, high quality',
  },
  'video-generation': {
    out: 'public/images/generated/categories/video-generation-reference-visual-01.webp',
    prompt: 'cinematic night cityscape, motion blur light trails, dramatic atmospheric glow, reflections on wet street, wide shot, film grain, high contrast, no text, no people, no faces, no logos, 16:9, photorealistic',
  },
  'free-ai-image-tools': {
    out: 'public/images/generated/guides/free-ai-image-tools-reference-visual-01.webp',
    prompt: 'bright minimal digital workspace, soft pastel color palette, clean geometric shapes, creative tools laid out flat, warm friendly atmosphere, no text, no people, no faces, no logos, 16:9, digital illustration style',
  },
};

const NEGATIVE = 'logo, trademark, celebrity, real person, existing character, text, letters, words, numbers, brand mark, watermark, blurry, low quality, nsfw, face, human, person, body, portrait';

// --- 引数チェック ---
const target = process.argv[2];
if (!target || !TARGETS[target]) {
  console.error('使い方: node scripts/generate-reference-image.mjs <target>');
  console.error('target: image-generation | video-generation | free-ai-image-tools');
  process.exit(1);
}

const { out, prompt } = TARGETS[target];
const outPath = join(root, out);

// --- 生成 ---
const MODEL = 'black-forest-labs/FLUX.1-schnell';

async function generate() {
  const client = new InferenceClient(token);
  const blob = await client.textToImage({
    model: MODEL,
    inputs: prompt,
    parameters: {
      negative_prompt: NEGATIVE,
      width: 1200,
      height: 675,
      num_inference_steps: 4,
    },
    provider: 'hf-inference',
  });
  return Buffer.from(await blob.arrayBuffer());
}

// --- メイン ---
async function main() {
  console.log(`対象: ${target}`);
  console.log(`出力先: ${out}`);

  let buffer;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`  生成中... (試行 ${attempt}/3)`);
      buffer = await generate();
      break;
    } catch (e) {
      const name = e.name ?? 'Error';
      const msg = String(e.message ?? '').replace(token, '[REDACTED]');
      const code = e.cause?.code ?? e.statusCode ?? '';
      console.error(`  失敗 [${name}] ${code ? `(${code}) ` : ''}${msg}`);
      if (attempt === 3) {
        console.error('3回失敗。終了します。');
        process.exit(1);
      }
      console.log('  5秒後にリトライ...');
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  const webpBuffer = await sharp(buffer)
    .resize(1200, 675, { fit: 'cover' })
    .webp({ quality: 85 })
    .toBuffer();

  writeFileSync(outPath, webpBuffer);
  const kb = Math.round(webpBuffer.length / 1024);
  console.log(`  保存完了: ${kb}KB → ${out}`);

  if (existsSync(outPath)) {
    console.log(`  ✅ ファイル確認OK: ${out}`);
  } else {
    console.error(`  ❌ ファイルが見つかりません: ${out}`);
    process.exit(1);
  }
}

main().catch(e => {
  const name = e.name ?? 'Error';
  const msg = String(e.message ?? '').replace(token, '[REDACTED]');
  const cause = e.cause ? String(e.cause.code ?? e.cause).replace(token, '[REDACTED]') : '';
  console.error(`Error [${name}]: ${msg}`);
  if (cause) console.error('Cause:', cause);
  process.exit(1);
});
