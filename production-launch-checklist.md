# 本番公開時の切り替えチェックリスト

## 1. noindex 解除

**対象ファイル:** `src/layouts/BaseLayout.astro` 行29

```html
<!-- 検証中（変更禁止） -->
<meta name="robots" content="noindex,nofollow" />

<!-- 本番切替後 -->
<meta name="robots" content="index,follow" />
```

- [ ] BaseLayout.astro の `noindex,nofollow` → `index,follow` に変更
- [ ] `npm run build` で反映確認

---

## 2. robots.txt 切り替え

**対象ファイル:** `public/robots.txt`

```txt
# 検証中（変更禁止）
User-agent: *
Disallow: /

# 本番切替後
User-agent: *
Allow: /
Sitemap: https://aicreative-db.com/sitemap.xml
```

- [ ] Disallow: / を削除し Allow: / に変更
- [ ] Sitemap 行を追記

---

## 3. sitemap の有効化・更新

**現状:** `public/sitemap.xml` は手動管理。主要ページ・全ツールページ・信頼性ページ（/disclaimer/ 含む）を記載済み。

- [ ] 本番ドメイン `https://aicreative-db.com` が全 `<loc>` に使われていることを確認（現状済）
- [ ] 新規ツールページを追加した場合は sitemap.xml を手動更新
- [ ] GSC から sitemap.xml を送信（`https://aicreative-db.com/sitemap.xml`）

---

## 4. canonical の確認

**現状:** 全ページで `canonicalPath` を渡しており canonical 設定済

`astro.config.mjs` の `site: 'https://aicreative-db.com'` でドメインが決まるため、ドメイン変更時は同ファイルも更新する。

- [ ] 本番ドメイン確定後に `astro.config.mjs` の `site` 値が正しいか確認
- [ ] 新規ページ追加時は `canonicalPath` を必ず渡す

---

## 5. GA4 設置

- [ ] GA4 プロパティ作成（まだなら）
- [ ] 測定ID（G-XXXXXXXXXX）を取得
- [ ] `BaseLayout.astro` の `<head>` に gtag スクリプトを追加
- [ ] GA4 でリアルタイムレポートが取れるか確認

```html
<!-- 追加箇所: BaseLayout.astro <head> 内 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 6. Google Search Console (GSC) 登録

- [ ] GSC でプロパティを追加（URLプレフィックス: `https://aicreative-db.com/`）
- [ ] 所有権確認（HTMLファイル配置 or メタタグ挿入）
- [ ] sitemap.xml を GSC から送信
- [ ] インデックス登録リクエスト（優先ページから）

---

## 7. AdSense 審査前チェック

- [ ] プライバシーポリシーページが公開されている（`/privacy-policy/`）
- [ ] 運営者情報ページが公開されている（`/about/`）
- [ ] コンテンツが十分な量・質を持っているか確認
- [ ] AdSense アカウント作成・サイト登録
- [ ] `<head>` に AdSense 自動広告コードを追加
- [ ] 審査通過後に広告ユニットを配置

---

## 8. 独自ドメイン設定

**想定ドメイン:** `https://aicreative-db.com`

- [ ] ドメイン取得済みか確認
- [ ] DNS を ConoHa WING のネームサーバーに向ける
- [ ] SSL 証明書（自動発行）が有効になっていることを確認
- [ ] `https://aicreative-db.com` でアクセスできることを確認

---

## 9. ConoHa WING へのアップロード

- [ ] `npm run build` で `dist/` を生成
- [ ] ConoHa WING のコントロールパネルにログイン
- [ ] FTP or ファイルマネージャーで `dist/` の中身をドキュメントルートにアップロード
- [ ] `index.html` がルートに配置されていることを確認
- [ ] トップページ・ツール詳細ページが正しく表示されるか確認

---

## 10. Basic 認証の解除

- [ ] 検証環境で Basic 認証を設定している場合はタイミングを決めて解除（現状: 未設定の可能性あり）
- [ ] `.htaccess` に Basic 認証の設定が残っていないか確認
- [ ] 解除後にクローラーが正常にアクセスできるか robots.txt 側で担保されているか確認

---

## 切り替え順序（推奨）

1. `robots.txt` → `noindex` 解除（クロール許可してからインデックス許可）
2. `astro.config.mjs` の `site` 確認 → `npm run build`
3. ConoHa WING アップロード
4. GSC 所有権確認 → sitemap 送信
5. GA4 動作確認
6. AdSense 申請（コンテンツが十分になってから）
