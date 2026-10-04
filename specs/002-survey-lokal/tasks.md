# Tasks — 002 Survey & Persistensi Lokal

> Pelaksanaan Survey. Status: rute placeholder; isi menunggu gate
> katalog/bobot/ambang (PO + pakar). Task gate ditandai eksplisit.

**Lifecycle:** DRAFT
**Health:** REVIEW_REQUIRED
**Traces to:** `design.md`, `spec.md` (unit ini)
**Reviewed against:** spec revision 6, design DRAFT

- [x] T001 Rute `/survey` terpasang (placeholder `ComingSoon`)
- [ ] T002 GATE — katalog soal terversi + bobot/ambang final (PO + review pakar). BLOCKER T003–T006
- [ ] T003 Modul `surveyCatalog.ts` dari katalog gate (teks, opsi, bobot, arah skor, versi)
- [ ] T004 `SurveyFlow`: satu-per-layar, progres, Kembali, belum-tahu, wajib-semua (AC-02)
- [ ] T005 `surveyStore.ts` `localStorage` (hapus-aman) + redirect replace + timpa-hasil-lama (AC-03, FR-009)
- [ ] T006 Transisi CSS non-blokir + reduced motion (AC-11)
- [ ] T007 Uji durasi ≤3 menit, 5 pengguna; uji hilang-jawab maju/mundur; uji payload rusak; uji submit-baru menimpa lama
