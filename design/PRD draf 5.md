# Dokumen Persyaratan Produk (PRD) — UMIRO (Usaha Mikro dan Growth)

| Atribut             | Keterangan                                                                          |
| ------------------- | ----------------------------------------------------------------------------------- |
| Nama Produk         | UMIRO (Usaha Mikro dan Growth)                                                      |
| Kompetisi           | SIFest Digital Innovation Challenge 2026                                            |
| Track               | Digital Economy                                                                     |
| Versi               | 5.0                                                                                 |
| Status              | Draf 5 — siap ditinjau; kerangka diagnosis dan ambang masih perlu validasi lapangan |
| Terakhir Diperbarui | 4 Oktober 2026                                                                      |

## 1. Ringkasan Eksekutif

UMIRO adalah aplikasi web yang membantu pelaku usaha mikro memahami kondisi usaha, menemukan hambatan pertumbuhan yang paling mendesak, lalu memilih tindakan yang realistis. Produk tidak menjanjikan prediksi keberhasilan. Kerangka diagnosis dan kategori keluaran di bawah ini merupakan **usulan produk yang masih perlu divalidasi** melalui wawancara dan uji penggunaan.

MVP terdiri dari lima halaman: Landing, Survey, Diagnosis, Financial Calculator, dan Roadmap. Survey menyimpan jawaban dan ringkasan diagnosis pada `localStorage` browser. Hanya Survey → Diagnosis yang memiliki alur langsung: setelah submit valid, pengguna diarahkan ke Diagnosis. Financial Calculator dan Roadmap tidak membaca atau mengubah hasil diagnosis pada MVP; keduanya dibuka melalui tautan biasa atau navigasi.

MVP juga memuat roadmap pertumbuhan UMKM yang luas dan statis. Roadmap menjelaskan langkah survival, improvement, dan growth, tanpa kelas pengguna, status terkunci, pelacakan progres, atau penyelesaian tindakan. Halaman AI Recommendation dan UMKM Mindmap berada di luar MVP. Conversational AI yang memahami topik roadmap serta jawaban survey/indikator diagnosis adalah kemampuan masa depan yang dipertimbangkan, bukan fitur MVP dan bukan Won't Have.

## 2. Pernyataan Masalah

Sebagian pelaku usaha mikro sudah berjualan dan memiliki pembeli, tetapi penghasilan atau kapasitasnya stagnan. Mereka menerima banyak saran umum, sementara belum tahu apakah hambatan utama berada pada uang, margin, pelanggan, jangkauan, atau kapasitas. Klaim mengenai prevalensi dan penyebab masalah ini adalah hipotesis yang memerlukan validasi, bukan fakta yang telah terbukti oleh produk.

Hipotesis awal:

1. Uang usaha dan rumah tangga tercampur sehingga omzet dianggap keuntungan.
2. Harga ditetapkan tanpa memahami biaya dan margin.
3. Kapasitas masih bergantung pada waktu pemilik.
4. Pembeli berulang belum dikenali atau dikelola.
5. Jangkauan bertambah sebelum fondasi usaha siap.
6. Tidak ada pencatatan sederhana untuk membandingkan perubahan.

Validasi awal dilakukan melalui wawancara 5–10 pelaku usaha mikro dan pengujian prototipe. Hasil validasi harus dipisahkan dari hipotesis ini dan tidak boleh dipresentasikan sebagai temuan umum tanpa sumber.

## 3. Tujuan dan Batasan Produk

### 3.1 Tujuan

- Membantu pengguna membaca kondisi usaha dalam bahasa sederhana.
- Menunjukkan satu **indikator bottleneck utama** berdasarkan jawaban survey, dengan penjelasan bahwa hasil bersifat indikatif.
- Memberi langkah awal yang dapat dilakukan tanpa mengasumsikan modal besar.
- Membantu pengguna menghitung margin, titik impas, dan kebutuhan penjualan berdasarkan angka yang mereka masukkan.
- Menyediakan panduan pertumbuhan luas yang mencakup survival dan improvement, bukan hanya ekspansi.

### 3.2 Batasan

- Diagnosis bukan audit keuangan, konsultan, atau keputusan kredit.
- Survey tidak membuktikan sebab-akibat dan tidak menetapkan kelayakan bisnis.
- Hasil disimpan pada `localStorage` atau browser storage lokal, bukan cookie, dan tidak menyediakan sinkronisasi lintas browser/perangkat atau pemulihan setelah data lokal dihapus.
- Produk tidak menentukan klasifikasi hukum UMKM, kelayakan kredit, kewajiban pajak, atau kepatuhan regulasi.
- Roadmap statis tidak melacak progres pengguna.
- MVP tidak mengirim jawaban atau hasil ke layanan AI eksternal.

## 4. Target Pengguna dan Kebutuhan

Pengguna primer: pemilik usaha mikro yang telah berjalan dan memiliki waktu, modal, serta literasi digital terbatas; prioritas awal dapat berupa usaha kuliner rumahan, tetapi kerangka tidak boleh diklaim berlaku untuk semua sektor sebelum validasi.

Pengguna sekunder: pendamping atau komunitas UMKM yang membutuhkan bahan percakapan, bukan dashboard pemantauan.

Jobs-to-be-done:

1. Mengetahui apakah penjualan yang ramai menghasilkan margin yang cukup.
2. Menemukan area usaha yang perlu diperiksa lebih dulu.
3. Mengubah target penghasilan menjadi angka yang bisa dihitung.
4. Mendapat langkah survival ketika usaha belum stabil.
5. Memahami langkah improvement tanpa dipaksa mengikuti rencana yang belum sesuai kapasitas.

## 5. Kerangka Konseptual (Usulan, Perlu Validasi)

### 5.1 Empat growth levers

Empat lever digunakan sebagai lensa penjelasan, bukan persamaan finansial presisi:

| Lever                       | Pertanyaan diagnostik                                                           | Contoh intervensi                                   |
| --------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------- |
| Margin & unit economics     | Apakah tiap penjualan menyisakan kontribusi setelah biaya variabel?             | Hitung HPP, tinjau harga, kurangi pemborosan        |
| Retensi & relasi pelanggan  | Apakah pembeli kembali dan mudah dihubungi secara etis?                         | Kualitas produk, pengingat pembelian ulang, layanan |
| Reach & acquisition         | Apakah calon pembeli yang relevan dapat menemukan usaha?                        | Kanal lokal, katalog, kemitraan, konten             |
| Capacity & operating system | Apakah usaha dapat melayani permintaan tanpa seluruh beban berada pada pemilik? | SOP sederhana, batching, pembagian kerja            |

Keempat lever saling memengaruhi. Tidak ada urutan universal bahwa margin selalu harus dibenahi lebih dahulu. Produk dapat menampilkan margin sebagai prioritas bila indikator data menunjukkan risiko, tetapi keputusan akhir harus dijelaskan sebagai rekomendasi berbasis aturan dan perlu diuji pada pengguna.

