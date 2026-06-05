# 内部作業ログ 2026年6月

> 運用者向け内部メモ。公開ページではない。

---

## 2026-06-05 useCase slug 追加候補・採用判断メモ

> 方針記録のみ。config.ts・useCases enum・tools frontmatter・URL・DB構造は変更していない。

### 採用判断：anime-illustration

| 項目 | 内容 |
|------|------|
| slug | `anime-illustration` |
| 日本語名 | アニメ・イラスト風 |
| 想定URL | `/use-cases/anime-illustration/` |
| 判断 | **追加候補として採用** |

**採用理由**

- 「アニメ風AI画像生成」「イラスト風AI画像生成」という独立した検索意図がある
- AI画像生成カテゴリとの接続が強い
- 既存slug（sns / youtube / thumbnail / blog 等）では代替しにくい
- 二次創作・LoRA・画風指定など固有の注意点を扱える
- 代表ツール5件・比較表・選び方・注意事項・FAQがあり、薄いページではない

**既存DBとの関係**

- tools frontmatter の `illustration` enum は当面維持
- ページslugとして `anime-illustration` を useCases マスタ追加候補とする

**注意**

- 既存URLは変更しない
- 公式情報で確認できない商用利用・著作権・二次創作可否は断定しない

---

### 採用判断：realistic-photo

| 項目 | 内容 |
|------|------|
| slug | `realistic-photo` |
| 日本語名 | 実写・写真風 |
| 想定URL | `/use-cases/realistic-photo/` |
| 判断 | **追加候補として採用** |

**採用理由**

- 「実写風AI画像生成」「写真風AI画像生成」という独立した検索意図がある
- AI画像生成カテゴリとの接続が強い
- `ec / ads / sns` などの既存slugでは実写・写真風全般を代替しにくい
- 肖像権・AI生成明示・広告利用・人物画像など固有の注意点を扱える
- 代表ツール5件・比較表・選び方・注意事項・FAQがあり、薄いページではない

**既存DBとの関係**

- tools frontmatter の `photo_real` enum は当面維持
- ページslugとして `realistic-photo` を useCases マスタ追加候補とする

**注意**

- 既存URLは変更しない
- 肖像権・商標・広告媒体ポリシー・人物画像利用について断定しない

---

### 実装時の注意（共通）

- 既存URLを変更しない
- `illustration` / `photo_real` enum を即renameしない
- config.ts や tools frontmatter を触る場合は Batch Update Protocol で行う
- まず1〜2ファイルで試し、Data Quality Check と `npm run build` を通してから展開する

---

## 2026-06-04 カテゴリ強化・用途別ページ改善・noindex整理

### 対象領域

| 領域 | 内容 |
|------|------|
| AI動画生成カテゴリ | カテゴリページ本文・導線強化 |
| AI画像生成カテゴリ | カテゴリページ本文・導線強化 |
| AI動画編集カテゴリ | カテゴリページ本文・導線強化 |
| AIアバター動画カテゴリ | カテゴリページ本文・導線強化 |
| AI音声・ナレーションカテゴリ | カテゴリページ本文・導線強化 |
| AIデザインカテゴリ | カテゴリページ本文・導線強化 |
| 用途別ページ | 各 use-case ページの内容整備・主要ツール導線追加 |
| 主要ツール詳細ページ | 導線・FAQ・内部リンク整理 |
| noindex / sitemap | noindex対象ページの見直し・sitemap除外確認 |

### 主な変更内容

- 各カテゴリページ（`src/pages/categories/`）の本文を強化
- 用途別ページ（`src/pages/use-cases/`）に主要ツールへの導線を追加
- 主要ツール詳細ページの内部リンク・FAQ整備
- noindex対象ページをメタタグ・sitemap両面で整理

### noindexにしたページ

| URL | 理由 |
|-----|------|
| `/prompts/` | コンテンツ品質が中心カテゴリより低い。当面インデックス不要 |
| `/templates/` | 同上 |

### index維持確認したページ

- `/categories/design/` — 正常にindex対象
- `/categories/voice-narration/` — 正常にindex対象

### build結果

- 終了コード: **0**
- 生成ページ数: **88ページ** 正常生成
- WARN: なし（Duplicate id は現時点で再現なし）

### 本番反映後に確認すべきURL

```
/categories/video-generation/
/categories/image-generation/
/categories/video-editing/
/categories/avatar-video/
/categories/voice-narration/
/categories/design/
/use-cases/
/prompts/         ← noindex確認（Google Search Console）
/templates/       ← noindex確認（Google Search Console）
```

### 今後の保留事項

- **Duplicate id WARN** — 現時点で再現なし。再発時に別タスクで調査
- **`/prompts/` `/templates/`** — 当面noindex維持。コンテンツ品質向上後に再評価
- プロンプト・テンプレートコンテンツは中心カテゴリより優先しない方針を継続

### 作業時の制約（遵守事項）

- 公開ページを増やさない
- URL・slug・DB構造を変更しない
- `.env`・APIキー・認証情報・既存WordPressサイトには触れない
- 本番反映は別途手動で実施
