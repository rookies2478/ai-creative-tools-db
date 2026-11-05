---
name: "Luma AI"
shortDescription: "Luma AppとRay3.2を中心に、テキスト・画像から動画生成、動画編集・リフレーム、API連携まで対応するAIクリエイティブ基盤。"
category: "video"
officialUrl: "https://lumalabs.ai/"
freePlan: false
lowestPaidPlan: "Plus（現行金額は公式サイトで要確認）"
currency: "USD"
commercialUse: "limited"
commercialUseNote: "現行の公式API FAQではAPI出力の商用利用が認められ、API出力には透かしが付かないと案内されています。一方、Luma Appの現行プラン別の商用利用・透かし条件は公開情報だけでは十分に確認できません。Trialは公式利用規約上、内部評価・テスト目的に限定されています。AppとAPIを混同せず、商用利用前に最新の公式利用規約・契約画面をご確認ください。本記事は法的助言ではありません。"
japaneseUi: false
japanesePrompt: true
watermark: "limited"
bestFor:
  - "AI動画生成"
  - "画像から動画生成"
  - "SNS動画"
  - "広告動画"
  - "ショート動画"
  - "映像アイデア出し"
  - "商品・ブランド動画案"
  - "クリエイター向け映像制作"
strengths:
  - "現行動画モデルRay3.2でテキスト・画像から動画生成に対応"
  - "動画編集・リフレーム・複数キーフレームなどの制作機能に対応"
  - "HDR・16-bit EXRなど高品質ワークフロー向け機能を案内"
  - "Luma Appと開発者向けAPIの両方を提供"
  - "API出力は公式FAQで商用利用可・透かしなしと案内"
weaknesses:
  - "恒常的な無料プランは現行公式プラン構成で確認できず、free trial creditsの案内に留まる"
  - "Luma Appの現行プラン金額を公開公式面から安全に確認できない"
  - "Luma Appの商用利用・透かし条件は現行契約条件の確認が必要"
  - "日本語UI・日本語プロンプトの公式対応範囲は明確に確認できていない"
  - "AppとAPIで料金・無料枠・権利条件が異なるため混同に注意"
lastReviewed: "2026-11-05"
nextReviewDue: "2027-02-05"
verifiedAt: "2026-11-05"
officialSourceUrl: "https://lumalabs.ai/llm-info"
pricingModel: "subscription_credit"
pricingStatus: "partial"
freePlanNote: "現行公式情報ではPlus / Pro / Ultra / Enterpriseのプラン構成とfree trial creditsが案内されていますが、恒常的なFreeプランは確認できません。開発者向けAPIには無料枠がなく、最初の生成から従量課金と案内されています。"
paidPlanNote: "現行公式情報では個人向けにPlus / Pro / Ultra、法人向けにEnterpriseが案内されています。年払いは最大20%節約とされていますが、現行の具体的な月額金額は公開公式面から安全に確認できないため断定しません。Luma Appは月次クレジット制、APIは従量課金で別体系です。"
platforms:
  - web
  - api
signupRequired: true
features:
  textToVideo: true
  imageToVideo: true
  videoExtend: true
  maxVideoDuration: "Ray3.2の新規生成は5秒または10秒。Modify Video V2は最大20秒・1080pに対応"
  upscale: true
  apiAvailable: true
  textToImage: false
watermarkCondition: "公式API FAQではAPI出力に透かしなしと案内されています。Luma Appの現行プラン別透かし条件は公開公式情報だけでは十分に確認できないため、契約画面で要確認です。"
japaneseDocs: false
useCases:
  - video
  - sns
  - ad_creative
  - product_image
  - business
limitations:
  - "Luma Appの恒常無料プラン・現行金額・プラン別商用利用条件は契約画面で要確認"
  - "APIは無料枠なしの従量課金で、Luma Appのサブスクリプションとは別体系"
  - "Trial出力は公式規約上、内部評価・テスト目的に限定"
  - "動画生成・編集はモデル・解像度・長さに応じてクレジット消費が異なる"
notFor:
  - "恒常的な無料プランだけで継続利用したい人"
  - "AppとAPIの料金・権利条件を確認せず商用案件へ使いたい人"
  - "長尺動画編集を単一生成で完結したい人"
