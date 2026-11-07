import { readFileSync } from 'node:fs';
const path = 'dist/tools/fotor-ai/index.html';
const html = readFileSync(path, 'utf8');
const required = [
  '無料・透かし・商用利用：用途別の確認ポイント',
  '無料で試す',
  '透かしなしで納品',
  '広告・仕事での利用',
  '日本語での制作',
  '高画質化機能',
  'https://aicreative-db.com/tools/fotor-ai/',
];
for (const text of required) {
  if (!html.includes(text)) throw Error('Fotor published HTML is missing required section: ' + text);
}
if ((html.match(/<h1\b/g) ?? []).length !== 1) throw Error('Fotor must have one H1');
console.log('PASS: Fotor static override generated HTML includes search-intent section and 4 comparisons');
