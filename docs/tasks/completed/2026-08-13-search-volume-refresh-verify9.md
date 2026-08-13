---
task_id: "2026-08-13-search-volume-refresh-verify9"
created_at: "2026-08-13"
status: COMPLETED
risk: LOW
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "Google Keyword Planner新規エクスポート9件を用いてstable-diffusion/runway/adobe-firefly/kling-ai/luma-ai/hailuo-ai/pika/vidu-ai/pixverseのVERIFY行をRESEARCHEDへ更新し、12ツールのBIG_KEYWORD_RANKINGを作成する。"

non_goals:
  - "src/content/tools/*.mdおよび本番反映系ページの変更"
  - "本番デプロイ"
  - "commit/push"

target_files:
  - docs/tasks/active/2026-08-13-search-volume-refresh-verify9.md
  - docs/tasks/completed/2026-08-13-search-volume-refresh-verify9.md
  - docs/seo-research/ai-tools-search-volume-master.xlsx
  - docs/audits/search-volume-refresh-verify9-2026-08-13.md
  - docs/seo-research/imports/search_volume_stable-diffusion_2026-08-13.csv
  - docs/seo-research/imports/search_volume_runway_2026-08-13.csv
  - docs/seo-research/imports/search_volume_adobe-firefly_2026-08-13.csv
  - docs/seo-research/imports/search_volume_kling-ai_2026-08-13.csv
  - docs/seo-research/imports/search_volume_luma-ai_2026-08-13.csv
  - docs/seo-research/imports/search_volume_hailuo-ai_2026-08-13.csv
  - docs/seo-research/imports/search_volume_pika_2026-08-13.csv
  - docs/seo-research/imports/search_volume_vidu-ai_2026-08-13.csv
  - docs/seo-research/imports/search_volume_pixverse_2026-08-13.csv
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/decisions/search-volume-data-governance.md
  - docs/audits/search-volume-data-foundation-audit-2026-08-13.md
  - docs/audits/search-volume-refresh-verify9-2026-08-13.md

unknowns:
  - "各ツール163〜819件の関連キーワード行を全件目視精査したわけではない（監査doc限界事項に記載済み）"

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run validate:scope
  - git diff --check

acceptance_criteria:
  - "9ツールのresearch_statusがVERIFYからRESEARCHEDへ更新されていること"
  - "旧VERIFY行がサマリー集計から除外される形でSUPERSEDEDとして保持されていること（削除ではない）"
  - "BIG_KEYWORD_RANKING（12ツール: 対象9件+photoroom/creatify/recraft）が作成されていること"
  - "GKPインポートファイル9件がdocs/seo-research/imports/配下に存在しGit管理外であること"
  - "ambiguous keyword除外（pika: pixnova ai、vidu-ai: fal ai video/kissing ai video）が監査docに明記されていること"
  - "src/content・src/pages等の本番反映系ファイルが無変更であること"

forbidden_operations:
  - PRODUCTION_DEPLOY
  - COMMIT
  - PUSH

result: >
  Google Keyword Planner新規エクスポート9件（stable-diffusion/runway/adobe-firefly/kling-ai/
  luma-ai/hailuo-ai/pika/vidu-ai/pixverse、いずれも拡張子.csv、163〜819件の関連キーワード行を含む
  網羅的エクスポートでbrand-only1行のみの不完全ファイルはなし）を検証のうえDownloadsから
  docs/seo-research/imports/へ移動（同ディレクトリは.gitignoreによりGit管理外）。canonical workbook
  docs/seo-research/ai-tools-search-volume-master.xlsxの該当9行をresearch_status=VERYFY→RESEARCHEDへ
  更新し、旧article_brushup_recommendations.xlsx由来のVERIFY行はSUPERSEDEDマークを付与し削除せず
  保持（サマリー集計からは除外）。BIG_KEYWORD_RANKINGシートを新規作成し、対象9ツールに既存確定済み
  photoroom/creatify/recraftを加えた12ツールをexact brand検索ボリューム順にランキング化。ambiguous
  brand termはpika（"pixnova ai"を別ツールとして関連集計から除外）とvidu-ai（"fal ai video"
  "kissing ai video"を無関係語として除外）の2件を特定し監査docに理由を明記、runway/luma/firefly単体
  の非AI語義行は元データに存在せず除外不要だった。監査ドキュメント
  docs/audits/search-volume-refresh-verify9-2026-08-13.mdを新規作成し、入力ファイル一覧・取込行数・
  旧VERIFY行のsupersede記録・ambiguous除外・12ツールランキング・上位5件（search-demand基準のみ、
  最終SEO優先度決定にはGSC順位/impressions・clicks/SERP難易度/公式サイト占有度の追加検討が必要な旨を
  明記）・残NOT_RESEARCHEDツールを記録。データ取込・xlsx更新自体は本task file作成前に完了していた
  ため、事後的にdocs/tasks/active/へ本task fileを作成しtask_validation/scope_validationを
  PASSさせた（作成直後は本task fileパス自体がtarget_files範囲外でscope FAILしたためtarget_files
  へ自ファイルパスを追加して解消）。src/content/tools/*.md・src/pages配下・アプリケーションソース・
  DB schema・比較ロジック・アフィリエイトリンクは一切変更していない。validate:task PASS、
  validate:scope PASS、git diff --check PASS（エラーなし）。commit/push/本番デプロイは未実施
  （ユーザー指示によりこの段階では禁止）。
---
