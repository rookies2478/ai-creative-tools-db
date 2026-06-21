# ツール料金・根拠URL監査 最終サマリー

生成日: 2026-06-19（初版: 2026-06-18）  
監査期間: 2026-06-17〜2026-06-19  
対象: src/content/tools/ 全26件

---

## 実施概要

| 項目 | 内容 |
|---|---|
| 監査対象ツール数 | 26件 |
| 監査対象URL数 | 141件（重複排除） |
| build結果（2026-06-19） | PASS（79ページ・終了コード0・WARNゼロ） |
| 実施内容 | pricingSourceUrl/pricingSourceNote追加・公開ページ断定料金表示除去・URL信頼度分類・残課題整理・直近修正の反映 |

### 実施内容の要約

- 全26件について pricingStatus・needsReview・currency・pricingSourceUrl・pricingSourceNote を棚卸し
- 優先度A（公式料金根拠が実質未確認）6件：pixverse/seaart-ai/hailuo-ai/vidu-ai/tensor-art/nightcafe を精査。frontmatterへのpricingSourceUrl追加・lowestPaidPlanの断定金額除去を実施
- 優先度B（料金URLあり・月額/currency未確認）5件：clipdrop/dreamstudio/ideogram/fotor-ai/dalle を精査。pricingSourceUrl+pricingSourceNoteをfrontmatterに追加
- 優先度C（構造・表現確認）3件：gemini-image-generation/microsoft-designer/stable-diffusion を精査。pricingSourceUrl追加・pricingStatus整合確認
- 全26件のURL信頼度を evidenceLevel（strong/medium/weak/missing）で分類

---

## 直近修正サマリー（2026-06-22・第3バッチ）

| slug | 修正内容 |
|---|---|
| capcut-ai | pricingStatus: no_fixed_price を frontmatter に追加（地域・プラットフォーム依存・固定月額なし） |
| dalle | pricingStatus: partial を frontmatter に追加（ChatGPT Plus内包・DALL·E単体独立料金なし） |

build：79ページ・終了コード0・WARNゼロ  
commit：（本バッチ）

---

## 直近修正サマリー（2026-06-22・第2バッチ）

| slug | 修正内容 |
|---|---|
| canva-ai-image-generator | pricingStatus: confirmed + needsReview: false を frontmatter に追加 |
| playground-ai | pricingStatus: confirmed + needsReview: false を frontmatter に追加 |

見送り：invideo-ai（lowestPaidPlanに「約」付きで金額不明確）・kling-ai（前回確認結果と矛盾あり・対象外）

build：79ページ・終了コード0・WARNゼロ（.astroキャッシュクリア後）  
commit：849e9f1

---

## 直近修正サマリー（2026-06-22・第1バッチ）

| slug | 修正内容 |
|---|---|
| runway | pricingStatus: confirmed を frontmatter に追加（build PASS） |
| midjourney | pricingStatus: confirmed を frontmatter に追加 |
| leonardo-ai | pricingStatus: confirmed を frontmatter に追加 |
| luma-ai | pricingStatus: confirmed を frontmatter に追加 |
| pika | pricingStatus: confirmed を frontmatter に追加 |

build：79ページ・終了コード0・WARNゼロ（.astroキャッシュクリア後）

---

## 直近修正サマリー（2026-06-19）

| slug | 修正内容 |
|---|---|
| adobe-firefly | confirmed確定。日本語公式料金ページ（adobe.com/jp）でFirefly Standard 1,580円/月（税込）を確認。currency=JPY・pricingText更新済み |
| fotor-ai | partial/yes/USD。日本語公式料金ページでBasic: US$0を確認。Pro/Pro+月額は動的非表示のため要確認継続 |
| hailuo-ai | currency USD→unknown修正済み。断定ドル表示（$9.99〜）を「要公式確認」に変更済み。pricingStatus=partial維持 |
| seaart-ai | currency unknown修正済み。officialSourceUrl=CDN URL→公式トップに修正済み。pricingStatus=unconfirmed |
| pixverse | currency USD→unknown修正済み。pricingStatus=unconfirmed・needsReview=yes frontmatter追加済み |
| dreamstudio | currency=unknown・pricingStatus=partial・needsReview=yes frontmatter追加済み。Brand Studioリブランド注記あり |
| haiper | pricingStatus=service_changed・needsReview=no frontmatter追加済み。現役おすすめ除外注記・カテゴリページ警告済み |

