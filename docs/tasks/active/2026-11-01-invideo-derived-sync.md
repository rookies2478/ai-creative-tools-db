---
task_id: "2026-11-01-invideo-derived-sync"
created_at: "2026-11-01"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: true

goal: "PR #24で確定したInVideo AI正本情報を、カテゴリ・日本語対応表・CapCut比較ページのハードコード表示へ同期し、公開面の矛盾を解消する。"

non_goals:
  - "src/content/tools/invideo-ai.mdの再変更"
  - "src/data/toolAffiliateLinks.tsまたはaffiliate URL変更"
  - "GA4/Clarity変更（Issue #22）"
  - "他ツールの一括更新"
  - "本番デプロイ"

target_files:
  - src/pages/categories/video-generation/index.astro
  - src/components/Japanese.astro
  - src/pages/comparisons/invideo-ai-vs-capcut-ai/index.astro
  - docs/tasks/active/2026-11-01-invideo-derived-sync.md
  - docs/audits/invideo-derived-sync-2026-11-01.md

reference_files:
  - src/content/tools/invideo-ai.md
  - src/pages/tools/invideo-ai/index.astro
  - docs/audits/invideo-ai-official-refresh-2026-11-01.md
  - CLAUDE.md
  - AGENTS.md
  - docs/tasks/LATEST.md

unknowns:
  - "正確な通常価格は引き続きVERIFY"
  - "日本語UI/プロンプト/ナレーション/字幕は引き続きVERIFY"

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
  - "InVideoのカテゴリカードがagentic/要公式確認/2026-11-01へ整合"
  - "Japanese.astroのInVideo UI/prompt/docsが未確認扱いで正本と矛盾しない"
  - "InVideo vs CapCut比較から旧テンプレート中心・paid-only・旧watermark・旧日本語断定が除去"
  - "Affiliate/計測/他ツールは無変更"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

Issue #25。PR #24の正本を派生3画面へ同期する。
