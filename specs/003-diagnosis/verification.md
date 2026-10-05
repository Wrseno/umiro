# Verification — 003 Diagnosis Indikatif

> Bukti per acceptance criterion + log kasus uji aturan (US-08). Belum
> boleh VERIFIED: spec belum disetujui PO, ADR-004 masih Proposed, review
> pakar dan uji pengguna (T006) belum dijalankan.

**Traces to:** `spec.md` rev 6, `design.md`, `tasks.md` (unit ini), ADR-004

**Verification Status:** IN PROGRESS

## Log kasus uji aturan (AC-08-01, AC-08-02)

Katalog v1. Jawaban dasar: semua soal diagnostik opsi "c", S1 = c, G1 = b
(skor dasar F 73 · M 90 · R 75 · A 75 · C 77). Kolom input hanya mencatat
jawaban yang diubah dari dasar. Otomatis: `src/lib/diagnosis.test.ts`.

| Kasus | Input | Diharapkan | Aktual | Alasan beda |
|---|---|---|---|---|
| A1-1 margin ≤0 + jangkauan tinggi | M1–M3 = a, A1–A2 = d | Margin, bukan promosi | F73 M0 R75 A100 C77 → tunggal **M** (Δ 73) | — |
| A1-2 margin positif, pembeli jarang kembali | R1–R2 = a | Retensi | M90 R0 → tunggal **R** (Δ 73) | — |
| A1-3 permintaan > kapasitas pemilik | C1–C3 = a, S1 = a | Kapasitas; S tidak mengubah skor | C0 → tunggal **C** (Δ 73); hasil identik dengan S1 = c | — |
| A1-4 keuangan tidak jelas, kanal banyak | F1–F2 = a, F3 = b, A1–A2 = d | Keuangan tidak tertutup jangkauan | F10 A100 → tunggal **F** (Δ 65) | — |
| A1-5 dua terendah selisih ≤10 | F1–F3 = a, M1–M3 = a | Belum cukup jelas, dua area | F0 M0 → belum jelas (selisih): **F, M** | — |
| A1-5b batas ambang | skor F/M disetel langsung | Δ 10 → belum jelas; Δ 11 → tunggal | Δ 10 → belum jelas; Δ 11 → tunggal F | — |
| A1-6 kategori bersaing < separuh valid | R1–R2 = x, M1–M3 = a | Kekurangan informasi, R bukan bottleneck | R data kurang, M0 → belum jelas (data): **R, M** | — |
| Dasar (usaha sehat merata) | — | Tidak memaksa satu pemenang | F73 R75 → belum jelas (selisih): F, R | Sesuai aturan; lihat Residual Risks |

Perubahan bobot/ambang (AC-08-03): naikkan `SURVEY_CATALOG.version`, lalu
`npm test` mengulang semua kasus di atas. Hasil uji ini bukan validasi
statistik pengguna (AC-08-04).

## Acceptance Criteria Results

| Acceptance Criterion | Test(s) | Evidence | Result |
|---|---|---|---|
| AC-04-01 baca payload browser sama | `survey-storage.test.ts` simpan→baca | Manual: survei selesai → `/diagnosis` menampilkan hasil | PASS |
| AC-04-02 indikator F/M/R/A/C tanpa lulus/gagal | manual | Daftar 5 indikator, skor 0–100 + "Data kurang" | PASS |
| AC-04-03 alasan terkait jawaban | `pendorong (AC-04-03)` | Bagian "Jawaban yang mendorong hasil ini" mengutip soal + jawaban | PASS |
| AC-04-04 S/G hanya konteks | `S dan G tidak memengaruhi skor`, A1-3 | Bagian "Konteks dari Anda" + catatan tidak mengubah skor | PASS |
| AC-04-05 bottleneck tunggal bila syarat terpenuhi | A1-1…A1-4 | Manual: simulasi 1 → "Harga & margin" | PASS |
| AC-04-06 belum jelas (selisih ≤10 / data kurang) | A1-5, A1-5b, A1-6 | Manual: R "Belum tahu" semua → "Belum cukup jelas" R + M | PASS |
| AC-04-07 maks dua langkah + disclaimer | review kode | `Steps`: 2 langkah dari satu area atau 1 per area + catatan bukan jaminan | PASS |
| AC-04-08 tanpa payload → CTA Survey | `survey-storage.test.ts` rusak/kosong | Manual: payload rusak → pesan + "Mulai Survei" `/survey`, kunci terhapus | PASS |
| AC-04-10 isi survei lagi *(usulan)* | manual | Tautan "Isi survei lagi"; submit baru menimpa | PASS (usulan) |
| AC-08-01 kasus mencakup 6 kondisi | `diagnosis.test.ts` | Tabel log di atas | PASS |
| AC-08-02 input/expected/actual/alasan | — | Tabel log di atas | PASS |
| AC-08-03 ubah bobot → ulang kasus | CI `pnpm test` | Versi katalog + test otomatis | PASS |
| AC-08-04 bukan validasi statistik | — | Catatan di log + teks "indikatif" di halaman | PASS |

## Known Deviations

- Katalog sumber (`work-docs/…UMKM.md`) diubah di tiga titik agar patuh PRD
  (ADR-004): aturan data kurang, batas data kurang, S/G tanpa efek.
- Teks soal disederhanakan; bobot tidak berubah.

## Residual Risks

- Usaha yang sehat merata sering keluar "belum cukup jelas" karena dua
  skor terendahnya berdekatan. Benar menurut PRD, tetapi perlu diamati
  apakah pengguna memahaminya.
- Kategori Jangkauan memberi skor rendah pada usaha fisik tanpa jejak
  digital (A2 = b → 40); risiko Jangkauan terlalu sering muncul.
- Durasi 15 soal belum diuji terhadap batas tiga menit (AC-02-02).
- Bobot belum ditinjau pakar.
