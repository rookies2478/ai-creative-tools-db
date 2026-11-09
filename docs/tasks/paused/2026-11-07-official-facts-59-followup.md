---
task_id: "2026-11-07-official-facts-59-followup"
created_at: "2026-11-07"
status: PAUSED
pause_reason: "Higgsfield/Luma/Recraftの事実修正を別スコープtaskで優先実施するため"
resume_condition: "2026-11-09-official-facts-higgsfield-luma-recraft のPRが人間レビュー後にマージされ、active/が空になった時点"
preserved_changes:
  - "docs/tasks/paused/2026-11-07-official-facts-59-followup.md（taskファイルのみ、未commit差分なし）"
risk: HIGH
current_phase: editorial-source-audit
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "現行59ツールの公式情報未確認点を、確定した一次資料と実機・アカウント条件を区別して順次検証する"
non_goals:
  - "確定していない商用利用権、価格、日本の報酬支払条件を断定しない"
  - "未承認アフィリエイトURL、計測、デプロイ、本番サイトを変更しない"
target_files:
  - docs/tasks/active/2026-11-07-official-fact-audit-report-integration.md
  - docs/tasks/completed/2026-11-07-official-fact-audit-report-integration.md
  - docs/tasks/active/2026-11-07-official-facts-59-followup.md
  - docs/tasks/LATEST.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/audits/official-fact-reaudit-2026-11-07.md
  - docs/operations/official-source-registry.csv
  - docs/operations/official-source-review.md
unknowns:
  - "全59ツールの日本語公式料金、商用許諾、アフィリエイト承認は全件検証できていない"
  - "旧38ツール監査はRAW_CONFIRMEDが7、要約のみ18。Pika Starterも公式条件矛盾"
  - "実機・アカウント固有の最終請求、商用ライセンスは人間確認が必要"
preexisting_untracked_files: []
required_checks:
  - npm run validate:task
  - node scripts/validate-official-source-registry.mjs
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check
acceptance_criteria:
  - "日本語公式情報→日本向け料金→日本語規約→商用利用→アフィリエイト順で検証する"
  - "確認7と要約18等のエビデンス区分を保持し、新規未確認はHOLDのままにする"
  - "事実改修が必要なら当該ファイルのみを明示した別スコープのPRを作成する"
  - "台帳・CI・アフィリエイト・計測設定を未承認変更しない"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# 59-tool official source follow-up
Parent: https://github.com/rookies2478/ai-creative-tools-db/issues/66
Official weekly rolling: https://github.com/rookies2478/ai-creative-tools-db/issues/48
Keep this active only while current source-facts audit is the authorized work, and pause before switching to other tasks.
