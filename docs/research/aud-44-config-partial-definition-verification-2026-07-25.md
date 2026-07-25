# AUD-44 config.ts partial定義コメント不足検証記録

- **確認日**: 2026-07-25
- **対象ツール**: 全般（スキーマレベルの指摘）
- **対象項目**: `src/content/config.ts`(4) tri-state（japaneseUi/japanesePrompt等）の"partial"判定基準
- **監査指摘**: tri-state（boolean/'partial'/'unknown'）は型として明確だが、「partial」の判定基準がスキーマにコメントされておらず、担当者依存になり得る。

## DB値
`src/content/config.ts:4`: `const triStateSchema = z.union([z.boolean(), z.literal('partial'), z.literal('unknown')]);`（コメントなし）

## 表示値
該当なし。

## 不一致分類
根拠URL不足（正確には「判定基準のドキュメント不足」）。

## 一次情報
不要。

## 採用した値
tri-stateの4値それぞれの意味を明文化：
- `true` = 公式情報で完全対応が確認できる
- `'partial'` = 一部対応（例: UIの一部のみ日本語、英語の方が精度が高い等）が公式情報または挙動から確認できる
- `false` = 非対応であることが公式情報で確認できる
- `'unknown'` = 対応状況が公式情報から確認できていない

## 修正内容
`src/content/config.ts`の`triStateSchema`定義の直前に、上記4値の判定基準を説明する4行のコメントを追加した。**型定義（`z.union([...])`）自体は一切変更していない**（`z.boolean()`, `z.literal('partial')`, `z.literal('unknown')`のいずれも変更なし）。zodスキーマの実行時挙動・バリデーション結果に影響を与えない、純粋なコメント追加のみ。

## 修正しなかった内容
- `Japanese.astro`の`JaStatus`型（`'ok'|'partial'|'unknown'`）や`STATUS`マップにはコメントを追加していない。この型はconfig.tsの`triStateSchema`とは別のUIコンポーネント側の型であり、AUD-21で凍結対象となっているため、今回のバッチでは一切触れていない。
- `freePlanSchema`（`boolean|'limited'|'unknown'`）や`commercialUseSchema`（5値enum）など、他のスキーマにも同様のコメント不足があるが、AUD-44はtri-state（japaneseUi/japanesePrompt向け）に限定した指摘のため、他スキーマへのコメント追加は今回実施していない。

## 判断できなかった項目
なし。

## HOLDまたはNO_CHANGE理由
該当なし（FIXED）。AUD-21で凍結されている`Japanese.astro`のJaStatus型・STATUSマップには一切触れておらず、`config.ts`のzodスキーマの型定義自体も変更していない（コメント追加のみ）ため、AUD-21の構造課題への波及はないと判断した。

## 構造上の課題
今回のコメント追加はドキュメント整備のみであり、担当者が実際に「partial」の判定にこの基準を適用するかどうかは運用上のルール徹底に依存する。将来的には、この判定基準をコードコメントだけでなく開発者向けドキュメント（CONTRIBUTING.md等）にも転記することが望ましい。

## 他AUDとの関係
AUD-21（Japanese.astro JaStatus型構造課題）とは別のファイル・別の型に対する変更であり、AUD-21には影響しない。AUD-24（Runway japanesePrompt判定根拠不足）で指摘された「根拠の分散」問題とも関連するが、AUD-24はツール個別のnote不足、AUD-44はスキーマ全体の定義不足という違いがある。
