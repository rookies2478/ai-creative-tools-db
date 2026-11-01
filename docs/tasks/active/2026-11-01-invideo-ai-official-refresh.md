---
task_id: "2026-11-01-invideo-ai-official-refresh"
created_at: "2026-11-01"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: true

goal: "収益化ページInVideo AIの専用ページと正本MDを、現行公式の料金・製品位置づけ・言語対応に整合させる。承認済みアフィリエイト送信先と開示挙動は保持する。"

non_goals:
  - "アフィリエイトURL・toolAffiliateLinks.tsの変更"
  - "GA4/Clarity等の計測変更（Issue #22の範囲）"
  - "他ツールの一括更新、共通コンポーネント・DBスキーマ・比較ロジックの変更"
  - "一時的なセール価格を基準価格として保存すること"
  - "merge・本番デプロイ"

target_files:
  - src/content/tools/invideo-ai.md
  - src/pages/tools/invideo-ai/index.astro
  - docs/tasks/active/2026-11-01-invideo-ai-official-refresh.md
  - docs/audits/invideo-ai-official-refresh-2026-11-01.md

reference_files:
  - docs/tasks/LATEST.md
  - CLAUDE.md
  - AGENTS.md
  - docs/decisions/current-governance-documents.md
  - src/data/toolAffiliateLinks.ts
  - src/components/ToolDetailPage.astro

unknowns:
  - "通常価格が販促価格と区別できない場合は要公式確認とする"
  - "UIの日本語ローカライズ有無は公式で確認できるかが不明"

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
  - "製品位置づけが現行公式（agentic AI video creation platform）と整合し、テンプレートは副次扱い"
  - "料金は販促価格を基準にせず、不明は要公式確認"
  - "日本語UI/プロンプト/ナレーション/字幕/ヘルプを別々に記述し、正本と専用ページが矛盾しない"
  - "確認できた項目のみ2026-11-01に更新、未解決はVERIFY"
  - "toolAffiliateLinks.ts・CTA・rel・開示は無変更"
  - "Draft PRで停止（merge/本番反映なし）"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

Issue #23 Execution Contract (Claude Code Track B, 2026-11-01 JST) に基づく。公式ソース5件を実行時に取得して照合し、監査docに記録する。
