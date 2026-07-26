---
task_id: "fix-clipdrop-free-generation-wording"
created_at: "2026-07-26"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "DB非連動の4ファイルにあるClipdropの無料利用・無料画像生成に関するハードコード表記を、DB正本（clipdrop.md）およびユーザーの実機確認結果と一致するよう修正する。"

non_goals:
  - "src/content/tools/clipdrop.mdの変更"
  - "src/pages/tools/clipdrop/index.astroの変更"
  - "DBスキーマの変更"
  - "Clipdropのfeatureフラグの変更"
  - "Replace BackgroundのDBへの追加"
  - "needsReviewの解除"
  - "他ツールの表示変更"
  - "URL・比較ロジック・レイアウトの変更"
  - "新規記事作成"
  - "独自画像の追加"
  - "本番反映"

target_files:
  - src/pages/comparisons/ec-product-image-ai-tools/index.astro
  - src/pages/use-cases/ec-product-image/index.astro
  - src/components/FreeAiImageTools.astro
  - src/pages/categories/image-generation/index.astro
  - docs/tasks/active/fix-clipdrop-free-generation-wording.md
  - docs/tasks/completed/*.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - src/content/tools/clipdrop.md
  - src/pages/tools/clipdrop/index.astro
  - src/pages/comparisons/free-ai-image-generators/index.astro

unknowns:
  - "Replace Backgroundの無料回数"
  - "Replace Backgroundの出力解像度"
  - "無料版の透かし"
  - "商用利用条件"
  - "アカウントによる利用差"
  - "地域や時期による無料提供差"

preexisting_untracked_files:
  - aicreative-db.com-Performance-on-Search-2026-07-10.zip
  - gsc-fotor-ai-queries-2026-07-10.zip
  - gsc-kling-ai-queries-2026-07-10.zip
  - gsc-luma-ai-queries-2026-07-10.zip
  - gsc-microsoft-designer-queries-2026-07-10.zip
  - gsc-runway-queries-2026-07-10.zip
  - gsc-stable-diffusion-queries-2026-07-10.zip
  - prod_check.html

required_checks:
  - npm run validate:task
  - npm run build
  - git diff --check
  - npm run validate:data
  - npm run validate:scope

acceptance_criteria:
  - "変更ファイルはtarget_filesの4件（+タスク運用ファイル）だけ"
  - "src/content/tools/clipdrop.mdは無変更"
  - "src/pages/tools/clipdrop/index.astroは無変更"
  - "Clipdropの一部編集機能（Background Removal等）に無料枠がある事実は残る"
  - "無料で画像生成できるとの断定表現が残らない"
  - "Background Removalと背景生成の無料可否が分離される"
  - "4ファイル間でClipdropの無料表記が矛盾しない"
  - "他ツールの表示内容は変わらない"
  - "buildが成功する"
  - "validate:dataが成功する"
  - "diff checkが成功する"
  - "validate:scopeが成功する"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task Result

## Goal

DB非連動の4ファイルにあるClipdropの無料利用・無料画像生成に関するハードコード表記を、DB正本（clipdrop.md）およびユーザーの実機確認結果と一致するよう修正する。

## Result

PASS

## Summary

Clipdropの「一部編集機能のみ無料」「背景生成は要確認」という事実を、DB非連動の4ファイル（比較記事・用途ページ・無料ツールガイドコンポーネント・カテゴリページ）に反映した。「無料で画像生成できる」「背景生成に特化」といった断定表現を排除し、Background Removal（無料枠あり）とReplace Background等の画像生成（無料完了未確認）を分離して表記するよう統一した。DB正本（src/content/tools/clipdrop.md）と専用ツールページ（src/pages/tools/clipdrop/index.astro）は無変更。

## Changed Files

count: 4（+タスク運用ファイル）

- src/pages/comparisons/ec-product-image-ai-tools/index.astro
- src/pages/use-cases/ec-product-image/index.astro
- src/components/FreeAiImageTools.astro
- src/pages/categories/image-generation/index.astro
- docs/tasks/active/fix-clipdrop-free-generation-wording.md → docs/tasks/completed/2026-07-26-fix-clipdrop-free-generation-wording.md（移動）
- docs/tasks/LATEST.md（更新）

## Checks

- task validation: PASS
- build: PASS（92ページ）
- diff check: PASS
- scope validation: PASS
- data quality (validate:data): PASS（Errors: 0, Warnings: 0, Verify: 0, Files checked: 29）
- publish check: NOT_REQUIRED
- preview: NOT_REQUIRED
- GitHub Actions: 変更なし

## Git

- branch: master
- commit: (push後に確定、GIT欄で報告)
- push: 実施予定
- origin sync: 実装完了時点 SYNCED
- working tree: 対象4ファイル＋タスク運用ファイルのみ変更

## Production

- state: NOT_DEPLOYED
- checked URLs: なし（本番未確認）

## Decisions

- src/content/tools/clipdrop.md、src/pages/tools/clipdrop/index.astroは無変更（既に正確なため対象外）。
- DBスキーマ・Clipdropのfeatureフラグは無変更。Replace BackgroundをDBへ追加していない。
- needsReview（clipdrop.md）は解除していない。
- 他ツールの表示内容は変更していない（diffで全8箇所ともClipdrop行のみの変更を確認済み）。

## LATEST Update

docs/tasks/LATEST.mdを事実ベースで更新済み（本コミットに含む）。

## Next

本番反映後、下記4ページでClipdropの表記が「一部機能のみ無料」「背景生成は要確認」に統一されて表示されることをブラウザで確認する。
