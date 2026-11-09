---
name: "Pika"
shortDescription: "テキストや画像から短尺AI動画を生成するサービス。新Freeは月額クレジット付与0（追加パック購入可）と案内されています。"
category: "video"
officialUrl: "https://pika.art"
freePlan: "limited"
lowestPaidPlan: "$8/月（年払い）"
currency: "USD"
commercialUse: "limited"
commercialUseNote: "2026-11-07にPika公式新料金比較を確認。Freeは商用ライセンスなし、Creator/Fancyはライセンスあり。Starterは料金比較と公式サポートの説明が相違するため要個別確認。旧Basicが商用可とする旧表示もあり、契約時の最新版を確認。"
japaneseUi: "partial"
japanesePrompt: "partial"
watermark: "no"
bestFor:
  - "短尺AI動画の手軽な生成"
  - "画像からの動画生成"
  - "言語設定で一部日本語表示が可能な動画生成"
strengths:
  - "UIは英語ベースですが、一部で翻訳表示に対応している場合があります"
  - "Freeプランは利用可能ですが、新比較表では月額クレジット付与0（追加パック購入可）"
  - "操作が比較的シンプルとされる"
weaknesses:
  - "Freeは新料金比較で可視透かしなしダウンロード。ただし商用ライセンスなし"
  - "旧Basicでは無料商用可との表示が残るが、新Freeでは商用ライセンスなし。Starterも公式間の相違がある"
  - "日本語プロンプトでの動画生成の対応状況は不明確"
  - "生成動画の長さ・解像度に制限がある場合がある"
lastReviewed: "2026-11-07"
nextReviewDue: "2026-11-14"
verifiedAt: "2026-11-07"
officialSourceUrl: "https://pika.art/pricing"
pricingModel: "subscription_credit"
pricingStatus: "confirmed"
freePlanNote: "2026-11-07の新Pika料金比較はFree月額クレジット付与0（追加パック購入可）、無透かしDL、商用ライセンスなし。旧Basic（月80cr・商用可）表示は過去の別バージョン。現行アカウントへの適用条件は要確認。"
paidPlanNote: "公式新料金比較では公式料金ページ（2026-11-09、ブラウザ描画・月払い表示・USD）：Starter $10/月で600cr/月、Creator $35/月で2,600cr/月、Fancy $95/月で8,550cr/月。Starter・Creator・Fancyは商用ライセンスあり、Freeは透かしなし・商用ライセンスなし。年払い表示（$8/$28/$76相当）に切り替えてもクレジット数は600/2,600で変わらないことを確認（2026-11-10）。2026-11-07の旧記載（Starter 900cr・Creator 3,150cr、Starterの商用可否が矛盾）は現行ページと一致しないため置換。プラン名・金額・税・最終請求は契約画面で再確認。"
platforms:
  - web
signupRequired: true
features:
  textToVideo: true
  imageToVideo: true
  videoExtend: true
  textToImage: false
  maxVideoDuration: "通常のText-to-Video / Image-to-Videoでは5秒・10秒から選択（2026-07-24公式料金ページ確認）。Pikaframes（複数画像間を補間するフレーム補間機能）を使うと5秒〜最大25秒まで対応（公式料金ページに5s/10s/10-15s/15-20s/20-25sの区分が明記）。通常生成とPikaframesは別区分の仕様のため混同しないでください。解像度・対応プランはモデルバージョンにより異なる場合があります。最新情報は公式サイトをご確認ください。"
watermarkCondition: "2026-11-07のPika新料金比較ではFreeを含め全プランがNo watermarkと案内。過去作成コンテンツやモデル固有の扱いは別途公式確認。無透かしと商用許諾は別。"
japaneseDocs: false
useCases:
  - video
  - youtube
  - sns
limitations:
  - "新Freeは無透かしDLでも商用ライセンスなしと料金比較に明記"
  - "有料プランでも商用利用条件はプランごとに異なる可能性があり、最新の公式利用規約・料金ページの確認が必要"
  - "生成動画の長さ・解像度に制限がある場合あり（プランによって異なる）"
  - "入力素材・生成コンテンツの権利関係は公式規約を要確認"
  - "Pika公式サポートと料金比較でStarterの商用許諾に説明差あり。契約前に最新の公式情報を確認"
notFor:
  - "第三者の権利許諾を確認せず商用案件に使用したい人"
  - "モデル固有の識別メタデータまで一切ないことを保証したい人"
  - "長尺・高解像度の動画を無料で出力したい人（無料枠では制限があります）"
