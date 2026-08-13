---
task_id: "2026-08-13-verify-audit-photoroom-creatify-recraft"
created_at: "2026-08-13"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: true
ui_change: false
official_verification_required: true

goal: "commit 583891cで追加済みのPhotoroom/Creatify/RecraftのVERIFY項目を公式ソースで再確認し、明確な根拠が得られた項目のみ既存レコードに最小限反映する。新規ページ・アフィリエイトリンク・本番反映は対象外。"

non_goals:
  - "新規schemaフィールドの追加"
  - "新規ページ作成"
  - "アフィリエイトリンク追加"
  - "本番デプロイ"
  - "根拠が弱い/断定できない項目のDB更新（PARTIAL/UNKNOWNのまま維持）"

target_files:
  - docs/tasks/active/2026-08-13-add-photoroom-creatify-recraft.md
  - src/content/tools/photoroom.md
  - src/content/tools/creatify.md
  - src/content/tools/recraft.md
  - docs/audits/new-tools-verify-audit-2026-08-13.md
  - docs/tasks/active/2026-08-13-verify-audit-photoroom-creatify-recraft.md
  - docs/tasks/completed/2026-08-13-verify-audit-photoroom-creatify-recraft.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/tasks/completed/2026-08-13-add-photoroom-creatify-recraft.md
  - docs/audits/new-tool-candidates-consolidated-audit-2026-08-13.md

unknowns:
  - "Photoroomの日本語プロンプト対応"
  - "Creatifyの日本語UI/プロンプト/ドキュメント対応、商用利用ToS本文条項、プラン別権利差、UGC/アバター追加制限"
  - "Recraftの日本語UI/プロンプト/ドキュメント対応、無料プランの正確な1日クレジット数、解約後権利継続の正確な条件"

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run build
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "公式ソース（help center/ToS/公式ドキュメント）で確認できた項目のみDB反映"
  - "反映不可の項目はPARTIAL/UNKNOWNのまま維持し断定しない"
  - "build PASS・validate:scope PASSを維持"
  - "本番デプロイ・commit/pushは実施しない（人間承認後）"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

2026-08-13にPhotoroom/Creatify/Recraftを新規追加（commit 583891c、本番未反映）。追加時点で日本語対応・商用利用条件等が多数unknown/未確認のまま記録されていた。本タスクはそれらのVERIFY項目を公式ソースで可能な限り解消する監査タスク。

## Implementation Notes

- WebSearch/WebFetchで公式ヘルプセンター・利用規約・公式ドキュメントを調査。
- Photoroom: 公式ヘルプ記事で日本語UI対応をVERIFIED、`japaneseUi: "unknown"` → `true`に更新。
- Creatify: 出力物所有権はFAQでVERIFIEDだが、`commercialUse`フィールド全体を確定させるには根拠不十分と判断し変更せず。
- Recraft: 公式ドキュメント（paid-plans/free-plan）とToS（terms）で料金ティア・価格・commercialUse条件・運営法人（Recraft Inc.）をVERIFIED、該当フィールドを更新。日本語対応は依然UNKNOWNで維持。
- 監査結果を`docs/audits/new-tools-verify-audit-2026-08-13.md`に記録。

## Result Schema

```
RESULT: PASS

SUMMARY:
Photoroom/Creatify/Recraftの日本語対応・商用利用・料金等のVERIFY項目を公式ソースで再確認。Photoroom日本語UI・Recraft料金/商用利用/運営法人がVERIFIEDとなり該当フィールドを最小限更新。他は根拠不十分のためunknown/partialのまま維持。

CHANGED_FILES:
7 files changed/added:
- src/content/tools/photoroom.md (modified: japaneseUi, weaknesses/limitations/FAQ/本文/sources)
- src/content/tools/recraft.md (modified: lowestPaidPlan, currency, commercialUse系, pricingStatus, sources, japanBilling, 本文/FAQ)
- src/content/tools/creatify.md (無変更、監査のみ)
- docs/audits/new-tools-verify-audit-2026-08-13.md (new)
- docs/tasks/active/2026-08-13-verify-audit-photoroom-creatify-recraft.md (new→completedへ移動予定)
- docs/tasks/active/2026-08-13-add-photoroom-creatify-recraft.md (削除: completed/に既存の重複ファイルのため)
- docs/tasks/completed/2026-08-13-verify-audit-photoroom-creatify-recraft.md (this file)

CHECKS:
- task_validation: PASS
- build: PASS（95ページ）
- diff_check: PASS（CRLF警告のみ）
- scope_validation: PASS
- data_quality: PASS（Errors 0, Warnings 4=既存review-overdue、本タスク無関係）
- publish_check: PASS（Errors 0, Warnings 4=既存long-meta-description、本タスク無関係）
- preview: 未実施（過去タスクと同様の制約）
- github_actions: 未実施（未push）

GIT:
- commit: 未実施（人間承認待ち）
- push: 未実施
- origin_sync: 変更前時点でclean

PRODUCTION:
NOT_DEPLOYED

LATEST_UPDATED:
yes

NEXT:
人間によるレビュー・承認後、commit → push（本番デプロイは別途人間が手動実施）。次回VERIFY候補: Creatifyの日本語対応・ToS本文の商用利用条項直接確認、Recraft/Creatifyの日本語UI・プロンプト対応の実機テスト。
```
