# Design — 002 Survey & Persistensi Lokal

> Kontrak solusi Survey + payload lokal. Status: rute terpasang sebagai
> `ComingSoon`; isi dan katalog soal menunggu gate PO. Dokumen ini
> mencatat keputusan arsitektur yang sudah diambil agar implementasi
> nanti tinggal eksekusi. Traces ke `spec.md` US-02, US-03, US-11
> (permukaan Survey US-10, input US-08 dirujuk).

**Lifecycle:** DRAFT
**Health:** REVIEW_REQUIRED
**Traces to:** `spec.md` (unit ini) · PRD §8.5 (US-02, US-03, US-11) ·
  owner US-08 → unit 003, owner US-10 → unit 004
**Reviewed against:** spec revision 6

## Architecture

Rute `/survey`: satu pertanyaan per layar (client component), state
jawaban di memori + tulis `localStorage` tiap navigasi (payload kecil). Submit valid → hitung deterministik
→ simpan payload berversi (timpa hasil lama bila ada) → `router.replace("/diagnosis")`. Copy soal +
opsi terpusat di modul konten `src/content/` seperti pola kamus
unit 001 (bukan string literal di halaman). Transisi US-11 murni CSS
(`transition-fluid` / `.reveal`), tidak menyentuh state.

## Components

- `SurveyFlow` (client leaf, belum dibangun): render satu soal, progres
  (`soal n dari N`), tombol Kembali/Lanjut, pilihan jawaban radio-card,
  opsi "Belum tahu" bila relevan.
- `surveyCatalog.ts` (modul konten, menunggu gate): teks soal, opsi,
  bobot, arah skor 0–100, versi katalog `SURVEY_CATALOG_V` (misal `1`).
  Katalog adalah SATU-SATUNYA sumber bobot/ambang.
- `surveyStore.ts` (belum dibangun): baca/tulis `localStorage`,
  validasi payload (versi cocok + jawaban lengkap), hapus payload rusak.
- `ComingSoon`: placeholder aktif saat ini di `src/app/survey/page.tsx`.

## Domain Model

- `SurveyAnswer`: `{ questionId, optionId }` — jawaban mentah.
- `SurveyPayload`: `{ catalogVersion, answers, savedAt }` — yang disimpan.
- `DiagnosisInput`: turunan deterministik dari payload (dihitung unit 003).

## Data Model

Key `localStorage` (final saat implementasi, pola diusulkan):

```text
umiro.survey.v<V>: SurveyPayload
umiro.diagnosis.v<V>: ringkasan diagnosis (ditulis unit 003)
```

Aturan: nilai JSON; versi tidak dikenal → abaikan + hapus + minta ulang;
gagal tulis (quota/private) → pesan, jangan klaim sukses. Ukuran terbatas
(puluhan jawaban, bukan blob).

## Interfaces

- Ke unit 003: kontrak `SurveyPayload` valid + `catalogVersion`.
- Ke unit 001: target redirect `/diagnosis` (hanya dari sini).
- `router.replace` (bukan `push`) agar tombol Kembali browser tidak
  mengulang submit.

## State Transitions

`unanswered → answered → submitted(valid) → stored → redirected`.
Maju/mundur mempertahankan jawaban. Submit tak-valid → blokir + tandai
soal kosong. Payload rusak saat baca → hapus → CTA ulang survey.

## Error Handling

- `localStorage` tak tersedia/penuh: pesan jelas, jawaban memori tetap
  bisa lanjut sampai submit (lalu gagal eksplisit).
- JSON rusak/versi asing: hapus aman, minta ulang, jangan render skor.
- Reduced motion: transisi non-esensial mati (ikuti `globals.css` media
  query yang sudah ada).

## Security

Jawaban tidak keluar browser. Tanpa fetch, tanpa cookie, tanpa PII yang
diminta. Ekspor/print (US-13, Could) tunduk review privasi dulu.

## Integration

Gaya ikut unit 001: `AppShell`, `transition-fluid`, radio-card
`card-interactive`, `aria-current`/progres untuk SR, fokus pindah ke soal
baru tiap layar (`tabIndex={-1}` + `.focus()`).

## Migration Strategy

Placeholder → implementasi: ganti isi `src/app/survey/page.tsx` tanpa
ubah rute. Bump `catalogVersion` tiap katalog berubah; payload lama yang
tak cocok dianggap rusak (minta ulang).

## Alternatives Considered

- Server persist: ditolak PRD (tanpa backend di MVP).
- Satu halaman semua soal: ditolak AC-02-01 (satu per layar, ≤3 menit).
- `push` setelah submit: ditolak, riwayat ganda membingungkan.