### 5.2 Tahap pertumbuhan sebagai narasi

Roadmap memakai tiga tahap naratif berikut agar cakupannya mudah dipahami:

| Tahap naratif | Fokus                                                                                      | Contoh keluaran                                                                          |
| ------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Survival      | Menjaga arus kas, mengurangi kebocoran, mengetahui angka dasar, dan mempertahankan operasi | Pisahkan uang, hitung biaya, pilih produk utama, hindari keputusan yang memperbesar rugi |
| Improvement   | Membuat operasi lebih sehat dan berulang                                                   | Tinjau harga, tingkatkan retensi, rapikan proses, uji kanal dengan biaya rendah          |
| Growth        | Meningkatkan jangkauan dan kapasitas secara terkendali                                     | Delegasi, SOP, kanal baru, pengukuran dan eksperimen                                     |

Tahap ini hanya pengelompokan konten roadmap dan tidak menentukan akses atau perilaku pengguna.

### 5.2a Rujukan Churchill–Lewis dan konteks skala UMKM

Model _The Five Stages of Small-Business Growth_ karya Neil C. Churchill dan Virginia L. Lewis diterbitkan di _Harvard Business Review_ pada 1983. Artikel aslinya menggunakan istilah _small business_, bukan klasifikasi hukum UMKM Indonesia berdasarkan batas omzet atau jumlah karyawan. Skala dianalisis melalui ukuran usaha, keragaman, kompleksitas manajemen, struktur organisasi, sistem formal, tujuan strategis, dan keterlibatan pemilik.

Dalam konteks UMIRO, model ini dapat dipakai sebagai **rujukan konseptual untuk membaca rentang perjalanan usaha dari mikro hingga menengah**, bukan sebagai bukti bahwa setiap tahap setara secara hukum dengan kategori Mikro, Kecil, atau Menengah:

| Tahap Churchill–Lewis | Kecenderungan konteks UMKM                                                                                            | Relevansi terhadap UMIRO                                                                               |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Existence             | Sering menyerupai usaha mikro yang sedang membuktikan produk, pelanggan, dan arus kas.                                | Menjadi konteks tambahan, tetapi pengguna primer UMIRO umumnya sudah berjualan.                        |
| Survival              | Sering menyerupai usaha mikro yang sudah memiliki pelanggan dan berfokus menjaga arus kas serta kelangsungan operasi. | Sangat relevan untuk isi roadmap dan masalah utama produk.                                             |
| Success               | Dapat mencerminkan usaha kecil yang sudah stabil, menghasilkan laba, dan mulai mendelegasikan pekerjaan.              | Relevan untuk materi improvement dan kesiapan sistem, tetapi tidak dipakai sebagai label hasil survey. |
| Take-off              | Dapat mencerminkan usaha yang mulai memperbesar penjualan, kapasitas, modal, dan struktur manajemen.                  | Relevan untuk materi growth yang terkendali; bukan target wajib semua pengguna.                        |
| Resource Maturity     | Dapat menyerupai usaha menengah yang memiliki sistem, sumber daya, dan manajemen lebih formal.                        | Menjadi konteks lanjutan roadmap, bukan sasaran MVP atau klaim kondisi pengguna.                       |

Pemetaan mikro–kecil–menengah tersebut adalah **interpretasi praktis lintas konteks**, bukan klasifikasi yang dinyatakan secara eksplisit oleh Churchill dan Lewis. Usaha dapat melompati, berhenti, kembali, atau berkembang tidak linear antar tahap. Karena itu, UMIRO tidak boleh menyimpulkan skala hukum usaha, kelayakan kredit, atau status formal hanya dari jawaban survey.

Sumber utama model adalah artikel HBR asli (Churchill & Lewis, 1983). Sumber sekunder dapat menjelaskan penerapannya di Indonesia, tetapi tidak membuktikan validitas instrumen scoring UMIRO. Pemetaan ini perlu diuji melalui wawancara dan review ahli UMKM sebelum dipakai sebagai logika diagnosis.

### 5.3 Bottleneck dan indikator

Diagnosis menampilkan satu bottleneck **indikatif**: area dengan sinyal risiko paling kuat atau data paling tidak jelas menurut aturan scoring yang dapat ditinjau. Jika skor berdekatan atau data tidak cukup, UI harus menyatakan ketidakpastian dan menampilkan area yang perlu diperiksa, bukan mengklaim kepastian.

### 5.4 Kategori keluaran survey

Survey mengusulkan tujuh kategori berikut:

| Kode | Kategori                | Variabel/indikator display                                                    |
| ---- | ----------------------- | ----------------------------------------------------------------------------- |
| F    | Financial clarity       | pemisahan uang, pencatatan, pengetahuan biaya, pengetahuan surplus            |
| M    | Margin & pricing        | cara menentukan harga, biaya per unit, frekuensi review harga, potongan kanal |
| R    | Retention               | pembeli berulang, pengenalan pelanggan, alasan pembelian ulang                |
| A    | Reach                   | sumber pelanggan baru, kanal penjualan, keterlihatan lokal/digital            |
| C    | Capacity                | jam kerja, batas produksi, ketergantungan pada pemilik, bantuan/SOP           |
| S    | Stability & constraints | kestabilan permintaan, modal yang dapat dipakai, waktu tersedia               |
| G    | Goal & direction        | target penghasilan, tujuan utama, horizon keputusan                           |

F–C adalah dimensi diagnostik utama. S dan G hanya konteks diagnosis pada MVP: S dapat ditampilkan untuk membantu pengguna memahami keterbatasannya, sedangkan G dapat ditampilkan sebagai tujuan pengguna. Keduanya tidak menyaring tindakan, mengubah scoring, mengubah isi, mengubah urutan, atau membatasi akses Financial Calculator/Roadmap pada MVP. Display indicators bukan gate tahap dan bukan bukti bottleneck tunggal. Ambang, bobot, jumlah pertanyaan, serta hubungan indikator dengan bottleneck adalah keputusan rancangan yang harus diuji dan dapat berubah.

## 6. Gambaran Solusi dan Inventaris Halaman

MVP memiliki halaman berikut:

| Halaman              | Rute          | Fungsi MVP                                                                                                                                         |
| -------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landing              | `/`           | Menjelaskan masalah, batasan hasil, dan CTA ke Survey.                                                                                             |
| Survey               | `/survey`     | Pertanyaan singkat satu per layar, progres, navigasi mundur, dan penyimpanan lokal sementara.                                                      |
| Diagnosis            | `/diagnosis`  | Menampilkan ringkasan indikator, bottleneck indikatif, alasan, ketidakpastian bila ada, dan langkah awal. Memuat tautan ke roadmap dan kalkulator. |
| Financial Calculator | `/kalkulator` | Menghitung margin kontribusi, estimasi laba bersih, titik impas, dan target penjualan berdasarkan input pengguna.                                  |
| Roadmap              | `/roadmap`    | Panduan baca-saja survival, improvement, dan growth untuk empat growth levers; tidak memiliki kelas, status terkunci, atau pelacakan progres.      |

