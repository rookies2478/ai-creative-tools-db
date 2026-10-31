---
task_id: "2026-10-31-ai-creative-control-binding"
created_at: "2026-10-31"
status: READY
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

RESULT: VERIFY（Control BindingのGitHub側Draft差分作成、Windowsテスト未実施）

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
- github_actions: TO_VERIFY

GIT:
- branch: chore/ai-creative-control-binding-20261031
- origin_sync: TO_VERIFY

PRODUCTION: NOT_DEPLOYED
LATEST_UPDATED: no（承認・完了処理後に更新）
NEXT: Claude Codeがrequired_checksを実行し、Supervisor/Human review後にmerge可否を判断
