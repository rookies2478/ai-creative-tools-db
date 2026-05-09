# 固定ページ追加計画

AIクリエイティブツール比較DB向け。AdSense申請前・本番化前の信頼性強化を目的とする。

---

## 現在の状態（2026-05-05 更新）

| 項目 | 状態 |
|---|---|
| MVP検証公開 | 完了 |
| 本番化前最終チェック | 完了 |
| 固定4ページ | **実装・公開反映済み** |
| 現在の公開ページ数 | **23ページ** |
| sitemap.xml | **23URL** |
| noindex,nofollow | 維持中 |
| robots.txt | `Disallow: /` 維持中 |
| GSC | 未設定 |
| GA4 | 未設定 |
| AdSense | 未申請 |
| 本番化判断 | 待ち |

---

## 参考構成

AI議事録サイト（https://www.ai-gijiroku-navi.com/）のフッターに以下の固定ページ導線がある。

- お問い合わせ
- 掲載方針・比較基準
- 運営者情報
- プライバシーポリシー

この構成を活用しつつ、**本文はコピーせず**、AIクリエイティブツール比較DB向けに新規作成する。

---

## 追加候補ページ（4本）

### 1. プライバシーポリシー

| 項目 | 内容 |
|---|---|
| URL | `/privacy-policy/` |
| ファイル | `src/pages/privacy-policy/index.astro` |
| 優先度 | 高（AdSense・GA4導入前提） |

**目的・記載内容：**

- アクセス解析（GA4）の利用方法とCookieに関する説明
- 広告配信（AdSense）とCookieに関する説明
- 外部サービスのリンク先については責任を負わない旨の免責
- 料金・商用利用条件・著作権情報の正確性について免責（公式情報優先の立場を明示）
- プライバシーポリシーの改定可能性の明記

**注意：**
- 法的断定を避ける
- GA4・AdSense導入後に内容を再確認する

---

### 2. お問い合わせ

| 項目 | 内容 |
|---|---|
| URL | `/contact/` |
| ファイル | `src/pages/contact/index.astro` |
| 優先度 | 中 |

**目的・記載内容：**

- サイト運営者への連絡窓口を提供する
- 初期はメールアドレス掲載または連絡方法の案内文のみ
- フォーム機能は初期導入しない

**注意：**
- メールアドレス掲載時はスパム対策を検討する（画像化・JavaScriptによる表示・@を「AT」表記等）
- 外部フォームサービス（Googleフォーム等）の利用は別途判断する

---

### 3. 運営者情報

| 項目 | 内容 |
|---|---|
| URL | `/about/` |
| ファイル | `src/pages/about/index.astro` |
| 優先度 | 中 |

**目的・記載内容：**

- サイトの運営方針を説明する
- AIクリエイティブツール比較DBとして、公式情報確認と免責を重視する姿勢を明記する
- 想定読者（AI画像・動画生成ツールの選定を検討している個人・クリエイター・事業者）を説明する
- 比較情報は公式情報を優先して作成しているが、最新情報は各公式サイトで確認するよう促す

---

### 4. 掲載方針・比較基準

| 項目 | 内容 |
|---|---|
| URL | `/editorial-policy/` |
| ファイル | `src/pages/editorial-policy/index.astro` |
| 優先度 | 高（AdSense審査・信頼性強化） |

**目的・記載内容：**

- ツール掲載基準の説明（公式サイト・料金ページ・利用規約・ヘルプページを優先）
- 商用利用・著作権について法的断定をしない方針を明記する
- `lastReviewed` / `nextReviewDue` の運用方針（3ヶ月ごとを目安に再確認）を説明する
- 広告掲載・収益化が比較内容・掲載順序に影響しない方針を明記する
- 情報の鮮度に関する免責（料金・機能は変更される可能性があり、最新情報は各公式サイトを参照）

---

## sitemap.xml への追加

4ページ追加後、`public/sitemap.xml` に以下4URLを追記する。

```xml
<url><loc>https://aicreative-db.com/privacy-policy/</loc></url>
<url><loc>https://aicreative-db.com/contact/</loc></url>
<url><loc>https://aicreative-db.com/about/</loc></url>
<url><loc>https://aicreative-db.com/editorial-policy/</loc></url>
```

追加後：19URL → **23URL**

---

## フッターへのリンク追加

`src/layouts/BaseLayout.astro` のフッターに4ページへのリンクを追加する。

追加対象：
- プライバシーポリシー（`/privacy-policy/`）
- お問い合わせ（`/contact/`）
- 運営者情報（`/about/`）
- 掲載方針・比較基準（`/editorial-policy/`）

---

## 実装方針

- 既存URLは変更しない
- 追加URLは上記4つに限定する（`/privacy-policy/` `/contact/` `/about/` `/editorial-policy/`）
- CMSは導入しない
- フォーム機能は導入しない
- 外部DBは導入しない
- sitemap.xml に4URL追加する（19URL → 23URL）
- **noindex解除前に追加する**（noindex,nofollow 維持したまま実装）
- 4ページまとめて1タスクで実装してよい
- 毎回 `npm run build` を通す
- フッターに4ページへのリンクを追加する

---

## 注意点

- 既存サイト（AI議事録サイト等）の本文をコピーしない
- AIクリエイティブツール比較DB向けに新規作成する
- プライバシーポリシーは法的断定を避ける
- AdSenseやGA4導入後にプライバシーポリシーの内容を再確認する
- お問い合わせフォームは初期実装しない
- メールアドレス掲載時はスパム対策を検討する
- 既存WordPressや他ドメインには触れない

---

## 推奨実施順序

| ステップ | 作業 |
|---|---|
| 1 | `static-pages-plan.md` 作成 ← **完了** |
| 2 | `/privacy-policy/` `/contact/` `/about/` `/editorial-policy/` を実装 ← **完了** |
| 3 | フッターに4ページリンクを追加 ← **完了** |
| 4 | `public/sitemap.xml` に4URL追加（23URL） ← **完了** |
| 5 | `npm run build`（23ページ確認） ← **完了** |
| 6 | `dist/` を手動アップロード（FTP） ← **完了** |
| 7 | 公開URL（https://aicreative-db.com/）で確認 ← **完了** |
| 8 | noindex解除・robots許可の本番化判断 ← 判断待ち |

---

## 禁止事項（実装時も維持）

- URL設計を変更しない
- slugを変更しない
- noindexを解除しない（本番化判断まで）
- robots.txt を変更しない（本番化判断まで）
- GSC送信はしない
- GA4設定はしない
- AdSense申請はしない
- FTPアップロードは手動実施のみ（自動実行禁止）
- project-spec.md は変更しない

---

---

## 実装・公開反映完了記録（2026-05-05）

| ページ | 実装 | 公開確認 |
|---|---|---|
| `/privacy-policy/` | ✅ 完了 | ✅ 確認済み |
| `/contact/` | ✅ 完了 | ✅ 確認済み |
| `/about/` | ✅ 完了 | ✅ 確認済み |
| `/editorial-policy/` | ✅ 完了 | ✅ 確認済み |
| フッターリンク追加 | ✅ 完了 | ✅ 確認済み |
| sitemap.xml（23URL） | ✅ 完了 | ✅ 確認済み |
| noindex,nofollow 維持 | ✅ 維持中 | ✅ 確認済み |
| robots.txt `Disallow: /` 維持 | ✅ 維持中 | ✅ 確認済み |

_このファイルは計画書です。ステップ1〜7完了。次は本番化判断（ステップ8）。_
