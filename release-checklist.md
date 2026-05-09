# リリースチェックリスト

## 1. 現在の状態

| 項目 | 状態 |
|---|---|
| フレームワーク | Astro（静的サイト） |
| ホスティング | ConoHa WING |
| 公開URL | https://aicreative-db.com/ |
| URL設計 | 確定済み |
| 実装ページ数 | **23ページ**（追加ガイド3本＋固定4ページ込み） |
| noindex,nofollow | 設定中（全ページ）← **維持中** |
| robots.txt | `Disallow: /`（クローラー全拒否中）← **維持中** |
| 状態 | 検証公開版アップロード完了・本番化判断待ち |

### 検証公開の確認状況（2026-05-05 時点）

| 確認項目 | 状況 |
|---|---|
| `dist/` → `public_html/aicreative-db.com/` アップロード | ✅ 完了 |
| https://aicreative-db.com/ 表示確認 | ✅ 確認済み |
| https://aicreative-db.com/robots.txt 確認 | ✅ `Disallow: /` 維持確認済み |
| https://aicreative-db.com/sitemap.xml 確認 | ✅ 16URL 掲載確認済み（追加ガイド3本はFTP反映待ち） |
| CSS反映確認 | ✅ 確認済み |
| noindex,nofollow 維持 | ✅ 全ページ維持中 |
| Google Search Console sitemap送信 | ⏸ 未実施（本番化後に実施） |
| GA4設置 | ⏸ 未実施 |
| AdSense申請 | ⏸ 未実施 |

---

## 2. 実装済みページ

| URL | 説明 |
|---|---|
| `/` | トップページ |
| `/tools/` | ツール一覧（画像・動画） |
| `/tools/midjourney/` | Midjourney 詳細 |
| `/tools/adobe-firefly/` | Adobe Firefly 詳細 |
| `/tools/dalle/` | DALL·E 詳細 |
| `/tools/canva-ai-image-generator/` | Canva AI画像生成 詳細 |
| `/tools/leonardo-ai/` | Leonardo AI 詳細 |
| `/tools/stable-diffusion/` | Stable Diffusion 詳細 |
| `/tools/runway/` | Runway 詳細 |
| `/tools/pika/` | Pika 詳細 |
| `/tools/kling-ai/` | Kling AI 詳細 |
| `/categories/free/` | 無料で使えるツール |
| `/categories/commercial-use/` | 商用利用OKのツール |
| `/categories/japanese/` | 日本語対応ツール |
| `/categories/no-watermark/` | 透かしなしツール |
| `/guides/commercial-use-copyright/` | 商用利用・著作権ガイド |
| `/guides/free-ai-image-tools/` | 無料で使えるAI画像生成ツールの選び方 |
| `/guides/watermark-credit-guide/` | 透かし・クレジット表記ガイド |
| `/guides/japanese-ai-image-tools/` | 日本語対応AI画像生成ツールの選び方 |
| `/privacy-policy/` | プライバシーポリシー |
| `/contact/` | お問い合わせ |
| `/about/` | 運営者情報 |
| `/editorial-policy/` | 掲載方針・比較基準 |

---

## 3. 本番化前チェック

### 表示・動作確認

- [ ] 全ページ表示確認（エラーなし）
- [ ] スマホ表示確認（レスポンシブ）
- [ ] 内部リンク確認（リンク切れなし）
- [ ] 404ページ確認

### SEOメタ確認

- [ ] title：全ページに適切なtitleが設定されているか
- [ ] meta description：全ページに設定されているか
- [ ] canonical：全ページに正しいURLが設定されているか
- [ ] OGP（og:title / og:description / og:type / og:url）：全ページで出力されているか

### sitemap.xml 状況

- [x] `public/sitemap.xml` 作成済み（**23URL掲載**・追加ガイド3本＋固定4ページ含む）
- [x] `npm run build` → `dist/sitemap.xml` 生成確認済み（23ページ）
- [x] https://aicreative-db.com/sitemap.xml 公開確認済み（固定4ページ分はFTP反映後に23URL）
- [ ] Google Search Console へのサイトマップ送信（本番化後に実施）
- **現状維持：** robots.txt は `Disallow: /` のまま／noindex 維持中

### 本番化前の最終確認

- [ ] noindex解除前の最終コンテンツ確認
- [ ] robots.txt 変更前の最終確認
- [ ] 各ツールの公式情報ソースが最新か確認
- [ ] 全ページの免責文が適切に表示されているか確認
- [ ] 商用利用・著作権について断定的な表現がないか確認
- [ ] `npm run build` が通る状態であること

