# Pika 動画長・Pikaframes・無料クレジット 一次情報確認記録

- 確認日: 2026-07-24
- 対象監査: AUD-03（動画長のDB内部矛盾）、AUD-04（Pikaframes対応状況の矛盾）、AUD-05（無料クレジット「80cr」の断定）
- 確認方法: Pika公式料金ページ（https://pika.art/pricing）をWebFetchで直接取得・確認（一次情報）。加えてWebSearchで複数の二次情報（ブログ・比較サイト）を補完的に確認。

## 確認した公式情報

- 情報源: Pika公式料金ページ（一次情報）
  - URL: https://pika.art/pricing
  - 確認日: 2026-07-24
  - 取得方法: WebFetch（ページ本文をmarkdown変換の上で内容確認）

## 通常動画生成時間（Text-to-Video / Image-to-Video）

- 公式料金ページには480p/720p/1080pの各画質で「5s」「10s」の生成時間オプションが案内されている。
- → **base_duration / selectable_duration = 5秒・10秒（選択式）**

## 延長機能・Pikaframes

- 公式料金ページに「Pikaframes」専用セクションがあり、5s / 10s / 10-15s / 15-20s / 20-25s の区分で画質別クレジット消費が案内されている。
- Pikaframesは複数の画像（キーフレーム）間をつなぐフレーム補間機能（二次情報で補完: Pika 2.5世代の機能、アスペクト比指定にも対応）。
- 公式ページからは対象プラン（無料/有料の別）を明示するテキストは確認できなかった。二次情報（複数の比較サイト）ではクレジット消費量が大きい（最大200クレジット程度）ことから実質的に有料プラン中心の利用が前提とされている可能性があるが、**「無料プランで完全に利用不可」と断定できる一次情報は確認できていない**。
- → **extension_duration / maximum_extended_duration / feature_specific_duration（Pikaframes）= 最大25秒程度（5秒刻みの区分あり）**
- → **pikaframes_availability = 現在も提供中（一次情報で確認）**。対象プランの詳細は要公式確認のため断定を避けた。

## 無料プランのクレジット

- 公式料金ページのFreeティア説明に「80 monthly video credits」の記載を確認（一次情報）。
- 二次情報（複数サイト）でも「無料プランは80クレジット」「480p・透かしあり・商用利用不可」という説明で一致。
- 付与周期について、公式ページの文言は「毎月80クレジット」という体裁で、初回一度きりの付与ではなく月次更新であることが読み取れた。ただし「reset」の厳密な仕組み（繰越の有無等）まではページ本文から確定できなかった。
- → **free_plan = あり（常設）** / **signup_credits = 明記なし（新規登録時の別枠付与は未確認）** / **monthly_credits = 80クレジット/月（公式確認）** / **daily_credits = なし** / **rollover = 不明（未確認）** / **watermark = あり（無料プラン）** / **commercial_use = 無料プランは不可**

## 80cr表記の妥当性

- 「80クレジット/月」という記載自体は2026-07-24時点の公式情報で確認できた。既存記事群の「月80クレジット程度（毎月更新）」という表現は、この一次情報と整合していたため、記事側の修正は最小限（Pika専用ページのみ日付・文言を統一）にとどめた。
- ただし、公式ページはプラン・料金を随時変更する可能性があるサービスであるため、DB上は「固定値として過信しない」旨の注記を維持した。

## 判断できなかった項目

- Pikaframesの対象プラン（無料プラン込みか、有料プラン限定か）の明確な一次情報での確定
- 無料クレジットの繰越可否・有効期限
- 有料プラン（Standard/Pro/Fancy）の名称・料金体系が変更されている可能性（二次情報で示唆されたが、AUD-03/04/05のスコープ外のため未調査・未変更）

## DBで採用した値（`src/content/tools/pika.md`）

- `features.videoExtend`: `false` → `true`
- `features.maxVideoDuration`: 通常生成（5秒・10秒）とPikaframes（最大25秒、5秒刻みの区分）を分離した説明文に変更
- `notBestFor`: 「最大10〜25秒程度」という混在表現を「通常は5秒・10秒、Pikaframes使用時でも最大25秒程度」に修正
- `freePlanNote` / `pricingDecision.freePlanLimitNote`: 「クレジット数は公式に明記なし」から「毎月80クレジット（2026-07-24公式確認、変更の可能性あり）」に変更
- `lastReviewed` / `verifiedAt` / `reviewed.pricing` / `reviewed.features`: 2026-07-24に更新
- FAQに「Pikaframesとは何ですか？」を追加、既存の無料プランFAQを更新

## サイトで採用した表現

- 動画長: 「通常のText-to-Video / Image-to-Videoでは5秒・10秒から選択」「Pikaframesでは5秒〜最大25秒程度」のように機能別に分離して表現
- 無料枠: 「毎月80クレジット（2026-07-24公式確認）」。ただし「付与量は時期・プラン改定によって変わる可能性がある」という注記を必ず併記
- Pikaframes: 「Pikaframesに対応（複数画像間をつなぐフレーム補間機能）」。対象プランは断定せず「最新情報は公式サイトでご確認ください」で締める

## DBスキーマ上の課題（将来検討）

- 現行スキーマの`features.maxVideoDuration`は自由文字列のため、`baseVideoDuration` / `selectableDurations` / `maxExtendedDuration` / `pikaframesDuration`のような構造化フィールドを持てない。今回はPika単独のための大規模スキーマ変更を避け、注記で意味を分離する対応とした。
- `freeCreditsAmount` / `freeCreditsCycle`のような無料クレジット専用フィールドも存在しない。`freePlanNote`等の自由文字列で対応した。
- 全29ツールへの一括スキーマ移行は本タスクのスコープ外のため実施していない。将来的にPika以外の動画生成系ツール（Runway・Kling AI・Luma AI等）でも同様の「基本長 vs 延長長」の混在が起きうるため、次回のDB設計見直し時に構造化フィールドの追加を検討する余地がある。
