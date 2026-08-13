#!/usr/bin/env node
//
// validate:publish — dist配下の生成HTML/sitemapに対する静的公開検証。
//
// 対象: dist/**/*.html, dist/sitemap.xml（現行buildが生成する単一sitemap。
//       sitemap-indexや分割sitemap-*.xmlが将来生成された場合は自動検出する）。
// 除外: dist/_astro/**, JS, CSS, font, image, video, source map, favicon, manifest, robots.txt
//       （robots.txtはsitemap URLとの整合確認にのみ限定的に読む）。
//
// ERROR   = 機械的に違反と確定できる。1件以上でexit code 1。
// WARNING = 品質上の懸念だが意図的な可能性がある。exit codeに影響しない。
// INFO    = 検査対象数などの補足情報。
//
// このスクリプトは:
// - 外部通信を一切行わない。
// - ブラウザ自動化を一切使わない。
// - secret/credentialへ一切アクセスしない。
// - src配下・DBデータ・dist生成物そのものを一切変更しない。
// - eval/Function constructor/外部CLI/Python/OS固有コマンドに依存しない。
// - 正規表現による限定的な抽出のみを行い、任意HTML全構造の完全解析は主張しない
//   （現行distはAstroが生成する整形式HTMLであることを前提にした限定解析）。

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, sep } from "node:path";

const DIST_DIR = "dist";
const args = process.argv.slice(2);

if (args.includes("--help")) {
  console.log(`validate:publish - dist配下の生成HTML/sitemapの静的検証

Usage: npm run build && npm run validate:publish

ERROR   : 違反確定。exit code 1の原因。
WARNING : 品質上の懸念（意図的な可能性あり）。exit codeに影響しない。
INFO    : 検査対象数などの補足情報。

外部通信なし。ブラウザ自動化なし。secretアクセスなし。distを含むいかなる生成物・ソースも変更しない。`);
  process.exit(0);
}

if (!existsSync(DIST_DIR)) {
  console.error("[ERROR] dist/ が存在しません");
  console.error("  rule: dist-missing");
  console.error("  Run npm run build before validate:publish");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// SITE origin — astro.config.mjs の site 値から取得する（推測でのハードコード
// 重複を避けるため、簡易正規表現でのみ抽出する）。
// ---------------------------------------------------------------------------

function loadSiteOrigin() {
  const cfg = readFileSync("astro.config.mjs", "utf8");
  const m = cfg.match(/site:\s*['"]([^'"]+)['"]/);
  if (!m) {
    console.error("[ERROR] astro.config.mjs から site 設定を取得できません");
    process.exit(1);
  }
  return m[1].replace(/\/$/, "");
}

const SITE_ORIGIN = loadSiteOrigin();

// ---------------------------------------------------------------------------
// VideoObject適格pageSlug集合 — src/data/generatedVideos.tsをソースオブトゥルースとして
// 正規表現抽出する（sampleType: 'tool-video-output' かつ isSameToolAsPage: true の
// レコードが持つpageSlugのみ）。VideoObjectはこの集合に属さないツールページに
// 出力された場合、漏出として扱う。2ツール（Kling AI/PixVerse）への決め打ちを避けるため、
// データ側の条件をそのまま参照する。
// ---------------------------------------------------------------------------

function loadVideoObjectEligibleSlugs() {
  const path = "src/data/generatedVideos.ts";
  if (!existsSync(path)) return new Set();
  const src = readFileSync(path, "utf8");
  const entryBlocks = src.split(/\n\s*\{\n/).slice(1);
  const slugs = new Set();
  for (const block of entryBlocks) {
    const isEligible =
      /sampleType:\s*'tool-video-output'/.test(block) && /isSameToolAsPage:\s*true/.test(block);
    if (!isEligible) continue;
    const m = block.match(/pageSlug:\s*'([^']+)'/);
    if (m) slugs.add(m[1]);
  }
  return slugs;
}

const VIDEOOBJECT_ELIGIBLE_SLUGS = loadVideoObjectEligibleSlugs();

// ---------------------------------------------------------------------------
// Violation collection
// ---------------------------------------------------------------------------

const violations = []; // { level, file, rule, note }

function report(level, file, rule, note) {
  violations.push({ level, file, rule, note });
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

// 除外: dist/_astro/**（JS/CSS/font等のビルド資産）
const EXCLUDED_DIR_PREFIXES = ["_astro"];

function walk(dir, out) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (EXCLUDED_DIR_PREFIXES.includes(entry.name) && dir === DIST_DIR) continue;
      walk(join(dir, entry.name), out);
    } else {
      out.push(join(dir, entry.name));
    }
  }
  return out;
}