notBestFor:
  - "現行価格を事前に固定金額で把握したい人（公式契約画面で要確認）"
  - "日本語UIが必須の人（現行公式情報で対応範囲を明確に確認できていない）"
  - "無料API枠を必要とする開発者（APIは無料枠なし）"
difficulty: "beginner"
pricingDecision:
  hasFreePlan: "no"
  freePlanLimitNote: "恒常的なFreeプランは現行公式構成で確認できず、free trial creditsの案内のみ。APIには無料枠なし。"
  watermarkStatus: "unknown"
  creditSystem: true
  paidPlanRequiredForExport: false
  pricingNote: "Luma AppはPlus / Pro / Ultra / Enterpriseの現行プラン構成。具体的な現行金額は公開公式面から安全に確認できず、pricingStatus=partial。APIは別体系の従量課金。"
usagePolicy:
  commercialUseStatus: "limited"
  commercialUseByPlan:
    free: "恒常無料プランは現行公式構成で確認できない。Trial出力は内部評価・テスト目的に限定。"
    paid: "Luma Appの現行プラン別商用利用条件は最新規約・契約画面で要確認。API出力は公式FAQで商用利用可と案内。"
    enterprise: "契約条件を個別確認"
  commercialUseNote: "AppとAPIを混同しないこと。API出力は公式FAQで商用利用可・透かしなし。Trialは内部評価・テスト目的に限定。Luma Appの現行プラン別権利条件は最新規約と契約画面で確認する。"
  rightsStatus: "unknown"
  rightsNote: "生成物の権利・利用範囲は利用経路（Luma App / API / Trial）と最新規約・契約条件で確認が必要。"
  inputMaterialRisk: "medium"
  inputMaterialNote: "アップロードする画像・動画素材の権利関係はユーザーが確認する必要あり。"
  peopleLogoRisk: "high"
  peopleLogoNote: "実在の人物・著名人・ブランドロゴを含む動画は肖像権・商標権等の観点から別途確認が必要。本記事は法的助言ではない。"
  creditRequiredStatus: "unknown"
  creditRequiredNote: "クレジット消費量はモデル・処理ごとに異なる。最新の公式App/API情報を確認すること。"
  officialSourceUrl: "https://lumalabs.ai/llm-info"
  termsUrl: "https://lumalabs.ai/legal/terms-of-service"
  lastReviewed: "2026-11-05"
capabilityFit:
  imageGeneration: false
  videoGeneration: true
  videoEditing: false
  avatarVideo: false
  textToImage: false
  imageToImage: false
  textToVideo: true
  imageToVideo: true
  styleControl: "medium"
  consistencyControl: "low"
conversionGuide:
  primaryCtaLabel: "現行プラン・Ray3.2・利用条件を公式サイトで確認する"
  primaryCtaReason: "Luma AppとAPIで料金・無料枠・商用利用条件が異なるため、利用経路を決めたうえで最新条件を確認する。"
  beforeClickChecklist:
    - "Luma AppとAPIのどちらを使うか整理したか？"
    - "Luma Appの現行プラン金額・クレジット条件を公式画面で確認したか？"
    - "Trial出力の用途制限と、商用案件で適用される最新規約を確認したか？"
    - "生成に使う素材（画像・動画）に第三者の権利が含まれていないか確認したか？"
    - "人物・著名人・ブランドロゴを含む動画を使用する場合、権利関係を別途確認したか？"
reviewed:
  pricing: "2026-11-05"
  terms: "2026-11-05"
  features: "2026-11-05"
sourceRefs:
  - label: "Luma AI 公式情報（LLM Info）"
    url: "https://lumalabs.ai/llm-info"
    type: official
  - label: "Luma AI 料金・プラン（公式）"
    url: "https://lumalabs.ai/pricing"
    type: pricing
  - label: "Ray3.2 モデル仕様（公式）"
    url: "https://docs.agents.lumalabs.ai/guides/model/"
    type: official
  - label: "Luma API FAQ（公式）"
    url: "https://docs.agents.lumalabs.ai/guides/faq/"
    type: help
  - label: "Luma AI 利用規約（公式）"
    url: "https://lumalabs.ai/legal/terms-of-service"
    type: terms
  - label: "Luma AI Billing Policy（公式）"
    url: "https://lumalabs.ai/legal/billing-policy"
    type: policy
