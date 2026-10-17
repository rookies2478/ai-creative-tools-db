---
task_id: "2026-10-18-validate-publish-crlf-fix"
created_at: "2026-10-18"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "validate-publish.mjs のVideoObject適格slug抽出がCRLF改行(Windows checkout)で空集合になり、master上でも偽のvideoobject-scope-violation(kling-ai/pixverse)が出る不具合を修正する。"

non_goals:
  - アフィリエイトURL・承認状態・CTA・本文の変更
  - validate-publishのルール追加・緩和

target_files:
  - scripts/validate-publish.mjs
  - docs/tasks/active/2026-10-18-validate-publish-crlf-fix.md

reference_files:
  - docs/tasks/LATEST.md
  - src/data/generatedVideos.ts

unknowns:
  - GitHub Actions(Linux/LF)は元々PASSのため本修正でCI結果は変わらない想定

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - CRLF checkout上で npm run validate:publish が Errors: 0 になる

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

2026-10-18 affiliate監査中、Windows(core.autocrlf=true)のworktreeで master 458cbbe に対し validate:publish が Errors: 2 (kling-ai, pixverse) を返した。原因は generatedVideos.ts のエントリ分割正規表現が LF 前提であること。
