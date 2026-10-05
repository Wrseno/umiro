# Tasks — 003 Diagnosis Indikatif

> Pelaksanaan Diagnosis + verifikasi aturan. Status: `/diagnosis` live,
> scoring ADR-004 (Proposed). Unit ini OWNER US-08.

**Lifecycle:** IMPLEMENTING
**Health:** REVIEW_REQUIRED
**Traces to:** `design.md`, `spec.md` (unit ini)
**Reviewed against:** spec revision 6, design DRAFT

- [x] T001 Rute `/diagnosis` terpasang (placeholder `ComingSoon`)
- [x] T002 ADR-004 scoring (agregasi, aturan data kurang, selisih >10, urutan seri) — Proposed, menunggu PO + pakar
- [x] T003 `src/lib/diagnosis.ts` murni + `diagnosis.test.ts` (6 kasus Lampiran A1 + batas selisih 10/11) (AC-04, AC-08-01)
- [x] T004 `src/app/diagnosis/Diagnosis.tsx`: baca `localStorage` setelah hidrasi, indikator/alasan/langkah/konteks S-G/disclaimer, tanpa hasil → CTA Survey (AC-04-08), tautan "Isi survei lagi" (AC-04-10 usulan)
- [x] T005 Log verifikasi US-08 di `verification.md` (input/expected/actual/alasan per kasus, AC-08-02). Tampil-angka vs kualitatif: sementara angka 0–100, putuskan via uji pengguna
- [ ] T006 Uji pemahaman "indikasi bukan kepastian" ≥80% + relevansi langkah ≥4/5
