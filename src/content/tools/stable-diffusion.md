---
name: "Stable Diffusion"
shortDescription: "Stability AIが公開したオープンソースのAI画像生成モデル。ローカル環境で無料実行でき、高度なカスタマイズが可能。"
category: "image"
officialUrl: "https://stability.ai"
freePlan: true
currency: "USD"
commercialUse: "limited"
commercialUseNote: "モデルバージョンによってライセンスが異なります。SD 1.x/2.x・SDXL（CreativeML Open RAIL-M）は収益制限なしで条件付き商用利用できる場合があります。SD 3.x・SD 3.5以降（Stability AI Community License）は年間総収益100万ドル未満の場合に商用利用できる場合があるとされています。100万ドル以上はエンタープライズライセンスが必要とされています。ライセンス条件は変更される可能性があるため、利用するモデルのライセンスを必ず最新情報でご確認ください。"
japaneseUi: "partial"
japanesePrompt: "partial"
watermark: "limited"
bestFor:
  - "ローカル環境での無料・高品質な画像生成"
  - "カスタムモデル・LoRAを使った特化生成"
  - "プライバシーを重視した生成（データがローカルに留まる）"
strengths:
  - "オープンソースで無料利用可能"
  - "ローカル実行可能（標準的な構成では外部へのデータ送信が発生しにくい）"
  - "コミュニティモデルが豊富"
  - "高度なカスタマイズが可能"
weaknesses:
  - "環境構築に技術知識が必要（GPU・依存ライブラリ等）"
  - "モデルごとにライセンスが異なり、管理・確認が必要"
  - "日本語対応は拡張機能に依存する"
  - "生成画像に不可視透かしが埋め込まれている場合がある"
usagePolicy:
  commercialUseByPlan:
    free: "ローカル実行・無料利用時は、利用するモデルのバージョンおよびライセンスによって条件が異なります。SD 1.x/2.x/SDXLはCreativeML Open RAIL-Mライセンス、SD 3.x/3.5以降はStability AI Community Licenseが適用される場合があります。「商用利用できます」とは断定できません。必ず使用するモデルのライセンスを個別にご確認ください。"
    paid: "Stability AI Platform等の公式API・有料サービス経由の利用時は、当該サービスの利用規約・料金プラン・ライセンス条件が適用されます。プランや用途によって条件が異なるため、最新情報は公式サイトをご確認ください。"
    enterprise: "企業・大規模利用時は、Stability AI Community Licenseの年間収益条件（100万ドル超はエンタープライズ契約が必要とされています）や商用契約が関係する場合があります。最新の公式情報およびStability AIへのお問い合わせによる確認を推奨します。"
  creditRequiredStatus: "unknown"
  creditRequiredNote: "ローカル実行・API・利用サービスによって異なり、公式未明記または確認が必要な場合があります。"
  inputMaterialRisk: "high"
  inputMaterialNote: "img2img・ControlNet・既存画像・人物・ロゴ・第三者素材を入力として使用する場合は、入力素材の権利関係を別途確認してください。"
  peopleLogoRisk: "high"
  peopleLogoNote: "著名人・ブランドロゴ・既存IPに関わる生成は、別途権利確認が必要です。"
  rightsStatus: "unknown"
  rightsNote: "ローカル実行・API利用・派生モデル・入力素材によって生成物の権利関係が変わる場合があります。生成物の権利を断定できません。利用するモデルおよびサービスの規約をご確認ください。"
  officialSourceUrl: "https://stability.ai/license"
  termsUrl: "https://stability.ai/license"
  lastReviewed: "2026-07-11"
lastReviewed: "2026-07-11"
nextReviewDue: "2026-08-11"
verifiedAt: "2026-07-11"
officialSourceUrl: "https://stability.ai/license"
pricingSourceUrl: "https://platform.stability.ai/pricing"
pricingSourceNote: "公式料金ページURLは設定済み。ただしローカル利用/API利用、月額プラン、クレジット体系の最新性は要確認。最新情報は公式サイトをご確認ください。"
pricingModel: "local_free"
freePlanNote: "ローカル実行は無料（GPU搭載PCと環境構築が必要）"
paidPlanNote: "クラウドAPI経由（Stability AI Platform）は別途課金。2026年6月時点の公式案内では$20/月で6,000クレジット等のプランが案内されています。最新料金は公式サイトをご確認ください。"
platforms:
  - local
  - api
