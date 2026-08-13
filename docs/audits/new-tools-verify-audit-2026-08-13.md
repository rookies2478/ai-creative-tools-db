# New Tools VERIFY Audit

- audited_at: 2026-08-13
- audit_type: AUDIT-ONLY（本タスクでのDB更新は下記「DB更新」欄に限定、新規ページ・アフィリエイトリンク追加なし、本番デプロイなし）
- scope: 2026-08-13追加済み3ツール（Photoroom, Creatify, Recraft）のVERIFY項目解消

## Executive Summary

3ツール中、Photoroomは日本語UI/ドキュメント対応がVERIFIED（公式ヘルプセンター記事で確認）。Creatifyは出力物の所有権がVERIFIED（公式FAQで「解約後も所有」明記）だが、日本語対応・商用利用条件はPARTIAL止まり。Recraftは料金ティア・商用利用条件（無料=不可・有料=可）・運営法人がVERIFIED、日本語対応は依然UNKNOWN。3ツールとも日本語プロンプト対応はUNKNOWNのまま（公式情報になし、実機テストが必要）。

## Photoroom

### Japanese UI
VERIFIED。公式ヘルプセンター記事「Change the language of Photoroom」に日本語（日本語）が対応言語として明記。Webアプリの設定（Space menu → Your profile → Language）およびphotoroom.comのフッター言語切替でも変更可能とされる。
Source: https://help.photoroom.com/en/articles/7323117-change-the-language-of-photoroom（2026-08-13アクセス）

### Japanese prompt support
UNKNOWN。プロンプト・検索入力欄への日本語テキスト入力対応可否について明記した公式情報は見つからず。実機確認が必要。

### Japanese documentation
VERIFIED。help.photoroom.com自体が日本語ロケール切替に対応しており、上記記事の言語リストにも日本語が含まれる。

### DB update recommendation
`japaneseUi: "unknown"` → `"true"` に更新（公式ヘルプ記事が直接的根拠）。`japanesePrompt`は`"unknown"`のまま維持。

## Creatify

### Japanese UI
PARTIAL。公式ヘルプFAQに「Creatify supports 29 languages...English, Hindi, Portuguese, French, German, Japanese, Chinese, Spanish...」との記載あり。ただしこれはナレーション/音声出力言語の説明であり、アプリ本体のUI（メニュー・ボタン等）が日本語化されるかは別軸で確認できていない。UI言語切替機能の直接的な確認は未達。
Source: https://help.creatify.ai/en/articles/10468243-faqs（2026-08-13アクセス）

### Japanese prompt support
UNKNOWN。広告スクリプト・プロンプト入力への日本語対応を明記した公式情報は見つからず。

### Japanese documentation
PARTIAL。help.creatify.ai（Learning Center・FAQ）は英語のみ確認。日本語版ヘルプ記事は発見できず。

### Commercial use
PARTIAL。公式FAQに「You own all of your creatives, even after your plan ends. You can use them in any channel without limitations.」との記載があり、商用利用が事実上許容される強い示唆はあるが、独立した「商用利用可」条項をToS本文（creatify.ai/terms）で直接確認するには至らなかった（fetch試行が不安定、フッターリンクからのブラウザ再確認を推奨）。無料プランと有料プランで権利内容が区別されているかも未確認。
Source: https://help.creatify.ai/en/articles/10468243-faqs（2026-08-13アクセス）

### Output rights
VERIFIED（所有権について）。公式FAQで「You own all of your creatives, even after your plan ends.」と明記。ただし無料プラン・有料プランでの区別は明記されておらず、UGC/AIアバター出力に対する肖像権・ストック俳優利用に関する追加制限（AI Ethics/Consent and Safety Firstページ言及あり、内容未検証）は依然UNKNOWN。
Source: https://help.creatify.ai/en/articles/10468243-faqs（2026-08-13アクセス）

