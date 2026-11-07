# AIクリエイティブナビ 画像・動画ツール一括拡張（2026-11-07）

## 選定結果

- 既存38件を正本とし、候補15件は既存slugと重複なし
- 画像系10件（うち画像・動画横断を含む）、動画系5件（うち画像・動画横断を含む）
- [PicLumen](https://www.piclumen.com/ja/)：画像生成・動画化。公式条件確認先 [料金](https://www.piclumen.com/pricing/) / [規約](https://www.piclumen.com/ja/terms-of-use/)。商用=paid-only、無料=limited。
- [ImagineArt](https://www.imagine.art/)：画像と動画の制作。公式条件確認先 [料金](https://www.imagine.art/pricing) / [規約](https://www.imagine.art/terms-and-conditions)。商用=unknown、無料=unknown。
- [getimg.ai](https://getimg.ai/)：画像生成・画像編集。公式条件確認先 [料金](https://getimg.ai/pricing) / [規約](https://getimg.ai/terms-of-service)。商用=unknown、無料=unknown。
- [Dzine AI](https://www.dzine.ai/)：画像デザイン・動画。公式条件確認先 [料金](https://www.dzine.ai/pricing/) / [規約](https://www.dzine.ai/terms-of-service/)。商用=limited、無料=unknown。
- [Scenario](https://www.scenario.com/)：ゲーム・キャラクター素材。公式条件確認先 [料金](https://www.scenario.com/pricing) / [規約](https://www.scenario.com/terms-of-service)。商用=unknown、無料=limited。
- [NovelAI Diffusion](https://novelai.net/)：アニメ・イラスト。公式条件確認先 [料金](https://novelai.net/) / [規約](https://novelai.net/terms)。商用=unknown、無料=unknown。
- [PixAI](https://pixai.art/)：アニメ画像。公式条件確認先 [料金](https://pixai.art/) / [規約](https://pixai.art/terms)。商用=unknown、無料=unknown。
- [PromeAI](https://www.promeai.pro/)：建築・デザイン。公式条件確認先 [料金](https://www.promeai.pro/) / [規約](https://www.promeai.pro/ja/commercial)。商用=limited、無料=unknown。
- [Pixelcut](https://www.pixelcut.ai/)：商品写真。公式条件確認先 [料金](https://www.pixelcut.ai/pricing) / [規約](https://www.pixelcut.ai/terms-of-service)。商用=unknown、無料=unknown。
- [Pebblely](https://pebblely.com/)：EC商品写真。公式条件確認先 [料金](https://pebblely.com/pricing/) / [規約](https://pebblely.com/terms/)。商用=unknown、無料=unknown。
- [Pollo AI](https://pollo.ai/)：AI動画生成。公式条件確認先 [料金](https://pollo.ai/pricing) / [規約](https://pollo.ai/terms-of-service)。商用=unknown、無料=unknown。
- [Grok Imagine](https://grok.com/imagine)：画像・動画生成。公式条件確認先 [料金](https://grok.com/subscription/imagine) / [規約](https://x.ai/legal/terms-of-service)。商用=unknown、無料=unknown。
- [LTX Studio](https://ltx.studio/)：動画制作・絵コンテ。公式条件確認先 [料金](https://website.ltx.studio/studio/pricing) / [規約](https://ltx.studio/terms-of-use)。商用=unknown、無料=unknown。
- [Hedra](https://www.hedra.com/)：キャラクター動画。公式条件確認先 [料金](https://www.hedra.com/) / [規約](https://www.hedra.com/terms-of-service)。商用=unknown、無料=unknown。
- [Kaiber](https://kaiber.ai/)：映像アニメーション。公式条件確認先 [料金](https://helpcenter.kaiber.ai/en/articles/6291249-kaiber-plans-what-you-need-to-know) / [規約](https://kaiber.ai/terms)。商用=unknown、無料=unknown。

## 根拠と未検証条件

- 新規ツールの掲載数と商用利用条件を混同しない。PicLumenは公式2026年11月の料金FAQで無料Basic商用不可、有料Liteは限定、Standard以上は拡張と確認できるが、古いTermsに相違がある。
- Dzine有料料金表のCommercial Use表示と無料利用条件は異なる。
- Scenarioは公式料金ページでStarter $15、Pro $45、Max $75と50日次無料クレジット表示。商用ライセンスは未検証。
- その他は不確定な料金額、権利、日本向けUIを断定しない。公式サイトの製品機能をベースにした基本掲載。
- 全件、独自生成作品未制作、実機検証未実施。アフィリエイト提携の有無・実績も未検証。
- データベース上の比較表示で「要確認」は積極的に表示し、未確認を無料・商用可と推測しない。

## 既存から除外（重複）

OpenArt、Krea AI、Google Flow、Higgsfield AI、Dreamina、Midjourney、Recraft、Runwayなどは既存38件に含まれるため追加対象外。

## 実装安全範囲

新規Tool MDと公式URL台帳・タスク文書のみ。画像作例・動画ファイル・GA4/Clarity・アフィリエイト・既存専用ルート・配置デザインは変更しない。現行Fotorタスクとの並走を避けるため、このブランチに限りpause。masterは無変更。
