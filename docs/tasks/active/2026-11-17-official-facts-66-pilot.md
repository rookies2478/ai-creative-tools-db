---
task_id: "2026-11-17-official-facts-66-pilot"
created_at: "2026-11-17"
status: READY
risk: MEDIUM
current_phase: editorial-source-audit
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "Issue #66の2026-11-17公式再確認済み3項目だけを保守的に反映し、未確認事項は未確認のまま維持する"
non_goals:
  - "38ツールを一括で検証済みにしない"
  - "ログイン後価格・税・地域差・商用権利を推測しない"
  - "アフィリエイトURL、計測、デプロイを変更しない"
target_files:
  - src/content/tools/scenario.md
  - src/content/tools/pixelcut.md
  - src/content/tools/piclumen.md
  - docs/tasks/completed/2026-11-09-official-facts-fotor-agent-chat.md
  - docs/tasks/active/2026-11-09-official-facts-fotor-agent-chat.md
  - docs/tasks/active/2026-11-17-official-facts-66-pilot.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
unknowns:
  - "Scenario無料枠の補充時刻・繰越条件は公式公開ページだけでは確定できない"
  - "Pixelcutの透かしなし無料エクスポートは、Freeの全AI生成物の商用利用許諾を意味しない"
  - "PicLumen Basicの透かし条件は公式料金表で明記されていない"
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check
acceptance_criteria:
  - "Scenarioは公式ページ内の無料枠表現差を明示し、daily/UTC/繰越を断定しない"
  - "Pixelcutは公式日本語料金表の透かしなし無料エクスポートをプラン限定で反映する"
  - "PicLumenはLite以上の透かしなし案内のみを条件注記し、Basicはunknownを維持する"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Issue #66 field-level follow-up

Source of truth: Issue #66 comment dated 2026-11-17 from the local-first official re-check. Only the three explicitly verified field-level corrections are in scope.
