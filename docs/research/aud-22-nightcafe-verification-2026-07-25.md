# AUD-22 NightCafe pricingUrl検証記録

- **確認日**: 2026-07-25
- **対象ツール**: NightCafe
- **対象ファイル**: `src/content/tools/nightcafe.md`(36-37 vs 123)

## 監査指摘
`japanBilling.pricingUrl`（123行目）は`https://creator.nightcafe.studio/pricing`を料金一次情報として使用しているが、同ファイル内の`pricingSourceUrl`/`pricingSourceNote`（36-37行目）はブログ記事URL（`is-nightcafe-free`）を使用し、「/pricingページの実在・内容は未確認」という趣旨のnoteになっていた。**DB内部で2つのフィールドが矛盾**していた。

## DB値（修正前）
- `pricingSourceUrl`: `https://nightcafe.studio/blogs/info/is-nightcafe-free`
- `pricingSourceNote`: "公式ブログ記事（料金専用ページではない）。無料枠の案内はあるが有料プランの月額・tier構成を明示した料金表ページURLは未確認。最新の料金はNightCafe公式サイトをご確認ください。"
- （参考）`japanBilling.pricingUrl`: `https://creator.nightcafe.studio/pricing`（変更なし）

## 一次情報
- 情報源: `https://creator.nightcafe.studio/pricing`（WebFetchで直接取得）
- 確認日: 2026-07-25
- 内容: 実在するNightCafe PRO専用の料金ページで、Pay Monthly/Pay Quarterly（15%割引）/Pay Annually（40%割引）の3つの支払いプランと、Fast Credits/Relax Creditsの説明が確認できた。具体的なドル金額はページ抜粋からは取得できなかったが、tier構成を持つ実在の公式料金ページであることは確認できた。

## 採用した値
`/pricing`が実在の公式料金ページであることが確認できたため、`pricingSourceUrl`を`https://creator.nightcafe.studio/pricing`に更新し、`pricingSourceNote`も実態に合わせて修正。無料枠の案内があるブログ記事URLは補足情報として note内に残した。

## 修正内容
`src/content/tools/nightcafe.md`
- `pricingSourceUrl`: ブログURL → `https://creator.nightcafe.studio/pricing`
- `pricingSourceNote`: 「料金表ページURLは未確認」という記述を「月払い・四半期払い・年払いのプラン選択あり」という実態確認済みの内容に更新

## 判断できなかった項目
`/pricing`ページの具体的な月額ドル金額（ログイン状況・地域により表示が変動する可能性があるため、WebFetch取得結果には数値が含まれていなかった）。金額自体はnote内で「最新料金は公式サイトでご確認ください」と案内するに留め、断定していない。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
`pricingSourceUrl`（記事全体の情報源）と`japanBilling.pricingUrl`（決済用URL）という類似目的の2フィールドが同一ファイル内に存在し、片方だけ更新されると内部矛盾が生じる構造。将来的には一次情報URLを一本化するか、両フィールドの役割をスキーマコメントで明確化することを推奨（今回はスキーマ変更対象外のため提案のみ）。
