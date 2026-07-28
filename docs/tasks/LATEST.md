# Latest Project State

- updated_at: 2026-07-28
- latest_commit: (このタスクcommit実行後にGIT欄で別途報告する)
- branch: master
- origin_sync: SYNCED at HEAD b6085ef (commit前、rev-list 0 0)
- working_tree: expand-video-comparison-and-fix-prompts実装完了、全required_checks PASS。commit前（対象ファイルのみ変更、未追跡の事前存在ファイルは変更なし）
- preexisting_untracked_files:
  - aicreative-db.com-Performance-on-Search-2026-07-10.zip
  - gsc-fotor-ai-queries-2026-07-10.zip
  - gsc-kling-ai-queries-2026-07-10.zip
  - gsc-luma-ai-queries-2026-07-10.zip
  - gsc-microsoft-designer-queries-2026-07-10.zip
  - gsc-runway-queries-2026-07-10.zip
  - gsc-stable-diffusion-queries-2026-07-10.zip
  - prod_check.html
- current_active_task: none（expand-video-comparison-and-fix-promptsはcompletedへ移動）
- latest_completed_task: docs/tasks/completed/2026-07-28-expand-video-comparison-and-fix-prompts.md（結果: ユーザー本人の実機確認により、Kling AI・Runway・Pika・Luma AI・PixVerse・CapCut AI・Hailuo AI・Vidu AIの8ツールがすべて共通スキームAプロンプトで生成されたことが確定。generatedVideos.tsのPika・Luma AIエントリのprompt（誤って別文面"A clean modern creative workspace..."が記録されていた）を正しいスキームAプロンプト（"A cinematic 5-second video of a modern creative workspace..."）へ訂正（他フィールド・Runwayの3秒記録は無変更）。既存の動画作例比較記事（/comparisons/ai-video-generation-sample-comparison/）へPixVerse・CapCut AI・Hailuo AI・Vidu AIを追加し4ツールから8ツールへ拡張（toolMeta・galleryItems・tableRows〔ツール/動画時間/解像度/モデル/音声トラック/透かし/無料生成DL確認/詳細リンクの実測値ベースへ再設計〕・検証条件表・リード文・傾向カード・目的別選び方・まとめ・FAQ・meta descriptionを同期、「4ツール」等の古い表記は全解消をgrep確認）。title/H1/canonical/breadcrumb/JSON-LD基本構造は無変更（具体的な数値表記がなかったため変更不要）。D-ID・HeyGen・Synthesia等は記事へ追加せず混入なしを確認。comparisonEligible（CapCut AIのみtrueで型定義上のfalse固定と矛盾）は今回変更せず、記事の抽出条件にも使用していない（別課題として記録）。build 92ページ PASS、validate:task PASS、validate:data PASS（Errors 0/Warnings 0/Verify 0）、validate:scope PASS、git diff --check PASS（generatedVideos.tsはprompt2行のみの変更を確認）。dist/への直接アクセスが本環境権限でブロックされたため生成HTML内の8ツール参照確認・ブラウザ実表示は未実施（過去タスクと同様の制約）。本番反映なし）
- paused_tasks: なし
- production_state: NOT_DEPLOYED
- current_phase: search-traffic-launch
- current_plan: AIクリエイティブナビ 計画書 Ver2.0
- current_operations: AIクリエイティブナビ 運用ルール Ver4.0
- next_candidate: 次28日サイクルでのanalytics rotation --apply実行、vidu-ai/hailuo-ai動画のdist生成HTML実表示確認（権限解除後）、または次のツール動画の登録候補選定

## Notes

- add-data-publish-validation-to-ci（本タスク）で、.github/workflows/build.ymlのjob順をcheckout→setup-node→npm ci→Validate tool data(`npm run validate:data`)→Build site(`npm run build`)→Validate published output(`npm run validate:publish`)へ拡張。既存のtrigger（push master・pull_request）・runner（ubuntu-latest）・Node設定（node-version-file: package.json, cache: npm）は無変更。permissionsが未定義だったため`contents: read`を新規追加（write権限は使用しない）。secrets参照・deploy step・artifact upload・schedule triggerは追加していない。validate-publish.mjsはWarnings 4件（既存long-meta-description）でexit code 0となることをローカルで確認済みで、CIを失敗させない設計であることを確認した。GitHub Actions実際のrun結果はpush後に別途確認が必要。

