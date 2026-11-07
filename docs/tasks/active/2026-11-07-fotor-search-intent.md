---
task_id: "2026-11-07-fotor-search-intent"
created_at: "2026-11-07"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: true
goal: "Fotorの無料枠・透かし・商用利用を機能別の公式根拠で整理して公開済み記事の検索目的別案内を改善する"
non_goals:
  - 料金額や未検証の商用権利保証・ランキングの捏造
  - URL・DBスキーマ・アフィリエイト・計測・本番の変更
target_files:
  - docs/tasks/active/2026-11-07-fotor-search-intent.md
  - .github/workflows/build.yml
  - src/pages/tools/fotor-ai/index.astro
  - scripts/verify-fotor-intent-output.mjs
  - src/content/tools/fotor-ai.md
  - docs/audits/fotor-search-intent-2026-11-07.md
reference_files:
  - CLAUDE.md
  - AGENTS.md
  - src/content/tools/fotor-ai.md
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
unknowns:
  - GSC Query×Pageは集計全量を取得できず検索意図比率は未検証
  - 公式Commercial Useと機能別FAQの有料条件に差があり最新の契約を要確認
  - 日本の最終課金額やログイン後モデル別機能は未確認
preexisting_untracked_files: []
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - node scripts/verify-fotor-intent-output.mjs
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check
acceptance_criteria:
  - Fotor無料・透かし・商用利用の機能別の条件差を公式URLで区別
  - 静的オーバーライドルートのビルド済みHTMLに新しい本文が存在することをテスト
  - 新規料金額や保証の追加がなくCTA・affiliate・スキーマが不変
  - source registryの完了処理はマージ済みPR #76に保持し、本PRはその履歴を変更しない
  - 必須のtask・build・data・publish・affiliate・scopeチェックが全PASSした場合のみマージに進める
  - 本文変更の本番反映はユーザーの2026-11-07明示指示により別リリース工程で実施し、公開後SHAを検証する
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Fotor SEO intent review

Parent: https://github.com/rookies2478/ai-creative-tools-db/issues/71

Use only source-grounded content, explicitly verified official differences and GSC Page-only evidence. Owner explicitly approved full release on 2026-11-07, contingent on quality gates. The unrelated official-source registry closeout was resolved by merged PR #76; do not revert it. Hosting-specific production deployment and public SHA checks are separate from this content task.

RESULT: HOLD — the production and final QA gates remain separate.
