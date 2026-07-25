# AUD-19 Kling AI 運営国・会社情報検証記録

- **確認日**: 2026-07-25
- **対象ツール**: Kling AI
- **対象ファイル**: `src/pages/tools/kling-ai/index.astro`(32,117,142,245)

## 監査指摘
DB（`src/content/tools/kling-ai.md`(157-159), 2026-07-13更新）は`providerCountry: "シンガポール"`、`providerName: "KLING AI PTE. LTD.（開発元は中国Kuaishou系・要公式確認）"`と、運営法人（契約主体）と開発元を分離して記載している。一方、ツールページ4箇所は一律「Kling AIは中国Kuaishou運営」「運営が中国企業（Kuaishou）」と、開発元と運営法人を同一視した断定表現になっていた。

## DB値
- `providerName`: "KLING AI PTE. LTD.（開発元は中国Kuaishou系・要公式確認）"
- `providerCountry`: "シンガポール"
- `sourceUrls`: `https://kling.ai/membership/membership-plan`, `https://apps.apple.com/jp/app/id6738049229`

## ページ値（修正前）
- L32 JSON-LD description: 「Kling AIは中国Kuaishou運営のAI動画生成ツール。」
- L62 lead: 「Kling AIはKuaishou（中国）が運営するAI動画生成ツールです。」
- L117 cons: 「運営が中国企業（Kuaishou）のため、データ取り扱いへの注意が必要な場合がある」
- L142 about: 「Kling AIはKuaishou（快手）が運営するAI動画生成ツールです。」
- L245 FAQ: 「Kling AIは中国のKuaishou（快手）が運営しています。」

## 一次情報
- WebSearch（`kling.ai/docs/user-policy`関連の検索結果）: Kling AIの公式利用規約はユーザーとの契約主体を「Kling AI Pte. Ltd. and its affiliates」と規定し、サービスはKuaishouが開発、データはシンガポールのサーバーに保管されているとの二次情報を含む複数の記述を確認。
- `https://kling.ai/membership/membership-plan`、`https://klingai.com/terms-of-service`への直接WebFetchはサーバー側でブロック（HTTP 446）され取得不可であったことを記録。
- 確認できた範囲では、DBの「運営法人（契約主体）＝シンガポール法人（KLING AI PTE. LTD.）、開発元＝中国Kuaishou系」という区分は公式情報の記述と整合的。

## 採用した値
DBの区分（運営法人＝シンガポール、開発元＝中国Kuaishou系）を採用し、ページ側の「運営＝中国Kuaishou」という混同表現を「Kuaishou系が開発／運営法人（契約主体）はシンガポール法人」という表現に修正。

## 修正内容
`src/pages/tools/kling-ai/index.astro`の4箇所（L32, L62, L117, L142, L245の計5箇所を実際には修正）で、開発元（Kuaishou系）と運営法人（契約主体・シンガポール法人）を明示的に分離する表現に統一。

## 判断できなかった項目
- `kling.ai`/`klingai.com`の公式ToS・Privacy Policyへの直接アクセスができなかったため、契約主体の正式名称の一次情報での完全な原文確認はできていない（二次情報での確認にとどまる）。今後直接アクセス可能な環境で再確認を推奨。
- Kuaishouとの資本関係・親会社構造の詳細（100%子会社か、業務委託関係かなど）までは今回確認していない。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。

## 構造上の課題
`providerName`のような自由記述フィールドに「開発元」と「運営法人」の両方の情報を1つの文字列に詰め込んでいるため、ページ側で参照する際に開発元と運営法人が混同されやすい。将来的には`developerName`/`operatorName`のようにフィールドを分離することを検討の余地がある（ただし今回は大規模スキーマ変更の対象外のため提案のみ）。
