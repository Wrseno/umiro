# Project Implementation Status

> Ledger eksekusi repo. Bukan requirement/backlog/desain rinci.

## Current Position

Sprint: —
Phase: Spec 001–004 rev 6, 005 rev 4 (SPECIFIED, menunggu persetujuan PO); design + tasks 001–005 DRAFT
Unit: kelima halaman MVP live (001–005)
Stage: Verifying — semua unit IMPLEMENTED; verifikasi IN PROGRESS menunggu persetujuan PO, review pakar, uji pengguna
Current Task: —

## Completed

- [x] SDD fondasi dari PRD draf 5: docs/project/prd.md pointer, product/, .sdd/
- [x] Spec baseline 6 unit: 001 orientasi/navigasi (E-01: US-01,07), 002 survey-lokal (E-02 + rujuk US-08,10,11), 003 diagnosis (E-03 + owner US-08), 004 calculator (E-04 + owner US-10, US-09,12,13), 005 roadmap (E-05: US-06), 006 pasca-MVP/batas (E-06+E-08: US-14–20, DRAFT BLOCKED)
- [x] design.md + tasks.md 001–005 tertulis (DRAFT)
- [x] Unit 001 live: Landing `/`, AppShell (menu 3 item + button pojok dinamis `DiagnosisCta`), `/privasi`, `/syarat`
- [x] Unit 004 `/kalkulator` (US-05, US-09, US-10 versi PRD) + unit test Lampiran B + `verification.md`; unit 005 `/roadmap` (US-06) + test copy
- [x] Unit 002 `/survey` + 003 `/diagnosis`: katalog v1 dari `work-docs/Pembuatan Survei Diagnosis UMKM.md`, scoring ADR-004, log kasus A1 di `verification.md`
- [x] ADR-003 persistensi + ADR-004 scoring (Proposed), CI `.github/workflows/ci.yml`, ADR-001/002 format template

## In Progress

- [>] Tunggu PO: sahkan/tolak amandemen (kode 001/003 sudah mengikuti usulan), setujui spec 001–005, sahkan ADR-003 + ADR-004

## Next

- [ ] Review pakar bobot katalog v1; uji durasi survei ≤3 menit
- [ ] Tim tinjau copy 15 butir Roadmap + urutan Could (US-11/12/13)
- [ ] Set `metadataBase` di `layout.tsx` setelah domain produksi diketahui (OG image kini fallback localhost)
- [ ] Uji 5 pengguna §7

## Blocked

- [!] Riwayat kalkulator (AC-05-11) menunggu amandemen; 006 BLOCKED by design

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

### 2026-10-05

- Audit kode + dokumen. Perbaikan tanpa gate PO: hydration mismatch `DiagnosisCta` (→ `useSyncExternalStore` + event tab-sama), literal UI tersisa ke `NAV`, `<a>` → `Link`, OG image lokal (hapus picsum + `remotePatterns`), hapus SVG bawaan create-next-app, fondasi `npm test`.
- Dokumen: AC-05-09 dikembalikan ke nomor PRD (payload rusak), riwayat kalkulator jadi AC-05-11 (usulan); tasks 001 reviewed against rev 6 + T008/T009/T014; design 001 "(disetujui)" → usulan; 004 design/tasks Health REVIEW_REQUIRED; traceability, roadmap (ID US PRD), workflow (nama folder), backlog (status spec), capability-map (US-10–13 = MVP bila waktu), spec 002 rujuk AC US-08/US-10 (tidak menyalin), governance placeholder, README. ADR-003 persistensi (Proposed). Lint + typecheck + test + build hijau.
- Implementasi tanpa gate PO: `/kalkulator` (rumus murni `src/lib/calculator.ts` + 21 test, simpan isian valid terakhir `umiro.calc.v1`, payload rusak dibuang, banding platform %, istilah + contoh dapat-tutup) dan `/roadmap` (15 butir Lampiran C + 4 lever §5.1, test larangan bahasa janji). Diuji di browser (build produksi): kasus Lampiran B, platform 20%, reload, payload rusak, lebar 390px. CI GitHub Actions; ADR-001/002 ke format template; spec 002/004 lepas istilah teknis. Lint + typecheck + test (25) + build + sdd-check (0 FAIL) hijau.
- `/survey` + `/diagnosis` dibangun dari `work-docs/Pembuatan Survei Diagnosis UMKM.md`: 15 soal (bobot asli, teks disederhanakan), scoring murni `src/lib/diagnosis.ts`, penyimpanan `src/lib/survey-storage.ts`. Konflik dokumen vs PRD diputus PRD (ADR-004): kategori data kurang → belum jelas, batas valid < separuh, S/G hanya konteks; "Belum tahu" tidak dirata-rata. `ComingSoon` + `placeholders.ts` dihapus. Diuji browser: simulasi 1 → Harga & margin, data kurang → belum jelas, payload rusak → CTA survei, CTA pojok berubah tanpa reload, 390px tanpa overflow. 47 test hijau.
- Layout mengadopsi pola prototipe `naik-kelas.ai.studio` (palet UMIRO tetap): Beranda + 4 penggerak, peringatan komisi aplikasi → Kalkulator, FAQ akordeon; Survei + blok judul, chip kategori + persen, kotak konteks; Diagnosis pita header gelap + sidebar skor menempel; Kalkulator kartu margin + % + ubin impas/laba + kartu target + slider potongan; Roadmap pita header + sidebar tahap/langkah. TIDAK diadopsi (bertentangan PRD): Kelas 0–3, centang/progres tindakan, 3 tindakan, label "Rawan", kode sesi, klaim "studi kasus nyata". 390px tanpa overflow di 5 halaman.
