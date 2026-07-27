---
task_id: "add-vidu-ai-generated-video"
created_at: "2026-07-28"
status: DONE
completed_at: "2026-07-28"
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "ユーザーがVidu AIで共通ベンチマークプロンプトを使い生成し、Windowsダウンロードフォルダへ保存した動画をリポジトリへ取り込み、既存Kling AI等と同じ仕組みでVidu AI個別ページへ表示する。"

non_goals:
  - 動画を再生成しない
  - 動画本体を編集・トリミング・再エンコードしない
  - 音声・透かしを削除しない
  - 既存動画エントリを変更しない
  - 他ツールページを変更しない
  - モデル名・無料クレジット制度・商用利用可否を推測しない
  - 本番反映しない

target_files:
  - src/data/generatedVideos.ts
  - src/pages/tools/vidu-ai/index.astro
  - public/videos/generated/tools/vidu-ai-tool-video-output-01.mp4
  - public/videos/generated/tools/vidu-ai-tool-video-output-01-poster.webp
  - docs/tasks/active/add-vidu-ai-generated-video.md
  - docs/tasks/completed/2026-07-28-add-vidu-ai-generated-video.md
  - docs/tasks/LATEST.md

reference_files:
  - docs/tasks/LATEST.md
  - docs/tasks/completed/2026-07-27-add-hailuo-ai-generated-video.md

unknowns:
  - Vidu AIの具体的な生成モデル名・バージョン
  - 商用利用可否
  - 無料クレジットが初回限定か継続付与か

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
  - git diff --check
  - npm run validate:scope

acceptance_criteria:
  - Downloads内の正しいVidu AI動画を特定
  - provenanceをユーザー実機確認として記録
  - 元動画を無編集でコピー
  - poster作成
  - generatedVideos.tsへ1件登録
  - Vidu AI個別ページへ表示
  - 他ツール変更なし
  - build/data/scope/diff全PASS
  - 本番反映なし

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Task

## Background

ユーザーがVidu AIで共通ベンチマークプロンプトを使用し動画生成・ダウンロードに成功。既存のKling AI・Luma AI・Pika・Runway・PixVerse・CapCut AI・Hailuo AIと同じ独自動画サンプルの仕組みでVidu AIページへ掲載する。

初回のDownloadsファイル（vidu-video-3396866859141147.mp4）はHEVC(H.265)コーデックで、既存6件が全てh264である点との互換性懸念をユーザーへ確認したところ、ユーザーがh264版（vidu-video-3396873421137460.mp4）を用意し直したため、そちらを正式なsource fileとして採用した。

## Implementation Notes

- source file: `vidu-video-3396873421137460.mp4`（1,322,368 bytes、Downloads直下で該当1件）
- ffprobe実測: format mov/mp4、video_codec h264 (High profile)、audio_codec aac、1920x1080、24fps、duration 5.041667秒（音声トラック5.034秒）
- metadata内AIGCタグのProduceID/PropagateIDに"text2video-3.2-5-720p-..."の記載があるが、正式なモデル名・バージョンとは断定していない
- フレーム抽出（n=10,60,110）で画面右下に「Vidu AI」透かしを目視確認。単一カット、破損・黒画面なし、内容はプロンプト（laptop/colorful motion graphics/clean minimal interior/slow camera push-in）と一致
- provenanceはユーザーの実機確認（Vidu AIで生成・ダウンロードし該当ファイル名を明示）を主要根拠とし、透かし・metadata記載を補助根拠として記録
- public/videos/generated/tools/vidu-ai-tool-video-output-01.mp4へ無編集コピー（Downloads側の元ファイルは無変更・無削除、初回のHEVC版ファイルも削除していない）
- poster: n=60フレームを1200x675（既存poster群と同一解像度・アスペクト比）へscaleしwebp化。透かし・文字追加なし
- generatedVideos.tsへ1件追加。durationSecは実測5.041667秒から整数値5。usageNoteに実測小数値・音声トラックあり・透かし「Vidu AI」・ProduceID表記からモデル名を断定していない旨・無料クレジット制度未確認の旨を明記。comparisonEligible: false（既存Kling AI/Pika/Runway/Luma AI/Hailuo AIと同じ扱い）。provider表記は既存慣例に合わせ"Vidu AI"
- src/pages/tools/vidu-ai/index.astroへgeneratedVideosのimportとfind処理、sampleVideo propを既存CapCut AI/Hailuo AIページと同一パターンで追加。他のprops・レイアウト・料金・説明文は無変更
- dist/tools/vidu-ai/index.htmlでvidu-ai-tool-video-output-01.mp4/poster.webpの参照を確認。他7ツール（kling-ai, luma-ai, pika, runway, pixverse, capcut-ai, hailuo-ai）のHTMLには参照0件で誤混入なしを確認
- git diff src/data/generatedVideos.tsで削除行が存在しないことを確認し、既存7件のエントリが無変更であることを検証
- dist配下ファイルへの直接アクセスが本環境権限でブロックされたため、video要素個別属性（controls/autoplay有無）・ブラウザでの実表示・mobile崩れ・console確認は未実施（過去タスクと同様の制約）
