# AIクリエイティブナビ 運用チェックリスト

最終更新：2026-06-22

> **DB要確認バックログ**：`reports/db-verification-backlog.md` および `reports/db-verification-backlog.csv` 参照。未確定項目（pricingStatus:partial/unconfirmed・currency:unknown・commercialUse:unknown）の公式確認状況を管理している。

---

## 1. ツール追加時チェック

### slug
- [ ] `/tools/[tool-slug]/` 形式に従っている
- [ ] 未定義slug（DBに存在しないslug）を参照していない
- [ ] 既存URLと重複しない

### 必須フィールド
- [ ] `officialUrl` 入力済み
- [ ] `officialSourceUrl` 入力済み（料金・利用規約ページ）
- [ ] `sources` 入力済み（参照元URL・日付）
- [ ] `lastReviewed` 入力済み（YYYY-MM-DD）
- [ ] `verifiedAt` 入力済み（YYYY-MM-DD）

### pricingStatus
以下から1つ選択：

| 値 | 意味 |
|---|---|
| `confirmed` | 公式に料金が明示されている |
| `partial` | 一部のみ公式確認済み |
| `unconfirmed` | 未確認・推定 |
| `service_changed` | サービス変更・終了・大幅変更あり |
| `no_fixed_price` | 固定料金なし（問い合わせ制など） |

- [ ] `currency` 不明なら `unknown`
- [ ] 料金が公式確認できない場合は「要公式確認」と明記

### 内容方針
- [ ] 商用利用・著作権・入力素材を断定していない（→ 6. 禁止表現チェック 参照）
- [ ] `usagePolicy` に公式の利用規約URLを記載
- [ ] `inputMaterialRisk` に入力素材リスクの有無を記載

### build前
- [ ] Data Quality Check 実行（`npm run check:dq` またはスキル呼び出し）
- [ ] WARNなし

---

## 2. 画像追加時チェック

### Aスキーム（推奨・実出力）

| 項目 | 条件 |
|---|---|
| `sampleType` | `"tool-output"` |
| 出典 | 実際にそのツールで生成した画像のみ |
| `sourceToolSlug` | ページのツールslugと完全一致 |
| `isSameToolAsPage` | `true` |
| `promptVersion` / `prompt` / `negativePrompt` | 必須 |
| `model` / `provider` / `modelUrl` | 必須 |
| `generatedAt` / `reviewedAt` | 必須 |
| `comparisonEligible` | 慎重に設定（確実に比較に使える画像のみ `true`） |

- [ ] 実在人物・著名人・ブランド・ロゴを含めない

### Bスキーム（参考ビジュアル）

| 項目 | 条件 |
|---|---|
| `sampleType` | `"reference-visual"` |
| 表示名 | 「AI生成サンプル（参考）」と明示 |
| 用途 | ツール実例・公式出力・代表結果として見せない |
| 比較記事 | 主比較材料にしない |
| `comparisonEligible` | 基本 `false` |

### 画像共通仕様

- [ ] フォーマット：WebP（拡張子だけで判断せず、実ファイル形式を確認）
- [ ] サイズ：1200×675px、16:9
- [ ] ファイルサイズ：300KB以下を目安
- [ ] 実在人物・著名人・ブランド・ロゴを含めない

---

## 3. 比較記事追加・修正時チェック

- [ ] 比較軸が独自であり、他記事との重複が少ない
- [ ] 比較表だけの薄いページになっていない（本文・解説あり）
- [ ] FAQセクションがある
- [ ] 内部リンクがある（関連ツールページ・ガイドへ）
- [ ] 商用利用・著作権を断定していない
- [ ] 画像比較を入れる場合はAスキームのみ使用
- [ ] Bスキームを主比較材料にしていない
- [ ] 1枚の画像だけで性能を断定していない

---

## 4. カテゴリ・条件ページ修正時チェック

### カテゴリ優先度

| 優先度 | カテゴリ |
|---|---|
| 中心 | AI動画生成、AI画像生成 |
| 準中心 | AI動画編集、AIアバター動画 |
| 周辺 | AIデザイン、AI音声・ナレーション |

- [ ] 中心カテゴリを優先的に充実させる
- [ ] 条件ページは「条件で探す入口」として扱う（ランキングページにしない）
- [ ] ガイドページと検索意図が重複しすぎていない

---

## 5. noindex / sitemap チェック

### 現状の確定事項

| ページ | 状態 |
|---|---|
| `/tools/haiper/` | 公開維持・noindex,follow・sitemap除外・service_changed扱い |

