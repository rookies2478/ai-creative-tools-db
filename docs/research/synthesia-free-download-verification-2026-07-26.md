# Synthesia Free Download Verification

- verification_date: 2026-07-26
- result: CONFIRMED_DOWNLOAD_NOT_ALLOWED
- checked_official_urls:
  - https://www.synthesia.io/pricing （取得成功、一次情報として採用）
  - https://www.synthesia.io/help （HTTP 404、取得不能。help centerは別URL体系の可能性があり、今回は未確認のまま記録）
- pricing_page_finding: 機能比較表で「Download your videos（MP4ダウンロード）」はStarterプラン（$29/mo）以上でのみチェックマークが付き、Basic（無料）プランには付与されていない。「Remove Synthesia logo（透かし除去）」もStarter以上限定と明記。
- help_page_finding: 取得不能のため確認できず（unresolved）
- free_creation: 可能（Basicプランで動画作成・AIアバター利用可、一次情報で確認済み）
- free_preview: プラットフォーム内での視聴は可能と読み取れる（明示的な「プレビューのみ」という文言はないが、ダウンロード不可の裏返しとして記載）
- free_download: 不可（一次情報の機能比較表で明示的に確認）
- watermark: あり（Synthesiaロゴ。除去はStarter以上）
- usage_limit: 月10分まで（"Usable for up to 10 minutes of video/month"、既存DB記載と一致）
- unresolved:
  - help centerでの補足記載は404のため未確認
  - 「月10分」が生成時間か書き出し時間かの区別は今回の一次情報では明言なし（既存表記を維持）
- final_wording: 「無料作成可／ダウンロード不可（月10分・透かしあり）」（既存表記を維持、変更なし）
- reason: pricing page本文の機能比較表が「MP4 Downloads」をBasicプランでは提供せずStarter以上に限定することを明示しており、既存UI表記（前タスクcommit f9aeff3）と一致する。前回の懸念（一次情報記録の欠落）を本タスクで解消。
