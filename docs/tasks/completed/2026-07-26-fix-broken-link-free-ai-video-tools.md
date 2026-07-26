---
task_id: "fix-broken-link-free-ai-video-tools"
created_at: "2026-07-26"
status: READY
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "Replace the broken link to the uncreated free AI video tools comparison page with the existing video-generation pricing and credit comparison guide."

non_goals:
  - No new comparison page
  - No sitemap change
  - No metadata rewrite
  - No long-meta-description warning fix
  - No validator change
  - No production deployment

target_files:
  - src/pages/guides/ai-generation-credits-guide/index.astro
  - docs/tasks/active/fix-broken-link-free-ai-video-tools.md
  - docs/tasks/completed/2026-07-26-fix-broken-link-free-ai-video-tools.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - scripts/validate-publish.mjs
  - src/pages/guides/video-generation-credit-cost-comparison/index.astro

unknowns:
  - The anchor text must accurately match the destination page's scope.
  - The surrounding sentence must remain natural after the link replacement.

required_checks:
  - npm run validate:task
  - npm run validate:data
  - npm run build
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - /comparisons/free-ai-video-tools/ no longer appears as an internal link.
  - The link points to /guides/video-generation-credit-cost-comparison/.
  - The anchor text accurately describes the destination page.
  - The surrounding sentence remains natural.
  - npm run validate:publish reports Errors: 0.
  - Existing long-meta-description warnings remain 4.
  - No other page content changes.
  - No sitemap, validator, schema, DB, route, or slug changes.
  - Build succeeds.
  - Scope validation succeeds.

forbidden_operations:
  - PRODUCTION_DEPLOY

preexisting_untracked_files:
  - aicreative-db.com-Performance-on-Search-2026-07-10.zip
  - gsc-fotor-ai-queries-2026-07-10.zip
  - gsc-kling-ai-queries-2026-07-10.zip
  - gsc-luma-ai-queries-2026-07-10.zip
  - gsc-microsoft-designer-queries-2026-07-10.zip
  - gsc-runway-queries-2026-07-10.zip
  - gsc-stable-diffusion-queries-2026-07-10.zip
  - prod_check.html
---

# fix-broken-link-free-ai-video-tools (completed)

## Result

- previous_href: `/comparisons/free-ai-video-tools/`（未作成ページ）
- current_href: `/guides/video-generation-credit-cost-comparison/`（既存公開ガイド）
- previous_anchor_text: 「無料AI動画生成ツール比較」
- current_anchor_text: 「AI動画生成ツールの料金・無料枠比較」
- 変更箇所: `src/pages/guides/ai-generation-credits-guide/index.astro` 関連ページリンク（1行のみ）
- 新規ページを作成しなかった理由: 未作成の比較ページを新規作成するとカニバリリスクが高く、既存の`/guides/video-generation-credit-cost-comparison/`（Runway・Pika・Luma AI・Kling AI・Vidu AI・PixVerse・Hailuo AI・Haiperの料金・無料枠・クレジット・透かし・商用利用比較）が同一の主要検索意図をほぼ満たすため。

## Validation

- validate:task: PASS
- validate:data: Files checked 29 / Errors 0 / Warnings 0 / Verify 0
- build: 92 pages built, error 0
- validate:publish: HTML files checked 92 / Sitemap URLs checked 90 / Errors 1→0 / Warnings 4（変更なし）
  - 解消: broken-internal-link（/guides/ai-generation-credits-guide/ → /comparisons/free-ai-video-tools/）
  - 残存: long-meta-description ×4（categories/avatar-video, categories/design, use-cases/blog-eyecatch, use-cases/sns-post-image）— 今回スコープ外、変更せず
- git diff --check: PASS
- validate:scope: PASS

## Notes

- 変更ファイルは対象guideファイルのみ（+タスク運用ファイル）。sitemap.xml.ts・validate-publish.mjs・package.json・DB(src/content/tools)は無変更。
- 外部通信・secretアクセスなし。
- GitHub変更は完了。本番sitemap／公開ページへの反映は次回人間による手動デプロイ後。
- commit SHAは実行前の時点では確定しないため、未確定の値は記載しない。commit・push後の確定SHAはタスク完了報告のGIT欄で報告する。
