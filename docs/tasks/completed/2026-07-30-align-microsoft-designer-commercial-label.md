---
task_id: "align-microsoft-designer-commercial-label"
created_at: "2026-07-30"
status: DONE
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "/comparisons/ad-banner-ai-tools/ のMicrosoft Designer行のcommercial表示を、DB正本(src/content/tools/microsoft-designer.md commercialUse=\"no\")および確認済み公式規約に合わせて修正する"

non_goals:
  - DB正本の変更
  - Fotor AI行の変更
  - Ideogram行の変更
  - 他ツール行の変更
  - 比較表構造の変更
  - getCollectionへの置換
  - 共通コンポーネント化
  - title変更
  - meta description変更
  - H1変更
  - 本文変更
  - 内部リンク変更
  - CTA変更
  - CSS変更
  - URL変更
  - 新規記事作成
  - 本番反映

target_files:
  - src/pages/comparisons/ad-banner-ai-tools/index.astro
  - docs/tasks/active/2026-07-30-align-microsoft-designer-commercial-label.md

reference_files:
  - docs/tasks/LATEST.md
  - src/content/tools/microsoft-designer.md

unknowns: []

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
  - npm run validate:scope

acceptance_criteria:
  - 変更ファイルは1件のみ(src/pages/comparisons/ad-banner-ai-tools/index.astro)
  - Microsoft Designer行のcommercial表示のみが変更されている
  - DB正本は変更されていない
  - Fotor AI・Ideogram・他ツール行は変更されていない
  - build成功
  - diff check成功
  - scope validation成功
  - 表示崩れなし
  - 秘密情報露出なし

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

audit-only監査で、/comparisons/ad-banner-ai-tools/ のMicrosoft Designer行のcommercial表示（ハードコード「個人向け案内あり（要公式確認）」）が、DB正本(commercialUse="no"、verifiedAt 2026-07-12、Microsoft Designer利用規約でtrade or commerceの過程での利用は認められないと明記)と乖離していることが判明した。比較ページはgetCollection参照ではなく全項目ハードコードのため、DB更新が自動反映されない。

## Implementation Notes

- 変更前: `commercial: '個人向け案内あり（要公式確認）'`
- 変更後: `commercial: '個人利用限定（商用不可）'`
- 対象は該当行1件のみ。他ツール行・構造・スタイルは変更しない。

## Result Schema

```
RESULT: PASS

SUMMARY:
Microsoft Designer行のcommercial表示を「個人向け案内あり（要公式確認）」から「個人利用限定（商用不可）」へ修正。
根拠はDB正本(src/content/tools/microsoft-designer.md commercialUse="no"、verifiedAt 2026-07-12、
Microsoft Designer利用規約でtrade or commerceの過程での利用は認められないと明記)。
Fotor AI・Ideogram・他ツール行、title/meta/H1/本文/内部リンクは変更なし。DB正本も変更なし。

CHANGED_FILES:
2 files
- src/pages/comparisons/ad-banner-ai-tools/index.astro
- docs/tasks/active/2026-07-30-align-microsoft-designer-commercial-label.md

CHECKS:
- task_validation: PASS
- build: PASS（92ページ、エラーなし）
- diff_check: PASS（対象1行のみ、CRLF警告のみ）
- scope_validation: PASS
- data_quality: N/A（DB正本変更なしのため対象外）
- publish_check: N/A（実行対象タスクの必須チェックに含まれず）
- preview: distディレクトリがサンドボックス権限で読み取り不可のため生成HTML直接確認は不可。
  ソース差分(grep)でold_text不在・new_text存在・他行不変を確認、buildログでビルドエラーなしを確認して代替確認とした。
- github_actions: 未確認（push後のCI結果は本ツールから直接観測できず、必要ならGitHub側で確認）

GIT:
- commit: 2f8a910 "Align Microsoft Designer commercial-use label"
- push: 完了（37784e4..2f8a910 master -> master）
- origin_sync: 完了（ahead/behind 0/0）

PRODUCTION:
NOT_DEPLOYED（本番反映は人間が手動で行う。ページ生成コードは変更されているためNEEDS_VERIFICATIONの余地もあるが、今回のルール上は明示的にNOT_DEPLOYED）

LATEST_UPDATED:
yes

NEXT:
本番へ手動反映し、/comparisons/ad-banner-ai-tools/ のMicrosoft Designer商用利用表示を確認する。
```
