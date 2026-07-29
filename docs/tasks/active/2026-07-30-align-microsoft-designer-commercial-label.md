---
task_id: "align-microsoft-designer-commercial-label"
created_at: "2026-07-30"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "/comparisons/ad-banner-ai-tools/ のMicrosoft Designer行のcommercial表示を、DB正本(src/content/tools/microsoft-designer.md commercialUse=\"no\")および確認済み公式規約に合わせて修正する"

non_goals:
  - DB正本の変更
  - Fotor AI行の変更
  - Ideogram行の変更
  - 他ツール行の変更
  - 比較表構造の変更
  - getCollectionへの置換
  - 共通コンポーネント化
  - title変更
  - meta description変更
  - H1変更
  - 本文変更
  - 内部リンク変更
  - CTA変更
  - CSS変更
  - URL変更
  - 新規記事作成
  - 本番反映

target_files:
  - src/pages/comparisons/ad-banner-ai-tools/index.astro
  - docs/tasks/active/2026-07-30-align-microsoft-designer-commercial-label.md

reference_files:
  - docs/tasks/LATEST.md
  - src/content/tools/microsoft-designer.md

unknowns: []

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
  - npm run build
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - 変更ファイルは1件のみ(src/pages/comparisons/ad-banner-ai-tools/index.astro)
  - Microsoft Designer行のcommercial表示のみが変更されている
  - DB正本は変更されていない
  - Fotor AI・Ideogram・他ツール行は変更されていない
  - build成功
  - diff check成功
  - scope validation成功
  - 表示崩れなし
  - 秘密情報露出なし

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

audit-only監査で、/comparisons/ad-banner-ai-tools/ のMicrosoft Designer行のcommercial表示（ハードコード「個人向け案内あり（要公式確認）」）が、DB正本(commercialUse="no"、verifiedAt 2026-07-12、Microsoft Designer利用規約でtrade or commerceの過程での利用は認められないと明記)と乖離していることが判明した。比較ページはgetCollection参照ではなく全項目ハードコードのため、DB更新が自動反映されない。

## Implementation Notes

- 変更前: `commercial: '個人向け案内あり（要公式確認）'`
- 変更後: `commercial: '個人利用限定（商用不可）'`
- 対象は該当行1件のみ。他ツール行・構造・スタイルは変更しない。

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
