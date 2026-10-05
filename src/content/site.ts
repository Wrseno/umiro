/**
 * Kamus metadata situs — satu-satunya sumber judul/deskripsi global.
 *
 * Aturan: file ini data murni — NOL impor. `src/app/layout.tsx`
 * hanya merujuk, tidak menaruh literal.
 */

export const SITE = {
  title: "UMIRO | Diagnosis Indikatif Usaha Mikro",
  description:
    "Jawab beberapa pertanyaan singkat, lalu ketahui satu area pemeriksaan yang paling menahan pertumbuhan usaha Anda.",
  locale: "id_ID",
  ogHeadline: "Temukan satu hambatan yang paling menahan usaha Anda.",
  ogImageAlt:
    "Kartu UMIRO: temukan satu hambatan yang paling menahan usaha Anda.",
} as const;
