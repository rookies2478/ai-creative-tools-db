---
task_id: "2026-11-07-pika-official-license-drift"
created_at: "2026-11-07"
status: COMPLETED
risk: HIGH
current_phase: editorial-accuracy
production_required: false
db_change: true
ui_change: true
official_verification_required: true
goal: "Pikaの新旧公式料金・商用許諾の矛盾を正本と専用ページ・比較ページで整合し、無料商用可の誤認を防止する"
non_goals:
  - "未確認の日本の最終請求額、全モデル出力の権利保証を作らない"
  - "アフィリエイト・計測・他社DB・本番デプロイを変更しない"
target_files:
  - docs/tasks/active/2026-11-06-guide-rights-pricing-consistency.md
  - docs/tasks/completed/2026-11-06-guide-rights-pricing-consistency.md
  - docs/tasks/active/2026-11-07-pika-official-license-drift.md
  - docs/tasks/LATEST.md
  - src/content/tools/pika.md
  - src/pages/tools/pika/index.astro
  - src/pages/comparisons/runway-vs-pika/index.astro
reference_files:
  - AGENTS.md
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/audits/fotor-search-intent-2026-11-07.md
  - docs/analytics/growth-loop.md
unknowns:
  - "Pika Starterの商用ライセンスは公式料金比較NO／公式サポートYESで矛盾"
  - "新Freeの実際のアカウント適用条件・日本の税込最終請求は未確認"
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
  - "Freeの商用ライセンスなしを新料金比較ベースで明示し旧Basicの数値を現行値と混同しない"
  - "Starterについて公式間の不一致を明記し商用権利を断定しない"
  - "DB/Static Override/Runway比較の主要誤情報を一致させる"
  - "URL・アフィリエイト・計測・構造化データの種類を変更しない"
  - "CI全PASS後にPRのレビュー・マージ判断を行う"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Pika official pricing and rights source drift

Source URLs https://pika.art/pricing?interval=month and https://pika.art/support (2026-11-07). Legacy pricing at https://pika.art/pricing and some query-param variants conflicts with the new pricing matrix. New matrix has Free 0 monthly credits/commercial NO, Starter 900/month/commercial NO, Creator/Fancy commercial YES. Support says Starter commercial YES. Preserve conflict as NOT_VERIFIED, not a legal guarantee. Commercial rights and transparent exports are separate.


## 2026-11-07 completion
- PR #86 merged as e1131f3e629d6a8d4cabaacab9a42f599ddfb88d; dedicated Pika Markdown, static route and Runway comparison consistent with current official Free-vs-paid distinction and Starter uncertainty.
- Github PR Build and Cloudflare Pages checks both PASS. Existing site deployment/check remains separate from this PR result.
- Account-specific checkout / Starter licensing remains HOLD under Issue #66 and weekly Issue #48.
