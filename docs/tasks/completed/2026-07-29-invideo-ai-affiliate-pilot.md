# Task Result

## Goal

InVideo AIのprimary CTAだけを案C（affiliatePrograms.ts + toolAffiliateLinks.ts + resolveToolOutboundLink()）の公開リンク管理へ接続し、アフィリエイト未承認時はofficial URLへ安全にfallbackする状態にする。

## Result

PASS

## Summary

- `src/data/affiliatePrograms.ts`（新規）: 調査・申請管理層。InVideo AIのみ1件、status:candidate、approvalStatus:not_appliedで登録（監査で確認済みのImpact.com経由プログラム情報のみ記載、応募・承認は未実施）。
- `src/data/toolAffiliateLinks.ts`（新規）: 公開CTA承認済みリンク層。InVideo AIの承認済みURLが実在確認できないため、公開エントリは作成せず空配列のまま（推奨案どおり）。
- `src/utils/resolveToolOutboundLink.ts`（新規）: 共通ヘルパー。`toolAffiliateLinks.ts`のみ参照し、`affiliatePrograms.ts`は直接参照しない。未登録・enabled:false・未承認・URL不正の場合は`officialUrl`をそのまま返す設計。
- `src/pages/tools/invideo-ai/index.astro`: `primaryCta.href`をヘルパーの戻り値経由に変更。secondaryCta・sources・relatedTools・japanBilling等は無変更。
- `src/components/ToolDetailPage.astro`: `primaryCta`に任意の`rel`フィールド、任意propの`primaryCtaDisclosure`を追加（後方互換、デフォルトは従来通り`nofollow noopener noreferrer`）。他28ツールの呼び出し元は変更していないため既存動作を完全維持。
- 現状、InVideo AIの承認済みアフィリエイトURLが未取得のため、実際の解決結果はofficial（`https://invideo.io`、rel="noopener noreferrer"）となり、PR開示は表示されない。
- `scripts/validate-affiliate-links.mjs`（新規）+ `package.json`に`validate:affiliate-links`スクリプト追加。toolSlug重複なし・enabled時はapproved必須・enabled時は有効URL必須・disclosureRequired整合性・rel文字列・resolveToolOutboundLink.tsがtoolAffiliateLinks.tsのみ参照することを検証。PASS。
- `docs/decisions/affiliate-link-architecture.md`（新規）: 案Cの構造・優先順位・変更禁止範囲を正式決定として記録。

## Changed Files

- 新規: `src/data/affiliatePrograms.ts`, `src/data/toolAffiliateLinks.ts`, `src/utils/resolveToolOutboundLink.ts`, `scripts/validate-affiliate-links.mjs`, `docs/decisions/affiliate-link-architecture.md`, `docs/tasks/completed/2026-07-29-invideo-ai-affiliate-pilot.md`
- 変更: `src/pages/tools/invideo-ai/index.astro`, `src/components/ToolDetailPage.astro`, `package.json`, `docs/tasks/LATEST.md`
- 削除: `docs/tasks/active/invideo-ai-affiliate-pilot.md`（completedへ移動）
- 計9ファイル変更・4ファイル新規・1ファイル削除相当

## Checks

- task validation: PASS
- build: PASS（92ページ）
- diff check: PASS
- scope validation: PASS
- data quality: 対象外（`src/content/tools/*.md`は本タスクで変更していない）
- publish check: 未実施（本タスクのrequired_checksに含めていない。他タスクと同様dist/への直接アクセスが本環境権限でブロックされるため生成HTML直接確認は未実施）
- preview: 未実施
- GitHub Actions: push後に別途確認が必要
- validate:affiliate-links（新規追加）: PASS

## Git

- branch: master
- commit: （push後に確定、下記GIT操作記録参照）
- push: 実施
- origin sync: push後に確認
- working tree: push後clean

## Production

- state: NOT_DEPLOYED
- checked URLs: なし（本番デプロイなし）

## Decisions

`docs/decisions/affiliate-link-architecture.md`を新規作成し、案Cの採用・`affiliateUrl`フィールドの非推奨化・比較/カテゴリページ変更不要・`relatedTools.official`は今回対象外であることを正式記録した。

## LATEST Update

`docs/tasks/LATEST.md`を本タスクの結果で更新。

## Next

実在するInVideo AIの承認済みアフィリエイトURLをASP（Impact.com）で取得・応募・承認後、`src/data/affiliatePrograms.ts`のapprovalStatusを更新し、`src/data/toolAffiliateLinks.ts`にenabled:true・approvalStatus:approvedのエントリを1件追加する。コード変更は不要（`resolveToolOutboundLink()`が自動的にaffiliateへ切り替える設計のため）。
