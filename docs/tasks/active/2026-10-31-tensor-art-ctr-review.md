---
task_id: "2026-10-31-tensor-art-ctr-review"
created_at: "2026-10-31"
status: READY
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "GSCの確定済み28日×2期間におけるTensor.Artページの検索意図を検証し、根拠がある場合に限ってtitleとmeta descriptionを最小修正する。"

non_goals:
  - "クエリ詳細を読まずにtitleを一律で変更すること"
  - "ランキング上昇・CTR改善を断定すること"
  - "料金・規約・モデル・利用可能性の新しい事実を加えること"
  - "canonical、URL、CTA、アフィリエイト、DB、比較ロジック、デプロイ設定の変更"
  - "本番デプロイ"

target_files:
  - docs/tasks/active/2026-10-31-tensor-art-ctr-review.md
  - docs/audits/tensor-art-ctr-review-2026-10-31.md
  - src/pages/tools/tensor-art/index.astro

reference_files:
  - docs/tasks/LATEST.md
  - docs/tasks/TEMPLATE.md
  - docs/decisions/current-governance-documents.md
  - docs/analytics/gsc/README.md
  - docs/audits/gpt-creative-2026-10-31.md
  - src/pages/tools/tensor-art/index.astro

unknowns:
  - "gitignoredローカルGSC rawのqueries.csvおよびpages.csvの明細とtruncatedの有無"
  - "前28日と現28日のTensor.Art単独クエリ別分布、公式サイトへのナビゲーション意図の割合"
  - "titleとmeta変更の増分効果。本施策によるCTR向上は保証されない"

preexisting_untracked_files: []

required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - "実GSC raw manifestの期間・取得ステータス・truncated・data stateを確認し、根拠をauditに残す"
  - "ページ別クエリ上位5-10件の実測値と前期間との差を確認する。匿名化クエリを推測で補完しない"
  - "既存タイトルと候補のうち最も適切な1案を選ぶ。検索意図の根拠が不足する場合はHOLDとして変更しない"
  - "コード変更時はtitleとdescriptionの2属性以外を変えず、canonical・JSON-LD・H1・料金・CTAは不変"
  - "required_checksがすべてPASSし、ブランチの差分と本番未反映を明記する"

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

Issue #12（https://github.com/rookies2478/ai-creative-tools-db/issues/12）。
PR #11と完了処理PR #13はすでにmasterへマージ済み。LATEST.mdではactive taskなし。
本タスクは既存masterにactive taskを1件だけ新規追加するもので、別active taskを起票しない。

既存GSC API取得記録（2026-10-31 audit）：
- sc-domain:aicreative-db.com、2026-10-01..10-28 vs 2026-09-03..09-30、遅延3日
- Tensor.Art: 1,220 impressions、9 clicks、CTR約0.7%、平均順位8.6
- 完全一致「tensor art」: 867 impressions、CTR約0.1%。ページ表示の約71%。
- サイト全体は29 clicks / 2,807 impressions。ブランド単独は公式サイトを探す意図が強い可能性がある（**推論**、実際の検索結果は未確定）。
- gitignored rawはGitHubから取得不可。Claude Codeの認証済みローカル環境で`docs/analytics/gsc/**/raw/**/manifest.json`等を読んで確定する。

## Implementation Notes

1. Read CLAUDE.md and reference_files only. Confirm local branch clean and origin/master synced; do not overwrite work.
2. Locate original GSC run manifests; confirm property, date ranges, data state, acquisition method, truncation.
3. Filter Tensor.Art page queries (prefer page filter query-level API/raw query-pages) for both periods; use 5-10 meaningful top queries with actual clicks, impressions, CTR and position. Distinguish pure navigational brand queries from informational/commercial queries. Do not equate ranking with CTR.
4. Use `docs/audits/tensor-art-ctr-review-2026-10-31.md` for candidate options and evidence. If data does not justify a change, result HOLD with no Astro modification.
5. If justified, change only `<BaseLayout title="..." description="...">` in `src/pages/tools/tensor-art/index.astro`. Do NOT change H1, schema, content, pricing, source dates or official facts. Avoid claiming an unimplemented procedural "使い方" guide.
6. Run required_checks and inspect dist HTML metadata; compare exactly with origin/master.
7. Update audit / task results in scope, push review branch, PR remains review-only. Do not merge/deploy.

## Result Schema

RESULT: HOLD（GSC rawクエリのローカル読戻し前。GPTによるメタ修正未実施）

SUMMARY:
既存監査にTensor.Artのページ別集計と完全一致ブランドクエリのみが存在する。詳細クエリで情報意図の余地を検証するまで改稿は行わない。

CHANGED_FILES:
- docs/tasks/active/2026-10-31-tensor-art-ctr-review.md
- docs/audits/tensor-art-ctr-review-2026-10-31.md

CHECKS:
- task_validation: NOT_RUN
- build: NOT_RUN
- diff_check: NOT_RUN
- scope_validation: NOT_RUN
- data_quality: NOT_RUN
- publish_check: NOT_RUN
- affiliate_links: NOT_RUN
- preview: NOT_RUN
- github_actions: TO_VERIFY

GIT:
- commit: GPT-created review branch
- push: GitHub connector branch writes
- origin_sync: TO_VERIFY

PRODUCTION: NOT_DEPLOYED
LATEST_UPDATED: no（active task進行中のため）
NEXT: Claude CodeでGSCクエリ別データを検証し、最適案を条件付きで実装・検証
