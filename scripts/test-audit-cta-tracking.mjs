import assert from 'node:assert/strict';
import { parseAffiliateEntries, parseCtaProp, isAffiliateHost, auditTool, runAudit } from './audit-cta-tracking.mjs';

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

// whole repo must be clean
const r = runAudit();
assert.deepEqual(r.errors, []);
assert.ok(r.toolCount >= 29);
console.log('audit-cta-tracking tests: PASS');
