// 動画生成AI13ツールの「無料生成」「無料ダウンロード」実機・公式確認結果の正本データ。
// generatedVideos.ts（独自動画メタデータ）・src/content/tools/*.md（freePlanNote等）・
// docs/tasks/completed/配下の実機確認taskを根拠とする。推測で値を補完していない項目は
// 'not-confirmed' | 'unknown' としている。

export type VideoFreePlanType =
  | 'ongoing-free-plan'
  | 'free-trial'
  | 'limited-free-access'
  | 'paid-only'
  | 'service-unavailable'
  | 'unknown';

export type HandsOnStatus =
  | 'confirmed'
  | 'not-confirmed'
  | 'failed'
  | 'not-applicable'
  | 'unknown';

export interface VideoFreeDownloadStatus {
  sourceToolSlug: string;
  planType: VideoFreePlanType;
  freeGeneration: HandsOnStatus;
  freeDownload: HandsOnStatus;
  cardRequired: 'yes' | 'no' | 'unknown';
  watermark: string;
  verifiedAt: string | null;
  evidenceType:
    | 'user-hands-on'
    | 'official'
    | 'repository-record'
    | 'mixed'
    | 'unknown';
  evidenceNote: string;
  limitationNote: string;
  generatedVideoExists: boolean;
  detailUrl: string;
}