function toPosix(p) {
  return p.split(sep).join("/");
}

const allFiles = walk(DIST_DIR, []).map(toPosix);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
const sitemapFiles = allFiles.filter((f) =>
  /\/sitemap(-index)?\.xml$/.test(f) || /\/sitemap-\d+\.xml$/.test(f)
);

// dist上のルート一覧（trailing-slash込みのパス）を構築。
// /path/index.html -> /path/
// /path.html        -> /path (現行buildにこの形式は存在しない想定だが対応しておく)
// /index.html       -> /
function distFileToRoute(f) {
  let route = f.replace(/^dist/, "");
  if (route.endsWith("/index.html")) {
    return route.slice(0, -"index.html".length);
  }
  return route.replace(/\.html$/, "");
}

const routeSet = new Set(htmlFiles.map(distFileToRoute));

function routeExists(pathname) {
  // ページとして存在するかを判定。trailing slashあり/なし両方を許容。
  if (routeSet.has(pathname)) return true;
  if (!pathname.endsWith("/") && routeSet.has(pathname + "/")) return true;
  if (pathname.endsWith("/") && routeSet.has(pathname.slice(0, -1))) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Per-file HTML checks
// ---------------------------------------------------------------------------

// タイトル横断重複チェック用
const titleRegistry = new Map(); // title text -> [files]
// noindexページ一覧
const noindexRoutes = new Set();
// 実在する非noindex・非404ルート
const publicRoutes = new Set();

// 404ページはsitemap対象外・特殊ページとして明示的に除外する。
function isSpecialRoute(route) {
  return route === "/404";
}

function extractAll(regex, content) {
  return [...content.matchAll(regex)];
}

function checkHtmlFile(file, content) {
  const route = distFileToRoute(file);

  // A. title
  const titleMatches = extractAll(/<title>([\s\S]*?)<\/title>/g, content);
  if (titleMatches.length === 0) {
    report("ERROR", file, "missing-title", "title要素が存在しません");
  } else {
    if (titleMatches.length > 1) {
      report("ERROR", file, "duplicate-title-in-page", `同一HTML内にtitle要素が${titleMatches.length}件`);
    }
    const titleText = titleMatches[0][1].trim();
    if (titleText === "") {
      report("ERROR", file, "empty-title", "title要素が空です");
    } else {
      if (!titleRegistry.has(titleText)) titleRegistry.set(titleText, []);
      titleRegistry.get(titleText).push(file);
    }
  }

  // B. meta description
  const descMatches = extractAll(/<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/g, content);
  if (descMatches.length === 0) {
    report("ERROR", file, "missing-meta-description", 'name="description" が存在しません');
  } else {
    if (descMatches.length > 1) {
      report("ERROR", file, "duplicate-meta-description", `同一HTML内にmeta descriptionが${descMatches.length}件`);
    }
    const descText = descMatches[0][1].trim();
    if (descText === "") {
      report("ERROR", file, "empty-meta-description", "meta descriptionのcontentが空です");
    } else {
      // 文字数の目安はWARNINGに限定し、固定SEO正解として断定しない。
      if (descText.length < 20) {
        report("WARNING", file, "short-meta-description", `description長さ${descText.length}文字`);
      }
      if (descText.length > 160) {
        report("WARNING", file, "long-meta-description", `description長さ${descText.length}文字`);
      }
    }
  }

  // C. H1
  const h1Matches = extractAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g, content);
  if (h1Matches.length === 0) {
    report("ERROR", file, "missing-h1", "h1要素が存在しません");
  } else {
    if (h1Matches.length > 1) {
      report("ERROR", file, "duplicate-h1", `同一HTML内にh1要素が${h1Matches.length}件`);
    }
    const h1Text = h1Matches[0][1].replace(/<[^>]+>/g, "").trim();
    if (h1Text === "") {
      report("ERROR", file, "empty-h1", "h1要素が空です");
    }
  }

  // D. canonical
  // 404ページはインデックス対象ページではなくcanonicalを持たないのが標準的な挙動のため、
  // missing-canonicalの対象から明示的に除外する。
  const canonicalMatches = extractAll(/<link\s+rel="canonical"\s+href="([^"]*)"\s*\/?>/g, content);
  if (canonicalMatches.length === 0) {
    if (!isSpecialRoute(route)) {
      report("ERROR", file, "missing-canonical", "canonical linkが存在しません");
    }
  } else {
    if (canonicalMatches.length > 1) {
      report("ERROR", file, "duplicate-canonical", `同一HTML内にcanonicalが${canonicalMatches.length}件`);
    }
    const href = canonicalMatches[0][1].trim();
    if (href === "") {
      report("ERROR", file, "empty-canonical", "canonical hrefが空です");
    } else if (!/^https?:\/\//i.test(href)) {
      report("ERROR", file, "invalid-canonical-scheme", `canonical hrefがhttp(s)ではありません: ${href}`);
    } else {
      if (!href.startsWith(SITE_ORIGIN)) {
        report("ERROR", file, "canonical-origin-mismatch", `canonical origin不一致: ${href} (expected origin: ${SITE_ORIGIN})`);
      } else {
        const canonicalPath = href.slice(SITE_ORIGIN.length) || "/";
        if (/[?#]/.test(canonicalPath)) {
          report("ERROR", file, "canonical-has-query-or-hash", `canonical path不要なquery/hashを含む: ${canonicalPath}`);
        }
        // trailing slash方針: distルートは全て "/" 終端（404除く）。canonicalも一致させる。
        if (!isSpecialRoute(route) && canonicalPath !== route) {
          report("ERROR", file, "canonical-route-mismatch", `canonical path(${canonicalPath})がルート(${route})と一致しません`);
        }
      }
    }
  }

  // I. Open Graph（現行BaseLayoutで全公開ページに出力されるためERROR。404等特殊ページは除外。）
  if (!isSpecialRoute(route)) {
    const ogTitle = extractAll(/<meta\s+property="og:title"\s+content="([^"]*)"\s*\/?>/g, content);
    const ogDesc = extractAll(/<meta\s+property="og:description"\s+content="([^"]*)"\s*\/?>/g, content);
    const ogUrl = extractAll(/<meta\s+property="og:url"\s+content="([^"]*)"\s*\/?>/g, content);
    if (ogTitle.length === 0) report("ERROR", file, "missing-og-title", 'og:title が存在しません');
    if (ogDesc.length === 0) report("ERROR", file, "missing-og-description", 'og:description が存在しません');
    if (ogUrl.length === 0) {
      report("WARNING", file, "missing-og-url", 'og:url が存在しません');
    } else if (canonicalMatches.length > 0) {
      const canonicalHref = canonicalMatches[0][1].trim();
      if (ogUrl[0][1].trim() !== canonicalHref) {
        report("ERROR", file, "og-url-canonical-mismatch", `og:url(${ogUrl[0][1]}) != canonical(${canonicalHref})`);
      }
    }
  }

  // J. lang / charset / viewport（現行BaseLayoutで全公開ページに必須のためERROR）
  if (!/<html[^>]*\blang="ja"/.test(content)) {
    report("ERROR", file, "missing-html-lang", 'html要素に lang="ja" がありません');
  }
  if (!/<meta\s+charset="UTF-8"\s*\/?>/i.test(content)) {
    report("ERROR", file, "missing-charset", 'meta charsetがありません');
  }
  if (!/<meta\s+name="viewport"/.test(content)) {
    report("ERROR", file, "missing-viewport", 'meta viewportがありません');
  }

  // H. noindex
  const isNoindex = /<meta\s+name="robots"\s+content="[^"]*noindex[^"]*"/.test(content);
  if (isNoindex) {
    noindexRoutes.add(route);
  } else if (!isSpecialRoute(route)) {
    publicRoutes.add(route);
  }

  // E/F. bare href="#" / javascript: / 空href / 内部リンク
  // <script>内はJSリテラルがhref属性風の文字列を含みうるため、リンク検証対象から除外する。
  const contentWithoutScripts = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const hrefMatches = extractAll(/<a\s+[^>]*href="([^"]*)"[^>]*>/g, contentWithoutScripts);
  const idAttrs = new Set(extractAll(/\sid="([^"]+)"/g, content).map((m) => m[1]));
  for (const m of hrefMatches) {
    const href = m[1];
    if (href === "#") {
      report("ERROR", file, "bare-hash-href", 'href="#" は無効なリンク先です');
      continue;
    }
    if (href === "") {
      report("ERROR", file, "empty-href", 'href="" は無効なリンク先です');
      continue;
    }
    if (/^javascript:/i.test(href)) {
      report("ERROR", file, "javascript-href", `javascript: スキームのhrefは許可されません: ${href}`);
      continue;
    }
    if (href.startsWith("#")) {
      const anchorId = href.slice(1);
      if (anchorId && !idAttrs.has(anchorId)) {
        report("WARNING", file, "hash-anchor-target-missing", `#${anchorId} に対応するidが見つかりません`);
      }
      continue;
    }
    // F. 内部リンク判定
    if (/^(mailto:|tel:|sms:|data:|blob:)/i.test(href)) continue;
    let normalized = href;
    let isInternal = false;
    if (normalized.startsWith("/")) {
      isInternal = true;
    } else if (normalized.startsWith(SITE_ORIGIN)) {
      normalized = normalized.slice(SITE_ORIGIN.length) || "/";
      isInternal = true;
    } else if (/^https?:\/\//i.test(normalized)) {
      isInternal = false; // external origin
    } else {
      // 相対リンク（asset等含む可能性があるため拡張子を見て判定）
      isInternal = true;
    }
    if (!isInternal) continue;

    // query/hashを除去して判定
    const cleanPath = normalized.split(/[?#]/)[0];

    // assetリンク（拡張子を持つファイル）は404ページ判定対象外
    const isAsset = /\.[a-zA-Z0-9]{2,5}$/.test(cleanPath) && !cleanPath.endsWith(".html");
    if (isAsset) continue;

    if (!routeExists(cleanPath)) {
      report("ERROR", file, "broken-internal-link", `内部リンク先が存在しません: ${href}`);
    } else if (cleanPath === "/404" || cleanPath === "/404/" || cleanPath === "/404.html") {
      report("ERROR", file, "link-to-404", `404ページへの内部リンク: ${href}`);
    }
  }

  // G. JSON-LD
  const scriptMatches = extractAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g, content);
  const typeCounts = new Map(); // "@type" -> count（同一ページ内、@graph配下も含む）
  for (const sm of scriptMatches) {
    const raw = sm[1].trim();
    if (raw === "") {
      report("ERROR", file, "empty-json-ld", "JSON-LDスクリプトが空です");
      continue;
    }
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      report("ERROR", file, "invalid-json-ld", `JSON-LDのJSONとしての構文が不正です: ${e.message}`);
      continue;
    }
    const entries = Array.isArray(parsed) ? parsed : [parsed];
    for (const entry of entries) {
      checkJsonLdEntry(file, entry, { topLevel: true, route, typeCounts });
    }
  }

  // VideoObject重複・スコープ（適格pageSlug集合外への漏出）チェック
  const videoObjectCount = typeCounts.get("VideoObject") || 0;
  if (videoObjectCount > 1) {
    report("ERROR", file, "duplicate-videoobject", `同一ページ内にVideoObjectが${videoObjectCount}件`);
  }
  if (videoObjectCount >= 1) {
    const toolsMatch = route.match(/^\/tools\/([^/]+)\/?$/);
    if (toolsMatch) {
      const slug = toolsMatch[1];
      if (!VIDEOOBJECT_ELIGIBLE_SLUGS.has(slug)) {
        report(
          "ERROR",
          file,
          "videoobject-scope-violation",
          `VideoObjectがsrc/data/generatedVideos.tsの適格pageSlug集合に含まれないページに出力されています: ${slug}`
        );
      }
    }
  }

  // SoftwareApplication重複チェック（1ページ1件が現行実装の前提）
  const softwareAppCount = typeCounts.get("SoftwareApplication") || 0;
  if (softwareAppCount > 1) {
    report(
      "ERROR",
      file,
      "duplicate-softwareapplication",
      `同一ページ内にSoftwareApplicationが${softwareAppCount}件`
    );
  }
}

