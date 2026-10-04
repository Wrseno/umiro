# Design — 003 Diagnosis Indikatif

> Kontrak solusi Diagnosis + aturan bottleneck. Status: rute placeholder;
> fungsi scoring menunggu katalog/bobot/ambang final + ADR. Traces ke
> `spec.md` US-04, owner US-08.

**Lifecycle:** DRAFT
**Health:** VALID
**Traces to:** `spec.md` (unit ini) · PRD §8.5 (US-04), Lampiran A/A1 ·
  ADR scoring (wajib sebelum implementasi, belum ada)
**Reviewed against:** spec revision 5

## Architecture

Rute `/diagnosis` membaca `SurveyPayload` dari `localStorage` (kontrak
unit 002), menjalankan fungsi scoring MURNI (tanpa I/O, tanpa tanggal,
tanpa random) → `DiagnosisResult`, lalu render: ringkasan F/M/R/A/C,
bottleneck atau "belum cukup jelas", alasan per indikator, ≤2 langkah
awal + disclaimer, tautan biasa ke `/kalkulator` dan `/roadmap`
(anchor bagian, tanpa query). Tanpa payload valid → CTA Survey.

## Components

- `scoreDiagnosis(payload, catalog)` (belum dibangun, calon
  `src/lib/diagnosis.ts`): agregasi per kategori F/M/R/A/C skala 0–100,
  hitung selisih dua terendah, terapkan aturan tie/data (AC-04-05/06).
  Wajib unit-test dengan kasus Lampiran A1.
- `DiagnosisPage` (belum dibangun): server render kerangka + client leaf
  untuk baca `localStorage` (hindari hydration mismatch: render CTA dulu,
  ganti setelah baca).
- `ComingSoon`: placeholder aktif saat ini.

## Domain Model

- `CategoryScore`: `{ code: F|M|R|A|C, score: 0–100, validCount,
  totalCount, sources: answerRef[] }`.
- `DiagnosisResult`: `{ scores, bottleneck: code | null,
  uncertainAreas: code[] (≤2), reasons, steps: step[] (≤2) }`.
- Aturan tie: selisih ≤10 → `bottleneck: null` + 2 area.
- Aturan data: valid < separuh indikator kategori bersaing → kategori
  itu tak boleh jadi bottleneck.

## Data Model

Baca: `umiro.survey.v<V>` (unit 002). Tulis: `umiro.diagnosis.v<V>`
(ringkasan hasil, opsional cache). S/G disimpan sebagai konteks tampilan
saja — tidak masuk fungsi skor.

## Interfaces

- Masuk: `SurveyPayload` valid + katalog versi cocok.
- Keluar: `DiagnosisResult` deterministik (input sama → output sama).
- Tautan keluar: `/kalkulator` (tanpa data), `/roadmap#<bagian>` (anchor
  statis, bukan personalisasi — putuskan daftar anchor di unit 005).

## State Transitions

`no-payload → CTA` | `payload-valid → scored → rendered` |
`tie/data-kurang → uncertain-rendered`. Tidak ada state tersimpan selain
cache hasil.

## Error Handling

- Payload hilang/rusak/versi asing → CTA Survey, bukan skor default.
- Skor `NaN`/di luar 0–100 → perlakukan sebagai data tak-valid untuk
  kategori itu (jangan render angka).
- Kasus A1 yang gagal → revisi aturan + catat alasan (AC-08-02), bukan
  tambal threshold diam-diam.

## Security

Tanpa kirim data ke mana pun. Alasan tampil hanya merujuk jawaban
pengguna sendiri. Bukan audit/kredit/pajak — disclaimer selalu tampil.

## Integration

Gaya unit 001: kartu indikator per lever, badge bottleneck vs panel
"belum cukup jelas", daftar alasan dengan kutip jawaban, CTA ganda.
`Reveal` untuk load-in; hormati reduced motion.

## Migration Strategy

Placeholder → implementasi tanpa ubah rute. Perubahan bobot/ambang =
bump katalog + ulang kasus A1 (AC-08-03) + tandai Health STALE sampai
review.

## Alternatives Considered

- Skor dihitung saat submit Survey (unit 002): ditolak — Diagnosis harus
  bisa dihitung ulang dari payload mentah agar dapat dijelaskan.
- Skor ML/heuristik adaptif: ditolak PRD — deterministik berbasis aturan.
- Menampilkan angka 0–100 ke pengguna: TERTUNDA — putuskan saat uji
  pengguna (risiko kepastian palsu); default sembunyikan angka, tampilkan
  sinyal kualitatif + alasan.
