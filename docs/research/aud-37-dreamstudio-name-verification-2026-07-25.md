# AUD-37 DreamStudio 名称表記ゆれ検証記録（NO_CHANGE）

- **確認日**: 2026-07-25
- **対象ツール**: DreamStudio（Brand Studio）
- **対象項目**: name表記
- **監査指摘**: DB正本`name: "Brand Studio（旧DreamStudio）"`に対し、`src/components/Free.astro`(172), `JapaneseAiToolsGuide.astro`(122), `WatermarkCreditGuide.astro`(122), `src/pages/categories/image-generation/index.astro`(129)の4ファイルで単に"DreamStudio"と表記されている、との指摘。

## DB値
`name: "Brand Studio（旧DreamStudio）"`

## 表示値（現状確認）
監査が引用する4ファイルを確認したところ、現状は以下の通りだった。
- `src/components/JapaneseAiToolsGuide.astro:122`: `name: 'Brand Studio（旧DreamStudio）'` — **既に修正済み**
- `src/components/WatermarkCreditGuide.astro:122,172`: `name: 'Brand Studio（旧DreamStudio）'` — **既に修正済み**
- `src/pages/categories/image-generation/index.astro:129`: `name: 'Brand Studio（旧DreamStudio）'` — **既に修正済み**
- `src/components/Free.astro`: DreamStudio/dreamstudioへの言及が一切存在しない（AUD-21調査時にも同じ状況を確認済み。監査報告書の引用行番号172は現在のファイル内容と対応しない）

追加で全文検索した結果、`src/pages/categories/image-generation/index.astro:949`のサイドバーリンクリストのみ、プレーンテキストで「DreamStudio」という短縮名が使われていることを発見した。ただし、このリストは同じ`<li>`内で他の全ツール（Gemini画像生成、NightCafe、Playground AI、Clipdrop、Tensor.Art等）も同様に短い一般名で統一されており、これ自体は「フルネーム省略」ではなく「サイドバー用の簡潔な表示規約」として意図的に運用されていると判断した。

## 不一致分類
表記ゆれ（ただし監査引用の4ファイルは既に3/4が修正済み、残り1ファイルは該当箇所が存在しない）。

## 一次情報
不要。

## 採用した値
変更なし。

## 修正内容
なし。

## 修正しなかった内容
`src/pages/categories/image-generation/index.astro:949`のサイドバーリンクは、他ツールと統一された短縮名表記であり、これを"Brand Studio（旧DreamStudio）"というフルネームに変更すると、同一リスト内で唯一長い表記になり視覚的な不統一が新たに生じるため変更していない。

## 判断できなかった項目
`Free.astro`に監査が引用する「172行目」相当の記述が現在存在しない理由（過去のリファクタリングで削除された可能性があるが、コミット履歴の特定までは今回実施していない）。

## HOLDまたはNO_CHANGE理由
**NO_CHANGE**。監査報告書が引用する4ファイルのうち3ファイルは既に前回バッチ以前（AUD-01/37対応時と推測）で修正済みであることを確認した。残り1ファイル（Free.astro）は該当の記述が現在存在しない。新たに見つかった短縮表記（サイドバーリンク）は同一リスト内の他ツールとの表記統一を優先し、変更を見送った。

## 構造上の課題
監査報告書は2026-07-24時点のスナップショットであり、その後の別バッチ（AUD-01対応等）で既に解消済みの指摘が本バッチの対象として再度上がってくることがある。今後の監査バッチでは、着手前に「現状ファイルが指摘内容と一致するか」の確認を必須にすることが望ましい。

## 他AUDとの関係
AUD-21研究記録で確認したFree.astroの状況（DreamStudio言及なし）と一致する。
