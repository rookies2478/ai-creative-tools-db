---
name: "Clipdrop"
shortDescription: "背景削除・画像拡張・アップスケール・不要物削除・文字削除などのAI画像編集機能を中心に使えるオールインワン型ツール。text-to-image生成機能（Stable Diffusion XL）もありますが、管理者環境では有料版でのみ利用できる状態を確認しました。最新の利用条件は公式サイトをご確認ください。"
category: "image"
officialUrl: "https://clipdrop.co/"
freePlan: "limited"
freePlanNote: "無料枠では一部の画像編集系機能を試せる場合があります。公式料金ページではBackground Removal（20回/24時間）・Image Upscaler x2（20回/24時間）・Cleanup（20回/24時間）・Relight（20回/24時間）・Text Remover（50回/24時間）などの無料利用枠が示されています。ただし、管理者環境ではtext-to-image生成（Stable Diffusion XL）は有料版でのみ利用できる状態を確認しました。対象機能や回数は変更される場合があるため、最新情報は公式サイトをご確認ください。"
commercialUse: "unknown"
commercialUseNote: "公式Terms（https://clipdrop.co/terms-visitor）ではサービス利用条件を確認できますが、生成・編集した画像の商用利用可否や権利関係については確認時点で断定しにくい状況です。また、2024年にClipdropはJasper.aiに統合されており、clipdrop.co 上の利用規約条件とJasper API側の条件が異なる可能性があります。特にAPIを利用する場合は、Jasper API側の利用規約も合わせて確認が必要です。商用利用を前提にする場合は、最新の公式Terms・元画像の権利・第三者権利を必ず確認してください。本記事は法的助言ではありません。"
japaneseUi: false
japanesePrompt: false
watermark: "unknown"
watermarkCondition: "Freeプランの透かし有無は機能・プランにより異なる可能性があります。最新の条件は公式画面でご確認ください。"
bestFor:
  - "背景削除"
  - "商品画像の加工"
  - "SNS画像の作成"
  - "広告バナーの素材編集"
  - "画像拡張（アウトペインティング）"
  - "不要物削除（Cleanup）"
  - "画像アップスケール"
  - "EC用画像編集"
strengths:
  - "背景削除・不要物削除・アップスケール・Relightなど画像編集系AI機能が多数揃っている"
  - "ブラウザ上で使えるためインストール不要"
  - "Freeプランで主要機能の一部を試せる（Background Removal等20回/24時間）"
  - "背景削除や不要物削除など実務向けの機能が充実している"
  - "Jasper傘下でサービス継続中（2024年以降）"
weaknesses:
  - "商用利用・権利関係は公式Terms確認が必要であり断定できない"
  - "アップロードする元画像の著作権・権利確認が必要"
  - "無料枠や機能制限は変更される可能性がある"
  - "日本語UI・日本語プロンプト対応は公式情報のみでは確認できない"
  - "2024年にJasperに統合されAPIがJasper APIに移行しており、今後の方針変更リスクがある"
  - "Proプランの料金が公式サイトで非表示となっており、価格確認にはサービス内ログインが必要な可能性がある"
lastReviewed: "2026-06-21"
nextReviewDue: "2026-07-21"
verifiedAt: "2026-06-08"
officialSourceUrl: "https://clipdrop.co/pricing"
pricingSourceUrl: "https://clipdrop.co/pricing"
pricingSourceNote: "公式料金ページ（clipdrop.co/pricing）。Freeプランは案内されているが、Proプランの料金は「--per month」表示で金額非開示（2026-06-21確認）。2024年にJasper AI傘下に統合済み。currency・月額は要公式確認。"
pricingModel: "subscription"
pricingStatus: "partial"
platforms:
  - web
  - api
signupRequired: true
features:
  textToImage: true
  backgroundRemoval: true
  inpainting: true
  outpainting: true
  upscale: true
  apiAvailable: true
useCases:
  - product_image
  - sns
  - ad_creative
  - design
  - business
limitations:
  - "商用利用可否・権利関係は公式Termsで確認が必要"
  - "Freeプランは機能ごとに20〜50回/24時間の利用制限あり"
  - "無料枠の回数・対象機能は変更される可能性がある"
  - "日本語UIは公式情報のみでは確認不可"
  - "2024年のJasper統合によりAPIがJasper APIに移行済み"
  - "Proプランの料金は公式サイトで現在非表示"
