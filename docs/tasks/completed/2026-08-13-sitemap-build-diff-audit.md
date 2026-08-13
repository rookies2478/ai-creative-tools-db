---
task_id: "sitemap-build-diff-audit"
created_at: "2026-08-13"
status: COMPLETED
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "reports-directory-fresh-auditで独立に観測されたbuild 92ページ対sitemap URL 90件の2件差分を特定し、意図的除外か索引漏れかを判定する（audit only、実装変更なし）。"

non_goals:
  - "sitemap設定の変更"
  - "ルート・メタデータ・robots/noindexの変更"
  - "コンテンツ・DBの変更"
  - "本番デプロイ"

target_files:
  - docs/tasks/active/2026-08-13-sitemap-build-diff-audit.md
  - docs/tasks/completed/2026-08-13-sitemap-build-diff-audit.md
  - docs/tasks/LATEST.md
  - docs/audits/sitemap-build-diff-2026-08-13.md

reference_files:
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - src/pages/sitemap.xml.ts
  - src/pages/tools/haiper/index.astro
  - src/content/tools/haiper.md

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
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "build page数とsitemap URL数を実測で確認済み"
  - "差分2件それぞれのpath・source route・noindex・explicit_exclusionを特定済み"
  - "各差分をINTENTIONAL_EXCLUSION/LIKELY_SITEMAP_GAP/REVIEWのいずれかに分類済み"
  - "アプリケーションソース・sitemap設定・DBは無変更"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - SITEMAP_CONFIG_CHANGE
  - ROUTE_CHANGE
  - METADATA_CHANGE
  - DB_CHANGE
---

result: |
  build 92ページとsitemap 90件の2件差分を特定。差分は `/404.html`（Astro標準404ルート、sitemap.xml.tsのSTATIC_PATHS/tools双方に非記載＝暗黙的除外）と `/tools/haiper/`（sitemap.xml.ts内SITEMAP_EXCLUDED_PATHSに明示登録、かつsrc/pages/tools/haiper/index.astro:38でnoindex={true}明示済み。src/content/tools/haiper.md記載の通りコンシューマー向けWebアプリが2025年2月シャットダウン済みのため）の2件。両方とも索引ポリシーと矛盾のないINTENTIONAL_EXCLUSIONと判定し、修正は不要と結論。
  built page一覧はdist/への直接アクセスが本環境権限でブロックされているため（過去タスクと同様の制約）、npm run build実行時の標準出力ログから全92出力ファイルパスを復元し正規化して照合する方法で代替した。
  sitemap 90件はsrc/pages/sitemap.xml.tsのロジック（STATIC_PATHS 62件 + toolsコレクション29件 − SITEMAP_EXCLUDED_PATHS 1件）から算出し、実測build結果と整合することを確認済み。
  SITEMAP_NOT_BUILT（sitemap側のみに存在するURL）は0件。
  詳細はdocs/audits/sitemap-build-diff-2026-08-13.md参照。
  アプリケーションソース・sitemap設定・robots/noindex設定・DB・比較ロジックは一切変更していない。build 92ページ PASS（確認目的のみ）。本番反映なし（対象外、監査のみのため）。
