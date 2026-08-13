---
task_id: "cleanup-phase1-low-risk-artifacts"
created_at: "2026-08-13"
status: COMPLETED
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "前回の不要ファイル監査(audit HEAD e4a0e76c)で確定した低リスク廃止アーティファクトのみを削除し、アプリケーション動作を変更しない。"

non_goals:
  - "reports/ のクリーンアップ"
  - "docs/seo-research/article_brushup_recommendations.xlsx の対応"
  - "prod_check.html の対応"
  - "tool-samples-inbox/_archive/home-showcase/ の対応"
  - "scripts/generate-reference-image*.mjs・generate-sample-image.mjs の統合"
  - "ソースコードリファクタ"
  - "コンテンツ変更"
  - "DB変更"
  - "スキーマ変更"
  - "パッケージ/依存関係変更"
  - "本番デプロイ"

target_files:
  - project-spec.md
  - content-expansion-plan.md
  - production-launch-checklist.md
  - release-checklist.md
  - static-pages-plan.md
  - backup-full-diff-2026-06-05.patch
  - backup-status-2026-06-05.txt
  - "C:devStudioai-creative-tools-dbreports"
  - docs/tasks/active/2026-08-13-cleanup-phase1-low-risk-artifacts.md
  - docs/tasks/completed/2026-08-13-cleanup-phase1-low-risk-artifacts.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - CLAUDE.md

unknowns: []

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - repository-wide reference check for all deleted paths
  - git diff --check
  - npm run validate:scope
  - npm run build

acceptance_criteria:
  - "対象8件以外のファイルは変更されない"
  - "stray directoryは空・reports/と無関係であることを確認済みの場合のみ削除"
  - "reports/は無変更"
  - "REVIEW/INTEGRATE対象は無変更"
  - "build成功・diff_check成功・scope_validation成功"
  - "削除ファイルへの生存参照が存在しない"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - FTP
  - SERVER_ACCESS
  - DNS_CHANGE
  - PACKAGE_INSTALL
  - DEPENDENCY_UPDATE
  - UNRELATED_CLEANUP
  - REPORTS_DELETION
  - REVIEW_ITEM_DELETION
  - IMAGE_GENERATION_SCRIPT_INTEGRATION
  - SECRET_OUTPUT
---

# Task

## Background

前回実施した監査（audit HEAD `e4a0e76c`）で、KEEP 12 / INTEGRATE 2 / DELETE_CANDIDATE 8 / REVIEW 4 と分類済み。本タスクはDELETE_CANDIDATEのうち低リスクと確認された8件のみを削除するPhase 1。

## Safety re-check結果（本タスク作成時点）

- 5つの root planning docs（project-spec.md等）: 生存参照なし（static-pages-plan.mdがproject-spec.mdへ自己言及するのみで、削除対象内の相互参照であり実害なし）
- backup-*.patch/.txt: git-ignored scratch、生存参照は互いへの言及1件のみ
- stray dir `C:devStudioai-creative-tools-dbreports`: 空・非追跡・実際の`reports/`とは別物であることを確認済み

## 結果

削除完了。project-spec.md・content-expansion-plan.md・production-launch-checklist.md・release-checklist.md・static-pages-plan.md（git-tracked）、backup-full-diff-2026-06-05.patch・backup-status-2026-06-05.txt（git-ignored scratch）、stray dir `C:devStudioai-creative-tools-dbreports`（空・非追跡）の計8件を削除。reports/・REVIEW対象4件・INTEGRATE対象2件はいずれも無変更。アプリケーション動作の変更なし（src/・DB・スキーマ・依存関係は無変更）。

- validate:task PASS
- reference_check: 削除5ファイル名でrepo全体grep実施、生存参照は本タスクファイル自身の記述のみ（削除対象内での相互言及〔static-pages-plan.md→project-spec.md〕は削除対象内なので実害なし）
- git diff --check PASS
- validate:scope PASS
- build 92ページ PASS

commit・push・origin_sync確認はGIT欄参照。PRODUCTION: NOT_DEPLOYED（本タスクはリポジトリファイル削除のみで本番システム無変更）。
