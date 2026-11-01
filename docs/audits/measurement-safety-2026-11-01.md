# Measurement safety audit — 2026-11-01

## Issue

#22 — GA4/Clarity production hostname gate + outbound destination URL minimization.

## Before

- `BaseLayout.astro` initialized GA4 and Clarity whenever `import.meta.env.PROD` was true.
- Cloudflare Pages Preview is also built in production mode, so Preview traffic could initialize analytics.
- outbound CTA events sent the resolved full `el.href` as `destination_url`, including query/hash.

## After

### Initialization gate

Measurement initialization requires BOTH:
- production build
- exact hostname `aicreative-db.com`

The helper intentionally returns false for:
- Cloudflare Pages preview hostnames
- `www.aicreative-db.com`
- localhost
- non-production builds

GA4 Measurement ID remains `G-YTH7GM5ZGT`.
Clarity Project ID remains `wo9noh1ex6`.

### destination_url minimization

For outbound CTA tracking:
- only http/https destinations are accepted
- analytics receives `origin + pathname`
- query string and hash are dropped
- invalid/non-http destinations become an empty string
- link navigation itself is unchanged

Example:
`https://example.com/path?utm_source=x&email=user@example.com#pricing`
becomes:
`https://example.com/path`

## Regression tests

`scripts/test-measurement-safety.mjs` covers:
- exact canonical production host = enabled
- canonical host + non-production build = disabled
- www / Pages preview / localhost = disabled
- query/hash removal
- relative URL normalization
- mailto/invalid URL rejection

`npm run build` runs the regression test before Astro build, so existing CI executes it without changing the workflow file.

## Explicit non-changes

- GA4 ID unchanged
- Clarity Project ID unchanged
- affiliate URLs unchanged
- CTA labels/navigation unchanged
- no Consent/Privacy redesign
- no CI workflow change
- no manual Production deploy

## Release verification still required

After merge/automatic production publication:
- confirm canonical host requests GA4 and Clarity
- confirm a Pages preview does not request GA4/Clarity
- confirm outbound event destination_url contains no query/hash
- confirm GA4 Realtime/DebugView as appropriate
- confirm Clarity project receives only intended production traffic

PRODUCTION: NOT_DEPLOYED manually by this task.
