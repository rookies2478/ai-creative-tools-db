---
name: "DALL·E"
shortDescription: "OpenAI開発のAI画像生成モデル。ChatGPTと統合されており、プロンプトへの忠実度が高い画像生成が可能。"
category: "image"
officialUrl: "https://openai.com/dall-e-3"
freePlan: "limited"
lowestPaidPlan: "有料プランで利用枠が拡大する場合があります（例：ChatGPT Plus等）"
currency: "USD"
commercialUse: "ok"
commercialUseNote: "OpenAI公式情報上、生成画像の商用利用ができる場合があります。ただし用途・生成内容・第三者の権利・OpenAIポリシーにより制限される場合があります。このページは法的助言ではありません。利用前にOpenAIの最新規約・ポリシーをご確認ください。"
japaneseUi: true
japanesePrompt: "partial"
watermark: "limited"
bestFor:
  - "ChatGPT経由での手軽な画像生成"
  - "テキストと画像を組み合わせた作業"
  - "指示への忠実度が求められる用途"
strengths:
  - "ChatGPTと統合されており追加設定なしで利用可能"
  - "日本語UIはChatGPTに準拠し利用できる場合がある"
  - "OpenAI公式情報上、商用利用が案内されている"
  - "ChatGPTの無料プランでも制限付きで利用できる場合がある"
weaknesses:
  - "単独プランなし。ChatGPT等の有料プランが必要な場合がある"
  - "スタイルの自由度・表現の幅が限定的な傾向がある"
  - "画像内への日本語テキスト生成は精度が低い傾向がある"
  - "API利用は別途従量課金（料金は公式ページで要確認）"
lastReviewed: "2026-06-15"
nextReviewDue: "2026-09-15"
verifiedAt: "2026-06-15"
officialSourceUrl: "https://openai.com/policies/usage-policies"
pricingModel: "subscription_credit"
freePlanNote: "ChatGPT無料プランで制限付き利用できる場合あり"
paidPlanNote: "ChatGPT Plus等の有料プランで利用枠が拡大。API利用は従量課金（dall-e-3 APIは2026年5月12日にdeprecated。API経由では後継のgpt-image-1等への移行が案内されています）。"
platforms:
  - web
  - api
signupRequired: true
features:
  textToImage: true
  imageToImage: true
  inpainting: true
  apiAvailable: true
watermarkCondition: "C2PAメタデータ（不可視）およびSynthID（不可視ウォーターマーク）が埋め込まれる場合があります。openai.com/research/verify/ でAI生成の確認が可能です。"
japaneseDocs: false
useCases:
  - illustration
  - blog
  - sns
  - business
  - ad_creative
limitations:
  - "単独プランなし。ChatGPT等の有料プランが必要な場合あり"
  - "スタイルの自由度・表現の幅が限定的な傾向"
  - "画像内への日本語テキスト生成は精度が低い傾向"
reviewed:
  pricing: "2026-05-26"
  terms: "2026-05-26"
  features: "2026-05-26"
sourceRefs:
  - label: "DALL·E 3公式ページ（OpenAI）"
    url: "https://openai.com/dall-e-3"
    type: official
  - label: "OpenAI利用規約（公式）"
    url: "https://openai.com/policies/usage-policies"
    type: terms
  - label: "OpenAI API料金（公式）"
    url: "https://openai.com/pricing"
    type: pricing
  - label: "C2PAとSynthID — OpenAI生成画像（公式ヘルプ）"
    url: "https://help.openai.com/en/articles/8912793-c2pa-and-synthid-in-openai-generated-images"
    type: help
  - label: "OpenAI APIモデルdeprecations（公式）"
    url: "https://developers.openai.com/api/docs/deprecations"
    type: official
  - label: "ChatGPT料金・プラン（公式）"
    url: "https://openai.com/chatgpt/pricing/"
    type: pricing
sources:
  - title: "DALL·E 3 公式ページ（OpenAI）"
    url: "https://openai.com/dall-e-3"
  - title: "OpenAI 利用規約（公式）"
    url: "https://openai.com/policies/usage-policies"
  - title: "OpenAI API 料金（公式）"
    url: "https://openai.com/pricing"
  - title: "C2PAとSynthID — OpenAI生成画像（公式ヘルプ）"
    url: "https://help.openai.com/en/articles/8912793-c2pa-and-synthid-in-openai-generated-images"
  - title: "OpenAI APIモデルdeprecations（公式）"
    url: "https://developers.openai.com/api/docs/deprecations"
  - title: "ChatGPT料金・プラン（公式）"
    url: "https://openai.com/chatgpt/pricing/"