Roadmap adalah halaman MVP nyata, bukan bagian tersamar pada Landing atau Diagnosis. Kontennya luas dan statis. Diagnosis menautkan ke `/roadmap` tanpa mengirim parameter filter, skor, atau bottleneck; personalisasi hubungan Diagnosis → Roadmap merupakan future scope AI.

Halaman tambahan non-MVP:

- `/recommendation`: AI Recommendation, memberi saran personal setelah keamanan, privasi, dan kualitas rekomendasi divalidasi.
- `/mindmap`: UMKM Mindmap, memvisualisasikan hubungan area usaha dan tindakan.
- `/chat`: Conversational AI, percakapan yang terhubung pada topik roadmap, jawaban survey, dan indikator diagnosis. Ini future scope/Should consider, bukan MVP dan bukan Won't Have.

Alur MVP:

```text
Landing
  ↓ CTA ke /survey
Survey
  ↓ submit valid; redirect otomatis
Diagnosis
  ├─ tautan biasa → Financial Calculator
  └─ tautan biasa → Roadmap
```

Aturan hubungan halaman:

1. `Survey → Diagnosis` adalah hubungan langsung. Setelah seluruh jawaban wajib valid dan tersimpan, sistem otomatis mengarahkan pengguna ke `/diagnosis`.
2. `Diagnosis → Financial Calculator` hanya tautan biasa. Financial Calculator berdiri sendiri, memakai input manual, dan tidak membaca atau mengubah hasil diagnosis.
3. `Diagnosis → Roadmap` hanya tautan biasa pada MVP. Roadmap selalu menampilkan konten statis penuh dan tidak difilter oleh skor, bottleneck, atau jawaban survey.
4. Personalisasi topik Roadmap berdasarkan hasil Diagnosis hanya tersedia pada fitur AI pasca-MVP, setelah persetujuan pengguna.
5. Financial Calculator dan Roadmap dapat dibuka langsung melalui navigasi tanpa menyelesaikan Survey. Diagnosis tanpa hasil lokal valid hanya menampilkan CTA kembali ke Survey.

## 7. Metrik Keberhasilan

Target berikut adalah target uji MVP, bukan klaim performa yang sudah tercapai:

| Tujuan            | Indikator                                                                                                 | Target awal                |
| ----------------- | --------------------------------------------------------------------------------------------------------- | -------------------------- |
| Penyelesaian      | Pengguna uji menyelesaikan Survey tanpa bantuan                                                           | ≥80% dari 5 pengguna       |
| Pemahaman         | Pengguna dapat menjelaskan bottleneck sebagai indikasi, bukan kepastian                                   | ≥80% dari 5 pengguna       |
| Relevansi         | Pengguna menilai minimal satu langkah awal relevan dan realistis                                          | ≥4 dari 5 pengguna         |
| Keuangan          | Pengguna dapat menyebut margin/titik impas setelah kalkulator                                             | ≥80% dari 5 pengguna       |
| Keandalan lokal   | Hasil tetap tersedia setelah berpindah halaman pada browser yang sama                                     | 100% pengujian manual      |
| Kejelasan batasan | Pengguna memahami hasil lokal hilang jika data situs dihapus atau browser/perangkat diganti               | 100% pengguna uji memahami |
| Roadmap           | Pengguna dapat menemukan bagian Survival, Improvement, dan Growth serta satu tindakan yang sesuai konteks | ≥80% dari 5 pengguna       |

Validasi jangka panjang, dampak rupiah, akurasi bottleneck, dan peningkatan pendapatan belum dapat diklaim dari MVP.

## 8. Product Backlog

### 8.1 Product Goal

Membantu pemilik usaha mikro memahami sinyal kondisi usahanya dan memilih langkah awal melalui diagnosis indikatif, kalkulator mandiri, dan roadmap umum.

### 8.2 Cara membaca backlog

Hierarki backlog mengikuti Scrum Guide: satu daftar terurut dengan Product Goal sebagai komitmen.

```text
Product Goal
└── Product Backlog (satu daftar terurut US-01–US-20)
    ├── Epic (kelompok outcome, opsional)
    │   └── User Story (item bernilai; pemilik urutan + scope + MoSCoW)
    │       └── Acceptance Criteria (kondisi uji biner)
    └── Refinement dapat memecah US menjadi US/task lebih kecil
```

Konvensi penulisan:

- **ID US = nomor urut backlog.** US-01 adalah urutan 1, US-20 urutan 20.
- **Format User Story:** `Sebagai [peran], saya ingin [tujuan], agar [manfaat].`
- **Format Acceptance Criteria:** `- [ ] **AC-<US>-<nn>** Given [konteks], When [aksi], Then [hasil terverifikasi].` Setiap AC lulus atau gagal secara biner; kata ambigu (`mendukung`, `mudah`, `cepat`) tidak dipakai tanpa ambang.
- **MoSCoW** adalah teknik scope, bukan hierarki Scrum: `Must` = MVP wajib; `Should` = MVP penting, pangkas bila kendala; `Could` = MVP opsional; `Won't for MVP` = tidak dikerjakan di MVP, bukan larangan permanen; `Future` = pasca-MVP, belum disetujui untuk implementasi. Setiap US mencantumkan scope dan MoSCoW sendiri; prioritas tidak diwariskan dari Epic.
- **AC bukan task.** Estimasi, owner, status, sprint, dan task teknis ditetapkan saat backlog refinement/project tracking, bukan di PRD.

### 8.3 Epic grouping

| Epic                      | Outcome                                            | US               |
| ------------------------- | -------------------------------------------------- | ---------------- |
| E-01 Orientasi/navigasi   | Memahami produk dan berpindah halaman              | US-01, US-07     |
| E-02 Survey/lokal         | Mengisi, menyimpan Survey, meneruskan ke Diagnosis | US-02–US-03      |
| E-03 Diagnosis            | Memahami indikator, bottleneck, uncertainty        | US-04            |
| E-04 Financial Calculator | Menghitung dari input manual                       | US-05, US-09     |
| E-05 Roadmap              | Membaca panduan umum statis                        | US-06            |
| E-06 Eksplorasi pasca-MVP | Validasi AI dan mindmap                            | US-14–US-16      |
| E-07 Opsi MVP Could       | Peningkatan opsional bila kapasitas tersisa        | US-11–US-13      |
| E-08 Batas scope Won't    | Kapabilitas yang tidak dibangun pada MVP           | US-17–US-20      |
| E-09 Quality/validation   | Bantuan pengguna dan verifikasi aturan             | US-08, US-10     |

### 8.4 Ringkasan terurut (ID = urutan)

Urutan adalah rekomendasi awal, dapat berubah setelah validasi. Detail dan AC hanya authoritative pada story terkait di §8.5–§8.8.

