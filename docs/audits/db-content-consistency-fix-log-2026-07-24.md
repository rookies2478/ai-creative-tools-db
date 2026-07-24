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

## AUD-07 HeyGen カテゴリ一覧の日本語UI誤表記（P1）

- 対応日: 2026-07-24
- 一次情報確認: `docs/research/heygen-japanese-ui-verification-2026-07-24.md`（HeyGen公式ヘルプセンター help.heygen.com、公式Dashboard/Platform Overviewページ heygen.com/academy/platform-overview を確認。二次情報としてChrome拡張の存在も参照し、一次情報未確認である旨を明記）
- 確認内容の要旨: HeyGen公式のヘルプセンター・製品概要ページには、ダッシュボードのUI表示言語を日本語に切り替える設定についての記載が見当たらない。日本語音声・動画翻訳機能は公式に案内されているが、これは日本語UI対応の根拠にはならない。非公式Chrome拡張による機械翻訳は存在するが、公式日本語UI対応ではない。
- DB（`src/content/tools/heygen.md`）: 変更なし。`japaneseUi: "unknown"`は元々一次情報と矛盾せず正しかった。本文・FAQ・limitations・weaknesses全てで「日本語UIの対応状況は公式情報で明記されていない（要確認）」と一貫して記載されており、修正不要と判断。
- 修正ファイル: `src/pages/categories/avatar-video/index.astro`（L58）のみ
  - 修正前: `{ name: 'HeyGen',    free: '要確認', ja: '対応',  commercial: '要確認', note: '多言語AIアバター動画の代表ツール。カスタムアバター機能あり。',  href: '/tools/heygen/' },`
  - 修正後: `{ name: 'HeyGen',    free: '要確認', ja: '要確認', commercial: '要確認', note: '多言語AIアバター動画の代表ツール。カスタムアバター機能あり。',  href: '/tools/heygen/' },`
  - 同表内の他3ツール（Synthesia/D-ID/InVideo AI）は元々`ja: '要確認'`であり、修正後は表内で表記が統一された
- 除外: HeyGen以外のツール（同ファイル内の他行）、日本語音声・字幕・翻訳・プロンプト等の別項目の記載は一切変更していない
- 全文検索: `src/content/tools/heygen.md`・`src/pages/tools/heygen/`・`src/pages/categories/`・`src/pages/conditions/`・`src/pages/comparisons/`・`src/content/guides/`・`src/components/`・`src/data/`配下のHeyGen関連記述を確認。`src/content/guides/japanese-support-three-types.md`(95)は既に「要確認」「未確認」表記で一次情報・DBと整合しておりAUD-07の対象外・変更不要
- build検証: `npm run build`実行結果は本記録末尾のcommitログ・作業報告に記載
- commit予定: "Fix HeyGen Japanese UI labeling"

## AUD-08 Canva AI 旧USD料金表記（P1）

- 対応日: 2026-07-24
- 一次情報確認: `docs/research/canva-ai-pricing-verification-2026-07-24.md`
  - Canva公式料金ページ（https://www.canva.com/ja_jp/pricing/）はJS描画依存でWebFetch取得不可（静的シェルのみ取得、価格情報抽出不可）。
  - 一次情報として確認できたのは、DBが2026-07-13の日本課金監査で既に確認済みの`japanBilling`セクション（App Store日本のアプリ内課金でCanva Pro ¥1,180/月・¥11,800/年）のみ。Web契約時の通貨・価格は今回も未確認のまま「要公式確認」を維持。
  - 二次情報（Designrr等の第三者比較サイト）ではCanva Pro（グローバル/米ドル）$18/月・$144/年相当という記載があり、旧「$15/月・$120/年」表記自体が既に陳腐化していたことを示唆。ただし二次情報のみでは確定できないため、サイト・DBには採用せず、確認済みのJPY値（App Store日本）を採用。
- 対象ツール: Canva AI画像生成（`canva-ai-image-generator`、監査書の対象ファイル名は`canva-ai.md`と記載されていたが実際のDBファイルは`src/content/tools/canva-ai-image-generator.md`）
- DB本体も一部フィールドが旧USD表記のまま残っていたため、DB側も修正（詳細は下記）：
  - `src/content/tools/canva-ai-image-generator.md`
    - 36行目 `paidPlanNote`: 修正前「Canva Pro $15/月〜（月払い）／$120/年（年払い）。有料プランは…」→ 修正後「Canva Pro ¥1,180/月〜・¥11,800/年〜（App Store日本の公式表記）。Web契約時の価格・通貨は要公式確認です。有料プランは…」
    - 231行目 本文料金表: 修正前「$15/月〜」→ 修正後「¥1,180/月〜（App Store日本、Web契約は要公式確認）」
    - `lowestPaidPlan`(7行目)・`japanBilling`セクション(163-179行目)は既に正しいため変更なし
- 記事側（AUD-08の直接対象）:
  - `src/pages/comparisons/canva-ai-vs-adobe-firefly/index.astro`(51行目): 修正前「$15/月〜（Canva Pro・月払い）／$120/年（年払い）」→ 修正後「¥1,180/月〜（Canva Pro・App Store日本のアプリ内課金）。Web契約の通貨は要公式確認」（同記事内の他箇所87-88,133,155と表記統一）
- 同一問題として横展開修正（Canva AI行のみ、他ツールは変更なし）:
  - `src/content/guides/commercial-use-cost-comparison.md`（67,84,106行目）
  - `src/pages/guides/commercial-use-cost-comparison/index.astro`（22,60,103行目）
  - `src/pages/categories/image-generation/index.astro`（117行目、Canva AIカードのprice欄のみ）
