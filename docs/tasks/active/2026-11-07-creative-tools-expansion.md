---
task_id: "2026-11-07-creative-tools-expansion"
created_at: "2026-11-07"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: false
official_verification_required: true
goal: "公式日本語情報を最優先に15サービスの料金・無料・商用条件とアフィリエイト制度を照合しDBと台帳を同期する"
non_goals:
  - "既存ツールページの改修・独自作例制作"
  - "計測・アフィリエイト・デプロイ・URL構造の変更"
target_files:
  - docs/tasks/active/2026-11-07-fotor-search-intent.md
  - docs/tasks/paused/2026-11-07-fotor-search-intent.md
  - docs/tasks/active/2026-11-07-creative-tools-expansion.md
  - docs/operations/official-source-registry.csv
  - docs/operations/creative-tools-jp-affiliate-audit-2026-11-07.csv
  - docs/operations/tool-intake-jp-affiliate-checklist.md
  - docs/audits/creative-tools-expansion-2026-11-07.md
  - src/content/tools/piclumen.md
  - src/content/tools/imagineart.md
  - src/content/tools/getimg-ai.md
  - src/content/tools/dzine-ai.md
  - src/content/tools/scenario.md
  - src/content/tools/novelai.md
  - src/content/tools/pixai.md
  - src/content/tools/promeai.md
  - src/content/tools/pixelcut.md
  - src/content/tools/pebblely.md
  - src/content/tools/pollo-ai.md
  - src/content/tools/grok-imagine.md
  - src/content/tools/ltx-studio.md
  - src/content/tools/hedra.md
  - src/content/tools/kaiber.md
reference_files:
  - AGENTS.md
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - docs/tasks/TEMPLATE.md
  - src/content/config.ts
  - scripts/validate-data.mjs
  - scripts/validate-official-source-registry.mjs
unknowns:
  - "日本国内適用料金・商用ライセンス・日本語プロンプトの一部は未検証"
  - "全ツールのログイン後UIと独自作例は未検証"
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
  - "既存38件のslugとの重複がない"
  - "新規15件と台帳15行が厳密に一致する"
  - "日本語公式製品ページ・日本語公式文書・未特定を分けて記録する"
  - "全15件の料金・商用・アフィリエイト制度と承認状態を管理台帳に記録する"
  - "公式URLを明示し未確認を既知と偽装しない"
  - "旧FotorタスクをPAUSEDとして保持し共通機能には変更を加えない"
  - "CI必須チェックが全PASSした場合のみレビュー可能"
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# AI Creative DB 画像10・動画5の基本掲載追加

Parent Issue: https://github.com/rookies2478/ai-creative-tools-db/issues/80

このPRは基本掲載（公式情報ベース・実機未検証）。新規レジストリ行でlast_content_verified_atは空欄。商用・価格など契約別の断定は避け、現行規約で差がある場合の詳細は実機/法務再確認へ持ち越す。

Fotorタスクはmasterから切ったこの作業ブランチ内でPAUSEDに移動するが、masterの進行作業は変更しない。PRのマージはFotorタスク完了・復帰順序の再確認後とする。

RESULT: HOLD（CIと人間レビュー待ち）
