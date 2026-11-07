---
task_id: "2026-11-07-jp-creative-categories"
created_at: "2026-11-07"
status: READY
risk: HIGH
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: true
official_verification_required: true
goal: "画像・動画以外の6サービスを日本語公式料金規約とAffiliateの根拠付きで正しい新カテゴリに掲載する"
non_goals:
  - "既存ツールの変更・計測・アフィリエイトリンク追加・本番公開"
target_files:
  - src/content/tools/elevenlabs.md
  - src/content/tools/ondoku-san.md
  - src/content/tools/voicevox.md
  - src/content/tools/soundraw.md
  - src/content/tools/adobe-express.md
  - src/content/tools/irusiru.md
  - src/content/config.ts
  - scripts/validate-data.mjs
  - src/data/labelDictionary.ts
  - src/components/RelatedTools.astro
  - src/pages/tools/[slug].astro
  - src/pages/tools/index.astro
  - src/pages/categories/music-generation/index.astro
  - src/pages/categories/ai-presentations/index.astro
  - docs/operations/official-source-registry.csv
  - docs/operations/new-creative-categories-jp-affiliate-2026-11-07.csv
  - docs/tasks/paused/2026-11-07-creative-tools-expansion.md
  - docs/tasks/active/2026-11-07-creative-tools-expansion.md
  - docs/tasks/active/2026-11-07-jp-creative-categories.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - src/content/config.ts
  - src/pages/tools/index.astro
  - docs/operations/tool-intake-jp-affiliate-checklist.md
unknowns:
  - "日本向け最終課金額・提携の承認・音声素材ごとのライセンスは一部未検証"
preexisting_untracked_files: []
required_checks:
  - npm run validate:task
  - node scripts/validate-official-source-registry.mjs
  - npm run validate:data
  - npm run validate:affiliate-links
  - npm run build
  - npm run validate:publish
  - npm run validate:scope
  - git diff --check
acceptance_criteria:
  - "既存53件と新規6件が重複せず、59件のDBになる"
  - "新カテゴリ・一覧・詳細表示に誤分類がない"
  - "日本語公式料金規約と提携の有無を記録する"
  - "必須CIがPASSし、本番公開しない"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# 制作カテゴリ拡張
Issue https://github.com/rookies2478/ai-creative-tools-db/issues/82

PR #81の作業ブランチに重ねるDraft PRとして作成し、master直更新は行わない。

RESULT: HOLD - CIとレビュー待ち
