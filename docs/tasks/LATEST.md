# Latest Project State

- updated_at: 2026-07-27
- latest_commit: 15a5433 (Add analytics storage and summary templates) — 本ファイル更新時点（本タスクcommit前）のHEAD。本タスク（align-gsc-manual-export-contract）のcommit SHAはcommit実行後にGIT欄で別途報告する。
- branch: master
- origin_sync: SYNCED (rev-list 0 0 at HEAD 15a5433)
- working_tree: align-gsc-manual-export-contract実装完了、全required_checks PASS。commit前（対象ファイル3件のみ変更、未追跡の事前存在ファイルは変更なし）
- preexisting_untracked_files:
  - aicreative-db.com-Performance-on-Search-2026-07-10.zip
  - gsc-fotor-ai-queries-2026-07-10.zip
  - gsc-kling-ai-queries-2026-07-10.zip
  - gsc-luma-ai-queries-2026-07-10.zip
  - gsc-microsoft-designer-queries-2026-07-10.zip
  - gsc-runway-queries-2026-07-10.zip
  - gsc-stable-diffusion-queries-2026-07-10.zip
  - prod_check.html
- latest_completed_task: docs/tasks/completed/2026-07-27-align-gsc-manual-export-contract.md（結果: GSC READMEとmanifest.template.jsonを、API取得前提の8データセット構成から実際のGSC UI手動ZIPエクスポート実態（7ファイル）に合わせて改定。manual-first / API-compatible設計。build 92ページ PASS、validate:data PASS、validate:scope PASS。commit後にSHA確定）
- production_state: NOT_DEPLOYED
- current_phase: search-traffic-launch
- current_plan: AIクリエイティブナビ 計画書 Ver2.0
- current_operations: AIクリエイティブナビ 運用ルール Ver4.0
- next_candidate: Implement a dry-run GSC manual ZIP importer and normalization plan.

## Notes

- align-gsc-manual-export-contract（本タスク）で、docs/analytics/gsc/README.mdとmanifest.template.json（manifest_version 1.0→1.1）を実測GSC ZIP構造に合わせて全面改定。required_datasets を daily/queries/pages/countries/devices/search-appearance/filters の7件に変更し、totals（derived）・query-pages（unavailable）・sitemaps（unavailable）をoptional_datasetsへ移動。manifestに`processing_stage`（raw|normalized）・`scope`（property|page）・`filters`・`source_export_date`・`imported_at`・`source_files`を新規追加。データセット識別はファイル名でなくCSVヘッダー優先とする方針を明記。importer・CSVパース・API・secret実装は一切行っていない。docs/analytics/README.mdの既存latest-successルールと矛盾しないことを確認し無変更。

- create-analytics-storage-foundation（commit 15a5433）で、docs/analytics/README.md・docs/analytics/gsc/README.md・docs/analytics/clarity/README.mdを新規作成し、GSC 8データセット・Clarity 5データセットのmanifest.template.json（JSON parse検証済み）とanalysis-summary.template.mdを両方式で作成。latest成功run判定ルール（status=success・completed_at存在・required_datasets全present・validation.errors=0・同日複数runはcompleted_at最新）をREADMEに明記。.gitignoreは`docs/analytics/**/raw/`除外ルールが既存済みのため無変更。secret/token/credential項目は一切含めていない。実データ日付ディレクトリ・rawディレクトリ・.gitkeep・latest symlinkは作成せず。事後audit（本タスクの前段階）で、GSC UI手動ZIP実物7件を読み取り確認し、8データセット構成との差分（query-pages/sitemaps欠落・totals統合・manifest.json未生成・ページフィルタ欄なし等）を特定した。

- add-pixverse-generated-video（commit 5451573）で、ユーザーがPixVerse V6（Image/Textモード・360P出力）で共通ベンチマークプロンプトを使い生成し、Windowsダウンロードフォルダへ保存した動画（PixVerse_V6_Image_Text_360P_A_cinematic_5secon.mp4、5.04秒・640x360・h264/aac・透かし"PixVerse.ai"確認済み）をリポジトリへコピーし、src/data/generatedVideos.tsへ既存4件と同形式で1件追加。src/pages/tools/pixverse/index.astroへsampleVideo propを既存Kling AIページと同一パターンで配線。元Downloadsファイルは無変更・無削除。事後監査でvalidate:data/build/validate:publish/diff-check全PASSを再確認済み。

- bootstrap-github-shared-context（commit 41c7bde）でGitHub共有コンテキスト基盤導入。
- implement-validate-data（commit 55f6321）でvalidate:data新規実装（当時Errors 5・Warnings 3）。
- fix-validate-data-errors（commit b4242d2）でErrors 5件解消（Errors: 0, Warnings: 3のまま）。
- fix-kling-ai-duplicate-sourceref（commit a121892）でkling-ai.mdのsourceRefs重複を解消（Warnings: 3→2）。
- verify-review-overdue-clipdrop-gemini（commit a121892の次のコミット）で、Clipdrop・Gemini画像生成の公式一次情報をWebFetchで実際に再確認し、review-overdue警告2件を解消（Warnings: 2→0）。
  - Clipdrop: Free枠利用上限・運営体制は変更なしを確認。ただし公式料金表のFreeプラン列に"Text to image"の記載があり、過去の管理者環境での実地確認結果（有料版限定）と表記が一致しない状態を発見。断定せず両論併記し、needsReview="yes"として次回ハンズオン再確認候補に残した。commercialUseは利用規約本文が動的表示のため今回も未確認（"unknown"のまま）。
  - Gemini画像生成: プラン名称（Google AI Plus/Pro/Ultra）・価格（¥725/¥2,900/¥14,500・¥32,000）・Google Flowクレジット制を確定情報として更新。pricingStatusを"partial"→"confirmed"に変更。