signupRequired: false
features:
  textToImage: true
  imageToImage: true
  inpainting: true
  outpainting: true
  upscale: true
  stylePresets: false
  promptAssist: false
  apiAvailable: true
watermarkCondition: "一部バージョンで不可視透かし（invisible watermark）が埋め込まれる場合あり"
japaneseDocs: false
useCases:
  - illustration
  - photo_real
  - design
  - ad_creative
limitations:
  - "環境構築に技術知識が必要（GPU・依存ライブラリ等）"
  - "モデルごとにライセンスが異なり、個別確認が必要"
  - "日本語対応は拡張機能に依存する"
reviewed:
  pricing: "2026-06-06"
  terms: "2026-06-06"
  features: "2026-06-06"
sourceRefs:
  - label: "Stability AIライセンスページ（公式）"
    url: "https://stability.ai/license"
    type: policy
  - label: "Stability AI公式サイト"
    url: "https://stability.ai"
    type: official
  - label: "Stability AI Platform 料金（公式）"
    url: "https://platform.stability.ai/pricing"
    type: pricing
  - label: "Stable Diffusion 3.5 リリースアナウンス（公式）"
    url: "https://stability.ai/news-updates/introducing-stable-diffusion-3-5"
    type: official
  - label: "Stable Diffusion GitHub（CompVis）"
    url: "https://github.com/CompVis/stable-diffusion"
    type: docs
  - label: "AUTOMATIC1111 Web UI（GitHub）"
    url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui"
    type: docs
  - label: "ComfyUI 公式ドキュメント"
    url: "https://docs.comfy.org"
    type: docs
sources:
  - title: "Stability AI ライセンスページ（公式）"
    url: "https://stability.ai/license"
  - title: "Stability AI 公式サイト"
    url: "https://stability.ai"
  - title: "Stability AI Platform 料金（公式）"
    url: "https://platform.stability.ai/pricing"
  - title: "Stable Diffusion 3.5 リリースアナウンス（公式）"
    url: "https://stability.ai/news-updates/introducing-stable-diffusion-3-5"
  - title: "Stable Diffusion GitHub（CompVis）"
    url: "https://github.com/CompVis/stable-diffusion"
  - title: "AUTOMATIC1111 Web UI（GitHub）"
    url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui"
  - title: "ComfyUI 公式ドキュメント"
    url: "https://docs.comfy.org"
