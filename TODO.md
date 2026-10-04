# Project Implementation Status

> Ledger eksekusi repo. Bukan requirement/backlog/desain rinci.

## Current Position

Sprint: —
Phase: Design/tasks MVP units selesai (001 DESIGNED+IMPLEMENTED; 002–005 DRAFT, gate katalog/ADR)
Unit: 001 shell/Landing live; 002–005 rute placeholder + design/tasks tertulis
Stage: Designing (tasks 001 IMPLEMENTED, 002–005 DRAFT menunggu gate)
Current Task: —

## Completed

- [x] SDD fondasi dari PRD draf 5: docs/project/prd.md pointer, product/, .sdd/
- [x] Spec baseline 6 unit rev 5: 001 orientasi/navigasi (E-01: US-01,07), 002 survey-lokal (E-02 + rujuk US-08,10,11), 003 diagnosis (E-03 + owner US-08), 004 calculator (E-04 + owner US-10, US-09,12,13), 005 roadmap (E-05: US-06), 006 pasca-MVP/batas (E-06+E-08: US-14–20, DRAFT BLOCKED)
- [x] Landing `/` live: hero, sinyal, penyebab, arah, CTA + `src/content/landing.ts`
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
- Kesesuaian PRD↔spec terverifikasi programatis: 20 US, 22 blok, 77 AC cocok semua; AC-17-01–AC-20-01 ditambah ke 006; owner tunggal US-08→003, US-10→004; specs rev 5.
- Unit-to-work dilengkapi: design.md 001–005 + tasks.md 001–005 selaras kode nyata (001 DESIGNED/IMPLEMENTED live; 002–005 DRAFT dengan gate katalog/ADR eksplisit). Semua US-01–13 MVP tercatat di unit-to-work. Lint + typecheck bersih.
- Amandemen button-pojok dinamis + diagnosis-ulang + riwayat kalkulator (usulan, PRD belum tersentuh; storage tetap `localStorage`): spec 001 rev 6, 002/003/004 rev 6 (Health REVIEW_REQUIRED), design 001–004 + tasks 001–004 direvisi, AC baru marka *(usulan)*, draf di `decisions/amandemen-nav-resurvey-riwayat.md`.
- Refactor dictionary-based (ADR-001) + layered-lite (ADR-002): `src/content/*.ts` 9 file data-murni, hapus `src/lib/landingSurveyContent.ts`; AppShell/halaman/metadata impor `@/content`; literal UI nol. AGENTS.md catat skill SDD + arsitektur + batas. Lint + typecheck + build hijau.
