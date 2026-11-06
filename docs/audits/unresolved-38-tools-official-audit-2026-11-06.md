# 38ツール全件：未確認事項の再検証（2026年11月6日）
Issue #66 / 基準: GitHub `master` の38ツール正本と過去の32件監査台帳。
この台帳は**公開一次情報で確定した範囲と、公開一次情報だけでは確定できない項目を区別する**。38件すべてに日本語公式サイトがあるわけではなく、ログイン後の請求・編集UIや顧客別利用許諾を実機検証したとは主張しない。

## 要点
- Kling AIは一般利用規約§4.6と有料会員規約§3.1.2（後者優先）の規定を直接確認。無料商用と有料会員商用を分離して修正。
- CapCutは日本語公式の参考価格（Pro $19.99、Ultra $79）および各月次AIクレジットを追加。購入時の最終金額とは区別。
- Leonardo AIは旧Apprenticeから現行Essentialへ、Ideogramは変動する無料週次クレジットと公式比較記事のPlus参考価格へ改訂。
- Fotorは日本語公式で確認できる無料と有料の保存容量・同時生成・透かし条件を明記。金額はJS動的表示を推測しない。
- InVideo/SeaArtは日本語入口を確定情報として追加。ログイン後のUI・最終価格・モデル別透かしは残件として管理。