notBestFor:
  - "動画の細かい編集・映像合成が必要な人（生成専特化ツール）"
  - "長尺動画（25秒超）を継続生成したい人（通常は5秒・10秒、Pikaframes使用時でも最大25秒程度までの短尺向け）"
  - "日本語プロンプトで細かい画風指定をしたい人（対応状況に限界あり）"
difficulty: "beginner"
pricingDecision:
  hasFreePlan: "limited"
  freePlanLimitNote: "2026-11-07の新料金比較ではFree月額付与0（パック購入可）・無透かし・商用ライセンスなし。旧Basicの毎月80cr・商用可表示は現行条件の保証にならない。"
  watermarkStatus: "none"
  creditSystem: true
  paidPlanRequiredForExport: false
  pricingNote: "新Freeは月額0cr・商用ライセンスなし。Starter年払い月$8相当・900cr、Creator年払い月$28相当・3,150cr。Starter商用権利は公式案内が矛盾。最新契約を確認。"
usagePolicy:
  commercialUseStatus: "limited"
  commercialUseByPlan:
    free: "新料金比較で商用ライセンスなし。旧Basicの無料商用可表示は過去バージョンの可能性があり適用しない。"
    paid: "Creator/Fancyは新料金比較で商用ライセンスあり。Starterは料金比較NO／サポートYESで不一致、契約者の条件確認が必要。"
    enterprise: "要確認"
  commercialUseNote: "Freeは新料金比較で商用ライセンスなし。Creator/Fancyはあり。StarterはPika公式間で表示相違。第三者素材や著作権は別途確認。"
  rightsStatus: "unknown"
  rightsNote: "生成物の権利帰属は最新の公式利用規約で確認が必要。"
  inputMaterialRisk: "medium"
  inputMaterialNote: "アップロードする画像・動画素材の権利関係はユーザーが確認する必要あり。"
  peopleLogoRisk: "high"
  peopleLogoNote: "実在の人物・著名人・ブランドロゴを含む動画は肖像権・商標権等の観点から別途確認が必要。本記事は法的助言ではない。"
  creditRequiredStatus: "unknown"
  creditRequiredNote: "公式規約での明記は確認できていない。最新規約を参照すること。"
  officialSourceUrl: "https://pika.art/pricing"
  termsUrl: "https://pika.art/terms-of-service"
  lastReviewed: "2026-06-15"
capabilityFit:
  imageGeneration: false
  videoGeneration: true
  videoEditing: false
  avatarVideo: false
  textToImage: false
  imageToImage: false
  textToVideo: true
  imageToVideo: true
  styleControl: "low"
  consistencyControl: "low"
conversionGuide:
  primaryCtaLabel: "無料枠・透かし・商用利用条件を公式サイトで確認する"
  primaryCtaReason: "旧Basicと新Freeの無料付与・商用条件が異なるため、最新版の料金比較と公式サポートの両方を確認。"
  beforeClickChecklist:
    - "新Freeは商用ライセンスなし、Starterは公式案内に相違がある点を確認したか？"
    - "可視透かしなしダウンロードが対象モデル・出力に適用されるか確認したか？"
    - "商用利用する場合、生成内容と入力素材に必要な権利・同意を確保したか？"
    - "生成に使う素材（画像・動画）に第三者の権利が含まれていないか確認したか？"
    - "人物・著名人・ブランドロゴを含む動画を使用する場合、権利関係を別途確認したか？"
reviewed:
  pricing: "2026-07-24"
  terms: "2026-05-24"
  features: "2026-07-24"
sourceRefs:
  - label: "Pika料金プラン（公式）"
    url: "https://pika.art/pricing"
    type: pricing
  - label: "Pika利用規約（公式）"
    url: "https://pika.art/terms-of-service"
    type: terms
  - label: "Pika公式サイト"
    url: "https://pika.art"
    type: official
sources:
  - title: "Pika 料金プラン（公式）"
    url: "https://pika.art/pricing"
  - title: "Pika 利用規約（公式）"
    url: "https://pika.art/terms-of-service"
  - title: "Pika 公式サイト"
    url: "https://pika.art"
