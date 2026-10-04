# ADR-001 — Dictionary-based UI copy di `src/content/`

**Status:** Accepted
**Tanggal:** 2026-10-04
**Konteks:** Teks UI tersebar: satu modul campur `src/lib/landingSurveyContent.ts`
(Landing + nav) + ~40 string literal di 8 file (AppShell, ComingSoon,
Landing sections, privasi/syarat, 404, layout metadata). Ubah satu kalimat
butuh buru 3+ file; risiko inkonsistensi wording disclaimers.
**Keputusan:** Semua teks UI tinggal di `src/content/` sebagai nested-namespace
dictionaries data-murni (`as const`, NOL impor): `nav.ts`, `landing.ts`,
`shared.ts`, `site.ts`, `privasi.ts`, `syarat.ts`, `notfound.ts`,
`placeholders.ts` + barrel `index.ts`. Komponen/halaman merujuk, tidak
menaruh literal. Impor selalu dari `@/content`.
**Konsekuensi:** Ubah copy = edit satu file kamus. Biaya: tambah impor per
file (trivial). `placeholders.ts` dihapus per-entri saat unit 002–005
dibangun. Pola ini bukan i18n penuh — satu bahasa (id), tanpa routing lokal.
**Alternatif ditolak:** `next-intl` penuh — overkill untuk satu bahasa, tambah
dependency + provider + routing; pola nested-namespace diambil, runtime tidak.
