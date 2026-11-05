---
task_id: "2026-11-05-tensorart-current-official"
created_at: "2026-11-05"
status: COMPLETED
risk: MEDIUM
current_phase: search-traffic-launch
production_required: true
db_change: true
ui_change: false
official_verification_required: true

goal: "Growth Loop READYかつfreshness overdueのTensor.Artを、現行公式Terms・Pro Membership・daily credits情報へ同期する。期間限定割引を恒常価格扱いしない。"

target_files:
  - docs/tasks/active/2026-11-05-tensorart-current-official.md
  - docs/tasks/completed/2026-11-05-tensorart-current-official.md
  - src/content/tools/tensor-art.md
  - src/pages/tools/tensor-art/index.astro

reference_files:
  - docs/decisions/pricing-status-classification-policy.md

unknowns:
  - "Yearly Proの$59.9は公式ページ上でspecial offer表記のため恒常価格として掲載しない"
  - "purchase/vipの現在のcheckout価格はこの環境から安定抽出できないため、pricingStatusはpartialを維持"
  - "日本語UI・透かし条件は公式情報だけでは断定しない"

required_checks:
  - npm run validate:task
  - npm run build
  - npm run validate:data
  - npm run validate:publish
  - npm run validate:affiliate-links
  - npm run validate:scope
  - git diff --check

acceptance_criteria:
  - "official Termsの商用利用・モデル依存条件を現行確認日へ更新"
  - "daily credits top-up 50の現行公式案内を反映"
  - "Daily Pass $1 / Monthly Pro $9.9 / Quarterly Pro $19.9を公式ページ根拠付きで反映"
  - "Yearly special $59.9を恒常価格として表示しない"
  - "Pro Model / Pro AI Toolは商用利用可能モデルを要件とすることを補足"

forbidden_operations:
  - MODIFY_AFFILIATE_LINKS
  - MODIFY_GLOBAL_ANALYTICS
  - MODIFY_SCHEMA
  - MODIFY_COMPARISON_LOGIC
---

# Verified official sources — 2026-11-05

- https://tensor.art/about/terms-of-service-new
- https://tensor.art/event/proupdate
- https://tensor.art/event/notice
- https://tensor.art/event/vipmodels-learn-more
- https://tensor.art/event/proaitool

# Notes

The official Pro Membership page includes a yearly special offer. Treat it as promotional/variable, not a stable current base price.

# Completion — 2026-11-05

- Tensor.Art canonical record and dedicated page were re-reviewed against current official Terms, Daily Credits, Pro Membership, Pro Model and Pro AI Tool pages.
- Daily Credits now reflects the official top-up-to-50 mechanism.
- Daily Pass $1, Monthly Pro $9.9 (+1k bonus credits), Quarterly Pro $19.9 (+5k bonus credits) were added from the official Pro Membership Adjustments page.
- Yearly $59.9 remains excluded from stable-price fields because the official page labels it a special offer.
- Commercial-use language was reverified: Tensor.Art does not claim ownership/copyright over generated images, but model/LoRA/AI Tool license eligibility remains asset-specific. Pro Model / Pro AI Tool commercial eligibility does not imply all assets are commercially usable.
- pricingStatus remains partial because checkout pricing/promotions are not fully stable or extractable.
- reviewed/verified dates updated to 2026-11-05; nextReviewDue 2027-02-05.
- PR CI: data validation PASS, CTA audit PASS, build PASS, published-output validation PASS.
- No affiliate, analytics, schema, URL, or comparison-logic changes.
- Production deployment and 93-route QA remain post-merge verification.
