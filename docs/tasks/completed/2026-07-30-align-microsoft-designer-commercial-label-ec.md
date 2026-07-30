---
task_id: "align-microsoft-designer-commercial-label-ec"
created_at: "2026-07-30"
status: DONE
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "/comparisons/ec-product-image-ai-tools/ のMicrosoft Designer行のcommercial表示を、DB正本(src/content/tools/microsoft-designer.md commercialUse=\"no\")に合わせて修正する"

non_goals:
  - Clipdrop行の変更
  - Fotor AI行の変更
  - 他ツール行の変更
  - DB正本の変更
  - 比較表構造の変更
  - getCollection/getEntryへの置換
  - 共通コンポーネント化
  - /comparisons/free-ai-image-generators/の変更
  - title変更
  - meta description変更
  - H1変更
  - 本文変更
  - 内部リンク変更
  - CSS変更
  - URL変更
  - 新規記事作成
  - 本番反映

target_files:
  - src/pages/comparisons/ec-product-image-ai-tools/index.astro
  - docs/tasks/active/2026-07-30-align-microsoft-designer-commercial-label-ec.md

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
  - 変更ファイルは1件のみ(src/pages/comparisons/ec-product-image-ai-tools/index.astro)
  - Microsoft Designer行のcommercial表示のみが変更されている
  - DB正本は変更されていない
  - Clipdrop・Fotor AI・他ツール行は変更されていない
  - build成功
  - diff check成功
  - scope validation成功
  - 秘密情報露出なし

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

比較ページのハードコード値とDB正本の不一致監査(audit-only)で、/comparisons/ec-product-image-ai-tools/ のMicrosoft Designer行のcommercial表示が、/comparisons/ad-banner-ai-tools/で既に修正済みの旧文言「個人向け案内あり（要公式確認）」のまま残存していることが判明した。DB正本(commercialUse="no"、verifiedAt 2026-07-12、lastReviewed 2026-07-12、Microsoft Designer利用規約でtrade or commerceの過程での利用は認められないと明記)と矛盾するCONTRADICTIONとして報告された。

## Implementation Notes

- 変更前: `commercial: '個人向け案内あり（要公式確認）'`
- 変更後: `commercial: '個人利用限定（商用不可）'`
- 対象は該当行1件のみ。他ツール行・構造・スタイルは変更しない。

## Result Schema

```
RESULT: PASS

SUMMARY:
/comparisons/ec-product-image-ai-tools/ のMicrosoft Designer行のcommercial表示を
「個人向け案内あり（要公式確認）」から「個人利用限定（商用不可）」へ修正。
根拠はDB正本(src/content/tools/microsoft-designer.md commercialUse="no"、verifiedAt 2026-07-12、
lastReviewed 2026-07-12、Microsoft Designer利用規約でtrade or commerceの過程での利用は
認められないと明記)。/comparisons/ad-banner-ai-tools/で既に修正済みの表現と統一。
Clipdrop・Fotor AI・他ツール行、title/meta/H1/本文/内部リンクは変更なし。DB正本も変更なし。

CHANGED_FILES:
2 files
- src/pages/comparisons/ec-product-image-ai-tools/index.astro
- docs/tasks/active/2026-07-30-align-microsoft-designer-commercial-label-ec.md

CHECKS:
- task_validation: PASS
- build: PASS
- diff_check: PASS（対象1行のみ）
- scope_validation: PASS

GIT:
- commit: (このタスク完了に伴うcommitハッシュを参照。docs/tasks/LATEST.mdの最新記録を参照)
- push: 完了

PRODUCTION:
NOT_DEPLOYED

LATEST_UPDATED:
yes

NEXT:
本番へ手動反映し、/comparisons/ec-product-image-ai-tools/ のMicrosoft Designer商用利用表示を確認する。
```

## Verification Detail

- 新文言「個人利用限定（商用不可）」: 対象ページ38行目に1件のみ検出
- 旧文言「個人向け案内あり（要公式確認）」: 対象ページ内で0件（消滅確認済み）
- 他ツール行（Fotor AI/Clipdrop/Canva AI画像生成/Adobe Firefly/Stable Diffusion）: grep差分なし、変更なし確認
- DB正本(src/content/tools/microsoft-designer.md): git diff --name-only で対象外、無変更確認
- build: PASS（92ページ、エラーなし）
- diff_check: PASS（git diff --check exit 0、CRLF警告のみ）
- scope_validation: PASS
- generated_HTML(dist)確認: 本環境のサンドボックス権限でdist/への直接読み取りがブロックされ、生成HTML内の文言直接確認は不可（過去タスクと同様の制約）。ソース差分(grep)確認とbuild成功ログで代替。
- visual_check(PC/スマホ表示崩れ): NOT_VERIFIED（ブラウザでの視覚確認は本タスクでは未実施）
- secret_check: PASS（対象ファイルにAPIキー・SECRET・PRIVATE_KEY等の露出なし）
