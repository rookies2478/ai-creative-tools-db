---
name: "Runway"
shortDescription: "AI動画生成・映像編集ツールを提供するサービス。Gen-4など最新モデルと多機能な映像制作環境を統合。"
category: "video"
officialUrl: "https://runwayml.com"
freePlan: "limited"
lowestPaidPlan: "$12/月（Standardプラン・年払い）／$14/月（月払い）"
currency: "USD"
commercialUse: "limited"
commercialUseNote: "公式情報によると、RunwayはすべてのプランでOutputの商用利用を制限していないとされています。ただし、利用するプラン、生成コンテンツの内容、利用規約の変更、第三者の権利、Runwayのポリシーによっては商用利用が制限される可能性があります。無料プランでは透かしやクレジット数など実用上の制約があります。利用前にRunway公式ヘルプおよび利用規約の最新版をご確認ください。"
japaneseUi: false
japanesePrompt: "partial"
watermark: "limited"
bestFor:
  - "AI動画生成・動画編集"
  - "映像コンテンツ制作"
  - "テキスト・画像からの動画生成"
strengths:
  - "動画生成品質が高いとされる"
  - "多機能な映像編集ツールも内包"
  - "Gen-4など最新モデルを継続的に提供"
  - "音声ダビング機能が複数言語に対応しているとされる"
weaknesses:
  - "無料プランはクレジットが少なく、一度限りとされている"
  - "日本語UIなし（英語インターフェース）"
  - "無料プランは透かしあり・クレジット一度限りのため実用に制限がある"
  - "コストが比較的高め"
lastReviewed: "2026-06-05"
nextReviewDue: "2026-06-24"
verifiedAt: "2026-06-08"
officialSourceUrl: "https://runwayml.com/pricing/"
pricingModel: "subscription_credit"
freePlanNote: "125クレジット（初回のみ・更新なし）"
paidPlanNote: "Standard $12/月〜（年払い）。月625クレジット程度。"
platforms:
  - web
  - api
signupRequired: true
features:
  textToVideo: true
  imageToVideo: true
  videoExtend: true
  backgroundRemoval: true
  apiAvailable: true
  textToImage: false
watermarkCondition: "無料プランでは透かしあり。有料プランでは透かしなし"
japaneseDocs: false
useCases:
  - video
  - youtube
  - ad_creative
  - business
limitations:
  - "無料プランのクレジットは一度限りで更新なし"
  - "コストが比較的高め"
notFor:
  - "無料枠だけで継続利用したい人（クレジットは初回のみで更新なし）"
  - "日本語UIが必須の人（英語インターフェースのみです）"
  - "商用案件に公式規約確認なく使いたい人（利用前に公式利用規約の確認が必要です）"
notBestFor:
  - "長尺動画を細かく編集したい人（映像編集ツールとしての機能は限定的）"
  - "毎回同じ人物・構図・動きを完全に再現したい人（AI生成の再現性に限界あり）"
  - "低コストで大量生成したい人（クレジット消費量が多い）"
difficulty: "intermediate"
pricingDecision:
  hasFreePlan: "limited"
  freePlanLimitNote: "125クレジット（初回のみ・更新なし）。透かしあり。継続利用には有料プランが必要。"
  watermarkStatus: "free-only"
  creditSystem: true
  paidPlanRequiredForExport: false
  pricingNote: "Standard $12/月〜（年払い）で月625クレジット程度。クレジット消費量は動画の長さ・解像度によって変動。最新プランは公式サイトで確認推奨。"
usagePolicy:
  commercialUseStatus: "ok"
  commercialUseByPlan:
    free: "商用利用可とされているが、透かしありのため実用上の制約あり"
    paid: "商用利用可とされている（公式ヘルプ）"
    enterprise: "要確認"
  commercialUseNote: "公式ヘルプによると全プランで商用利用を制限していないとされているが、第三者権利・コンテンツ内容・規約変更によって制限される場合あり。"
  rightsStatus: "user-owns"
  rightsNote: "公式情報上、生成コンテンツの所有権はユーザーが保持するとされている。クレジット表記も不要とされているが、最新規約を確認すること。"
  inputMaterialRisk: "medium"
  inputMaterialNote: "アップロードした画像・動画素材の権利関係はユーザーが確認する必要あり。第三者の著作物を含む場合は別途権利確認が必要。"
  peopleLogoRisk: "high"
  peopleLogoNote: "実在の人物・著名人・ブランドロゴ・第三者の著作物を含む生成物は、肖像権・商標権・著作権の観点から別途確認が必要。本記事は法的助言ではない。"
  creditRequiredStatus: "not-required"
  creditRequiredNote: "公式情報上、Runwayへのクレジット表記は不要とされているが、最新規約での確認を推奨。"
  officialSourceUrl: "https://help.runwayml.com/hc/en-us/articles/21668707517587-Can-I-use-the-content-I-made-in-Runway-for-commercial-purposes"
  termsUrl: "https://runwayml.com/terms-of-use/"
  lastReviewed: "2026-06-05"
