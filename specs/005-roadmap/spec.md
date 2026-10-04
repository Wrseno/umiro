# 005 Roadmap Statis (E-05)

**Lifecycle:** SPECIFIED
**Health:** VALID
**Revision:** 4
**Authority:** Turunan `design/PRD draf 5.md` v5.0 untuk unit ini. PRD §8 authoritative untuk ID/AC; bila konflik, PRD menang hingga spec direvisi.

## 1. Purpose

Menyediakan panduan pertumbuhan luas yang mencakup survival dan improvement, bukan hanya ekspansi. Membantu pengguna mendapat langkah survival ketika usaha belum stabil dan memahami langkah improvement tanpa dipaksa mengikuti rencana yang belum sesuai kapasitas. MVP memuat roadmap pertumbuhan UMKM yang luas dan statis: menjelaskan langkah survival, improvement, dan growth, tanpa kelas pengguna, status terkunci, pelacakan progres, atau penyelesaian tindakan.

## 2. Scope

### In Scope

- Roadmap di `/roadmap`: Panduan baca-saja survival, improvement, dan growth untuk empat growth levers; tidak memiliki kelas, status terkunci, atau pelacakan progres.
- Roadmap adalah halaman MVP nyata, bukan bagian tersamar pada Landing atau Diagnosis. Kontennya luas dan statis. Diagnosis menautkan ke `/roadmap` tanpa mengirim parameter filter, skor, atau bottleneck; personalisasi hubungan Diagnosis → Roadmap merupakan future scope AI.
- Tahap pertumbuhan sebagai narasi (salinan §5.2):

| Tahap naratif | Fokus                                                                                      | Contoh keluaran                                                                          |
| ------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Survival      | Menjaga arus kas, mengurangi kebocoran, mengetahui angka dasar, dan mempertahankan operasi | Pisahkan uang, hitung biaya, pilih produk utama, hindari keputusan yang memperbesar rugi |
| Improvement   | Membuat operasi lebih sehat dan berulang                                                   | Tinjau harga, tingkatkan retensi, rapikan proses, uji kanal dengan biaya rendah          |
| Growth        | Meningkatkan jangkauan dan kapasitas secara terkendali                                     | Delegasi, SOP, kanal baru, pengukuran dan eksperimen                                     |

- Tahap ini hanya pengelompokan konten roadmap dan tidak menentukan akses atau perilaku pengguna.
- Empat growth levers sebagai konteks materi:

| Lever                       | Pertanyaan diagnostik                                                           | Contoh intervensi                                   |
| --------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------- |
| Margin & unit economics     | Apakah tiap penjualan menyisakan kontribusi setelah biaya variabel?             | Hitung HPP, tinjau harga, kurangi pemborosan        |
| Retensi & relasi pelanggan  | Apakah pembeli kembali dan mudah dihubungi secara etis?                         | Kualitas produk, pengingat pembelian ulang, layanan |
| Reach & acquisition         | Apakah calon pembeli yang relevan dapat menemukan usaha?                        | Kanal lokal, katalog, kemitraan, konten             |
| Capacity & operating system | Apakah usaha dapat melayani permintaan tanpa seluruh beban berada pada pemilik? | SOP sederhana, batching, pembagian kerja            |

- Roadmap konten statis (Lampiran C salinan):

### Survival

- Pisahkan uang usaha dan rumah tangga.
- Catat biaya utama dan volume penjualan sederhana.
- Hitung biaya per unit untuk produk utama.
- Hentikan kebocoran dan kanal yang jelas-jelas merugikan.
- Jaga kualitas dan ketersediaan produk yang sudah dibeli pelanggan.

### Improvement

- Tinjau harga berdasarkan biaya dan nilai yang diberikan.
- Uji ukuran/paket produk dan kurangi pemborosan.
- Kenali pembeli berulang tanpa spam.
- Rapikan proses produksi, pemesanan, dan pengiriman.
- Uji kanal baru dengan biaya dan indikator sederhana.

### Growth

- Dokumentasikan SOP yang berulang.
- Bagi pekerjaan sebelum menambah permintaan besar.
- Tambah kapasitas setelah unit economics dan proses cukup jelas.
- Pilih kanal, kemitraan, atau produk baru melalui eksperimen terbatas.
- Tinjau angka secara berkala sebelum memperbesar usaha.