## 全38件のトリアージ
| ツール | 状態 | 確認結果・残る制約 | 公式根拠 |
|---|---|---|---|
| `adobe-firefly` | 維持 | 日本向け公式料金を2026-11の既存データと照合済み。購入時のキャンペーン・税は個別 | [公式](https://www.adobe.com/jp/products/firefly/plans.html) |
| `canva-ai-image-generator` | 維持 | 日本向けWeb年払いとApp Store月額は購入経路別。実機の各モデル回数は未試験 | [公式](https://www.canva.com/ja_jp/pricing/) |
| `capcut-ai` | 更新 | 日本語公式の参考Pro $19.99/月・1200 AI cr、Ultra $79/月・8645 cr。最終請求額はログイン後 | [公式](https://www.capcut.com/ja-jp/pricing) |
| `clipdrop` | 保留 | Jasperへの移管後の商用権利・Text-to-image無料表示と実挙動差。ログインと契約別確認が必要 | [公式](https://clipdrop.co/terms-visitor) |
| `creatify` | 維持 | 日本語公式価格表と無料枠を既存調査で反映。編集UI完全日本語化は未実機 | [公式](https://creatify.ai/ja/pricing) |
| `d-id` | 保留 | Lite/Trialと有料の規約差、生成アバター人物同意。日本円最終料金は契約画面 | [公式](https://www.d-id.com/pricing/studio/) |
| `dalle` | 維持 | 2026-08公式DALL-E GPT終了情報を既存更新済み。GPT Image現行APIと旧APIは区別 | [公式](https://help.openai.com/ja-jp/articles/11084440-images-in-chatgpt) |
| `dreamstudio` | 保留（公式間矛盾） | Creator $19は修正済み。Trial/Coreクレジット数量が料金表と公式KBで不一致 | [公式](https://kb.stability.ai/knowledge-base/brand-studio-subscription-plans-overview) |
| `fotor-ai` | 更新 | Basic保存30日・512MB・透かしあり、Proは10同時生成・2GB、Pro+は30同時生成・100GB。金額動的 | [公式](https://www.fotor.com/jp/pricing/) |
| `gemini-image-generation` | 維持 | 日本語公式の画像生成あり。Google AI契約ごとのクレジット・SynthID・可視透かしは機能別 | [公式](https://support.google.com/gemini/answer/14286560?hl=ja) |
| `hailuo-ai` | 保留 | Free/paid商用権利のPayment Policyと利用規約を区別。日本語UI・日本向け最終価格の確証なし | [公式](https://hailuoai.video/doc/payment-policy.html) |
| `haiper` | 既存注意 | 消費者向けサービス終了の注意記載。旧料金を現行課金と誤認しない | [公式](https://haiper.ai/) |
| `heygen` | 維持 | 日本語Free月3本・最長1分、Creatorのプラン記載済み。制作画面の完全翻訳は未検証 | [公式](https://www.heygen.com/ja-jp/pricing) |
| `ideogram` | 更新 | 公式比較記事のPlus $20/月、年払い$180。無料週次slow creditsはアカウント別で変動 | [公式](https://ideogram.ai/blog/adobe-firefly-alternatives/) |
| `invideo-ai` | 更新・保留 | 日本語公式入口あり。ただしJSアプリで編集画面・支払い最終額・透かしは公開HTML取得不可 | [公式](https://invideo.io/jp/) |
| `kling-ai` | 更新・重要 | 一般規約§4.6と有料会員規約§3.1.2。後者は有料会員の商用利用を許可し、矛盾時は優先 | [公式](https://kling.ai/docs/payment-policy) |
| `leonardo-ai` | 更新 | 現行個人プランEssential $12（月払い）・$10相当（年払い）、Free 150 Fast Tokens/日。旧Apprentice訂正 | [公式](https://leonardo.ai/pricing/) |
| `luma-ai` | 保留 | API商用利用とAppの契約条件を分離済み。Appの最終価格とプランごとの透かしはログイン後 | [公式](https://lumalabs.ai/pricing) |
| `microsoft-designer` | 維持 | 日本向け公式FAQの個人・非商用条件。Microsoft 365課金で商用ライセンスが自動許可されるとは断定しない | [公式](https://support.microsoft.com/ja-JP/designer/frequently-asked-questions-about-microsoft-designer) |
| `midjourney` | 維持 | 公式規約に大企業（年間売上100万ドル超）のPro/Mega要件。日本語公式料金表・UIなし | [公式](https://docs.midjourney.com/hc/en-us/articles/27870375276557-Using-Images-Videos-Commercially) |
| `nightcafe` | 保留 | 出力の商用利用と入力第三者画像の権利。日本語UI・最新購入価格は未確定 | [公式](https://help.nightcafe.studio/portal/en/kb/articles/does-the-license-allow-me-to-sell-my-creations-or-use-them-for-commercial-purposes) |
| `photoroom` | 維持 | 無料非商用・Pro/Max/Ultraのクレジットと保存上限は日本語公式から既存更新済み | [公式](https://www.photoroom.com/ja/pricing) |
| `pika` | 維持 | 無料Basic 80cr/月と商用利用可・透かしなしダウンロードを公式料金表で確認済み | [公式](https://pika.art/pricing) |
| `pixverse` | 維持 | 自社モデル有料商用と他社モデル別規約。Impact案件は承認済みだがリンク公開は別途 | [公式](https://pixverse.ai/en/terms-of-service) |
| `playground-ai` | 保留（公式間矛盾） | 料金表Free非商用、Terms上の生成物権利の一般説明。商用利用は有料Pro+を安全側とする | [公式](https://playgroundai.com/design/pricing) |
| `recraft` | 維持 | 無料生成物はRecraft側権利・非商用、有料で商用権利。価格は顧客別テストあり | [公式](https://www.recraft.ai/terms) |
| `runway` | 維持 | 公式ヘルプは出力商用利用を許容。モデル・動画・音源ごとの権利と透かしは別 | [公式](https://help.runwayml.com/hc/en-us/articles/21668707517587-Can-I-use-the-content-I-made-in-Runway-for-commercial-purposes) |
| `seaart-ai` | 更新・保留 | 日本語公式UIは確認。無料130 Stamina/日。VIP/SVIPの日本円請求額・モデル別透かしは動的 | [公式](https://www.seaart.ai/ja) |
| `stable-diffusion` | 維持 | Community Licenseは年商100万米ドル以下などの条件。旧モデルと第三者派生を区別 | [公式](https://stability.ai/license) |
| `synthesia` | 維持 | 地域Japan指定の料金と無料クレジットは既存更新。購入時の税・UI日本語完全対応は未確認 | [公式](https://www.synthesia.io/pricing?region=japan) |
| `tensor-art` | 維持 | 個別モデル/LoRAに商用制約があり、プラットフォーム総称で商用可と断定しない | [公式](https://tensor.art/about/terms-of-service-new) |
| `vidu-ai` | 保留（動的価格） | 日本語公式料金はあるが金額動的。Subscription/Purchased/Bonusの期限は既存更新 | [公式](https://www.vidu.com/ja/pricing) |
| `dreamina` | 保留（日本規約） | 日本適用規約で非商用原則と一般案内が相違。事業用途はサポートの書面許諾が必要 | [公式](https://www.capcut.com/clause/dreamina-terms-of-service?lang=ja-JP&region=JP) |
| `google-flow` | 維持 | 日本語は対応言語、英語プロンプト推奨。不可視SynthID常時、可視透かしは条件別 | [公式](https://support.google.com/flow/answer/16353333?hl=ja) |
| `krea-ai` | 保留（ライセンス表示差） | Freeプラン商用利用は宣伝と料金表の表記差。有料Basic以上は明示。無料は書面確認 | [公式](https://www.krea.ai/pricing) |
| `higgsfield-ai` | 保留（ライセンス表示差） | ヘルプは全ユーザー可、料金表はFree商用なし／Basic以上商用あり。無料用途は書面確認 | [公式](https://higgsfield.ai/pricing) |
| `openart` | 維持 | 商用ライセンスはPlus以上、Starterは対象外。無料透かしを切り取り改変しない | [公式](https://openart.ai/suite/terms) |
| `magnific` | 維持 | AI生成物はPremium以上商用、Freeは個人用。無料Stockライセンスと区別 | [公式](https://www.magnific.com/ai/docs/ai-content-and-copyright) |

## 公開情報のみでは解消不能な残件と取得条件
1. **ログイン後の日本国内の税込最終請求額・通貨**：CapCut、Fotor、SeaArt、InVideo、Vidu、Luma、Clipdropなど。ユーザー本人の地域・購入経路・既存契約・割引・決済画面に依存。公開参考値を請求額と混同しない。無断ログイン・課金・決済はしない。
2. **公式資料間の矛盾の正式確認**：Dreamina日本規約とマーケティング、KreaのFree商用、HiggsfieldのFree商用、Brand StudioのTrial/Coreクレジット、PlaygroundのFree利用権。公式サポートの書面回答またはその契約で適用される書面が必要。推測で「商用可」にしない。
3. **日本語制作エディタの全機能表示・日本語プロンプトの品質**：ログインしてモデル・デバイス・地域ごとに実際の入力／出力を試す必要。公式日本語ランディングページの存在だけでは認定しない。入力素材の利用許諾を事前に確保。
4. **モデル別透かし・不可視識別と元画像の権利**：無料/有料プラン、モデル、生成方式、書き出し形式で条件が異なる。第三者権利とプラットフォーム商用許諾を分離する。
5. **他の公開専用記事に残る重複・ハードコード**：今回編集した主な専用ページのほか、他のランキング／比較ページの一括置換は誤情報を広める可能性があるため個別監査が必要。

## 必要な確認手段
- 各サービスの正式ログイン済みアカウントで価格・言語・モデルのスクリーンを検証し、契約内容を照会する。アカウント提供者・契約者に確認を依頼する必要があり、公開情報だけからは確定できない。
- 規約が矛盾する場合、運営会社サポートに「対象国：日本、プラン名、モデル、広告・受託制作での商用利用可否、可視・不可視透かし」を指定し、書面回答を保存する。
- 免責：一般向け編集情報であり、個別契約の法的意見ではない。各社の販売内容は変更される場合がある。

## QAと公開ゲート
サイトデータに反映した箇所のPR/CI結果を別途確認する。GitHubビルド成功は本番公開完了の証拠ではなく、デプロイ確認・本番URL検証も必要。アフィリエイト、計測、DNS、既存生成サンプルは変更しない。