---

## 主な対応内容

- **USD表記の一括JPY変換は不要と判断** — 全26件が海外企業運営（siteOrigin=overseas）。USD表記は方針として妥当。ただしAdobe Fireflyは日本語公式料金ページが存在しJPYで確認済み。
- **日本企業サービスは0件** — DB内に日本企業運営のサービスは存在しない。
- **公式料金URL未確認のものは confirmed にしない** — 今回の全フェーズで confirmed化：1件（adobe-firefly・日本語公式料金ページ確認）のみ。
- **未確認料金は公開ページで断定表示しない** — pixverse/hailuo-aiのspecs・basicInfo・quickTableから具体的ドル金額を除去済み。
- **pricingSourceUrl / pricingSourceNote を追加・整理** — 優先度A/B/C合計8件のfrontmatterに新規追加。
- **weak / missing URLを分類** — weak：5件（hailuo-ai/nightcafe/tensor-art/seaart-ai×2）、missing：2件（pixverse/seaart-ai）。
- **reports CSV/MDを整備** — tool-pricing-source-audit.md/csv・tool-source-url-list.md/csv・tool-pricing-next-actions.md を作成・更新。
- **build PASS確認** — 2026-06-19時点で終了コード0・79ページ・WARNゼロを確認済み。

---

## ステータス集計

### pricingStatus（source-audit.csvより）

| pricingStatus | 件数 | 対象slug |
|---|---|---|
| confirmed | 12 | midjourney/canva-ai-image-generator/luma-ai/invideo-ai/playground-ai/leonardo-ai/pika/adobe-firefly/kling-ai/runway/hailuo-ai/dreamstudio |

※ canva-ai-image-generator・playground-ai は 2026-06-22第2バッチで frontmatter に confirmed 明示済み（CSV と DB 整合確認済み）  
※ invideo-ai は「約」付きのため confirmed 明示見送り（CSV は confirmed だが frontmatter 未設定維持）
| partial | 9 | ideogram/fotor-ai/gemini-image-generation/clipdrop/dalle/nightcafe/microsoft-designer/tensor-art/stable-diffusion |
| unconfirmed | 3 | pixverse/seaart-ai/vidu-ai |
| no_fixed_price | 1 | capcut-ai |
| service_changed | 1 | haiper |

※ invideo-ai は confirmed だが月額に「約」付き（精度注意）  
※ ideogram・microsoft-designerはcurrency=USDだが月額未確認（partial/yes）

### needsReview

| needsReview | 件数 |
|---|---|
| yes | 12 |
| no | 14 |

needsReview=yes 12件：ideogram/fotor-ai/gemini-image-generation/clipdrop/pixverse/seaart-ai/vidu-ai/dalle/nightcafe/microsoft-designer/tensor-art/stable-diffusion

### currency（source-audit.csvより）

| currency | 件数 | 対象slug（代表） |
|---|---|---|
| USD | 16 | midjourney/canva-ai/invideo-ai/playground-ai/ideogram/gemini/luma-ai/pika/kling-ai/runway/leonardo-ai/dalle/microsoft-designer/stable-diffusion/hailuo-ai/dreamstudio |
| JPY | 1 | adobe-firefly |
| unknown / N/A | 9 | pixverse/seaart-ai/haiper/vidu-ai/capcut-ai/clipdrop/nightcafe/tensor-art/fotor-ai→USD |

※ fotor-ai は USD確認済み（上記USD 14件に含む）。11件はunknown/N/A/Unknown表記混在あり

