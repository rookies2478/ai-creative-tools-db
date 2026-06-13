---
name: "DreamStudio"
shortDescription: "Stability AI公式のStable Diffusion系画像生成サービス。ブラウザ上でプロンプト・ネガティブプロンプト・画像サイズを調整して画像生成できる。"
category: "image"
officialUrl: "https://dreamstudio.ai/"
freePlan: false
commercialUse: "limited"
commercialUseNote: "DreamStudioの利用規約では、ユーザーがプロンプト・生成コンテンツ・共有結果について責任を負うとされています。Stability AIのライセンス条件やAcceptable Use Policyの確認が必要です。商用利用を前提にする場合は、最新の公式規約・ライセンスをご確認ください。本記事は法的助言ではありません。"
japaneseUi: false
japanesePrompt: true
watermark: "unknown"
bestFor:
  - "Stable Diffusion系の画像生成"
  - "コンセプトアートの制作"
  - "ブログ用画像の生成"
  - "SNS画像の作成"
  - "広告・販促ビジュアルのラフ案"
  - "プロンプト調整を使った画像生成の検証"
strengths:
  - "Stable Diffusion系モデルをブラウザから利用できる"
  - "ネガティブプロンプトや画像サイズなど詳細設定が調整しやすい"
  - "Stability AI公式系のサービスで信頼性が高い"
  - "プロンプトの検証・実験用途に向いている"
weaknesses:
  - "料金・クレジット条件が変更される可能性がある"
  - "商用利用時はライセンス・禁止事項・第三者権利の確認が必要"
  - "日本語UIは公式情報のみでは確認できない"
  - "初心者には設定項目がやや多く感じる場合がある"
lastReviewed: "2026-06-13"
nextReviewDue: "2026-07-13"
verifiedAt: "2026-06-13"
officialSourceUrl: "https://stability.ai/ds-tos"
pricingModel: "credit"
platforms:
  - web
signupRequired: true
features:
  textToImage: true
  imageToImage: true
  inpainting: true
  stylePresets: true
  apiAvailable: true
watermarkCondition: "公式情報のみでは透かしの有無・条件を断定できません。最新の条件は公式サイトでご確認ください。"
useCases:
  - illustration
  - sns
  - ad_creative
  - blog
  - design
limitations:
  - "料金・クレジット条件は予告なく変更される可能性がある"
  - "商用利用時はStability AIライセンス・Acceptable Use Policyの確認が必要"
  - "日本語UIは公式情報のみでは確認不可"
reviewed:
  pricing: "2026-05-14"
  terms: "2026-05-14"
  features: "2026-05-14"
sourceRefs:
  - label: "DreamStudio公式サイト"
    url: "https://dreamstudio.ai/"
    type: official
  - label: "DreamStudio利用規約（Stability AI公式）"
    url: "https://stability.ai/ds-tos"
    type: terms
  - label: "Stability AIライセンス（公式）"
    url: "https://stability.ai/license"
    type: policy
  - label: "Stability AI Acceptable Use Policy（公式）"
    url: "https://stability.ai/acceptable-use-policy"
    type: policy
  - label: "Stability AIプライバシーポリシー（公式）"
    url: "https://stability.ai/privacy-policy"
    type: policy
sources:
  - title: "DreamStudio公式サイト"
    url: "https://dreamstudio.ai/"
  - title: "DreamStudio利用規約（Stability AI公式）"
    url: "https://stability.ai/ds-tos"
  - title: "Stability AIライセンス（公式）"
    url: "https://stability.ai/license"
  - title: "Stability AI Acceptable Use Policy（公式）"
    url: "https://stability.ai/acceptable-use-policy"
  - title: "Stability AIプライバシーポリシー（公式）"
    url: "https://stability.ai/privacy-policy"
faqs:
  - question: "無料で使えますか？"
    answer: "無料枠や初回クレジットの有無は変更される可能性があります。最新の状況はDreamStudio公式サイトでご確認ください。"
  - question: "商用利用できますか？"
    answer: "DreamStudioの利用規約では、ユーザーがプロンプト・生成コンテンツ・共有結果について責任を負うとされています。Stability AIのライセンス条件やAcceptable Use Policyの確認が必要です。商用利用を前提にする場合は、最新の公式規約・ライセンスをご確認ください。このページは法的助言ではありません。"
  - question: "日本語プロンプトは使えますか？"
    answer: "日本語プロンプトでも使える場合がありますが、Stable Diffusion系では英語プロンプトの方が意図が安定しやすい傾向があります。"
  - question: "透かしは入りますか？"
    answer: "公式情報のみでは透かしの有無・条件を断定できません。最新の条件はDreamStudio公式サイトでご確認ください。"
  - question: "Stable Diffusionと何が違いますか？"
    answer: "DreamStudioはStability AIが提供するブラウザ操作のサービスで、ローカル環境の構築なしにStable Diffusion系モデルを利用できます。ローカル版のStable Diffusionと比べてセットアップ不要で手軽に始められますが、クレジット消費制の有料サービスです。"
  - question: "どの環境で使えますか？"
    answer: "Webブラウザから利用できます。ローカル環境の構築やインストールは不要です。"
