---
task_id: "2026-11-06-official-source-registry"
created_at: "2026-11-06"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "現行38ツールの日本向け公式確認先と英語フォールバックを正本台帳へ集約し、再確認の標準手順と構造検証を整備する"
non_goals:
  - 現行ツールの料金や商用利用の内容変更
  - URLやDBスキーマと計測・アフィリエイト・CI・本番公開の変更
target_files:
  - docs/tasks/active/2026-11-06-official-source-registry.md
  - docs/operations/official-source-registry.csv
  - docs/operations/official-source-review.md
  - scripts/validate-official-source-registry.mjs
reference_files:
  - docs/tasks/LATEST.md
  - docs/tasks/TEMPLATE.md
  - AGENTS.md
  - CLAUDE.md
  - docs/operations/reports-directory-policy.md
  - reports/tool-source-url-list.csv
  - reports/tool-pricing-citation-master-list.md
  - scripts/generate-freshness-queue.mjs
  - src/content/config.ts
unknowns:
  - 一部ツールで日本語公式ページの提供有無を確定できていない
  - 各URLの現在のHTTP状態やログイン後の国内購入金額は全件未再検証
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
  - 現行38件と台帳のslugが一致し重複がない
  - 公式の日本向けページと英語フォールバックを用途別に保管
  - 未確認の日本語URLを捏造せず状態と代替情報を表示
  - 公式根拠と確認日がないのに検証済みにはしない
  - ローカル検証が新規slug欠落とURL構文違反を検出する
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# 38ツール日本向け公式URL照合台帳

Issue #69。過去26ツール時点のreportsアーカイブは正本にしない。現行DBを正本としてslugの存在確認を行い、各ツールの日本語公式があれば先に閲覧し、なければ英語公式へのフォールバックを記録する。リンク集と作業手順はdocs/operationsに保持し、公開サイトの事実は本タスクでは変更しない。

RESULT: PASS | HOLD | BLOCKED
