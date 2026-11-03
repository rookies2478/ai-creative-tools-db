import assert from 'node:assert/strict';
import { CTA_PLACEMENTS, toCtaPlacement, toLinkPlacement, isCtaPlacement } from '../src/utils/ctaPlacement.ts';
import { parseAffiliateEntries, parseCtaProp, isAffiliateHost, auditTool, auditPlacements, runAudit } from './audit-cta-tracking.mjs';

// parseCtaProp
const c = parseCtaProp("primaryCta={{ label: 'x', href: 'https://a.example', outboundType: 'official', ctaPosition: 'hero' }}", 'primaryCta');
assert.equal(c.href, 'https://a.example');
assert.equal(c.outboundType, 'official');
const d = parseCtaProp('primaryCta={{ label: "x", href: outboundLink.url, outboundType: outboundLink.linkType, affiliateProvider: outboundLink.provider }}', 'primaryCta');
assert.equal(d.hrefVar, 'outboundLink.url');
assert.equal(d.outboundType, '(dynamic)');
assert.equal(d.hasProvider, true);
assert.equal(parseCtaProp('nothing', 'primaryCta'), null);

// affiliate host / entries
assert.equal(isAffiliateHost('https://invideo.sjv.io/abc'), true);
assert.equal(isAffiliateHost('https://runwayml.com/'), false);
const e = parseAffiliateEntries("[{ toolSlug: 'x', placement: 'primary', url: 'https://x.sjv.io/a', provider: 'P', enabled: true, approvalStatus: 'approved' }]");
assert.equal(e.length, 1);
assert.equal(e[0].enabled && e[0].approved, true);

// regression: without the default-official fallback, un-annotated CTAs must be flagged
const bad = auditTool('kling-ai', { affiliate: [], detailDefaultsOfficial: false });
assert.ok(bad.errors.some((m) => m.includes('would not be tracked')));
// affiliate URL registered but page hard-codes it -> flagged
const hard = auditTool('runway', { affiliate: [{ toolSlug: 'runway', placement: 'primary', url: 'https://runwayml.com', enabled: true, approved: true }], detailDefaultsOfficial: true });
assert.ok(hard.errors.some((m) => m.includes('affiliate')));

// secondary links: cell-link injection must be detected; dead TdpToolPage must not hide behind false positives
const full = runAudit();
assert.ok(full.ctaComponents.find((c) => c.name === 'ToolDetailPage.astro').usedByToolPages);
// orphan CTA components were removed; none may reappear (TdpToolPage / LeonardoAiTool / MidjourneyTool)
assert.deepEqual(full.ctaComponents.filter((c) => !c.usedByToolPages).map((c) => c.name), []);
assert.ok(!full.ctaComponents.some((c) => /^(TdpToolPage|LeonardoAiTool|MidjourneyTool)\.astro$/.test(c.name)));
assert.equal(auditTool('kling-ai', { affiliate: [], detailDefaultsOfficial: true, detailTracksCellLinks: false }).untrackedInlineExternal, 1);
assert.equal(auditTool('kling-ai', { affiliate: [], detailDefaultsOfficial: true, detailTracksCellLinks: true }).untrackedInlineExternal, 0);

// placement mapping
assert.deepEqual([...CTA_PLACEMENTS].sort(), ['checklist', 'hero', 'pricing', 'primary', 'secondary', 'source', 'table', 'terms']);
assert.equal(toCtaPlacement('primary'), 'hero');
assert.equal(toCtaPlacement('pricing'), 'pricing');
assert.equal(toLinkPlacement('hero'), 'primary');
assert.equal(toLinkPlacement('checklist'), 'primary');
assert.equal(toLinkPlacement('pricing'), 'pricing');
for (const p of ['secondary', 'table', 'source', 'terms', 'bogus']) assert.equal(toLinkPlacement(p), null, p);
assert.equal(isCtaPlacement('hero'), true);
assert.equal(isCtaPlacement('Hero'), false);
const okLayout = 'cta_position: ctaPosition, placement: ctaPosition,';
assert.deepEqual(auditPlacements([{ file: 'a.astro', text: '<a data-cta-position="hero">' }], okLayout), []);
assert.ok(auditPlacements([{ file: 'a.astro', text: '<a data-cta-position="heroo">' }], okLayout).length === 1);
assert.ok(auditPlacements([{ file: 'a.astro', text: "primaryCta={{ ctaPosition: 'nope' }}" }], okLayout).length === 1);
assert.ok(auditPlacements([], 'cta_position: a, placement: b,').length === 1);
const mapped = "const l = resolveToolOutboundLink({ toolSlug: 'x', officialUrl: 'https://x.example', placement: 'pricing' });\nsecondaryCta={{ href: l.url, ctaPosition: 'pricing' }}";
assert.deepEqual(auditPlacements([{ file: 'p.astro', text: mapped }], okLayout), []);
assert.equal(auditPlacements([{ file: 'p.astro', text: mapped.replace("ctaPosition: 'pricing'", "ctaPosition: 'hero'") }], okLayout).length, 1);

// whole repo must be clean
const r = runAudit();
assert.deepEqual(r.errors, []);
assert.ok(r.toolCount >= 29);
console.log('audit-cta-tracking tests: PASS');
