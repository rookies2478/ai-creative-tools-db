---
task_id: "2026-11-25-seedream-vs-seedance-update"
created_at: "2026-11-25"
status: READY
risk: MEDIUM
current_phase: editorial-source-audit
production_required: false
db_change: false
ui_change: false
official_verification_required: true
goal: "既存の比較記事 seedream-vs-seedance を、Seedream 5.5・5.5 Layers・Seedance 2.5 Flash と Dreamina／Runway Dev の提供・料金・商用利用条件の違いに更新する（Issue #96 のパッチ）。"
non_goals:
  - "既存記事のURL、canonical、H1、初回公開日（datePublished）を変更しない"
  - "新規記事の追加、アフィリエイト・計測・共通テンプレート（ComparisonVsArticle等）の変更をしない"
  - "未検証の性能・品質・実請求額・商用利用条件を断定しない"
  - "GitHub Actionsの実行・変更、PR作成、master直接push、本番公開をしない"
target_files:
  - src/pages/comparisons/seedream-vs-seedance/index.astro
  - docs/tasks/active/2026-11-25-seedream-vs-seedance-update.md
  - docs/tasks/active/2026-11-18-official-facts-66-p7-chrome-facts.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
  - docs/tasks/completed/2026-11-18-official-facts-66-p7-chrome-facts.md
preexisting_untracked_files: []
unknowns:
  - "Dreaminaの新モデル通常消費量・日本アカウントでの提供状況と実購入価格"
  - "Dreamina日本向け規約の最新本文（指定URLが米国向け規約を表示）"
  - "Runway Devの各モデル出力の透かし・識別情報"
  - "同一条件の生成による画質・速度の比較（未実施）"
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run audit:cta:test
  - npm run audit:cta
  - npm run validate:scope
  - git diff --check
acceptance_criteria:
  - "パッチ（30542バイト、SHA-256 1aac9538...0a13）が git apply でそのまま適用されている"
  - "記事のURL・canonical・H1・datePublished が変更されていない"
  - "料金計算が公式の課金式と一致し、実請求・品質・速度は未検証と明示されている"
  - "商用利用はサービス別（Dreamina／Runway Dev）に分け、保証と断定していない"
  - "PC・スマートフォン幅で表が崩れず横スクロール可能"
forbidden_operations:
  - PRODUCTION_DEPLOY
  - GITHUB_ACTIONS
---

# Seedream・Seedance比較記事の更新

Source: GitHub Issue #96（パッチ本体の転送経路）。Base master d9c95193c6f00d340d4675802edae6f5319a3816。

Prior active task 2026-11-18-official-facts-66-p7-chrome-facts: PR #95 merged (d9c9519, 2026-11-18T04:06:31Z) and the completed copy (status DONE) already exists on master; the stale READY copy under active/ is removed here. Issue #66 itself stays open for other tools. Not moved to completed to skip validation.