# 002 Survey & Persistensi Lokal (E-02)

**Lifecycle:** SPECIFIED
**Health:** VALID
**Revision:** 4
**Authority:** Turunan `design/PRD draf 5.md` v5.0 untuk unit ini. PRD §8 authoritative untuk ID/AC; bila konflik, PRD menang hingga spec direvisi.

## 1. Purpose

Membantu pengguna memberi konteks usaha melalui pertanyaan singkat dengan bahasa sehari-hari, menyimpan jawaban secara lokal sementara, lalu meneruskan ke Diagnosis. UMIRO adalah aplikasi web yang membantu pelaku usaha mikro memahami kondisi usaha, menemukan hambatan pertumbuhan yang paling mendesak, lalu memilih tindakan yang realistis. Produk tidak menjanjikan prediksi keberhasilan.

## 2. Scope

### In Scope

- MVP Survey di `/survey`: Pertanyaan singkat satu per layar, progres, navigasi mundur, dan penyimpanan lokal sementara.
- Pertanyaan mencakup F/M/R/A/C sebagai kategori diagnostik dan S/G sebagai konteks; jumlah final diuji terhadap durasi maksimal tiga menit.
- Kategori keluaran survey (usulan, perlu validasi):

| Kode | Kategori                | Variabel/indikator display                                                    |
| ---- | ----------------------- | ----------------------------------------------------------------------------- |
| F    | Financial clarity       | pemisahan uang, pencatatan, pengetahuan biaya, pengetahuan surplus            |
| M    | Margin & pricing        | cara menentukan harga, biaya per unit, frekuensi review harga, potongan kanal |
| R    | Retention               | pembeli berulang, pengenalan pelanggan, alasan pembelian ulang                |
| A    | Reach                   | sumber pelanggan baru, kanal penjualan, keterlihatan lokal/digital            |
| C    | Capacity                | jam kerja, batas produksi, ketergantungan pada pemilik, bantuan/SOP           |
| S    | Stability & constraints | kestabilan permintaan, modal yang dapat dipakai, waktu tersedia               |
| G    | Goal & direction        | target penghasilan, tujuan utama, horizon keputusan                           |

- F–C adalah dimensi diagnostik utama. S dan G hanya konteks diagnosis pada MVP: S dapat ditampilkan untuk membantu pengguna memahami keterbatasannya, sedangkan G dapat ditampilkan sebagai tujuan pengguna. Keduanya tidak menyaring tindakan, mengubah scoring, mengubah isi, mengubah urutan, atau membatasi akses Financial Calculator/Roadmap pada MVP. Display indicators bukan gate tahap dan bukan bukti bottleneck tunggal. Ambang, bobot, jumlah pertanyaan, serta hubungan indikator dengan bottleneck adalah keputusan rancangan yang harus diuji dan dapat berubah.
- Jawaban tidak hilang ketika pengguna maju atau kembali.
- "Belum tahu/Belum pernah menghitung" tersedia bila relevan dan ditafsirkan sesuai aturan pertanyaan.
- Semua pertanyaan wajib dijawab sebelum submit.
- HPP dan istilah teknis dijelaskan dengan bahasa sehari-hari.
- Jawaban dan versi katalog Survey tersimpan di `localStorage`.
- Setelah jawaban valid, sistem menghitung hasil deterministik dan menyimpan payload berversi.
- Setelah penyimpanan sukses, sistem mengarahkan pengguna ke `/diagnosis`.
- Submit tidak membuka Calculator/Roadmap dan tidak mengirim jawaban ke server/AI pada MVP.
- Kegagalan penyimpanan menampilkan pesan dan tidak menyatakan sukses.
- Opsi Could bila waktu: US-11 transisi Survey (lihat §9).
- Bantuan istilah US-10 berlaku untuk Survey (lihat §9).

### Out of Scope

- Aturan scoring/bottleneck final dan tampilan Diagnosis (unit 003).
- Perhitungan margin/impas/target (unit 004).
- Personalisasi Roadmap, akun, backend persistence, sinkronisasi lintas perangkat, pencatatan transaksi harian, integrasi marketplace/pembayaran, dashboard pendamping, layanan AI.
- Survey tidak membuktikan sebab-akibat dan tidak menetapkan kelayakan bisnis.

## 3. Actors

- Primer: pemilik usaha mikro yang telah berjalan dan memiliki waktu, modal, serta literasi digital terbatas; prioritas awal dapat berupa usaha kuliner rumahan, tetapi kerangka tidak boleh diklaim berlaku untuk semua sektor sebelum validasi.
- Sekunder: pendamping atau komunitas UMKM yang membutuhkan bahan percakapan, bukan dashboard pemantauan.

