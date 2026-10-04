# 003 Diagnosis Indikatif (E-03)

**Lifecycle:** SPECIFIED
**Health:** VALID
**Revision:** 5
**Authority:** Turunan `design/PRD draf 5.md` v5.0 untuk unit ini. PRD §8 authoritative untuk ID/AC; bila konflik, PRD menang hingga spec direvisi.

## 1. Purpose

Membantu pengguna membaca kondisi usaha dalam bahasa sederhana, menunjukkan satu indikator bottleneck utama berdasarkan jawaban survey dengan penjelasan indikatif, dan memberi langkah awal yang dapat dilakukan tanpa mengasumsikan modal besar. Produk tidak menjanjikan prediksi keberhasilan. Kerangka diagnosis dan kategori keluaran merupakan usulan produk yang masih perlu divalidasi melalui wawancara dan uji penggunaan.

## 2. Scope

### In Scope

- Diagnosis di `/diagnosis`: Menampilkan ringkasan indikator, bottleneck indikatif, alasan, ketidakpastian bila ada, dan langkah awal. Memuat tautan ke roadmap dan kalkulator.
- Diagnosis menampilkan satu bottleneck indikatif: area dengan sinyal risiko paling kuat atau data paling tidak jelas menurut aturan scoring yang dapat ditinjau. Jika skor berdekatan atau data tidak cukup, UI harus menyatakan ketidakpastian dan menampilkan area yang perlu diperiksa, bukan mengklaim kepastian.
- Output Diagnosis:
  1. Ringkasan indikator per kategori, tanpa label "lulus/gagal".
  2. Satu bottleneck indikatif atau pernyataan "belum cukup jelas".
  3. Alasan berbasis jawaban pengguna.
  4. Dua atau tiga langkah awal berbiaya rendah bila tersedia.
  5. Tautan ke kalkulator dan bagian roadmap yang relevan.
- Aturan: Diagnosis membaca payload Survey valid dari `localStorage` browser yang sama; menampilkan indikator F/M/R/A/C tanpa label lulus/gagal; setiap indikator yang mendasari hasil dikaitkan dengan jawaban/sinyal sumber; S/G hanya konteks dan tidak mengubah skor, Calculator, atau Roadmap; bottleneck tunggal tampil hanya jika syarat data dan selisih skor terpenuhi; jika selisih dua skor teratas ≤10 atau data valid kategori bersaing kurang dari separuh indikator, tampil "belum cukup jelas" dan maksimal dua area pemeriksaan; tampilkan maksimal dua langkah awal beserta alasan dan disclaimer bukan jaminan; tanpa payload valid tampil CTA Survey bukan skor default; tautan Calculator/Roadmap tidak membawa parameter atau personalisasi.
- Empat growth levers sebagai lensa penjelasan, bukan persamaan finansial presisi:

| Lever                       | Pertanyaan diagnostik                                                           | Contoh intervensi                                   |
| --------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------- |
| Margin & unit economics     | Apakah tiap penjualan menyisakan kontribusi setelah biaya variabel?             | Hitung HPP, tinjau harga, kurangi pemborosan        |
| Retensi & relasi pelanggan  | Apakah pembeli kembali dan mudah dihubungi secara etis?                         | Kualitas produk, pengingat pembelian ulang, layanan |
| Reach & acquisition         | Apakah calon pembeli yang relevan dapat menemukan usaha?                        | Kanal lokal, katalog, kemitraan, konten             |
| Capacity & operating system | Apakah usaha dapat melayani permintaan tanpa seluruh beban berada pada pemilik? | SOP sederhana, batching, pembagian kerja            |

