#!/usr/bin/env node
// Static audit of CTA / affiliate tracking for every tool detail page.
// Usage:
//   node scripts/audit-cta-tracking.mjs            # print summary, exit 1 on errors
//   node scripts/audit-cta-tracking.mjs --write    # also write reports/cta-tracking-audit.{md,json}
// Contract: docs/analytics/cta-event-schema.md. Read-only on src/; no network.

import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const AFFILIATE_HOST_HINTS = ['sjv.io', 'a8.net', 'afi-b.com', 'valuecommerce.com', 'accesstrade.net', 'moshimo.com', 'linksynergy.com', 'impact.com', 'shareasale.com', 'partnerstack.com', 'refersion.com', 'tapfiliate.com', 'firstpromoter.com'];
export const REQUIRED_EVENT_PARAMS = ['tool_name', 'tool_slug', 'placement', 'link_type', 'affiliate_provider', 'destination_url', 'destination_domain', 'page_path'];
const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8').replace(/\r\n/g, '\n');

const hostOf = (u) => {
  try { return new URL(u).hostname; } catch { return ''; }
};
export const isAffiliateHost = (u) => {
  const h = hostOf(u);
  return AFFILIATE_HOST_HINTS.some((x) => h === x || h.endsWith('.' + x));
};

export function parseAffiliateEntries(src) {
  const out = [];
  for (const m of src.matchAll(/\{[^{}]*toolSlug:\s*'([^']+)'[^{}]*\}/g)) {
    const b = m[0];
    const g = (k) => (b.match(new RegExp(k + ":\\s*'([^']*)'")) || [])[1];
    out.push({ toolSlug: m[1], placement: g('placement') || 'primary', url: g('url'), provider: g('provider'), enabled: /enabled:\s*true/.test(b), approved: g('approvalStatus') === 'approved' });
  }
  return out;
}

export function parseCtaProp(src, prop) {
  const m = src.match(new RegExp(prop + '=\\{\\{([\\s\\S]*?)\\}\\}'));
  if (!m) return null;
  const body = m[1];
  const lit = (k) => (body.match(new RegExp(k + ":\\s*'([^']*)'")) || [])[1];
  const hrefLit = lit('href');
  const hrefVar = hrefLit ? null : (body.match(/href:\s*([A-Za-z_][\w.]*)/) || [])[1] || null;
  const dynamicType = /outboundType:\s*[A-Za-z_][\w.]*/.test(body);
  return { prop, href: hrefLit || null, hrefVar, outboundType: lit('outboundType') || (dynamicType ? '(dynamic)' : null), ctaPosition: lit('ctaPosition') || null, hasProvider: /affiliateProvider:/.test(body) };
}

