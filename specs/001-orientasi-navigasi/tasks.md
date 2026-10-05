# Tasks — 001 Orientasi & Navigasi

> Pelaksanaan unit shell + Landing. Implementasi SUDAH LIVE — task di
> bawah dicatat sebagai bukti, bukan rencana.

**Lifecycle:** IMPLEMENTING
**Health:** REVIEW_REQUIRED
**Traces to:** `design.md`, `spec.md` (unit ini)
**Reviewed against:** spec revision 5, design DRAFT

- [x] T001 AppShell: skip-link, IslandNav sticky, main#konten, footer (`src/components/AppShell.tsx`)
- [x] T002 Status aktif eksak + menu mobile Escape/scroll-lock/matchMedia
- [x] T003 Copy Landing terpusat `src/content/` (tanpa literal di page)
- [x] T004 Landing sections: hero, proof, sorotan, sinyal, penyebab, arah, CTA
- [x] T005 Halaman pendukung `/privasi`, `/syarat` (luar lima MVP)
- [x] T006 Verifikasi AC lama manual mobile/desktop (basis sebelum amandemen)
- [x] T007 Lint + typecheck bersih
- [ ] T008 Menu 3 statis + `DiagnosisCta`: hapus entri Survei/Diagnosis dari `NAV.links` → `NAV_STATIC` (Beranda/Kalkulator/Roadmap); Survei/Diagnosis pindah ke button pojok `IslandCta` dinamis (AC-07-01/02/06)
- [ ] T009 `IslandCta` + CTA Landing dinamis ikut status `localStorage` (FR-007)
- [ ] T010 Copy data-hilang di Landing/footer/privasi/syarat tetap `localStorage`-wording PRD (AC-01-03)
- [ ] T011 Verifikasi ulang AC-01, AC-07-01–07 mobile/desktop
- [x] T013 Refactor dictionary (ADR-001): `src/content/*.ts` + hapus `src/lib/`; AppShell/halaman/metadata impor `@/content`; layered-lite (ADR-002)
- [x] T014 Landing iterasi 2 susunan bebas: hero centered + proof strip, stats gold-rule, steps timeline vertikal, sinyal ghost-number, penyebab dark glass, arah bento + CTA inline, tools accent-bar, batas inline ✕, CTA narrow centered (`src/content/landing.ts`, `src/app/page.tsx`)
