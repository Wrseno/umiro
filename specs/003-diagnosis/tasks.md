# Tasks — 003 Diagnosis Indikatif

> Pelaksanaan Diagnosis + verifikasi aturan. Status: rute placeholder;
> scoring menunggu katalog + ADR. Unit ini OWNER US-08.

**Lifecycle:** DRAFT
**Health:** VALID
**Traces to:** `design.md`, `spec.md` (unit ini)
**Reviewed against:** spec revision 5, design DRAFT

- [x] T001 Rute `/diagnosis` terpasang (placeholder `ComingSoon`)
- [ ] T002 GATE — ADR scoring (agregasi, normalisasi 0–100, aturan tie/data) + katalog final. BLOCKER T003–T005
- [ ] T003 `src/lib/diagnosis.ts` murni + unit test 6 kasus Lampiran A1 (AC-04, AC-08-01)
- [ ] T004 `DiagnosisPage`: baca lokal, render indikator/alasan/langkah/disclaimer, CTA-tanpa-payload, tautan biasa (AC-04)
- [ ] T005 Log verifikasi US-08: input/expected/actual/alasan per kasus (AC-08-02); putuskan tampil-angka vs kualitatif via uji pengguna
- [ ] T006 Uji pemahaman "indikasi bukan kepastian" ≥80% + relevansi langkah ≥4/5
