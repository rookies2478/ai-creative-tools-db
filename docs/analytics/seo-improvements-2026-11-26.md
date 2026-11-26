# SEO改善記録 2026-11-26（Issue #100）

データ根拠: Issue #100（Growth Loop run 20261125T145929041Z-22760-e4793f の要約）。期間 2026-10-26..11-22。GSC 60 click / GA4 206 sessions / keyEvents 0 / 比較記事 8 click・277 imp。
保存された run 出力は実装時点で未発見のため、クエリ別数値は **NOT_EVALUATED**。標本が小さく因果は主張しない。事実・価格・CTA・アフィリエイト・URL・スキーマは変更していない。

| ページ | 修正前の問題 | 根拠 | 修正内容 | 効果測定 |
|---|---|---|---|---|
| /tools/fotor-ai/ | descriptionが一般的で無料・透かしの答えがない。誤字「透かき」 | 質問型クエリ pos3〜7・0 click（#100）／DB既存事実 | description・冒頭を回答先出し、誤字修正、広告バナー比較への導線追加 | GSCページ単位 click/imp/CTR/順位 |
| /tools/tensor-art/ | descriptionが料金文字列で専門語中心 | 約400imp・pos8.3・CTR0.7% | 無料/料金/商用の回答型に変更（DB事実のみ）。CTRは公式のみで不変 | 同上（CTR変化） |
| /tools/dreamstudio/ | titleに「DreamStudio」がない | 「dreamstudio 料金」pos6.1 | title・冒頭を料金回答型に（DB確認済み価格のみ） | 当該クエリ imp/CTR |
| /comparisons/canva-ai-vs-adobe-firefly/ | 冒頭に結論がない | 5click/114imp（比較記事最大） | 冒頭に既存比較行由来の判断軸。title/descriptionは据え置き | ページ click/imp |
| categories/avatar-video ↔ comparisons/avatar-video-ai-tools | title重複 | 統合根拠なし | 統合・リダイレクト・URL変更なし。category titleを一覧型に差別化、比較への導線追加 | Query×Pageの重複確認 |
| /comparisons/ad-banner-ai-tools/ | categories/designからの導線なし | #100候補 | taglink追加のみ | GA4 landing sessions |
| /use-cases/faceless-video/ | title長くsuffix付き | 109imp・pos2.4・0 click（仮説） | title短縮、description整理 | CTR（14/28日） |

## HOLD
- seedream-vs-seedance: データなし。公開後2〜4週間で判定（初回 2026-12-09頃、確定 12-23頃。GSC遅延を考慮し 11-28以降のデータを使用）。
- invideo-ai: 改善根拠不足のため変更なし。
- avatar-video統合・URL変更: クエリ別の競合根拠と明示承認がないためHOLD。
- アフィリエイト・価格・CTA変更: なし。

## Dreamina料金確認（Issue #99）
- 確認: 2026-11-26 JST、日本向け公式料金ページ https://dreamina.capcut.com/ja-jp/pricing/dreamina-price（実ブラウザ・閲覧のみ）。
- 月次: Basic 2,380円/2,514cr、Standard 5,700円/6,163、Advanced 12,600円/13,821。初月キャンペーン価格・年額（初年度割引→更新時価格）は別枠で記載。
- PR #97記事の2,380円は公式と一致。食い違いは `dreamina.md` の旧USD表記（再現不可）で、JPYへ統一。
- 未確認: 税込/税別、決済通貨、四半期プラン、バナー「Ends November 9」の実期限、無料プランのクレジット量。
