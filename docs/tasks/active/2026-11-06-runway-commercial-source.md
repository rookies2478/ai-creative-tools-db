---
task_id: "2026-11-06-runway-commercial-source"
created_at: "2026-11-06"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "Remove an ambiguous and potentially misleading statement about plan-dependent commercial use from the Runway tool page, and cite Runway's official commercial use help."
non_goals:
  - "Change pricing, models, plan entitlements, rights policy fields, CTA, affiliate, canonical, UI, schema, or deployment"
target_files:
  - docs/tasks/active/2026-11-06-runway-commercial-source.md
  - src/pages/tools/runway/index.astro
reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/analytics/growth-loop.md
unknowns:
  - "No new completed GSC Page×Query is available in this GPT connector; do not infer a ranking lift."
  - "Software model versions and plan-specific available features are distinct from commercial use permission."
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
  - "Page opening no longer implies that Runway commercial-use permission itself differs by subscription plan."
  - "Opening text is consistent with official help and explains that the user's rights in uploaded inputs and policy obligations remain."
  - "Runway official commercial-use source is displayed in existing sources list."
  - "No price, model, tool DB, CTA, URL, affiliate tracking, or deployment changes."
  - "GitHub Actions build and relevant checks PASS; local scope gate before merge; Draft PR only."
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Evidence

2026-10-01..10-28 archive: `/tools/runway/` declined 134 to 60 impressions, avg position 10.6 to 13.4 (source: `docs/audits/gpt-creative-2026-10-31.md`). Older 2026-07-27..08-12 query-only `runway 商用利用` had 12 impressions / avg pos 12.92; actual Page×Query landing attribution is NOT_VERIFIED.

Runway official help as of 2026-11-06:
- https://help.runwayml.com/hc/en-us/articles/21668707517587-Can-I-use-the-content-I-made-in-Runway-for-commercial-purposes
- https://help.runwayml.com/hc/en-us/articles/18927776141715-Usage-rights

It states generated content is not restricted to non-commercial use by Runway (including Free), while users remain responsible for input rights, copyright/other third-party rights and acceptable-use compliance. Page currently opens with `商用利用条件はプランによって異なり`, conflicting with the more precise claim already in its own commercialInfo section. This is an official-source factual correction, not speculative keyword stuffing.

# Validation

Current master readback; patch exclusively lead and sources. GitHub Actions will verify build/data/publish/CTA but not local active task gate. Do not merge until all local checks PASS and owner approves. Production must stay unchanged.
