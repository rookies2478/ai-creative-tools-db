const origin = process.env.SITE_ORIGIN || 'https://aicreative-db.com';
const expectedSha = process.env.GITHUB_SHA || '';
const profile = process.env.QA_PROFILE || 'creative';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getText(url, timeout = 12000) {
  const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(timeout), headers: { 'Cache-Control': 'no-cache', 'User-Agent': 'production-route-qa/1.0' } });
  return { response, text: await response.text() };
}
async function waitForRelease() {
  if (!/^[a-f0-9]{40}$/.test(expectedSha)) return;
  for (let i = 0; i < 24; i++) {
    try {
      const { response, text } = await getText(`${origin}/deployment-commit.txt?qa=${expectedSha}`);
      if (response.ok && text.trim() === expectedSha) return;
    } catch {}
    if (i < 23) await sleep(10000);
  }
  throw new Error('Production deployment marker did not reach expected SHA ' + expectedSha);
}
function xmlLocs(xml) { return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()); }
async function discoverUrls() {
  const robots = await getText(origin + '/robots.txt').catch(() => null);
  const sitemapCandidates = [];
  if (robots?.response.ok) for (const m of robots.text.matchAll(/^Sitemap:\s*(\S+)/gim)) sitemapCandidates.push(m[1]);
  sitemapCandidates.push(origin + '/sitemap-index.xml', origin + '/sitemap.xml');
  const seenMaps = new Set(), urls = new Set(), queue = [...new Set(sitemapCandidates)];
  while (queue.length) {
    const url = queue.shift();
    if (!url || seenMaps.has(url)) continue;
    seenMaps.add(url);
    let result; try { result = await getText(url); } catch { continue; }
    if (!result.response.ok) continue;
    for (const loc of xmlLocs(result.text)) {
      if (/\.xml($|\?)/i.test(loc)) queue.push(loc);
      else if (loc.startsWith(origin)) urls.add(loc);
    }
  }
  if (!urls.size) throw new Error('No public URLs discovered from sitemap');
  return [...urls].sort();
}
function staleFinding(url, html) {
  const path = new URL(url).pathname;
  const normalized = html.replace(/\s+/g, ' ');
  const findings = [];
  if (profile === 'creative') {
    if (path === '/tools/pixverse/' && /(初回90|毎日60cr|毎日60クレジット|要認可（公式規約）)/.test(normalized)) findings.push('stale PixVerse pricing/credit/commercial wording');
    if (path === '/tools/vidu-ai/' && /(最大7枚|日本語UI非対応)/.test(normalized)) findings.push('stale Vidu Q3/Japanese UI wording');
    if (path === '/tools/seaart-ai/' && /商用利用.{0,80}(不明|unknown)/i.test(normalized)) findings.push('stale SeaArt commercial-use wording');
  }
  return findings;
}
async function inspect(url) {
  const { response, text } = await getText(url);
  const errors = [];
  if (response.status !== 200) errors.push('HTTP ' + response.status);
  const type = response.headers.get('content-type') || '';
  if (type.includes('text/html')) {
    if (!/<link[^>]+rel=["']canonical["'][^>]*>/i.test(text) && !/<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]*>/i.test(text)) errors.push('canonical missing');
    errors.push(...staleFinding(url, text));
  }
  return { url, errors };
}
async function main() {
  await waitForRelease();
  const urls = await discoverUrls();
  const failures = [];
  const concurrency = 8;
  let cursor = 0;
  async function worker() {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      try { const result = await inspect(url); if (result.errors.length) failures.push(result); }
      catch (error) { failures.push({ url, errors: [error?.message || String(error)] }); }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  console.log(`Checked ${urls.length} sitemap URLs on ${origin}`);
  if (failures.length) {
    for (const f of failures) console.error('FAIL ' + f.url + ' :: ' + f.errors.join('; '));
    throw new Error(`${failures.length} production URL(s) failed QA`);
  }
  console.log('PASS: all sitemap URLs returned HTTP 200, HTML pages expose canonical, and targeted stale-copy guards are clean');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