### evidenceLevel（URL単位・141件）

| evidenceLevel | URL件数 |
|---|---|
| strong | 132 |
| medium | 3 |
| weak | 4 |
| missing | 2 |

weak URL（4件）: nightcafe pricingSourceUrl（公式ブログ）/ tensor-art pricingSourceUrl（event/proupdate）/ seaart-ai sourceRef:terms（CDN URL）/ seaart-ai sourceRef:policy（CDN URL）

missing URL（2件）: pixverse pricingSourceUrl（unknown）/ seaart-ai pricingSourceUrl（未設定）

---

## 残課題

| slug | 現在の扱い | 残課題 | 次に確認すること |
|---|---|---|---|
| pixverse | unconfirmed/yes/unknown | pixverse.ai/pricing・/en/pricing ともに404（2026-06-21公式再確認済み）。コンシューマー向け公式料金ページURL引き続き未確認 | ログイン後のアプリ内または公式ヘルプページでプラン月額・currency を確認 |
| seaart-ai | unconfirmed/yes/unknown | seaart.ai/pricing・/ja で非ログイン時に具体価格・通貨表示なし（2026-06-21公式再確認済み）。pricingSourceUrl引き続き未設定 | ログイン後の会員ページ・VIP/SVIPプラン画面で価格・currency を確認 |
| vidu-ai | unconfirmed/yes/unknown | 2026-06-21再確認：vidu.com/pricingは動的ロードで料金・通貨取得不可。currency=unknown継続 | vidu.com/pricing を実ブラウザで開き、currency と各プランの月額を確認 |
| tensor-art | partial/yes/unknown | pricingSourceUrl=event URL（恒久性に懸念）。currency=unknown | tensor.art/pricing または /plans 等の専用料金ページ有無を確認 |
| nightcafe | partial/yes/unknown | pricingSourceUrl=公式ブログ（料金表ではない）。currency=unknown | creator.nightcafe.studio/pricing 等の専用料金ページ有無を確認 |
| gemini-image-generation | partial/yes/USD | 月額・プラン名称（Google One AI Premium等）が未確認 | gemini.google.com/advanced をブラウザで開き、現在の月額・プラン名称を確認 |
| microsoft-designer | partial/yes/USD | 独立料金ページ未確認。Microsoft 365/Copilot Pro内包の可能性 | designer.microsoft.com またはMicrosoft 365プランページを確認し、独立料金の有無・月額を確認 |
| stable-diffusion | partial/yes/USD | ローカル/API料金・月額プラン・クレジット体系の最新性未確認 | platform.stability.ai/pricing でローカル/API料金プラン・月額・クレジット数が現在も有効か確認 |
| clipdrop | partial/yes/Unknown | Proプラン料金「--per month」（金額非開示・2026-06-21公式再確認済み）。currency・月額は引き続き未確認 | clipdrop.co/pricing をブラウザ（ログイン後）で開き、Proプランの currency・月額を確認 |
| ideogram | partial/yes/USD | 最安有料プランの月額未確認 | docs.ideogram.ai/plans-and-pricing/available-plans をブラウザで開き、最安有料プランの月額を確認 |
| fotor-ai | partial/yes/USD | Pro・Pro+月額は動的非表示で未確認 | fotor.com/jp/pricing/ をブラウザで開き、Pro/Pro+最安プランの月額（USD）を確認 |
| dalle | partial/yes/USD | 月額未確認（ChatGPT Plus依存） | openai.com/chatgpt/pricing/ でChatGPT Plusの現在の月額（USD）を確認 |
| haiper | service_changed/no/unknown | コンシューマー向けシャットダウン済み。noindex/draft化の要否は別途判断 | haiper.ai/ でAPI/B2B向けサービス継続状況を確認。必要に応じてnoindex化を検討 |

---

## 公開判断

