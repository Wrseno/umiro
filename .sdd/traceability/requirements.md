# Requirements Traceability

> PRD → spec/design/validasi. Spec baseline SPECIFIED (001–005, rev 5); 006 DRAFT BLOCKED (rev 5). ID US/AC = urutan backlog. Owner tunggal: US-08 → unit 003 (unit 002 merujuk input Survey); US-10 → unit 004 (unit 002 merujuk permukaan Survey).

| Source | Requirement | Spec | Design | ADR | Validation |
|---|---|---|---|---|---|
| PRD US-01 AC-01 | Landing nilai/batas/CTA | specs/001-orientasi-navigasi/spec.md FR-001–003 | DESIGNED + IMPLEMENTED (tasks 001 T001–T007) | — | uji 5 pengguna §7 |
| PRD US-07 AC-07 | Navigasi 5 halaman | specs/001-orientasi-navigasi/spec.md FR-004–005 | DESIGNED + IMPLEMENTED | — | manual mobile/desktop |
| PRD US-02 AC-02 | Survey F/M/R/A/C + S/G konteks | specs/002-survey-lokal/spec.md FR-001–006 | DRAFT (tasks 002, gate katalog) | ADR scoring TBD | durasi ≤3 mnt, 5 pengguna |
| PRD US-03 AC-03 | Simpan lokal + redirect Diagnosis | specs/002-survey-lokal/spec.md FR-007–008 | DRAFT (gate katalog) | ADR persistensi TBD | 100% manual same-browser |
| PRD US-04 AC-04 | Diagnosis + uncertainty | specs/003-diagnosis/spec.md FR-001–009 | DRAFT (tasks 003, gate ADR scoring) | ADR scoring TBD | kasus Lampiran A1 |
| PRD US-05 AC-05 | Kalkulator manual | specs/004-calculator/spec.md FR-001–005 | DRAFT (tasks 004, siap eksekusi) | — | kasus Lampiran B + unit test rumus |
| PRD US-09 AC-09 | Direct vs platform | specs/004-calculator/spec.md FR-006 | DRAFT (tasks 004 T004) | — | kasus margin nol/negatif |
| PRD US-06 AC-06 | Roadmap statis | specs/005-roadmap/spec.md FR-001–006 | DRAFT (tasks 005) | — | temu Survival/Improvement/Growth |
| PRD US-10 AC-10 | Bantuan istilah (owner unit 004; permukaan Survey unit 002) | specs/004-calculator/spec.md FR-007 + specs/002-survey-lokal/spec.md §9 | DRAFT (tasks 004 T005) | — | uji paham |
| PRD US-08 AC-08 | Verifikasi aturan (owner unit 003; input Survey unit 002) | specs/003-diagnosis/spec.md §9 + verification TBD | DRAFT (tasks 003 T005) | — | log input/expected/actual/alasan |
| PRD US-11–13 | Could motion/skenario/ekspor | specs/002-survey-lokal (US-11), specs/004-calculator FR-008–009 | TBD | — | AC-11/AC-12/AC-13 |
| PRD US-14–16 | AI future | specs/006-pasca-mvp-batas/spec.md DRAFT | — | ADR AI TBD | consent/evaluasi/fallback |
| PRD US-17–20 | Won't | specs/006-pasca-mvp-batas/spec.md DRAFT | — | — | review tanpa kode |
