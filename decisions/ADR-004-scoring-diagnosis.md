# ADR-004

**Title:** Scoring diagnosis deterministik dan aturan bottleneck
**Status:** Proposed
**Date:** 2026-10-05

## Context

PRD Lampiran A menetapkan kerangka (skor 0–100, selisih >10 poin, data
cukup, S/G hanya konteks) tetapi menyerahkan bobot, jumlah soal, dan
detail aturan ke katalog terversi. Katalog v1 diambil dari
`work-docs/Pembuatan Survei Diagnosis UMKM.md`. Dokumen itu berbeda dari
PRD pada tiga hal, dan PRD menang sampai PRD direvisi:

1. Dokumen membuang kategori yang kurang data lalu tetap memilih
   bottleneck dari sisa kategori; PRD (AC-04-06, A1) meminta "belum cukup
   jelas".
2. Batas kurang data dokumen: flag "Belum tahu" ≥ 50%; PRD: jawaban valid
   < separuh soal. Berbeda pada kategori dua soal (R, A).
3. Dokumen memakai S1/G1 untuk mengubah peringatan dan bahasa saran; PRD
   melarang S/G mengubah isi atau menyaring saran di MVP (AC-04-04).

Dokumen juga tidak konsisten soal "Belum tahu": teks menyebut bernilai 0,
rumus membagi dengan jumlah jawaban valid.

## Decision

Implementasi: `src/lib/diagnosis.ts`, katalog `src/content/survey.ts` v1.

1. **Katalog v1:** 13 soal diagnostik (F3, M3, R2, A2, C3) + S1, G1.
   Bobot sesuai dokumen sumber; teks disederhanakan ke bahasa sehari-hari.
   Setiap soal diagnostik punya opsi "Belum tahu" bertanda flag.
2. **Skor kategori** = rata-rata bobot jawaban valid, dibulatkan.
   "Belum tahu" TIDAK ikut dirata-rata (mengikuti rumus dokumen).
3. **Data kurang:** jawaban valid × 2 < jumlah soal kategori (PRD).
4. **Keputusan:**
   - Ada kategori data kurang → "belum cukup jelas" (alasan data);
     area = kategori data kurang dulu, lalu skor terendah, maksimal dua.
   - Selain itu, selisih skor terendah dan kedua > 10 → bottleneck tunggal.
   - Selain itu → "belum cukup jelas" (alasan selisih), dua skor terendah.
   - Seri diurutkan stabil F, M, R, A, C.
5. **S/G** hanya ditampilkan sebagai konteks; tidak masuk skor, keputusan,
   maupun pemilihan langkah.
6. **Alasan** (AC-04-03): jawaban berbobot ≤ 40 atau "Belum tahu" pada
   kategori fokus. **Langkah** (AC-04-07): maksimal dua, diambil dari butir
   Roadmap; tautan Roadmap memakai anchor tahap statis.
7. Hasil selalu dihitung ulang dari jawaban tersimpan; ringkasan
   `umiro.diagnosis.v1` hanya cache (ADR-003).

## Alternatives Considered

- **Mengikuti dokumen apa adanya (buang kategori kurang data):** ditolak —
  bertentangan dengan AC-04-06 dan dapat menyatakan bottleneck padahal area
  yang tidak diketahui mungkin lebih lemah.
- **"Belum tahu" dihitung 0 dalam rata-rata:** ditolak — mencampur
  "buruk" dengan "tidak tahu"; ketidaktahuan sudah ditangani aturan data
  kurang.
- **Bobot per soal berbeda dalam satu kategori:** tidak dipakai — dokumen
  sumber tidak menyediakannya; rata-rata sederhana lebih mudah dijelaskan.

## Consequences

- Satu kategori yang seluruhnya "Belum tahu" mencegah bottleneck tunggal.
  Ini disengaja (PRD §5.3: data paling tidak jelas juga sinyal), tetapi
  perlu diamati saat uji pengguna.
- Kategori Jangkauan memberi skor rendah pada usaha fisik tanpa jejak
  digital; awasi apakah Jangkauan terlalu sering keluar sebagai hasil.
- Bobot, ambang 10 poin, dan batas data adalah hipotesis (PRD §12);
  perubahan apa pun menaikkan versi katalog dan mengulang kasus uji
  (AC-08-03): `npm test` → `src/lib/diagnosis.test.ts`.