faqs:
  - question: "無料で使えますか？"
    answer: "ローカル環境での実行は無料です。ただしGPU搭載PCと環境構築が必要です。Dream Studioなどクラウドサービス経由では別途料金が発生します。"
  - question: "商用利用できますか？"
    answer: "利用するモデルのバージョンによってライセンスが異なります。SD 3.x以降は年間総収益100万ドル未満の場合に商用利用できる場合があるとされています。利用するモデルのライセンスを個別に必ずご確認ください。このページは法的助言ではありません。"
  - question: "日本語で使えますか？"
    answer: "日本語UIはAUTOMATIC1111 Web UIなど一部の実装で日本語化拡張機能を使うことで対応できる場合があります。日本語プロンプトは一部対応ですが英語の方が精度が高い傾向があります。"
  - question: "透かしは入りますか？"
    answer: "バージョン・実装によって異なります。一部バージョンでは不可視透かしが埋め込まれる場合があるとされています。詳細は利用する実装ごとにご確認ください。"
  - question: "どの環境で使えますか？"
    answer: "ローカル環境（Windows/Mac/Linux）での実行が基本です。Stability AI PlatformのAPI経由でのクラウド利用も可能です。最新料金は公式サイトをご確認ください。"
  - question: "Stable Diffusion 3.5とはどのようなモデルですか？"
    answer: "2024年10月に公式発表されたStability AIのモデル系統です。Large（8.1Bパラメータ）・Large Turbo・Mediumのバリアントが公開されています。ライセンスはSD 3.x系と同様にStability AI Community Licenseが適用されています。詳細は公式サイトをご確認ください。"
  - question: "Stable Diffusionとは何ですか？"
    answer: "Stability AIが開発・公開したオープンソースのAI画像生成モデルです。モデルウェイトが公開されているため、GPU搭載のPCがあれば自分のローカル環境で無料実行できます。AUTOMATIC1111 Web UIやComfyUIなどのフロントエンドツールと組み合わせて使われることが多く、LoRAやカスタムモデルによる高度なカスタマイズが可能です。"
  - question: "LoRAとは何ですか？"
    answer: "LoRA（Low-Rank Adaptation）は、Stable Diffusionのモデル（Checkpoint）に追加適用できる軽量な追加学習ファイルです。特定のキャラクター・スタイル・画風・構図などを再現するために使われます。Civitaiなどで多数公開されており、複数のLoRAを組み合わせることも可能です。LoRAにはそれぞれ独自のライセンスが設定されている場合があり、商用利用前にライセンスの確認が必要です。"
  - question: "VAEとは何ですか？"
    answer: "VAE（Variational Autoencoder）は、Stable Diffusionの生成画像の色味・シャープさ・全体的な品質に影響を与える補助モデルです。適切なVAEを適用することで色のくすみや不自然さが改善される場合があります。モデルによってはCheckpointにVAEが組み込まれているケースもあります。"
  - question: "Checkpointとは何ですか？"
    answer: "Checkpointはモデルの学習済み重みを保存したファイルで、「モデルファイル」とも呼ばれます。CivitaiなどからCheckpointをダウンロードして差し替えることで、生成スタイルや得意とする表現が変わります。使用するCheckpointごとにライセンスが異なるため、商用利用前にライセンスを必ずご確認ください。"
  - question: "Seedとは何ですか？"
    answer: "Seedは生成のランダム性を決定する数値です。同じSeed値・同じプロンプト・同じ設定の組み合わせにすることで、近似した画像を再現しやすくなります。ただし環境やモデルバージョンによって完全な再現が保証されない場合があります。"
  - question: "Stable Diffusionは無料で使えますか？"
    answer: "ローカル環境での実行は無料です。ただしGPU搭載PCと環境構築が必要です。Stability AI PlatformなどクラウドAPI経由では別途料金が発生します。最新のAPI料金は[Stability AI Platform公式サイト](https://platform.stability.ai/pricing)でご確認ください。"
  - question: "Stable Diffusionで生成した画像は商用利用できますか？"
    answer: "利用するモデルのバージョンによってライセンスが異なります。SD 1.x/2.x/SDXLはCreativeML Open RAIL-Mライセンス（収益制限なしで条件付き可能な場合あり）、SD 3.x/3.5以降はStability AI Community Licenseが適用され、年間総収益100万ドル未満は商用利用できる場合があるとされています。また、コミュニティ公開のカスタムモデルやLoRAにはそれぞれ独自のライセンスがある場合があります。「商用利用できます」とは断定できません。必ず使用するモデルのライセンスを個別にご確認ください。このページは法的助言ではありません。"
  - question: "モデルやLoRAのライセンスはどこで確認できますか？"
    answer: "Stability AI公式モデルのライセンスは[Stability AI公式ライセンスページ](https://stability.ai/license)で案内されています。コミュニティ公開のカスタムモデルやLoRAはCivitaiなどの配布ページに個別のライセンスが記載されている場合があります。利用前に必ず各配布元のライセンスをご確認ください。詳しくは[AI画像の商用利用チェックリスト](/guides/ai-image-commercial-use-checklist/)もご参照ください。"
  - question: "AUTOMATIC1111とComfyUIの違いは何ですか？"
    answer: "どちらもStable Diffusionを動かすためのフロントエンドツールです。AUTOMATIC1111 Web UIは歴史が長くチュートリアルが豊富ですが、開発ペースが落ちています。ComfyUIはノードベースのワークフロー構築が可能で、VRAM効率・新モデルへの対応速度に優れており、2025〜2026年にかけて主流ツールとしての地位を確立しつつあります。用途に合わせて選択することを推奨します。"
  - question: "Stable Diffusionの生成画像の著作権は誰にありますか？"
    answer: "生成物の権利関係は、国や地域、利用するモデル、配布元のライセンス、入力素材、用途によって判断が異なる場合があります。商用利用や公開利用を行う場合は、利用しているモデルのライセンスと配布元の規約を確認し、必要に応じて専門家へ相談してください。本記事は法的助言ではありません。"
  - question: "CreativeML Open RAIL-MとStability AI Community Licenseは何が違いますか？"
    answer: "Stable Diffusionのモデルによって適用されるライセンスや利用条件が異なる場合があります。SD 1.x / 2.x / SDXLではCreativeML Open RAIL-Mが参照されることが多く、SD 3.x / 3.5系ではStability AI Community Licenseなど別の条件が案内されています。利用前に、使用するモデル名、配布元、ライセンス本文、商用利用条件を確認してください。"