// JSON-LDは "@graph" 配下に複数エンティティをまとめる形式も正当（@contextは
// 親からの継承のため@graph配下の子要素には@context必須としない）。
function checkJsonLdEntry(file, entry, { topLevel, route, typeCounts }) {
  if (typeof entry !== "object" || entry === null) {
    report("ERROR", file, "invalid-json-ld-entry", "JSON-LDエントリがオブジェクトではありません");
    return;
  }
  if (topLevel && !entry["@context"]) {
    report("WARNING", file, "missing-json-ld-context", "@contextがありません");
  }
  if (Array.isArray(entry["@graph"])) {
    for (const child of entry["@graph"]) {
      checkJsonLdEntry(file, child, { topLevel: false, route, typeCounts });
    }
    return;
  }
  if (!entry["@type"]) {
    report("ERROR", file, "missing-json-ld-type", "@typeがありません");
    return;
  }
  typeCounts.set(entry["@type"], (typeCounts.get(entry["@type"]) || 0) + 1);
  if (entry["@type"] === "FAQPage") {
    checkFaqPage(file, entry);
  }
  if (entry["@type"] === "BreadcrumbList") {
    checkBreadcrumbList(file, entry);
  }
  if (entry["@type"] === "VideoObject") {
    checkVideoObject(file, entry);
  }
  if (entry["@type"] === "SoftwareApplication") {
    checkSoftwareApplication(file, entry);
  }
}