sources:
  - title: "Luma AI 公式情報（LLM Info）"
    url: "https://lumalabs.ai/llm-info"
  - title: "Luma AI 料金・プラン（公式）"
    url: "https://lumalabs.ai/pricing"
  - title: "Ray3.2 モデル仕様（公式）"
    url: "https://docs.agents.lumalabs.ai/guides/model/"
  - title: "Luma API FAQ（公式）"
    url: "https://docs.agents.lumalabs.ai/guides/faq/"
  - title: "Luma AI 利用規約（公式）"
    url: "https://lumalabs.ai/legal/terms-of-service"
  - title: "Luma AI Billing Policy（公式）"
    url: "https://lumalabs.ai/legal/billing-policy"
faqs:
  - question: "無料で使えますか？"
    answer: "現行公式情報では恒常的なFreeプランは確認できず、各プランにfree trial creditsが案内されています。開発者向けAPIには無料枠がなく、最初の生成から従量課金です。"
  - question: "商用利用できますか？"
    answer: "Luma APIの公式FAQではAPI出力の商用利用が認められています。一方、Luma Appの現行プラン別条件は最新の利用規約・契約画面で確認が必要です。Trial出力は内部評価・テスト目的に限定されています。本記事は法的助言ではありません。"
  - question: "現在の動画モデルは何ですか？"
    answer: "現行の公式情報ではRay3.2が現在の動画モデルです。旧Dream MachineやRay2を現行モデルとして扱わないよう公式情報で明記されています。"
  - question: "動画の長さはどのくらいですか？"
    answer: "Ray3.2の新規動画生成は5秒または10秒が公式仕様です。Modify Video V2では最大20秒・1080pの編集に対応します。処理によって上限が異なるため、最新仕様を公式ドキュメントで確認してください。"
  - question: "料金プランはどうなっていますか？"
    answer: "現行公式情報では個人向けPlus・Pro・Ultra、法人向けEnterpriseが案内されています。具体的な現行金額は公開公式面から安全に確認できないため、本サイトでは断定していません。"
  - question: "APIは使えますか？"
    answer: "利用できます。Luma APIはLuma Appのサブスクリプションとは別の従量課金体系で、公式FAQでは無料枠なしと案内されています。"
  - question: "透かしは入りますか？"
    answer: "公式API FAQではAPI出力に透かしなしと案内されています。Luma Appの現行プラン別透かし条件は最新の契約画面で確認してください。"
  - question: "日本語で使えますか？"
    answer: "現行公式情報だけでは日本語UI・日本語プロンプトの正式対応範囲を明確に確認できていません。利用前にLuma Appの最新UIで確認してください。"
  - question: "Luma AIはどんな用途に向いていますか？"
    answer: "Ray3.2による短尺動画生成、画像から動画、動画編集・リフレーム、複数キーフレームを使った制作、HDR/EXRを含む高品質ワークフロー、API連携などに向いています。"
japanBilling:
  providerName: "Luma AI, Inc."
  providerCountry: "米国"
  isJapaneseService: false
  pricingUrl: "https://lumalabs.ai/pricing"
  billingCurrency: "USD（Web）／iOSアプリはApp Store課金"
  jpyDirectBilling: "channel-dependent"
  localizedJpyDisplay: false
  taxDisplay: "unknown"
  purchaseChannels: ["web", "appstore"]
  pricingCheckedAt: "2026-11-05"
  pricingNote: "現行公式情報ではLuma AppにPlus / Pro / Ultra / Enterpriseのプランとfree trial creditsが案内されています。具体的な現行金額・日本円請求条件は公開公式面から安全に確認できないため、契約画面で確認してください。APIはAppとは別の従量課金です。"
  billingCategory: "D"
  sourceUrls:
    - "https://lumalabs.ai/pricing"
    - "https://lumalabs.ai/legal/billing-policy"
---


## Luma AIとは

Luma AIは、クリエイター向けの**Luma App**と開発者向けの**Luma API**を提供するAIクリエイティブ基盤です。現行の公式情報では、動画モデルは**Ray3.2**です。公式のLLM向け情報では、旧Dream MachineやRay2を現行モデルとして混同しないよう明記されています。

Ray3.2では、テキスト・画像からの動画生成に加え、動画編集、リフレーム、複数キーフレーム、HDR・16-bit EXRなどの高品質ワークフロー向け機能が案内されています。Luma AppとAPIは料金体系・無料枠・利用条件が異なるため、用途に応じて分けて確認することが重要です。

