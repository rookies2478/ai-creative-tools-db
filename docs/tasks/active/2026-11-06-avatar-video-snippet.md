---
task_id: "2026-11-06-avatar-video-snippet"
created_at: "2026-11-06"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false
goal: "Replace raw URL paths in AI avatar comparison meta description with a concise, query-relevant reader-facing summary, preserving all page content and index/canonical state."
non_goals:
  - "Change page title, heading, factual tool claims, database, CTA, affiliate, schema, URL or production"
target_files:
  - docs/tasks/active/2026-11-06-avatar-video-snippet.md
  - src/pages/categories/avatar-video/index.astro
reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/analytics/growth-loop.md
unknowns:
  - "A title/description edit is not guaranteed to alter the rendered Google snippet or ranking"
  - "GSC query-by-page rows are unavailable from the current GPT connector; validate effect only after an appropriate completed window"
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
  - "Description contains no literal /categories/ or /use-cases/ URL paths"
  - "Description accurately matches the existing 4-tool comparison, relevant user intent, and disclosed verification caveats"
  - "All other page source, metadata, URL/canonical, affiliate, analytics and UI unchanged"
  - "Build/validations PASS before any release consideration; draft PR only"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# AI avatar comparison: meta description quality repair

Source issue: https://github.com/rookies2478/ai-creative-tools-db/issues/71

GSC from archived 2026-10-01..10-28: `/categories/avatar-video/` 108 impressions, 0 clicks, average position 13.8; query-level cause not yet proven. The current meta description contains route-like text `/categories/video-generation/` and `/use-cases/faceless-video/`, which is not helpful to people reading snippets. This is a narrowly scoped editorial quality correction, **not a claimed CTR gain**.

Do not modify title, comparison facts, scoring, schema, link targets, or site deployment. Evaluate future clicks/impressions after search re-crawl and finalized GSC data; attribution remains uncertain. Local validation is a release gate; no automatic merge.
