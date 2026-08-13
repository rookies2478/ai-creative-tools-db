---
task_id: "2026-08-13-big-keyword-seo-priority-audit"
created_at: "2026-08-13"
status: COMPLETED
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "12ツール（stable-diffusion/photoroom/adobe-firefly/kling-ai/hailuo-ai/luma-ai/recraft/pika/runway/pixverse/vidu-ai/creatify）のbig keyword SEO強化優先度を検索需要・GSC実績・SERP難易度・ページ品質・カニバリリスク・編成適合度から採点し、次にSEO強化すべき既存ツールページ最大3件（PRIORITY_NOW）を選定する。実装は行わない選定監査のみ。"

non_goals:
  - "src/content/tools/*.mdおよび本番反映系ページの変更"
  - "新規スタンドアロン記事の作成"
  - "本番デプロイ"
  - "commit/push"

target_files:
  - docs/tasks/active/2026-08-13-big-keyword-seo-priority-audit.md
  - docs/tasks/completed/2026-08-13-big-keyword-seo-priority-audit.md
  - docs/audits/big-keyword-seo-priority-2026-08-13.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/search-volume-data-governance.md
  - docs/seo-research/ai-tools-search-volume-master.xlsx
  - docs/analytics/gsc/
  - src/content/tools/stable-diffusion.md
  - src/content/tools/photoroom.md
  - src/content/tools/adobe-firefly.md
  - src/content/tools/kling-ai.md
  - src/content/tools/hailuo-ai.md
  - src/content/tools/luma-ai.md
  - src/content/tools/recraft.md
  - src/content/tools/pika.md
  - src/content/tools/runway.md
  - src/content/tools/pixverse.md
  - src/content/tools/vidu-ai.md
  - src/content/tools/creatify.md

unknowns:
  - "ライブSERP観測はブラウザ/Web検索アクセスの可否に依存する（不可の場合は既存レポート・過去の観測記録で代替しHOLDまたは限界事項として明記）"
  - "GSCデータの最新粒度（14日/17日/28日/3ヶ月）が全12ツールで揃っているとは限らない"

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run validate:scope
  - git diff --check

acceptance_criteria:
  - "12ツール全件についてcanonical workbookの実値を再読込し使用していること（コピー値のまま採用しない）"
  - "各ツールについてGSCデータが無い場合はNO_GSC_DATAと明記していること"
  - "PRIORITY_NOWは最大3件、根拠なく3件に揃えていないこと"
  - "カニバリゼーションチェックで/tools/<slug>/を正しい正本として扱っていること"
  - "src/content・src/pages等の本番反映系ファイルが無変更であること"
  - "commit/pushを行っていないこと"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - PRODUCTION_FILE_CHANGE
---

# Task

## Background

12ツールの検索ボリューム調査が完了した（VERIFY-9反映済み、commit 5d71f6a）。次段階として、どのツールページへ次のSEO強化リソースを投じるべきかを、検索需要だけでなくGSC実績・SERP難易度・ページ品質・カニバリリスクを合わせて選定する。

## Implementation Notes

- Phase順は user instruction のPHASE 1〜13に従う。
- ライブSERP確認はブラウザツールが使える場合のみ実施。使えない場合はその旨を監査docに明記しHOLD対象として扱う。
- 本タスクでは実装（ページ変更）を行わない。

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