- **現時点で公開継続は可能** — 断定料金表示の除去・「要公式確認」表示への統一が完了している。build PASS（79ページ・WARNゼロ・2026-06-19）。
- **needsReview=yes のツールは料金確認済みとして扱わない** — 14件は pricingStatus=partial/unconfirmed のため、confirmed扱いは不可。
- **currency=unknown のツールは $/¥ 等の通貨記号を表示しない** — currency が確定するまで通貨記号表示禁止。
- **partial / unconfirmed の料金は「要公式確認」「公式ページ参照」と表示する** — lowestPaidPlan は「要公式確認」または「公式サイトで確認」に統一。
- **service_changed のツールは現役おすすめとして扱わない** — haiper はカテゴリページで警告・現役おすすめ除外済み。
- **商用利用・著作権・肖像権・商標は断定しない** — 公式利用規約URLへの誘導のみ。断定表示禁止。
- **本番反映は手動** — build PASS確認後、手動でデプロイすること。

---

## 今後の運用ルール

1. **新規ツール追加時は以下を必須確認する**
   - `pricingSourceUrl`（公式料金ページURL）
   - `pricingSourceNote`（根拠の補足・制限事項）
   - `lastReviewed`（確認日）
   - `verifiedAt`（検証日）

2. **公式料金URLがない場合は confirmed にしない** — ブログ・利用規約・ヘルプ記事のみで confirmed 化は禁止。

3. **pricingStatus=partial / unconfirmed の場合の公開表示ルール**
   - 具体的な金額（数字+通貨記号）は表示しない
   - 「公式ページ参照」「要公式確認」に統一
   - `lowestPaidPlan` フィールドは「要公式確認」または「公式サイトで確認」

4. **currency=unknown の場合は $/¥ を表示しない** — currency が確定するまで通貨記号は表示禁止。

5. **料金変更が多いAIツールは定期的に再確認する** — 特に中国系サービス（pixverse/hailuo-ai/vidu-ai/kling-ai/capcut-ai/seaart-ai/tensor-art）は料金体系変更が頻繁。確認推奨サイクル：3〜6ヶ月。

6. **weak / missing URL は料金の強い根拠として扱わない** — CDN画像URL・イベントページ・ブログ記事は pricingSourceUrl として使用可だが、これらのみで月額断定は不可。

7. **officialSourceUrl の変更は変更禁止ルールを適用する** — 利用規約URLなど根拠として設定済みの officialSourceUrl を料金ページURLに置き換えない。pricingSourceUrl を別途追加することで対応。

8. **service_changed ツールの公開継続判断** — サービスシャットダウン済みツールは現役おすすめ除外・警告表示を維持。noindex/draft化は別途判断すること。

---

*このサマリーはレポート目的のみ。DBへの修正は各フェーズで公式確認後に別タスクで実施すること。*

---

## DQ補正記録（2026-06-21）

| ツール | pricingStatus | needsReview | currency | 変更内容 |
|---|---|---|---|---|
| Hailuo AI | **confirmed** | **no** | **USD** | **2026-06-21 confirmed化。hailuoai.video/subscribe で Standard $14.99/Pro $54.99/Master $119.99 USD確認済み。needsReview=false・pricingSourceUrl更新・index.astro料金表示更新** |
| Brand Studio（旧DreamStudio） | **confirmed** | **no** | **USD** | **2026-06-21 confirmed化。stability.ai/brand-studio-plans で Trial無料1000cr / Core $50/月 USD 5000cr/月確認済み。lowestPaidPlan追加・freePlanNote追加・index.astro料金表示更新** |
| Vidu AI | unconfirmed | yes | unknown | 2026-06-21再確認：vidu.com/pricingは動的ロードで取得不可。pricingStatus=unconfirmed・needsReview追加。全未確認維持。 |
| SeaArt AI | unconfirmed | yes | unknown | pricingStatus・needsReview を追加 |
| PixVerse | unconfirmed（既存） | yes（既存） | unknown（既存） | 変更なし・確認のみ |

- 月額料金の追加・USD/JPY断定は行わない
- 次回レビュー：Search Console確認後または3〜6ヶ月以内
