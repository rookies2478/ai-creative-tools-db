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
lastReviewed: "2026-06-06"
nextReviewDue: "2026-07-06"
verifiedAt: "2026-06-08"
officialSourceUrl: "https://stability.ai/license"
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
  - question: "AUTOMATIC1111とComfyUIの違いは何ですか？"
    answer: "どちらもStable Diffusionを動かすためのフロントエンドツールです。AUTOMATIC1111 Web UIは歴史が長くチュートリアルが豊富ですが、開発ペースが落ちています。ComfyUIはノードベースのワークフロー構築が可能で、VRAM効率・新モデルへの対応速度に優れており、2025〜2026年にかけて主流ツールとしての地位を確立しつつあります。用途に合わせて選択することを推奨します。"
---

## Stable Diffusionとは

Stability AIが開発・公開したオープンソースのAI画像生成モデル。モデルウェイトが公開されているため、ローカル環境（自分のPC）で無料で実行できます。2024年10月にはSD 3.5系（Large・Large Turbo・Medium）が公式発表され、より高品質・軽量なローカル実行が可能になっています。AUTOMATIC1111 Web UIやComfyUIなどのフロントエンドツールと組み合わせて使われることが多く、カスタムモデル・LoRAを活用した高度な生成が可能です。

[AI画像生成カテゴリ一覧へ](/categories/image-generation/)

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

| モデル系統 | ライセンス | 商用利用 |
|---|---|---|
| SD 1.x / 2.x / SDXL | CreativeML Open RAIL-M | 収益制限なしで条件付き可能な場合あり |
| SD 3.x / SD 3.5 | Stability AI Community License | 年間収益100万ドル未満は可能な場合がある（条件確認要）。100万ドル以上はエンタープライズ契約が必要とされている |

- 違法・差別的・危険なコンテンツの生成は禁止されています
- コミュニティ公開のカスタムモデルはそれぞれ独自のライセンスを持つ場合があります
- ライセンス条件は変更される可能性があります

> **免責事項：** このページは情報提供を目的としており、法的助言ではありません。商用利用前は[Stability AI公式ライセンスページ](https://stability.ai/license)および使用するモデルのライセンスを必ずご確認ください。

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

[Stable DiffusionとMidjourneyを比較する](/comparisons/stable-diffusion-vs-midjourney/) ／ [AIツール一覧へ](/tools/) ／ [無料で使えるAIツール](/conditions/free/) ／ [商用利用と著作権について](/guides/commercial-use-copyright/)