- Keempat lever saling memengaruhi. Tidak ada urutan universal bahwa margin selalu harus dibenahi lebih dahulu. Produk dapat menampilkan margin sebagai prioritas bila indikator data menunjukkan risiko, tetapi keputusan akhir harus dijelaskan sebagai rekomendasi berbasis aturan dan perlu diuji pada pengguna.
- Proposal scoring dan output (Lampiran A):
  1. Skor indikator diagnostik pada kategori F/M/R/A/C berada pada rentang internal 0–100; definisi arah skor dan bobot setiap jawaban ditetapkan dalam katalog soal yang terversi. Nilai numerik, bobot, dan ambang tetap hipotesis yang perlu diuji, bukan validasi statistik.
  2. Pada MVP, S dan G tidak menyaring atau mengurutkan rekomendasi. Data S/G dapat ditampilkan sebagai konteks jawaban saja.
  3. Saran diagnosis adalah langkah awal berbasis aturan dan indikator; bukan personalisasi Roadmap. Halaman Roadmap tetap menampilkan isi umum statis.
  4. Financial Calculator tidak menerima nilai otomatis dari Survey atau Diagnosis; semua input dimasukkan pengguna.
- Aturan bottleneck awal: pilih kategori diagnostik dengan skor terendah hanya jika terdapat cukup data yang terjawab dan selisih skor terendah dengan skor berikutnya lebih besar dari 10 poin. Jika selisih ≤10 poin, atau jawaban valid kurang dari separuh indikator kategori mana pun yang bersaing, tampilkan "belum cukup jelas" beserta maksimal dua area yang perlu diperiksa; jangan paksa satu pemenang. S dan G tidak mengubah skor diagnostik. Skala, bobot, ambang selisih, dan kecukupan data adalah hipotesis rancangan yang harus diuji, bukan nilai tervalidasi.
- Rujukan Churchill–Lewis: Model _The Five Stages of Small-Business Growth_ karya Neil C. Churchill dan Virginia L. Lewis diterbitkan di _Harvard Business Review_ pada 1983. Artikel aslinya menggunakan istilah _small business_, bukan klasifikasi hukum UMKM Indonesia berdasarkan batas omzet atau jumlah karyawan. Skala dianalisis melalui ukuran usaha, keragaman, kompleksitas manajemen, struktur organisasi, sistem formal, tujuan strategis, dan keterlibatan pemilik. Dalam konteks UMIRO, model ini dapat dipakai sebagai rujukan konseptual untuk membaca rentang perjalanan usaha dari mikro hingga menengah, bukan sebagai bukti bahwa setiap tahap setara secara hukum dengan kategori Mikro, Kecil, atau Menengah. Pemetaan mikro–kecil–menengah tersebut adalah interpretasi praktis lintas konteks, bukan klasifikasi yang dinyatakan secara eksplisit oleh Churchill dan Lewis. Usaha dapat melompati, berhenti, kembali, atau berkembang tidak linear antar tahap. Karena itu, UMIRO tidak boleh menyimpulkan skala hukum usaha, kelayakan kredit, atau status formal hanya dari jawaban survey. Sumber utama model adalah artikel HBR asli (Churchill & Lewis, 1983). Pemetaan ini perlu diuji melalui wawancara dan review ahli UMKM sebelum dipakai sebagai logika diagnosis.
- Verifikasi US-08 berlaku penuh untuk unit ini (lihat §9).

### Out of Scope

- Mengubah isi/filter/urutan Roadmap; membaca/menulis Calculator; personalisasi AI; akun/sinkron; klasifikasi hukum/kelayakan kredit/pajak/kepatuhan.
- Diagnosis bukan audit keuangan, konsultan, atau keputusan kredit.

## 3. Actors

- Primer: pemilik usaha mikro yang telah berjalan dan memiliki waktu, modal, serta literasi digital terbatas; prioritas awal dapat berupa usaha kuliner rumahan, tetapi kerangka tidak boleh diklaim berlaku untuk semua sektor sebelum validasi.
- Sekunder: pendamping atau komunitas UMKM yang membutuhkan bahan percakapan, bukan dashboard pemantauan.

## 4. User/System Scenarios

