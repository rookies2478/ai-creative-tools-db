# Haiper 条件ページ表示統一監査

## 確認日

2026-06-22

---

## 対象ページ

| ページ | コンポーネント |
|---|---|
| /conditions/free/ | src/components/Free.astro（DB動的取得） |
| /conditions/commercial-use/ | src/components/CommercialUse.astro |
| /conditions/no-watermark/ | src/components/NoWatermark.astro |
| /conditions/japanese/ | src/components/Japanese.astro |

---

## 総評

4条件ページのHaiper表示を横断確認した。結果として軽微修正1件を実施。

主なポイント：
- Free条件ページはDBから動的取得。`freePlan: false` のHaiperはフィルターで除外されカード非表示 ✅
- Commercial-use条件ページは前回修正済み（service_changed note追加済み）✅
- No-watermark条件ページにHaiperは非掲載 ✅
- Japanese条件ページのHaiper `free:'あり'` がDB値（`freePlan: false`）と矛盾していた → `free:'要確認'` に修正

---

## Free条件ページ確認

| 項目 | 結果 |
|---|---|
| Haiperカード表示 | **非表示** ✅（DBから `freePlan === true \|\| 'limited'` でフィルター。Haiperは `freePlan: false` のため除外） |
| service_changed表示 | 対象外（表示なし） |
| 現役おすすめ誤認リスク | **なし** ✅ |

> **残注意点**：`/conditions/free/index.astro` のFAQ回答（画像→動画の無料ツール）に "Haiperなど" という名前言及あり（「場合があります」条件付き表現）。カードとして表示されているわけではなく、現役推奨には当たらない。次回FAQ更新時に他ツール名に差し替えを検討。

---

## Commercial-use条件ページ確認

| 項目 | 結果 |
|---|---|
| Haiper note | **修正済み** ✅（2026-06-22前回修正で「コンシューマー向けWebアプリは2025年2月にシャットダウン」を追記） |
| 断定表現 | なし ✅ |
| 現役おすすめ誤認リスク | **なし** ✅ |

---

## No-watermark条件ページ確認

| 項目 | 結果 |
|---|---|
| Haiper掲載 | **なし** ✅（NoWatermark.astroのデータにHaiperは含まれていない） |
| 現役おすすめ誤認リスク | **なし** ✅ |

---

## Japanese条件ページ確認

| 項目 | 修正前 | 修正後 |
|---|---|---|
| `ja` ステータス | `'unknown'` → ラベル「要確認」 | 変更なし（適切） |
| `ui` | `'×'` | 変更なし（適切） |
| `free` | `'あり'`（○表示・DB `freePlan:false` と矛盾） | **`'要確認'`（△表示）に修正** ✅ |
| `commercial` | `'要確認'` | 変更なし（適切） |
| 現役おすすめ誤認リスク | **あり**（`free:'あり'` が ○表示） | **なし** ✅ |

> `ja:'unknown'`（要確認）カテゴリに分類されており、日本語対応の積極推奨ではない。`free:'要確認'` に修正することで、無料プランが現役で利用可能のように見える ○表示を△表示に変更した。

---

## Haiper noindex / sitemap除外確認

| 項目 | 確認方法 | 結果 |
|---|---|---|
| `noindex={true}` in haiper/index.astro | ソース確認 | ✅ |
| SITEMAP_EXCLUDED_PATHS | sitemap.xml.ts:62 | ✅ |
| `pricingStatus: service_changed` | haiper.md:33 | ✅ |
| `freePlan: false` | haiper.md:6 | ✅ |
| `freePlanNote` | haiper.md:36（シャットダウン注記あり） | ✅ |

---

## 修正した項目

| ファイル | 修正内容 | 分類 |
|---|---|---|
| src/components/Japanese.astro:85 | Haiper `free:'あり'` → `free:'要確認'`（DB `freePlan:false` との整合・誤認防止） | B：軽微修正 |

---

## 残課題

| 項目 | 内容 | 優先度 |
|---|---|---|
| Free条件ページFAQのHaiper言及 | `/conditions/free/index.astro` FAQ回答に "Haiperなど" の名前言及あり（条件付き表現）。カード表示なし・影響限定的 | 低（次回FAQ更新時） |
| Free.astro DEFAULT_TOOLS のHaiper | DEFAULT_TOOLS配列にHaiperが残存。Free条件ページはDB動的取得でデフォルトを使わないため実害なし | 低（将来的に整理） |

---

## 禁止表現チェック

| 表現 | 断定文検出 |
|---|---|
| 商用利用できます | 0件 |
| 著作権的に問題ありません | 0件 |
| 安全です | 0件 |
| 自由に使えます | 0件 |
| 著作権的にクリアです | 0件 |
| 問題ありません | 0件 |

---

## build結果

| 項目 | 値 |
|---|---|
| 終了コード | 0 |
| ページ数 | 79 |
| WARN | なし |
| 実行日時 | 2026-06-22 |

---

## 判定

**PASS_WITH_NOTES**

- Free条件ページ：Haiperカード非表示 ✅（DB動的フィルター）
- Commercial-use条件ページ：service_changed note表示済み ✅
- No-watermark条件ページ：Haiper非掲載 ✅
- Japanese条件ページ：`free:'あり'`→`'要確認'` 修正済み ✅
- Haiper noindex・sitemap除外：維持 ✅
- 禁止表現：0件 ✅
- 残課題2件は影響限定的・保留継続