| US    | Epic | Outcome                                         | Scope          | MoSCoW      |
| ----- | ---- | ----------------------------------------------- | -------------- | ----------- |
| US-01 | E-01 | Memahami nilai, batas, CTA                      | MVP            | Must        |
| US-02 | E-02 | Mengisi Survey                                  | MVP            | Must        |
| US-03 | E-02 | Menyimpan jawaban, redirect ke Diagnosis        | MVP            | Must        |
| US-04 | E-03 | Membaca diagnosis indikatif                     | MVP            | Must        |
| US-05 | E-04 | Menghitung dari input manual                    | MVP            | Must        |
| US-06 | E-05 | Membaca Roadmap statis                          | MVP            | Must        |
| US-07 | E-01 | Menavigasi lima halaman                         | MVP            | Must        |
| US-08 | E-09 | Verifikasi manual diagnosis dan scoring         | MVP            | Must        |
| US-09 | E-04 | Membandingkan direct vs platform sales          | MVP bila waktu | Should      |
| US-10 | E-09 | Bantuan istilah/bahasa sehari-hari              | MVP bila waktu | Should      |
| US-11 | E-07 | Transisi Survey yang membantu orientasi         | MVP bila waktu | Could       |
| US-12 | E-07 | Simulasi skenario harga/biaya                   | MVP bila waktu | Could       |
| US-13 | E-07 | Ekspor/print hasil lokal setelah review privasi | MVP bila waktu | Could       |
| US-14 | E-06 | Rekomendasi AI dari Survey/Roadmap              | Pasca-MVP      | Future      |
| US-15 | E-06 | Chat topik Roadmap dengan konteks disetujui     | Pasca-MVP      | Future      |
| US-16 | E-06 | Mindmap hubungan area usaha                     | Pasca-MVP      | Future      |
| US-17 | E-08 | Akun, backend, recovery, dan sinkronisasi       | Di luar MVP    | Won't for MVP |
| US-18 | E-08 | Pencatatan transaksi harian                     | Di luar MVP    | Won't for MVP |
| US-19 | E-08 | Integrasi marketplace/pembayaran                | Di luar MVP    | Won't for MVP |
| US-20 | E-08 | Dashboard pendamping dan komunitas              | Di luar MVP    | Won't for MVP |

### 8.5 Backlog terurut US-01–US-08 (MVP Must)

#### US-01 — Memahami produk di Landing [E-01 · MVP · Must]

Sebagai pemilik usaha, saya ingin memahami manfaat dan batasan UMIRO, agar dapat memutuskan apakah Survey relevan.

- [ ] **AC-01-01** Given pengguna membuka `/`, When membaca hero dan CTA, Then tujuan UMIRO dan lima halaman MVP terlihat serta CTA ke `/survey` tersedia.
- [ ] **AC-01-02** Given pengguna membaca batasan, When memeriksa klaim hasil, Then Landing menyatakan diagnosis indikatif dan menyatakan bukan audit/konsultasi, keputusan kredit, klasifikasi hukum UMKM, penentu pajak, atau kepatuhan.
- [ ] **AC-01-03** Given pengguna membaca risiko data, When memeriksa persistensi, Then Landing menjelaskan data lokal hilang jika data situs dihapus atau browser/perangkat diganti.
- [ ] **AC-01-04** Given pengguna membaca Landing penuh, When mencari klaim personalisasi, Then tidak ada klaim Calculator/Roadmap dipersonalisasi pada MVP.

#### US-02 — Mengisi Survey [E-02 · MVP · Must]

Sebagai pemilik usaha, saya ingin menjawab pertanyaan singkat dengan bahasa sehari-hari, agar dapat memberi konteks usaha.

- [ ] **AC-02-01** Given pengguna membuka `/survey`, When menjawab, Then satu pertanyaan per layar tampil beserta progres, tombol Kembali, dan pilihan jawaban.
- [ ] **AC-02-02** Given katalog soal final, When diaudit, Then pertanyaan mencakup F/M/R/A/C diagnostik dan S/G konteks, dan jumlah soal lulus uji durasi maksimal tiga menit.
- [ ] **AC-02-03** Given pengguna sudah menjawab lalu maju atau kembali, When navigasi antarpertanyaan, Then jawaban sebelumnya tetap tersimpan di layar.
- [ ] **AC-02-04** Given pertanyaan yang relevan, When opsi tersedia, Then “Belum tahu/Belum pernah menghitung” dapat dipilih dan ditafsirkan sesuai aturan pertanyaan.
- [ ] **AC-02-05** Given pengguna belum menjawab semua pertanyaan wajib, When menekan submit, Then submit ditolak hingga semua terjawab.
- [ ] **AC-02-06** Given istilah HPP atau teknis muncul, When dibaca, Then penjelasan bahasa sehari-hari tersedia.

#### US-03 — Menyimpan Survey dan menuju Diagnosis [E-02 · MVP · Must]

Sebagai pengguna, saya ingin jawaban tersimpan lalu melihat diagnosis langsung, agar tidak mengulang pengisian.

- [ ] **AC-03-01** Given jawaban valid, When submit sukses, Then jawaban dan versi katalog Survey tersimpan di `localStorage`.
- [ ] **AC-03-02** Given penyimpanan gagal, When submit, Then pesan gagal tampil dan sistem tidak menyatakan sukses.
- [ ] **AC-03-03** Given jawaban valid tersimpan, When hasil dihitung, Then hasil deterministik dihitung dan payload berversi disimpan.
- [ ] **AC-03-04** Given penyimpanan sukses, When selesai, Then sistem mengarahkan pengguna ke `/diagnosis`.
- [ ] **AC-03-05** Given submit MVP, When selesai, Then Calculator/Roadmap tidak terbuka dan jawaban tidak dikirim ke server/AI.

#### US-04 — Membaca Diagnosis dan uncertainty [E-03 · MVP · Must]

Sebagai pemilik usaha, saya ingin memahami indikator dan area yang perlu diperiksa, agar bertindak tanpa klaim kepastian palsu.

- [ ] **AC-04-01** Given payload Survey valid di browser yang sama, When membuka `/diagnosis`, Then Diagnosis membaca payload tersebut.
- [ ] **AC-04-02** Given Diagnosis tampil, When membaca indikator, Then indikator F/M/R/A/C tampil tanpa label lulus/gagal.
- [ ] **AC-04-03** Given hasil tampil, When memeriksa alasan, Then setiap indikator pendorong dikaitkan dengan jawaban/sinyal sumber.
- [ ] **AC-04-04** Given S/G tersedia, When tampil, Then keduanya hanya konteks dan tidak mengubah skor, Calculator, atau Roadmap.
- [ ] **AC-04-05** Given syarat data dan selisih skor terpenuhi, When render, Then bottleneck tunggal tampil.
- [ ] **AC-04-06** Given selisih dua skor teratas ≤10 atau data valid kategori bersaing kurang dari separuh indikator, When render, Then “belum cukup jelas” tampil beserta maksimal dua area pemeriksaan, tanpa bottleneck tunggal.
- [ ] **AC-04-07** Given hasil tampil, When membaca saran, Then maksimal dua langkah awal tampil beserta alasan dan disclaimer bukan jaminan.
- [ ] **AC-04-08** Given tanpa payload valid, When membuka `/diagnosis`, Then CTA kembali ke Survey tampil, bukan skor default.
- [ ] **AC-04-09** Given tautan Calculator/Roadmap di Diagnosis, When diklik atau diperiksa, Then keduanya tautan biasa tanpa parameter atau personalisasi.