export function auditTool(slug, ctx) {
  const rows = [];
  const errors = [];
  const warns = [];
  const pagePath = `src/pages/tools/${slug}/index.astro`;
  const override = existsSync(join(ROOT, pagePath));
  const pageSrc = override ? read(pagePath) : read('src/pages/tools/[slug].astro');
  const usesDetail = override && /components\/ToolDetailPage/.test(pageSrc);
  const usesAdobe = override && /components\/AdobeFireflyTool/.test(pageSrc);
  const template = override ? (usesDetail ? 'ToolDetailPage' : usesAdobe ? 'AdobeFireflyTool' : 'custom') : '[slug].astro';
  const affEntries = ctx.affiliate.filter((e) => e.toolSlug === slug && e.enabled && e.approved);
  const resolverUsed = /resolveToolOutboundLink/.test(pageSrc);

  if (usesDetail) {
    for (const prop of ['primaryCta', 'secondaryCta']) {
      const c = parseCtaProp(pageSrc, prop);
      if (!c) {
        if (prop === 'primaryCta') errors.push(`${slug}: primaryCta not found`);
        continue;
      }
      const explicit = c.outboundType;
      const effective = explicit || (ctx.detailDefaultsOfficial ? 'official' : 'NONE');
      let affiliate = false;
      if (c.hrefVar) {
        if (!resolverUsed) errors.push(`${slug}: ${prop} href is dynamic (${c.hrefVar}) but resolveToolOutboundLink is not used`);
        affiliate = affEntries.length > 0;
        if (affEntries.length && explicit !== '(dynamic)') errors.push(`${slug}: ${prop} may resolve to affiliate but outboundType is not derived from resolver`);
        if (affEntries.length && !c.hasProvider) errors.push(`${slug}: ${prop} affiliate CTA lacks affiliateProvider`);
      } else {
        const aff = isAffiliateHost(c.href) || ctx.affiliate.some((e) => e.url === c.href);
        if (aff) errors.push(`${slug}: ${prop} hard-codes affiliate URL ${c.href} outside resolveToolOutboundLink`);
        if (explicit === 'affiliate' && !aff) errors.push(`${slug}: ${prop} marked affiliate but href is not an affiliate URL`);
        if (explicit === 'official' && aff) errors.push(`${slug}: ${prop} affiliate URL marked official`);
        if (!explicit) warns.push(`${slug}: ${prop} has no explicit outboundType (relies on ToolDetailPage default 'official')`);
      }
      if (effective === 'NONE') errors.push(`${slug}: ${prop} would not be tracked`);
      rows.push({
        slug,
        cta: prop,
        placement: c.ctaPosition || (prop === 'primaryCta' ? 'primary' : 'secondary'),
        href: c.href || `(resolver:${c.hrefVar})`,
        type: affiliate ? 'affiliate(resolver)' : effective,
        event: affiliate ? 'affiliate_click|official_site_click' : effective === 'affiliate' ? 'affiliate_click' : effective === 'official' ? 'official_site_click' : 'NONE',
        tracked: effective !== 'NONE',
      });
    }
  } else if (usesAdobe) {
    const comp = read('src/components/AdobeFireflyTool.astro');
    const anchors = [...comp.matchAll(/<a href=\{(primaryCta|secondaryCta)\.href\}[^>]*>/g)];
    for (const m of anchors) {
      const ok = /data-outbound-type="official"/.test(m[0]) && /data-tool-slug="adobe-firefly"/.test(m[0]) && /data-cta-position=/.test(m[0]);
      if (!ok) errors.push(`${slug}: ${m[1]} anchor lacks tracking attributes`);
      rows.push({ slug, cta: m[1], placement: (m[0].match(/data-cta-position="([^"]+)"/) || [])[1] || '', href: '(component prop)', type: 'official', event: 'official_site_click', tracked: ok });
    }
    if (!anchors.length) errors.push(`${slug}: no CTA anchors found in AdobeFireflyTool`);
  } else if (template === '[slug].astro') {
    const cta = [...pageSrc.matchAll(/<a href=\{data\.affiliateUrl \?\? data\.officialUrl\}[\s\S]*?class="btn btn-primary"/g), ...pageSrc.matchAll(/<a\n\s+href=\{data\.affiliateUrl \?\? data\.officialUrl\}[\s\S]*?class="btn btn-primary"/g)];
    cta.forEach((m, i) => {
      const ok = /data-outbound-type=/.test(m[0]) && /data-tool-slug=/.test(m[0]) && /data-cta-position=/.test(m[0]);
      if (!ok) errors.push(`${slug}: [slug].astro CTA #${i + 1} lacks tracking attributes`);
      if (!/sponsored/.test(m[0])) errors.push(`${slug}: [slug].astro CTA #${i + 1} lacks sponsored rel for affiliate case`);
      rows.push({ slug, cta: `slug-cta-${i + 1}`, placement: (m[0].match(/data-cta-position="([^"]+)"/) || [])[1] || '', href: 'data.affiliateUrl ?? data.officialUrl', type: 'official|affiliate (frontmatter)', event: 'official_site_click|affiliate_click', tracked: ok });
    });
    if (!cta.length) errors.push(`${slug}: no CTA anchors found in [slug].astro`);
  }

  // untracked external anchors written directly in the page file (table cells etc.)
  const inline = [...pageSrc.matchAll(/<a\s[^>]*href="(https?:\/\/[^"]+)"[^>]*>/g)].filter((m) => !/data-outbound-type/.test(m[0]));
  for (const m of inline) {
    if (/target="_blank"/.test(m[0]) && !/noopener/.test(m[0])) errors.push(`${slug}: target=_blank without noopener (${m[1]})`);
    if (isAffiliateHost(m[1])) errors.push(`${slug}: untracked affiliate-host link ${m[1]}`);
  }
  if (ctx.affiliate.some((e) => e.toolSlug === slug && (pageSrc.includes(`'${e.url}'`) || pageSrc.includes(`"${e.url}"`)))) {
    errors.push(`${slug}: affiliate URL literal in page (use resolver)`);
  }
  return { slug, template, resolverUsed, affiliateEnabled: affEntries.length > 0, ctaCount: rows.length, trackedCtaCount: rows.filter((r) => r.tracked).length, untrackedInlineExternal: inline.length, rows, errors, warns };
}

export function runAudit() {
  const slugs = readdirSync(join(ROOT, 'src/content/tools')).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')).sort();
  const detail = read('src/components/ToolDetailPage.astro');
  const base = read('src/layouts/BaseLayout.astro');
  const global = [];
  const ctx = {
    affiliate: parseAffiliateEntries(read('src/data/toolAffiliateLinks.ts')),
    detailDefaultsOfficial: /outboundType \?\? 'official'/.test(detail),
  };
  if (!ctx.detailDefaultsOfficial) global.push('ToolDetailPage does not default outboundType to official');
  for (const p of REQUIRED_EVENT_PARAMS) {
    if (!new RegExp(`\\b${p}:`).test(base)) global.push(`BaseLayout gtag event missing param: ${p}`);
  }
  if (!/affiliate_click/.test(base) || !/official_site_click/.test(base)) global.push('BaseLayout missing affiliate_click/official_site_click');
  const slugSrc = read('src/pages/tools/[slug].astro');
  for (const f of readdirSync(join(ROOT, 'src/content/tools'))) {
    if (/^affiliateUrl:/m.test(read(`src/content/tools/${f}`)) && !/data-affiliate-provider/.test(slugSrc)) {
      global.push(`${f}: frontmatter affiliateUrl set but [slug].astro emits no data-affiliate-provider`);
    }
  }
  const tools = slugs.map((s) => auditTool(s, ctx));

  // duplicate / dead CTA components
  const pageFiles = readdirSync(join(ROOT, 'src/pages/tools'), { recursive: true }).map(String).filter((f) => f.endsWith('.astro'));
  const pagesText = pageFiles.map((f) => read('src/pages/tools/' + f.replace(/\\/g, '/'))).join('\n');
  const ctaComponents = readdirSync(join(ROOT, 'src/components'))
    .filter((f) => f.endsWith('.astro') && /class="btn btn-primary"/.test(read('src/components/' + f)) && /target="_blank"/.test(read('src/components/' + f)))
    .map((f) => ({ name: f, usedByToolPages: pagesText.includes(`components/${f.replace('.astro', '')}'`) }));
  const errors = [...global, ...tools.flatMap((t) => t.errors)];
  const warns = tools.flatMap((t) => t.warns);
  for (const c of ctaComponents) {
    if (!c.usedByToolPages) warns.push(`component ${c.name} renders a primary CTA but no tool page imports it (dead/duplicate CTA implementation)`);
  }
  return { generatedFor: 'src/content/tools/*.md', toolCount: tools.length, tools, ctaComponents, errors, warns };
}

function toMarkdown(r) {
  const L = ['# CTA計測 静的監査', '', '生成: `npm run audit:cta -- --write`（手編集禁止）。契約: `docs/analytics/cta-event-schema.md`', '', `- ツール数: ${r.toolCount}`, `- errors: ${r.errors.length} / warnings: ${r.warns.length}`, '', '| tool_slug | template | CTA計測 | affiliate(resolver) | 未計測インライン外部リンク | status |', '|---|---|---|---|---|---|'];
  for (const t of r.tools) L.push(`| ${t.slug} | ${t.template} | ${t.trackedCtaCount}/${t.ctaCount} | ${t.affiliateEnabled ? 'yes' : '-'} | ${t.untrackedInlineExternal} | ${t.errors.length ? 'FAIL' : 'OK'} |`);
  L.push('', '## CTA一覧', '', '| tool_slug | cta | placement | href | type | event |', '|---|---|---|---|---|---|');
  for (const t of r.tools) for (const c of t.rows) L.push(`| ${c.slug} | ${c.cta} | ${c.placement} | ${c.href} | ${c.type} | ${c.event} |`);
  L.push('', '## Errors', '', ...(r.errors.length ? r.errors.map((e) => `- ${e}`) : ['- なし']), '', '## Warnings', '', ...(r.warns.length ? r.warns.map((e) => `- ${e}`) : ['- なし']));
  return L.join('\n') + '\n';
}

if (process.argv[1] && fileURLToPath(import.meta.url) === join(process.argv[1])) {
  const r = runAudit();
  if (process.argv.includes('--write')) {
    writeFileSync(join(ROOT, 'reports/cta-tracking-audit.md'), toMarkdown(r));
    writeFileSync(join(ROOT, 'reports/cta-tracking-audit.json'), JSON.stringify(r, null, 2) + '\n');
  }
  console.log(`cta-tracking-audit: tools=${r.toolCount} errors=${r.errors.length} warnings=${r.warns.length}`);
  r.errors.forEach((e) => console.log('ERROR ' + e));
  r.warns.forEach((e) => console.log('WARN  ' + e));
  process.exit(r.errors.length ? 1 : 0);
}
