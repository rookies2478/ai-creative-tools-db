---
task_id: "implement-validate-publish"
created_at: "2026-07-26"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Implement a CI-safe static validator for generated dist HTML and sitemap output without modifying pages, tool data, routes, or production systems."

non_goals:
  - 公開ページ(src配下)の修正
  - DBデータ(src/content/tools/*.md)の変更
  - validate:data.mjsの変更
  - schema(src/content/config.ts)変更
  - title/description/H1の文案改善
  - 外部URLのHTTP到達確認
  - Lighthouse/Playwright/Puppeteer/ブラウザ起動
  - スマホ表示確認・JS実行時エラー確認・CSS表示崩れ確認・画像の実表示確認
  - GitHub Actionsへのvalidate:publish追加
  - 新規npm依存関係の追加
  - 本番反映
  - FTP・ConoHa・DNS・サーバー操作

target_files:
  - scripts/validate-publish.mjs
  - package.json
  - docs/tasks/active/implement-validate-publish.md
  - docs/tasks/completed/2026-07-26-implement-validate-publish.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/current-governance-documents.md
  - package.json
  - astro.config.mjs
  - src/layouts/BaseLayout.astro
  - src/pages/sitemap.xml.ts
  - src/components/ToolFAQ.astro

unknowns:
  - The exact generated sitemap filename and structure must be derived from the current build (confirmed single dist/sitemap.xml, not a sitemap-index).
  - Some generated pages may intentionally use noindex (confirmed: only dist/tools/haiper/index.html).
  - Some routes may intentionally omit FAQ or Breadcrumb schema.
  - Duplicate titles may be intentional only in exceptional cases and must not be silently allowlisted.
  - Existing publish violations may already exist; this task must not modify source pages.

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
  - npm run validate:data
  - npm run validate:publish
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - npm run validate:publish exists.
  - The validator reads generated dist HTML files.
  - The validator reads the generated sitemap output.
  - The validator performs no external network request.
  - The validator uses no browser automation.
  - The validator accesses no secret or credential.
  - The validator reports file path and rule name for each violation.
  - The validator exits 1 when ERROR violations exist.
  - The validator exits 0 when no ERROR violations exist.
  - Missing or duplicate title, H1, canonical, and invalid internal links are detected where applicable.
  - bare href="#" is detected.
  - noindex and sitemap inconsistencies are detected.
  - FAQPage and BreadcrumbList JSON-LD are syntax-checked when present.
  - No src file is modified.
  - No existing page or DB data is modified.
  - Build and scope validation succeed.
  - Existing publish violations, if found, are reported separately and not silently fixed.

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

npm run validate:publish を新規実装し、Astro build後のdist配下HTML/sitemapを外部API・ブラウザなしで静的検証するCI-safe validatorを追加する。

## Implementation Notes

- 新規npm依存関係を追加しない。既存Node標準機能のみで簡易parserを実装する。
- distはgitignore対象のため、target_filesにdist配下は含めない（validatorが実行時に読むだけ）。
- サイト正式originはastro.config.mjsのsite値から取得する。

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
implementation_status: PASS
repository_publish_status: FAIL_WITH_EXISTING_VIOLATIONS

### Rules implemented (scripts/validate-publish.mjs)

- HTML: missing/empty/duplicate title, duplicate-title-across-pages(WARNING)
- HTML: missing/empty/duplicate meta description, short/long length(WARNING、閾値は目安でexit codeに影響しない)
- HTML: missing/empty/duplicate h1
- HTML: missing/empty/duplicate canonical, invalid scheme, origin mismatch, route mismatch, query/hash混入(404は対象外)
- HTML: missing og:title/og:description(ERROR)、missing og:url(WARNING)、og:url/canonical不一致(ERROR)
- HTML: missing html lang="ja"/meta charset/meta viewport
- HTML: bare href="#"、空href、javascript:スキーム、hash-anchor対象id欠落(WARNING)
- HTML: 内部リンク切れ(broken-internal-link)、404への内部リンク
- HTML: JSON-LD構文検査(JSON parse、@type、@graph対応)、FAQPage.mainEntity/Question/acceptedAnswer検査、BreadcrumbList.itemListElement/position/name/item検査
- HTML: 危険文字列の限定検出(huggingface API・localhost・file://等はWARNING、Authorization/Bearerらしき値はERROR、値そのものは非表示)
- sitemap: XML整形式チェック、loc空/origin不一致/重複、noindex URL混入、対応dist HTML欠落、404混入、asset URL混入(WARNING)、公開ページのsitemap欠落(public-route-missing-from-sitemap)
- robots.txt: Sitemap行の存在・生成物との突合(WARNING)

### Scope

- html_files_checked: 92
- sitemap_files_checked: 1 (dist/sitemap.xml、sitemap-index形式は現行未生成のため未検出)
- sitemap_urls_checked: 89
- explicit_exceptions: 404ページはcanonical必須・OG必須・sitemap必須の対象外（コードコメントあり）

### Validation result (build時点)

- errors: 2
- warnings: 4
- 既存違反（実装バグではなくサイト側の実データ違反）:
  1. `dist/guides/ai-generation-credits-guide/index.html` rule: broken-internal-link — `/comparisons/free-ai-video-tools/` へのリンク先ページが存在しない
  2. rule: public-route-missing-from-sitemap — `/comparisons/avatar-video-ai-tools/` が公開ページとして存在するがsitemap.xml(src/pages/sitemap.xml.ts の STATIC_PATHS)に未登録
  - warnings 4件はmeta descriptionの長さ目安超過（品質懸念、意図的の可能性あり）

### Negative test (repo外fixture)

repo外scratchpadに一時fixtureを作成し、以下7種の検出を確認（PASS）: missing title / duplicate H1 / missing(empty) canonical / href="#" / broken internal link / invalid JSON-LD / noindex URL in sitemap。fixtureはrepo外のため本コミット対象外。

### Manual-only remains

- smartphone_layout: 未実施
- visual_breakage: 未実施
- runtime_js_errors: 未実施
- interaction_testing: 未実施
- external_url_status: 未実施(外部到達確認は非対象)
- content_accuracy: 未実施
- Clipdropの実挙動確認: publish validationとは別候補（Notes参照、次タスク候補には含めない）