#### US-05 — Menghitung hasil dengan input manual [E-04 · MVP · Must]

Sebagai pemilik usaha, saya ingin memasukkan angka sendiri, agar melihat margin, estimasi laba, titik impas, dan target.

- [ ] **AC-05-01** Given pengguna membuka `/kalkulator`, When mengisi, Then input harga/unit, biaya variabel/unit atau biaya batch dan unit batch, volume/hari, hari operasi/bulan, biaya tetap/bulan, dan target laba opsional tersedia.
- [ ] **AC-05-02** Given nilai negatif, non-finite, format invalid, harga nol, hari operasi nol, atau unit batch nol, When divalidasi, Then input ditolak dengan pesan jelas.
- [ ] **AC-05-03** Given input valid, When hasil dihitung, Then margin kontribusi/unit dan estimasi laba bersih bulanan tampil.
- [ ] **AC-05-04** Given `M>0` dan `D>0`, When titik impas dihitung, Then hasil memakai `ceil(F/(M×D))`; Given `F=0`, When dihitung, Then hasil nol.
- [ ] **AC-05-05** Given `T` ≤ laba bersih berjalan, When target dihitung, Then “target sudah tercapai” tampil dan tambahan unit nol, bukan negatif.
- [ ] **AC-05-06** Given `M≤0`, When hasil dihitung, Then impas/target volume tidak ditampilkan sebagai hasil valid.
- [ ] **AC-05-07** Given Kalkulator dipakai, When memeriksa sumber data, Then hanya input manual dipakai; Diagnosis tidak dibaca, ditulis, atau ditafsirkan.
- [ ] **AC-05-08** Given input diubah, When nilai berubah, Then hasil diperbarui tanpa reload.
- [ ] **AC-05-09** Given hasil tersimpan lokal, When payload rusak dibuka, Then payload rusak tidak ditampilkan sebagai hasil terkini.
- [ ] **AC-05-10** Given pajak, penyusutan, atau tenaga kerja pemilik tidak diinput, When hasil dibaca, Then batas tersebut dinyatakan.

#### US-06 — Membaca Roadmap umum [E-05 · MVP · Must]

Sebagai pemilik usaha, saya ingin membaca Survival, Improvement, dan Growth, agar dapat memilih materi sendiri.

- [ ] **AC-06-01** Given pengguna membuka `/roadmap`, When dibaca, Then semua bagian dan empat growth levers tampil.
- [ ] **AC-06-02** Given konten dibaca, When diperiksa, Then langkah biaya rendah, perbaikan operasi, dan pertumbuhan tercakup; bukan pemasaran digital saja.
- [ ] **AC-06-03** Given Roadmap dipakai, When diperiksa, Then baca-saja; tanpa kelas pengguna, state, gate, tracking, atau penilaian otomatis.
- [ ] **AC-06-04** Given tindakan dibaca, When ditafsirkan, Then tindakan adalah opsi kontekstual, bukan instruksi universal atau jaminan.
- [ ] **AC-06-05** Given tanpa hasil Survey, When dibuka dari navigasi atau Diagnosis, Then Roadmap tetap terbuka penuh.
- [ ] **AC-06-06** Given tautan dari Diagnosis, When diperiksa, Then tidak ada konteks personal yang dibawa; Roadmap tetap konten umum penuh.

#### US-07 — Menavigasi halaman [E-01 · MVP · Must]

Sebagai pengguna, saya ingin mencapai tiap halaman, agar berpindah tanpa kebingungan.

- [ ] **AC-07-01** Given navigasi global, When dibaca, Then Landing, Survey, Diagnosis, Financial Calculator, dan Roadmap tersedia.
- [ ] **AC-07-02** Given navigasi tampil, When dibaca, Then halaman aktif dan label tautan dapat dikenali.
- [ ] **AC-07-03** Given Survey valid tersimpan, When submit sukses, Then redirect otomatis hanya ke `/diagnosis`.
- [ ] **AC-07-04** Given tautan Diagnosis ke Calculator/Roadmap, When diklik, Then keduanya tautan biasa; Given tanpa Survey, When dibuka langsung, Then keduanya tetap dapat dibuka.
- [ ] **AC-07-05** Given mobile dan desktop, When navigasi dipakai, Then berfungsi pada keduanya.

#### US-08 — Memverifikasi aturan diagnosis dan scoring [E-09 · MVP · Must]

Sebagai tim produk, saya ingin menguji aturan diagnosis pada kasus terkontrol, agar hasil deterministik dapat dijelaskan sebelum digunakan.

- [ ] **AC-08-01** Given kasus uji dijalankan, When dicakup, Then margin nol/negatif, retensi rendah, kapasitas terbatas, keuangan tidak jelas, seri skor dekat, dan data tidak cukup tercakup.
- [ ] **AC-08-02** Given tiap kasus, When dicatat, Then input, hasil yang diharapkan, hasil aktual, dan alasan perbedaan tercatat.
- [ ] **AC-08-03** Given bobot atau ambang berubah, When dievaluasi, Then kasus uji terkait diulang.
- [ ] **AC-08-04** Given hasil uji dibaca, When dipresentasikan, Then tidak diklaim sebagai validasi statistik pengguna.

### 8.6 Backlog terurut US-09–US-13 (Should/Could bila waktu)

#### US-09 — Membandingkan direct sales dan platform [E-04 · MVP bila waktu · Should]

Sebagai pemilik usaha yang memakai platform, saya ingin melihat dampak potongan pada margin, agar memutuskan kanal secara sadar biaya.

- [ ] **AC-09-01** Given pengguna memilih penjualan platform, When opsi tampil, Then input potongan opsional tersedia.
- [ ] **AC-09-02** Given perbandingan direct vs platform, When dihitung, Then input identik selain potongan dipakai untuk kedua sisi.
- [ ] **AC-09-03** Given margin platform nol atau negatif, When hasil dibaca, Then penjelasan tampil dan titik impas menyesatkan tidak ditampilkan sebagai hasil valid.

#### US-10 — Memahami istilah dan contoh pengisian [E-09 · MVP bila waktu · Should]

Sebagai pengguna dengan literasi bisnis terbatas, saya ingin mendapat bantuan istilah dan contoh, agar dapat menjawab Survey serta membaca Calculator dengan benar.