---

## 3-A. 本番化前最終チェック完了（2026-05-05）

### 1/3：build・sitemap・noindex・robots確認

- [x] `npm run build` 成功
- [x] 19ページ生成確認済み
- [x] `public/sitemap.xml` と `dist/sitemap.xml` の両方を確認済み
- [x] sitemap.xml は19URL掲載済み
- [x] 追加ガイド3本のURL掲載確認済み
  - `/guides/free-ai-image-tools/`
  - `/guides/watermark-credit-guide/`
  - `/guides/japanese-ai-image-tools/`
- [x] noindex,nofollow 維持確認済み
- [x] robots.txt は `Disallow: /` 維持確認済み

### 2/3：全ページ表示・内部リンク確認

- [x] 全19ページの `index.html` 生成確認済み
- [x] 主要ページのtitle確認済み
- [x] トップページから主要カテゴリ・ツール一覧・ガイドへの導線確認済み
- [x] `/tools/` から9ツール詳細へのリンク確認済み
- [x] ツール詳細ページ下部の関連ページリンク確認済み
- [x] カテゴリページからツール一覧・ガイドへのリンク確認済み
- [x] ガイドページから関連カテゴリ・主要ツールへのリンク確認済み
- [x] 追加ガイド3本から関連ページへのリンク確認済み
- [x] スマホ表示向けの構造確認済み
  - 表は横スクロール対応
  - グリッドはスマホ1カラム対応
  - 固定幅による大きなはみ出し指定なし

### 3/3：商用利用・著作権の断定表現確認

- [x] 商用利用・著作権・無料・透かし・日本語対応に関する断定表現を確認済み
- [x] `完全無料` バッジは `無料プランあり` に修正済み（`categories/free/index.astro`）
- [x] `完全対応` 凡例は `対応` に修正済み（`categories/japanese/index.astro`）
- [x] `永久無料` は注意喚起文脈での引用のため問題なし
- [x] 断定表現の残存なし

### 公開環境での反映確認

| 確認項目 | 状況 |
|---|---|
| `https://aicreative-db.com/categories/free/` で `無料プランあり` 表示 | ✅ 確認済み |
| `https://aicreative-db.com/categories/japanese/` で `対応 / 一部対応 / 非対応` 凡例 | ✅ 確認済み |
| `https://aicreative-db.com/sitemap.xml` で19URL | ✅ 確認済み |
| `https://aicreative-db.com/robots.txt` は `Disallow: /` 維持中 | ✅ 確認済み |

### 現在の総合状態

| 項目 | 状態 |
|---|---|
| MVP検証公開 | 完了 |
| 追加ガイド3本 | 実装・公開反映済み |
| 本番化前最終チェック | **完了**（2026-05-05） |
| 現在の公開ページ数 | 19ページ |
| sitemap.xml | 19URL |
| noindex,nofollow | 維持中 |
| robots.txt | `Disallow: /` 維持中 |
| GSC | 未設定 |
| GA4 | 未設定 |
| AdSense | 未申請 |
| 本番化判断 | 待ち |

---

## 3-B. 固定4ページ実装・公開反映完了（2026-05-05）

### 実装・build確認

- [x] `/privacy-policy/` 実装済み・`dist/privacy-policy/index.html` 生成確認済み
- [x] `/contact/` 実装済み・`dist/contact/index.html` 生成確認済み
- [x] `/about/` 実装済み・`dist/about/index.html` 生成確認済み
- [x] `/editorial-policy/` 実装済み・`dist/editorial-policy/index.html` 生成確認済み
- [x] フッターに4固定ページリンク追加済み（`BaseLayout.astro`）
- [x] `public/sitemap.xml` に4URL追加済み（19URL → 23URL）
- [x] `npm run build` 成功（23ページ生成確認済み）
- [x] 4ページすべて `noindex,nofollow` 維持確認済み

### 公開環境での反映確認

| 確認項目 | 状況 |
|---|---|
| `https://aicreative-db.com/privacy-policy/` 表示 | ✅ 確認済み |
| `https://aicreative-db.com/contact/` 表示 | ✅ 確認済み |
| `https://aicreative-db.com/about/` 表示 | ✅ 確認済み |
| `https://aicreative-db.com/editorial-policy/` 表示 | ✅ 確認済み |
| `https://aicreative-db.com/sitemap.xml` で23URL | ✅ 確認済み |
| `https://aicreative-db.com/robots.txt` は `Disallow: /` 維持中 | ✅ 確認済み |
| noindex,nofollow 維持 | ✅ 全ページ維持中 |

