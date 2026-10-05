# Tasks — 004 Financial Calculator

> Pelaksanaan kalkulator mandiri. Status: US-05, US-09, US-10 versi PRD
> live di `/kalkulator`; bukti di `verification.md`. Unit ini OWNER US-10.

**Lifecycle:** IMPLEMENTING
**Health:** REVIEW_REQUIRED
**Traces to:** `design.md`, `spec.md` (unit ini)
**Reviewed against:** spec revision 6, design DRAFT

- [x] T001 Rute `/kalkulator` terpasang (placeholder `ComingSoon`)
- [x] T002 `src/lib/calculator.ts` murni + unit test 6 kasus Lampiran B (AC-05) — `src/lib/calculator.test.ts`
- [x] T003a `src/app/kalkulator/Calculator.tsx`: input H/V-atau-batch/Q/D/F/T, validasi per-field, hasil live, simpan + pulihkan isian valid terakhir `umiro.calc.v1` (`src/lib/calc-storage.ts`), payload rusak dibuang (AC-05-01–10)
- [ ] T003b Riwayat APPEND + daftar + hapus-per-entri (AC-05-11, usulan) — TERTAHAN pengesahan amandemen; naikkan kunci ke `umiro.calc.v2`
- [x] T004 Banding direct/platform: toggle + potongan % + penjelasan margin ≤0 (AC-09, Should)
- [x] T005 Glosarium HPP/margin/impas (`<details>`) + contoh dapat-tutup (AC-10)
- [ ] T006 Could bila kapasitas: skenario ≤3 (AC-12), ekspor/print + disclaimer + gate review privasi (AC-13)
- [ ] T007 Uji sebut-margin/impas ≥80% + uji input invalid tak ganti hasil lama + uji tumpuk 3 entri lalu hapus 1 (2 sisa utuh)
- [x] T008 `verification.md` bukti AC-05/09/10 (status IN PROGRESS sampai spec disetujui + T007)
