# DreamStudio無料利用条件確認

- 確認日: 2026-07-24
- 確認した公式URL: https://stability.ai/brand-studio-plans （Stability AI公式 Brand Studio料金ページ）
- 常設無料プラン: なし（Core/Enterprise共にクレジット購入制）
- 無料トライアル: あり（Trial：Core機能を無料で試用可能）
- 初回無料クレジット: あり
- 無料クレジット数: 1,000クレジット
- クレジット有効期限/終了条件: クレジット使用後に終了（"Trial ends after credits used"）
- 支払い情報の要否: 公式ページ上、Trial開始時点で支払い情報必須の記載なし
- 継続利用条件: クレジット消費後は有料プラン（Core $50/月・5,000クレジット/月・翌月繰越なし、またはEnterprise個別見積り）への移行が必要
- 判断できなかった項目: 地域・アカウント・キャンペーンによる無料クレジット数の差異（公式ページに明記なし）

## 判定

- free_plan: false（常設の無料プランは存在しない）
- free_trial: true（Trialプランとして提供）
- signup_credits: true（1,000クレジット付与）
- paid_only: false（Trialの範囲では無料利用可）

## サイトで採用する表記

- 「無料プランなし」単体表記は禁止（誤解を招くため）
- 採用表現: 「Trial 1000cr（使い切り）」「常設の無料プランではなく、Trial 1000クレジット（使用後終了）」

## DBで採用する値

- `src/content/tools/dreamstudio.md` の `freePlan: "limited"` は上記判定と整合しており変更不要（既に2026-06-21に公式確認済み・`freePlanNote`にTrial 1000クレジットの説明あり）
- DBは正、ページ側の「無料プランなし」表記のみ誤り（4+2ファイルで修正）