---

## DreamStudioとは

DreamStudioはStability AIが提供するAI画像生成サービスです。ブラウザ上でプロンプト・ネガティブプロンプト・画像サイズ・ステップ数などのパラメータを調整しながらStable Diffusion系モデルで画像を生成できます。ローカル環境の構築なしにStable Diffusionを試したいユーザーや、プロンプト調整の実験用途に向いています。

## 主な機能

- テキストから画像生成（Text to Image）
- 画像から画像生成（Image to Image）
- インペインティング（部分修正）
- ネガティブプロンプトによる除外設定
- 画像サイズ・ステップ数・CFGスケールなどのパラメータ調整
- APIアクセス（Stability AI API）

## Stable Diffusionとの関係

DreamStudioはStable Diffusionの開発元であるStability AIが提供する公式ブラウザサービスです。ローカルにStable DiffusionをインストールしなくてもブラウザからStable Diffusion系モデルを利用できます。一方、ローカル版のStable Diffusionと比べてカスタマイズ性は低く、利用にはクレジットが必要です。

## 向いている用途

- Stable Diffusion系モデルの動作をブラウザで手軽に確認したい場合
- コンセプトアート・イメージボードの制作
- ブログ・SNS用のオリジナル画像生成
- 広告・販促ビジュアルのラフ案作成
- プロンプトやパラメータの効果を検証したい場合

## 無料枠・料金・クレジットに関する注意点

DreamStudioはクレジット消費制のサービスです。

> **注意：** 無料枠や初回クレジットの有無・数量は変更される可能性があります。最新の料金・クレジット条件は[DreamStudio公式サイト](https://dreamstudio.ai/)でご確認ください。

## 商用利用・著作権・ライセンスに関する注意点

[DreamStudio利用規約](https://stability.ai/ds-tos)では、ユーザーがプロンプト・生成コンテンツ・共有結果について責任を負うとされています。

商用利用を検討する際は、以下の確認が必要です。

- [Stability AIライセンス](https://stability.ai/license)の内容と商用利用条件
- [Acceptable Use Policy](https://stability.ai/acceptable-use-policy)の禁止事項
- 第三者の権利・素材を使用する場合の権利確認

> **免責事項：** このページは情報提供を目的としており、法的助言ではありません。商用利用前は最新の公式規約・ライセンスをご確認ください。

## 日本語プロンプトに関する確認メモ

日本語プロンプトでも使える場合がありますが、Stable Diffusion系モデルは英語データで学習されている割合が高いため、**英語プロンプトの方が意図した画像に近い結果が得られやすい傾向があります**。日本語でプロンプトを入力する際は、意図通りに生成されない場合は英語プロンプトも試してみることをお勧めします。

## 透かしに関する確認メモ

公式情報のみでは、生成画像への透かし（ウォーターマーク）の有無・条件を断定できません。プランや仕様の変更により条件が変わる可能性があります。最新の状況は[DreamStudio公式サイト](https://dreamstudio.ai/)でご確認ください。

## どんな人に向いているか

- ローカル環境を構築せずに**Stable Diffusion系モデルを試してみたい**人
- **プロンプトやパラメータ調整**を細かく実験したいユーザー
- コンセプトアートやイメージボード作成に使いたいクリエイター
- Stability AI公式系のサービスを使いたい人

ローカル版Stable Diffusionの経験者がブラウザでの手軽な検証に使う場合にも適しています。一方、無料で始めたい場合は最新の公式情報で無料枠の有無を確認してください。

## FAQ

**Q. 無料で使えますか？**
無料枠や初回クレジットの有無・数量は変更される可能性があります。最新の状況は[DreamStudio公式サイト](https://dreamstudio.ai/)でご確認ください。

**Q. 商用利用できますか？**
DreamStudioの利用規約では、ユーザーがプロンプト・生成コンテンツ・共有結果について責任を負うとされています。Stability AIのライセンス条件やAcceptable Use Policyの確認が必要です。商用利用を前提にする場合は最新の[公式規約・ライセンス](https://stability.ai/ds-tos)をご確認ください。このページは法的助言ではありません。

**Q. Stable Diffusionとは何が違いますか？**
DreamStudioはStability AI公式のブラウザサービスで、ローカル環境の構築なしにStable Diffusion系モデルを利用できます。セットアップ不要で手軽ですが、クレジット消費制の有料サービスです。

**Q. 日本語プロンプトは使えますか？**
日本語プロンプトでも使える場合がありますが、Stable Diffusion系では英語プロンプトの方が意図が安定しやすい傾向があります。

**Q. 透かしは入りますか？**
公式情報のみでは断定できません。最新の条件は公式サイトでご確認ください。

**Q. どの環境で使えますか？**
Webブラウザから利用できます。ローカル環境の構築やインストールは不要です。