- [ ] **AC-10-01** Given istilah HPP, margin kontribusi, atau titik impas pertama dipakai, When dibaca, Then penjelasan singkat tersedia.
- [ ] **AC-10-02** Given contoh pengisian tampil, When diperiksa, Then contoh tidak dianggap jawaban pengguna dan dapat ditutup.
- [ ] **AC-10-03** Given bantuan dipakai, When scoring atau kalkulator dihitung, Then hasil tidak berubah oleh bantuan.

#### US-11 — Menggunakan transisi Survey [E-07 · MVP bila waktu · Could]

Sebagai pengguna, saya ingin transisi antarpertanyaan yang tidak mengganggu, agar orientasi Survey lebih mudah.

- [ ] **AC-11-01** Given transisi berjalan, When jawaban, progres, validasi, atau urutan diperiksa, Then tidak ada yang berubah oleh transisi.
- [ ] **AC-11-02** Given animasi berjalan, When pengguna menjawab, Then Survey dapat diselesaikan tanpa menunggu animasi.
- [ ] **AC-11-03** Given reduced motion aktif, When transisi diminta, Then animasi dihentikan atau preferensi dihormati.

#### US-12 — Membandingkan skenario harga/biaya [E-07 · MVP bila waktu · Could]

Sebagai pengguna Calculator, saya ingin membandingkan beberapa skenario harga/biaya, agar melihat perbedaan hasil tanpa kehilangan input utama.

- [ ] **AC-12-01** Given skenario dibuat, When sumber data diperiksa, Then hanya input manual Calculator dipakai; Diagnosis tidak dibaca.
- [ ] **AC-12-02** Given tiap skenario tampil, When dibaca, Then asumsi dan hasil dengan rumus yang sama seperti Calculator utama terlihat.
- [ ] **AC-12-03** Given skenario diubah, When hasil utama diperiksa, Then hasil tersimpan utama tidak berubah tanpa tindakan eksplisit pengguna.

#### US-13 — Mengekspor atau mencetak hasil lokal [E-07 · MVP bila waktu · Could]

Sebagai pengguna, saya ingin mencetak atau menyalin hasil lokal, agar dapat membawanya ke diskusi offline.

- [ ] **AC-13-01** Given ekspor/print diminta, When sumber data diperiksa, Then hanya data lokal dipakai dan tidak dikirim ke server.
- [ ] **AC-13-02** Given output dibaca, When diperiksa, Then disclaimer diagnosis indikatif dan kalkulator bukan laporan keuangan tercantum.
- [ ] **AC-13-03** Given review privasi dan pengujian penghapusan data lokal belum lulus, When fitur diperiksa, Then fitur tidak aktif.

### 8.7 Backlog terurut US-14–US-16 (Future, belum disetujui)

Stories ini memerlukan consent eksplisit, minimisasi data, transparansi konteks, evaluasi, fallback non-AI, dan larangan mengganti diagnosis deterministik atau memberi keputusan finansial.

#### US-14 — Mendapat rekomendasi AI [E-06 · Pasca-MVP · Future]

Sebagai pemilik usaha yang menyetujui AI, saya ingin rekomendasi menghubungkan Survey, indikator, dan topik Roadmap, agar mendapat saran personal yang dapat ditelusuri.

- [ ] **AC-14-01** Given proses AI dimulai, When persetujuan diminta, Then persetujuan dan data yang dikirim dijelaskan sebelum proses.
- [ ] **AC-14-02** Given rekomendasi tampil, When ditelusuri, Then sinyal Survey dan topik Roadmap dirujuk dan diagnosis deterministik tidak diubah.
- [ ] **AC-14-03** Given output dibaca, When diperiksa, Then batasan dan fallback saat layanan gagal dijelaskan.

#### US-15 — Berdiskusi tentang Roadmap [E-06 · Pasca-MVP · Future]

Sebagai pengguna yang menyetujui AI, saya ingin berdiskusi tentang topik Roadmap dengan konteks yang saya setujui, agar memahami materi tanpa kehilangan kontrol data.

- [ ] **AC-15-01** Given chat dimulai, When konteks dipilih, Then pengguna memilih topik, meninjau konteks Survey, lalu menyetujui pemrosesan sebelum lanjut.
- [ ] **AC-15-02** Given chat berjalan, When data dipakai, Then hanya konteks disetujui dipakai dan Survey/Diagnosis tidak diubah.
- [ ] **AC-15-03** Given konteks tidak cukup, When dijawab, Then jawaban umum berlabel atau permintaan data tampil.
- [ ] **AC-15-04** Given gangguan AI terjadi, When Roadmap dibuka, Then Roadmap statis tetap dapat dibaca.

#### US-16 — Melihat Mindmap UMKM [E-06 · Pasca-MVP · Future]

Sebagai pemilik usaha, saya ingin melihat hubungan area usaha secara visual, agar memahami keterkaitan lever dan tindakan.

- [ ] **AC-16-01** Given mindmap dibaca, When ditafsirkan, Then visualisasi adalah konseptual, bukan skor tervalidasi atau diagnosis.
- [ ] **AC-16-02** Given personalisasi diminta, When diproses, Then consent diminta dan sumber konteks ditunjukkan.

### 8.8 Batasan scope US-17–US-20 (Won't for MVP)

Stories di bagian ini wajib tercatat agar batas rilis transparan. Semua berstatus **Won't for MVP**; artinya tidak dibangun pada rilis ini, bukan larangan permanen. Jika Product Owner kelak mengaktifkan story, scope dan acceptance criteria implementasinya harus dirinci sebelum masuk ke rilis.

#### US-17 — Akun dan sinkronisasi lintas perangkat [E-08 · Di luar MVP · Won't for MVP]

Sebagai calon pengguna akun, saya ingin dicatat bahwa akun belum tersedia, agar ekspektasi rilis jelas.

- [ ] **AC-17-01** Given MVP dirilis, When cakupan diperiksa, Then akun, backend persistence, kode pemulihan, dan sinkronisasi lintas perangkat tidak dibangun.

#### US-18 — Pencatatan transaksi harian [E-08 · Di luar MVP · Won't for MVP]

Sebagai pemilik usaha, saya ingin dicatat bahwa kas harian belum tersedia, agar memakai diagnosis berkala dan kalkulator manual.

- [ ] **AC-18-01** Given MVP dirilis, When cakupan diperiksa, Then pencatatan transaksi harian tidak dibangun; produk tetap diagnosis berkala dan kalkulator manual.

#### US-19 — Integrasi marketplace dan pembayaran [E-08 · Di luar MVP · Won't for MVP]

Sebagai pemilik usaha platform, saya ingin dicatat bahwa integrasi belum tersedia, agar tidak menunggu fitur tersebut di MVP.

- [ ] **AC-19-01** Given MVP dirilis, When cakupan diperiksa, Then integrasi marketplace atau layanan pembayaran tidak dibangun.

#### US-20 — Dashboard pendamping dan komunitas [E-08 · Di luar MVP · Won't for MVP]