capabilityFit:
  imageGeneration: false
  videoGeneration: true
  videoEditing: true
  avatarVideo: false
  textToImage: false
  imageToImage: false
  textToVideo: true
  imageToVideo: true
  styleControl: "medium"
  consistencyControl: "low"
conversionGuide:
  primaryCtaLabel: "無料枠・透かし・商用利用条件を公式サイトで確認する"
  primaryCtaReason: "プラン・クレジット・透かし条件は変更される場合がある。実務利用前に最新情報を確認することを推奨。"
  beforeClickChecklist:
    - "無料プランの125クレジットは初回のみで更新なし。継続利用には有料プランが必要か確認したか？"
    - "無料プランでは生成動画に透かしが付く場合がある。用途に支障がないか確認したか？"
    - "商用案件に使う場合、公式利用規約・利用権ヘルプを最新版で確認したか？"
    - "生成に使う素材（画像・動画）に第三者の権利が含まれていないか確認したか？"
    - "人物・著名人・ブランドロゴを含む生成物を使用する場合、権利関係を別途確認したか？"
reviewed:
  pricing: "2026-05-05"
  terms: "2026-05-05"
  features: "2026-05-05"
sourceRefs:
  - label: "Runway料金プラン（公式）"
    url: "https://runwayml.com/pricing/"
    type: pricing
  - label: "Runway利用規約（公式）"
    url: "https://runwayml.com/terms-of-use/"
    type: terms
  - label: "Runway利用権（使用権）について（公式ヘルプ）"
    url: "https://help.runwayml.com/hc/en-us/articles/18927776141715-Usage-rights"
    type: commercial
  - label: "Runway：商用利用について（公式ヘルプ）"
    url: "https://help.runwayml.com/hc/en-us/articles/21668707517587-Can-I-use-the-content-I-made-in-Runway-for-commercial-purposes"
    type: commercial
  - label: "Runway無料プラン詳細（公式ヘルプ）"
    url: "https://help.runwayml.com/hc/en-us/articles/50404627334547-Free-plan-details"
    type: help
  - label: "Runway公式サイト"
    url: "https://runwayml.com"
    type: official
sources:
  - title: "Runway 料金プラン（公式）"
    url: "https://runwayml.com/pricing/"
  - title: "Runway 利用規約（公式）"
    url: "https://runwayml.com/terms-of-use/"
  - title: "Runway ヘルプ：プロンプト言語対応（公式）"
    url: "https://help.runwayml.com/hc/en-us/articles/24342920074131-What-languages-can-I-prompt-in"
  - title: "Runway 利用権（使用権）について（公式ヘルプ）"
    url: "https://help.runwayml.com/hc/en-us/articles/18927776141715-Usage-rights"
  - title: "Runway：商用利用について（公式ヘルプ）"
    url: "https://help.runwayml.com/hc/en-us/articles/21668707517587-Can-I-use-the-content-I-made-in-Runway-for-commercial-purposes"
  - title: "Runway 無料プラン詳細（公式ヘルプ）"
    url: "https://help.runwayml.com/hc/en-us/articles/50404627334547-Free-plan-details"
  - title: "Runway 公式サイト"
    url: "https://runwayml.com"
