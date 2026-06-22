# 最終公開前チェック

確認日：2026-06-22  
目的：料金監査・pricingStatus整理フェーズ完了後の最終表示・構造確認

---

## 確認日

2026-06-22

---

## 対象URL

| URL | 確認方法 |
|---|---|
| / | ソース確認 |
| /tools/ | ソース確認 |
| /categories/image-generation/ | ソース確認 |
| /categories/video-generation/ | ソース確認 |
| /tools/adobe-firefly/ | ソース・DB確認 |
| /tools/haiper/ | ソース確認 |
| /tools/capcut-ai/ | DB確認 |
| /tools/dalle/ | ソース確認 |
| /tools/gemini-image-generation/ | DB確認 |
| /tools/microsoft-designer/ | DB確認 |
| /tools/ideogram/ | DB確認 |
| /tools/nightcafe/ | DB確認 |
| /tools/clipdrop/ | DB確認 |
| /comparisons/canva-ai-vs-adobe-firefly/ | ソース確認 |
| /about/ | ソース確認 |
| /editorial-policy/ | ソース確認 |
| /sitemap.xml | ソース（sitemap.xml.ts）確認 |

---

## 表示確認結果

| 項目 | 結果 |
|---|---|
| 全対象URL 200確認 | build 79ページ PASS（終了コード0・WARNなし）。ページ欠落なし |
| トップページFV | ソース上問題なし |
| /tools/ カード・チップ・補助ラベル | ソース上問題なし |
| カテゴリページ比較表 | ソース上問題なし |
| 比較記事同一プロンプト比較ブロック | ソース上問題なし |

---

## 料金表示確認

| slug | 確認項目 | 結果 |
|---|---|---|
| adobe-firefly | 「1,580円/月（税込）〜」表示 | ✅ DB・ページソース確認済み（lowestPaidPlan/pricingText/料金表ともに「1,580円/月（税込）」） |
| capcut-ai | 固定月額のように見えていない | ✅ pricingStatus: no_fixed_price。地域・プラットフォーム依存の旨を案内 |
| dalle | ChatGPT Plus内包・独立confirmed料金のように見えていない | ✅ 「要公式確認」表示・partial扱い |
| gemini-image-generation | Google One AI Premium内包・独立confirmedのように見えていない | ✅ partial扱い |
| microsoft-designer | Microsoft 365内包・独立confirmedのように見えていない | ✅ partial扱い |
| ideogram | confirmed料金のように見えていない | ✅ partial扱い・「要公式確認」 |
| nightcafe | confirmed料金のように見えていない | ✅ partial扱い |
| clipdrop | confirmed料金のように見えていない | ✅ partial扱い・Proプラン「--per month」非開示注記あり |
| haiper | 現役おすすめに見えていない | ✅ 「現在のサービス提供状況は公式サイトでご確認ください」明記・noindex={true}・比較表でも「要確認」扱い |

---

## 商用利用・著作権・透かし表現確認

断定表現検索（src/content/tools/ / src/pages/ / src/components/）：

| 表現 | 検出（断定文） |
|---|---|
| 商用利用できます | 0件（stable-diffusion.mdは「断定できません」の引用文脈のみ・editorial-policyは「断定は行いません」例示のみ） |
| 著作権的に問題ありません | 0件（editorial-policy例示のみ） |
| 安全です | 0件（editorial-policy例示のみ） |
| 自由に使えます | 0件 |
| 著作権的にクリアです | 0件 |
| 問題ありません | 0件（editorial-policy例示のみ） |

> 全件クリア。断定文なし。

---

## 生成画像A/Bスキーム確認

- Bスキーム（実生成でない比較用画像）をツール実例のように断定表示していない
- ソース上で注記・キャプション制御が維持されている

---

## Haiper noindex / sitemap除外確認

| 項目 | 結果 |
|---|---|
| src/pages/tools/haiper/index.astro に `noindex={true}` | ✅ 確認済み（38行目） |
| BaseLayout.astro が noindex=true 時に `<meta name="robots" content="noindex,follow">` を出力 | ✅ 確認済み（36行目） |
| sitemap.xml.ts の SITEMAP_EXCLUDED_PATHS に `/tools/haiper/` | ✅ 確認済み（62行目） |
| haiper が sitemap の allPaths から filter 除外される | ✅ 確認済み（`filter(p => !SITEMAP_EXCLUDED_PATHS.has(p))`） |

---

## sitemap確認

| 項目 | 結果 |
|---|---|
| STATIC_PATHS 件数 | 52件 |
| ツールURL（全26件 - haiper 1件除外） | 25件 |
| 合計URL数 | **77件** ✅ |
| /tools/haiper/ の除外 | ✅ 確認済み |

---

## 構造化データ確認

| ページ種別 | 確認結果 |
|---|---|
| ツール詳細（adobe-firefly） | SoftwareApplication + BreadcrumbList ✅ |
| aggregateRating / Review / offers / "price" | 全ページで検出なし ✅ |
| Product スキーマ | 検出なし ✅ |

---

## build結果

| 項目 | 値 |
|---|---|
| 終了コード | 0 |
| ページ数 | 79 |
| WARN | なし |
| Duplicate id WARN | なし |
| 実行日時 | 2026-06-22 |

---

## 残課題

| 項目 | 内容 | 優先度 |
|---|---|---|
| pricingStatus未設定4件 | invideo-ai / kling-ai / stable-diffusion / tensor-art は公式確認待ち | 低（保留継続） |
| unconfirmed 3件 | pixverse / seaart-ai / vidu-ai は料金ページ非ログイン・動的ロードで確認不可 | 低（保留継続） |
| watermark: unknown 10件 | 透かし条件未確認のツールが残存。表示には影響なし | 低（次回確認B） |
| haiper noindex / sitemap除外 | 現状を維持。ブラウザでの `<meta name="robots" content="noindex,follow">` レンダリング確認は次回機会に | 低 |

---

## 判定

**PASS_WITH_NOTES**

- 表示崩れなし
- 禁止表現（断定文）なし
- Adobe Fireflyの料金「1,580円/月（税込）〜」正常表示
- partial / unconfirmed ツールは「要公式確認」表示に統一
- Haiperはnoindex設定済み・sitemap除外済み・現役おすすめ除外済み
- sitemap 77件 ✅
- build 79ページ・終了コード0・WARNなし ✅
- 残課題4件はいずれも保留継続で公開支障なし

> **公開維持OK**。残課題は次回定期確認（3〜6ヶ月）で対応する。
