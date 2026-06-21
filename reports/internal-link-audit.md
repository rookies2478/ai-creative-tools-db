# 内部リンク監査レポート

実施日: 2026-06-20

## 概要

| 項目 | 値 |
|------|----|
| 実在URL数 | 79件 |
| 内部リンク総数 | 1530件 |
| ユニークリンク先数 | 79件 |
| リンク切れ件数 | 0件 |
| 修正件数 | 0件 |

## リンク切れ

なし（0件）

## 重要導線確認

| ページ | 導線状況 | 判定 |
|--------|----------|------|
| /categories/image-generation/ | 複数箇所からリンクあり | OK |
| /categories/video-generation/ | 複数箇所からリンクあり | OK |
| /conditions/free/ | 複数箇所からリンクあり | OK |
| /conditions/commercial-use/ | 複数箇所からリンクあり | OK |
| /guides/commercial-use-copyright/ | ナビ・複数コンテンツからリンクあり | OK |
| /tools/ | ナビ・複数ページからリンクあり | OK |
| /comparisons/midjourney-vs-adobe-firefly/ | コンテンツ内でリンクあり | OK |
| /comparisons/runway-vs-kling-ai/ | カテゴリページ等でリンクあり | OK |

## Haiper導線確認

- `pricingStatus: "service_changed"` が設定済み
- `shortDescription` にシャットダウン注記あり
- `/categories/video-generation/` にて「コンシューマー向けサービスは2025年2月シャットダウン済み」と明示
- `categories/image-generation/` では `service_changed` ツールをフィルタして除外済み
- `/tools/haiper/` 専用ページは存在し、全ページでシャットダウン警告あり

状態: 適切に注記済み

## 修正内容

なし

## 調査対象

- src/pages/ 以下の .astro ファイル
- src/components/ 以下の .astro ファイル
- src/content/ 以下の .md/.mdx ファイル