faqs:
  - question: "DALL·Eは無料で使えますか？"
    answer: "ChatGPTの無料プランで制限付きの利用ができる場合があります。利用可能回数はプランや時期により変わる可能性があるため、最新の状況はOpenAI公式ヘルプをご確認ください。"
  - question: "DALL·Eは商用利用できますか？"
    answer: "OpenAI公式情報上、生成画像の商用利用ができる場合があります。用途・生成内容・第三者の権利により制限される場合があるため、利用前に最新の利用規約をご確認ください。このページは法的助言ではありません。"
  - question: "DALL·Eは日本語で使えますか？"
    answer: "ChatGPT経由のためChatGPTの日本語UIに準拠して利用できる場合があります。日本語プロンプトも一部対応していますが、画像内への日本語テキスト生成は精度が低い傾向があります。"
  - question: "DALL·Eに透かしは入りますか？"
    answer: "従来型の可視透かしは付与されませんが、C2PA標準の不可視メタデータおよびSynthID（不可視ウォーターマーク）が埋め込まれる場合があります。openai.com/research/verify/ でAI生成の確認が可能です。最新の仕様は公式情報でご確認ください。"
  - question: "DALL·EはどのプラットフォームやAPIで使えますか？"
    answer: "ChatGPT経由（Web）とOpenAI API経由での利用が可能です。APIは別途従量課金です。最新の料金は公式APIページでご確認ください。"
  - question: "DALL·Eで人物や著名人・ブランドロゴを含む画像を作成できますか？"
    answer: "技術的には生成可能な場合がありますが、実在の人物・著名人・ブランドロゴ・第三者の著作物を含む画像を作成・利用する際は、肖像権・商標権・著作権などの観点から別途確認が必要です。本記事は法的助言ではありません。"
  - question: "DALL·EとMidjourneyはどう違いますか？"
    answer: "DALL·EはChatGPTと統合されておりテキスト指示への忠実度が高い傾向があります。Midjourneyはアートやイラストなどスタイリッシュなビジュアルやクリエイティブな表現を得意とするとされています。用途や優先事項に応じて選び分けることが有効です。"
---

## DALL·Eとは

DALL·EはOpenAIが開発したAI画像生成モデルです。現行バージョンはDALL·E 3で、ChatGPTと統合されており、テキストから画像を生成できます。プロンプトへの忠実度が高いとされ、指示に沿った画像を生成しやすい傾向があります。

[AI画像生成ツール一覧](/categories/image-generation/) ／ [すべてのAIツールを比較する](/tools/) ／ [無料・低コストのAIツールを比較する](/conditions/free/)

## DALL·Eを選ぶ理由

- ChatGPTと統合されており、追加設定なしで画像生成を始められる
- 日本語UIに準拠したインターフェースで操作できる場合がある
- テキスト指示への忠実度が高く、意図した内容を画像にしやすい傾向がある
- ChatGPTの無料プランでも制限付きで試せる場合がある
- OpenAI公式情報上、商用利用が案内されている（利用規約の確認が必要）
- API提供があり、開発・業務フローへの組み込みが可能

## DALL·Eの使いどころ

- **アイデア出し：** テキストで思い浮かんだイメージをすぐ画像化してアイデアを視覚化できる
- **SNS投稿画像：** 短いプロンプトからビジュアルを素早く作成し、投稿素材の候補を確認できる
- **ブログアイキャッチ：** 記事テーマに合ったビジュアルをプロンプト指示で生成できる
- **サムネイル案：** 複数のビジュアル案を短時間で試作し、採用候補を比較できる
- **プレゼン資料用ビジュアル：** スライドに使う図解・概念図・イメージビジュアルを生成できる
- **ラフ案作成：** デザイン方向性の検討段階で、参考ビジュアルを素早く用意できる

## 利用方法と料金

**ChatGPT経由（一般ユーザー向け）**

| プラン | 料金 | DALL·E利用 |
|---|---|---|
| ChatGPT 無料 | 無料 | 制限付きで利用できる場合がある |
| ChatGPT Plus等 | 有料（詳細は公式参照） | 利用枠が拡大する場合がある |

- 利用可能回数・制限は時期・プラン・提供状況により変わる可能性があります
- 料金・プラン条件は変更される可能性があります
- **最新の条件はOpenAI公式ヘルプと料金ページをご確認ください**

