---
task_id: "2026-11-06-guide-rights-pricing-consistency"
created_at: "2026-11-06"
status: COMPLETED
risk: MEDIUM
current_phase: editorial-accuracy
production_required: false
db_change: false
ui_change: true
official_verification_required: true
goal: "既存ガイドのPika無料商用/透かし、DALL·E GPT終了、Luma App/API、Canva日本向け料金・利用枠、Haiper提供状況の矛盾を正本と一次資料に合わせて修正する"
non_goals:
  - 全38ツールの料金・規約を再更新すること
  - 生成サンプルや外部アカウント・アフィリエイトURLを作成・変更すること
  - 収益・広告・計測・DNS・CI・スキーマを変更すること
target_files:
  - docs/tasks/active/2026-11-06-guide-rights-pricing-consistency.md
  - docs/tasks/active/2026-11-07-fotor-search-intent.md
  - docs/tasks/completed/2026-11-07-fotor-search-intent.md
  - docs/tasks/LATEST.md
  - src/content/guides/commercial-use-cost-comparison.md
  - src/pages/guides/commercial-use-cost-comparison/index.astro
  - src/content/guides/free-ai-image-tools.md
  - src/components/FreeAiImageTools.astro
  - src/content/guides/video-generation-credit-cost-comparison.md
  - src/pages/guides/video-generation-credit-cost-comparison/index.astro
reference_files:
  - AGENTS.md
  - CLAUDE.md
  - docs/tasks/LATEST.md
  - docs/tasks/TEMPLATE.md
  - src/content/tools/pika.md
  - src/content/tools/luma-ai.md
  - src/content/tools/dalle.md
  - src/content/tools/canva-ai-image-generator.md
  - src/content/tools/haiper.md
  - docs/audits/existing-tools-jp-official-audit-2026-11-06.md
unknowns:
  - Luma AppとAPIの現行ライセンス・料金の分離がサービス更新で変わる可能性
  - Canva画像生成モデル別の実際のAI利用枠はアカウントごとに異なる
preexisting_untracked_files: []
required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - git diff --check
  - npm run validate:scope
acceptance_criteria:
  - Pika無料Basicの商用利用・無透かし案内が比較表・説明・FAQで整合する
  - DALL·E GPTと現在のChatGPT画像をサービス終了日を含め区別する
  - Luma AppとAPIの料金・無料試用・商用利用・透かしを混同しない
  - Canva日本向けWeb年額とApp Store月額を区別し画像生成固有の上限を捏造しない
  - Markdown正本とAstroコンポーネントの両方を同期する
  - GitHubビルド・公開HTML検証の結果を残す
  - 動画比較ガイドの終了済みHaiper、旧Luma料金とPika条件も整合させる
forbidden_operations:
  - PRODUCTION_DEPLOY
---

# Why these two guides require a scoped correction

Source-of-truth drift confirmed after production PR #62. The legacy guide tables and FAQs still contradict canonical tool entries. Source evidence as of 2026-11-06:

- [Pika official pricing](https://pika.art/pricing): Basic Free 80 monthly video credits, Commercial use, no-watermark download.
- [OpenAI release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes): official DALL·E GPT retired 2026-08-30, current image generation is [ChatGPT Images](https://help.openai.com/en/articles/11084440-images-in-chatgpt).
- [Luma license explanation](https://lumalabs.ai/learning-hub/licensing) and canonical `src/content/tools/luma-ai.md`: do not map historical Dream Machine Plus $30 to current Luma App/Trial or conflate API commercial terms with App.
- [Canva Japanese pricing](https://www.canva.com/ja_jp/pricing/): Web Pro JPY 11,800/year, Free up to 20 simple AI uses; per-model usage cost differs. App Store JPY 1,180/month is separate billing channel.

Use primary-source-supported statements only. Do not change existing affiliate URLs, generated examples, permissions, tracking, or deployment. CI is evidence for build/data/publish, not for the unavailable local validate:task/validate:scope checks. Leave this task open on the branch for Claude Code to run missing checks if needed.


## 2026-11-07 latest-master transfer
- Original Draft PR #65 branch was 21 commits behind master, but all six proposed guide-content target files are byte-identical on master to its PR base commit; transfer only those six blobs, not the old active task or unrelated history.
- Fotor's separate task is moved to completed in this same scoped PR because its merged PR #78/#79 and live QA evidence are sufficient for that editorial phase; remaining GSC analysis stays under #71.
- Claims spot-checked against primary pages: https://pika.art/pricing , https://help.openai.com/ja-jp/articles/6825453-chatgpt-release-notes , https://www.canva.com/ja_jp/pricing/ , https://lumalabs.ai/learning-hub/licensing . No new app login or billing evidence.
- Deploy and link activation are separately gated; all current affiliate/GA4/Clarity/DB files are unchanged.


## 2026-11-07 Pika conflict correction (review gate)
- `https://pika.art/pricing` can return legacy Basic/Standard (80/700 credits and Basic commercial allowed) whereas newer price compare `https://pika.art/pricing?interval=month` describes Free 0 monthly credits (packs only), Free commercial-license NO, Starter 900/month, Creator/Fancy commercial YES. Current `https://pika.art/support` describes Starter commercial YES while the newer pricing matrix says NO: **unresolved official conflict**. Avoid recommending Starter for commercial work without account terms.
- Modified the comparison guide Markdown and both relevant Astro source pages to avoid claiming Free commercial use or old monthly allowances as current. Limited to authorized guide files. Source-of-truth `src/content/tools/pika.md` has not been updated by this scoped task; reconcile separately under #66, with exact target files and current evidence.
- Explicit prohibition: do not interpret a CI PASS as legal or pricing verification; verify public rendering after release and leave inconsistent vendor terms as HOLD.


## Completed on 2026-11-07
- PR #85 merged at df939b0b19fd4873216358826f653eb103fcd201. GitHub Build and Cloudflare Pages PR checks PASS; guides updated for Pika source conflicts. Site-wide final production release SHA must still be checked independently.
- Pika dedicated tool and Runway comparison content were excluded from guide task and are now being corrected under separate task.
