import { mkdirSync, writeFileSync } from 'node:fs';
const sha = process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA;
if (!/^[a-f0-9]{40}$/.test(sha || '')) {
  if (process.env.CF_PAGES) throw new Error('Missing Cloudflare commit SHA');
  console.log('Local build: deployment marker not generated');
  process.exit(0);
}
mkdirSync('dist', {recursive:true});
writeFileSync('dist/deployment-commit.txt', sha+'\n');