function checkFaqPage(file, entry) {
  if (!Array.isArray(entry.mainEntity)) {
    report("ERROR", file, "invalid-faqpage-mainentity", "FAQPage.mainEntityが配列ではありません");
    return;
  }
  entry.mainEntity.forEach((q, idx) => {
    if (!q || typeof q.name !== "string" || q.name.trim() === "") {
      report("ERROR", file, "invalid-faqpage-question-name", `mainEntity[${idx}].nameが不正です`);
    }
    if (!q || !q.acceptedAnswer || typeof q.acceptedAnswer.text !== "string" || q.acceptedAnswer.text.trim() === "") {
      report("ERROR", file, "invalid-faqpage-answer-text", `mainEntity[${idx}].acceptedAnswer.textが不正です`);
    }
  });
}

function checkBreadcrumbList(file, entry) {
  if (!Array.isArray(entry.itemListElement)) {
    report("ERROR", file, "invalid-breadcrumb-itemlist", "BreadcrumbList.itemListElementが配列ではありません");
    return;
  }
  entry.itemListElement.forEach((item, idx) => {
    if (!item || typeof item.position !== "number") {
      report("ERROR", file, "invalid-breadcrumb-position", `itemListElement[${idx}].positionが不正です`);
    }
    if (!item || typeof item.name !== "string" || item.name.trim() === "") {
      report("ERROR", file, "invalid-breadcrumb-name", `itemListElement[${idx}].nameが不正です`);
    }
    if (item && item.item !== undefined) {
      if (typeof item.item !== "string" || !/^https?:\/\//i.test(item.item)) {
        report("ERROR", file, "invalid-breadcrumb-item-url", `itemListElement[${idx}].itemがURL形式ではありません`);
      }
    }
  });
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim() !== "";
}

