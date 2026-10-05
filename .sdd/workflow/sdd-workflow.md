# SDD Workflow

> Cara lifecycle jalan di repo ini.

## Lifecycle

```text
spec.md → research.md (optional) → plan.md → ADR (when needed) →
design.md → tasks.md → implementation → validation → TODO.md update
```

Unit = halaman/capability MVP: `001-orientasi-navigasi`, `002-survey-lokal`, `003-diagnosis`, `004-calculator`, `005-roadmap`, `006-pasca-mvp-batas`. Baseline per unit: `spec.md`, `design.md`, `tasks.md`. Tambah `plan.md`/`verification.md` bila kompleks.

## Approval gates

- spec.md butuh PO sebelum plan/design
- design.md butuh PO + review pakar domain (aturan scoring) sebelum implementasi
- tasks selesai butuh verifikasi AC + bukti sebelum VERIFIED
- AI future butuh persetujuan terpisah + evaluasi privasi/kualitas

## Exception handling

- **Trivial changes** (typo, copy, format minor): langsung, catat TODO.
- **Behavioral changes:** wajib via spec.md.
- **Architectural changes:** pertimbangkan ADR; scoring/persistensi/AI wajib ADR.
- **Large units:** boleh spec-of-specs.

## Unit folder convention

Baseline: `spec.md`, `design.md`, `tasks.md`. Tambah `plan.md`, `research.md`, `verification.md` bila kompleksitas butuh.
