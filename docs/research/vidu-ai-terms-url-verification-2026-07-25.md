# Vidu AI規約URL確認

- 確認日: 2026-07-25

## AUD-12の監査指摘

DBの`usagePolicy.termsUrl`（`src/content/tools/vidu-ai.md`）とページ側（`src/pages/tools/vidu-ai/index.astro`）で利用規約URLが不一致とされていた。監査要約上の表記は「DB `https://www.vidu.com/terms` / ページ `https://www.vidu.com/terms-of-service`」。

## DBの旧URL

`src/content/tools/vidu-ai.md`の全箇所（`usagePolicy.termsUrl`(78)、`sources`(88)、`sourceRefs`(99)、`japanBilling.sourceUrls`(136)）は既に`https://www.vidu.com/terms`で統一されていた。DB内部の不一致はなし。

## ページ側のURL

- `src/pages/tools/vidu-ai/index.astro`(66,227): `https://www.vidu.com/terms-of-service`
- `src/content/guides/commercial-use-cost-comparison.md`(283,347): `https://www.vidu.com/terms-of-service`

## 確認した公式URL候補と検証結果

| URL | HTTPステータス相当 | ページタイトル | 内容種別 | 契約主体 | 更新日 | 採用可否 |
|---|---|---|---|---|---|---|
| https://www.vidu.com/terms | 200 | Vidu Terms of Service | 利用規約 | ユーザー（you）とVidu Team | 2026-07-03 | 採用（DB既存値） |
| https://www.vidu.com/terms-of-service | 404 Not Found | - | - | - | - | 不採用（存在しないページ） |

WebFetchで両URLを直接取得して確認（検索スニペットのみでの判断はしていない）。

## 利用規約・プライバシーポリシー・コンテンツポリシー・商用利用条件

今回はterms URL不一致の解消に限定したため、privacy/content policy等の別URL種別の再調査は行っていない。DB内の既存記載（`usagePolicy.termsUrl`のみ、privacyUrl等の個別フィールドは本ツールのスキーマ運用上未使用）を踏襲。

## 契約主体・更新日

契約主体: Vidu Team（Shengshu Technology系）。更新日: 2026-07-03（取得ページ内表記）。

## DBで採用するURL

`https://www.vidu.com/terms`（変更なし）。`usagePolicy.lastReviewed`・`reviewed.terms`を2026-07-25に更新。

## サイトで採用するURL

`https://www.vidu.com/terms`に統一（ページ側・記事側の`terms-of-service`表記を修正）。

## 判断できなかった項目

- privacyUrl・contentPolicyUrl等、terms以外のURL種別の一次情報再検証は今回のスコープ外。
- 地域別URL・言語別URLの差異は未確認（今回のAUD-12はterms URLの生死・一致のみが論点のため）。

## スキーマ上の課題

`usagePolicy`にはterms用の`termsUrl`のみ存在し、privacy/content policy等の個別URLフィールドがない。将来的に規約種別ごとのURL管理が必要になった場合はスキーマ拡張を検討（今回は対象外）。