Sebagai pendamping UMKM, saya ingin dicatat bahwa dashboard belum tersedia, agar memakai bahan percakapan manual.

- [ ] **AC-20-01** Given MVP dirilis, When cakupan diperiksa, Then dashboard multi-UMKM dan fitur komunitas tidak dibangun.

### 8.9 Traceability

| Kebutuhan                      | Epic / US           | Halaman                       | AC                   |
| ------------------------------ | ------------------- | ----------------------------- | -------------------- |
| Orientasi/navigasi             | E-01 / US-01, US-07 | Landing, semua                | AC-01, AC-07         |
| Survey tersimpan → Diagnosis   | E-02 / US-02, US-03 | Survey → Diagnosis            | AC-02, AC-03         |
| Diagnosis dan uncertainty      | E-03 / US-04        | Diagnosis                     | AC-04                |
| Verifikasi aturan              | E-09 / US-08        | Diagnosis, aturan             | AC-08                |
| Kalkulator mandiri/platform    | E-04 / US-05, US-09 | Calculator                    | AC-05, AC-09         |
| Roadmap statis                 | E-05 / US-06        | Roadmap                       | AC-06                |
| Bantuan istilah                | E-09 / US-10        | Survey, Calculator            | AC-10                |
| Opsi Could                     | E-07 / US-11–US-13  | Survey, Calculator            | AC-11, AC-12, AC-13  |
| AI Recommendation/Chat/Mindmap | E-06 / US-14–US-16  | Pasca-MVP                     | AC-14, AC-15, AC-16  |
| Batas Won't for MVP            | E-08 / US-17–US-20  | Di luar MVP                   | AC-17–AC-20          |

## 9. Ruang Lingkup

### Termasuk MVP

Lima halaman nyata: Landing, Survey, Diagnosis, Financial Calculator, dan Roadmap; diagnosis indikatif deterministik berbasis aturan lokal; kalkulator lokal; roadmap statis baca-saja; layout responsif; dan browser-local persistence.

### Tidak termasuk MVP

Layanan AI, rekomendasi generatif, mindmap interaktif, akun, server database untuk hasil pengguna, pemulihan lintas perangkat, tracking progres roadmap dan evaluasi longitudinal.

## 10. Risiko dan Mitigasi

| Risiko                                          | Dampak                       | Mitigasi                                                                  |
| ----------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------- |
| Kerangka dan bobot belum tervalidasi            | Diagnosis bisa tidak relevan | Labeli sebagai usulan, uji 5–10 pengguna, revisi setelah bukti            |
| Survey terlalu panjang                          | Penyelesaian turun           | Uji waktu, kurangi pertanyaan, pertahankan coverage kategori              |
| Pengguna salah memasukkan biaya                 | Hasil kalkulator menyesatkan | Contoh input, validasi, penjelasan batasan                                |
| Data lokal dihapus/incognito/perangkat berganti | Hasil tidak tersedia         | Pesan batasan jelas; gunakan `localStorage`; jangan klaim recovery        |
| Bottleneck tunggal terlalu menyederhanakan      | Saran salah prioritas        | Tampilkan alasan dan ketidakpastian; sediakan indikator lain              |
| Bahasa roadmap dianggap janji                   | Ekspektasi tidak realistis   | Gunakan “contoh/langkah yang dapat dicoba”, bukan hasil pasti             |
| AI di masa depan mengekspos data survey         | Risiko privasi               | Persetujuan eksplisit, minimisasi data, kebijakan retensi, fallback lokal |

## 11. Teknologi dan Persistensi

- Next.js App Router dan TypeScript.
- Tailwind CSS dan shadcn/ui bila sudah tersedia di proyek; tidak menambah dependency tanpa kebutuhan.
- Scoring, kategori, dan kalkulasi berjalan lokal/deterministik pada MVP.
- `localStorage` menyimpan jawaban survey, ringkasan diagnosis, dan hasil kalkulator dalam payload berversi dan berukuran terbatas. Saat data rusak/tidak dikenal, sistem mengabaikannya dengan aman, menghapus payload rusak, dan meminta pengguna mengulang survey bila perlu.
- Pengguna diberi tahu data hanya tersedia pada browser yang sama dan dapat hilang saat data situs dibersihkan atau mode privat ditutup. Tidak ada data sensitif yang dikirim ke server pada MVP.
- Tidak ada Neon/Postgres, Route Handler, identitas anonim, API key, atau layanan AI yang diperlukan untuk MVP. Arsitektur server/database hanya dipertimbangkan jika kebutuhan sinkronisasi disetujui kemudian.
- Nilai uang menggunakan bilangan rupiah; validasi mencegah input negatif yang tidak bermakna dan pembagian dengan nol.
- Build quality gate: lint, typecheck, unit test rumus kalkulator, dan production build.

## 12. Keputusan dan Hal yang Perlu Validasi

### Keputusan produk saat ini

1. Page set MVP terdiri dari Landing, Survey, Diagnosis, Financial Calculator, dan Roadmap.
2. Roadmap bersifat statis dan luas, mencakup Survival/Improvement/Growth tanpa kelas, state, atau gate pengguna.
3. Hasil survey dan kalkulator disimpan browser-local melalui `localStorage`; tidak ada klaim lintas perangkat.
4. Churchill–Lewis menjadi rujukan konseptual, bukan aturan scoring atau klasifikasi hukum UMKM.
5. Recommendation dan Mindmap adalah tambahan non-MVP.
6. Conversational AI adalah future scope/Should consider, bukan MVP dan bukan Won't Have.
7. Produk tidak menetapkan klasifikasi hukum UMKM, kelayakan kredit, kewajiban pajak, atau kepatuhan regulasi.

### Perlu divalidasi

1. Apakah tujuh kategori F/M/R/A/C/S/G dipahami pengguna.
2. Jumlah pertanyaan dan bobot yang menghasilkan sinyal berguna dalam tiga menit.
3. Apakah satu bottleneck indikatif membantu tanpa memberi kepastian palsu.
4. Ambang dan aturan tie/uncertainty yang paling dapat dipertanggungjawabkan.
5. Apakah pengguna membutuhkan roadmap statis atau format yang lebih ringkas.
6. Apakah conversational AI memberi nilai nyata setelah pengguna mencoba diagnosis non-AI.

### Validasi berbasis skenario

Lakukan peninjauan pakar dan uji kasus sintetis sebelum memakai scoring untuk pengguna. Kasus minimum: penjualan baik dengan margin nol/negatif; margin positif tanpa pembelian ulang; permintaan melebihi kapasitas pemilik; jangkauan tinggi tetapi keuangan tidak jelas; dua kategori sama-sama lemah; serta jawaban tidak cukup untuk membedakan kategori. Catat jawaban yang diharapkan dan alasan untuk tiap kasus; revisi aturan bila hasil tidak dapat dijelaskan. Uji pengguna 5–10 orang menilai pemahaman dan kegunaan, bukan membuktikan validitas statistik model.

## Lampiran A — Proposal Scoring dan Output