---

## Stable Diffusionとは

Stability AIが開発・公開したオープンソースのAI画像生成モデル。モデルウェイトが公開されているため、ローカル環境（自分のPC）で無料で実行できます。2024年10月にはSD 3.5系（Large・Large Turbo・Medium）が公式発表され、より高品質・軽量なローカル実行が可能になっています。AUTOMATIC1111 Web UIやComfyUIなどのフロントエンドツールと組み合わせて使われることが多く、カスタムモデル・LoRAを活用した高度な生成が可能です。

[AI画像生成カテゴリ一覧へ](/categories/image-generation/)

## Stable Diffusionの基本用語

### LoRA・VAE・Checkpoint・Seed・CFG Scaleとは

Stable Diffusionを使う上で頻繁に登場する用語を整理します。

**Checkpoint（チェックポイント）**
モデルの学習済み重みを保存したファイル。「モデルファイル」とも呼ばれます。CivitaiなどからダウンロードしたCheckpointを差し替えることで、生成スタイルや得意とする表現が大きく変わります。使用するCheckpointごとにライセンスが異なるため、商用利用前にライセンスの確認が必要です。

**LoRA（ローラ）**
Checkpointに追加的に適用できる軽量な追加学習ファイル。特定のキャラクター・スタイル・構図などを再現するために使われます。本体モデルほどの容量ではなく複数を組み合わせることも可能です。LoRAにも独自のライセンスが設定されている場合があります。

**VAE（Variational Autoencoder）**
画像の色味・シャープさ・全体的な見た目の品質に影響する補助モデル。適切なVAEを適用することで、色のくすみや不自然さが改善される場合があります。モデルによってはCheckpointにVAEが組み込まれているケースもあります。

**Seed（シード）**
生成のランダム性を決定する数値。同じSeed値・同じプロンプト・同じ設定の組み合わせにすることで、近似した画像を再現しやすくなります。完全な再現は環境・モデルバージョンによって保証されない場合があります。

**CFG Scale（Classifier-Free Guidance Scale）**
プロンプトへの忠実度を調整するパラメータ。値が高いほどプロンプトに強く従いますが、過度に高い場合はアーティファクト（不自然な描画崩れ）が増えることがあります。一般的に7〜12程度がよく使われますが、モデルや用途によって最適値は異なります。

## Stable Diffusionを選ぶ理由

- **ローカル実行による無料利用：** GPU搭載PCがあれば、クラウドサービスへのAPI課金なしで画像生成を繰り返せます
- **高いカスタマイズ性：** LoRA・ControlNet・カスタムモデルなどの組み合わせにより、スタイルや構図を細かく制御できます
- **豊富なコミュニティモデル：** Civitaiなどのプラットフォームで多数のカスタムモデルが公開されており、用途に特化した生成が可能です
- **プライバシー重視の用途：** 標準的なローカル構成では生成データが外部に送信されにくく、機密性の高い素材の試作に向いている場合があります
- **拡張機能によるワークフロー拡張：** 高解像度化・インペインティング・アウトペインティングなど多数の拡張機能が利用できます
- **最新モデルへの継続対応：** SD 3.5シリーズ（2024年10月に公式発表）など新モデルも引き続きローカル実行が可能です