// ISO 8601 duration（現行サイトの実装形式 例: PT5S）の緩い構文チェック。
// 過度に厳密なSchema.org準拠検証は行わない。
const ISO8601_DURATION_RE = /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/;

function checkVideoObject(file, entry) {
  const requiredStringFields = ["name", "description", "uploadDate", "duration"];
  for (const field of requiredStringFields) {
    if (!isNonEmptyString(entry[field])) {
      report("ERROR", file, "invalid-videoobject-field", `VideoObject.${field}が不正または空です`);
    }
  }

  // thumbnailUrl: string または string配列を許容（現行実装は配列形式）
  const thumb = entry.thumbnailUrl;
  const thumbUrls = Array.isArray(thumb) ? thumb : thumb !== undefined ? [thumb] : [];
  if (thumbUrls.length === 0 || !thumbUrls.every((u) => isNonEmptyString(u))) {
    report("ERROR", file, "invalid-videoobject-thumbnailurl", "VideoObject.thumbnailUrlが不正または空です");
  }

  // 動画所在地: contentUrl または embedUrl のいずれか必須
  const hasContentUrl = isNonEmptyString(entry.contentUrl);
  const hasEmbedUrl = isNonEmptyString(entry.embedUrl);
  if (!hasContentUrl && !hasEmbedUrl) {
    report("ERROR", file, "missing-videoobject-location", "VideoObjectにcontentUrl/embedUrlのいずれもありません");
  }

  if (isNonEmptyString(entry.uploadDate) && Number.isNaN(Date.parse(entry.uploadDate))) {
    report("ERROR", file, "invalid-videoobject-uploaddate", `VideoObject.uploadDateが日付として解釈できません: ${entry.uploadDate}`);
  }

  if (isNonEmptyString(entry.duration) && !ISO8601_DURATION_RE.test(entry.duration)) {
    report("ERROR", file, "invalid-videoobject-duration", `VideoObject.durationがISO 8601形式ではありません: ${entry.duration}`);
  }
}

