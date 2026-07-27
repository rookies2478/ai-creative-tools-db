---
task_id: "add-data-publish-validation-to-ci"
created_at: "2026-07-27"
status: DONE
completed_at: "2026-07-27"
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Add the existing data and publish validators to the GitHub Actions build workflow without introducing deployment, secrets, analytics acquisition, or runtime changes."

non_goals:
  - GSC API取得
  - GSC importer実行
  - Clarity取得
  - raw rotation
  - analyticsデータ保存
  - GitHub Secrets追加
  - artifact upload
  - production deploy
  - FTP／ConoHa連携
  - schedule実行
  - page変更
  - DB変更
  - validatorロジック変更
  - package dependency追加

target_files:
  - .github/workflows/build.yml
  - docs/tasks/active/add-data-publish-validation-to-ci.md
  - docs/tasks/completed/2026-07-27-add-data-publish-validation-to-ci.md
  - docs/tasks/LATEST.md

reference_files:
  - CLAUDE.md
  - package.json
  - scripts/validate-data.mjs
  - scripts/validate-publish.mjs
  - docs/tasks/LATEST.md

unknowns:
  - Existing workflow file name and current trigger configuration. (確認済み: .github/workflows/build.yml、push masterおよびpull_request)
  - Whether the workflow currently runs build before or after other checks. (確認済み: 現状はnpm ci→npm run buildのみ)
  - Whether publish warnings return exit code 0 as designed. (確認済み: validate-publish.mjsはerrors>0の場合のみexit 1)

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
  - workflow YAML parse or syntax review
  - npm run validate:data
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - validate:data runs in GitHub Actions.
  - build runs in GitHub Actions.
  - validate:publish runs in GitHub Actions.
  - Workflow runs on existing push/PR triggers without broadening them unnecessarily.
  - No deploy step is added.
  - No secrets are referenced.
  - No analytics acquisition or raw processing is added.
  - Existing local validators still pass.
  - Scope validation passes.
  - Only the workflow and task documentation change.

forbidden_operations:
  - PRODUCTION_DEPLOY
  - SECRET_ACCESS
  - EXTERNAL_NETWORK_ANALYTICS
  - RAW_PROCESSING
---

# Task

## Background

既存のGitHub Actions build workflow（.github/workflows/build.yml）はcheckout→setup-node→npm ci→npm run buildのみで、DB品質検証・公開前品質検証がCIで自動実行されていない。scripts/validate-data.mjsとscripts/validate-publish.mjsをbuild前後にそれぞれ追加し、ローカルと同じ品質ゲートをGitHub上でも継続的に検証できるようにする。

## Result Schema

```
RESULT: PASS | HOLD | BLOCKED

SUMMARY:
1-3 lines

CHANGED_FILES:
count and paths

CHECKS:
- task_validation:
- workflow_syntax:
- validate_data:
- build:
- validate_publish:
- diff_check:
- scope_validation:

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

- previous_workflow: `.github/workflows/build.yml`（name: Build、trigger: push masterおよびpull_request、runs-on: ubuntu-latest、checkout@v4→setup-node@v4(node-version-file=package.json, cache=npm)→npm ci→npm run buildのみ。permissions未定義、secrets参照なし、deploy/artifact upload/schedule triggerなし）
- added_steps: `npm run validate:data`（build前、named "Validate tool data"）と`npm run validate:publish`（build後、named "Validate published output"）
- execution_order: checkout → setup-node → npm ci → Validate tool data → Build site → Validate published output
- triggers: 変更なし（push masterおよびpull_request）
- permissions: `contents: read`を新規追加（既存未定義だったため最小権限を明示。write権限は使用しない）
- secret_usage: なし
- deployment_state: 変更なし（デプロイステップは元々存在せず、今回も追加していない）
- changed_files: 4件（.github/workflows/build.yml, docs/tasks/completed/2026-07-27-add-data-publish-validation-to-ci.md, docs/tasks/LATEST.md）+ active task削除
- checks: validate:task PASS / workflow YAML構造確認（タブ文字なし、jobs/steps構造正常、named steps 3件）/ validate:data PASS（Files 29, Errors 0, Warnings 0, Verify 0）/ build PASS（92ページ）/ validate:publish PASS（Errors 0, Warnings 4、exit code 0で確認、新規違反なし）/ git diff --check PASS / validate:scope PASS
- git: commit・push未実行時点でこのファイルを作成。実SHAはGIT欄で別途確定する
- production: NOT_DEPLOYED
- unresolved: GitHub Actions実行結果（実際のCI run）は本ローカル検証では確認できず、push後に別途確認する
- next: Collect the next 28-day GSC export before making SEO changes.（Clarity・rotation等の次候補があっても、SEO変更自体は次回GSC取得までHOLD）