- Semua tindakan adalah contoh; prioritas dan kelayakannya bergantung pada konteks pengguna.
- `/roadmap` menampilkan semua bagian dan empat growth levers; konten mencakup langkah biaya rendah, perbaikan operasi, pertumbuhan; bukan pemasaran digital saja; baca-saja tanpa kelas pengguna, state, gate, tracking, atau penilaian otomatis; tindakan adalah opsi kontekstual bukan instruksi universal/jaminan; terbuka dari navigasi atau Diagnosis tanpa hasil Survey; tautan Diagnosis tidak membawa konteks personal; Roadmap tetap konten umum penuh.
- Bahasa roadmap memakai "contoh/langkah yang dapat dicoba", bukan hasil pasti (mitigasi ekspektasi).

### Out of Scope

- Kelas pengguna, status terkunci, pelacakan progres, penyelesaian tindakan, penilaian otomatis.
- Filter/penyaringan/pengurutan/akses berbasis skor, bottleneck, atau jawaban survey pada MVP.
- Personalisasi AI, rekomendasi generatif, mindmap interaktif, tracking progres dan evaluasi longitudinal.

## 3. Actors

- Primer: pemilik usaha mikro yang telah berjalan dan memiliki waktu, modal, serta literasi digital terbatas; prioritas awal dapat berupa usaha kuliner rumahan, tetapi kerangka tidak boleh diklaim berlaku untuk semua sektor sebelum validasi.
- Sekunder: pendamping atau komunitas UMKM yang membutuhkan bahan percakapan, bukan dashboard pemantauan.

## 4. User/System Scenarios

- Given pengguna buka `/roadmap` via navigasi, when baca, then semua Survival, Improvement, Growth dan empat levers tampil penuh.
- Given pengguna klik dari Diagnosis, when buka, then konten sama penuh tanpa filter/parameter.
- Given pengguna pilih materi, when baca tindakan, then paham sebagai opsi kontekstual bukan jaminan.

## 5. Functional Requirements

- FR-001–FR-006 persis mengikuti AC-06-01 s/d 06 seperti di §9.

## 6. Business Rules

- Tahap naratif hanya pengelompokan konten; tidak menentukan akses/perilaku.
- Roadmap statis tidak melacak progres pengguna.
- Semua tindakan contoh; prioritas ikut konteks pengguna.
- Jobs relevan: Mendapat langkah survival ketika usaha belum stabil; Memahami langkah improvement tanpa dipaksa rencana yang belum sesuai kapasitas.

## 7. Non-Functional Requirements

- Roadmap: Pengguna dapat menemukan bagian Survival, Improvement, dan Growth serta satu tindakan yang sesuai konteks — ≥80% dari 5 pengguna.
- Baca nyaman mobile/desktop; layout responsif.

## 8. Constraints

- Tanpa state/tracking; konten umum penuh selalu.
- Keputusan produk: Roadmap statis dan luas, mencakup Survival/Improvement/Growth tanpa kelas, state, atau gate pengguna.
- Bahasa bukan janji hasil pasti.

## 9. Acceptance Criteria

AC §9 mengikuti PRD §8; format Given-When-Then authoritative di PRD.

#### US-06 — Membaca Roadmap umum (MVP · Must)

Sebagai pemilik usaha, saya ingin membaca Survival, Improvement, dan Growth agar dapat memilih materi sendiri.

- AC-06-01: `/roadmap` menampilkan semua bagian dan empat growth levers.
- AC-06-02: Konten mencakup langkah biaya rendah, perbaikan operasi, pertumbuhan; bukan pemasaran digital saja.
- AC-06-03: Baca-saja; tanpa kelas pengguna, state, gate, tracking, atau penilaian otomatis.
- AC-06-04: Tindakan adalah opsi kontekstual, bukan instruksi universal/jaminan.
- AC-06-05: Roadmap terbuka dari navigasi atau Diagnosis tanpa hasil Survey.
- AC-06-06: Tautan Diagnosis tidak membawa konteks personal; Roadmap tetap konten umum penuh.

## 10. Dependencies

- Unit 001: navigasi + rute `/roadmap`.
- Unit 003: tautan biasa tanpa kontrak data.
- Tanpa dependensi skor/jawaban.

## 11. Open Questions

- Perlu divalidasi: apakah pengguna membutuhkan roadmap statis atau format yang lebih ringkas (PRD §12 #5).
- Risiko: Bahasa roadmap dianggap janji → ekspektasi tidak realistis; mitigasi: gunakan "contoh/langkah yang dapat dicoba", bukan hasil pasti.