## Stable Diffusionの使いどころ

### イラスト制作
カスタムモデルやLoRAを使ってアニメ調・ゲーム調・リアル調など特定スタイルのイラストを生成できます。スタイルの再現性を高めたい場合はLoRAと組み合わせる方法がよく用いられています。

### キャラクター案
同一キャラクターのバリエーションを複数生成して案出しに活用できます。完全な再現には追加の調整が必要な場合があります。

### 背景・コンセプトアート
ファンタジー、SF、現代など多様な場面の背景やコンセプトアートの素案出しに向いています。img2imgや追加の編集と組み合わせて活用されることが多いです。

### 商品画像のラフ案
製品のコンセプト段階でのビジュアルイメージ作成に活用できます。商用利用する場合は利用するモデルのライセンスを確認する必要があります。

### SNS投稿画像
個人利用・プライベート目的での画像案出しに向いています。商用利用の場合は利用規約をご確認ください。

### 研究・検証用途
画像生成AIの技術検証、パラメータ調整の実験、モデル比較など研究目的での活用が可能です。ローカル実行のためコスト面での制約が少ない場合があります。

## 向いている人・向いていない人

**向いている人**

- ローカル実行で繰り返し生成したい人
- カスタムモデルやLoRAを活用して特化した生成をしたい人
- 画像生成パラメータを細かく制御したい人
- プライバシーを重視した生成環境が必要な人
- 技術的な環境構築に抵抗がない人

**向いていない人**

- GPU搭載PCがなく、手軽にブラウザから使いたい人
- 環境構築なしですぐ始めたい人
- Canvaのようにテンプレート込みでデザインを完結したい人
- Adobe製品との連携を重視する人

## 料金

