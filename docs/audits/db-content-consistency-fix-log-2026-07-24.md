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

## AUD-03/04/05 Pika 動画長・Pikaframes・無料クレジット（P1）

- 対応日: 2026-07-24
- 一次情報確認: `docs/research/pika-features-pricing-verification-2026-07-24.md`（Pika公式料金ページ https://pika.art/pricing を直接確認）
- 確認内容の要旨:
  - 通常のText-to-Video / Image-to-Videoは5秒・10秒から選択（公式料金ページに明記）
  - Pikaframes（複数画像間のフレーム補間・延長機能）は現在も提供されており、5秒/10秒/10〜15秒/15〜20秒/20〜25秒の区分で最大25秒程度まで対応
  - 無料（Free）プランには毎月80クレジットが付与されると公式料金ページに明記（480p・透かしあり・商用利用不可）。付与周期は「毎月」であり、初回のみの付与ではない
- DB（`src/content/tools/pika.md`）の修正:
  - AUD-03: `features.maxVideoDuration`（旧: 5秒・10秒対応のみを記載）と`notBestFor`（旧: 「最大10〜25秒程度」と矛盾する表現）を統一。通常生成（5秒・10秒）とPikaframes（最大25秒）を明確に区分する記述に変更し、本文に「動画の長さについて」セクションを新設
  - AUD-04: `features.videoExtend`を`false`→`true`に変更（Pikaframesが実際に提供されているため）。FAQに「Pikaframesとは何ですか？」を追加
  - AUD-05: `freePlanNote`・`pricingDecision.freePlanLimitNote`・料金表・FAQを「クレジット数は公式に明記なし」から「毎月80クレジット（2026-07-24公式確認）」に変更。ただし変更・改定の可能性がある旨は維持
  - `lastReviewed`/`verifiedAt`/`reviewed.pricing`/`reviewed.features`を2026-07-24に更新、`nextReviewDue`を2026-10-24に更新
- 記事側の修正: `src/pages/tools/pika/index.astro`（無料枠クイックテーブル・FAQ・情報確認日のフォールバック値を80クレジット/月・2026-07-24に統一）
- 変更しなかった箇所: 他ツールページ・比較記事・カテゴリページ・ガイド記事に既に存在した「月80クレジット程度（毎月更新）」「Pikaframes（最大25秒）」等の記述は、一次情報確認の結果、内容として正確だったため変更不要と判断（全文検索で確認、19箇所ほど該当）
- 除外: Pika以外のツール（Runway・Kling AI等）の料金・機能情報は変更していない
- 未確定のまま残した項目: 有料プラン（Standard/Pro/Fancy）の名称・料金体系が公式サイトで変更されている可能性を示す二次情報があったが、今回のAUD-03/04/05のスコープ外のため確認・変更は行っていない（将来の課題として研究記録に記載）
- build検証: `npm run build` で92ページ生成、error 0・warning 0を確認

## AUD-06 Synthesia カテゴリ一覧が確定情報を未反映（P1）

- 対応日: 2026-07-24
- 一次情報確認: `docs/research/synthesia-plan-features-verification-2026-07-24.md`（Synthesia公式料金ページ https://www.synthesia.io/pricing を直接確認）
- 確認内容の要旨: Basic無料プラン（月10分・透かしあり・1,200クレジット/月・アバター9種）、Starter $18/月（年払い）〜$29/月（月払い）は一次情報と一致。商用利用の詳細条件・日本語UI対応は公式料金ページ本文からは断定できず、DBの`commercialUse: "limited"`・`japaneseUi: "unknown"`が妥当と確認
- DB（`src/content/tools/synthesia.md`）: 変更なし。freePlan/commercialUse/japaneseUiとも一次情報と矛盾せず、フィールド間の相互矛盾もなし
- 修正ファイル: `src/pages/categories/avatar-video/index.astro`（L59）のみ
  - 修正前: `{ name: 'Synthesia', free: '要確認', ja: '要確認', commercial: '要確認', ... }`
  - 修正後: `{ name: 'Synthesia', free: '無料枠あり（月10分・透かしあり）', ja: '要確認', commercial: '条件付き（要公式確認）', ... }`
  - ja列は元々DBの`japaneseUi: "unknown"`と整合していたため変更なし
- 除外: Synthesia以外のツール（HeyGen・D-ID・InVideo AI等、同ファイル内の他行）は変更していない
- 全文検索: `src/content/tools/synthesia.md`・`src/pages/tools/synthesia/`・`src/pages/categories/`・`src/pages/comparisons/`配下のSynthesia関連記述は他に不一致なし（比較記事・専用ツールページは既にDB確定値と一致していた）
- build検証: `npm run build` で92ページ生成、error 0・warning 0を確認