1. Skor indikator diagnostik pada kategori F/M/R/A/C berada pada rentang internal 0–100; definisi arah skor dan bobot setiap jawaban ditetapkan dalam katalog soal yang terversi. Nilai numerik, bobot, dan ambang tetap hipotesis yang perlu diuji, bukan validasi statistik.
2. Pada MVP, S dan G tidak menyaring atau mengurutkan rekomendasi. Data S/G dapat ditampilkan sebagai konteks jawaban saja.
3. Saran diagnosis adalah langkah awal berbasis aturan dan indikator; bukan personalisasi Roadmap. Halaman Roadmap tetap menampilkan isi umum statis.
4. Financial Calculator tidak menerima nilai otomatis dari Survey atau Diagnosis; semua input dimasukkan pengguna.

Aturan bottleneck awal: pilih kategori diagnostik dengan skor terendah hanya jika terdapat cukup data yang terjawab dan selisih skor terendah dengan skor berikutnya lebih besar dari 10 poin. Jika selisih ≤10 poin, atau jawaban valid kurang dari separuh indikator kategori mana pun yang bersaing, tampilkan “belum cukup jelas” beserta maksimal dua area yang perlu diperiksa; jangan paksa satu pemenang. S dan G tidak mengubah skor diagnostik. Skala, bobot, ambang selisih, dan kecukupan data adalah hipotesis rancangan yang harus diuji, bukan nilai tervalidasi.

Output Diagnosis:

1. Ringkasan indikator per kategori, tanpa label “lulus/gagal”.
2. Satu bottleneck indikatif atau pernyataan “belum cukup jelas”.
3. Alasan berbasis jawaban pengguna.
4. Dua atau tiga langkah awal berbiaya rendah bila tersedia.
5. Tautan ke kalkulator dan bagian roadmap yang relevan.

## Lampiran A1 — Kasus uji aturan diagnosis

| Kasus                                                         | Hasil yang diharapkan                                                                                 |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Margin kontribusi nol/negatif dan jangkauan tinggi            | Prioritaskan pemeriksaan margin/biaya; jangan menyarankan penambahan promosi sebagai langkah pertama. |
| Margin positif tetapi pelanggan jarang kembali                | Tampilkan sinyal retensi bila lebih kuat daripada kategori diagnostik lain.                           |
| Permintaan melebihi kemampuan produksi pemilik                | Tampilkan sinyal kapasitas; S menyaring tindakan menurut waktu/modal, bukan mengubah skor kategori.   |
| Keuangan tidak jelas sementara kanal penjualan banyak         | Jangan biarkan jangkauan tinggi menutupi sinyal keuangan yang kuat.                                   |
| Dua kategori memiliki skor terendah dengan selisih ≤10        | Tampilkan “belum cukup jelas” dan dua area untuk diperiksa; jangan tetapkan bottleneck tunggal.       |
| Jawaban kategori bersaing kurang dari separuh indikator valid | Tampilkan kekurangan informasi dan jangan tetapkan kategori itu sebagai bottleneck.                   |

## Lampiran B — Rumus Financial Calculator

Dengan `H` harga jual/unit, `V` biaya variabel/unit, `Q` unit terjual/hari, `D` hari operasi/bulan, `F` biaya tetap/bulan, dan `T` target laba bersih/bulan:

- Margin kontribusi/unit: `M = H - V`.
- Estimasi laba bersih/bulan: `M × Q × D - F`.
- Titik impas unit/hari: `ceil(F / (M × D))` jika `M > 0` dan `D > 0`. Jika `F = 0`, hasilnya `0`.
- Unit/hari untuk target: `ceil((T + F) / (M × D))` jika `M > 0`, `D > 0`, dan `T + F > 0`.
- Jika `T` ≤ laba bersih saat ini, tampilkan “target sudah tercapai”; selisih unit tambahan adalah nol, bukan nilai negatif.
- Jika `M ≤ 0`, `H ≤ 0`, `D = 0`, atau penyebut tidak positif, jangan tampilkan titik impas/target berbasis volume seolah valid; jelaskan input atau kondisi yang perlu diperiksa.
- Semua kuantitas unit dibulatkan ke atas; masukan rupiah harus finite dan tidak negatif. Angka hasil rupiah dibulatkan ke rupiah terdekat.

Rumus adalah estimasi berdasarkan input, bukan laporan keuangan. Pajak, tenaga kerja pemilik, penyusutan, dan biaya lain harus diberi label di luar cakupan bila tidak dihitung.

### Kasus verifikasi kalkulator

| Input/kondisi                                        | Expected behavior                                                            |
| ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| `H=10.000`, `V=7.700`, `Q=40`, `D=26`, `F=1.800.000` | `M=2.300`; estimasi laba bersih `592.000`; titik impas `31` unit/hari.       |
| `M=0` atau `M<0`                                     | Penjelasan margin nol/negatif; tidak ada hasil impas/target berbasis volume. |
| `F=0`, `M>0`, `D>0`                                  | Titik impas `0` unit/hari.                                                   |
| `D=0` atau `H=0`                                     | Validasi input; tidak ada pembagian nol atau angka target palsu.             |
| `T` ≤ laba bersih berjalan                           | Target dinyatakan tercapai; tambahan unit `0`.                               |
| Biaya atau volume negatif, `NaN`, atau tak hingga    | Input ditolak dan hasil sebelumnya tidak diganti oleh angka invalid.         |

## Lampiran C — Roadmap Konten Statis

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

Semua tindakan adalah contoh; prioritas dan kelayakannya bergantung pada konteks pengguna.

## Lampiran D — Backlog Pasca-MVP

1. **Conversational AI (`/chat`)**: percakapan tentang topik roadmap dengan konteks jawaban survey dan indikator diagnosis setelah persetujuan pengguna, minimisasi data, evaluasi kualitas, dan fallback non-AI tersedia.
2. **AI Recommendation (`/recommendation`)**: rekomendasi personal yang dapat ditelusuri ke indikator, dengan guardrail dan evaluasi.
3. **UMKM Mindmap (`/mindmap`)**: visualisasi hubungan lever, indikator, dan opsi tindakan.
4. Evaluasi longitudinal dan perbandingan hasil, hanya setelah persistence yang disetujui.
5. Ekspor, akun, sinkronisasi, dan fitur pendamping berdasarkan validasi kebutuhan.

Tidak ada item backlog yang boleh dipresentasikan sebagai fitur MVP atau bukti dampak sebelum dibangun dan diuji.

## Lampiran E — Deklarasi AI

AI dapat dipakai dalam proses pengembangan, riset, dokumentasi, dan prototyping. MVP yang direncanakan tidak memakai AI untuk menetapkan diagnosis atau menghasilkan rekomendasi generatif. Conversational AI dan AI Recommendation adalah pengembangan masa depan yang harus mengungkap data yang dikirim, meminta persetujuan, dan menjelaskan bahwa output AI bukan keputusan finansial.