- 除外（今回は変更しない）:
  - `src/components/CanvaAiTool.astro`（オーファンコンポーネント、AUD-18で別途対応予定のため対象外）
  - `src/content/tools/playground-ai.md`・`src/pages/tools/playground-ai/index.astro`（USD表記だがPlayground AI自体の実料金であり別問題）
  - Adobe Firefly側の既存値は変更なし（列見出し等の調整も今回は不要と判断、既存表記で問題なし）
- 全文検索: `Canva|USD|\$|ドル|円|月額|年額|月払い|年払い`等でCanva関連ファイルを再検索し、旧USD「$15/月」「$120/年」の残存がないことを確認（オーファンコンポーネント除く）
- build検証: 下記コミット時点のbuild結果を参照
- commit予定: "Fix outdated Canva AI pricing"

## AUD-09 Tensor.Art japanesePrompt表記不一致（P2）

- 対応日: 2026-07-25
- 一次情報確認: `docs/research/tensor-art-japanese-prompt-verification-2026-07-25.md`
- 対象ツール: Tensor.Art
- 対象項目: `japanesePrompt`
- 修正前: DB `src/content/tools/tensor-art.md`(11) `japanesePrompt: true`（完全対応）／ツールページ`src/pages/tools/tensor-art/index.astro`(98,140)は「△ 一部対応」バッジ表示のまま不一致
- 修正後: DB値を`"partial"`に変更し、ツールページ側の既存表現（一次情報でも裏付けられたニュアンス）に整合。ツールページ側は変更なし。
- DB変更の有無: あり（`true` → `"partial"`）
- 一次情報: 公式一次情報でのプロンプト精度に関する明示記載はなし。複数の利用者・公式投稿ベースの二次情報が「動作はするが英語プロンプトの方が安定」という点で一致したため、この技術的実態を採用
- 同一問題として横展開修正:
  - `src/components/Japanese.astro`(102): `prompt:'○'` → `prompt:'△'`
  - `src/components/JapaneseAiToolsGuide.astro`(138): `jpPrompt:{s:'ok',label:'〇 対応'}` → `{s:'cond',label:'△ 一部対応'}`
- スキーマ変更: なし（triStateSchemaの既存`'partial'` literalで対応）
- 修正ファイル数: 3（DB1・コンポーネント2）
- build検証: 92ページ生成、error 0、warning 0
- commit予定: "Fix Tensor.Art japanesePrompt inconsistency"

## AUD-10 Clipdrop japanesePrompt表記不一致（P2）

- 対応日: 2026-07-25
- 一次情報確認: `docs/research/clipdrop-japanese-prompt-verification-2026-07-25.md`
- 対象ツール: Clipdrop
- 対象項目: `japanesePrompt`
- 修正前: DB `src/content/tools/clipdrop.md`(11) `japanesePrompt: false`（非対応確定）／ツールページ`src/pages/tools/clipdrop/index.astro`(89)は「要公式確認」バッジ（中立表現）のまま不一致
- 修正後: DBは変更なし。一次情報（Clipdrop公式FAQが入力を「English text」と明示）でfalse判定を裏付け確認。ツールページのバッジを「非対応（英語推奨）」に修正し、DBの確定値と整合させた
- DB変更の有無: なし
- 一次情報: `https://clipdrop.co/ja/stable-diffusion`（WebFetchで内容確認、UIは英語のまま・FAQに"English text as an input"の記載あり）、`https://clipdrop.co/apis/docs/text-to-image`（言語制限の明記なし）
- 同一問題として横展開修正:
  - `src/pages/tools/playground-ai/index.astro`(250): relatedTools内Clipdrop行「日本語：要確認」→「日本語：非対応」（DB上japaneseUi/japanesePromptとも`false`のため）
- 修正ファイル: 2（ツールページ2件、DBは変更なし）
- build検証: 下記コミット時点のbuild結果を参照
- commit予定: "Fix Clipdrop japanesePrompt labeling"

## AUD-11 NightCafe japanesePrompt表記不一致（P2）

- 対応日: 2026-07-25
- 一次情報確認: `docs/research/nightcafe-japanese-prompt-verification-2026-07-25.md`
- 対象ツール: NightCafe
- 対象項目: `japanesePrompt`
- 修正前: DB `src/content/tools/nightcafe.md`(11) `japanesePrompt: true`（完全対応）／ツールページ`src/pages/tools/nightcafe/index.astro`(98)は「△ 一部対応」バッジ表示のまま不一致
- 修正後: DB値を`"partial"`に変更し、ツールページ側の既存表現（実機ベースの記述と一致）に整合。ツールページ側は変更なし
- DB変更の有無: あり（`true` → `"partial"`）
- 一次情報: NightCafe公式FAQ（`https://creator.nightcafe.studio/faqs`）を確認したが、プロンプト入力言語（日本語対応・英語推奨・翻訳機能）に関する明示的な記載はなし。複数生成モデル（Stable Diffusion・DALL·E等）を横断的に使うプラットフォーム構造上、モデルにより日本語理解力が異なる可能性がある点を踏まえ、既存の実務的な「一部対応」記述を採用（AUD-09と同型の判断）
- 同一問題として横展開修正:
  - `src/components/Japanese.astro`(94): `prompt:'○'` → `prompt:'△'`
  - `src/components/JapaneseAiToolsGuide.astro`(132): `jpPrompt:{s:'ok',label:'〇 対応'}` → `{s:'cond',label:'△ 一部対応'}`
- スキーマ変更: なし（triStateSchemaの既存`'partial'` literalで対応）
- 修正ファイル数: 3（DB1・コンポーネント2）
- build検証: 下記コミット時点のbuild結果を参照
- commit予定: "Fix NightCafe japanesePrompt inconsistency"
