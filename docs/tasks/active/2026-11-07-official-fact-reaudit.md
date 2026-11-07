---
task_id: "2026-11-07-official-fact-reaudit"
created_at: "2026-11-07"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "38ツールの公式公開ページを2026-11-07に再取得し、VERIFIED/CONFLICT/ACCOUNT_ONLY/NOT_VERIFIEDを監査台帳へ証跡付きで記録する。公開文言は変更せず修正案のみ列挙する"
non_goals:
  - 公開サイト文言・料金・商用利用表記の変更
  - アフィリエイト・計測・CI・デプロイ設定の変更
  - ログイン・購入・アカウント操作
target_files:
  - docs/tasks/active/2026-11-07-official-fact-reaudit.md
  - docs/audits/official-fact-reaudit-2026-11-07.md
  - docs/operations/official-source-registry.csv
reference_files:
  - docs/tasks/LATEST.md
  - docs/tasks/TEMPLATE.md
  - AGENTS.md
  - CLAUDE.md
  - docs/operations/official-source-review.md
  - docs/audits/unresolved-38-tools-official-audit-2026-11-06.md
unknowns:
  - ログイン後の請求額・税、地域別価格、JS動的表示の金額
  - 403等で取得できなかった公式ページ
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
  - 38件すべてに分類と根拠(またはNOT_VERIFIEDの理由)がある
  - last_content_verified_atは実際に取得した行のみ
  - 顧客向けコピーは変更せず修正案を別掲
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# 38ツール公式事実再監査 (Issue #66)

Issue #66。前提: #69 closeout PR #76。公式ページのみWebFetch/WebSearchで確認。結果は docs/audits/official-fact-reaudit-2026-11-07.md。

RESULT: PASS | HOLD | BLOCKED