faqs:
  - question: "無料で使えますか？"
    answer: "新料金比較ではFreeは月額クレジット付与0で追加パック購入が可能。旧Basic（月80cr）の表示が残るため、現行アカウントの実際の条件を確認してください。無透かしと商用許諾は別です。"
  - question: "商用利用できますか？"
    answer: "新料金比較ではFreeに商用ライセンスなし、Creator/Fancyにはあり。Starterは料金比較でNO、公式サポートでYESと説明が異なり、個別確認が必要です。入力素材など第三者権利も別途確認してください。"
  - question: "日本語で使えますか？"
    answer: "UIは英語ベースですが、一部で翻訳表示に対応している場合があります。日本語プロンプトの入力も可能ですが、英語プロンプトの方が生成品質が高い場合があるとされています。"
  - question: "透かしは入りますか？"
    answer: "新料金比較ではFreeを含むプランで可視透かしなしDLが案内されています。ただし過去の動画やメタデータ、商用利用権は別に確認が必要です。"
  - question: "どの環境で使えますか？"
    answer: "Webブラウザから利用できます。"
  - question: "Pikaframesとは何ですか？"
    answer: "複数の画像（キーフレーム）間をつなぐフレーム補間機能です。公式料金ページ（2026-07-24確認）では5秒・10秒・10〜15秒・15〜20秒・20〜25秒の区分が案内されており、最大25秒程度の動画生成に対応するとされています。通常のText-to-Video / Image-to-Video（5秒・10秒）とは別の生成区分で、クレジット消費量が異なります。対応プラン・仕様は変更される可能性があるため、最新情報は公式サイトをご確認ください。"
  - question: "Pikaはどんな用途に向いていますか？"
    answer: "短尺のSNS動画、画像素材からの動画化、プロモーション案の試作、動画アイデアの確認などに向いているとされています。ただし用途や素材の権利関係によって確認すべき条件が異なる場合があります。"
  - question: "PikaとRunwayはどちらを選ぶべきですか？"
    answer: "手軽に短い動画生成を試したい場合はPikaが候補になります。本格的な映像表現・編集寄りの用途ではRunwayも候補になります。詳しくは[RunwayとPikaの違いを詳しく比較する](/comparisons/runway-vs-pika/)をご確認ください。"
  - question: "PikaはRunwayやKling AIと何が違いますか？"
    answer: "Pikaは短尺動画の生成や画像からの動画化を手軽に試したい場合の候補とされています。Runwayは映像制作・編集寄りの機能を重視する場合の候補、Kling AIはリアル寄りの動画生成を比較検討したい場合の候補とされています。ただし、各ツールの用途・料金・商用利用条件は変更される可能性があるため、最新情報は各ツールの公式サイトでご確認ください。本記事は法的助言ではありません。"
  - question: "PikaとHailuo AIはどちらが向いていますか？"
    answer: "Pikaはシンプルな操作で短尺動画を手軽に試したい場合の候補とされています。Hailuo AIは映像品質が高いとされる場合があります。各ツールの詳細は[AI動画生成ツール一覧](/categories/video-generation/)でご確認ください。"
japanBilling:
  providerName: "Pika（iOSアプリ販売者はMellis, Inc.）"
  providerCountry: "米国"
  isJapaneseService: false
  pricingUrl: "https://pika.art/pricing"
  billingCurrency: "USD"
  jpyDirectBilling: "channel-dependent"
  localizedJpyDisplay: false
  taxDisplay: "tax-at-checkout"
  purchaseChannels: ["web", "appstore"]
  pricingCheckedAt: "2026-07-13"
  pricingNote: "公式料金は米ドル建てで、公式料金ページに「居住国により付加価値税（VAT）が加算される場合がある」と明記されています。日本円での実際の支払額は決済時の為替レート、カード会社の海外事務手数料により変動します。iOSアプリ（Pika Video）はApp Store課金でWeb版と価格体系が異なります。"
  billingCategory: "D"
  sourceUrls:
    - "https://pika.art/pricing"
    - "https://apps.apple.com/us/app/pika-video/id6680155400"
---

## Pikaとは

Pikaはテキストや画像から短尺AI動画を生成するサービス。新Freeは月額付与0（追加パック購入可）、旧Basicの月80cr・商用可表示はそのまま現行条件として扱いません。

## 料金プラン

以下はlastReviewedの確認時点の情報です。プラン名・料金・クレジット数は変更される可能性があります。

| プラン | 料金 | 新料金比較（2026-11-07に取得。契約時に確認） |
|---|---|---|
| Free | 無料 | 月額付与0cr、追加パック購入可、無透かしDL、商用ライセンスなし |
| Starter | $10/月（月払い）・$8/月相当（年払い） | 900cr/月。商用許諾は料金比較と公式サポートの記載に相違あり |
| Creator | $35/月（月払い）・$28/月相当（年払い） | 3,150cr/月、商用ライセンスあり（第三者権利は別） |
| Fancy | $95/月（月払い）・$76/月相当（年払い） | 8,550cr/月、商用ライセンスあり（追加条件・上位クレジット別） |

