---
name: "Stable Diffusion"
slug: "stable-diffusion"
category: "image"
officialUrl: "https://stability.ai"
freePlan: true
currency: "USD"
commercialUse: "limited"
commercialUseNote: "モデルバージョンによってライセンスが異なります。SD 1.x/2.x（CreativeML Open RAIL-M）は条件付きで商用利用できる場合があります。SD 3.x以降（Stability AI Community License）は年間総収益100万ドル未満の場合に商用利用できる場合があるとされています。100万ドル以上はエンタープライズライセンスが必要とされています。ライセンス条件は変更される可能性があるため、利用するモデルのライセンスを必ず最新情報でご確認ください。"
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
lastReviewed: "2026-05-04"
nextReviewDue: "2026-08-04"
sources:
  - title: "Stability AI ライセンスページ（公式）"
    url: "https://stability.ai/license"
  - title: "Stability AI 公式サイト"
    url: "https://stability.ai"
  - title: "Stable Diffusion GitHub（CompVis）"
    url: "https://github.com/CompVis/stable-diffusion"
  - title: "AUTOMATIC1111 Web UI（GitHub）"
    url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui"
---

## Stable Diffusionとは

Stability AIが開発・公開したオープンソースのAI画像生成モデル。モデルウェイトが公開されているため、ローカル環境（自分のPC）で無料で実行できます。AUTOMATIC1111 Web UIやComfyUIなどのフロントエンドツールと組み合わせて使われることが多く、カスタムモデル・LoRAを活用した高度な生成が可能です。

## 料金

- **ローカル実行：** 無料（要GPU搭載PC・環境構築）
- **クラウドサービス経由：** Stability AIのDream Studioなど有料サービスを利用する場合は別途費用が発生します

## 商用利用について

**利用するモデルのバージョンによってライセンスが異なります。** 必ず使用するモデルのライセンスを個別に確認してください。

| モデル系統 | ライセンス | 商用利用 |
|---|---|---|
| SD 1.x / 2.x | CreativeML Open RAIL-M | 条件付きで可能な場合あり |
| SD 3.x 以降 | Stability AI Community License | 年間収益100万ドル未満は可能な場合がある（条件確認要）。100万ドル以上はエンタープライズ契約が必要とされている |

- 違法・差別的・危険なコンテンツの生成は禁止されています
- コミュニティ公開のカスタムモデルはそれぞれ独自のライセンスを持つ場合があります
- ライセンス条件は変更される可能性があります

> **免責事項：** このページは情報提供を目的としており、法的助言ではありません。商用利用前は[Stability AI公式ライセンスページ](https://stability.ai/license)および使用するモデルのライセンスを必ずご確認ください。

## 日本語対応

- **日本語UI：** 一部対応。AUTOMATIC1111 Web UIでは日本語化拡張機能を導入することで日本語UIにできる場合があります
- **日本語プロンプト：** 一部対応。ネイティブでは英語プロンプトの精度が高く、日本語プロンプトは翻訳拡張機能の利用が推奨される場合があります

## 透かし（ウォーターマーク）

Stable Diffusionの一部バージョン・実装では、人間の目には見えない不可視の透かし（invisible watermark）が生成画像に埋め込まれる場合があるとされています。SDXLなど一部モデルでは可視的なアーティファクトが報告されたケースもあります。詳細な仕様は利用するバージョン・実装ごとに異なる場合があります。
