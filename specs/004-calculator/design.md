# Design — 004 Financial Calculator

> Kontrak solusi kalkulator mandiri. Status: rute placeholder; rumus
> Lampiran B final, menunggu implementasi. Traces ke `spec.md` US-05,
> US-09, US-12, US-13, owner US-10.

**Lifecycle:** DRAFT
**Health:** VALID
**Traces to:** `spec.md` (unit ini) · PRD §8.5 (US-05, US-09–US-13),
  Lampiran B
**Reviewed against:** spec revision 5

## Architecture

Rute `/kalkulator`: form input terkontrol (client) + hasil live tanpa
reload + simpan lokal. Fungsi hitung murni `calc(H,V,Q,D,F,T)` (calon
`src/lib/calculator.ts`) dipakai UI utama, banding platform, dan
skenario — satu sumber rumus. Isolasi penuh: tidak impor modul
survey/diagnosis.

## Components

- `calc()` murni: `M = H − V`; laba `M·Q·D − F`; impas
  `ceil(F/(M·D))` bila `M>0, D>0` (`F=0` → 0); target
  `ceil((T+F)/(M·D))` bila `M>0, D>0, T+F>0`; `T` ≤ laba → tercapai,
  tambahan 0. `M≤0`/`H≤0`/`D=0`/penyebut tak-positif → tanpa angka
  impas/target + pesan kondisi. Rupiah `Math.round`; unit `Math.ceil`.
- `CalculatorForm` (belum dibangun): input H, V-atau-batch (`V =
  biayaBatch/unitBatch`), Q, D, F, T opsional + toggle direct/platform
  (US-09: potongan % vs nominal — putuskan satu, default %) + glosarium
  HPP/margin/impas (US-10: tooltip sekali tampil, dapat ditutup).
- Skenario US-12 (Could): daftar skenario bernama (maks 3), tiap item
  simpan asumsi + hasil; tombol "jadikan utama" eksplisit.
- Ekspor US-13 (Could, gate review privasi): print CSS / salin teks +
  disclaimer; tanpa kirim server.
- `ComingSoon`: placeholder aktif saat ini.

## Domain Model

- `CalcInput`: `{ H,V,Q,D,F,T?, mode: direct|platform, fee? }`.
- `CalcResult`: `{ M, laba, impas: unit/hari | null, target: unit/hari |
  null | tercapai, pesan: string[] }`.
- Validasi: finite, ≥0; `H>0`, `D>0`, `unitBatch>0` bila mode batch.

## Data Model

Key `umiro.calc.v1`: `{ input, result, savedAt }`. Payload rusak → jangan
tampilkan sebagai terkini (pakai default kosong + pesan). Skenario (bila
dibangun): `umiro.calc.scenarios.v1`.

## Interfaces

- Tanpa kontrak baca/tulis dengan unit 002/003 (AC-05-07).
- Parsing rupiah: terima `10.000`/`10000` (titik ribuan ID); tolak koma
  desimal ambigu dengan pesan ("gunakan bilangan rupiah bulat").

## State Transitions

`kosong → terisi-valid → hasil-live` | `invalid → pesan-inline, hasil
lama dipertahankan` | `tersimpan → pulihkan-saat-buka`.

## Error Handling

Setiap input invalid: pesan per-field Bahasa Indonesia, hasil sebelumnya
tidak diganti angka invalid. `NaN`/`Infinity` dari parse → tolak di
batas, jangan masuk `calc()`.

## Security

Tanpa server, tanpa PII. Print/salin hanya data lokal + disclaimer.

## Integration

Gaya unit 001: input `h-12 rounded-control`, angka tabular
(`data-tabular`), hasil panel `card`, margin negatif dijelaskan
("tiap porsi rugi RpX — naikkan harga / turunkan biaya"), bukan impas
palsu.

## Migration Strategy

Placeholder → implementasi tanpa ubah rute. Wajib: unit test rumus
(Lampiran B 6 kasus) hijau sebelum klaim selesai.

## Alternatives Considered

- Prefill dari Survey: ditolak AC-05-07 (input manual saja).
- `eval` rumus dinamis: ditolak — fungsi murni eksplisit per Lampiran B.
- Grafik/chart lib: ditolak MVP — angka + teks cukup, tanpa dependency.
