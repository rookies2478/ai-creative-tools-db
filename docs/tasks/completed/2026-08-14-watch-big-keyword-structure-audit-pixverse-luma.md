# Task Result

## Goal

WATCH区分ビッグキーワード候補PixVerse・Luma AIの実装前構造監査（レンダリング経路・データ制御元・FAQ/構造化データ/カニバリの確定）。SEO実装は行わない。

## Result

PASS

## Summary

PixVerse・Luma AIともに`src/pages/tools/[slug].astro`のSTATIC_OVERRIDESに含まれ、`src/pages/tools/pixverse/index.astro`・`src/pages/tools/luma-ai/index.astro`が`ToolDetailPage.astro`経由の専用ルートとして単独描画される（kling-ai/hailuo-ai/stable-diffusionと同一パターン）。title/meta/H1/lead/FAQ/basicInfo/pricing/commercial/CTAはすべてastroファイル内ハードコードで、`.md`のfaqs・本文Markdownは完全にdead data。**ライブFAQ数はPixVerse 10件・Luma AI 9件**（big-keyword-seo-priority-2026-08-13.mdの「FAQ 0件」記載はkling-ai/hailuo-ai同様、`.md`本文見出し数のみを数えた誤りと判明、本監査で訂正）。両者の最大の構造差は3点：①**VideoObject JSON-LDはPixVerse実装済み・Luma AI未実装**（同条件のサンプル動画を持ちながら差がある）、②nextReads/conditionsはPixVerseが全ハードコード（9件）・Luma AIは`toolRelatedLinks.ts`経由のDBドリブン（2件のみで薄い）、③usagePolicyの`.md`→astro接続はLuma AIのみ実施済み（PixVerseは`.md`にusagePolicyがあるがastro側prop未指定でdead）。カニバリリスクは両ツールともLOW（専用比較記事なし）。商用利用・無料枠・透かし・日本語対応の事実がPixVerse約7箇所・Luma AI約8箇所（usagePolicy分+1）に分散する構造的driftリスクを記録。両ツールともIMPLEMENTATION_READY、構造的に実装しやすい候補はPixVerse（単一ファイル完結・外部共有ファイル依存なし）。詳細はdocs/audits/watch-big-keyword-structure-audit-pixverse-luma-2026-08-14.md参照。

## Changed Files

- docs/audits/watch-big-keyword-structure-audit-pixverse-luma-2026-08-14.md（新規）
- docs/tasks/active/2026-08-14-watch-big-keyword-structure-audit-pixverse-luma.md → completed/へ移動
- docs/tasks/LATEST.md（更新）

## Checks

- task validation: PASS
- build: 未実施（docs-onlyのため不要）
- diff check: PASS（git diff --check 差分なし）
- scope validation: PASS
- data quality: N/A
- publish check: N/A
- preview: N/A
- GitHub Actions: N/A（未push）

## Git

- branch: master
- commit: 未実施
- push: 未実施
- origin sync: 変更なし（作業ツリーのみ、直前commit 5caaddaのまま）
- working tree: 監査doc+task記録のみの変更（未commit）

## Production

- state: NOT_DEPLOYED
- checked URLs: なし

## Decisions

- PixVerseのusagePolicy prop未接続（dead field）の是正はSEO実装タスクのスコープ外として切り離す
- Luma AIのVideoObject JSON-LD追加・nextReads拡充は次フェーズ実装候補として記録するが本監査では実施しない
- pixverse.md/luma-ai.mdは編集対象外（ライブページ非反映のため）

## LATEST Update

docs/tasks/LATEST.mdをこの監査結果で更新。current_active_task=none。

## Next

GSC/SERPレビュー結果に基づき、PixVerse・Luma AIいずれかのbig-keyword SEO強化タスクへ進める（構造的にはPixVerseがやや単純、Luma AIはVideoObject新規追加が主な差分）。

---
成功時も生ログ全文は保存しない。失敗時も原因特定に必要な最小限の情報だけを記載する。
