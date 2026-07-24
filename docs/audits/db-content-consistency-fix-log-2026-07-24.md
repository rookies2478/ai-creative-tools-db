# DBコンテンツ整合性監査 対応記録

元監査: `docs/audits/db-content-consistency-audit-2026-07-24.md`（本ファイルでは書き換えない）

## AUD-01 DreamStudio 無料プラン誤表記（P0）

- 対応日: 2026-07-24（本記録作成より前に対応済み）
- 対応内容: 無料プランなし（×）という誤記を「Trial 1000クレジット（使い切り）」に統一
- commit: ec782e1 "Fix DreamStudio free plan labeling"

## AUD-02 Leonardo AI 商用利用条件の不一致（P1）

- 対応日: 2026-07-24
- 一次情報確認: `docs/research/leonardo-ai-commercial-use-verification-2026-07-24.md`
- DB（`src/content/tools/leonardo-ai.md`）: 変更なし。既に「無料プランも非独占ライセンスで商用利用可・所有権はLeonardo.AI／有料プランは完全な所有権」という区分を正しく反映していたため（verifiedAt: 2026-06-15）。
- 修正ファイル（記事側の古い直接記述をDB・最新確認情報に整合）:
  1. `src/pages/tools/leonardo-ai/index.astro`
  2. `src/pages/categories/image-generation/index.astro`
  3. `src/pages/comparisons/midjourney-vs-leonardo-ai/index.astro`
  4. `src/pages/comparisons/free-ai-image-generators/index.astro`
  5. `src/pages/guides/ai-image-commercial-use-checklist/index.astro`
  6. `src/components/CommercialUseCopyright.astro`
  7. `src/pages/guides/commercial-use-cost-comparison/index.astro`
  8. `src/content/guides/commercial-use-cost-comparison.md`
  9. `src/components/FreeAiImageTools.astro`
  10. `src/content/guides/free-ai-image-tools.md`
  11. `src/content/guides/japanese-ai-image-tools.md`
- 主な修正内容: 「無料プランは商用利用不可」「商用利用には有料プラン＋Private設定が必須」という逆方向の断定表現を、「無料プランも非独占的ライセンスで商用利用可能（ただし所有権はLeonardo.AI、他ユーザーも同一画像を使用可）／有料プランは完全な所有権」という表現に統一。commit: 本記録作成と同一コミット（詳細はgit logを参照）。
- 除外: Leonardo AI以外のツール（Pika・Kling AI等の商用利用不可の記述）は変更していない。
- オーファンコンポーネント`src/components/LeonardoAiTool.astro`: どこからも参照されていないため未修正（既存監査のAUD-31と同種の温存判断）。
