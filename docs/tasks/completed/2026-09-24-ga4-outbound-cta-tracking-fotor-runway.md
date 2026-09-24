# Task Result

## Goal

Fotor AI / RunwayのCTAクリックにGA4イベント（official_site_click / affiliate_click）を計測する共通基盤を追加し、Affiliate承認後にリンク差替えとdata属性の値変更だけで実証開始できる状態にする。URL自体は変更しない（審査中のため）。

## Result

PASS

## Summary

- `src/layouts/BaseLayout.astro`: documentレベルのdelegated clickハンドラを新規追加。`[data-outbound-type]`要素のクリックを捕捉し、`typeof window.gtag === 'function'`のときのみ`gtag('event', ...)`を発火する（未ロード時は何もしない・エラーも投げない）。`import.meta.env.PROD`条件の外側に配置したため、dev環境でもハンドラ自体は常に存在しガード節で安全にno-opする。`event.preventDefault()`は呼ばないため、`target="_blank"`を含む既存のナビゲーション挙動は無変更。
- `src/components/ToolDetailPage.astro`: `primaryCta`/`secondaryCta`のCta型に`outboundType?: 'official' | 'affiliate'`と`ctaPosition?: string`を追加。値が指定された場合のみ、対応する`<a>`要素に`data-outbound-type`/`data-tool-name`（既存の`toolName` propを再利用、新規prop不要）/`data-cta-position`を出力する。未指定時は属性を一切出さないため、他27ツールのCTAは属性・挙動・表示ともに完全無変更。
- `src/pages/tools/fotor-ai/index.astro` / `src/pages/tools/runway/index.astro`: `primaryCta`に`outboundType: 'official', ctaPosition: 'hero'`、`secondaryCta`に`outboundType: 'official', ctaPosition: 'pricing'`を追加。`href`/`label`/`rel`は無変更（Affiliate未承認のためURLは現状維持）。
- GA4 Measurement IDは`BaseLayout.astro`の既存`G-YTH7GM5ZGT`をそのまま使用。新規IDは作成していない。
- `destination_url`はクリックされたアンカー自身の`href`から、`page_path`は`window.location.pathname`から取得する共通ロジックとし、別途data属性として複製していない（実際の遷移先と乖離しない設計）。
- `src/utils/resolveToolOutboundLink()` / `src/data/toolAffiliateLinks.ts` / `src/data/affiliatePrograms.ts`（案C構造）は今回一切変更していない。Fotor/Runwayをこれらのファイルへ接続する変更（案Cへの追加展開）も行っていない。

## Changed Files

- 変更: `src/layouts/BaseLayout.astro`, `src/components/ToolDetailPage.astro`, `src/pages/tools/fotor-ai/index.astro`, `src/pages/tools/runway/index.astro`, `docs/tasks/LATEST.md`
- 新規: `docs/tasks/completed/2026-09-24-ga4-outbound-cta-tracking-fotor-runway.md`
- 削除: `docs/tasks/active/2026-09-24-ga4-outbound-cta-tracking-fotor-runway.md`（completedへ移動）
- 計4ファイル変更・1ファイル新規・1ファイル削除相当

## Checks

- task validation: PASS
- build: PASS（`npm run build`、95ページ、ページ数不変）
- diff check: PASS（`git diff --check`、CRLF警告のみ）
- scope validation: PASS
- data quality: 対象外（`src/content/tools/*.md`は本タスクで変更していない）
- publish check: 未実施（本タスクのrequired_checksに含めていない、前例と同様）
- preview: 実施。`npm run preview`（本番相当ビルド）でFotor AI/Runway両ページの primaryCta（hero）・secondaryCta（pricing）を実クリックし、以下を確認した。
  - Fotor AI hero: `official_site_click` / `{tool_name:"Fotor AI", cta_position:"hero", destination_url:"https://www.fotor.com/jp/ai-image-generator/", page_path:"/tools/fotor-ai/"}`
  - Fotor AI pricing: `official_site_click` / `{tool_name:"Fotor AI", cta_position:"pricing", destination_url:"https://www.fotor.com/jp/pricing/", page_path:"/tools/fotor-ai/"}`
  - Runway hero: `official_site_click` / `{tool_name:"Runway", cta_position:"hero", destination_url:"https://runwayml.com/", page_path:"/tools/runway/"}`
  - 両CTAともクリックにより実際に新規タブで外部サイトへ正常遷移することを確認（`target="_blank"`維持）。
  - `data-outbound-type`を`"official"`→`"affiliate"`へ属性値のみ書き換えてクリックし、発火イベント名が`affiliate_click`へ切り替わることを確認（コード変更不要な設計を実証）。
  - `npm run dev`（`import.meta.env.PROD`がfalseとなりgtagスクリプト自体が読み込まれない環境）で実クリックを行い、`typeof window.gtag === 'undefined'`のままJSエラー・コンソールエラーが発生しないこと、かつ外部サイトへの遷移自体は正常に行われることを確認。
  - 本タスクの変更は対象2ページの`<a>`要素へのdata属性追加のみで、`class`/`style`/CSSファイルは一切変更していない。構造的にモバイル/PC表示へ影響しないため、ブラウザ実機のビューポート変更確認は本タスクでは実施していない（ツール環境の制約でウィンドウリサイズ不可だったため）。
- github actions: push未実施のため未確認

## Git

- branch: master
- commit: 本ファイルと同じコミットに含まれる（hashはコミット後に確定、次回LATEST.md更新時に追記予定）
- push: 未実施〔人間の承認待ち〕
- working tree: commit後clean（想定）

## Production

- state: NOT_DEPLOYED
- checked URLs: なし（本番デプロイなし）

## Decisions

Affiliate未承認のFotor/RunwayのCTA URLは現状維持（official）のまま据え置き、計測基盤のみ先行実装する方針を採用。将来の切替は`fotor-ai/index.astro`・`runway/index.astro`の`outboundType`値を`'affiliate'`に変更するのみで完結する設計とし、`ToolDetailPage.astro`・`BaseLayout.astro`側の再変更は不要。

## Next

Fotor / RunwayのAffiliate ASP審査が承認され次第、`src/data/affiliatePrograms.ts`にstatus更新、`src/data/toolAffiliateLinks.ts`に承認済みエントリを追加した上で、`fotor-ai/index.astro`・`runway/index.astro`の該当CTAの`outboundType`を`'affiliate'`に変更し、`href`を承認済みアフィリエイトURLへ更新する（このときのみURL変更を実施）。