> **注意：** 本記事は情報提供を目的としており、法的助言ではありません。料金・商用利用・Trial・APIの条件は、必ず[Luma AI公式情報](https://lumalabs.ai/llm-info)と[公式利用規約](https://lumalabs.ai/legal/terms-of-service)の最新版をご確認ください。

## 主な機能

- **Ray3.2 動画生成：** テキストまたは画像から5秒・10秒の動画を生成
- **Modify Video V2：** 最大20秒・1080pの動画編集に対応
- **リフレーム：** 既存動画の構図・アスペクト調整
- **複数キーフレーム：** 開始・中間・終了など複数の視覚条件を使った生成
- **高品質出力：** HDR・16-bit EXRなどの制作ワークフロー向け機能
- **API：** Luma Appとは別の従量課金で開発者向けに提供

各機能の解像度・長さ・対応モデルは処理ごとに異なります。最新仕様は[Ray3.2公式モデルガイド](https://docs.agents.lumalabs.ai/guides/model/)でご確認ください。

## 向いている用途

- SNS・ショート動画のアイデア検証
- 広告・ブランド動画のプロトタイプ制作
- 商品紹介動画の案出し
- クリエイター向けの映像制作・実験
- 画像素材を動かしたいケース（image-to-video）

用途やプランによって条件が異なる可能性があります。商用利用・広告利用・クライアントワークを前提にする場合は、最新の公式規約をご確認ください。

## 料金・トライアル・クレジットに関する注意点

現行の公式情報では、Luma Appの個人向けプランとして**Plus / Pro / Ultra**、法人向けに**Enterprise**が案内されています。各プランにはfree trial creditsの案内がありますが、従来の記事にあった恒常的なFreeプランや固定の$30 / $90 / $300という金額は、現行の公開公式面から安全に確認できないため削除しました。

- **Luma App：** サブスクリプションごとに月次クレジットが付与される仕組み。未使用クレジットは請求サイクル終了時に失効すると公式Billing Policyで案内されています
- **Free trial credits：** 現行プランに試用クレジットの案内があります。恒常的な無料プランとは区別してください
- **Luma API：** Appとは別体系で、公式FAQでは無料枠なし・最初の生成から従量課金と案内されています
- **年払い：** 現行公式情報では年払いで最大20%節約との案内があります
- **具体的な現行金額：** 契約画面・公式料金ページで確認してください。本サイトでは未確認金額を推測しません

### クレジット・生成時間に関する注意

Luma Appの公式Billing Policyでは、失敗した生成に対するクレジットは返却されると案内されています。APIは別の課金体系のため、Appのクレジット挙動をそのままAPIに当てはめないでください。動画の長さ・解像度・処理内容によって必要クレジットや料金が変わるため、実行前に各公式画面で確認してください。

## 商用利用・著作権・利用規約に関する注意点

現行の公式情報では、**Luma APIの出力は商用利用でき、API出力には透かしが付かない**と案内されています。一方で、Luma Appの現行プラン別の商用利用・透かし条件を、旧Dream Machineのプラン表から引き継いで断定することはできません。

また、現行利用規約では**Trialは内部評価・テスト目的**として扱われ、Trial出力の利用もその範囲に限定されています。商用案件では、Trial・Luma App・APIのどの経路で生成したかを確認したうえで、最新の規約・契約条件を確認してください。

> **免責事項：** 本記事は法的助言ではありません。商用利用・広告利用・クライアントワークを前提にする場合は、[Luma AI利用規約](https://lumalabs.ai/legal/terms-of-service)と契約画面の最新版をご確認ください。

### 人物・ブランドロゴ・第三者素材を扱う場合

著名人・実在人物・第三者のブランドロゴ・著作物を含む素材をプロンプトや入力画像に使用する際は、**肖像権・著作権・商標権などの観点から別途確認が必要**です。技術的に生成できても、権利上の問題が発生する場合があります。詳しくは[商用利用・著作権の基本的な考え方](/guides/commercial-use-copyright/)もあわせてご確認ください。本記事は法的助言ではありません。

## 日本語対応に関する確認メモ

現行の公式情報だけでは、Luma Appの日本語UI・日本語プロンプトの正式な対応範囲を明確に確認できていません。日本語入力が技術的に可能な場合でも、公式のサポート対象として断定せず、実際のLuma Appで確認してください。

## 透かしに関する確認メモ

- **Luma API：** 公式FAQで出力に透かしなしと案内
- **Luma App：** 現行プラン別の透かし条件は公開公式情報だけでは十分に確認できないため、契約画面で確認
- **Trial：** 商用利用可否とは別に、利用規約上のTrial用途制限を確認

旧Dream MachineのFree / Web Plus表を現行Luma Appの条件として流用しないよう注意してください。

## どんな人に向いているか

- **向いている人：**
  - AI動画生成を手軽に試したいクリエイター
  - 画像素材から短い動画を作りたい人（image-to-video）
  - SNSや広告向けの動画案を試作したい人
  - Runway・Pika・Kling AI以外の動画生成候補も比較したい人
  - SNS・ショート動画のアイデアを素早く検証したい人

- **向いていない人：**
  - 長尺動画編集まで1ツールで完結したい人（→ 動画編集機能は限定的）
  - 毎回同じ人物・構図・動きを完全に再現したい人（→ AI生成の性質上、毎回同一の出力は保証されない）
  - App / API / Trialの利用条件を確認せずに商用案件へ使いたい人
  - 恒常無料プランや無料API枠を前提に大量生成したい人
  - 日本語UIを必須とする人（→ 公式情報で明確に確認できていない）

## 実務利用前に確認したいポイント

- [ ] 利用経路（Luma App / API / Trial）と適用される商用利用条件
- [ ] 透かしの有無（APIは透かしなし、Appは現行契約画面で確認）
- [ ] 生成物の利用範囲（掲載媒体・収益化・クライアントワークの可否）
- [ ] 人物・著名人・ブランドロゴ・第三者素材を使う場合の権利関係
- [ ] クレジット消費レートと生成コスト（動画の長さ・解像度によって変動）
- [ ] Luma AI公式利用規約の最新版

詳しくは[商用利用・著作権の考え方ガイド](/guides/commercial-use-copyright/)もご参照ください。

## このツールを選びやすいケース

- 自然な動きやカメラワーク表現を重視してAI動画生成ツールを選びたい場合
- テキストから動画・画像から動画・動画延長をまとめて試したい場合
- SNS・広告向けの動画プロトタイプを素早く作りたい場合
- Runway・Pika・Kling AI以外の動画生成候補も幅広く比較したい場合
- Luma AppとAPIを使い分けながら商用制作・開発連携を検討している場合

## 他ツールも比較したいケース

- **商用利用条件を明確にしたい場合** → App / API / Trialで条件が異なるため、利用経路ごとの最新規約を確認してください
- **映像編集補助機能も欲しい場合** → [Runway](/tools/runway/) は編集ツール群も内包しています
- **日本語UIを優先したい場合** → 現行公式情報で日本語UIの対応範囲を明確に確認できていないため、実際のAppで確認するか他ツールも比較してください
- **コストを抑えて短尺動画を手軽に試したい場合** → [Pika](/tools/pika/) も比較候補になります
- **リアル系の動きを比較したい場合** → [Kling AI](/tools/kling-ai/) も並べて確認するとよいでしょう。詳しくは[AI動画生成ツール一覧](/categories/video-generation/)もご参照ください
- **動画生成ツール全体を横断比較したい場合** → [AI動画生成ツール一覧](/categories/video-generation/) をご参照ください

## 関連ページ

- [AI動画生成ツール一覧](/categories/video-generation/) — 主要AI動画生成ツールの比較・選び方
- [AI動画編集ツール一覧](/categories/video-editing/) — AI動画編集ツールの比較・選び方
- [YouTube向けAI動画生成の活用](/use-cases/youtube/) — YouTube動画にAI生成を活用する際の確認ポイント
- [ショート動画向けAI動画生成](/use-cases/shorts/) — ショート動画用途での選び方・注意点
- [AI動画生成ツール比較](/comparisons/ai-image-video-tools/) — AI画像・動画生成ツールの横断比較
- [透かしなしAI動画ツール](/conditions/no-watermark/) — 透かしの有無・条件をまとめた一覧
- [商用利用できるAI動画ツール](/conditions/commercial-use/) — 商用利用条件を確認できるツール一覧
