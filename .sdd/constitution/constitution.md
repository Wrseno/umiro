# Engineering Constitution

> Governance lintas repo. Bukan spec unit.

## Principles

- **Requirement traceability.** Tiap perilaku terapkan lacak ke `spec.md` disetujui.
- **Explicit scope.** Tiap spec nyatakan in/out eksplisit ikut PRD §9.
- **Testable requirements.** AC dapat diverifikasi; lihat PRD §8 + Lampiran A1/B.
- **Explicit boundaries.** 5 halaman MVP terpisah; Survey→Diagnosis satu-satunya alur langsung; Calculator/Roadmap mandiri; tanpa baca silang diagnosis di MVP.
- **Security by default.** MVP tanpa kirim jawaban ke server/AI; ekspor/print hanya data lokal + disclaimer + review privasi dulu.
- **Maintainability.** App Router + TypeScript ketat; logika scoring/kalkulator murni lokal teruji; payload berversi.
- **Human approval gates.** Spec butuh PO sebelum design; design butuh arsitek/PO sebelum implementasi; aturan scoring butuh review pakar + uji kasus sintetis sebelum ke pengguna.

## Single source of truth

PRD authoritative: `design/PRD draf 5.md`. `docs/project/prd.md` pointer saja. Duplikasi dilarang.

## Boundary rules

1. Product requirement ≠ engineering specification.
2. Specification ≠ design.
3. Plan ≠ tasks.
4. ADR ≠ generic decision log.
5. `TODO.md` ≠ backlog.
6. `TODO.md` ≠ `tasks.md`.
7. A derivative skill's standing rules ≠ this chain's core artifacts.
8. `AGENTS.md` ≠ all documentation.
9. Project-management docs ≠ SDD docs.
10. Never create a duplicate source-of-truth.

## Amending this document

Usul via PR + catat di `.sdd/governance.md` migration log; butuh PO + engineering architect; berlaku prospektif tanpa tulis ulang historis kecuali safety/correctness kritis.
