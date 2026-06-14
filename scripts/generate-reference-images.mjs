// 管理者PCローカル専用の制作補助スクリプトです。本番フロントエンド・buildプロセスからは呼び出しません。
// HF_TOKEN やAPIキーをコード・ログ・フロントエンドに露出させないでください。
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

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

const MODEL = 'black-forest-labs/FLUX.1-schnell';
const API_URL = `https://api-inference.huggingface.co/models/${MODEL}`;

const NEGATIVE = 'logo, trademark, celebrity, real person, existing character, text, letters, words, brand mark, watermark, blurry, low quality, nsfw, face, human, person, body, portrait';

const images = [
  {
    out: 'public/images/generated/categories/image-generation-reference-visual-01.webp',
    prompt: 'colorful abstract digital art, geometric patterns, glowing particles, vibrant gradient colors, smooth shapes, wide composition, no text, no people, no faces, 16:9, high quality',
  },
  {
    out: 'public/images/generated/categories/video-generation-reference-visual-01.webp',
    prompt: 'cinematic night cityscape, motion blur light trails, dramatic atmospheric glow, wide shot, film grain, high contrast, no text, no people, no faces, 16:9, photorealistic',
  },
  {
    out: 'public/images/generated/guides/free-ai-image-tools-reference-visual-01.webp',
    prompt: 'bright minimal digital workspace illustration, creative design tools, soft pastel colors, clean flat composition, friendly atmosphere, no text, no people, no faces, 16:9, digital art style',
  },
];

async function generate(prompt) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        negative_prompt: NEGATIVE,
        width: 1200,
        height: 675,
        num_inference_steps: 4,
      },
    }),
  });

  if (!res.ok) {
    const text = (await res.text()).replace(token, '[REDACTED]');
    throw new Error(`API error ${res.status}: ${text}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  return buffer;
}

async function main() {
  for (const img of images) {
    const outPath = join(root, img.out);
    console.log(`Generating: ${img.out}`);

    let retries = 3;
    let buffer;
    while (retries > 0) {
      try {
        buffer = await generate(img.prompt);
        break;
      } catch (e) {
        retries--;
        if (retries === 0) throw e;
        console.log(`  Retry (${3 - retries}/3)...`);
        await new Promise(r => setTimeout(r, 5000));
      }
    }

    const webpBuffer = await sharp(buffer)
      .resize(1200, 675, { fit: 'cover' })
      .webp({ quality: 85 })
      .toBuffer();

    writeFileSync(outPath, webpBuffer);
    const kb = Math.round(webpBuffer.length / 1024);
    console.log(`  Saved: ${kb}KB`);
  }

  console.log('Done.');
}

main().catch(e => {
  const msg = String(e.message || e).replace(token, '[REDACTED]');
  const cause = e.cause ? String(e.cause).replace(token, '[REDACTED]') : '';
  console.error('Error:', msg);
  if (cause) console.error('Cause:', cause);
  process.exit(1);
});
