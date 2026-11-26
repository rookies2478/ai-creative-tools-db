# 週次 Growth Loop 運用手順（AIクリエイティブナビ）

正本: `rookies2478/movance-growth-loop`（共通Core）。サイト固有の制約は `docs/analytics/growth-loop.md`。
1. 前週末に GSC 遅延（約2日）を見込み、月曜以降に既存CLIで直近28日 vs 前28日を取得（同一期間の再取得はしない）。
2. page×query の匿名化率を確認し、欠損を0と解釈しない。GA4/Clarity は Core 未設定の間 NOT_EVALUATED。
3. 候補は標本数（imp・click）を明記し、小標本は断定しない。分類: REFRESH / MERGE検討 / HOLD / NEW。
4. 実装は `docs/tasks/active/` に単一タスク＋target_files を定義してから行い、`validate:task`→変更→`validate:scope` を通す。
5. 改善記録は `docs/analytics/seo-improvements-YYYY-MM-DD.md` に（問題・根拠・変更・測定法）。
6. 効果判定: 公開後14日で初回、28日で確定。imp 0 の場合はインデックス/需要を人手確認。
7. 生データ（`docs/analytics/**/raw/**`）・認証情報はコミット/アップロード禁止。
