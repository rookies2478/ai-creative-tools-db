# 38ツール公式事実再監査（2026-11-07）

Issue #66 / umbrella strategy-os#274。確認日はすべて 2026-11-07（WebFetch取得時）。公式ドメインのページのみ。ログイン・購入・アカウント操作なし。顧客向け文言は未変更。取得地域は不明（サーバ側取得、価格は地域・時期で変動しうる）。
分類: VERIFIED（取得本文で確認）/ CONFLICT（公式ページ間、または現行DB記載と取得本文が相違）/ ACCOUNT_ONLY（動的表示・ログイン後でしか確定不可）/ NOT_VERIFIED（取得不可・本文に該当記載なし）。

集計: VERIFIED 17 / CONFLICT 8 / ACCOUNT_ONLY 2 / NOT_VERIFIED 11 = 38

## 優先対象（Issue #66コメントの明示例外）

| slug | 分類 | 対象・プラン・周期 | 公式URL | 実際に確認した本文 |
|---|---|---|---|---|
| dreamina | CONFLICT | 日本向け規約(Last Updated 2026-01-22)。Basic月払いUSD15/1,575cr | https://www.capcut.com/clause/dreamina-terms-of-service?lang=ja-JP&region=JP ; https://dreamina.capcut.com/ai-video/free-ai-video-credits-limits-exports | §1「Our Services are generally provided for private, non-commercial use」§7「access or use the Services or any content therein for any commercial or unauthorized purposes」不可。同社ページは「Basic USD 15 per month on monthly billing, with 1,575 monthly credits」「paid plans add watermark-free downloads」、Freeの商用可否は記載なし。検索要約ではBasic $15/$18、Standard $36/$42のページ間差あり(検索要約のみ、未検証扱い)。 |
| krea-ai | CONFLICT | 全世界USD。Free | https://www.krea.ai/pricing | Free枠に「Commercial license Use all generated content for commercial purposes...」と記載。一方FAQは「Basic, Pro, Max, Business, and Enterprise include a commercial license ... without restrictions」でFree不記載。Basic $5/Pro $21/Max $63/Business $160(取消線$9/$35/$105/$200、周期ラベル不明、Yearly 40% off切替)、Free 100 units/day。透かし記載なし。 |
| higgsfield-ai | CONFLICT | 全世界。Free vs 有料 | https://higgsfield.ai/creator-hub/help-center/account/who-owns-my-generations-and-can-i-use-them-commercially ; https://higgsfield.ai/blog/higgsfield-pricing-explained(2026-10-24付) ; https://higgsfield.ai/pricing | ヘルプ「The Terms of Use do not tie commercial use rights to a specific plan」「Paid plans include watermark-free downloads」。公式ブログは表でFree=商用不可、Starter $15/Plus $49/Ultra $129(月200/1000/3000cr)。DBのBasic $9/Pro $23/Max $59(年払い換算)とプラン名が相違。/pricing本文はJS描画で取得不可。 |
| dreamstudio (Brand Studio) | CONFLICT | 全世界USD | https://kb.stability.ai/knowledge-base/brand-studio-subscription-plans-overview ; https://docs.stability.ai/pricing | KB: Free Trial 500cr一回のみ、Creator $19/月 2,000cr、Core $50/月 6,000cr。DB記載の「公式料金ページは初回1,000cr」側は今回再取得できず(docs.stability.ai/pricingはBrand Studio記載なし、「25 free credits」「1 credit = $0.01」はAPI)。KB内の数値は確認、矛盾の相手側は未再確認。 |

## 優先ソース（Issue #66本文）

