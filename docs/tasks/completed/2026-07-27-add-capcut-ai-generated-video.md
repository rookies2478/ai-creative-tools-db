---
task_id: "add-capcut-ai-generated-video"
created_at: "2026-07-27"
completed_at: "2026-07-27"
status: COMPLETED
risk: MEDIUM
current_phase: search-traffic-launch
production_required: false
db_change: false
ui_change: true
official_verification_required: false

goal: "ユーザーがCapCut AIで生成しDownloadsへ保存した動画をリポジトリへ登録し、CapCut AI個別ページに表示する"

non_goals:
  - 動画を再生成しない
  - 動画本体を編集しない
  - 音声・透かしを削除しない
  - 既存動画エントリ・他ツールページを変更しない
  - 本番反映しない

target_files:
  - src/data/generatedVideos.ts
  - src/pages/tools/capcut-ai/index.astro
  - public/videos/generated/tools/capcut-ai-tool-video-output-01.mp4
  - public/videos/generated/tools/capcut-ai-tool-video-output-01-poster.webp
  - docs/tasks/active/add-capcut-ai-generated-video.md
  - docs/tasks/completed/2026-07-27-add-capcut-ai-generated-video.md
  - docs/tasks/LATEST.md

unknowns:
  - CapCut AI側のモデルバージョン詳細

required_checks:
  - npm run validate:task: PASS
  - npm run build: PASS (92 pages)
  - npm run validate:data: PASS (Errors 0, Warnings 0)
  - npm run validate:scope: PASS
  - git diff --check: PASS (no whitespace errors)

acceptance_criteria:
  - CapCut AI生成動画1件をgeneratedVideos.tsへ登録: 完了
  - CapCut AI個別ページにサンプル動画が表示される: sampleVideo props配線済み（dist/ HTML直接確認は環境権限により不可、コンポーネントfilter条件とprops渡しをソース差分で確認）
  - 既存動画・他ツールページ無変更: 確認済み（diff stat: generatedVideos.tsは追加のみ、capcut-ai/index.astroのみ変更）
  - build / validate:data / validate:scope PASS: 確認済み

forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Result

## Provenance

- ユーザー本人が実機操作でCapCut AI（Text to Video）にて生成したことを確認（hands-on confirmation）。
- ファイル名・エンコーダメタデータのみではCapCut固有情報なし（汎用ffmpeg系）。この点はusageNoteに明記。
- 透かし: 左上に「Ai」の文字のみ。CapCut固有の透かし表記ではない。
- モデル詳細: 不明（未確認）。

## Source file verification

- `C:\Users\rooki\Downloads\動画1.mp4`: 存在確認済み、729,305 bytes
- 配置先 `public/videos/generated/tools/capcut-ai-tool-video-output-01.mp4`: サイズ一致（729,305 bytes）
- ffprobe実測: h264 / 1280x720 / 24fps / aac audio / duration ≈5.09秒（仕様5.04秒と概ね一致、再エンコードなし）
- 元Downloadsファイルは削除・移動していない

## Registered data (generatedVideos.ts)

- sourceToolSlug: capcut-ai
- promptVersion: video-tool-benchmark-v1
- prompt: "A cinematic 5-second video of a modern creative workspace, a laptop on a desk showing abstract colorful motion graphics, soft natural light, slow camera push-in, clean minimal interior, high detail, no text, no logo, no people, no brand."
- model: CapCut AI（モデル詳細要確認）
- provider: CapCut
- durationSec: 5
- resolution: 1280x720
- generatedAt: 2026-07-27
- comparisonEligible: true
- isSameToolAsPage: true
- usageNote: ユーザー実機確認・無料生成/ダウンロード・透かし「Ai」・モデル未確認・1本のみで性能断定しない旨を明記

## Page connection

- `src/pages/tools/capcut-ai/index.astro` に generatedVideos から `pageSlug === 'capcut-ai' && sampleType === 'tool-video-output' && isSameToolAsPage` でフィルタした1件を `sampleVideo` propとして ToolDetailPage へ渡す既存パターン（Kling AI/Pika/Luma AI/Runway/PixVerseと同一方式）を適用。

## Notes

- 本タスクは一度 `docs/tasks/paused/` で保留（Clarity MCP分析を優先したため）。resume_condition（Clarity分析完了）を満たしたためactiveへ復帰し、残りのrequired_checksを実行して完了。
- dist/ ディレクトリは本環境の権限設定によりRead/Bash双方から参照不可のため、生成HTMLへの実際の動画URL出現は直接確認できていない。ソースの props配線とfilter条件、および他ツールページと同一のコンポーネント再利用から動作を推定。ブラウザ・HTTP確認も本セッションでは未実施。
- 本番反映は行っていない。
