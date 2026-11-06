# 既存32ツール：日本向け公式情報・整合性監査（2026-11-06）

- Issue: #61 / 対象リポジトリ: `rookies2478/ai-creative-tools-db`
- 対象: 2026-11-06現在の `src/content/tools` 38件のうち、前回追加した6件を除く既存32件。
- 方法: **32件全ての正本DBを直接確認**し、公開されている公式サイト/料金/規約（日本語表示がある場合は日本語ページを優先）と照合。専用Astroページは主要ページを抽出して重複文言も点検。
- 重要な限定: 本監査は公開情報を用いる**一次スクリーニング＋確定差分修正**。すべてのアカウントへログインしたプラン契約確認、全ツールの生成画面・日本語プロンプトの実機テスト、各国商用条項の法律専門家確認は実施していない。出典のない欄を「検証済み」と見なさない。
- 商用利用は「無料プランの許諾」「有料プランの許諾」「生成物の知財・第三者素材の権利」「可視透かし」を分け、公式表示の相違は正規の不一致として残す。

## サマリー

- 正本32件を全数点検。公式情報との差分が明確な **9件**（DALL·E、Brand Studio、Creatify、Canva、Photoroom、HeyGen、Synthesia、Vidu、Pika）をコード変更対象とした。
- 公式情報に矛盾がある / 公開ページだけで足りない項目は無理に数値を断定しない（例: Brand Studioクレジット、Pikaの条件、Kling AIのアクセス制限）。
- 日本語公式トップがあることは、ログイン後の制作UIの完全日本語化と等価ではない。言語と著作権許諾は個別に判定。
- 現時点の完了判定は編集・ソース点検に対してのみ。CI・本番反映はこの文書単体では保証しない。

## 全32件の監査台帳

