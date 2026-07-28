---
task_id: "expand-video-comparison-and-fix-prompts"
created_at: "2026-07-28"
status: DONE
completed_at: "2026-07-28"
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "ユーザー本人の実機確認に基づき、Pika・Luma AIのgeneratedVideos.ts内の誤ったprompt記録をスキームAへ訂正し、既存のAI動画生成ツール作例比較記事を4ツールから8ツールへ拡張する。"

non_goals:
  - 動画ファイル・posterを変更しない
  - 動画を再生成しない
  - Pika・Luma AI以外のpromptを変更しない
  - Runwayの3秒記録を5秒へ改変しない
  - model・resolution・generatedAtを変更しない
  - D-IDをText to Video比較へ追加しない
  - 新規記事を作成しない
  - URL・canonicalを変更しない
  - comparisonEligibleの値を変更しない
  - 本番反映しない

target_files:
  - src/data/generatedVideos.ts
  - src/pages/comparisons/ai-video-generation-sample-comparison/index.astro
  - docs/tasks/active/expand-video-comparison-and-fix-prompts.md
  - docs/tasks/completed/2026-07-28-expand-video-comparison-and-fix-prompts.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/tasks/completed/2026-07-28-add-d-id-generated-video.md

unknowns:
  - CapCut AIのcomparisonEligibleがtrueである経緯（今回は変更せず報告のみ）
  - Pika/Runwayの透かし・音声の正確な有無（過去記録に無いため「記録なし（要確認）」表記のまま）

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
  - npm run validate:scope
  - git diff --check

acceptance_criteria:
  - Pika・Luma AIのprompt訂正（スキームAへ統一）
  - Runwayの3秒差は維持
  - 記事へPixVerse・CapCut AI・Hailuo AI・Vidu AIを追加し8ツール化
  - D-ID除外
  - comparisonEligible無変更
  - build/data/scope/diff全PASS
  - 本番反映なし

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

ユーザー本人の実機作業確認により、Kling AI・Runway・Pika・Luma AI・PixVerse・CapCut AI・Hailuo AI・Vidu AIの8ツールはすべて共通スキームAプロンプトで生成されたことが確定した。Pika・Luma AIの`generatedVideos.ts`内promptは、生成時の実際の入力内容ではなく別文面（記録誤り）であったため、正しいスキームAプロンプトへ訂正した。Runwayはツール側制限により3秒で生成されており、この実記録は維持した。

その後、既存の動画作例比較記事（`/comparisons/ai-video-generation-sample-comparison/`）を、既存4ツール（Kling AI・Pika・Runway・Luma AI）から8ツールへ拡張した。

## Implementation Notes

### Part 1: prompt訂正

- `src/data/generatedVideos.ts`のpika・luma-aiエントリの`prompt`を、正しいスキームAプロンプト（`A cinematic 5-second video of a modern creative workspace, a laptop on a desk showing abstract colorful motion graphics, soft natural light, slow camera push-in, clean minimal interior, high detail, no text, no logo, no people, no brand.`）へ訂正した。
- file/poster/alt/caption/sampleType/model/provider/durationSec/resolution/generatedAt/reviewedAt/usageNote/pageSlug/isSameToolAsPageは無変更。caption・usageNoteに誤ったプロンプト文面の明示的な記載はなかったため、それらの修正は不要だった。
- negativePromptは訂正指示対象外のため無変更（グループ別の文言が残っているが、今回のスコープ外）。
- Runwayの`prompt`（"A cinematic 3-second video..."）は実記録として維持し、5秒へ書き換えていない。
- 8ツールのprompt再検証結果: kling-ai/runway/pika/luma-ai/pixverse/capcut-ai/hailuo-ai/vidu-aiすべてが同一の「A cinematic N-second video of a modern creative workspace...」文言となり、差異はRunwayの秒数指定（3-second）のみとなった。

### comparisonEligible監査（変更なし）

- 型定義コメント（generatedVideos.ts L24-27）に「video-tool-benchmark-v1: comparisonEligible は false 固定（初期運用）」と明記されている。
- generatedImages.tsではcomparisonEligible: trueが「Aスキームの実出力として比較記事に使用可」を意味する運用（SamplePromptImageGallery.astro等でtrueのみ抽出）。
- generatedVideos.tsのインターフェース型は`comparisonEligible: false;`という**リテラル型**で定義されており、設計上すべてfalseであるべき。CapCut AIのみ`true`（他7件はfalse）で、この型定義と矛盾している。
- 過去のcompleted task（2026-07-27-add-capcut-ai-generated-video.md）にcomparisonEligible: trueとして記録されており、経緯不明。今回は値を変更せず、記事側の抽出条件にも使用していない（既存記事のフィルタは`sampleType === 'tool-video-output' && toolMeta[sourceToolSlug]`のみで、comparisonEligibleは条件に含めていない＝現状維持）。
- この矛盾はCapCut AI側のデータ品質課題として別途報告し、本タスクでは修正しない。

### Part 2: 記事の8ツール化

- `src/pages/comparisons/ai-video-generation-sample-comparison/index.astro`のtoolMetaへpixverse・hailuo-ai・vidu-ai・capcut-aiを追加（既存kling-ai/runway/pika/luma-aiは順序維持、新規4件は既存4件の後に配置）。
- galleryItemsの抽出ロジック（`sampleType === 'tool-video-output' && toolMeta[sourceToolSlug]`）は無変更。toolMeta拡張により自動的に8本抽出される。comparisonEligibleは抽出条件に追加していない。
- tableRowsを4行から8行へ拡張し、列構成を「ツール／動画時間／解像度／モデル／音声トラック／透かし／無料生成・DL確認／詳細リンク」の実測値ベースへ再設計（旧列の動きの自然さ・カメラワーク・人物安定性・image-to-videoは主観評価または新規4ツールでは未検証のため削除、要求列に統一）。値はすべて`generatedVideos.ts`の実測値・usageNoteを正本として記載。旧4ツールの音声情報は当時の記録がないため「記録なし（要確認）」とした。
- リード文・ご確認ください注記・検証条件表（使用ツール・動画尺・解像度・プラン等）・ギャラリー見出し（「4ツール」→「8ツール」）・傾向カード・目的別選び方・まとめ・FAQ（image-to-video/無料プラン/透かしの3問）・meta descriptionを8ツール表記へ更新。
- title・H1・canonicalURL・breadcrumb構造・JSON-LDの基本構造は無変更（titleに具体的な「4ツール」等の数値表記がなかったため変更不要と判断）。
- D-ID・HeyGen・Synthesia・InVideo AI・HaiperはtoolMetaに追加せず、記事本文・ギャラリー・比較表への混入なし。
- 記事内の「4ツール」「4本」「4サービス」「4種類」の古い表記を検索し、全て解消したことをgrepで確認。