| slug | 分類 | 内容 | 公式URL | 確認本文 |
|---|---|---|---|---|
| kling-ai | VERIFIED | 有料会員規約(Effective 2026/10/10)、一般規約(2026-04-21) | https://kling.ai/docs/payment-policy ; https://kling.ai/docs/user-policy | 有料§3.1.2「KLING AI members' use of the Output for commercial purposes is not restricted」、前文「this Agreement shall prevail to the extent of such inconsistency」。一般§4.6「without our written permission, you may not use ... the Output for any commercial purposes」。DB記載と整合。 |
| capcut-ai | CONFLICT | 日本語価格ページ(取得時JPY表示)。税・最終額はログイン後と明記 | https://www.capcut.com/ja-jp/pricing/ | Pro 月払い JPY2,700「毎月800のAIクレジット」年払いJPY21,800、Ultra JPY12,600/月「毎月13821」年払い JPY144,800、Teams席別。参考情報と明記。DB(USD19.99/1,200cr、Ultra USD79/8,645cr)と相違。 |
| fotor-ai | ACCOUNT_ONLY | 日本語価格 | https://www.fotor.com/jp/pricing/ | 金額は「-」placeholder(JS動的)、「年次請求」「透かしなし」行のみ。 |
| seaart-ai | NOT_VERIFIED | | https://www.seaart.ai/ja | 価格・Stamina・商用の記載が取得本文に無い(日本語ページである点のみ)。 |
| invideo-ai | VERIFIED | 英語価格、席あたり、年払い表示 | https://invideo.io/pricing/ | Starter $10/月(取消線$20)、Plus $30(取消線$60)、Max $250、すべて「billed annually」、Monthly/Annual切替。透かし・商用記載なし。 |
| luma-ai | VERIFIED(価格) | USD | https://lumalabs.ai/pricing | Plus $30/月($25/月・年$300払い・10,000cr)、Pro $90/月($75・年$900・40,000cr)、Ultra $300/月($250・年$3,000・150,000cr)、Plusに「Commercial use」。透かし記載なし。 |
| ideogram | VERIFIED | USD | https://ideogram.ai/pricing/ | Plus $20月払い/$15相当・年$180、2,400cr、Pro $60月/$42相当・年$504、7,500cr。FAQ「free to use them for any purpose, including commercial use」。月払い/年払いラベルは配置からの推定。 |
| leonardo-ai | NOT_VERIFIED | | https://leonardo.ai/pricing/ | HTTP 403。検索要約(公式ドメイン)ではEssential $12、Premium $30、Ultimate $60、Free 150/日だがページ本文は未取得。 |
| vidu-ai | ACCOUNT_ONLY | 日本語価格 | https://www.vidu.com/ja/pricing | 本文「Loading pricing plans...」。FAQのみ: サブスクcrは30日、購入/ボーナスcrは2年失効、返金不可。金額・透かし・商用なし。 |

## 残り全件