faqs:
  - question: "無料で使えますか？"
    answer: "無料プランでは125クレジットが付与されますが、初回のみで更新はないとされています。生成回数・解像度・透かしの条件など詳細は変更される可能性があるため、公式サイトでご確認ください。長期的な利用や商用利用には有料プランへのアップグレードが必要です。"
  - question: "商用利用できますか？"
    answer: "公式ヘルプによると、すべてのプランでOutputの商用利用を制限していないとされています。ただし生成コンテンツの内容や第三者の権利によって制限される場合があります。商用利用条件はプランや用途によって異なる場合があるため、利用前に最新の公式利用規約をご確認ください。このページは法的助言ではありません。"
  - question: "どんな用途に向いていますか？"
    answer: "SNS動画・広告動画の試作、画像素材から短い動画を生成する用途、映像表現のアイデア検証などに向いています。テキストから動画、画像から動画、動画編集補助の3つの使い方があります。ただし用途によって確認すべき条件が異なります。"
  - question: "RunwayとPikaはどちらを選ぶべきですか？"
    answer: "本格的な映像表現や多機能な編集ツールを求める場合はRunwayが候補になります。手軽に短い動画生成を試したい場合はPikaも選択肢になります。料金・無料枠・機能の詳細は[RunwayとPikaの比較ページ](/comparisons/runway-vs-pika/)をご確認ください。"
  - question: "日本語で使えますか？"
    answer: "UIは英語のみです。音声ダビング機能では日本語を含む複数言語に対応しているとされています。"
  - question: "透かしは入りますか？"
    answer: "無料プランでは透かしが付与される場合があります。有料プランでは透かしが入らない場合があるとされています。最新の条件は公式サイトでご確認ください。"
  - question: "料金プランはどうなっていますか？"
    answer: "確認時点では、無料プラン（125クレジット・初回のみ）とStandard $12/月〜（年払い・月625クレジット程度）などが案内されています。プラン名・料金・クレジット条件は変更される可能性があるため、最新情報は[Runway公式料金ページ](https://runwayml.com/pricing/)をご確認ください。"
  - question: "Runwayは無料で使えますか？"
    answer: "無料プランでは125クレジットが付与されますが、初回のみで更新はないとされています。継続して利用するには有料プランへのアップグレードが必要です。無料プランでは透かしが付与される場合があります。最新の条件は公式サイトでご確認ください。"
  - question: "Runwayの料金プランはどのように違いますか？"
    answer: "確認時点では、無料プラン（125クレジット・初回のみ）・Standard $12/月〜（年払い、月625クレジット程度）などが案内されています。プランごとのクレジット数・料金・機能の差は変更される可能性があるため、最新情報は[Runway公式料金ページ](https://runwayml.com/pricing/)でご確認ください。"
  - question: "Runwayで生成した動画は商用利用できますか？"
    answer: "公式ヘルプによると、すべてのプランでOutputの商用利用を制限していないとされています。ただし生成コンテンツの内容、第三者の権利、規約変更によって制限される場合があります。無料プランでは透かしがあるため実務利用には有料プランが現実的です。利用前に最新の公式利用規約をご確認ください。このページは法的助言ではありません。"
  - question: "Runwayは日本語で使えますか？"
    answer: "UIは英語のみです。音声ダビング機能では日本語を含む複数言語に対応しているとされています。動画生成時の日本語プロンプトは受け付ける場合がありますが、精度については公式情報での明確な記載は確認できていません。最新の対応状況は公式サイトでご確認ください。"
  - question: "Runway Gen-3 / Gen-4の料金はどこで確認できますか？"
    answer: "Gen-3・Gen-4などのモデルごとのクレジット消費レートや料金詳細は、Runway公式料金ページおよびヘルプセンターで案内されています。モデルや生成設定によってクレジット消費量が異なるため、最新情報は[Runway公式料金ページ](https://runwayml.com/pricing/)でご確認ください。"
  - question: "どの環境で使えますか？"
    answer: "Webブラウザから利用できます。API経由での利用も可能です。"
---

## Runwayとは

RunwayはAI動画生成・映像編集ツールを提供するサービス。テキストや画像から動画を生成する機能のほか、背景除去・動画編集など映像制作向けの多機能なツールが統合されています。

## 主な生成方式と用途

Runwayは主に3つの使い方があります。

**テキストから動画生成（Text to Video）**
テキストプロンプトで動画を生成します。SNS向けの短尺映像、広告動画の試作、映像アイデアの素早い検証などに向いています。

**画像から動画生成（Image to Video）**
静止画素材をベースに動きのある動画を生成します。撮影済みの素材や生成した画像に動きを加えたい場合に利用されます。

**動画編集補助（映像ツール群）**
背景除去、動画の延長、音声ダビングなど映像編集向けのツールが含まれています。既存の映像素材を加工・強化する用途にも対応しています。

## 向いている人・向いていない人

**向いている人**
- AI動画生成を本格的に試したい人
- SNS動画や広告動画の試作をしたい人
- 画像素材から短い動画を作りたい人
- 映像表現のアイデアを複数パターン比較したい人

**向いていない人**
- 長尺動画を細かく編集したい人
- 毎回同じ人物・構図・動きを完全に再現したい人
- 公式条件を確認せずに商用案件へ使いたい人
- 無料枠だけで高解像度・透かしなし出力を前提にしたい人

## 生成時間・クレジット・解像度について

- 生成にはクレジットを消費します。消費量は動画の長さや解像度によって異なります
- 生成時間は数十秒〜数分程度になる場合があります
- 出力解像度はプランや設定によって異なります
- クレジット数・消費レート・料金は変更される可能性があります。最新情報はRunway公式サイトでご確認ください

## 料金プラン

| プラン | 料金 | クレジット |
|---|---|---|
| 無料 | 無料 | 125クレジット（初回のみ、更新なし） |
| Standard | $12/月〜（年払い） | 月625クレジット程度 |

- クレジット数・料金はプランや時期により変更される可能性があります
- 無料プランのクレジットは一度限りとされています
- **最新のプラン内容はRunway公式料金ページをご確認ください**

## 商用利用について

