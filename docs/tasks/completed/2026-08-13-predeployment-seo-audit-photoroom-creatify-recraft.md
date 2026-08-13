---
task_id: "2026-08-13-predeployment-seo-audit-photoroom-creatify-recraft"
created_at: "2026-08-13"
status: DONE
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "commit 762fb8c時点でDB反映済みのPhotoroom/Creatify/Recraftについて、本番デプロイ前のSEO・ページ品質・検索意図分離・内部リンク・CTA・構造化データ・事実整合性・カニバリゼーションの観点で監査し、正当化できる範囲の最小限修正のみ行う。"

non_goals:
  - "新規ツール追加"
  - "新規スタンドアロン記事の作成"
  - "アフィリエイトアーキテクチャの変更"
  - "無関係なVERIFY項目の解消"
  - "本番デプロイ"

target_files:
  - docs/audits/new-tools-predeployment-seo-audit-2026-08-13.md
  - src/pages/use-cases/ec-product-image/index.astro
  - src/pages/guides/ai-image-commercial-use-checklist/index.astro
  - docs/tasks/completed/2026-08-13-predeployment-seo-audit-photoroom-creatify-recraft.md
  - docs/tasks/LATEST.md
  - docs/tasks/active/2026-08-13-verify-audit-photoroom-creatify-recraft.md (削除: completed/に存在する重複)

reference_files:
  - docs/tasks/LATEST.md
  - docs/audits/new-tool-candidates-consolidated-audit-2026-08-13.md
  - docs/audits/new-tools-verify-audit-2026-08-13.md
  - src/content/tools/photoroom.md
  - src/content/tools/creatify.md
  - src/content/tools/recraft.md
  - src/pages/tools/[slug].astro
  - src/content/config.ts

unknowns:
  - "Photoroomの日本語プロンプト対応（変更なし、維持）"
  - "Creatifyの日本語UI/プロンプト対応・商用利用ToS明示（変更なし、維持）"
  - "Recraftの日本語UI/プロンプト対応・解約後権利継続の正確条件（変更なし、維持）"

preexisting_untracked_files: []

required_checks:
  - npm run build
  - git diff --check

acceptance_criteria:
  - "3ツールのルート・スキーマ・構造化データ・indexabilityに問題がないことを確認"
  - "既存内部リンクページとfrontmatterの事実整合性を確認し、矛盾があれば最小限修正"
  - "カニバリゼーションをLOW/MODERATE/HIGHで判定し記録"
  - "build PASSを維持、新規ツール・アフィリエイト・本番デプロイは行わない"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - NEW_TOOL_ADDITION
  - AFFILIATE_LINK_REGISTRATION
---

# Task

## Background

2026-08-13にPhotoroom/Creatify/Recraftを追加（commit 583891c）、続くVERIFY audit（commit 762fb8c）でPhotoroom/Recraftの一部フィールドを更新済み。本タスクはその状態を対象に、本番デプロイ前のSEO・品質観点の総合監査を行う。

## Implementation Notes

- 監査は`docs/audits/new-tools-predeployment-seo-audit-2026-08-13.md`に全結果を記録。
- 監査中、VERIFY audit後のfrontmatter更新が2つの既存内部リンクページ（`use-cases/ec-product-image`のPhotoroom行、`guides/ai-image-commercial-use-checklist`のRecraft行）に反映されていない事実不整合を発見し、直接関連するリンクページへの最小限修正として是正。
- Creatifyのフィールド・本文・関連ページは無変更（監査のみ、対象外）。
- 新規ツール・新規記事・アフィリエイトリンク・本番デプロイは一切行っていない。
- ガバナンス整理として、前タスク（VERIFY audit）のactive/タスクファイルがcompleted/と内容が完全一致したまま重複して残っていたため削除（completed/の記録を正本として一本化）。

## Result Schema

```
RESULT: PASS

SUMMARY:
Photoroom/Creatify/Recraftの3ツールページをSEO・品質・カニバリゼーション観点で監査。3ツールともDEPLOY_READY判定。監査中に発見した2件の事実不整合（Photoroom日本語UI表記・Recraft解約後権利継続の断定表現）を関連する既存内部リンクページで最小限修正。Creatify・新規ツール・アフィリエイト・本番デプロイは対象外のまま変更なし。

CHANGED_FILES:
4 files changed/added:
- docs/audits/new-tools-predeployment-seo-audit-2026-08-13.md (new)
- src/pages/use-cases/ec-product-image/index.astro (modified: Photoroom行のja/japanese/caution)
- src/pages/guides/ai-image-commercial-use-checklist/index.astro (modified: Recraft行のnotes)
- docs/tasks/completed/2026-08-13-predeployment-seo-audit-photoroom-creatify-recraft.md (this file)
- docs/tasks/active/2026-08-13-verify-audit-photoroom-creatify-recraft.md (削除: completed/の重複)

CHECKS:
- build: PASS（95ページ）
- diff_check: PASS（CRLF警告のみ）

GIT:
- commit: 未実施（人間承認待ち）
- push: 未実施

PRODUCTION:
NOT_DEPLOYED

LATEST_UPDATED:
yes

NEXT:
人間によるレビュー・承認後、commit → push（本番デプロイは別途人間が手動実施）。
```