function checkSoftwareApplication(file, entry) {
  if (!isNonEmptyString(entry.name)) {
    report("ERROR", file, "invalid-softwareapplication-name", "SoftwareApplication.nameが不正または空です");
  }
  if (!isNonEmptyString(entry.url)) {
    report("ERROR", file, "invalid-softwareapplication-url", "SoftwareApplication.urlが不正または空です");
  } else if (!/^https?:\/\//i.test(entry.url)) {
    report("ERROR", file, "invalid-softwareapplication-url", `SoftwareApplication.urlがhttp(s)ではありません: ${entry.url}`);
  }
}

// ---------------------------------------------------------------------------
// 危険な文字列検出（本番ブラウザから直接呼び出される可能性がある値）
// 単なる文字列言及と実際のsecret出力を区別し、明確なtoken/Authorization header
// が出力されている場合のみERROR、URL言及のみはWARNING/INFOに留める。
// ---------------------------------------------------------------------------

const DANGEROUS_URL_PATTERNS = [
  "api-inference.huggingface.co",
  "huggingface.co/api",
  "localhost:",
  "127.0.0.1",
  "file://",
];

function checkDangerousStrings(file, content) {
  for (const pattern of DANGEROUS_URL_PATTERNS) {
    if (content.includes(pattern)) {
      report("WARNING", file, "dangerous-url-mention", `本文または生成物に "${pattern}" への言及があります`);
    }
  }
  if (/Bearer\s+[A-Za-z0-9._-]{10,}/.test(content) || /Authorization:\s*['"]/.test(content)) {
    report("ERROR", file, "possible-secret-exposure", "Authorization header/Bearerトークンらしき値が出力されています（値は表示しません）");
  }
  if (/HF_TOKEN|private_key|service-account/i.test(content)) {
    report("WARNING", file, "sensitive-keyword-mention", "secret関連キーワードへの言及があります（値は表示しません）");
  }
}

// ---------------------------------------------------------------------------
// sitemap 検証
// ---------------------------------------------------------------------------

function checkSitemap() {
  if (sitemapFiles.length === 0) {
    report("WARNING", DIST_DIR, "missing-sitemap", "sitemap.xml / sitemap-index.xmlが見つかりません");
    return;
  }

  const allLocs = [];
  for (const sf of sitemapFiles) {
    const content = readFileSync(sf, "utf8");

    // 最低限のXML整形式チェック（タグ数の対応）
    const openTags = (content.match(/<urlset|<sitemapindex/g) || []).length;
    const closeTags = (content.match(/<\/urlset>|<\/sitemapindex>/g) || []).length;
    if (openTags === 0 && closeTags === 0) {
      report("ERROR", sf, "unrecognized-sitemap-root", "urlset/sitemapindexルート要素が見つかりません");
      continue;
    }
    if (openTags !== closeTags) {
      report("ERROR", sf, "malformed-sitemap-xml", "開始/終了タグの対応が不正です");
      continue;
    }

    // sitemapindexの場合、参照先がdist内に存在するか確認
    if (/<sitemapindex/.test(content)) {
      const refLocs = extractAll(/<sitemap>\s*<loc>(.*?)<\/loc>/g, content).map((m) => m[1]);
      for (const refLoc of refLocs) {
        if (!refLoc.startsWith(SITE_ORIGIN)) {
          report("ERROR", sf, "sitemap-index-origin-mismatch", `sitemap-index内loc originが不一致: ${refLoc}`);
          continue;
        }
        const relPath = refLoc.slice(SITE_ORIGIN.length);
        const expectedFile = `${DIST_DIR}${relPath}`;
        if (!existsSync(expectedFile)) {
          report("ERROR", sf, "sitemap-index-target-missing", `参照先ファイルがdistに存在しません: ${expectedFile}`);
        }
      }
    }

    const locs = extractAll(/<url>\s*<loc>(.*?)<\/loc>/g, content).map((m) => m[1]);
    for (const loc of locs) allLocs.push({ loc, sitemap: sf });
  }

  const locCountsByFile = new Map();
  const seenLocs = new Set();
  const dupLocs = new Set();

  for (const { loc } of allLocs) {
    if (seenLocs.has(loc)) dupLocs.add(loc);
    seenLocs.add(loc);
  }

  for (const { loc, sitemap } of allLocs) {
    if (loc.trim() === "") {
      report("ERROR", sitemap, "empty-sitemap-loc", "urlset内locが空です");
      continue;
    }
    if (!loc.startsWith(SITE_ORIGIN)) {
      report("ERROR", sitemap, "sitemap-loc-origin-mismatch", `locの origin が正式originと不一致: ${loc}`);
      continue;
    }
    if (dupLocs.has(loc)) {
      report("ERROR", sitemap, "duplicate-sitemap-loc", `locが重複しています: ${loc}`);
    }

    const pathname = loc.slice(SITE_ORIGIN.length) || "/";
    const isAsset = /\.[a-zA-Z0-9]{2,5}$/.test(pathname) && !pathname.endsWith(".html") && !pathname.endsWith("/");

    if (isAsset) {
      report("WARNING", sitemap, "sitemap-asset-url", `asset URLがsitemapに含まれています: ${loc}`);
      continue;
    }

    if (noindexRoutes.has(pathname) || noindexRoutes.has(pathname.replace(/\/$/, ""))) {
      report("ERROR", sitemap, "noindex-url-in-sitemap", `noindexページがsitemapに含まれています: ${loc}`);
    }

    if (!routeExists(pathname)) {
      report("ERROR", sitemap, "sitemap-url-page-missing", `sitemap記載URLに対応するdist HTMLが存在しません: ${loc}`);
    }

    if (pathname === "/404" || pathname === "/404/") {
      report("ERROR", sitemap, "sitemap-includes-404", "404ページがsitemapに含まれています");
    }
  }

  // 非noindex・非特殊ページがsitemapに含まれているかの確認（一律必須にはしない。
  // 除外は理由付きで最小限に留める）。
  const sitemapPathSet = new Set(
    allLocs.map(({ loc }) => (loc.startsWith(SITE_ORIGIN) ? loc.slice(SITE_ORIGIN.length) || "/" : loc))
  );
  for (const route of publicRoutes) {
    const normalized = route === "" ? "/" : route;
    if (!sitemapPathSet.has(normalized)) {
      report("ERROR", DIST_DIR, "public-route-missing-from-sitemap", `公開ページがsitemapに含まれていません: ${normalized}`);
    }
  }

  // robots.txtとの整合（安全に確認できる範囲でWARNINGレベル）
  const robotsPath = `${DIST_DIR}/robots.txt`;
  if (existsSync(robotsPath)) {
    const robots = readFileSync(robotsPath, "utf8");
    const sitemapLine = robots.match(/Sitemap:\s*(\S+)/);
    if (!sitemapLine) {
      report("WARNING", robotsPath, "robots-missing-sitemap-directive", "robots.txtにSitemap行がありません");
    } else if (!sitemapFiles.some((sf) => sf.endsWith(sitemapLine[1].split("/").pop()))) {
      report("WARNING", robotsPath, "robots-sitemap-mismatch", `robots.txtのSitemap行が生成物と一致しません: ${sitemapLine[1]}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

for (const file of htmlFiles) {
  const content = readFileSync(file, "utf8");
  checkHtmlFile(file, content);
  checkDangerousStrings(file, content);
}

// 全ページ横断のtitle完全一致重複（意図的な例外があり得るためWARNING）
for (const [titleText, files] of titleRegistry.entries()) {
  if (files.length > 1) {
    for (const f of files) {
      report("WARNING", f, "duplicate-title-across-pages", `title完全一致重複(${files.length}件): "${titleText}"`);
    }
  }
}

checkSitemap();

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const errors = violations.filter((v) => v.level === "ERROR");
const warnings = violations.filter((v) => v.level === "WARNING");

for (const v of [...errors, ...warnings]) {
  console.log(`[${v.level}] ${v.file}`);
  console.log(`  rule: ${v.rule}`);
  if (v.note) console.log(`  note: ${v.note}`);
}

console.log("");
console.log(`HTML files checked: ${htmlFiles.length}`);
console.log(`Sitemap URLs checked: ${sitemapFiles.reduce((acc, sf) => acc + extractAll(/<url>\s*<loc>/g, readFileSync(sf, "utf8")).length, 0)}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

process.exit(errors.length > 0 ? 1 : 0);