公式ヘルプによると、RunwayはすべてのプランでOutputの商用利用を制限していないとされています。ユーザーは生成コンテンツの所有権を保持し、Runwayへのクレジット表記も不要とされています。

- **全プラン（無料含む）：** 商用利用に制限を設けていないとされています
- **制限される可能性がある場合：** 利用するプランの条件、生成コンテンツの内容、利用規約の変更、第三者の権利（著作権・肖像権等）、またはRunwayのポリシー変更によって商用利用が制限される場合があります
- **人物・ブランド・第三者素材を使う場合：** 人物の肖像権、著名人・キャラクター・ブランドロゴ・第三者の著作物を含む生成物は、Runwayの規約とは別に第三者の権利が関係する場合があります。用途や対象を問わず、個別に確認が必要です
- **無料プランの実用上の制約：** 生成動画に透かしが付与されるため、実際の商用利用には有料プランへのアップグレードが現実的です
- 条件・規約は変更される可能性があります

> **免責事項：** このページは情報提供を目的としており、法的助言ではありません。商用利用前は必ず[Runway利用規約](https://runwayml.com/terms-of-use/)および[Runway利用権ヘルプ](https://help.runwayml.com/hc/en-us/articles/18927776141715-Usage-rights)の最新版をご確認ください。

## 日本語対応

- **日本語UI：** 非対応（英語インターフェースのみ）
- **日本語プロンプト：** 一部対応。音声ダビング機能では日本語を含む複数言語に対応しているとされています。動画生成時の日本語プロンプトは受け付ける場合がありますが、精度については公式情報での明確な記載は確認できていません

## 透かし（ウォーターマーク）

公式情報上、無料プランでは生成動画に透かしが付与される場合があるとされています。有料プランでは透かしが入らない場合があるとされていますが、最新の条件はRunway公式サイトでご確認ください。

## 実務利用前に確認したいポイント

- [ ] 利用するプランと商用利用条件（無料プランは透かしあり・初回125クレジット限り）
- [ ] 透かしの有無とプランごとの条件
- [ ] 生成物の利用範囲（掲載媒体・収益化・クライアントワークの可否）
- [ ] 人物・著名人・ブランドロゴ・第三者素材を使う場合の権利関係
- [ ] クレジット消費レートと生成コスト（動画の長さ・解像度によって変動）
- [ ] Runway公式利用規約・利用権ヘルプの最新版

詳しくは[商用利用・著作権の考え方ガイド](/guides/commercial-use-copyright/)もご参照ください。

## このツールを選びやすいケース

- 映像クオリティ（解像度・動きの品質）を重視してAI動画生成ツールを選びたい場合
- テキストから動画・画像から動画・動画延長の3機能をまとめて試したい場合
- SNS向けの短尺映像や広告動画のアイデア検証・試作をしたい場合
- 背景除去・音声ダビングなど映像編集補助も合わせて1ツールで使いたい場合
- 本格的な映像制作の下準備（コンセプト検証・プリビズ等）に使いたい場合

## 他ツールも比較したいケース

- **コストを抑えて手軽に試したい場合** → [Pika](/tools/pika/)・[Kling AI](/tools/kling-ai/) も無料枠があり比較候補になります（各ツールの条件は公式サイトで確認）
- **日本語UIで操作したい場合** → RunwayはUIが英語のみのため、日本語対応を重視する場合は他ツールを確認してください
- **リアル系の動きを別視点で比較したい場合** → [Kling AI](/tools/kling-ai/)・[Luma AI](/tools/luma-ai/) と並べて比較するとよいでしょう。[RunwayとKling AIの詳細比較](/comparisons/runway-vs-kling-ai/)もご参照ください
- **短尺動画をシンプルに試したい場合** → [Pika](/tools/pika/) のUIはより操作が簡潔とされる場合があります
- **動画生成ツール全体を横断比較したい場合** → [AI動画生成ツール一覧](/categories/video-generation/) をご参照ください

## 関連ページ

- [AI動画生成ツール一覧](/categories/video-generation/) — 主要AI動画生成ツールの比較・選び方
- [YouTube向けAI動画生成の活用](/use-cases/youtube/) — YouTube動画にAI生成を活用する際の確認ポイント
- [AI動画生成の用途別選び方](/use-cases/) — 用途に合わせたAIツールの確認ポイント
- [RunwayとPikaを比較](/comparisons/runway-vs-pika/) — 料金・無料枠・商用利用・用途別の選び方を比較
- [AI動画生成ツール比較](/comparisons/ai-image-video-tools/) — AI画像・動画生成ツールの横断比較
- [透かしなしAI動画ツール](/conditions/no-watermark/) — 透かしの有無・条件をまとめた一覧
- [商用利用できるAI動画ツール](/conditions/commercial-use/) — 商用利用条件を確認できるツール一覧

