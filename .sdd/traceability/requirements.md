# Requirements Traceability

> PRD → spec/design/validasi. Spec baseline SPECIFIED (001–005, rev 5); 006 DRAFT BLOCKED (rev 5). ID US/AC = urutan backlog. Owner tunggal: US-08 → unit 003 (unit 002 merujuk input Survey); US-10 → unit 004 (unit 002 merujuk permukaan Survey).

| Source | Requirement | Spec | Design | ADR | Validation |
|---|---|---|---|---|---|
| PRD US-01 AC-01 | Landing nilai/batas/CTA | specs/001-orientasi-navigasi/spec.md FR-001–003 | TBD | — | uji 5 pengguna §7 |
| PRD US-07 AC-07 | Navigasi 5 halaman | specs/001-orientasi-navigasi/spec.md FR-004–005 | TBD | — | manual mobile/desktop |
| PRD US-02 AC-02 | Survey F/M/R/A/C + S/G konteks | specs/002-survey-lokal/spec.md FR-001–006 | TBD | ADR scoring TBD | durasi ≤3 mnt, 5 pengguna |
| PRD US-03 AC-03 | Simpan lokal + redirect Diagnosis | specs/002-survey-lokal/spec.md FR-007–008 | TBD | ADR persistensi TBD | 100% manual same-browser |
| PRD US-04 AC-04 | Diagnosis + uncertainty | specs/003-diagnosis/spec.md FR-001–009 | TBD | ADR scoring TBD | kasus Lampiran A1 |
| PRD US-05 AC-05 | Kalkulator manual | specs/004-calculator/spec.md FR-001–005 | TBD | — | kasus Lampiran B + unit test rumus |
| PRD US-09 AC-09 | Direct vs platform | specs/004-calculator/spec.md FR-006 | TBD | — | kasus margin nol/negatif |
| PRD US-06 AC-06 | Roadmap statis | specs/005-roadmap/spec.md FR-001–006 | TBD | — | temu Survival/Improvement/Growth |
| PRD US-10 AC-10 | Bantuan istilah (owner unit 004; permukaan Survey unit 002) | specs/004-calculator/spec.md FR-007 + specs/002-survey-lokal/spec.md §9 | TBD | — | uji paham |
| PRD US-08 AC-08 | Verifikasi aturan (owner unit 003; input Survey unit 002) | specs/003-diagnosis/spec.md §9 + verification TBD | TBD | — | log input/expected/actual/alasan |
| PRD US-11–13 | Could motion/skenario/ekspor | specs/002-survey-lokal (US-11), specs/004-calculator FR-008–009 | TBD | — | AC-11/AC-12/AC-13 |
| PRD US-14–16 | AI future | specs/006-pasca-mvp-batas/spec.md DRAFT | — | ADR AI TBD | consent/evaluasi/fallback |
| PRD US-17–20 | Won't | specs/006-pasca-mvp-batas/spec.md DRAFT | — | — | review tanpa kode |
