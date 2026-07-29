---
task_id: "gsc-api-14day-analysis"
created_at: "2026-07-30"
status: DONE
completed_at: "2026-07-30"
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: false
official_verification_required: false

goal: "GSC Search Analytics APIを使い、最新確定日を終了日とする連続14日間のデータを全9dataset同一期間で取得し、検索流入立ち上げフェーズにおける改善候補を最大3件抽出してcompleted taskとanalysis-summary.mdへ記録する。"

non_goals:
  - 記事、コード、DB、UIの変更
  - title、meta、H1の変更
  - 新規記事作成
  - 内部リンク変更
  - アフィリエイト変更
  - GSC設定変更
  - Google Cloud設定変更
  - 本番反映
  - 改善候補の自動実装
  - 複数ページの同時修正
---

# Task Result

## Goal

上記参照。

## Result

PASS

## Summary

- `npm run analytics:gsc:fetch -- --days 14`をAPI方式で実行。`GSC_DATA_LAG_DAYS=3`既定値のもと、要求期間と実取得期間はともに`2026-07-13`〜`2026-07-26`（連続14日間、欠損日0）で一致。
- manifest: `method=api`、`success=true`、`credentialPathStored=false`、全9 dataset（totals/daily/queries/pages/query-pages/devices/countries/search-appearance/sitemaps）すべて`status=success`、`truncated: []`、`warnings: []`、`errors: []`。totals/daily整合チェックは`status: match`。
- サイト全体: クリック18、インプレッション2,329、CTR 0.77%、加重平均順位15.5。表示ページ82・表示クエリ209・query-pages行219。日本が支配的（クリック18/18）、デバイスはPC優位。
- 前回分析（2026-07-10、手動ZIP・期間ラベル`3m`＝約65日間）とは取得方式・期間長が異なるため、増減率比較は**INVALID**と明記（無理に算出せず）。
- query-pagesでmulti-URLとなった8クエリすべてを確認し、いずれもカテゴリ→比較記事→use-caseの正常なハブ＆スポーク構造と判定（カニバリゼーション該当なし）。
- 候補3件抽出（実装なし、いずれも`implementation_now: false`）:
  1. C1: `/tools/tensor-art/`（クエリ`tensor art`、impr=49・clicks=0・pos=9.6、A1）
  2. C2: `/tools/stable-diffusion/`（クエリ`stable diffusion 商用利用`、impr=42・clicks=0・pos=23.0、A2）
  3. C3: `/comparisons/ad-banner-ai-tools/`（クエリ`バナー生成ai 比較`/`バナー作成ai 比較`、impr=19/17・clicks=0・pos=13.9/15.7、A1/A2境界）
- 候補3件について`git log --since=2026-06-01`を確認し、いずれも該当コミットなし（直近21日以内のtitle/meta/H1変更なし）。データへの反映懸念なし。
- HOLD: `fotorの〜を無料で使う方法は？`型の自然文・AI対話調クエリ群（順位2〜9台・クリック0多数、query意図が不明確）、`アバター動画生成ai 比較`（順位41、レンジ外）、`最新のaiアバター動画生成ツールと料金は？`（表示数僅少）。
- sitemap: 1件、submitted 90 URL、warnings/errors 0、異常なし。
- 詳細は`docs/analytics/gsc/2026-07-26/analysis-summary.md`を参照。

## Changed Files

3件
- `docs/analytics/gsc/2026-07-26/analysis-summary.md`（新規）
- `docs/tasks/completed/2026-07-30-gsc-api-14day-analysis.md`（新規、`docs/tasks/active/`から移動）
- `docs/tasks/LATEST.md`（更新）

`docs/analytics/gsc/2026-07-26/raw/run-005322/`はGit管理外（`.gitignore`の`docs/analytics/gsc/**/raw/`ルールで除外、`git check-ignore -v`で確認済み）。

## Checks

- task validation: PASS
- manifest.success: PASS（true）
- manifest.method: PASS（api）
- credentialPathStored: PASS（false）
- 全dataset status: PASS（9件すべてsuccess）
- period consistency（14日間・欠損日0）: PASS
- totals/daily整合: PASS（match）
- truncation check: PASS（該当なし）
- query-pages competition check: PASS（8件のmulti-URLをすべて確認、カニバリなし）
- sitemap check: PASS（warnings/errors 0）
- secret check: PASS（値・パス・鍵内容を一切表示・記録していない）
- git diff --check: PASS
- scope validation (`npm run validate:scope`): PASS
- raw gitignore確認: PASS（`git check-ignore -v`で除外確認）
- 分析対象外ファイルの変更なし: PASS（`git status --short`で変更ファイルはanalysis-summary.md・active/completed task・LATEST.mdのみ）
- build: 実施せず。分析・docsのみの変更（記事・コード・DB・UIを一切変更していないため）。

## Git

- branch: master
- commit: push後に確定
- push: 実施予定
- origin sync: push後に確認
- working tree: push後clean見込み

## Production

- state: NOT_DEPLOYED
- checked URLs: なし（本番デプロイなし）

## Decisions

なし。既存の候補抽出ルール・分類定義（README/active task記載）にそのまま従った。

## LATEST Update

`docs/tasks/LATEST.md`を本タスクの結果で更新。

## Next

C1〜C3のいずれか1件（推奨: C1 `/tools/tensor-art/`、順位9.6と最も良好でCTR改善効果が見込みやすい）を対象に、title/meta/冒頭回答改善の個別active taskを作成する。
