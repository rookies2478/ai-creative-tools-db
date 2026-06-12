/**
 * HF Inference API で画像を1枚生成し WebP として保存するスクリプト。
 * トークンはファイルから読む。値はログに出力しない。
 * 使い方: node scripts/generate-sample-image.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── トークン読み込み（値は絶対に出力しない）──
const TOKEN_PATH = process.env.HF_TOKEN_FILE ?? 'C:/dev/Studio/huggingface.co_API.txt';
const hfToken = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
if (!hfToken || !hfToken.startsWith('hf_')) {
  console.error('ERROR: token invalid format');
  process.exit(1);
}
console.log('Token loaded: OK (value hidden)');

// ── パラメータ ──
const MODEL    = 'black-forest-labs/FLUX.1-schnell';
const PROVIDER = 'hf-inference';
const PROMPT   = 'a serene Japanese zen garden at golden hour, raked gravel patterns, stone lantern, maple leaves, soft cinematic light, 16:9 wide shot, photorealistic';
const NEG      = 'logo, trademark, celebrity, real person, existing character, text artifacts, brand mark, watermark, blurry, low quality';
const OUT_DIR  = path.resolve(__dirname, '../public/images/generated/tools');
const OUT_FILE = path.join(OUT_DIR, 'stable-diffusion-reference-visual-01.webp');

// ── Inference API 呼び出し ──
console.log('Calling HF Inference API...');
const apiUrl = `https://router.huggingface.co/hf-inference/models/${MODEL}`;

const response = await fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${hfToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    inputs: PROMPT,
    parameters: {
      negative_prompt: NEG,
      width: 1200,
      height: 675,
      num_inference_steps: 4,
    },
  }),
});

if (!response.ok) {
  const txt = await response.text();
  console.error('API error:', response.status, txt.slice(0, 200));
  process.exit(1);
}

const contentType = response.headers.get('content-type') || '';
console.log('Response content-type:', contentType);

const arrayBuffer = await response.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);
console.log('Received bytes:', buffer.length);

if (buffer.length < 1000) {
  console.error('Response too small, likely an error');
  process.exit(1);
}

// ── 保存 ──
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, buffer);
console.log('Saved:', OUT_FILE);
console.log('DONE');