### DB update recommendation
`commercialUse: "unknown"` → 変更しない（ToS本文での明示的な商用利用可否条項が未確認のため、FAQの所有権記述のみでは`commercialUse`フィールド全体を確定させる根拠として不十分）。ただし本文・commercialUseNote・FAQに「公式ヘルプによると、生成した広告クリエイティブは契約終了後も所有権がユーザーに帰属するとされています」という所有権に関する一文を追記する価値はある（要ユーザー承認）。本タスクでは追記を保留し、次回タスクでの反映候補として記録。

## Recraft

### Japanese UI
UNKNOWN。recraft.aiおよびdocsページに言語切替UI・日本語表示の確認できる情報なし。

### Japanese prompt support
UNKNOWN。公式情報になし。

### Japanese documentation
UNKNOWN。recraft.ai/docs配下に日本語版ページ・切替の確認できる情報なし。

### Pricing
VERIFIED。公式ドキュメント（recraft.ai/docs/plans-and-billing/paid-plans）より: Basic $12/月（年払い時$10/月、年額$120）、1,000クレジット/月。Proはクレジット段階制（2,000クレジット$20/月・年払い$16/月、4,000クレジット$40/月・年払い$32/月、8,000クレジット$80/月・年払い$64/月、16,000クレジット$160/月・年払い$128/月）。Teamsプランも同様にクレジット段階制。月払い・年払い両方が全ティアで選択可能。
Source: https://www.recraft.ai/docs/plans-and-billing/paid-plans（2026-08-13アクセス）

無料プラン制限（PARTIAL）: 公式ドキュメント（recraft.ai/docs/plans-and-billing/free-plan）より「1日最大3画像までアップロード可」「1プロンプトあたり最大2画像生成」「クレジット追加購入は有料プランのみ」「無料プランの生成画像は公開されコミュニティギャラリーに表示される場合がある」の記載を確認。ただし1日あたりの正確なクレジット数（第三者情報では30〜50の間で不一致）は本タスクでは確定できず、要再確認。
Source: https://www.recraft.ai/docs/plans-and-billing/free-plan（2026-08-13アクセス）

### Commercial use
VERIFIED。公式利用規約（recraft.ai/terms）第7.1条（無料ティア）: 「no commercial use of Free Tier Assets is permitted」「Free Tier Assets are owned by Recraft and may not be sold, licensed or transferred」。第7.2条（有料サブスクリプション）: 「You own all Assets you create with the Services and Recraft hereby assigns to you all copyright rights it may have in the Assets」（ただし生成物をAIモデルの学習に使用することは禁止）。
Source: https://www.recraft.ai/terms（2026-08-13アクセス）

### Operator / legal entity
VERIFIED。利用規約冒頭に「Recraft Inc.（'Recraft', 'we', 'our' or 'us'）」と明記。運営法人所在国・詳細住所は本規約本文からは未確認。
Source: https://www.recraft.ai/terms（2026-08-13アクセス）

### Post-cancellation rights
PARTIAL。第7.2条の著作権譲渡（「Recraft hereby assigns to you all copyright rights」）は生成時点で完了する権利移転であり、文言上は解約後も所有権自体は失われないと読める。ただし第14条（Term and Termination）は「Upon any termination, all rights and licenses granted to you pursuant to these Terms shall terminate immediately」と規定し、解約時に「本規約に基づき付与された権利・ライセンス」が即時終了するとしており、これが既に譲渡済みの著作権（7.2条）に影響するか、サービス利用ライセンスのみを指すかは条文上明確に切り分けられていない。同条は解約後も「Assets をいつでもダウンロード・エクスポート可能」とも規定。既存DB記載「有料プラン加入中に生成した画像は解約後も所有権・商用利用権が継続する」は7.2条の譲渡文言と整合的だが、14条との関係は完全には一義的でないため、本タスクではPARTIAL（強い支持材料あり、断定不可）として維持。
Source: https://www.recraft.ai/terms（2026-08-13アクセス）

