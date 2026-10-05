# Tasks — 004 Financial Calculator

> Pelaksanaan kalkulator mandiri. Status: rute placeholder; rumus final
> (Lampiran B), siap implementasi tanpa gate. Unit ini OWNER US-10.

**Lifecycle:** DRAFT
**Health:** VALID
**Traces to:** `design.md`, `spec.md` (unit ini)
**Reviewed against:** spec revision 6, design DRAFT

- [x] T001 Rute `/kalkulator` terpasang (placeholder `ComingSoon`)
- [ ] T002 `src/lib/calculator.ts` murni + unit test 6 kasus Lampiran B (AC-05)
- [ ] T003 `CalculatorForm`: input H/V-atau-batch/Q/D/F/T, validasi per-field, hasil live, APPEND riwayat `localStorage` + daftar + hapus-per-entri langsung di `/kalkulator` (AC-05-09)
- [ ] T004 Banding direct/platform: toggle + potongan + penjelasan margin ≤0 (AC-09, Should)
- [ ] T005 Glosarium HPP/margin/impas sekali-tampil + contoh dapat-tutup (AC-10)
- [ ] T006 Could bila kapasitas: skenario ≤3 (AC-12), ekspor/print + disclaimer + gate review privasi (AC-13)
- [ ] T007 Uji sebut-margin/impas ≥80% + uji input invalid tak ganti hasil lama + uji tumpuk 3 entri lalu hapus 1 (2 sisa utuh)
