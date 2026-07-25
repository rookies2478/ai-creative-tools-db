# AUD-28 Luma AI ライセンス条件URL検証記録（NO_CHANGE）

- **確認日**: 2026-07-25
- **対象ツール**: Luma AI
- **対象ファイル**: `src/pages/tools/luma-ai/index.astro:235`（sources配列）

## 監査指摘
DBにライセンス条件URLの記載がないが、ページ側が独自に`https://lumalabs.ai/learning-hub/licensing`というURLを追加している。DBにないURLが記事側で独自追加されている点を懸念。

## DB値
`usagePolicy.officialSourceUrl: "https://lumalabs.ai/pricing"`
`usagePolicy.termsUrl: "https://lumalabs.ai/legal/terms-of-service"`
（ライセンスガイド専用のURLフィールドはDBに存在しない）

## 表示値
`src/pages/tools/luma-ai/index.astro`の`sources`配列（出典リンク一覧）内に以下がある：
```
{ tag: '商用利用', label: 'Luma AI 商用利用・ライセンス条件（公式）', href: 'https://lumalabs.ai/learning-hub/licensing' }
```

## 不一致分類
単なる未掲載（DB側にsources相当の複数出典を管理するフィールドがなく、ページ側の`sources`配列が出典一覧の実質的な正本になっている）。事実誤りではない。

## 確認した一次情報
- 情報源: `https://lumalabs.ai/learning-hub/licensing`（WebFetchで直接取得）
- 確認日: 2026-07-25
- 内容: 2024-11-14公開・2025-05-28更新の公式ライセンスガイド。Free/Liteプランは商用利用不可・透かし常時付与、Plus/Unlimited/Enterpriseプランは商用利用権付与・透かしなしと明記。生成物の所有権はユーザーに帰属するが、Luma側の利用権範囲がプランにより異なる旨も記載。実在し、内容も正確な公式一次情報であることを確認。

## 採用した値
ページの`sources`配列に既に掲載されているURLをそのまま維持（変更なし）。

## 修正内容
なし。当初DB（`src/content/tools/luma-ai.md`のusagePolicy）に`licensingGuideUrl`フィールドを追加する案を検討したが、これは`src/content/config.ts`のzodスキーマにusagePolicyの新規キーを追加する必要があり、スキーマ変更に相当するため撤回した（一度追加後、範囲逸脱と判断し元に戻し済み。`git diff src/content/tools/luma-ai.md`で差分なしを確認）。

## 判断できなかった項目
DBの`usagePolicy`は単一の`officialSourceUrl`/`termsUrl`のみを持ち、ページ側の`sources`配列（複数の公式出典をタグ付きで列挙する構造）に相当する概念がDB側にない。この設計差は今回のバッチでは解消しない。

## HOLDまたはNO_CHANGE理由
**NO_CHANGE**。ページ側の`sources`配列は「関連する複数の公式出典を列挙する」という、DBの単一URL管理とは異なる目的の別構造であり、そこに実在・内容確認済みの公式URLが含まれていること自体は問題ではない。DBに同種のURLコレクション用フィールドがないのは事実だが、これを追加するには`config.ts`のスキーマ変更が必要で、今回のバッチルールで禁止されている大規模スキーマ変更に該当するため見送った。

## 構造上の課題
DBの`usagePolicy`が単一のURL（`officialSourceUrl`/`termsUrl`）のみを保持し、ページ側で個別に追加される複数の公式出典（料金・商用利用・無料枠など目的別URL）を構造的に管理できていない。将来的に`usagePolicy.sourceUrls`のような配列フィールドへの統合を検討する余地がある（今回はスキーマ変更対象外のため提案のみ）。