- プラン名、料金、クレジット数は変更される可能性があります
- 解像度・生成秒数はプランによって異なる場合があります
- 旧Basicの80クレジット/月と商用利用可表示は新Freeの月額0cr／商用ライセンスなしという条件と異なります
- **最新のプラン内容はPika公式料金ページをご確認ください**

## 動画の長さについて

Pikaの動画生成には、通常生成とPikaframes（延長・フレーム補間機能）という2つの区分があります。仕様が異なるため、以下のように分けてご確認ください。

- **通常のText-to-Video / Image-to-Video：** 5秒・10秒から選択（2026-07-24公式料金ページ確認）
- **Pikaframes（フレーム補間・延長機能）：** 複数の画像（キーフレーム）間をつなぐ機能で、5秒・10秒・10〜15秒・15〜20秒・20〜25秒の区分が案内されており、最大25秒程度まで対応
- 通常生成とPikaframesはクレジット消費量が異なり、Pikaframesの方が消費量が大きい傾向があります
- モデルバージョン・プランによって対応状況や仕様が異なる場合があります
- **最新の仕様はPika公式サイト・生成画面でご確認ください**

## 商用利用について

公式情報上、プランによって商用利用の可否が分かれているとされています。

- **Free：** 新料金比較では商用ライセンスなし、無透かしDLとは別条件
- **有料プラン：** Creator/Fancyには商用ライセンスあり。Starterは新料金比較と公式サポートの記載が相違するため契約確認が必要
- 条件・規約は変更される可能性があります

