---
name: "DALL·E"
slug: "dalle"
category: "image"
officialUrl: "https://openai.com/dall-e-3"
freePlan: "limited"
lowestPaidPlan: "有料プランで利用枠が拡大する場合があります（例：ChatGPT Plus等）"
currency: "USD"
commercialUse: "yes"
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
lastReviewed: "2026-05-04"
nextReviewDue: "2026-08-04"
pricingModel: "subscription_credit"
freePlanNote: "ChatGPT無料プランで制限付き利用できる場合あり"
paidPlanNote: "ChatGPT Plus等の有料プランで利用枠が拡大。API利用は従量課金。"
platforms:
  - web
  - api
signupRequired: true
features:
  textToImage: true
  imageToImage: true
  inpainting: true
  apiAvailable: true
watermarkCondition: "C2PAメタデータ（不可視）が埋め込まれる場合あり"
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
  pricing: "2026-05-04"
  terms: "2026-05-04"
  features: "2026-05-04"
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
sources:
  - title: "DALL·E 3 公式ページ（OpenAI）"
    url: "https://openai.com/dall-e-3"
  - title: "OpenAI 利用規約（公式）"
    url: "https://openai.com/policies/usage-policies"
  - title: "OpenAI API 料金（公式）"
    url: "https://openai.com/pricing"
faqs:
  - question: "無料で使えますか？"
    answer: "ChatGPTの無料プランで制限付きの利用ができる場合があります。利用可能回数はプランや時期により変わる可能性があるため、最新の状況はOpenAI公式ヘルプをご確認ください。"
  - question: "商用利用できますか？"
    answer: "OpenAI公式情報上、生成画像の商用利用ができる場合があります。用途・生成内容・第三者の権利により制限される場合があるため、利用前に最新の利用規約をご確認ください。このページは法的助言ではありません。"
  - question: "日本語で使えますか？"
    answer: "ChatGPT経由のためChatGPTの日本語UIに準拠して利用できる場合があります。日本語プロンプトも一部対応していますが、画像内への日本語テキスト生成は精度が低い傾向があります。"
  - question: "透かしは入りますか？"
    answer: "従来型の可視透かしは付与されませんが、C2PA標準の不可視メタデータが埋め込まれる場合があります。最新の仕様は公式情報でご確認ください。"
  - question: "どの環境で使えますか？"
    answer: "ChatGPT経由（Web）とOpenAI API経由での利用が可能です。APIは別途従量課金です。"
---

## DALL·Eとは

DALL·EはOpenAIが開発したAI画像生成モデル。現行バージョンはDALL·E 3で、ChatGPTと統合されており、テキストから画像を生成できます。プロンプトへの忠実度が高いとされ、指示に沿った画像を生成しやすい傾向があります。

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

## 商用利用について

OpenAI公式情報上、DALL·E 3で生成した画像の商用利用ができる場合があります。ただし以下の点にご注意ください。

- 用途・生成内容・第三者の権利によって制限される場合があります
- OpenAIのポリシー変更により条件が変わる可能性があります

> **免責事項：** このページは情報提供を目的としており、法的助言ではありません。商用利用前は必ず[OpenAI利用規約](https://openai.com/policies/usage-policies)の最新版をご確認ください。

## 日本語対応

- **日本語UI：** ChatGPT経由のため、ChatGPTの日本語インターフェースに準拠して利用できる場合があります
- **日本語プロンプト：** 一部対応。日本語のプロンプトを理解して画像を生成できる場合がありますが、画像内への日本語テキスト生成は精度が低い傾向があります。

## 透かし（ウォーターマーク）

C2PA（Coalition for Content Provenance and Authenticity）標準の不可視メタデータが生成画像に埋め込まれる場合があります。画像の見た目を大きく損なうような従来型の透かしとは異なりますが、AI生成を示す情報が含まれる場合があります。最新の仕様はOpenAI公式情報でご確認ください。

