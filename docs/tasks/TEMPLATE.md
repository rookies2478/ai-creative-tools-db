---
task_id: ""
created_at: ""
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: ""

non_goals: []

target_files: []

reference_files:
  - docs/tasks/LATEST.md

unknowns: []

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run build
  - git diff --check
  - npm run validate:scope

acceptance_criteria: []

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

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
