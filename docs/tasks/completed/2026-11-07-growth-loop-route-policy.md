---
task_id: "2026-11-07-growth-loop-route-policy"
created_at: "2026-11-07"
status: COMPLETED
risk: MEDIUM
current_phase: analytics-governance
production_required: false
db_change: false
ui_change: false
official_verification_required: false
goal: "AIクリエイティブナビのGSC/GA4/ClarityとSEO分析を既存MOVANCE Growth Loopに一本化する参照規則を運用ガードに反映"
non_goals:
  - "クラウドOIDC接続・GSC/GA4実行・新しいデータ収集基盤の実装"
  - "アフィリエイト、サイトタグ、本番コンテンツ、スケジュールの変更"
target_files:
  - docs/tasks/active/2026-11-07-pika-official-license-drift.md
  - docs/tasks/completed/2026-11-07-pika-official-license-drift.md
  - docs/tasks/active/2026-11-07-growth-loop-route-policy.md
  - docs/tasks/LATEST.md
  - AGENTS.md
  - docs/analytics/growth-loop.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
  - docs/decisions/current-governance-documents.md
  - docs/analytics/growth-loop.md
  - docs/tasks/LATEST.md
unknowns:
  - "GA4はCore未登録、Clarity API未構成。Cloud OIDCはCore Issue #44で未実証"
  - "CoreのGSC Verifiedは過去のローカル読取証拠、現在のクラウド収集可否とは別"
preexisting_untracked_files: []
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check
acceptance_criteria:
  - "AGENTS.mdに既存Growth Loop優先の単一路線を記載する"
  - "GSC/GA4/Clarityの実際の接続状況と未検証事項を区別する"
  - "単一active task、既存スクリプトの互換性・設定・資格情報を保持する"
  - "新規ダッシュボード、重複Collector、広告/タグ変更、デプロイなし"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Growth Loop routing policy
Parent Issue: https://github.com/rookies2478/ai-creative-tools-db/issues/75
Shared Core: rookies2478/movance-growth-loop (PR #46 merged).
Strategy OS canonical: rookies2478/strategy-os (PR #275 merged).
This task only changes documentary routing and explicitly records the Core #44 cloud runtime HOLD.


## Closeout
- PR #87 merged master 163b5b82c35705303d9053009b11ea423a23df0a; AGENTS.md and site-specific Growth Loop state reconciled.
- GSC W45 local source evidence still historical; GA4 Core and Clarity Core not configured; cloud OIDC/WIF tracked in shared Core Issue #44.
- Issue #75 closed after read-back and PR CI/preview PASS.
