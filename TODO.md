# Project Implementation Status

> Ledger eksekusi repo. Bukan requirement/backlog/desain rinci.

## Current Position

Sprint: —
Phase: Spec baseline + Landing vertical slice
Unit: 001 shell/Landing live; 002–005 rute placeholder
Stage: Specifying (001 UI draf jalan, design/tasks formal belum)
Current Task: —

## Completed

- [x] SDD fondasi dari PRD draf 5: docs/project/prd.md pointer, product/, .sdd/
- [x] Spec baseline 6 unit: 001 orientasi/navigasi (E-01), 002 survey-lokal (E-02), 003 diagnosis (E-03), 004 calculator (E-04 + US-08/19/13/14), 005 roadmap (E-05), 006 pasca-MVP/batas (E-06+E-08, DRAFT BLOCKED)
- [x] Landing `/` live: hero, sinyal, penyebab, arah, CTA + `src/lib/landingSurveyContent.ts`
- [x] AppShell live: nav 5 halaman MVP, status aktif, menu mobile, footer batasan
- [x] `/privasi` + `/syarat` live (pendukung, luar lima MVP)
- [x] Rute `/survey`, `/diagnosis`, `/kalkulator`, `/roadmap` terpasang sebagai `ComingSoon` (belum isi)

## In Progress

- [>] Tunggu PO: setujui spec 001–005 + katalog soal/bobot/ambang sebelum design formal 002–005
- [>] 001: Landing UI draf jalan tanpa design.md/tasks.md formal (sesuai gate: trivial/UI draf dicatat, perilaku ikut spec)

## Next

- [ ] Tulis design.md + tasks.md per unit 002–005 setelah spec disetujui (001 susulkan formalisasi dari UI jalan)
- [ ] ADR scoring/persistensi; verification 003 + unit test rumus 004
- [ ] Uji 5 pengguna §7

## Blocked

- [!] Design/implementasi isi 002–005 tertahan: katalog soal terversi + bobot/ambang final belum ada; 006 BLOCKED by design

## Direction

Epic→unit selesai; lanjut design satu unit tiap PO approve.

## Progress History

### 2026-10-04

- Inisialisasi SDD fondasi dari PRD draf 5.
- Spec 001–006 ditulis per epic mapping.
- Snapshot implementasi: Landing `/` + AppShell + `/privasi` + `/syarat` live; `/survey`, `/diagnosis`, `/kalkulator`, `/roadmap` placeholder `ComingSoon`. Tahap benar: shell/Landing dulu sebelum isi 002–005; gate katalog/bobot/ambang tetap blokir design formal.
- PRD §8 final fresh: hierarki Scrum Guide, US-01–US-20 ID = urutan, AC Given-When-Then biner, traceability §8.9. Tanpa jejak ID/kode lama.
- Turunan fresh: specs 001–006 rev 4, product/backlog.md, product/capability-map.md, .sdd/traceability/requirements.md. Lint + typecheck bersih.
