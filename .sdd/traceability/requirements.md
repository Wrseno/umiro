# Requirements Traceability

> PRD → spec/design/validasi. Spec baseline SPECIFIED menunggu persetujuan PO (001–004 rev 6, 005 rev 4); 006 DRAFT BLOCKED. ID US/AC = urutan backlog. Owner tunggal: US-08 → unit 003 (unit 002 merujuk input Survey); US-10 → unit 004 (unit 002 merujuk permukaan Survey).
> AMANDEMEN AKTIF (usulan, PRD belum direvisi): button pojok dinamis + diagnosis-ulang + riwayat kalkulator — spec 001 rev 6, 002/003/004 rev 6, design 001–004 DRAFT direvisi, tasks 001–004 direvisi; storage tetap `localStorage`; AC baru marka *(usulan amandemen PRD)*; draf di `decisions/amandemen-nav-resurvey-riwayat.md`.

| Source | Requirement | Spec | Design | ADR | Validation |
|---|---|---|---|---|---|
| PRD US-01 AC-01 | Landing nilai/batas/CTA | specs/001-orientasi-navigasi/spec.md FR-001–003 | design DRAFT; IMPLEMENTED (tasks 001 T001–T011, T013–T014) | — | uji 5 pengguna §7 |
| PRD US-07 AC-07 | Navigasi (PRD: 5 halaman; usulan: 3 menu + button pojok, AC-07-06/07) | specs/001-orientasi-navigasi/spec.md FR-004–005 | design DRAFT; IMPLEMENTED (versi usulan) | — | manual mobile/desktop |
| PRD US-02 AC-02 | Survey F/M/R/A/C + S/G konteks | specs/002-survey-lokal/spec.md FR-001–006 | IMPLEMENTED (katalog v1, tasks 002 T002–T005) | ADR-004 (Proposed) | durasi ≤3 mnt, 5 pengguna (belum) |
| PRD US-03 AC-03 | Simpan lokal + redirect Diagnosis | specs/002-survey-lokal/spec.md FR-007–008 | IMPLEMENTED (tasks 002 T005) | ADR-003 (Proposed) | `survey-storage.test.ts` + manual same-browser |
| PRD US-04 AC-04 | Diagnosis + uncertainty (+ AC-04-10 usulan) | specs/003-diagnosis/spec.md FR-001–009 | IMPLEMENTED (tasks 003 T002–T005) | ADR-004, ADR-003 (Proposed) | specs/003-diagnosis/verification.md (IN PROGRESS) |
| PRD US-05 AC-05 | Kalkulator manual (+ riwayat AC-05-11 usulan) | specs/004-calculator/spec.md FR-001–005 | IMPLEMENTED (versi PRD; riwayat usulan belum) | ADR-003 (Proposed) | specs/004-calculator/verification.md (IN PROGRESS) |
| PRD US-09 AC-09 | Direct vs platform | specs/004-calculator/spec.md FR-006 | IMPLEMENTED (tasks 004 T004) | — | specs/004-calculator/verification.md |
| PRD US-06 AC-06 | Roadmap statis | specs/005-roadmap/spec.md FR-001–006 | IMPLEMENTED (tasks 005 T002–T004) | — | uji temu-bagian 5 pengguna (T005) |
| PRD US-10 AC-10 | Bantuan istilah (owner unit 004; permukaan Survey unit 002) | specs/004-calculator/spec.md FR-007 + specs/002-survey-lokal/spec.md §9 | IMPLEMENTED di Kalkulator (permukaan Survey menunggu 002) | — | uji paham |
| PRD US-08 AC-08 | Verifikasi aturan (owner unit 003; input Survey unit 002) | specs/003-diagnosis/spec.md §9 | IMPLEMENTED (tasks 003 T003, T005) | ADR-004 | specs/003-diagnosis/verification.md log A1 |
| PRD US-11–13 | Could motion/skenario/ekspor | specs/002-survey-lokal (US-11), specs/004-calculator FR-008–009 | TBD | — | AC-11/AC-12/AC-13 |
| PRD US-14–16 | AI future | specs/006-pasca-mvp-batas/spec.md DRAFT | — | ADR AI TBD | consent/evaluasi/fallback |
| PRD US-17–20 | Won't | specs/006-pasca-mvp-batas/spec.md DRAFT | — | — | review tanpa kode |
