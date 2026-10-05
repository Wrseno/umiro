# Design — 005 Roadmap Statis

> Kontrak solusi panduan baca-saja. Status: rute placeholder; konten
> Lampiran C final sebagai kerangka, perlu ekspansi copy. Traces ke
> `spec.md` US-06.

**Lifecycle:** DRAFT
**Health:** VALID
**Traces to:** `spec.md` (unit ini) · PRD §8.5 (US-06), Lampiran C,
  PRD §5.1–§5.2 (levers + tahap naratif)
**Reviewed against:** spec revision 4

## Architecture

Rute `/roadmap`: halaman statis (server component, tanpa client JS
kecuali `Reveal`), tiga bagian Survival/Improvement/Growth × empat
levers sebagai matriks baca. Copy terpusat di modul konten (pola unit
001) agar bahasa "contoh/langkah yang dapat dicoba" konsisten. Tanpa
state, tanpa query param, tanpa filter.

## Components

- `src/content/roadmap.ts` (ADR-001; lever: margin, retensi, jangkauan, kapasitas): 15 butir Lampiran C diekspansi
  jadi `{ tahap, lever, judul, langkah[], contohBiayaRendah, bukanJanji }`.
  Tiap butir: 1–2 kalimat cara + 1 contoh konkret kuliner rumahan.
- `src/app/roadmap/page.tsx`: TOC anchor atas (`#survival`,
  `#improvement`, `#growth`), tiga seksi + strip empat levers,
  catatan "tindakan adalah opsi kontekstual".
- Anchor `#survival` dkk adalah target tautan Diagnosis (AC-06-06):
  anchor statis, bukan personalisasi.

## Domain Model

Tidak ada entitas. Struktur konten: `Tahap { Survival, Improvement,
Growth } × Lever { margin, retensi, reach, capacity }` — sel matriks
boleh kosong (tidak semua kombinasi ada butirnya).

## Data Model

Tanpa persistensi. Tanpa tracking baca.

## Interfaces

- Masuk dari navigasi atau Diagnosis: URL bersih `/roadmap` atau
  `/roadmap#<tahap>` — keduanya render konten penuh yang sama.
- Tidak ada kontrak data dengan unit 002/003.

## State Transitions

Tidak ada. Satu render statis.

## Error Handling

Anchor tak dikenal → abaikan (render atas halaman). Tidak ada failure
mode lain.

## Security

Konten statis, tanpa input pengguna. Risiko satu-satunya adalah bahasa
janji — mitigasi via lint copy: larang kata "pasti", "dijamin",
"naik X%" tanpa sumber.

## Integration

Gaya unit 001: seksi `.reveal` stagger, kartu `card` untuk butir,
`eyebrow` per tahap, TOC sticky di mobile sebagai daftar lipat
`<details>` (tanpa JS).

## Migration Strategy

Placeholder → implementasi tanpa ubah rute. Uji temu-bagian (≥80%
dari 5 pengguna) sebelum klaim selesai.

## Alternatives Considered

- Roadmap interaktif/filter by bottleneck: ditolak MVP (AC-06-03/06).
- Satu halaman panjang tanpa TOC: ditolak — target temu-bagian butuh
  navigasi seksi.
- CMS/headless: ditolak — 15 butir statis, modul TS cukup.
