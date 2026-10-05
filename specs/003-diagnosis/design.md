# Design — 003 Diagnosis Indikatif

> Kontrak solusi Diagnosis + aturan bottleneck. Status: `/diagnosis` live (ADR-004);
> katalog v1 + bobot menunggu review pakar dan uji pengguna. Traces ke
> `spec.md` US-04, owner US-08.

**Lifecycle:** DRAFT
**Implementation:** live — katalog/scoring per ADR-004 (Proposed)
**Health:** REVIEW_REQUIRED
**Traces to:** `spec.md` (unit ini) · PRD §8.5 (US-04), Lampiran A/A1 ·
  ADR scoring (wajib sebelum implementasi, belum ada)
**Reviewed against:** spec revision 6

## Architecture

Rute `/diagnosis` membaca `SurveyPayload` dari `localStorage` (kontrak
unit 002), menjalankan fungsi scoring MURNI (tanpa I/O, tanpa tanggal,
tanpa random) → `DiagnosisResult`, lalu render: ringkasan F/M/R/A/C,
bottleneck atau "belum cukup jelas", alasan per indikator, ≤2 langkah
awal + disclaimer, tombol "Isi Survei Baru" ke `/survey`, plus tautan biasa ke `/kalkulator` dan `/roadmap`
(anchor bagian, tanpa query). Tanpa hasil valid → tombol "Isi Survei Baru" (bukan skor default).

## Components

- `scoreDiagnosis(answers, catalog)` (`src/lib/diagnosis.ts`, ADR-004; semula calon
  `src/lib/diagnosis.ts`): agregasi per kategori F/M/R/A/C skala 0–100,
  hitung selisih dua terendah, terapkan aturan tie/data (AC-04-05/06).
  Wajib unit-test dengan kasus Lampiran A1.
- `Diagnosis` (`src/app/diagnosis/Diagnosis.tsx`): server render kerangka + client leaf
  untuk baca `localStorage` (hindari hydration mismatch: render fallback dulu,
  ganti setelah baca).
- Tautan "Isi survei lagi" (bagian `Diagnosis`): `<Link href="/survey">Isi Survei Baru</Link>` —
  SELALU tampil (ada/tanpa hasil); submit baru menimpa hasil lama (aturan unit 002).

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

`tanpa-hasil → tombol Isi Survei Baru` | `payload-valid → scored → rendered` |
`tie/data-kurang → uncertain-rendered`. Tidak ada state tersimpan selain
cache hasil.

## Error Handling

- Payload hilang/rusak/versi asing → tombol "Isi Survei Baru", bukan skor default.
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