export const videoFreeDownloadStatus: VideoFreeDownloadStatus[] = [
  {
    sourceToolSlug: 'kling-ai',
    planType: 'limited-free-access',
    freeGeneration: 'confirmed',
    freeDownload: 'not-confirmed',
    cardRequired: 'unknown',
    watermark: 'あり（「KlingAI 3.0」透かし、無料プランでの生成時に確認）',
    verifiedAt: '2026-06-24',
    evidenceType: 'repository-record',
    evidenceNote: 'generatedVideos.tsのusageNote「無料プランで生成したため透かし（KlingAI 3.0）が含まれています」で無料生成を確認。ダウンロード動作自体が無料であったかは別途明記されていない。',
    limitationNote: '1日66クレジット程度（翌日繰越なし）・透かしあり・商用利用不可（src/content/tools/kling-ai.md freePlanNote、公式確認2026-06-21）。',
    generatedVideoExists: true,
    detailUrl: '/tools/kling-ai/',
  },
  {
    sourceToolSlug: 'pika',
    planType: 'limited-free-access',
    freeGeneration: 'not-confirmed',
    freeDownload: 'not-confirmed',
    cardRequired: 'unknown',
    watermark: '目視確認では透かし不明瞭（最終確認は公式情報が必要、generatedVideos.ts usageNoteより）',
    verifiedAt: '2026-06-24',
    evidenceType: 'repository-record',
    evidenceNote: 'generatedVideos.tsのusageNoteには「管理者が生成した」との記載のみで、無料プランでの生成・ダウンロードであることの明記がない。',
    limitationNote: '毎月80クレジット付与・480p・透かしあり・商用利用不可（src/content/tools/pika.md freePlanNote、公式確認2026-07-24）。',
    generatedVideoExists: true,
    detailUrl: '/tools/pika/',
  },
  {
    sourceToolSlug: 'runway',
    planType: 'free-trial',
    freeGeneration: 'not-confirmed',
    freeDownload: 'not-confirmed',
    cardRequired: 'unknown',
    watermark: '要確認（generatedVideos.ts usageNoteに透かしの記載なし）',
    verifiedAt: '2026-06-15',
    evidenceType: 'repository-record',
    evidenceNote: 'generatedVideos.tsのusageNoteには「管理者が生成した」との記載のみで、無料プランでの生成・ダウンロードであることの明記がない。無料枠が初回125クレジットのみで更新されないため、恒常的な無料プランというよりFree Trialに近い性質と判断した。',
    limitationNote: '125クレジット（初回のみ・更新なし）（src/content/tools/runway.md freePlanNote、公式確認2026-07-11）。',
    generatedVideoExists: true,
    detailUrl: '/tools/runway/',
  },
  {
    sourceToolSlug: 'luma-ai',
    planType: 'ongoing-free-plan',
    freeGeneration: 'not-confirmed',
    freeDownload: 'not-confirmed',
    cardRequired: 'unknown',
    watermark: 'あり（動画左上にLuma AIロゴ透かし、generatedVideos.ts usageNoteで観測）',
    verifiedAt: '2026-06-24',
    evidenceType: 'repository-record',
    evidenceNote: 'generatedVideos.tsのusageNoteには「管理者が生成した」との記載のみで、無料プランでの生成・ダウンロードであることの明記がない。',
    limitationNote: '月次のlimited credits・非商用利用限定・透かしあり（src/content/tools/luma-ai.md freePlanNote、公式確認2026-06-15）。',
    generatedVideoExists: true,
    detailUrl: '/tools/luma-ai/',
  },
  {
    sourceToolSlug: 'pixverse',
    planType: 'limited-free-access',
    freeGeneration: 'confirmed',
    freeDownload: 'confirmed',
    cardRequired: 'unknown',
    watermark: 'あり（右上に「PixVerse.ai」、generatedVideos.ts usageNoteで確認）',
    verifiedAt: '2026-07-26',
    evidenceType: 'user-hands-on',
    evidenceNote: 'docs/tasks/completed/2026-07-26-add-pixverse-generated-video.md・docs/tasks/LATEST.mdより、ユーザーがPixVerse V6（Image/Textモード・360P）で実機生成しWindowsダウンロードフォルダへ保存したことを確認済み。',
    limitationNote: '初回サインアップ時90クレジット・毎日60クレジット補充（当日未使用分は翌日失効）・透かしあり（src/content/tools/pixverse.md freePlanNote、needsReview: yes、公式確認2026-06-17）。',
    generatedVideoExists: true,
    detailUrl: '/tools/pixverse/',
  },
  {
    sourceToolSlug: 'capcut-ai',
    planType: 'ongoing-free-plan',
    freeGeneration: 'confirmed',
    freeDownload: 'confirmed',
    cardRequired: 'unknown',
    watermark: 'あり（左上に「Ai」表示、CapCut固有透かしと断定はできない。generatedVideos.ts usageNoteより）',
    verifiedAt: '2026-07-27',
    evidenceType: 'user-hands-on',
    evidenceNote: 'generatedVideos.tsのusageNote「ユーザーの実機操作でCapCut AIで生成したことを確認したうえで管理者が登録」「無料で生成・ダウンロードできました」より確認。',
    limitationNote: 'AI機能・素材・テンプレート・書き出し条件・料金は地域やプラットフォームにより異なる（src/content/tools/capcut-ai.md freePlanNote、公式確認2026-06-15）。',
    generatedVideoExists: true,
    detailUrl: '/tools/capcut-ai/',
  },
  {
    sourceToolSlug: 'hailuo-ai',
    planType: 'limited-free-access',
    freeGeneration: 'confirmed',
    freeDownload: 'confirmed',
    cardRequired: 'unknown',
    watermark: 'あり（右下に「MINIMAX | Hailuo AI」表示、generatedVideos.ts usageNoteより）',
    verifiedAt: '2026-07-27',
    evidenceType: 'user-hands-on',
    evidenceNote: 'generatedVideos.tsのusageNote「ユーザーの実機操作でHailuo AIで生成したことを確認したうえで管理者が登録」「無料で生成・ダウンロードできました」より確認。',
    limitationNote: '無料枠あり（透かしあり・生成回数制限あり）（src/content/tools/hailuo-ai.md freePlanNote、公式確認2026-06-21）。',
    generatedVideoExists: true,
    detailUrl: '/tools/hailuo-ai/',
  },
  {
    sourceToolSlug: 'vidu-ai',
    planType: 'limited-free-access',
    freeGeneration: 'confirmed',
    freeDownload: 'confirmed',
    cardRequired: 'unknown',
    watermark: 'あり（右下にVidu AI透かし、generatedVideos.ts usageNoteより）',
    verifiedAt: '2026-07-28',
    evidenceType: 'user-hands-on',
    evidenceNote: 'generatedVideos.tsのusageNote「ユーザーの実機操作でVidu AIで生成・ダウンロードしたことを確認したうえで管理者が登録」より確認。無料クレジットが初回限定か継続付与かは未確認（generatedVideos.ts usageNoteに明記）。',
    limitationNote: '無料枠あり（制限あり）（src/content/tools/vidu-ai.md freePlanNote、needsReview: true、公式確認2026-06-21）。',
    generatedVideoExists: true,
    detailUrl: '/tools/vidu-ai/',
  },
  {
    sourceToolSlug: 'd-id',
    planType: 'free-trial',
    freeGeneration: 'confirmed',
    freeDownload: 'confirmed',
    cardRequired: 'unknown',
    watermark: '全画面に「D-iD」透かし（generatedVideos.ts usageNoteより）',
    verifiedAt: '2026-07-28',
    evidenceType: 'user-hands-on',
    evidenceNote: 'generatedVideos.tsのusageNote「ユーザーの実機操作でD-IDのFree Trialで生成・ダウンロードしたことを確認」より確認。恒常的な無料プランではない旨も明記されている。',
    limitationNote: 'Trial／Liteには透かし、Liteは非商用限定、15秒単位課金・月次更新（src/content/tools/d-id.md freePlanNote、公式確認2026-07-05）。上位プランの透かし有無・出力条件は要確認。',
    generatedVideoExists: true,
    detailUrl: '/tools/d-id/',
  },
  {
    sourceToolSlug: 'heygen',
    planType: 'ongoing-free-plan',
    freeGeneration: 'confirmed',
    freeDownload: 'failed',
    cardRequired: 'no',
    watermark: 'あり（無料プランは付与、Creator以上で削除機能あり）',
    verifiedAt: '2026-07-27',
    evidenceType: 'user-hands-on',
    evidenceNote: 'docs/tasks/completed/2026-07-27-clarify-heygen-free-download-limitation.mdより、ユーザーの実機確認で無料プランでの動画作成は可能だが、作成した動画ファイルを無料でダウンロードできなかったことを確認済み（src/content/tools/heygen.md freePlanNoteにも反映済み）。',
    limitationNote: '動画最大1分・クレジットカード不要・透かし付き。商用利用・販売・再配布・マネタイズには制限あり（src/content/tools/heygen.md freePlanNote、公式確認2026-07-05）。',
    generatedVideoExists: false,
    detailUrl: '/tools/heygen/',
  },
  {
    sourceToolSlug: 'synthesia',
    planType: 'ongoing-free-plan',
    freeGeneration: 'confirmed',
    freeDownload: 'failed',
    cardRequired: 'no',
    watermark: 'あり（Basicは付与、Starter以上で削除機能あり）',
    verifiedAt: '2026-07-26',
    evidenceType: 'official',
    evidenceNote: 'docs/tasks/completed/2026-07-26-verify-synthesia-free-download.mdより、Synthesia公式pricingページ（WebFetchで確認）の機能比較表で「MP4 Downloads」「Remove Synthesia logo」がいずれもStarterプラン以上限定と明記されていることを確認済み（docs/research/synthesia-free-download-verification-2026-07-26.md）。',
    limitationNote: 'Basic（無料）プランはクレジットカード不要で試用可能、月10分までの制限（src/content/tools/synthesia.md freePlanNote、公式確認2026-07-05）。',
    generatedVideoExists: false,
    detailUrl: '/tools/synthesia/',
  },
  {
    sourceToolSlug: 'invideo-ai',
    planType: 'ongoing-free-plan',
    freeGeneration: 'not-confirmed',
    freeDownload: 'not-confirmed',
    cardRequired: 'unknown',
    watermark: 'あり（要確認、エクスポート制限ありとされる。src/content/tools/invideo-ai.md freePlanNoteより）',
    verifiedAt: null,
    evidenceType: 'unknown',
    evidenceNote: '本タスクの背景でユーザーから「実機では動画生成まで完了できなかった」との申告があったが、これを裏付けるdocs/tasks/completed/配下の実機確認taskは現時点で存在しない。src/content/tools/invideo-ai.mdのfreePlanNoteは「無料プランあり（透かしあり・エクスポート制限あり）」という一般的な記載のみで、生成失敗の記録はない。推測で確定させず、not-confirmed（要検証）として記録した。正式な実機確認taskの作成を推奨する。',
    limitationNote: '無料プランあり（透かしあり・エクスポート制限あり）（src/content/tools/invideo-ai.md freePlanNote、公式確認2026-06-15）。',
    generatedVideoExists: false,
    detailUrl: '/tools/invideo-ai/',
  },
  {
    sourceToolSlug: 'haiper',
    planType: 'service-unavailable',
    freeGeneration: 'not-applicable',
    freeDownload: 'not-applicable',
    cardRequired: 'unknown',
    watermark: 'unknown（サービス変更のため確認不能）',
    verifiedAt: '2026-06-15',
    evidenceType: 'repository-record',
    evidenceNote: 'src/content/tools/haiper.mdのfreePlanNote「コンシューマー向けWebアプリは2025年2月にシャットダウンされています。現在、無料プランが提供されているかは不明です。」に基づく。freePlan: false, commercialUse: "unknown", watermark: "unknown"。',
    limitationNote: 'コンシューマー向けWebアプリが2025年2月にシャットダウンされており、一般利用者向けの無料生成・ダウンロード自体が対象外（src/content/tools/haiper.md freePlanNote、公式確認2026-06-15）。',
    generatedVideoExists: false,
    detailUrl: '/tools/haiper/',
  },
];
