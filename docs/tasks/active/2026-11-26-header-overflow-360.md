---
task_id: "2026-11-26-header-overflow-360"
created_at: "2026-11-26"
status: READY
risk: LOW
current_phase: ui-fix
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "共通ヘッダー(BaseLayout)がスマホ幅(320-414px)で内側幅を超えて横溢れする問題を、ロゴ・CTA・メニューの寸法調整で解消し、回帰テストを追加する。"

non_goals:
  - "overflow:hidden等で溢れを隠さない"
  - "URL構造・ナビ項目・アフィリエイトリンク・計測の変更をしない"
  - "ヘッダー以外のページ内容（/tools/ のfilter-chips等）の横溢れは本タスクで修正しない"

target_files:
  - src/layouts/BaseLayout.astro
  - scripts/test-header-overflow.mjs
  - docs/tasks/active/2026-11-26-header-overflow-360.md
  - docs/tasks/completed/2026-11-25-seedream-vs-seedance-update.md
  - docs/tasks/active/2026-11-25-seedream-vs-seedance-update.md

reference_files:
  - docs/tasks/LATEST.md

unknowns: []

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run build
  - git diff --check
  - npm run validate:scope
  - node scripts/test-header-overflow.mjs

acceptance_criteria:
  - "320/360/375/390/414/768/1024/1366/1440pxでヘッダー内容が内側幅に収まる"
  - "scripts/test-header-overflow.mjs がPASSする"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

360px幅でヘッダー内容(ロゴ+CTA+メニュー)が内側幅(padding除く)を約8px超過。320pxではビューポートを約34px超過。
active枠を占有していたseedreamタスクはPR #97（eddba6e）でマージ済みのため、completed/へ移動した。

## Implementation Notes

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