- **ローカル実行：** 無料（要GPU搭載PC・環境構築）
- **クラウドAPI経由：** Stability AI Platformを利用する場合は別途費用が発生します。2026年6月時点の公式案内では$20/月プラン（6,000クレジット）等が案内されています。最新料金は[公式サイト](https://platform.stability.ai/pricing)をご確認ください

## 商用利用について

**利用するモデルのバージョンによってライセンスが異なります。** 必ず使用するモデルのライセンスを個別に確認してください。

Stable Diffusionはモデルバージョンや配布元によって参照すべきライセンスが異なる場合があります。SD 1.x / 2.x / SDXL系とSD 3.x / 3.5系では確認すべきライセンスの種類自体が異なる場合があるため、下表はあくまで目安として扱い、最終判断は公式情報・配布元・ライセンス本文をご確認ください。

| モデル系統 | ライセンス | 商用利用 |
|---|---|---|
| SD 1.x / 2.x / SDXL | CreativeML Open RAIL-M | 収益制限なしで条件付き可能な場合あり |
| SD 3.x / SD 3.5 | Stability AI Community License | 年間収益100万ドル未満は可能な場合がある（条件確認要）。100万ドル以上はエンタープライズ契約が必要とされている |

- 違法・差別的・危険なコンテンツの生成は禁止されています
- コミュニティ公開のカスタムモデルはそれぞれ独自のライセンスを持つ場合があります
- ライセンス条件は変更される可能性があります

> **免責事項：** このページは情報提供を目的としており、法的助言ではありません。商用利用前は[Stability AI公式ライセンスページ](https://stability.ai/license)および使用するモデルのライセンスを必ずご確認ください。

## Stable Diffusionの著作権について

Stable Diffusionで生成した画像の著作権・権利関係は、以下のような要素によって判断が異なる場合があります。

- **国・地域：** 著作権法の解釈は国・地域によって異なる場合があります
- **利用するモデル・配布元：** 公式モデルかコミュニティ公開モデル（Civitai等）かによってライセンス条件が異なります
- **入力素材：** img2img・ControlNet等で第三者の画像を入力として使用した場合、入力素材側の権利関係が別途関わります
- **用途：** 個人利用・商用利用・公開の有無によって確認すべき条件が変わる場合があります

また、AI生成物の学習データや生成物の扱いについては、現在も議論や係争がある論点として報告されています。詳細な法的解釈は国・地域・時期によって変わる可能性があるため、本記事では断定を避けます。

第三者の著作物、実在する人物、ブランド、ロゴ、商標を含む素材を生成・利用する場合は、著作権とは別に肖像権・商標権等の確認が必要です。商用利用を検討する場合は、利用するモデルのライセンス、配布元の規約、入力素材の権利を確認してください。

**本記事は法的助言ではありません。** 著作権に関する最終的な判断が必要な場合は、専門家（弁護士等）への相談を推奨します。

## 商用利用前に確認すること

Stable Diffusionを商用目的で利用する際は、以下の点を事前に確認することを推奨します。

- **使用するモデルのライセンス：** Stability AI公式モデルだけでなく、コミュニティ公開モデル（CivitaiなどのLoRA・カスタムモデル）にはそれぞれ独自のライセンスが設けられている場合があります
- **学習データに関する注意：** 商業利用に制限のある素材が学習データに含まれる可能性については、各モデルの説明・配布ページでご確認ください
- **ControlNetなど拡張ツール：** ControlNetや各種拡張機能には独自のライセンスが設けられている場合があります
- **第三者素材の利用：** 既存の画像をimg2img等の入力として使用する場合、入力画像の権利関係の確認が必要です
- **プラットフォームごとの条件差：** ローカル実行とクラウドサービス（Dream Studio等）では条件が異なる場合があります

詳しくは[商用利用と著作権について](/guides/commercial-use-copyright/)もご参照ください。

## 日本語対応

- **日本語UI：** 一部対応。AUTOMATIC1111 Web UIやComfyUIでは日本語化拡張機能・日本語ノードを導入することで日本語UIにできる場合があります
- **日本語プロンプト：** 一部対応。ネイティブでは英語プロンプトの精度が高く、日本語プロンプトは翻訳拡張機能の利用が推奨される場合があります

## 透かし（ウォーターマーク）

Stable Diffusionの一部バージョン・実装では、人間の目には見えない不可視の透かし（invisible watermark）が生成画像に埋め込まれる場合があるとされています。SDXLなど一部モデルでは可視的なアーティファクトが報告されたケースもあります。詳細な仕様は利用するバージョン・実装ごとに異なる場合があります。

## 他ツールとの選び分け

| ツール | こんな場合に検討 |
|---|---|
| Stable Diffusion | ローカル実行・カスタマイズ性・LoRA活用を最大限に重視する場合 |
| [Midjourney](/tools/midjourney/) | アート調・雰囲気重視の高品質なビジュアル表現を手軽に得たい場合 |
| [Adobe Firefly](/tools/adobe-firefly/) | Adobe製品との連携や、商業利用時の条件を公式で確認しながら使いたい場合 |
| [Leonardo AI](/tools/leonardo-ai/) | イラスト・ゲーム素材・キャラクター案出しでカスタムモデルを活用したい場合 |
| [Canva AI Image Generator](/tools/canva-ai-image-generator/) | テンプレートを使ったデザイン制作の流れの中で画像生成を組み合わせたい場合 |

用途やワークフローに合わせて選択することを推奨します。最新の機能・料金は各公式サイトをご確認ください。

## 注意事項

- **モデルごとのライセンス差：** 使用するモデルによって商用利用条件が大きく異なります。個別確認が必要です
- **日本語プロンプト：** 入力は可能ですが英語と比べて精度が低い傾向があります
- **人物・ブランド・第三者素材：** 著名人、ブランドロゴ、第三者が権利を持つ素材を扱う場合は、別途確認が必要です
- **ローカル環境・クラウドの条件差：** 利用形態によって適用される条件が異なる場合があります
- **本記事は法的助言ではありません**

[Stable DiffusionとMidjourneyを比較する](/comparisons/stable-diffusion-vs-midjourney/) ／ [AIツール一覧へ](/tools/) ／ [無料で使えるAIツール](/conditions/free/) ／ [商用利用条件を確認できるツール一覧](/conditions/commercial-use/) ／ [商用利用と著作権について](/guides/commercial-use-copyright/)

