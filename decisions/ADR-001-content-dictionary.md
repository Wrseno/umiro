# ADR-001

**Title:** Dictionary-based UI copy di `src/content/`
**Status:** Accepted
**Date:** 2026-10-04

## Context

Teks UI tersebar: satu modul campur `src/lib/landingSurveyContent.ts`
(Landing + nav) + ~40 string literal di 8 file (AppShell, ComingSoon,
Landing sections, privasi/syarat, 404, layout metadata). Ubah satu kalimat
butuh buru 3+ file; risiko inkonsistensi wording disclaimers.

## Decision

Semua teks UI tinggal di `src/content/` sebagai nested-namespace
dictionaries data-murni (`as const`, NOL impor): `nav.ts`, `landing.ts`,
`shared.ts`, `site.ts`, `privasi.ts`, `syarat.ts`, `notfound.ts`,
`placeholders.ts` + barrel `index.ts`. Komponen/halaman merujuk, tidak
menaruh literal. Impor selalu dari `@/content`.

## Alternatives Considered

- `next-intl` penuh — ditolak: overkill untuk satu bahasa, tambah
  dependency + provider + routing; pola nested-namespace diambil, runtime
  tidak.

## Consequences

Ubah copy = edit satu file kamus. Biaya: tambah impor per file (trivial).
`placeholders.ts` dihapus per-entri saat unit 002–005 dibangun. Pola ini
bukan i18n penuh — satu bahasa (id), tanpa routing lokal.