- Given payload Survey valid tersedia di browser yang sama, when pengguna buka `/diagnosis`, then ringkasan indikator F/M/R/A/C tampil tanpa lulus/gagal, bottleneck indikatif atau "belum cukup jelas" tampil beserta alasan dan maksimal dua langkah awal + disclaimer, tautan kalkulator/roadmap tampil tanpa parameter.
- Given selisih dua skor teratas ≤10 atau data valid kategori bersaing kurang dari separuh indikator, when render, then tampil "belum cukup jelas" dan maksimal dua area pemeriksaan; jangan tetapkan bottleneck tunggal.
- Given tanpa payload valid, when buka `/diagnosis`, then tampil CTA Survey, bukan skor default.
- Given S/G tersedia, when tampil, then hanya konteks tujuan/keterbatasan; tidak mengubah skor.

## 5. Functional Requirements

- FR-001: Baca payload Survey valid dari `localStorage` browser yang sama.
- FR-002: Tampilkan indikator F/M/R/A/C tanpa label lulus/gagal.
- FR-003: Kaitkan tiap indikator pendorong dengan jawaban/sinyal sumber.
- FR-004: Perlakukan S/G sebagai konteks; tidak mengubah skor, Calculator, Roadmap.
- FR-005: Tampilkan bottleneck tunggal hanya bila syarat data dan selisih skor terpenuhi (selisih >10 + data cukup).
- FR-006: Bila tie/data kurang, tampil "belum cukup jelas" + maksimal dua area.
- FR-007: Tampilkan maksimal dua langkah awal + alasan + disclaimer bukan jaminan.
- FR-008: Tanpa payload valid tampil CTA Survey.
- FR-009: Tautan Calculator/Roadmap tanpa parameter/personalisasi.

## 6. Business Rules

- F–C dimensi diagnostik utama; S/G konteks saja.
- Aturan bottleneck awal persis seperti kutipan Scope di atas.
- Tahap Churchill–Lewis hanya rujukan konseptual; bukan aturan scoring atau klasifikasi hukum.
- Keuangan tidak jelas tidak boleh ditutupi jangkauan tinggi; margin nol/negatif prioritaskan pemeriksaan biaya bukan promosi; S menyaring tindakan menurut waktu/modal, bukan mengubah skor.
- Jobs relevan: Menemukan area usaha yang perlu diperiksa lebih dulu; Mendapat langkah survival ketika usaha belum stabil; Memahami langkah improvement tanpa dipaksa rencana yang belum sesuai kapasitas.

## 7. Non-Functional Requirements

- Pemahaman: Pengguna dapat menjelaskan bottleneck sebagai indikasi, bukan kepastian — ≥80% dari 5 pengguna.
- Relevansi: Pengguna menilai minimal satu langkah awal relevan dan realistis — ≥4 dari 5 pengguna.
- Deterministik: input sama → hasil sama; dapat dijelaskan dari jawaban.
- Validasi jangka panjang, dampak rupiah, akurasi bottleneck, dan peningkatan pendapatan belum dapat diklaim dari MVP.

## 8. Constraints

- Kerangka, bobot, ambang belum tervalidasi; labeli sebagai usulan, uji 5–10 pengguna, revisi setelah bukti.
- Uji kasus sintetis + peninjauan pakar wajib sebelum scoring dipakai pengguna. Kasus minimum: penjualan baik dengan margin nol/negatif; margin positif tanpa pembelian ulang; permintaan melebihi kapasitas pemilik; jangkauan tinggi tetapi keuangan tidak jelas; dua kategori sama-sama lemah; serta jawaban tidak cukup untuk membedakan kategori. Catat jawaban yang diharapkan dan alasan tiap kasus; revisi aturan bila hasil tidak dapat dijelaskan. Uji pengguna 5–10 orang menilai pemahaman dan kegunaan, bukan membuktikan validitas statistik model.
- Perubahan bobot atau ambang memicu pengulangan kasus uji terkait.
- Teknologi: Next.js App Router + TypeScript; scoring lokal/deterministik; tanpa AI/server untuk MVP; quality gate lint/typecheck/unit test/build.

## 9. Acceptance Criteria

AC §9 mengikuti PRD §8; format Given-When-Then authoritative di PRD.

#### US-04 — Membaca Diagnosis dan uncertainty (MVP · Must)

