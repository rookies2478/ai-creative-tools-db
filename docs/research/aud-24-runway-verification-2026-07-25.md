# AUD-24 Runway japanesePrompt判定根拠検証記録（NO_CHANGE）

- **確認日**: 2026-07-25
- **対象ツール**: Runway
- **対象項目**: `japanesePrompt`（DB値"partial"の判定根拠）
- **対象ファイル**: `src/content/tools/runway.md`(12, 171) / `src/pages/tools/runway/index.astro`(134,219,247)

## 監査指摘
DB`japanesePrompt: "partial"`（`src/content/tools/runway.md:171`）に対し、ページ本文では「精度は公式情報で確認できていない」という弱い表現になっており、partialと判定した根拠が本文で明示されていない。

## DB値
`japanesePrompt: "partial"`（frontmatter, line 12）
FAQ本文（line 171）: "動画生成時の日本語プロンプトは受け付ける場合がありますが、精度については公式情報での明確な記載は確認できていません。"

## 表示値
- ツールページquickTable（L134）: 「△ 一部対応」＋「英語プロンプトの方が精度が高い傾向あり」
- commercialセクション（L219）: 「一部対応。英語プロンプトの方が精度が高い傾向があります」
- FAQ（L247）: 「日本語プロンプトは一部対応していますが、英語プロンプトの方が精度が高い傾向があります」

## 不一致分類
表記ゆれ／根拠不足の指摘（事実誤りではない）。「partial」の判定根拠自体は、frontmatterには専用のnoteフィールドがなく本文（FAQ・commercial文）に分散して記載されている。

## 確認した一次情報
新規の一次情報確認は不要と判断。既存のDB記述自体が「精度については公式情報での明確な記載は確認できていない」という保守的な表現であり、この保守性自体が意図的な断定回避（他の一次情報未確認事項と同様の書き方）と判断。

## 採用した値
変更なし。

## 修正内容
なし。

## 判断できなかった項目
`japanesePromptNote`のような専用フィールドをfrontmatterに追加すれば根拠を一元化できるが、これは`src/content/config.ts`のzodスキーマ変更に相当するため、今回のバッチでは見送った。

## HOLDまたはNO_CHANGE理由
**NO_CHANGE**。監査が指摘する「判定根拠の明示」は、既にツールページのquickTable・commercialセクション・FAQの3箇所で「英語プロンプトの方が精度が高い傾向がある」という具体的な根拠が説明されており、実質的に根拠は既に開示されている。監査が求める「noteへの根拠追記」を実現する専用フィールドを新設するとconfig.tsのスキーマ変更になり、今回のバッチルールで禁止されている大規模スキーマ変更に該当するリスクがあるため、現状維持とした。

## 構造上の課題
`japaneseUi`/`japanesePrompt`のtri-state（true/'partial'/'unknown'）に対応する専用の根拠note型フィールドがなく、判定根拠は本文中に分散する設計になっている。AUD-44（config.tsのpartial定義コメント不足）と同根の課題であり、将来的なスキーマ拡張の候補として記録する。