### 現在の総合状態

| 項目 | 状態 |
|---|---|
| MVP検証公開 | 完了 |
| 追加ガイド3本 | 実装・公開反映済み |
| 本番化前最終チェック | 完了（2026-05-05） |
| 固定4ページ | **実装・公開反映済み**（2026-05-05） |
| 現在の公開ページ数 | **23ページ** |
| sitemap.xml | **23URL** |
| noindex,nofollow | 維持中 |
| robots.txt | `Disallow: /` 維持中 |
| GSC | 未設定 |
| GA4 | 未設定 |
| AdSense | 未申請 |
| 本番化判断 | 待ち |

---

## 3-C. ロゴ利用方針確認（2026-05-05）

### 管理ファイル

- [x] `docs/logo-sources.md` 作成済み（9ツールの公式ロゴ利用状況を分類・記録）

### 利用ステータスまとめ

| ツール | slug | usageStatus |
|---|---|---|
| Midjourney | `midjourney` | `fallback-only` |
| Adobe Firefly | `adobe-firefly` | `permission-needed` |
| Stable Diffusion | `stable-diffusion` | `fallback-only` |
| DALL·E / OpenAI | `dalle` | `guideline-review-needed` |
| Canva AI画像生成 | `canva-ai-image-generator` | `permission-needed` |
| Leonardo AI | `leonardo-ai` | `fallback-only` |
| Runway | `runway` | `guideline-review-needed` |
| Pika | `pika` | `fallback-only` |
| Kling AI | `kling-ai` | `fallback-only` |

### 方針

- 公式ブランド素材または明確に利用可能と確認できた素材のみ使用する
- 非公式ロゴは使用しない
- 公式ロゴに似せた自作SVGは作成しない
- 外部URL直リンクは行わない
- `permission-needed`（Adobe Firefly / Canva）は許諾確認なしで使用しない
- `guideline-review-needed`（OpenAI / Runway）はブランドガイドライン確認後に判断する
- `fallback-only` の5ツールは現時点でロゴなし
- ロゴを追加する場合は `public/logos/` に公式確認済みファイルのみ配置し、`docs/logo-sources.md` を更新してから `ToolLogo.astro` の `hasLogo` セットに追加する

### 現在の表示方針

- トップページのツールカードには `ToolLogo.astro` によるロゴ枠を表示
- ロゴ未配置の場合は頭文字フォールバック（白カード＋イニシャル）で表示
- **当面はフォールバック表示を正式運用とする**
- ロゴ未配置でもビルド・表示に影響なし（確認済み）

---

## 3-E. お問い合わせ先メールアドレス設定完了（2026-05-07）

### 実装内容

- [x] `/contact/` の「準備中」表示を削除し、メールアドレスを設定済み
- [x] 問い合わせ先：`contact@aicreative-db.com`（mailtoリンク）
- [x] `npm run build` 成功（25ページ生成確認済み）
- [x] `noindex,nofollow` 維持確認済み

---

## 3-D. トップページデザイン調整完了（2026-05-05）

### 実装内容

- [x] トップページを白背景・ネイビー×ブルー基調の比較DBデザインに調整済み
- [x] Hero、検索ボックス風UI、カテゴリチップ、注目のツール、比較表、ガイドカード、確認ポイントを実装済み
- [x] 「注目のツール」を抜粋6件表示に変更済み（全9件 → 6件）
- [x] 「ツール比較表」を `人気ツール抜粋` として6件表示に変更済み（全9件 → 6件）

### 注目のツール 表示対象（順序固定）

1. Midjourney
2. Adobe Firefly
3. Runway
4. Canva AI画像生成
5. Kling AI
6. Leonardo AI

### リンク整理確認

- [x] 「注目のツール」見出し横バッジ：`全6件`
- [x] 「注目のツール」右上リンク：`すべてのツールを見る →` → `/tools/`
- [x] 「ツール比較表」見出し：`ツール比較表（人気ツール抜粋）`
- [x] 「ツール比較表」右上リンク：`全ツール一覧 →` → `/tools/`
- [x] 各カードの `詳しく見る →` は各ツール詳細ページへリンク済み
- [x] 比較表の `詳細 →` は各ツール詳細ページへリンク済み