### 数値確認

| 項目 | 期待値 |
|---|---|
| sitemap URL数 | 77 |
| buildページ数 | 79 |
| buildのみURL | `/404`、`/sitemap.xml`、`/tools/haiper/` |
| sitemapのみURL | 0 |

- [ ] noindex設定を意図せず変更していない
- [ ] sitemap URL数が77のまま
- [ ] `/tools/haiper/` を現役おすすめに見せていない

---

## 6. 禁止表現チェック

### 使用禁止（断定表現）

- 商用利用できます
- 著作権的に問題ありません
- 安全です
- 自由に使えます
- 著作権的にクリアです
- 問題ありません

### 推奨表現

- 公式情報では〜と案内されています
- プランや用途によって条件が異なる場合があります
- 最新情報は公式サイトをご確認ください
- 本記事は法的助言ではありません
- 要公式確認
- unknown

- [ ] 上記禁止表現が追加・修正したファイルに含まれていない

---

## 7. buildチェック

### 実行コマンド

```bash
"/c/Program Files/nodejs/npm.cmd" run build
```

### PASS条件

| 項目 | 期待値 |
|---|---|
| 終了コード | 0 |
| ページ数 | 79 |
| WARN | なし |

- [ ] 終了コード0
- [ ] 79ページ生成
- [ ] WARNなし（duplicate id / cache WARNも含む）

---

## 8. 本番反映前チェック

```bash
git status
git diff --stat
```

- [ ] `git status` で意図しない変更ファイルがない
- [ ] `git diff --stat` で変更範囲が想定内
- [ ] build PASS（→ 7. buildチェック）
- [ ] 主要ページ（トップ・ツール一覧・各ツールページ）が正常表示
- [ ] sitemap URLが77件
- [ ] `/tools/haiper/` noindex確認（`<meta name="robots" content="noindex,follow">`）
- [ ] 料金断定表現がない
- [ ] Bスキーム誤用がない

---

## 9. 更新フロー（標準）

```
1. 目的を決める
   └─ 何を・なぜ・どのファイルを変更するかを先に決める

2. 対象ファイルを限定する
   └─ 最小スコープで作業する

3. 監査する
   └─ 変更前の現状を把握する

4. 最小修正する
   └─ 目的外の変更を加えない

5. レポート更新
   └─ reports/ に作業記録を残す

6. Pre-Publish Check
   └─ スキル呼び出し or 手動チェック

7. build
   └─ "/c/Program Files/nodejs/npm.cmd" run build

8. 手動本番反映
   └─ git push → デプロイ確認
```

---

## 10. pricingStatus 未設定ツール対応方針

> 詳細は `reports/pricing-status-explicitness-audit.md` および `reports/pricing-status-explicitness-audit.csv` 参照（2026-06-22作成）。

- pricingStatus 未設定の18ツールは監査済み。A候補9件（confirmed）・B候補9件（partial/no_fixed_price）に分類。
- `confirmed` 化は公式料金ページで **金額・通貨・条件が明確** な場合のみ。
- 金額が動的ロード・ログイン後表示・「アプリ内確認」の場合は `no_fixed_price` または `partial`。
- 独立料金ページがなくプラン内包型のツール（DALL·E, Gemini, Microsoft Designer等）は `partial` 維持。
- currency が不明な場合は `unknown` を維持（推測で埋めない）。
- 商用利用・著作権・透かし条件は断定しない。

### pricingStatus 追加の推奨順

| 優先 | 対象 | 候補status |
|---|---|---|
| A（先行） | canva / midjourney / luma-ai / pika / playground-ai / runway / kling-ai / leonardo-ai / invideo-ai | confirmed |
| B（次回） | capcut-ai | no_fixed_price |
| B（次回） | clipdrop / dalle / gemini / ideogram / microsoft-designer / nightcafe / stable-diffusion / tensor-art | partial |

---

## 11. 今後の改善候補（後回し）

以下は品質確認済みのため、優先度低として記録。着手は別途判断。

| 候補 | 備考 |
|---|---|
| OGPページ別化 | 現状は共通OGP |
| お気に入り機能 | JS実装が必要 |
| Search Consoleに基づくCTR改善 | データ取得後に判断 |
| Aスキーム画像追加 | 実生成が必要 |
| ToolCard共通化リファクタ | 現状は各ページ個別 |
| CompareTableのスマホカード化 | モバイルUX改善 |

### やらないこと（方針）

- Programmatic SEO量産
- 会員機能
- 口コミ機能
- 外部DB連携
- 自動スクレイピング
