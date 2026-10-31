---
task_id: "2026-10-31-ai-creative-control-binding"
created_at: "2026-10-31"
status: COMPLETED
completed_at: "2026-10-31"
merge_pr: 19
merge_sha: "6ccec7c4e2aa2b1dce6d55e6a669dd7554edf0c7"
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "既存dev-control-workerとの安全な接続に必要なAGENTS.mdとCONTROL_BINDING.mdを宣言する。Workerは有効化しない。"

non_goals:
  - "workerのレジストリ登録・enabled:trueへの変更"
  - "GitHubラベルの作成やclaude:readyの設定"
  - "既存CLAUDE.md・運用ルールVer4.0の改変"
  - "ソースコード、計測、アフィリエイト、デプロイ設定の変更"
  - "本番デプロイ"

target_files:
  - docs/tasks/active/2026-10-31-ai-creative-control-binding.md
  - docs/tasks/completed/2026-10-31-ai-creative-control-binding.md
  - docs/tasks/LATEST.md
  - AGENTS.md
  - .dev-control/CONTROL_BINDING.md

reference_files:
  - CLAUDE.md
  - docs/decisions/current-governance-documents.md
  - docs/tasks/LATEST.md
  - docs/tasks/active/README.md
  - docs/tasks/TEMPLATE.md

unknowns:
  - "Windows workerの最新インストール版とGitHub mainの一致"
  - "AI Creative DBに必要なGitHubワークフローラベルは未作成"
  - "dev-control-workerの登録エントリと有効化は未実施"

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
  - "AGENTS.mdがCLAUDE.md・計画Ver2.0/運用Ver4.0の優先順位を保持"
  - "Bindingがmaster・Worker repo・役割分担と単一active task制約を明示"
  - "Bindingは登録/有効化承認を与えず、Workerの本番操作や機密操作を禁止"
  - "Worker profileのbranchPrefix、controlBinding必須パス、buildと整合"
  - "GitHub CIおよびローカルrequired_checksのPASSを確認"
  - "作業を受け入れてもWorkerは未登録・disabledのまま"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

参照: dev-control-worker Issue #52 / Draft PR #55。
これはAI Creative DBの対象Repo側Control Bindingを作る **Meaningful Change** である。
Windows側のWorker設定、registry、label、schedulerに対する副作用を持たせない。
作業前のmasterにactive taskがないことを確認済み。

## Implementation Notes

- CLAUDE.mdは常設の安全ルールであり変更しない。
- 本タスクでは新規のAGENTS.mdと.dev-control/CONTROL_BINDING.mdのみ記述する。
- Workerはready Issue、Supervisor Gate PASS / NEXT EXECUTE、trusted label、binding、registry enabled、独立QAをすべて満たすまで実行できない。
- 重要な制約: active taskは一件のみ。単にIssueがREADYだからといって、既存active taskを自動で上書き/削除しない。
- Workerの公開・課金・権限操作は禁止。画像や動画の権利、料金、Affiliate・Analytics等の記述の変更はHuman review対象。

## Result Schema

RESULT: PASS_WITH_FINDINGS（Control Binding準備はPR #19としてmasterマージ済み。Worker有効化のWindows検証は未実施）

CHANGED_FILES:
- docs/tasks/active/2026-10-31-ai-creative-control-binding.md
- AGENTS.md
- .dev-control/CONTROL_BINDING.md

CHECKS:
- task_validation: NOT_RUN
- build: NOT_RUN
- diff_check: NOT_RUN
- scope_validation: NOT_RUN
- data_quality: NOT_RUN
- publish_check: NOT_RUN
- affiliate_links: NOT_RUN
- github_actions: PASS（Build run 41179370464）

GIT:
- branch: chore/ai-creative-control-binding-20261031
- origin_sync: TO_VERIFY

PRODUCTION: NOT_DEPLOYED
LATEST_UPDATED: yes（完了処理PRにて更新）
NEXT: dev-control-worker Issue #52 — disabled登録PRとWindows DryRun/RehearsalのHuman Gateを実施。本Workerはまだ未登録・未起動


## Completion evidence and outstanding gates
- Target docs-only PR #19 squash-merged as `6ccec7c4e2aa2b1dce6d55e6a669dd7554edf0c7`, GitHub Actions Build #129 PASS.
- Dormant profile in worker PR #55 squash-merged as `44abe66cc73db5f722e0c66cb665af080ca31ace` (profile `queue.enabled:false`).
- Independent Windows worker tests, target label inventory, single-active-task worker fail-closed test and registry addition: **NOT VERIFIED / NOT DONE**.
- GitHub CI Build passed. This assistant did not run the complete task-specific validate:task/data/publish/affiliate-links/scope suite on a local clone; do not report those checks as PASS.
- No source-code changes and no production deployment. Control Binding is a prerequisite only; NOT operational authorization.
