---
task_id: "2026-11-06-banner-create-intent"
created_at: "2026-11-06"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false
goal: "Clarify 'バナー作成AI' and 'バナー生成AI' as two ways to describe the same tool-comparison page in the title, description and visible H1, preserving content and editorial rankings."
non_goals:
  - "Change tool rankings, facts, product prices, CTA, affiliate, URL, canonical, schemas or production"
target_files:
  - docs/tasks/active/2026-11-06-banner-create-intent.md
  - src/pages/comparisons/ad-banner-ai-tools/index.astro
reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/analytics/gsc/2026-08-13/analysis-summary.md
unknowns:
  - "2026-07-27..08-12 query data is old and site-level; query×page is unavailable, so current exact landing page attribution requires fresh GSC"
  - "Google may rewrite page snippets or titles; rank/CTR improvement is not proven"
preexisting_untracked_files: []
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - git diff --check
  - npm run validate:scope
acceptance_criteria:
  - "Title, meta description and H1 truthfully describe the actual comparison of banner-making/editing/generation tools without promising unverified hands-on testing"
  - "The terms バナー作成 and バナー生成 appear naturally in title and main heading"
  - "No other content, images, tool attributes, structured data, affiliate, canonical, URL or site setting changes"
  - "GitHub Actions build/data/publish/CTA PASS; all local task/scope gates before merge; Draft PR only"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

Scope: existing `/comparisons/ad-banner-ai-tools/` only. Distinguish this tool-comparison landing page from `/use-cases/ad-banner/` (step-by-step how-to), which should remain unchanged.

**Measured historical signal (17d 2026-07-27..08-12):**
- `バナー生成ai比較` 15 impressions /0 clicks /avg position14.13.
- `バナー作成ai比較` 16 impressions /0 clicks /avg position21.38.
- `/comparisons/ad-banner-ai-tools/` page: 33 impressions /0 clicks /avg position16.12.
- Query-only and page-only tables **do not establish that both queries landed on this URL**. No change will be described as current validated search traffic optimization.

**Change:** Replace the existing 'おすすめ' headline with a description of the actual comparative scope. Page covers template editing, image generation and text-oriented banner production, including free/commercial use/Japanese-text considerations. No unverified score or ranking claims.

**Validation:** Check changed HTML title/meta/H1 and actual tool contents; CI checks must pass. After explicit production approval, compare same-length finalized GSC periods and Page×Query to assess whether the intervention helped; avoid attributing all movement to the snippet.