### DB update recommendation
- `pricingModel`は`"credit"`のまま維持可（正確）。`pricingStatus: "unconfirmed"` → `"partial"`または`"verified"`へ更新可能（ティア・価格帯は公式ドキュメントで確認済みだが、記事本文の料金表は未更新のため要修正）。
- `lowestPaidPlan`: `"要公式確認"` → `"Basic $12/月（年払い時$10/月）"` に更新可能。
- `currency`: `"unknown"` → `"USD"` に更新可能。
- `commercialUse`: `"limited"`のまま維持（正確、追加根拠が明確化された）。`commercialUseNote`の文言を第7.1/7.2条の直接引用に基づき精緻化可能。
- `japanBilling.providerName`: `"Recraft（運営法人名は要公式確認）"` → `"Recraft Inc."` に確定可能。

## Resolved Items

| 項目 | 結果 |
|---|---|
| Photoroom 日本語UI | VERIFIED（対応あり） |
| Photoroom 日本語ドキュメント | VERIFIED（対応あり） |
| Creatify 出力物所有権 | VERIFIED（解約後も所有） |
| Recraft 料金ティア・価格・課金周期 | VERIFIED |
| Recraft 無料/有料の商用利用区分 | VERIFIED |
| Recraft 運営法人（Recraft Inc.） | VERIFIED |

## Remaining VERIFY Items

- Photoroom: 日本語プロンプト対応（UNKNOWN、実機テスト必要）
- Creatify: 日本語UI（PARTIAL、UI本体の言語切替確認未達）、日本語プロンプト（UNKNOWN）、日本語ドキュメント（PARTIAL、日本語記事未発見）、商用利用のToS本文条項（PARTIAL、FAQ止まり）、プラン別権利差（UNKNOWN）、UGC/アバター追加制限（UNKNOWN）
- Recraft: 日本語UI/プロンプト/ドキュメント（すべてUNKNOWN）、無料プランの1日クレジット数正確値（PARTIAL、第三者情報間で不一致）、解約後の14条と7.2条の関係（PARTIAL）

## Sources

- Photoroom: https://help.photoroom.com/en/articles/7323117-change-the-language-of-photoroom（2026-08-13アクセス）
- Creatify: https://help.creatify.ai/en/articles/10468243-faqs（2026-08-13アクセス）
- Recraft: https://www.recraft.ai/docs/plans-and-billing/paid-plans, https://www.recraft.ai/docs/plans-and-billing/free-plan, https://www.recraft.ai/terms（いずれも2026-08-13アクセス）

## Decision Table

| Tool | Item | Before | Result | DB Update |
|------|------|--------|--------|-----------|
| Photoroom | Japanese UI | unknown | VERIFIED | 適用（本タスクで実施） |
| Photoroom | Japanese prompt | unknown | UNKNOWN | 変更なし |
| Photoroom | Japanese docs | unknown | VERIFIED | 参考情報として本文に反映（フィールドなし） |
| Creatify | Japanese UI | unknown | PARTIAL | 変更なし |
| Creatify | Japanese prompt | unknown | UNKNOWN | 変更なし |
| Creatify | Japanese docs | unknown | PARTIAL | 変更なし |
| Creatify | Commercial use | unknown | PARTIAL | 変更なし（次回タスク候補として記録） |
| Creatify | Output ownership | (フィールドなし) | VERIFIED | 本文への追記候補として記録（本タスクでは未適用） |
| Recraft | Japanese UI/prompt/docs | unknown | UNKNOWN | 変更なし |
| Recraft | Pricing tiers/prices | unconfirmed | VERIFIED | 適用（本タスクで実施） |
| Recraft | Commercial use free/paid | limited | VERIFIED | commercialUseNote精緻化（本タスクで実施） |
| Recraft | Operator/legal entity | 要公式確認 | VERIFIED | 適用（本タスクで実施） |
| Recraft | Post-cancellation rights | 断定（記述済み） | PARTIAL | 変更なし（既存記述を維持しつつ根拠明確化） |
