---
task_id: "2026-11-26-laneH-official-consistency"
created_at: "2026-11-26"
status: READY
risk: MEDIUM
current_phase: editorial-source-audit
production_required: false
db_change: false
ui_change: false
official_verification_required: true

goal: "2026-11-26に公式ページ（描画・ログアウト）で確認できたPika/Luma/Fotorの現行条件へ、ツールページ・比較記事・ガイド内の旧記載を整合させる（Issue #66）"

non_goals:
  - "アフィリエイトリンク・計測・URL・共通コンポーネントを変更しない"
  - "公式で確認できない事実を追加しない"

target_files:
  - src/content/tools/pika.md
  - src/content/guides/commercial-use-cost-comparison.md
  - src/content/guides/japanese-ai-image-tools.md
  - src/components/CommercialUseCopyright.astro
  - src/components/WatermarkCreditGuide.astro
  - src/data/videoFreeDownloadStatus.ts
  - src/pages/tools/pika/index.astro
  - src/pages/tools/luma-ai/index.astro
  - src/pages/tools/fotor-ai/index.astro
  - src/pages/tools/hailuo-ai/index.astro
  - src/pages/tools/haiper/index.astro
  - src/pages/tools/invideo-ai/index.astro
  - src/pages/tools/kling-ai/index.astro
  - src/pages/tools/pixverse/index.astro
  - src/pages/tools/runway/index.astro
  - src/pages/tools/vidu-ai/index.astro
  - src/pages/comparisons/runway-vs-pika/index.astro
  - src/pages/guides/commercial-use-cost-comparison/index.astro
  - src/pages/guides/video-generation-credit-cost-comparison/index.astro
  - docs/tasks/active/2026-11-26-laneH-official-consistency.md
  - docs/tasks/completed/2026-11-26-header-overflow-360.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md

unknowns: []

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
  - "Pika/Luma/Fotorの旧記載が残らない"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task
Evidence (2026-11-26, logged-out headless render): pika.art/pricing, lumalabs.ai/pricing, fotor.com/jp/pricing/.
