# Tasks — 002 Survey & Persistensi Lokal

> Pelaksanaan Survey. Status: `/survey` live dengan katalog v1
> (ADR-004, Proposed). Menunggu review pakar + uji durasi pengguna.

**Lifecycle:** IMPLEMENTING
**Health:** REVIEW_REQUIRED
**Traces to:** `design.md`, `spec.md` (unit ini)
**Reviewed against:** spec revision 6, design DRAFT

- [x] T001 Rute `/survey` terpasang (placeholder `ComingSoon`)
- [x] T002 Katalog v1 dari `work-docs/Pembuatan Survei Diagnosis UMKM.md` (bobot apa adanya, teks disederhanakan); konflik dengan PRD diputus di ADR-004. Review pakar masih terbuka
- [x] T003 Katalog `src/content/survey.ts` (`SURVEY_CATALOG` v1: teks, opsi, bobot, flag, bantuan istilah)
- [x] T004 `src/app/survey/Survey.tsx`: satu-per-layar, progres, Kembali, belum-tahu, wajib-semua, bantuan istilah, fokus ke judul soal (AC-02)
- [x] T005 `src/lib/survey-storage.ts`: simpan `umiro.survey.v1` + `umiro.diagnosis.v1`, gagal simpan → pesan, versi asing/rusak dibuang, `router.replace("/diagnosis")`; submit baru menimpa (AC-03; FR-009 usulan)
- [ ] T006 Transisi CSS non-blokir + reduced motion (AC-11)
- [ ] T007 Uji durasi ≤3 menit, 5 pengguna; uji hilang-jawab maju/mundur; uji payload rusak; uji submit-baru menimpa lama

> Catatan: jawaban setengah jalan tidak disimpan antar-muat-ulang (hanya di
> memori, cukup untuk AC-02-03). T006 (Could) belum dikerjakan.