## 4. User/System Scenarios

- Given pengguna membuka `/survey`, when menjawab satu pertanyaan per layar, then progres terlihat, tombol Kembali tersedia, jawaban bertahan saat maju/mundur.
- Given pengguna tidak tahu biaya, when memilih "Belum tahu/Belum pernah menghitung", then jawaban ditafsirkan sesuai aturan pertanyaan, bukan dipaksa skor palsu.
- Given semua pertanyaan wajib terjawab valid, when submit, then jawaban + versi katalog tersimpan di `localStorage`, hasil deterministik dihitung, payload berversi disimpan, pengguna diarahkan ke `/diagnosis`.
- Given penyimpanan gagal, when submit, then pesan tampil dan sistem tidak menyatakan sukses.
- Given pengguna membuka Calculator/Roadmap langsung, when tanpa Survey, then kedua halaman tetap dapat dibuka (tanpa hasil Survey).

## 5. Functional Requirements

- FR-001: Survey menampilkan satu pertanyaan per layar, progres, tombol Kembali, dan pilihan jawaban.
- FR-002: Pertanyaan mencakup F/M/R/A/C diagnostik dan S/G konteks.
- FR-003: Jawaban bertahan saat maju/mundur.
- FR-004: Opsi belum-tahu tersedia bila relevan dengan tafsir per aturan pertanyaan.
- FR-005: Semua wajib dijawab sebelum submit.
- FR-006: HPP/istilah teknis berbahasa sehari-hari.
- FR-007: Jawaban + versi katalog tersimpan di `localStorage`; gagal simpan tampil pesan tanpa klaim sukses.
- FR-008: Hasil deterministik dihitung + payload berversi disimpan + redirect `/diagnosis`; tidak buka Calculator/Roadmap; tidak kirim ke server/AI.

## 6. Business Rules

- S/G hanya konteks; pada MVP tidak mengubah skor, Calculator, atau Roadmap.
- Skor indikator diagnostik F/M/R/A/C rentang internal 0–100; arah skor dan bobot tiap jawaban ditetapkan dalam katalog soal yang terversi. Nilai numerik, bobot, dan ambang hipotesis yang perlu diuji, bukan validasi statistik.
- Payload rusak/tidak dikenal: sistem mengabaikannya dengan aman, menghapus payload rusak, dan meminta pengguna mengulang survey bila perlu.
- Hasil disimpan pada `localStorage` atau browser storage lokal, bukan cookie, dan tidak menyediakan sinkronisasi lintas browser/perangkat atau pemulihan setelah data lokal dihapus.
- Jobs relevan:Mengetahui apakah penjualan yang ramai menghasilkan margin yang cukup; Menemukan area usaha yang perlu diperiksa lebih dulu.
- Hipotesis awal yang melatari pertanyaan (bukan fakta terbukti): uang usaha/rumah tangga tercampur; harga tanpa pahami biaya/margin; kapasitas bergantung waktu pemilik; pembeli berulang belum dikelola; jangkauan bertambah sebelum fondasi siap; tidak ada pencatatan sederhana.

## 7. Non-Functional Requirements

- Penyelesaian: Pengguna uji menyelesaikan Survey tanpa bantuan ≥80% dari 5 pengguna.
- Keandalan lokal: Hasil tetap tersedia setelah berpindah halaman pada browser yang sama — 100% pengujian manual.
- Kejelasan batasan: Pengguna memahami hasil lokal hilang jika data situs dihapus atau browser/perangkat diganti — 100% pengguna uji memahami.
- Jumlah final soal diuji terhadap durasi maksimal tiga menit.
- Layout responsif mobile/desktop.

## 8. Constraints

- Next.js App Router dan TypeScript. Tailwind CSS dan shadcn/ui bila sudah tersedia; tidak menambah dependency tanpa kebutuhan.
- Scoring berjalan lokal/deterministik. Tidak ada Neon/Postgres, Route Handler, identitas anonim, API key, atau layanan AI untuk MVP.
- `localStorage` menyimpan jawaban survey, ringkasan diagnosis, dan hasil kalkulator dalam payload berversi dan berukuran terbatas.
- Pengguna diberi tahu data hanya tersedia pada browser yang sama dan dapat hilang saat data situs dibersihkan atau mode privat ditutup. Tidak ada data sensitif yang dikirim ke server pada MVP.
- Build quality gate: lint, typecheck, unit test rumus kalkulator, dan production build.
- Ambang, bobot, jumlah pertanyaan, serta hubungan indikator dengan bottleneck harus diuji dan dapat berubah. Perubahan bobot atau ambang memicu pengulangan kasus uji terkait.

## 9. Acceptance Criteria