usagePolicy:
  inputMaterialRisk: "medium"
  inputMaterialNote: "背景削除・アップスケール・不要物削除など、主要機能はすべて画像アップロードが前提。weaknessesにて「アップロードする元画像の著作権・権利確認が必要」と明記されている。元画像に人物・商標・第三者著作物が含まれる場合は別途確認が必要（clipdrop.co/terms-visitor）。"
reviewed:
  pricing: "2026-06-21"
  terms: "2026-05-14"
  features: "2026-06-06"
sourceRefs:
  - label: "Clipdrop公式サイト"
    url: "https://clipdrop.co/"
    type: official
  - label: "Clipdropツール一覧（公式）"
    url: "https://clipdrop.co/tools"
    type: official
  - label: "Clipdrop料金プラン（公式）"
    url: "https://clipdrop.co/pricing"
    type: pricing
  - label: "Clipdrop利用規約（公式）"
    url: "https://clipdrop.co/terms-visitor"
    type: terms
  - label: "Clipdropプライバシーポリシー（公式）"
    url: "https://clipdrop.co/privacy"
    type: policy
  - label: "Clipdrop API（公式）"
    url: "https://clipdrop.co/apis"
    type: docs
sources:
  - title: "Clipdrop公式サイト"
    url: "https://clipdrop.co/"
  - title: "Clipdropツール一覧（公式）"
    url: "https://clipdrop.co/tools"
  - title: "Clipdrop料金プラン（公式）"
    url: "https://clipdrop.co/pricing"
  - title: "Clipdrop利用規約（公式）"
    url: "https://clipdrop.co/terms-visitor"
  - title: "Clipdropプライバシーポリシー（公式）"
    url: "https://clipdrop.co/privacy"
  - title: "Clipdrop API（公式）"
    url: "https://clipdrop.co/apis"
faqs:
  - question: "無料で使えますか？"
    answer: "公式料金ページではFreeプランが案内されており、Background Removal・Image Upscaler・Cleanup・Relightなどの画像編集系機能を試せる枠が示されています。ただし、管理者環境ではtext-to-image生成（Stable Diffusion XL）は有料版でのみ利用できる状態を確認しました。対象機能や利用回数は変更される可能性があるため、最新の状況はClipdrop公式サイトでご確認ください。"
  - question: "商用利用できますか？"
    answer: "公式Terms（https://clipdrop.co/terms-visitor）ではサービス利用条件を確認できますが、生成・編集した画像の商用利用可否や権利関係については確認時点で断定しにくい状況です。商用利用を前提にする場合は最新の公式Termsをご確認ください。このページは法的助言ではありません。"
  - question: "日本語で使えますか？"
    answer: "日本語UIについては公式情報のみでは明確に確認できません。日本語プロンプトについては、公式FAQで入力を「English text」と案内しており非対応です（英語プロンプトの利用を推奨します）。最新の状況はClipdrop公式サイトをご確認ください。"
  - question: "透かしは入りますか？"
    answer: "Freeプランの透かし有無は機能・プランにより異なる可能性があります。最新の条件はClipdrop公式画面でご確認ください。"
  - question: "APIはありますか？"
    answer: "Clipdrop APIが提供されており、背景削除・アップスケールなどの機能を外部から呼び出せます。詳細はhttps://clipdrop.co/apisをご確認ください。"
  - question: "どの環境で使えますか？"
    answer: "Webブラウザから利用できます。インストールは不要です。APIを通じた開発者向け連携にも対応しています。"
  - question: "無料プランの利用回数制限はありますか？"
    answer: "公式料金ページでは、Background Removal・Cleanup・Relightが20回/24時間、Text Removerが50回/24時間といった利用上限が案内されています。ただし制限内容は変更される可能性があるため、最新の条件は公式サイトでご確認ください。"
  - question: "JasperとClipdropの関係は何ですか？"
    answer: "Clipdropは2023年にStability AIに買収され、2024年にJasper.aiに統合されました。現在もclipdrop.co でサービスは継続されていますが、APIはJasper APIに移行しています。今後のサービス方針については公式アナウンスをご確認ください。"