**API経由（開発者向け）**
- 従量課金制（料金・条件は[OpenAI API料金ページ](https://openai.com/pricing)でご確認ください）
- **重要：** `dall-e-3` APIモデルは2026年5月12日にdeprecated・削除されました。API経由で利用する場合は後継の `gpt-image-1` / `gpt-image-2` 等への移行が必要です（[OpenAI deprecationsページ参照](https://developers.openai.com/api/docs/deprecations)）

## 商用利用前に確認すること

OpenAI公式情報上、DALL·E 3で生成した画像の商用利用ができる場合があります。ただし以下の点をご確認ください。

- 用途・生成内容・第三者の権利によって制限される場合があります
- OpenAIのポリシー変更により条件が変わる可能性があります
- 生成した画像に第三者の著作物・商標・人物が含まれる場合は別途確認が必要です
- このページは法的助言ではありません

商用利用前は必ず[OpenAI利用規約](https://openai.com/policies/usage-policies)の最新版をご確認ください。

[商用利用できるAI画像ツールを比較する](/conditions/commercial-use/) ／ [商用利用・著作権ガイド](/guides/commercial-use-copyright/)

## 人物・ブランド・ロゴ・第三者素材の注意点

- **実在の人物・著名人：** 肖像権の観点から別途確認が必要です
- **ブランドロゴ・商標：** 商標権の観点から商業利用には確認が必要です
- **第三者の著作物を参照した生成：** 著作権の観点から注意が必要です
- このページは情報提供を目的としており、法的助言ではありません

## 日本語対応

| 項目 | 状況 |
|---|---|
| 日本語UI | ChatGPTの日本語UIに準拠して利用できる場合あり |
| 日本語プロンプト | 一部対応（画像内テキスト生成は精度が低い傾向） |
| 日本語ドキュメント | 非対応 |

[日本語対応AIツールを比較する](/conditions/japanese/)

## 透かし（ウォーターマーク）

OpenAI公式情報によると、ChatGPT・Codex・OpenAI API経由で生成した画像には以下の2種類のプロベナンス情報が埋め込まれます。

- **C2PA（Coalition for Content Provenance and Authenticity）：** 不可視のメタデータと暗号署名。AI生成元の情報を画像に付帯する標準規格
- **SynthID（Google DeepMind製）：** 画像データ内に直接埋め込む不可視ウォーターマーク。スクリーンショット等の変換後も保持される場合がある

従来型の可視透かしとは異なります。生成画像が OpenAI製ツールによるものかどうかは [openai.com/research/verify/](https://openai.com/research/verify/) で確認可能です。最新の仕様は公式情報でご確認ください。

[透かしなしのAI画像ツールを比較する](/conditions/no-watermark/)

## 主な機能

| 機能 | 対応 |
|---|---|
| テキスト→画像生成 | あり |
| 画像→画像変換 | あり |
| インペインティング | あり |
| API提供 | あり（従量課金） |
| スタイルプリセット | なし |

## こんな人に向いている

- ChatGPTをすでに使っており、そのまま画像生成も試したい
- テキスト指示に忠実な画像生成が必要
- 日本語インターフェースで操作したい
- 開発・業務フローにAPI経由で組み込みたい
- SNS・ブログ・プレゼン用のビジュアルを素早く試作したい

## こんな人には向いていないかもしれない

- 高品質なアート・イラスト表現を優先したい（Midjourneyが候補）
- Adobe製品との連携を重視したい（Adobe Fireflyが候補）
- ゲームアセット・キャラクター素材を大量生成したい（Leonardo AIが候補）
- カスタマイズ性・ローカル実行を重視したい（Stable Diffusionが候補）

## 他ツールとの選び分け

| ツール | 向いているケース |
|---|---|
| [Midjourney](/tools/midjourney/) | 高品質なアート・イラスト・クリエイティブなビジュアル表現を重視する場合 |
| [Adobe Firefly](/tools/adobe-firefly/) | Adobe製品との連携や公式条件を確認しながら使いたい場合 |
| [Leonardo AI](/tools/leonardo-ai/) | イラスト・ゲーム素材・キャラクター制作の候補、無料枠から試したい場合 |
| [Canva AI画像生成](/tools/canva-ai-image-generator/) | Canvaのデザインフローの中でAI画像を使いたい場合 |
| [Stable Diffusion](/tools/stable-diffusion/) | カスタマイズ性・ローカル実行を重視する場合 |

## 比較・代替ツール

用途や予算・日本語対応の有無によって、他のツールも選択肢になります。

- [Midjourney](/tools/midjourney/)：高品質なアート・イラスト表現
- [Adobe Firefly](/tools/adobe-firefly/)：日本語UI対応、Adobe製品との連携
- [Leonardo AI](/tools/leonardo-ai/)：無料枠あり、ゲーム・イラスト・キャラクター向け
- [Canva AI画像生成](/tools/canva-ai-image-generator/)：デザイン制作フローに組み込みやすい
- [Stable Diffusion](/tools/stable-diffusion/)：オープンソース、ローカル実行可能

[DALLEとMidjourneyを比較する →](/comparisons/dalle-vs-midjourney/)

---

> **免責事項：** このページの情報は公式ソース（[DALL·E 3公式ページ](https://openai.com/dall-e-3)・[利用規約](https://openai.com/policies/usage-policies)・[API料金](https://openai.com/pricing)・[deprecations](https://developers.openai.com/api/docs/deprecations)）をもとに作成していますが、内容は変更される可能性があります。**`dall-e-3` APIモデルは2026年5月12日にdeprecatedされました。** API利用者はOpenAI公式ドキュメントで最新の移行先をご確認ください。法的助言ではありません。