- create-first-gsc-analysis-summary（本タスク）で、`aicreative-db.com-Performance-on-Search-2026-07-10.zip`（property全体export、sha256 52dfdf3e...）をdry-run→apply（run-094504）で正式import。daily 65行（2026-05-05〜07-08、欠損なし）、queries 295行、pages 97行、countries 44行、devices 3行、search-appearance空、query-pages/sitemapsはunavailable（想定通り）。総クリック56・総インプレッション3,979・CTR 1.41%・加重平均順位16.3。docs/analytics/gsc/2026-07-10/analysis-summary.mdへcandidates 10件（C1〜C10）・HOLD理由・selected_candidate: none（implementation_now: false）を記録。判断根拠: トラフィック上位ページ（stable-diffusion, runway, fotor-ai, luma-ai, adobe-firefly-vs-microsoft-designer, kling-ai, gemini-image-generation, tensor-art）の大半が2026-07-05〜07-26にtitle/meta/snippet変更済みで、CTR/順位変化の帰属を判断するには評価期間が不足していることをGit履歴で確認。「stable diffusion」クエリ（順位2.37・インプレッション127・クリック0）はquery-pages非対応のため対応ページを断定できずHOLD。raw run・manifest・CSVはGit非追跡（`docs/analytics/gsc/**/raw/`の既存除外ルールで確認済み）、analysis-summary.mdのみtracked。ページ・DB・sitemapは無変更。副次的に、importer（scripts/gsc-import-lib.mjs）のFILTER_KEY_MAPが実データの「日付」キーではなく「期間」を想定しているバグを発見したが、本タスクのtarget_files外のため修正せず、別タスクでの修正を推奨として記録した。

- implement-gsc-manual-zip-importer（本タスク）で、scripts/import-gsc-manual-export.mjs・scripts/gsc-import-lib.mjs・scripts/test-import-gsc-manual-export.mjsを新規実装。GSC UI手動ZIPをNode標準の`zlib`/`crypto`/`fs`のみで読み取り専用検査（store/deflate対応、ZIP Slip・絶対path・symlink entry拒否、MAX_ENTRIES=64・エントリ20MB・全体100MB上限）。CSVヘッダー優先でdataset識別（ファイル名は使わない）。UTF-8/BOM対応、decode失敗はcp932等へフォールバックせずwarning。daily/queries/pages/countries/devices/search-appearanceを英語ヘッダーへ正規化、CTR百分率→小数変換。totals.csvはdailyからimpression加重平均で導出（単純平均ではない）。dry-runが既定で書き込みゼロ、apply時は一時ディレクトリ→renameで不完全run防止、既存run directory上書き禁止。manifest_version 1.1でscope/filters/source_files等の契約に準拠、secret・absolute local pathは記録しない。fixture 18項目全PASS。実際に保持していた`aicreative-db.com-Performance-on-Search-2026-07-10.zip`（property全体export）でdry-run実行しstatus=success確認、続けてrepository外の一時ディレクトリへのapplyでmanifest.json・totals.csv等の生成とJSON parse成功を確認後、生成物は削除・元ZIPは無変更・repositoryへは一切コピーしていない。page scope（単一ツールページzip）での実データdry-runは未実施。package-lock.jsonは存在せず、新規npm依存も追加していない。

- clarify-heygen-free-download-limitation（本タスク）で、ユーザーの実機確認結果（HeyGen無料プランは動画作成可能だが、作成した動画ファイルは無料でダウンロードできなかった）を、src/content/tools/heygen.md（DB正本）のfreePlanNote・weaknesses・limitations・faqs・本文に反映。「今回の実機確認では」という限定表現を用い、全アカウント・全地域での永続的な断定は避けた。src/pages/tools/heygen/index.astro（専用ページ）・src/pages/categories/avatar-video/index.astro（カテゴリ比較表）・src/pages/comparisons/avatar-video-ai-tools/index.astro（比較記事の比較表・FAQ、従来「○（動画最大1分・クレジットカード不要）」のみでダウンロード制限の記載がなかった）を同内容に同期。HeyGenの独自動画は追加せず、他ツールの表記は無変更。build 92ページ PASS、validate:data PASS（Errors 0, Warnings 0, Verify 0）、validate:scope PASS、diff check PASS。

- align-gsc-manual-export-contract（commit ff73fe6）で、docs/analytics/gsc/README.mdとmanifest.template.json（manifest_version 1.0→1.1）を実測GSC ZIP構造に合わせて全面改定。required_datasets を daily/queries/pages/countries/devices/search-appearance/filters の7件に変更し、totals（derived）・query-pages（unavailable）・sitemaps（unavailable）をoptional_datasetsへ移動。manifestに`processing_stage`（raw|normalized）・`scope`（property|page）・`filters`・`source_export_date`・`imported_at`・`source_files`を新規追加。データセット識別はファイル名でなくCSVヘッダー優先とする方針を明記。importer・CSVパース・API・secret実装は一切行っていない。docs/analytics/README.mdの既存latest-successルールと矛盾しないことを確認し無変更。独立監査で、改定時に旧版の保存先ディレクトリ構造（`docs/analytics/gsc/YYYY-MM-DD/raw/run-HHMMSS/`）の説明が削除されたまま補完されていないことを検出したため、README「実測済みGSC UI ZIP構造」節の直前に「保存先ディレクトリ構造」節を復元・追記してから独立commitした。HeyGenタスクの未commit変更とは明確に分離し、`git add`で対象ファイルを個別指定してcommit（`git add .`は不使用）。

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