japanBilling:
  providerName: "Jasper.ai（2024年2月にStability AIから移管）"
  providerCountry: "米国（要公式確認）"
  isJapaneseService: false
  pricingUrl: "https://clipdrop.co/pricing"
  billingCurrency: "要公式確認"
  jpyDirectBilling: "unknown"
  localizedJpyDisplay: false
  taxDisplay: "unknown"
  purchaseChannels: ["web", "api"]
  pricingCheckedAt: "2026-07-13"
  pricingNote: "運営は現在Jasper.ai（公式サイトに移管経緯の記載あり）。Proサブスクリプションの金額・通貨は公式料金ページ上で動的表示のため要公式確認です。最新の価格・通貨・税は公式購入画面をご確認ください。"
  billingCategory: "E"
  sourceUrls:
    - "https://clipdrop.co/"
    - "https://clipdrop.co/pricing"
---

## Clipdropとは

Clipdropは、背景削除・画像拡張・アップスケール・不要物削除・文字削除などのAI画像編集機能を中心に使えるオールインワン型ツールです。インストール不要でWebブラウザからアクセスでき、Freeプランで画像編集系機能の一部を試すことができます。ECサイトの商品画像加工・SNS素材の編集・広告バナーの制作など、実務向けの用途に向いています。なお、管理者環境ではtext-to-image生成機能（Stable Diffusion XL）は有料版でのみ利用できる状態を確認しました。最新の利用条件は公式サイトでご確認ください。

