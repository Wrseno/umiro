# Tasks — 001 Orientasi & Navigasi

> Pelaksanaan unit shell + Landing. Implementasi SUDAH LIVE — task di
> bawah dicatat sebagai bukti, bukan rencana.

**Lifecycle:** IMPLEMENTING
**Health:** REVIEW_REQUIRED
**Traces to:** `design.md`, `spec.md` (unit ini)
**Reviewed against:** spec revision 6, design DRAFT

- [x] T001 AppShell: skip-link, IslandNav sticky, main#konten, footer (`src/components/AppShell.tsx`)
- [x] T002 Status aktif eksak + menu mobile Escape/scroll-lock/matchMedia
- [x] T003 Copy Landing terpusat `src/content/` (tanpa literal di page)
- [x] T004 Landing sections: hero, proof, sorotan, sinyal, penyebab, arah, CTA
- [x] T005 Halaman pendukung `/privasi`, `/syarat` (luar lima MVP)
- [x] T006 Verifikasi AC lama manual mobile/desktop (basis sebelum amandemen)
- [x] T007 Lint + typecheck bersih
- [x] T008 Menu 3 statis + `DiagnosisCta`: `NAV.links` = Beranda/Kalkulator/Roadmap; Survei/Diagnosis pindah ke button pojok `DiagnosisCta` dinamis (AC-07-01/02/06, usulan)
- [x] T009 `DiagnosisCta` + CTA Landing (`DiagnosisLink`) dinamis ikut status `localStorage` via `src/lib/diagnosis-status.ts` (FR-007)
- [ ] T010 Copy data-hilang di Landing/footer/privasi/syarat tetap `localStorage`-wording PRD (AC-01-03)
- [ ] T011 Verifikasi ulang AC-01, AC-07-01–07 mobile/desktop
- [x] T013 Refactor dictionary (ADR-001): `src/content/*.ts` + hapus `src/lib/landingSurveyContent.ts`; AppShell/halaman/metadata impor `@/content`; layered-lite (ADR-002)
- [x] T014 Perbaikan audit 2026-10-05: hydration mismatch `DiagnosisCta` → `useSyncExternalStore` + event tab-sama; literal UI tersisa (AppShell aria/heading footer, label pendek CTA) → `NAV`; `<a>` → `Link`; OG image dibuat `src/app/opengraph-image.tsx` (hapus picsum); aset SVG bawaan dihapus; unit test `src/lib/diagnosis-status.test.ts` (`npm test`)

> Catatan: nomor T012 tidak terpakai (lompat dari draf lama).