- implement-validate-publish（本タスク）で、scripts/validate-publish.mjsを新規実装。dist配下92 HTML・sitemap.xml(89 URL)を静的検証。外部通信・ブラウザ自動化・secretアクセスなし。負のテスト（repo外fixture）で7種の違反検出をPASS確認済み。
  - build時点の検証結果: Errors 2件（既存サイト違反、実装バグではない）
    1. dist/guides/ai-generation-credits-guide/index.html → /comparisons/free-ai-video-tools/ への内部リンク切れ
    2. /comparisons/avatar-video-ai-tools/ が公開ページとして存在するがsrc/pages/sitemap.xml.tsのSTATIC_PATHSに未登録（sitemap欠落）
  - Warnings 4件: meta descriptionの長さ目安超過（品質懸念、意図的の可能性あり）
  - 本タスクではsrc・DB・sitemap生成ロジックを一切変更していない（既存違反は次タスクで対応）。
  - GitHub Actionsへのvalidate:publish追加は今回のスコープ外。
- validate:dataは全29ファイルでErrors: 0, Warnings: 0, Verify: 0を達成（維持）。
- fix-clipdrop-free-generation-wording（commit e0a6114）で、ユーザーの実機確認結果（無料版でClipdropの目的の画像生成を完了できなかった）を踏まえ、DB非連動の4ファイルのClipdrop表記を修正。
  - 修正対象: src/pages/comparisons/ec-product-image-ai-tools/index.astro、src/pages/use-cases/ec-product-image/index.astro、src/components/FreeAiImageTools.astro、src/pages/categories/image-generation/index.astro
  - 「無料で画像生成できる」「背景生成に特化」といった断定表現を排除し、「一部機能のみ無料」「背景除去：無料枠あり／背景生成：要確認」に統一。
  - src/content/tools/clipdrop.md・src/pages/tools/clipdrop/index.astroは無変更（既に正確なため対象外）。DBスキーマ・featureフラグ・needsReviewは無変更。他ツールの表示内容も無変更（diffで確認済み）。
- fix-sitemap-missing-avatar-video-comparison（本タスク）で、implement-validate-publishが検出したpublic-route-missing-from-sitemap ERRORを解消。
  - src/pages/sitemap.xml.tsのSTATIC_PATHSに`/comparisons/avatar-video-ai-tools/`を1行追加（既存comparisons系URLの並びに追加、他URLは無変更）。
  - validate:publish結果: Errors 2→1、Warnings 4（変更なし）、Sitemap URLs checked 89→90。
  - 残るERROR: broken-internal-link（/guides/ai-generation-credits-guide/ → /comparisons/free-ai-video-tools/、対象ページ未作成）。次タスク候補。
  - 対象ページ本体・canonical・noindex・sitemap生成ロジックの他部分・validatorは無変更。
  - GitHubへの変更は完了。本番sitemapへの反映は次回人間による手動デプロイ後（本番反映前は公開sitemapに変更が出ない）。
- clarify-synthesia-free-download-limitation（commit f9aeff3）で、Synthesiaの「無料Basicプランはダウンロード不可（有料プランが必要）」という表記を、src/pages/categories/avatar-video/index.astroのSynthesia行に反映。
  - 「無料枠あり（月10分・透かしあり）」→「無料作成可／ダウンロード不可（月10分・透かしあり）」に修正し、note欄にもダウンロード制限を明記。
  - src/content/tools/synthesia.md・他ツールの表示は無変更（diffで1行のみの変更を確認済み）。Haiperのデフォルト配列（Free.astro）は今回のnon-goalsのため未修正。
  - 事後監査で、当時この表記の一次情報記録がrepository内に存在しないことが判明（OFFICIAL_VERIFICATION_REQUIRED）。
- verify-synthesia-free-download（本タスク）で、Synthesia公式pricingページ（https://www.synthesia.io/pricing）を実際にWebFetchで確認。機能比較表で「MP4 Downloads」「Remove Synthesia logo」がいずれもStarterプラン以上限定と明記されており、既存UI表記（無料作成可／ダウンロード不可）が一次情報と一致することを確認（判定: CONFIRMED_DOWNLOAD_NOT_ALLOWED）。
  - ページ側の変更は不要（既存表記を維持）。docs/research/synthesia-free-download-verification-2026-07-26.mdに確認結果を新規記録。
  - help center（https://www.synthesia.io/help）はHTTP 404で取得不能、unresolvedとして記録。src/content/tools/synthesia.mdは適切な既存フィールドがなく変更なし。
- fix-broken-link-free-ai-video-tools（本タスク）で、implement-validate-publish以降残っていた最後のbroken-internal-link ERRORを解消。
  - src/pages/guides/ai-generation-credits-guide/index.astroの関連ページリンクを、未作成の`/comparisons/free-ai-video-tools/`から既存公開ガイド`/guides/video-generation-credit-cost-comparison/`へ差し替え。アンカーテキストも「無料AI動画生成ツール比較」→「AI動画生成ツールの料金・無料枠比較」に変更（遷移先の実際のスコープに合わせるため）。
  - 新規比較ページは作成せず（既存ガイドが同一の主要検索意図をほぼ満たしており、新規作成はカニバリリスクが高いと判断）。
  - validate:publish結果: Errors 1→0、Warnings 4（変更なし）。残るWarningsはlong-meta-description×4のみで、今回のスコープ外として維持。
  - 対象ファイルは上記guideファイル1件のみ。sitemap.xml.ts・validate-publish.mjs・DB(src/content/tools)・title/meta/H1は無変更。
- commit SHAは実行前の時点では確定しないため、未確定の値は記載しない。commit・push後の確定SHAはタスク完了報告のGIT欄で報告する。
