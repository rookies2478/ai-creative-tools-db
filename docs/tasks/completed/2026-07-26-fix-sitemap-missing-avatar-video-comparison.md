---
task_id: "fix-sitemap-missing-avatar-video-comparison"
created_at: "2026-07-26"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Add the existing public avatar-video comparison route to the generated sitemap without changing the page, route, validator, or unrelated sitemap entries."

non_goals:
  - No broken-link fix
  - No new comparison page
  - No metadata edits
  - No validator changes
  - No production deployment

target_files:
  - src/pages/sitemap.xml.ts
  - docs/tasks/active/fix-sitemap-missing-avatar-video-comparison.md
  - docs/tasks/completed/2026-07-26-fix-sitemap-missing-avatar-video-comparison.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - scripts/validate-publish.mjs
  - src/pages/comparisons/avatar-video-ai-tools/index.astro

unknowns:
  - The exact insertion position must follow the existing comparisons ordering in STATIC_PATHS.
  - The sitemap URL count should increase by exactly one after the fix.

preexisting_untracked_files:
  - aicreative-db.com-Performance-on-Search-2026-07-10.zip
  - gsc-fotor-ai-queries-2026-07-10.zip
  - gsc-kling-ai-queries-2026-07-10.zip
  - gsc-luma-ai-queries-2026-07-10.zip
  - gsc-microsoft-designer-queries-2026-07-10.zip
  - gsc-runway-queries-2026-07-10.zip
  - gsc-stable-diffusion-queries-2026-07-10.zip
  - prod_check.html

required_checks:
  - npm run validate:task
  - npm run validate:data
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - /comparisons/avatar-video-ai-tools/ is present exactly once in STATIC_PATHS.
  - The existing comparison page file is unchanged.
  - Its canonical remains https://aicreative-db.com/comparisons/avatar-video-ai-tools/.
  - npm run validate:publish no longer reports public-route-missing-from-sitemap for this route.
  - Sitemap URL count increases from 89 to 90.
  - The remaining publish ERROR is only broken-internal-link for /comparisons/free-ai-video-tools/.
  - Existing long-meta-description warnings remain unchanged at 4.
  - No unrelated sitemap entry changes.
  - No validator, schema, DB, route, or slug changes.
  - Build succeeds.
  - Scope validation succeeds.

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

npm run validate:publishが検出した既存ERROR「public-route-missing-from-sitemap」（/comparisons/avatar-video-ai-tools/）を、src/pages/sitemap.xml.tsのSTATIC_PATHSへの1行追加で解消する。

## Implementation Notes

- STATIC_PATHS内の既存comparisons系URLの並びに合わせて1行追加するのみ。
- 対象ページ本体・sitemap生成ロジック・validatorは変更しない。

## Result Schema

```
RESULT: PASS | HOLD | BLOCKED

SUMMARY:
1-3 lines

CHANGED_FILES:
count and paths

CHECKS:
- task_validation:
- build:
- diff_check:
- scope_validation:
- data_quality:
- publish_check:
- preview:
- github_actions:

GIT:
- commit:
- push:
- origin_sync:

PRODUCTION:
NOT_DEPLOYED | DEPLOYED | NEEDS_VERIFICATION

LATEST_UPDATED:
yes | no

NEXT:
one concrete next action
```

## Result

status: DONE

src/pages/sitemap.xml.ts の STATIC_PATHS に `/comparisons/avatar-video-ai-tools/` を1行追加。既存comparisons系URLの並び（ad-banner-ai-toolsの直後）に挿入。

- added_route: /comparisons/avatar-video-ai-tools/
- previous_sitemap_urls: 89
- current_sitemap_urls: 90
- duplicate_entries: 0（sitemap.xml内で該当URLは1件のみ）
- canonical: https://aicreative-db.com/comparisons/avatar-video-ai-tools/（変更なし、自己参照維持）
- noindex: false（変更なし）
- public-route-missing-from-sitemap ERROR: 解消済み
- 残存ERROR: broken-internal-link（/guides/ai-generation-credits-guide/ → /comparisons/free-ai-video-tools/、未作成ページ、今回対応せず）
- 残存WARNING: long-meta-description 4件（変更なし、今回対応せず）
- validate:data: Files 29, Errors 0, Warnings 0, Verify 0（維持）
- build: 92 pages 成功
- diff --check: PASS
- validate:scope: PASS（active task移動前に実施）
- 対象ページ本体・sitemap生成ロジックの他部分・validatorは無変更