> **免責事項：** このページは情報提供を目的としており、法的助言ではありません。商用利用前は必ず[Pika利用規約](https://pika.art/terms-of-service)の最新版をご確認ください。

## 日本語対応

- **日本語UI：** 一部対応。UIは英語ベースですが、一部で翻訳表示に対応している場合があります。完全な日本語UIではない点にご注意ください
- **日本語プロンプト：** 一部対応。日本語入力での動画生成は可能とされていますが、英語プロンプトの方が生成品質が高い場合があるとされています

## 透かし（ウォーターマーク）

新料金比較ではFreeにも無透かしDLを案内。過去の生成物への適用や商用利用権は別に確認してください。

## こんな人に向いている

- 短いAI動画を手軽に試したい人
- SNS投稿用の動画案を作りたい人
- 画像素材に動きを付けたい人
- RunwayよりもシンプルなUIで動画生成を試したい人

## こんな人には向いていない

- 長尺動画を細かく編集したい人
- 毎回同じ人物・構図・動きを完全に再現したい人
- 公式条件を確認せずに商用案件へ使いたい人
- 高度な映像編集機能まで1つのツールで完結させたい人

## Pikaを選ぶ理由

- 短尺AI動画を手軽に試しやすい構成になっているとされています
- 画像から動画を生成する用途と相性がよいとされています
- SNS投稿や動画アイデアのラフ作成のような用途に向いているとされています
- 本格的な映像編集より、生成の手軽さを優先したい場合の候補になります
- **商用利用を検討する場合は、プラン条件・利用規約・使用する素材の権利を事前に確認してください**

## Pikaの使いどころ

以下は用途の一例です。用途・素材・目的によって確認すべき条件が異なるため、実際の利用前に公式情報をご確認ください。

- SNS投稿用の短尺動画案の試作
- YouTube Shortsの冒頭素材案の確認
- 静止画バナーに動きを付けるラフ検討
- 広告動画のイメージ確認・ラフ案作成
- 商品画像を動かした演出イメージの試作

> **注意：** 商用案件やクライアントワークで使用する場合は、Pikaの最新の利用規約・プラン条件、使用する素材（人物・ブランド・第三者素材を含む）の権利関係を事前に確認する必要があります。本記事は法的助言ではありません。

## Pikaと他のAI動画生成ツールの選び分け

用途や求めるクオリティによって向いているツールは異なります。以下はあくまで傾向の整理です。料金・機能・商用利用条件は変更される可能性があるため、最新情報は各公式サイトでご確認ください。

| ツール | 特徴の傾向 |
|---|---|
| **Pika** | 短尺動画・画像からの動画化・手軽な試作向けとされています |
| [**Runway**](/tools/runway/) | 映像制作・編集寄りの機能も重視する場合の候補とされています |
| [**Kling AI**](/tools/kling-ai/) | リアル寄りの動画生成を比較検討したい場合の候補とされています |
| [**Luma AI**](/tools/luma-ai/) | 自然な動きや映像表現を比較検討したい場合の候補とされています |

詳しくは[AI動画生成ツール一覧](/categories/video-generation/)をご確認ください。

## PikaとRunwayの違い

Pikaは短尺動画のシンプルな生成に特化しているとされています。Runwayは映像編集寄りの機能が多く、より細かい制御を求めるユーザー向けとされています。どちらが適しているかは用途・予算・必要な機能によって異なります。詳しくは[RunwayとPikaの違いを詳しく比較する](/comparisons/runway-vs-pika/)をご確認ください。

## 生成時の注意点

- **生成時間：** 生成にかかる時間はサーバー状況やプランによって異なる場合があります
- **クレジット消費：** 動画の長さ・解像度・生成設定によってクレジット消費量が変動する場合があります
- **解像度・長さ：** 解像度・生成秒数の上限はプランによって異なる場合があります
- **透かし：** 新料金比較ではFreeも無透かしDLを案内。ただし商用利用権とは別で、出力方式別の条件は確認してください。
- **人物・ブランド・第三者素材：** 人物の肖像、著名人の画像、ブランドロゴ、第三者が著作権を持つ素材を扱う場合は、別途権利関係の確認が必要です

## 実務利用前に確認したいポイント

- [ ] 新Freeの商用ライセンスなし、Starterの公式案内の相違、Creator/Fancyの利用権と第三者素材を確認
- [ ] 透かしの有無とプランごとの条件
- [ ] 生成物の利用範囲（掲載媒体・収益化・クライアントワークの可否）
- [ ] 人物・著名人・ブランドロゴ・第三者素材を使う場合の権利関係
- [ ] クレジット消費レートと生成コスト（動画の長さ・解像度によって変動）
- [ ] Pika公式利用規約の最新版

詳しくは[商用利用・著作権の考え方ガイド](/guides/commercial-use-copyright/)もご参照ください。

## このツールを選びやすいケース

- 短尺AI動画を手軽にブラウザから試したい場合
- 手持ちの画像素材に動きを付けるimage-to-videoを気軽に使いたい場合
- RunwayよりシンプルなUIで動画生成の感触を確かめたい場合
- SNS投稿・Shorts向けの短い動画案を素早く出したい場合
- 無料枠で月次クレジットが付与されるツールを試したい場合（商用利用条件要確認）

## 他ツールも比較したいケース

- **商用利用を前提にしたい場合** → 新料金比較でCreator/Fancyに商用ライセンスあり。Freeは対象外で、Starterは公式説明が矛盾するため契約画面の確認が必要です。入力素材や配布先の規則も確認してください。
- **映像クオリティ・編集機能を重視する場合** → [Runway](/tools/runway/) が候補になります
- **リアル系の動きを比較したい場合** → [Kling AI](/tools/kling-ai/)・[Luma AI](/tools/luma-ai/) も比較候補です
- **日本語UIを優先したい場合** → PikaはUIが英語ベースのため、他ツールも確認してください
- **動画生成ツール全体を横断比較したい場合** → [AI動画生成ツール一覧](/categories/video-generation/) をご参照ください

## 関連ページ

- [AI動画生成ツール一覧](/categories/video-generation/) — 主要AI動画生成ツールの比較・選び方
- [AI動画編集ツール一覧](/categories/video-editing/) — AI動画編集ツールの比較・選び方
- [ショート動画向けAI動画生成](/use-cases/shorts/) — ショート動画用途での選び方・注意点
- [YouTube向けAI動画生成の活用](/use-cases/youtube/) — YouTube動画にAI生成を活用する際の確認ポイント
- [RunwayとPikaを比較](/comparisons/runway-vs-pika/) — 料金・無料枠・商用利用・用途別の選び方を比較
- [AI動画生成ツール比較](/comparisons/ai-image-video-tools/) — AI画像・動画生成ツールの横断比較
- [無料で試せるAIツール](/conditions/free/) — 無料枠のあるAIツール一覧
- [透かしなしAI動画ツール](/conditions/no-watermark/) — 透かしなし出力ができるAI動画ツール一覧
- [商用利用条件を確認できるAIツール一覧](/conditions/commercial-use/) — 商用利用条件を確認できるAIツール比較