| ツールslug | 判定 | チェック結果・次の扱い | 一次情報 |
| --- | --- | --- | --- |
| `adobe-firefly` | 照合・一致 | 日本語公式¥1,580/月・2,000生成クレジットが現DBと一致。期日終了キャンペーン価格に注意 | [公式](https://www.adobe.com/jp/products/firefly/plans.html) |
| `canva-ai-image-generator` | 修正 | 日本語Web年額¥11,800の記載を明確化。App Store月額と混同しない。無料AI最大20回とPro利用枠10倍 | [公式](https://www.canva.com/ja_jp/pricing/) |
| `capcut-ai` | 保留 | 日本語公式ツール案内あり。Pro料金は地域・購入経路で変わり、一定の日本向け公式固定料金を確証できず。素材・音楽・テンプレート商用権利を分離 | [公式](https://www.capcut.com/ja-jp/tools/ai-video-generator) |
| `clipdrop` | 保留 | 旧サービス/Jasper系の権利条件の差があり、公式日本語の提供確認不足。無条件商用可に変更しない | [公式](https://clipdrop.co/pricing) |
| `creatify` | 修正 | 日本語公式料金URL追加。Starter $39/月、Pro $99/月、無料月10cr・透かし、有料透かしなし。日本語マーケティングと制作UIは別 | [公式](https://creatify.ai/ja/pricing) |
| `d-id` | 保留 | Lite非商用・Trial透かし情報は既存記載。日本語制作UI・日本円最終価格の一次資料は確定できず | [公式](https://www.d-id.com/pricing/studio/) |
| `dalle` | 修正・重大 | ChatGPT公式DALL·E GPTは2026-08-30終了。旧DALL·Eページは歴史情報に位置付け。現行生成はChatGPT画像へ | [公式](https://help.openai.com/ja-jp/articles/11084440-images-in-chatgpt) |
| `dreamstudio` | 修正・重大 | Creator $19/月の旧DB・専用ページ欠落を訂正。Trial 1000 vs KB 500、Core 5000 vs KB 6000の公式資料間不一致を注記 | [公式](https://stability.ai/brand-studio-plans) |
| `fotor-ai` | 保留 | 日本語画像生成・料金ページあり。ライセンスは商用FAQと権利条項を区別。今回金額の日本向け確定表示は未記録 | [公式](https://www.fotor.com/jp/pricing/) |
| `gemini-image-generation` | 追加確認 | 日本向けGoogle AIプラン・画像生成公式ページ既存。変更頻度高いAIクレジットは購入時の日本国内表示を確認 | [公式](https://gemini.google/jp/overview/image-generation/?hl=ja-JP) |
| `hailuo-ai` | 保留 | 有料商用/無料非商用という既存判定と利用規約の関係を維持。日本語の公式UI確認不可 | [公式](https://hailuoai.video/doc/payment-policy.html) |
| `haiper` | 既存要注意 | 消費者向けサービス終了を既存DBが記載。旧FAQによる再開・旧料金の誤認を避ける | [公式](https://haiper.ai/) |
| `heygen` | 修正 | 日本語公式料金のFree月3本・1本最長1分、Creator $29/月・600cr、ロゴ削除を記録。無料DL不可は過去実機観測で、一般ルールではない | [公式](https://www.heygen.com/ja-jp/pricing) |
| `ideogram` | 保留 | 週次無料クレジットの既存数値は現時点の日本向け公式ローカライズ資料で追認できず、追加確認が必要 | [公式](https://ideogram.ai/pricing) |
| `invideo-ai` | 保留 | 2026-11既存更新あり。Starter/Plus/Max、素材別ライセンスの注意は維持。最新日本語公式料金と編集UIはログイン検証対象 | [公式](https://invideo.io/pricing/) |
| `kling-ai` | 要追加確認 | 商用Standard以上という既存判定は第三者補助根拠を含む。公式規約へのアクセス制約があり日本向け条項を確定できない | [公式](https://kling.ai/docs/user-policy) |
| `leonardo-ai` | 保留 | 無料版の非独占ライセンスと有料権利移転を区別。日本語の制作UI・請求の公式情報不足 | [公式](https://leonardo.ai/terms-of-service/) |
| `luma-ai` | 既存要注意 | 2026-11現行のAppとAPIの商用利用条件・無料枠を分離したDB更新済み。追加の日本語公式課金表を確証できず | [公式](https://lumalabs.ai/pricing) |
| `microsoft-designer` | 既存重要注意 | 日本語FAQと利用規約で個人的/非商用利用を明記。Microsoft 365有料契約とDesigner商用許諾を混同しない | [公式](https://support.microsoft.com/ja-JP/designer/frequently-asked-questions-about-microsoft-designer) |
| `midjourney` | 保留 | 公式利用規約に年売上100万USD超のプラン条件。日本語公式料金・UIを確認できない。既存USDプランを維持 | [公式](https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially) |
| `nightcafe` | 保留 | 公式商用FAQに入力画像/権利要件あり。日本語公式UI・料金を確認できず | [公式](https://help.nightcafe.studio/portal/en/kb/articles/does-the-license-allow-me-to-sell-my-creations-or-use-them-for-commercial-purposes) |
| `photoroom` | 修正・重要 | 日本語公式表のPro月8000cr・1000エクスポート/Max25000・3000/Ultra75000・10000。『無制限エクスポート』は不正確で修正 | [公式](https://www.photoroom.com/ja/pricing) |
| `pika` | 修正・重大 | 2026-11-06公式料金表Basic無料・月80cr・480p・『Commercial use』『Download videos with no watermark』明記。旧DBの無料商用不可/透かしありを修正 | [公式](https://pika.art/pricing) |
| `pixverse` | 既存確認事項 | 2026-11の公式Termsでは有料時の自社モデル出力のみ商用可・他社モデルは別条件。既存DBの判定は維持 | [公式](https://pixverse.ai/en/terms-of-service) |
| `playground-ai` | 保留 | 料金表Free非商用・Pro以上商用ライセンスとTerms全体の記述差を正本に記録済み。日本語公式料金未確認 | [公式](https://playgroundai.com/design/pricing) |
| `recraft` | 既存重要注意 | 公式Terms無料作品の所有者と商用制限、有料の権利条件を区別。日本語公式価格の確証なし | [公式](https://www.recraft.ai/terms) |
| `runway` | 既存確認事項 | 公式商用ヘルプは全プランで出力商用利用を禁止せず。無料クレジット・透かし・日本語UIは別条件 | [公式](https://help.runwayml.com/hc/en-us/articles/21668707517587-Can-I-use-the-content-I-made-in-Runway-for-commercial-purposes) |
| `seaart-ai` | 追加確認 | 公式/ja日本語UI確認済み。無料130 stamina/日・日本の最終VIP金額は動的表示で別途確認 | [公式](https://www.seaart.ai/ja) |
| `stable-diffusion` | 既存確認事項 | Stability AI Community Licenseは年商100万USD未満の商用利用と企業契約条件。旧/派生モデルと区別した11/05更新あり | [公式](https://stability.ai/license) |
| `synthesia` | 修正 | 日本地域指定の公式料金表示はUSDのStarter $29/月・1250cr、Basic $0・500cr。日本語案内と編集UI実機検証は区別 | [公式](https://www.synthesia.io/pricing?region=japan) |
| `tensor-art` | 既存確認事項 | モデル/LoRA個別ライセンスと生成物の利用条件を分離。日本語公式UIの証拠不足 | [公式](https://tensor.art/about/terms-of-service-new) |
| `vidu-ai` | 修正 | 日本語公式料金ページを出典追加。Subscription 30日、Purchased/Bonus各2年。金額はJS動的表示で確定せず | [公式](https://www.vidu.com/ja/pricing) |

## エビデンス／相違が重大なもの

### Pika（無料プランの商用利用と透かし）
- [Pika公式プラン比較](https://pika.art/pricing) のBasic $0に80 monthly video credits、Commercial use、Download videos with no watermarkが明記。
- 旧記事の『無料は商用不可・透かしあり』は誤記。無料Basicの商用利用は許されると表示されているが、第三者著作権・利用規約・素材の権利まで保証するわけではない。
- データベースと専用Astroページ両方を修正し、無料クレジット80/月の整合も確保。


### DALL·E
- [ChatGPT画像（OpenAI公式・日本語）](https://help.openai.com/ja-jp/articles/11084440-images-in-chatgpt)
- [ChatGPTリリースノート](https://help.openai.com/ja-jp/articles/6825453-chatgpt-release-notes)
- 公式DALL·E GPTの提供終了は**2026-08-30**。過去のDALL·E 3モデルの生成例と現在ChatGPT内で利用可能な生成機能を同一視しない。slug `dalle` は既存SEO・過去サンプル参照を守るため維持。

### Brand Studio
- [公式価格表（Trial 1000 / Creator 2000 / Core 5000）](https://stability.ai/brand-studio-plans)
- [公式Knowledge Base（Trial 500 / Creator 2000 / Core 6000）](https://kb.stability.ai/knowledge-base/brand-studio-subscription-plans-overview)
- [公式クレジットFAQ](https://kb.stability.ai/knowledge-base/how-b-credits-work-billing-faqs)
- 両者は公式同士だが値が矛盾する。最安Creator月19USDは共通。Trial/Coreクレジットは契約画面で確定。古いCore月50USDを『最安』とする表示は修正。

### 日本向け料金・無料枠
- [Canva日本語価格表](https://www.canva.com/ja_jp/pricing/)：Web年額¥11,800。App Store月払いとは契約周期が異なる。
- [Photoroom日本語料金表](https://www.photoroom.com/ja/pricing)：無料プランの商用不可と、Pro/Max/Ultraの月間AIクレジット・エクスポート枠を分離。コアツールの公正利用内無制限は保存画像の無制限書き出しを意味しない。
- [HeyGen日本語料金表](https://www.heygen.com/ja-jp/pricing)：Free月3本・最大1分、Creator月29USD、Pro月49USD等。
- [Synthesia日本地域公式料金表](https://www.synthesia.io/pricing?region=japan)：`region=japan`でも取得可能な公開テキストはUSD表記。日本円料金として断定しない。
- [Creatify日本語公式料金表](https://creatify.ai/ja/pricing)：Starter月39USD、Pro月99USD、Freeは月10クレジット。編集画面日本語UIの完全対応は未検証。
- [Vidu日本語料金表](https://www.vidu.com/ja/pricing)：料金カードは動的ロード。金額が確認できないことと日本語の案内が存在しないことは別。

## 未解決項目・優先順

1. **解消（重大）** `pika`: 公式料金表でFree Basic月80cr・商用利用可・透かしなしダウンロードと確認。DBおよび専用ページの誤表記を改訂。モデル別ライセンス、不可視メタデータは別途確認。
2. **P0** `kling-ai`: 現行公式規約へのアクセス制約がある。第三者の転載を一次資料と誤認して商用条件を断定しない。
3. **P1** `capcut-ai`, `fotor-ai`, `seaart-ai`, `invideo-ai`: 現行の日本向け正式プラン・請求額が環境依存で、公式ログイン済み価格表示の確認が必要。
4. **P1** 既存専用Astroページのハードコード全件監査。正本更新が自動反映されない箇所（FAQ、表、構造化データ）があるため横断置換は禁止。ページごとに整合を検証。
5. **P2** 日本語UI／日本語プロンプトは、説明サイトのローカライズ、ログイン後エディタUI、入力・出力品質の3層で実機確認。

## 品質・リリース境界

- 変更は対象ツール正本・該当する専用Astroページおよび本監査報告に限定。
- 追記の根拠は各ツールに添付した公式URLで検証。実機で試していない操作や比較画像は検証済みと書かない。
- アフィリエイト、GA4、Clarity、DNS、サイト全体スキーマ、CI/デプロイ設定を変更しない。
- PRに必須のビルド、品質監査、scope検証を実施。masterマージとproduction反映の証拠を分けて報告する。
