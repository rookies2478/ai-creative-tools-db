# 日本向け公式情報の照合手順（38ツール共通）

2026-11-06開始 / 担当: AIクリエイティブナビ編集・監査
対象台帳: [official-source-registry.csv](official-source-registry.csv)
正本の内容: `src/content/tools/{slug}.md`
週次再確認の入口: [Issue #48](https://github.com/rookies2478/ai-creative-tools-db/issues/48)
台帳整備: [Issue #69](https://github.com/rookies2478/ai-creative-tools-db/issues/69)

## なぜ新しい台帳が必要か

従来の `reports/tool-source-url-list.csv` と `reports/tool-pricing-citation-master-list.md` は **2026年6月・26ツール時点の歴史的スナップショット**であり、正式な現行運用上の正本ではない（`docs/operations/reports-directory-policy.md`）。一方、現行38件の正本では `officialUrl`、`sources`、`sourceRefs` などに公式URLが分散している。

この台帳は**次回の確認先の道しるべ**としてのみ使う。URL登録そのものは、ページが到達可能、現行料金が正しい、日本向け契約に適用可能、商用利用可、完全日本語UI、を証明しない。

## 1. 公式情報を見る優先順位

1. **日本向けの適用規約・法的条項**（利用者の居住地・契約法人・購入経路に適用される版、条番号、改定日、モデル別契約）
2. **日本向けの公式料金表・ヘルプ**（税込/税別、円/ドル、月払い/年払い月換算、割引・クレジット・透かし）
3. **日本向けの公式製品・機能ページ**（提供地域、言語・モデル、制限）
4. 日本語公式にない項目は **公式の英語版価格/Terms/Help** にフォールバック。日本向け適用条件が不明なら明記
5. 公式マーケティングページが利用規約と食い違う場合は矛盾を記録。英語版・日本語版、一般利用規約・有料会員規約の**適用と優先条項**を確認し、それでも不明なら `HOLD`

第三者ブログ・SEO記事・ネット掲示板は発見補助のみ。決済内容や権利の最終根拠に使わない。

## 2. 台帳カラムの意味

- `slug`: `src/content/tools/{slug}.md` と完全一致。ツール追加・削除に合わせて必ず更新
- `jp_product_url` / `jp_pricing_url` / `jp_terms_url` / `jp_help_url`: 日本語の公式製品、料金、規約、ヘルプURL。**日本語ページを確認できない欄は空欄**（未提供と断定する意味ではない）
- `fallback_pricing_url` / `fallback_terms_url` / `fallback_help_url`: 日本語がないときの公式原文。日本語ページがあっても法律上の原文を併読する
- `jp_evidence_status`: `source_in_repo`（現在のリポジトリ資料で参照）／`website_lookup`（公開Web調査で発見）／`jp_not_identified`（日本向けURLを**今回特定できなかった**）。サイト全体の日本語UI対応判定ではない
- `registry_updated_at`: 台帳の編集日。**その日にページ内容を確認した証拠ではない**
- `last_content_verified_at`: 実際に公式ページを開き、対象事項（商用、料金、言語、透かし等）を公式本文で検証し証跡を残した日。根拠なしに埋めない
- `notes`: 地域差、利用規約間の矛盾、プラン、ブランド変更、チェック上の要注意点

`jp_evidence_status` が `source_in_repo` でも、現時点でリンク先の到達性やすべての契約条件が検証済みという意味ではない。

## 3. 実施タイミング

- **ツール追加・料金・商用利用・透かし・日本語対応の更新前**: 対象slugのURLを必ず開き、必要なカラムの出典を照合する。必要なら台帳のURLを公式の最新URLへ差し替える
- **週次（既存Issue #48、初回予定2026-11-09 JST）**: `node scripts/generate-freshness-queue.mjs --as-of YYYY-MM-DD` の期限超過/リスクを見て、P0→P1→P2の順に台帳から公式ページを点検。既存Issueにコメントで結果を蓄積し、重複Issueを作らない
- **重大なポリシー変更や公式リブランディング**: 次回週次を待たず該当slugの監査を実施
- **モデル別・プラン別の例外**: 通常の一般価格表と別の公式モデル規約／ヘルプを `sourceRefs` に追加し、台帳の `notes` に優先関係を記す

## 4. 1ツールの照合方法

1. `slug` をキーにこの台帳と `src/content/tools/{slug}.md`、**個別の`.astro`ページ、FAQ・比較表**で現在の主張を把握
2. `jp_terms_url` があればまず規約の契約地域、プラン、改定日、条文を確認。無ければ `fallback_terms_url` で日本居住者に適用するか確認
3. `jp_pricing_url` または `fallback_pricing_url` で無料枠、有料料金、クレジット、課金周期、税、通貨、アカウント/購入経路の差を照合
4. 日本語公式ページの有無と、**ログイン後の編集UI日本語化、日本語プロンプト入力・生成品質、字幕/音声の日本語**を別々に判定
5. 透かしは可視/不可視、無料/有料、新規生成/過去生成を分ける
6. **出典URL、確認日、引用対象の条番号/見出し、該当プラン・国/通貨、検証者、値の変更前→変更後**をPR・Issue・`docs/audits/`で記録。必要に応じURLの最終リダイレクト先も記録
7. 更新する場合は台帳→正本`.md`→個別`.astro`→関連記事の順で最小スコープのPRを作成。価格とライセンスは公式情報で裏付けられたものだけ変更
8. `npm run validate:task`、`node scripts/validate-official-source-registry.mjs`、`npm run build`、`npm run validate:data`、`npm run validate:publish`、`npm run validate:affiliate-links`、`npm run validate:scope`、`git diff --check` を実行。PR/公開デプロイ/本番URL検証は別々に記録

## 5. 1件の変更ログの雛形

| 項目 | 記入例 |
| --- | --- |
| slug | `kling-ai` |
| 確認対象 | 有料会員プランの商用利用 |
| 適用地域/契約 | 日本・有料会員、プラン/モデル名を明示 |
| 台帳の公式URL | `fallback_terms_url` |
| 根拠条項・更新日 | Terms §x.y、発効日、要約 |
| サイトの旧記載 | 「商用利用は要確認」 |
| 公式の現行記載 | 「有料会員規約が一般規約に優先」 |
| 判定 | MATCH / CHANGE_REQUIRED / CONFLICT / LOGIN_REQUIRED / NOT_ACCESSIBLE |
| 実施 | データ更新PR URL、またはHOLD理由 |
| 確認日 | YYYY-MM-DD、実際の閲覧日を記載 |

**重要**: `lastReviewed` と `nextReviewDue` は、公式に内容を照合したときだけ更新。単に台帳のURLを記録しただけで再確認済みにしない。期限超過は誤記の証明ではない。

## 6. 自動化できること・できないこと

構造検証 `node scripts/validate-official-source-registry.mjs` は、38件のslug漏れ、重複、HTTPS構文、公式URLの必須欄、日付形式、確認日付の形式を検出する（記載された根拠が正しいかまでは判定しない）。**外部サイトには通信せず**、規約本文・価格・日本語UI・リンクのHTTP 200を確認しない。

初回は既存の週次鮮度キューにこの台帳を添付して、**担当者/AIが公式URLを開いて突き合わせる**方式。将来のURL到達性や公式HTML差分の機械監視は、利用規約・アクセス制限・動的ページを調べた上で別タスクとして追加する。HTML差分だけで商用許諾を自動更新しない。

## 7. 新規追加時

新しく`src/content/tools/new-slug.md`を追加するPRは、同時に台帳へ同じ`slug`の行を追加。日本語公式未発見なら `jp_not_identified`、日本語リンク4欄空欄、英語公式のpricing/terms/helpいずれかを記入する。レジストリ検査で新しいslugの台帳未登録を検出する。

