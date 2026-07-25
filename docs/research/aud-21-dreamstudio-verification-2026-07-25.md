# AUD-21 DreamStudio japaneseUi表記不一致検証記録（HOLD）

- **確認日**: 2026-07-25
- **対象ツール**: DreamStudio（Brand Studio）
- **対象ファイル**: 監査記載は`src/components/Free.astro`(86)だが、実際の該当箇所は`src/components/Japanese.astro`(86)

## 監査指摘
DB（`src/content/tools/dreamstudio.md:9`）で`japaneseUi: false`（非対応確定）だが、`Free.astro`のみ`'unknown'`扱いで、他ファイルは「非対応」で統一されているとの指摘。

## ファイル対応関係の確認
監査報告書記載の`src/components/Free.astro`(86)を確認したところ、同ファイルにはDreamStudioのjapaneseUi相当のフィールド自体が存在しなかった（`DEFAULT_TOOLS`配列にname/slug/initial/freePlanのみでja/japaneseUi関連フィールドなし）。全文検索の結果、該当する記述は`src/components/Japanese.astro:86`に存在することを確認：
```
{ name:'Brand Studio（旧DreamStudio）', slug:'dreamstudio', initial:'D', ja:'unknown', ui:'×', prompt:'○', ... }
```
監査報告書のファイル名指摘に誤りがあるが、内容（DreamStudioのja値が'unknown'）自体は一致するため、この実ファイルを対象として調査を継続した。

## DB値
`japaneseUi: false`

## ページ値（現状）
`src/components/Japanese.astro`の`ja`フィールドは型定義上`'ok' | 'partial' | 'unknown'`の3値のみで、**「非対応（false）」を表す状態が構造的に存在しない**（`JaStatus`型定義、`STATUS`マップともに'no'相当のキーなし）。

## 構造調査
同ファイル内の全29行中、DBで`japaneseUi: false`（非対応確定）のツールも含め、非対応系ツールは軒並り`ja:'unknown'`として表示されている（例: Haiper、Leonardo AI、Kling AI、Luma AI、NightCafe、Midjourney、Pika、InVideo AI、Runway、Stable Diffusion、Tensor.Artなど多数）。これはDreamStudio固有の誤りではなく、コンポーネント設計上「非対応」を表現する手段がないための**サイト全体の構造的制約**であることを確認した。

## 一次情報
不要（構造調査のみ、DB値自体の正誤は既に確定済み）。

## 採用した値
今回は変更しない。

## 修正内容
なし。

## 判断できなかった項目
DreamStudio単体に`ja:'no'`相当の値を設定するには、`JaStatus`型・`STATUS`マップに新規状態を追加する必要があるが、これは他の非対応確定ツール（Playground AI、Vidu AI等）にも同様に波及する変更であり、実質的に「29ツール全件のja値棚卸し＋型定義変更」に相当する。

## HOLDまたはNO_CHANGE理由
**HOLD**。今回のバッチルールで禁止されている「全29ツールのスキーマ変更」に相当する規模の変更が必要なため、DreamStudio単体の安全な最小修正が不可能と判断。DreamStudioだけ`ja:'no'`を追加してSTATUSマップに'no'キーがない状態にすると`STATUS[t.ja]`が`undefined`になりビルド時またはランタイムでの表示崩れリスクがある。

## 構造上の課題
`Japanese.astro`の`JaStatus`型（'ok'|'partial'|'unknown'）は、DBの`japaneseUi`型（`boolean | 'partial' | 'unknown'`）の`false`を表現できない設計上の欠落。次回バッチ以降で、型に'no'状態を追加し29ツール全件の`ja`値を再棚卸しする専用タスクとして扱うことを推奨する。