> **サービス体制について：** Clipdropは2023年にStability AIに買収され、2024年にJasper.aiに統合されました。現在も[clipdrop.co](https://clipdrop.co/)でサービスは継続されていますが、APIはJasper APIに移行しています。今後のサービス方針については公式アナウンスをご確認ください。
>
> **⚠️ 商用利用条件の注意：** clipdrop.co 上の利用規約（Clipdrop Terms）と、Jasper API側の利用規約は内容が異なる可能性があります。API経由での利用・大量処理・商用利用を前提にする場合は、[Clipdrop利用規約](https://clipdrop.co/terms-visitor)とJasper API側の規約の両方を確認することを推奨します。本記事は法的助言ではありません。

## 主な機能

- **Background Removal（背景削除）** — 画像の背景を自動で削除
- **Image Upscaler（高解像度化）** — 低解像度画像を高解像度に拡大
- **Cleanup（不要物削除）** — 写り込んだ不要なオブジェクトや人物を削除
- **Text Remover（文字削除）** — 画像内のテキストを削除
- **Relight（再ライティング）** — 画像の光源を調整・再構成
- **Stable Diffusion XL（画像生成）** — テキストプロンプトから画像を生成（管理者環境では有料版でのみ利用できる状態を確認。最新条件は公式サイトをご確認ください）
- **Uncrop（画像拡張）** — 画像の外側を生成して拡張
- **Sky Replacer（空の置き換え）** — 写真内の空を置き換え
- **API提供** — 各機能をAPIから呼び出し可能（開発者向け）

## 向いている用途

- ECサイト・商品ページ向けの商品画像の背景削除・加工
- SNS投稿用画像の編集・リサイズ・不要物削除
- 広告バナー・チラシ素材の画像編集
- 低解像度素材のアップスケール
- 写真内の不要な写り込みや文字の削除
- 画像の外側を生成して構図を広げたい場合
- APIを利用した画像処理の自動化

## 無料プラン・料金・利用回数に関する注意点

公式料金ページ（https://clipdrop.co/pricing）ではFreeプランとPro（有料）プランが案内されています。

> **注意：** Freeプランで利用できる機能の種類・利用回数・制限は変更される可能性があります。最新の料金・利用条件は[Clipdrop公式料金ページ](https://clipdrop.co/pricing)でご確認ください。

- **Background Removal：** 20回/24時間（無料枠）
- **Image Upscaler x2：** 20回/24時間（無料枠）
- **Cleanup：** 20回/24時間（無料枠）
- **Relight：** 20回/24時間（無料枠）
- **Text Remover：** 50回/24時間（無料枠）
- 有料プランへのアップグレードで制限が緩和される場合があります
- Proプランの具体的な料金は2026年6月時点で公式サイト上に表示されていないため、最新情報は公式サイトでご確認ください
- 料金・プラン内容は予告なく変更される可能性があります

## 商用利用・著作権・元画像の権利に関する注意点

[Clipdrop利用規約](https://clipdrop.co/terms-visitor)ではサービス利用条件を確認できますが、生成・編集した画像の商用利用可否や権利関係については、確認時点で断定しにくい状況です。

商用利用を検討する際は、以下の確認が必要です。

- [Clipdrop利用規約](https://clipdrop.co/terms-visitor)の最新内容と商用利用に関する条件
- アップロードする元画像の著作権・使用権（第三者素材を使用する場合は特に注意）
- 生成・編集した成果物の権利帰属と利用範囲

> **画像編集系ツールの注意点：** アップロードする元画像の権利確認も重要です。自分で撮影した写真や権利を持つ素材のみを使用してください。

> **免責事項：** このページは情報提供を目的としており、法的助言ではありません。商用利用や権利関係を前提にする場合は、最新の[公式Terms](https://clipdrop.co/terms-visitor)と元画像の権利をご確認ください。

## 日本語対応に関する確認メモ

- **日本語UI：** 公式情報のみでは日本語UI対応を明確に確認できません。実際の画面は[Clipdrop公式サイト](https://clipdrop.co/)でご確認ください。
- **日本語プロンプト：** 公式FAQでは画像生成のプロンプト入力を「English text」と案内しており、日本語プロンプトの公式対応は確認できません（非対応）。画像生成機能（Stable Diffusion XL）を使用する場合は英語プロンプトの利用を推奨します。

## 透かしに関する確認メモ

Freeプランの透かし（ウォーターマーク）の有無は機能・プランにより異なる可能性があります。公式情報のみでは全機能の透かし条件を断定できません。**最新の条件はClipdrop公式画面でご確認ください。**

## どんな人に向いているか

- **ECサイト運営者・ネットショップオーナー** — 商品画像の背景削除や不要物削除を効率化したい場合
- **SNS担当者・マーケター** — 広告バナーやSNS素材の画像編集を手軽に行いたい場合
- **フォトグラファー・デザイナー** — 写真の不要物削除・アップスケール・Relightを活用したい場合
- **開発者** — APIを通じて画像編集処理を自動化・アプリに組み込みたい場合
- **複数のAI画像編集機能を一箇所で試したい**ユーザー

インストール不要でブラウザからすぐ使えるため、特定の画像編集タスクを手軽に試したい場合にも適しています。

## FAQ

**Q. 無料で使えますか？**
公式料金ページではFreeプランが案内されており、主要機能の一部を無料で試せる枠が示されています。ただし利用回数・対象機能・制限は変更される可能性があるため、最新の状況は[Clipdrop公式料金ページ](https://clipdrop.co/pricing)でご確認ください。

**Q. 商用利用できますか？**
公式Termsではサービス利用条件を確認できますが、生成・編集した画像の商用利用可否や権利関係については断定しにくい状況です。商用利用を前提にする場合は最新の[公式Terms](https://clipdrop.co/terms-visitor)をご確認ください。このページは法的助言ではありません。

**Q. 日本語で使えますか？**
日本語UIについては公式情報のみでは明確に確認できません。日本語プロンプトについては、公式FAQで入力を「English text」と案内しており非対応です（英語プロンプトの利用を推奨します）。実際の画面は[Clipdrop公式サイト](https://clipdrop.co/)でご確認ください。

**Q. 透かしは入りますか？**
Freeプランの透かし有無は機能・プランにより異なる可能性があります。最新の条件は[Clipdrop公式画面](https://clipdrop.co/pricing)でご確認ください。

**Q. APIはありますか？**
APIが提供されており、背景削除・アップスケールなどの機能を開発者がプログラムから呼び出せます。詳細は[Clipdrop API公式ページ](https://clipdrop.co/apis)をご確認ください。

**Q. 元画像の権利は確認が必要ですか？**
はい。アップロードする元画像の著作権・使用権の確認が必要です。第三者が権利を持つ画像を無断でアップロードしないよう注意してください。

**Q. 無料プランの利用回数制限はありますか？**
公式料金ページでは、Background Removal・Cleanup・Relightが20回/24時間、Text Removerが50回/24時間といった利用上限が案内されています。ただし制限内容は変更される可能性があるため、最新の条件は[公式料金ページ](https://clipdrop.co/pricing)でご確認ください。

**Q. JasperとClipdropの関係は何ですか？**
Clipdropは2023年にStability AIに買収され、2024年にJasper.aiに統合されました。現在も[clipdrop.co](https://clipdrop.co/)でサービスは継続されていますが、APIはJasper APIに移行しています。今後のサービス方針については公式アナウンスをご確認ください。