### カードデザイン

- [x] ToolLogo 上部中央配置
- [x] ロゴ未配置時は頭文字フォールバック表示
- [x] ツール名は太字・中央寄せ
- [x] カテゴリは淡いブルーのpill
- [x] 説明文は3行クランプ・`min-h-[4.5rem]`
- [x] `詳しく見る →` は `mt-auto` で下部固定
- [x] グリッド：`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6`

### 品質確認

- [x] 断定表現チェック済み（`完全無料` / `完全対応` / `商用利用OK` / `著作権上問題なし` / `自由に使える` / `利用者に帰属` の検出なし）
- [x] `npm run build` 成功（23ページ生成）
- [x] `noindex,nofollow` 維持確認済み
- [x] `robots.txt` の `Disallow: /` 維持確認済み

### 現在の総合状態

| 項目 | 状態 |
|---|---|
| 公開ページ数 | **23ページ** |
| sitemap.xml | **23URL** |
| noindex,nofollow | 維持中 |
| robots.txt | `Disallow: /` 維持中 |
| GSC | 未設定 |
| GA4 | 未設定 |
| AdSense | 未申請 |
| 本番ドメイン移行 | 移行前 |
| 本番化判断 | 待ち |

---

## 4. 本番化時に変更するもの

> **注意：以下はユーザー確認のもとで実施してください。自動実行禁止。**

### 本番化手順（順序厳守）

1. [ ] 全ページの `noindex,nofollow` を解除する（`BaseLayout.astro`）
2. [ ] `robots.txt` の `Disallow: /` を解除する（クローラー許可）
3. [ ] `npm run build` を実行し `dist/` を再生成する
4. [ ] `dist/` を ConoHa WING の `public_html/aicreative-db.com/` へ再アップロード（FTP）
5. [ ] 公開URL（https://aicreative-db.com/）で全ページ表示確認
6. [ ] Google Search Console でサイトマップ（`/sitemap.xml`）を送信する

### その他（本番化後）

- [ ] GA4を設定する（トラッキングコード埋め込み）
- [ ] AdSense申請準備を進める（コンテンツ量・品質の最終確認後）

---

## 5. 次に判断する項目

> 検証公開が完了した現時点で、以下のいずれかを選択してください。

| 選択肢 | 内容 |
|---|---|
| A. このまま本番化する | noindex解除 → robots.txt解除 → ビルド → アップロード → GSC送信 |
| B. 本番化前にコンテンツを増やす | ツール追加・ガイド追加・カテゴリ拡充などを先行 |
| C. GSC / GA4 を先に準備する | Search Console プロパティ追加・GA4タグ設置を先行（本番化と同時でも可） |
| D. AdSense申請前に記事・ガイドを追加する | コンテンツ量・品質をAdSense基準に合わせてから申請 |

---

## 6. 本番化時の禁止事項（変更不可）

- URL設計を変更しない（既存URLの変更はSEO上のリスクあり）
- slugを変更しない
- Content Collections schema を大きく変更しない
- 既存WordPressや他ドメインに触れない
- 公式情報で確認できない項目について商用利用可否を断定しない
- `npm run build` が通らない状態で公開しない

---

## 7. 確認コマンド

```bash
# ビルド確認
npm run build

# ローカルプレビュー
npm run preview
```

---

## 8. 掲載ツールの次回確認予定

| ツール | lastReviewed | nextReviewDue | 状態 |
|---|---:|---:|---|
| Midjourney | 2026-05-04 | 2026-08-04 | 一次精査済み |
| Adobe Firefly | 2026-05-04 | 2026-08-04 | 一次精査済み |
| Stable Diffusion | 2026-05-04 | 2026-08-04 | 一次精査済み |
| DALL·E | 2026-05-04 | 2026-08-04 | 一次精査済み |
| Canva AI画像生成 | 2026-05-04 | 2026-08-04 | 一次精査済み |
| Leonardo AI | 2026-05-04 | 2026-08-04 | 一次精査済み |
| Runway | 2026-05-05 | 2026-08-04 | 一次精査済み |
| Pika | 2026-05-05 | 2026-08-04 | 一次精査済み |
| Kling AI | 2026-05-05 | 2026-08-04 | 一次精査済み |

---

_このファイルはバージョン管理対象です。本番化作業のたびに更新してください。_