| slug | 分類 | 内容(プラン・周期・国) | 公式URL | 確認本文/理由 |
|---|---|---|---|---|
| adobe-firefly | VERIFIED | 日本・税込・月々 | https://www.adobe.com/jp/products/firefly/plans.html | Standard 1,580円/Pro 3,180/Pro Plus 6,600/Premium 31,680(税込、月2,000/4,000/10,000/50,000cr)。「Adobe FireflyのAIモデルで生成されたコンテンツは商用利用に適しています」パートナーモデルは利用者判断。DB一致。 |
| canva-ai-image-generator | VERIFIED | 日本Web | https://www.canva.com/ja_jp/pricing/ | Pro ¥11,800/年・1人、Business ¥18,800/年。税込/税別の記載なし。DB一致。 |
| clipdrop | NOT_VERIFIED | | https://clipdrop.co/terms-visitor | 取得本文に商用条項なし(フッタ「© InitML」のみ)。 |
| creatify | CONFLICT | 日本語価格・USD・月払い | https://creatify.ai/ja/pricing | Standard $10/Pro $38/Max $66/Business $136(月払い、年払い30%OFF、API $99/$299)、無料10cr/月・透かし。DB(Starter $39/100cr, Pro $99)と相違。 |
| d-id | NOT_VERIFIED | | https://www.d-id.com/pricing/studio/ | 価格記載なし。Trial/Liteは透かし、トライアルは全面透かし(FAQ)のみ確認。 |
| dalle | NOT_VERIFIED | | https://help.openai.com/ja-jp/articles/11084440-images-in-chatgpt | HTTP 403。 |
| gemini-image-generation | NOT_VERIFIED | | https://support.google.com/gemini/answer/14286560?hl=ja | 提供は版・言語・国に依存、日次上限あり(本文)。SynthID/透かしの記載は本ページに無く未確認。 |
| google-flow | VERIFIED(透かし)。言語はNOT_VERIFIED | | https://support.google.com/flow/answer/16353333?hl=ja | Veo/Omni/Nano Bananaに不可視SynthID。可視透かしは自動付与(インド・韓国・ベトナムのUltra 20x非契約者)、切替可。対応言語の記載は無し。 |
| hailuo-ai | VERIFIED | Payment Policy 最終更新2025-07-14 | https://hailuoai.video/doc/payment-policy.html | §8有料期間に生成・ダウンロードしたコンテンツの権利主張なし(商用権利保持)。§7「Free Users: Video downloads will include a watermark」。Freeの商用は同文書で未規定。 |
| haiper | NOT_VERIFIED | | https://haiper.ai/ | 取得本文はタイトルのみ。 |
| heygen | VERIFIED | 日本語・USD | https://www.heygen.com/ja-jp/pricing | Free 月3本・最長1分・透かし、Creator $29/月(年払い$24)、Pro $49、Business $149+$20/user。DB一致。 |
| microsoft-designer | VERIFIED | 日本 | https://support.microsoft.com/ja-JP/designer/frequently-asked-questions-about-microsoft-designer | 「Microsoft アカウントを使用して個人的、非営利的な使用のためにライセンスされています」。商用可の明示なし。 |
| magnific | NOT_VERIFIED | | https://www.magnific.com/ai/docs/ai-content-and-copyright | HTTP 403。 |
| midjourney | NOT_VERIFIED | | https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially | HTTP 403。 |
| nightcafe | VERIFIED | | https://help.nightcafe.studio/portal/en/kb/articles/does-the-license-allow-me-to-sell-my-creations-or-use-them-for-commercial-purposes | 「If your creation doesn't use any other images, you're welcome to use it for commercial purposes.」入力画像の権利は利用者側。 |
| openart | VERIFIED | 規約(2026-07-30/07-20表記差) | https://openart.ai/suite/terms | §4.1 Plus以上で「freely use Output ... for commercial purposes」、Starter言及なし、§4.5無料は可視透かし可・除去禁止。 |
| photoroom | VERIFIED(クレジット) | 日本語 | https://www.photoroom.com/ja/pricing | Pro 8,000cr/1,000exp、Max 25,000/3,000、Ultra 75,000/10,000。金額・商用記載は本文に無し。DB一致。 |
| pika | CONFLICT | USD | https://pika.art/pricing | Free: 「Not included: Commercial license」「Free plan exports have no watermark」。Starter $10月/$8年($96)600cr、Creator $35/$28 2,600cr、Fancy $95/$76 8,550+cr。DB(Basic無料に商用可、Standard $8/700cr、Pro $28/2,300、Fancy $76/6,000)と相違。 |
| pixverse | VERIFIED | 規約 Updated on October 29, 2026 | https://pixverse.ai/en/terms-of-service | §4.1「Your use of the Outputs is limited to non-commercial purposes」(無料)、有料は商用可、第三者モデルは各社規約。§4.2素材は不可。 |
| playground-ai | NOT_VERIFIED | USD | https://playgroundai.com/design/pricing | Pro $12(年払い)/Pro Plus $36、無料6cr/月更新。Free欄に「World-wide, royalty free license」とあるが商用可否の根拠として曖昧、DB(Free非商用)との整合未確定。 |
| recraft | VERIFIED | 規約発効2026-10-21 | https://www.recraft.ai/terms | §7.1無料は個人利用・Free Tier AssetsはRecraft所有・商用不可。§7.2有料は事業利用可・利用者所有(AI学習利用禁止の制限)。 |
| runway | VERIFIED | USD | https://runway.com/pricing | Free $0・一回限り125cr、Standard $12/月(年払い、625cr、No watermarks)、Pro $28/2,250、Max $76/9,500。月払い価格は本文に無し。ヘルプ記事は403。 |
| stable-diffusion | VERIFIED | | https://stability.ai/license | Community License「less than $1M in annual revenue」。日付記載なし。 |
| synthesia | CONFLICT | 英語・USD(region=japan) | https://www.synthesia.io/pricing?region=japan | Basic $0・500cr/月・透かし、Starter $19/月(初月$9)・年払い$14/月($168)・1,250cr、Pro $89/$59。DB(Starter 月払い$29・年払い$18)と相違。本文後半45,884字は未読。 |
| tensor-art | NOT_VERIFIED | | https://tensor.art/about/terms-of-service-new | HTTP 403。 |

## CONFLICTまとめ(現行DB/公開文言と取得本文の相違)
capcut-ai(通貨・金額・クレジット)、creatify(プラン名・金額)、pika(Free商用・プラン体系)、synthesia(Starter金額)、dreamina(日本規約と一般ページ・価格間差)、krea-ai(Free商用)、higgsfield-ai(ヘルプ対ブログ)、dreamstudio(KB対料金ページ)。

## 修正案（未適用、顧客向け文言は変更していない）
- capcut-ai: 取得時JPY表示(Pro 2,700円/月・800cr)と地域差の注記へ更新するか、取得地域を特定してから反映。
- creatify: 現行表示(Standard $10等)をブラウザで地域別に再確認後に反映。
- pika: Free「商用利用不可」へ訂正、プラン名Starter/Creator/Fancyと金額更新(公式本文の引用あり)。
- synthesia: Starter 月払い$19、年払い$14相当へ更新(first month $9は期間限定)。
- luma-ai: Plus $30/月等の具体金額と「Commercial use」を反映可能。
- invideo-ai: Starter $10/Plus $30/Max $250(年払い表示)を反映可能。
- krea-ai/higgsfield-ai/dreamina/dreamstudio: 公式間矛盾を維持し、Free商用は「書面確認」の現状を継続。
- 上記は個別の価格・ライセンス変更であり、別PRで.md/.astro/関連記事を同時更新すること。

## 限界
地域別・ログイン後・JS動的価格、403ページは未検証。WebFetchは要約モデル経由のため、引用は原文再確認前提の補助。検索要約のみの情報(Leonardo、Dreamina他ページ)は検証済みとしない。