AC §9 mengikuti PRD §8; format Given-When-Then authoritative di PRD.

#### US-02 — Mengisi Survey (MVP · Must)

Sebagai pemilik usaha, saya ingin menjawab pertanyaan singkat dengan bahasa sehari-hari agar dapat memberi konteks usaha.

- AC-02-01: Survey menampilkan satu pertanyaan per layar, progres, tombol Kembali, dan pilihan jawaban.
- AC-02-02: Pertanyaan mencakup F/M/R/A/C sebagai kategori diagnostik dan S/G sebagai konteks; jumlah final diuji terhadap durasi maksimal tiga menit.
- AC-02-03: Jawaban tidak hilang ketika pengguna maju atau kembali.
- AC-02-04: "Belum tahu/Belum pernah menghitung" tersedia bila relevan dan ditafsirkan sesuai aturan pertanyaan.
- AC-02-05: Semua pertanyaan wajib dijawab sebelum submit.
- AC-02-06: HPP dan istilah teknis dijelaskan dengan bahasa sehari-hari.

#### US-03 — Menyimpan Survey dan menuju Diagnosis (MVP · Must)

Sebagai pengguna, saya ingin jawaban tersimpan lalu melihat diagnosis langsung.

- AC-03-01: Jawaban dan versi katalog Survey tersimpan di `localStorage`.
- AC-03-02: Kegagalan penyimpanan menampilkan pesan dan tidak menyatakan sukses.
- AC-03-03: Setelah jawaban valid, sistem menghitung hasil deterministik dan menyimpan payload berversi.
- AC-03-04: Setelah penyimpanan sukses, sistem mengarahkan pengguna ke `/diagnosis`.
- AC-03-05: Submit tidak membuka Calculator/Roadmap dan tidak mengirim jawaban ke server/AI pada MVP.

#### US-11 — Menggunakan transisi Survey (MVP bila waktu · Could)

Sebagai pengguna, saya ingin transisi antarpertanyaan yang tidak mengganggu agar orientasi Survey lebih mudah.

- AC-11-01: Transisi tidak mengubah jawaban, progres, validasi, atau urutan pertanyaan.
- AC-11-02: Pengguna dapat menyelesaikan Survey tanpa menunggu animasi.
- AC-11-03: Animasi dapat dihentikan atau dihormati saat reduced motion aktif.

#### US-10 — Memahami istilah dan contoh pengisian (MVP bila waktu · Should, bagian Survey)

Sebagai pengguna dengan literasi bisnis terbatas, saya ingin mendapat bantuan istilah dan contoh agar dapat menjawab Survey serta membaca Calculator dengan benar.

- AC-10-01: Istilah HPP, margin kontribusi, dan titik impas memiliki penjelasan singkat saat pertama digunakan.
- AC-10-02: Contoh pengisian tidak dianggap sebagai jawaban pengguna dan dapat ditutup.
- AC-10-03: Bantuan tidak mengubah scoring atau hasil kalkulator.

#### US-08 — Memverifikasi aturan diagnosis dan scoring (MVP · Must, berlaku untuk Survey sebagai sumber input)

Sebagai tim produk, saya ingin menguji aturan diagnosis pada kasus terkontrol agar hasil deterministik dapat dijelaskan sebelum digunakan.

- AC-08-01: Kasus uji mencakup margin nol/negatif, retensi rendah, kapasitas terbatas, keuangan tidak jelas, seri skor dekat, dan data tidak cukup.
- AC-08-02: Setiap kasus mencatat input, hasil yang diharapkan, hasil aktual, dan alasan perbedaan.
- AC-08-03: Perubahan bobot atau ambang memicu pengulangan kasus uji terkait.
- AC-08-04: Hasil uji tidak dipresentasikan sebagai validasi statistik pengguna.

## 10. Dependencies

- Unit 001: redirect target `/diagnosis`; navigasi global.
- Unit 003: konsumen payload Survey valid.
- Katalog soal terversi + ADR scoring (belum ada): blokir finalisasi bobot/ambang.

## 11. Open Questions

- Jumlah pertanyaan dan bobot yang menghasilkan sinyal berguna dalam tiga menit (PRD §12 perlu divalidasi #2).
- Apakah tujuh kategori F/M/R/A/C/S/G dipahami pengguna (PRD §12 #1).
- Risiko: Survey terlalu panjang → penyelesaian turun; mitigasi: uji waktu, kurangi pertanyaan, pertahankan coverage kategori.
- Risiko: Data lokal dihapus/incognito/perangkat berganti → hasil tidak tersedia; mitigasi: pesan batasan jelas; gunakan `localStorage`; jangan klaim recovery.
