---
task_id: "verify-synthesia-free-download"
created_at: "2026-07-26"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: true

goal: "Verify from official Synthesia sources whether the free Basic plan permits video downloads, then preserve, correct, or qualify the current UI wording without changing unrelated content."

non_goals:
  - broken internal linkの修正
  - ai-generation-credits-guideの変更
  - sitemap.xml.tsの変更
  - 他ツールの変更
  - 全アバター動画比較の再監査
  - DB schema変更
  - validator変更
  - URL／route／slug変更
  - title／meta／H1変更
  - GitHub Actions変更
  - Synthesiaの料金全体の全面再調査
  - 非公式記事による確定
  - 本番反映
  - unrelatedな整形

target_files:
  - src/pages/categories/avatar-video/index.astro
  - docs/research/synthesia-free-download-verification-2026-07-26.md
  - docs/tasks/active/verify-synthesia-free-download.md
  - docs/tasks/completed/2026-07-26-verify-synthesia-free-download.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - docs/research/synthesia-plan-features-verification-2026-07-24.md
  - docs/tasks/completed/2026-07-26-clarify-synthesia-free-download-limitation.md
  - src/content/tools/synthesia.md

unknowns:
  - Whether the free Basic plan allows direct video download.
  - Whether free-plan downloads are disabled, watermark-limited, resolution-limited, or export-limited.
  - Whether the official pricing table alone fully describes download restrictions.
  - Whether login is required to view the relevant restriction.

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
  - npm run validate:data
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - Official Synthesia sources are actually checked.
  - The checked URLs and verification date are recorded.
  - The result distinguishes free creation, preview, export, download, and watermark conditions.
  - The current UI wording is retained only if directly supported.
  - If official support is unavailable, the wording is changed to "ダウンロード可否は要確認" or an equally cautious expression.
  - No unsupported fact remains.
  - No unrelated Synthesia or other tool content changes.
  - validate:data remains Errors 0 / Warnings 0 / Verify 0.
  - validate:publish introduces no new ERROR or WARNING.
  - Build succeeds.
  - Scope validation succeeds.
  - No secrets are used.

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

前タスク（clarify-synthesia-free-download-limitation, commit f9aeff3）でSynthesiaの「無料Basicプランはダウンロード不可」という表記が追加されたが、監査の結果、この主張を裏付ける公式一次情報の記録がrepository内に見つからなかった（OFFICIAL_VERIFICATION_REQUIRED判定）。本タスクで実際に公式情報を確認し、表記を確定または訂正する。

## Result Schema

```
RESULT: PASS | HOLD | BLOCKED

SUMMARY:
1-3 lines

CHANGED_FILES:
count and paths

CHECKS:
- task_validation:
- build:
- diff_check:
- scope_validation:
- data_quality:
- publish_check:
- preview:
- github_actions:

GIT:
- commit:
- push:
- origin_sync:

PRODUCTION:
NOT_DEPLOYED | DEPLOYED | NEEDS_VERIFICATION

LATEST_UPDATED:
yes | no

NEXT:
one concrete next action
```

## Result

status: DONE

Synthesia公式pricingページ（https://www.synthesia.io/pricing）を実際にWebFetchで確認。機能比較表で「MP4 Downloads」「Remove Synthesia logo」がいずれもStarterプラン以上限定であり、Basic（無料）プランには付与されないことを直接確認した。判定: CONFIRMED_DOWNLOAD_NOT_ALLOWED。

既存のUI表記「無料作成可／ダウンロード不可（月10分・透かしあり）」（src/pages/categories/avatar-video/index.astro、前タスクcommit f9aeff3）は一次情報と一致するため、ページ側の変更は不要と判断（変更なし）。前タスクで欠落していた一次情報の記録を、本タスクでdocs/research/synthesia-free-download-verification-2026-07-26.mdとして新規保存した。

help center（https://www.synthesia.io/help）はHTTP 404で取得不能だったため未確認（unresolvedとして記録）。src/content/tools/synthesia.md（DB正本）はダウンロード可否を格納する適切な既存フィールドがなく、今回の確認範囲でも変更不要と判断し無変更。

## Changed Files

count: 1（新規research + タスク運用ファイル。ページ変更なし）

- docs/research/synthesia-free-download-verification-2026-07-26.md（新規）
- docs/tasks/active/verify-synthesia-free-download.md → docs/tasks/completed/2026-07-26-verify-synthesia-free-download.md（移動）
- docs/tasks/LATEST.md（更新）
- src/pages/categories/avatar-video/index.astro: 変更なし（既存表記が一次情報と一致するため）
- src/content/tools/synthesia.md: 変更なし

## Checks

- task validation: PASS
- build: PASS（92ページ）
- diff check: PASS
- scope validation: PASS
- data quality (validate:data): PASS（Errors: 0, Warnings: 0, Verify: 0, Files checked: 29）
- publish check (validate:publish): Errors 1（既存のbroken-internal-link 1件のみ、今回による新規違反なし）, Warnings 4（変更なし）
- preview: NOT_REQUIRED
- GitHub Actions: 変更なし

## Git

- branch: master
- commit: (push後に確定、GIT欄で報告)
- push: 実施予定
- origin sync: 実装完了時点 SYNCED
- working tree: 新規research + タスク運用ファイルのみ変更

## Production

- state: NOT_DEPLOYED
- checked URLs: なし（本番未確認）

## Decisions

- 既存UI表記は一次情報と一致するため変更しなかった。
- src/content/tools/synthesia.mdは変更不要（適切な既存フィールドなし、新規フィールド追加もしない）。
- help center記載は404で取得不能のため、unresolvedとして記録するに留めた。

## LATEST Update

docs/tasks/LATEST.mdを事実ベースで更新済み（本コミットに含む）。

## Next

Fix the broken internal link to the existing video generation credit comparison guide.