Sebagai pemilik usaha, saya ingin memahami indikator dan area yang perlu diperiksa tanpa klaim kepastian palsu.

- AC-04-01: Diagnosis membaca payload Survey valid dari `localStorage` browser yang sama.
- AC-04-02: Diagnosis menampilkan indikator F/M/R/A/C tanpa label lulus/gagal.
- AC-04-03: Setiap indikator yang mendasari hasil dikaitkan dengan jawaban/sinyal sumber.
- AC-04-04: S/G hanya konteks; pada MVP tidak mengubah skor, Calculator, atau Roadmap.
- AC-04-05: Bottleneck tunggal tampil hanya jika syarat data dan selisih skor terpenuhi.
- AC-04-06: Jika selisih dua skor teratas ≤10 atau data valid kategori bersaing kurang dari separuh indikator, tampil "belum cukup jelas" dan maksimal dua area pemeriksaan.
- AC-04-07: Tampilkan maksimal dua langkah awal beserta alasan dan disclaimer bukan jaminan.
- AC-04-08: Tanpa payload valid, tampil CTA Survey, bukan skor default.
- AC-04-09: Tautan Calculator/Roadmap tidak membawa parameter atau personalisasi.

#### US-08 — Memverifikasi aturan diagnosis dan scoring (MVP · Must)

Sebagai tim produk, saya ingin menguji aturan diagnosis pada kasus terkontrol agar hasil deterministik dapat dijelaskan sebelum digunakan.

- AC-08-01: Kasus uji mencakup margin nol/negatif, retensi rendah, kapasitas terbatas, keuangan tidak jelas, seri skor dekat, dan data tidak cukup.
- AC-08-02: Setiap kasus mencatat input, hasil yang diharapkan, hasil aktual, dan alasan perbedaan.
- AC-08-03: Perubahan bobot atau ambang memicu pengulangan kasus uji terkait.
- AC-08-04: Hasil uji tidak dipresentasikan sebagai validasi statistik pengguna.

Lampiran A1 — Kasus uji aturan diagnosis (salinan):

| Kasus                                                         | Hasil yang diharapkan                                                                                 |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Margin kontribusi nol/negatif dan jangkauan tinggi            | Prioritaskan pemeriksaan margin/biaya; jangan menyarankan penambahan promosi sebagai langkah pertama. |
| Margin positif tetapi pelanggan jarang kembali                | Tampilkan sinyal retensi bila lebih kuat daripada kategori diagnostik lain.                           |
| Permintaan melebihi kemampuan produksi pemilik                | Tampilkan sinyal kapasitas; S menyaring tindakan menurut waktu/modal, bukan mengubah skor kategori.   |
| Keuangan tidak jelas sementara kanal penjualan banyak         | Jangan biarkan jangkauan tinggi menutupi sinyal keuangan yang kuat.                                   |
| Dua kategori memiliki skor terendah dengan selisih ≤10        | Tampilkan "belum cukup jelas" dan dua area untuk diperiksa; jangan tetapkan bottleneck tunggal.       |
| Jawaban kategori bersaing kurang dari separuh indikator valid | Tampilkan kekurangan informasi dan jangan tetapkan kategori itu sebagai bottleneck.                   |

## 10. Dependencies

- Unit 002: payload Survey valid + versi katalog.
- Unit 001: navigasi + CTA fallback.
- Unit 004/005: target tautan biasa tanpa kontrak data.
- ADR scoring + katalog soal terversi + review pakar (belum ada).

## 11. Open Questions

- Perlu divalidasi: apakah satu bottleneck indikatif membantu tanpa kepastian palsu; ambang dan aturan tie/uncertainty paling dapat dipertanggungjawabkan.
- Risiko: Bottleneck tunggal terlalu menyederhanakan → saran salah prioritas; mitigasi: tampilkan alasan dan ketidakpastian; sediakan indikator lain.
- Risiko: Kerangka dan bobot belum tervalidasi → diagnosis tidak relevan; mitigasi: labeli usulan, uji 5–10 pengguna, revisi setelah bukti.
