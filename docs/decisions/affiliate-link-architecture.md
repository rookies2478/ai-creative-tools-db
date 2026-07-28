# Affiliate Link Architecture (案C)

- decided_at: 2026-07-29
- status: ADOPTED（InVideo AI 1件のpilotとして実装、他ツールへの展開は未実施）
- 根拠監査:
  - docs/audits/affiliate-program-management-audit-2026-07-28.md
  - docs/audits/affiliate-cta-rendering-audit-2026-07-28.md
  - docs/audits/affiliate-comparison-category-link-audit-2026-07-28.md

## 決定事項

1. アフィリエイトの調査・申請管理は `src/data/affiliatePrograms.ts` で行う。この層は公開CTAコンポーネントから直接参照してはならない。
2. 公開CTAで実際に使用できるリンクは `src/data/toolAffiliateLinks.ts` のみが正本。`enabled === true` かつ `approvalStatus === "approved"` かつ有効なURLを持つエントリのみが公開解決される。
3. URL解決は共通ヘルパー `src/utils/resolveToolOutboundLink()` を経由する。未登録・`enabled:false`・未承認・URL不正の場合は必ず `officialUrl` へfallbackする。
4. affiliateリンクの`rel`は`sponsored nofollow noopener noreferrer`、official時の`rel`は`noopener noreferrer`とする。
5. PR開示（「このページにはアフィリエイトリンクが含まれます。」）は、そのツールのCTAが実際にaffiliateとして解決された場合のみ、対象ページ限定で表示する。
6. `src/content/tools/*.md`の`affiliateUrl`フィールドは休眠・非推奨とする。新規設定は禁止。既存の参照コード（`src/pages/tools/[slug].astro`, `src/components/ToolSummaryTable.astro`）は現行29ツールに対して到達不能（dead code）のまま維持し、rel出し分けの参考実装として保持する。削除は行わない。
7. `src/pages/comparisons/*/index.astro`・`src/pages/categories/*/index.astro`は現状ツール公式サイトへの外部CTAを持たないため、案Cの変更対象外とする。
8. `relatedTools[].official`（関連ツールの公式サイトリンク）は現行ビルドに反映されるACTIVEな経路だが、自ツールのCTA切替が先決のため当面の変更対象外とする。
9. 料金ページ・利用規約ページ・比較記事の出典（sources）リンクは、事実確認のための引用リンクであり購入導線ではないため、アフィリエイト置換の対象外とする。

## Why

現行29ツールの実ページは`ToolDetailPage.astro`の`primaryCta`/`secondaryCta`にハードコードされたURL文字列を使用しており、既存の`affiliateUrl`スキーマとその参照ロジックは到達不能だった。未承認・未確認のアフィリエイト情報を誤って公開CTAに露出させるリスクを構造的に防ぐため、調査層と公開層を分離する案Cを採用した。

## How to apply

- 新しいツールでアフィリエイトを検討する場合は、まず`affiliatePrograms.ts`に調査記録を追加し、ASP側で承認が取れてから`toolAffiliateLinks.ts`にエントリを追加する。
- 各ツールの`index.astro`は`resolveToolOutboundLink({ toolSlug, officialUrl })`の戻り値をprimaryCtaへ渡すだけでよい。他ファイルの変更は不要。
- 展開時は1ツールずつ`index.astro`を書き換える段階導入とし、比較・カテゴリページは変更しない。
