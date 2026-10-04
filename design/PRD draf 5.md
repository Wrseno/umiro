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

Product Goal: membantu pemilik usaha mikro memahami sinyal kondisi usahanya dan memilih langkah awal melalui diagnosis indikatif, kalkulator mandiri, dan roadmap umum.

Product Backlog adalah satu daftar User Story (US) terurut menurut nilai, risiko, pembelajaran, dan dependensi. Epic hanya mengelompokkan US berdasarkan outcome. Acceptance Criteria (AC) berada di dalam US sebagai kondisi verifikasi, bukan level backlog terpisah. **Setiap US memiliki scope dan prioritas MoSCoW sendiri**; prioritas tidak diwariskan dari Epic dan tidak menggantikan ordering backlog.

```text
Product Goal
└── Product Backlog (ordered list of US)
    ├── Epic (optional outcome grouping)
    │   └── User Story (value-bearing item; owns scope + MoSCoW)
    │       └── Acceptance Criteria (testable conditions)
    └── Refinement may split US into smaller US/tasks
```

AC bukan task. Estimasi, owner, status, sprint, dan task teknis ditetapkan saat backlog refinement/project tracking. Scrum Guide menggambarkan Product Backlog sebagai daftar terurut tunggal dan menekankan transparansi/refinement; MoSCoW di sini teknik scope, bukan hierarki Scrum.

Prioritas MoSCoW berlaku bagi seluruh US dalam backlog, termasuk Future dan Won't. `Must` = MVP wajib; `Should` = MVP penting, pangkas bila kendala; `Could` = MVP opsional; `Won't for MVP` = tidak dikerjakan di MVP, bukan larangan permanen; `Future` = pasca-MVP, belum disetujui untuk implementasi. Setiap baris ringkasan US mencatat prioritasnya; tabel prioritas mandiri tidak digunakan.

### Epic grouping

| Epic                      | Outcome                                            | US           |
| ------------------------- | -------------------------------------------------- | ------------ |
| E-01 Orientasi/navigasi   | Memahami produk dan berpindah halaman              | US-01, US-06 |
| E-02 Survey/lokal         | Mengisi, menyimpan Survey, meneruskan ke Diagnosis | US-02, US-07 |
| E-03 Diagnosis            | Memahami indikator, bottleneck, uncertainty        | US-03        |
| E-04 Financial Calculator | Menghitung dari input manual                       | US-04, US-08 |
| E-05 Roadmap              | Membaca panduan umum statis                        | US-05        |
| E-06 Eksplorasi pasca-MVP | Validasi AI dan mindmap                            | US-09–US-11  |
| E-07 Opsi MVP Could       | Peningkatan opsional bila kapasitas tersisa        | US-12–US-14  |
| E-08 Batas scope Won't    | Kapabilitas yang tidak dibangun pada MVP           | US-15–US-18  |
| E-09 Quality/validation   | Bantuan pengguna dan verifikasi aturan             | US-19–US-20  |

### Ringkasan User Story dan MoSCoW

Urutan adalah rekomendasi awal, dapat berubah setelah validasi. Detail dan AC hanya authoritative pada story terkait di bawah.

| Order | Epic | US    | Outcome                                         | Scope          | MoSCoW        |
| ----: | ---- | ----- | ----------------------------------------------- | -------------- | ------------- |
|     1 | E-01 | US-01 | Memahami nilai, batas, CTA                      | MVP            | Must          |
|     2 | E-02 | US-02 | Mengisi Survey                                  | MVP            | Must          |
|     3 | E-02 | US-07 | Menyimpan jawaban, redirect ke Diagnosis        | MVP            | Must          |
|     4 | E-03 | US-03 | Membaca diagnosis indikatif                     | MVP            | Must          |
|     5 | E-04 | US-04 | Menghitung dari input manual                    | MVP            | Must          |
|     6 | E-05 | US-05 | Membaca Roadmap statis                          | MVP            | Must          |
|     7 | E-01 | US-06 | Menavigasi lima halaman                         | MVP            | Must          |
|     8 | E-04 | US-08 | Membandingkan direct vs platform sales          | MVP bila waktu | Should        |
|     9 | E-06 | US-09 | Rekomendasi AI dari Survey/Roadmap              | Pasca-MVP      | Future        |
|    10 | E-06 | US-10 | Chat topik Roadmap dengan konteks disetujui     | Pasca-MVP      | Future        |
|    11 | E-06 | US-11 | Mindmap hubungan area usaha                     | Pasca-MVP      | Future        |
|    12 | E-07 | US-12 | Transisi Survey yang membantu orientasi         | MVP bila waktu | Could         |
|    13 | E-07 | US-13 | Simulasi skenario harga/biaya                   | MVP bila waktu | Could         |
|    14 | E-07 | US-14 | Ekspor/print hasil lokal setelah review privasi | MVP bila waktu | Could         |
|    15 | E-08 | US-15 | Akun, backend, recovery, dan sinkronisasi       | Di luar MVP    | Won't for MVP |
|    16 | E-08 | US-16 | Pencatatan transaksi harian                     | Di luar MVP    | Won't for MVP |
|    17 | E-08 | US-17 | Integrasi marketplace/pembayaran                | Di luar MVP    | Won't for MVP |
|    18 | E-08 | US-18 | Dashboard pendamping dan komunitas              | Di luar MVP    | Won't for MVP |
|    19 | E-09 | US-19 | Bantuan istilah/bahasa sehari-hari              | MVP bila waktu | Should        |
|    20 | E-09 | US-20 | Verifikasi manual diagnosis dan scoring         | MVP            | Must          |

### Epic E-07 — Opsi MVP berprioritas Could

#### US-12 — Menggunakan transisi Survey (MVP bila waktu · Could)

Sebagai pengguna, saya ingin transisi antarpertanyaan yang tidak mengganggu agar orientasi Survey lebih mudah.

- AC-MOTION-01: Transisi tidak mengubah jawaban, progres, validasi, atau urutan pertanyaan.
- AC-MOTION-02: Pengguna dapat menyelesaikan Survey tanpa menunggu animasi.
- AC-MOTION-03: Animasi dapat dihentikan atau dihormati saat reduced motion aktif.

#### US-13 — Membandingkan skenario harga/biaya (MVP bila waktu · Could)

Sebagai pengguna Calculator, saya ingin membandingkan beberapa skenario harga/biaya agar dapat melihat perbedaan hasil tanpa kehilangan input utama.

- AC-SCEN-01: Skenario hanya menggunakan input manual Calculator dan tidak membaca Diagnosis.
- AC-SCEN-02: Setiap skenario menampilkan asumsi dan hasil dengan rumus yang sama seperti Calculator utama.
- AC-SCEN-03: Skenario tidak mengubah hasil tersimpan utama tanpa tindakan eksplisit pengguna.

#### US-14 — Mengekspor atau mencetak hasil lokal (MVP bila waktu · Could)

Sebagai pengguna, saya ingin mencetak atau menyalin hasil lokal agar dapat membawanya ke diskusi offline.

- AC-EXPORT-01: Ekspor/print hanya menggunakan data yang tersedia lokal dan tidak mengirimnya ke server.
- AC-EXPORT-02: Output menyertakan disclaimer bahwa diagnosis indikatif dan kalkulator bukan laporan keuangan.
- AC-EXPORT-03: Fitur tidak aktif sebelum review privasi dan pengujian penghapusan data lokal.

### Epic E-08 — Batasan scope Won't for MVP

Stories di Epic ini wajib tercatat agar batas rilis transparan. Semua berstatus **Won't for MVP**; artinya tidak dibangun pada rilis ini, bukan larangan permanen. Jika Product Owner kelak mengaktifkan story, scope dan acceptance criteria implementasinya harus dirinci sebelum masuk ke rilis.

#### US-15 — Akun dan sinkronisasi lintas perangkat (Won't for MVP)

Akun, backend persistence, kode pemulihan, dan sinkronisasi lintas perangkat tidak dibangun pada MVP.

#### US-16 — Pencatatan transaksi harian (Won't for MVP)

Pencatatan transaksi harian tidak dibangun pada MVP; produk tetap berupa diagnosis berkala dan kalkulator manual.

#### US-17 — Integrasi marketplace dan pembayaran (Won't for MVP)

Integrasi marketplace atau layanan pembayaran tidak dibangun pada MVP.

#### US-18 — Dashboard pendamping dan komunitas (Won't for MVP)

Dashboard multi-UMKM dan fitur komunitas tidak dibangun pada MVP.

### Epic E-09 — Quality and validation

#### US-19 — Memahami istilah dan contoh pengisian (MVP bila waktu · Should)

Sebagai pengguna dengan literasi bisnis terbatas, saya ingin mendapat bantuan istilah dan contoh agar dapat menjawab Survey serta membaca Calculator dengan benar.

- AC-HELP-01: Istilah HPP, margin kontribusi, dan titik impas memiliki penjelasan singkat saat pertama digunakan.
- AC-HELP-02: Contoh pengisian tidak dianggap sebagai jawaban pengguna dan dapat ditutup.
- AC-HELP-03: Bantuan tidak mengubah scoring atau hasil kalkulator.

#### US-20 — Memverifikasi aturan diagnosis dan scoring (MVP · Must)

Sebagai tim produk, saya ingin menguji aturan diagnosis pada kasus terkontrol agar hasil deterministik dapat dijelaskan sebelum digunakan.

- AC-VERIFY-01: Kasus uji mencakup margin nol/negatif, retensi rendah, kapasitas terbatas, keuangan tidak jelas, seri skor dekat, dan data tidak cukup.
- AC-VERIFY-02: Setiap kasus mencatat input, hasil yang diharapkan, hasil aktual, dan alasan perbedaan.
- AC-VERIFY-03: Perubahan bobot atau ambang memicu pengulangan kasus uji terkait.
- AC-VERIFY-04: Hasil uji tidak dipresentasikan sebagai validasi statistik pengguna.

### Traceability

#### US-01 — Memahami produk di Landing (MVP · Must)

Sebagai pemilik usaha, saya ingin memahami manfaat dan batasan UMIRO agar dapat memutuskan apakah Survey relevan.

- AC-LND-01: Landing menjelaskan tujuan UMIRO dan lima halaman MVP serta CTA ke `/survey`.
- AC-LND-02: Landing menyatakan diagnosis indikatif, bukan audit/konsultasi, keputusan kredit, klasifikasi hukum UMKM, penentu pajak, atau kepatuhan.
- AC-LND-03: Landing menjelaskan data lokal dapat hilang jika data situs dihapus atau browser/perangkat diganti.
- AC-LND-04: Landing tidak mengklaim Calculator/Roadmap dipersonalisasi pada MVP.

#### US-06 — Menavigasi halaman (MVP · Must)

Sebagai pengguna, saya ingin mencapai tiap halaman tanpa kebingungan.

- AC-NAV-01: Navigasi menyediakan Landing, Survey, Diagnosis, Financial Calculator, Roadmap.
- AC-NAV-02: Halaman aktif dan label tautan dapat dikenali.
- AC-NAV-03: Survey valid tersimpan mengarahkan otomatis hanya ke `/diagnosis`.
- AC-NAV-04: Diagnosis → Calculator dan Diagnosis → Roadmap hanya tautan biasa; kedua halaman juga dapat dibuka tanpa Survey.
- AC-NAV-05: Navigasi berfungsi pada mobile dan desktop.

### Epic E-02 — Survey dan persistensi lokal

#### US-02 — Mengisi Survey (MVP · Must)

Sebagai pemilik usaha, saya ingin menjawab pertanyaan singkat dengan bahasa sehari-hari agar dapat memberi konteks usaha.

- AC-SVY-01: Survey menampilkan satu pertanyaan per layar, progres, tombol Kembali, dan pilihan jawaban.
- AC-SVY-02: Pertanyaan mencakup F/M/R/A/C sebagai kategori diagnostik dan S/G sebagai konteks; jumlah final diuji terhadap durasi maksimal tiga menit.
- AC-SVY-03: Jawaban tidak hilang ketika pengguna maju atau kembali.
- AC-SVY-04: “Belum tahu/Belum pernah menghitung” tersedia bila relevan dan ditafsirkan sesuai aturan pertanyaan.
- AC-SVY-05: Semua pertanyaan wajib dijawab sebelum submit.
- AC-SVY-06: HPP dan istilah teknis dijelaskan dengan bahasa sehari-hari.

#### US-07 — Menyimpan Survey dan menuju Diagnosis (MVP · Must)

Sebagai pengguna, saya ingin jawaban tersimpan lalu melihat diagnosis langsung.

- AC-SAVE-01: Jawaban dan versi katalog Survey tersimpan di `localStorage`.
- AC-SAVE-02: Kegagalan penyimpanan menampilkan pesan dan tidak menyatakan sukses.
- AC-SAVE-03: Setelah jawaban valid, sistem menghitung hasil deterministik dan menyimpan payload berversi.
- AC-SAVE-04: Setelah penyimpanan sukses, sistem mengarahkan pengguna ke `/diagnosis`.
- AC-SAVE-05: Submit tidak membuka Calculator/Roadmap dan tidak mengirim jawaban ke server/AI pada MVP.

### Epic E-03 — Diagnosis indikatif

#### US-03 — Membaca Diagnosis dan uncertainty (MVP · Must)

Sebagai pemilik usaha, saya ingin memahami indikator dan area yang perlu diperiksa tanpa klaim kepastian palsu.

- AC-DIA-01: Diagnosis membaca payload Survey valid dari `localStorage` browser yang sama.
- AC-DIA-02: Diagnosis menampilkan indikator F/M/R/A/C tanpa label lulus/gagal.
- AC-DIA-03: Setiap indikator yang mendasari hasil dikaitkan dengan jawaban/sinyal sumber.
- AC-DIA-04: S/G hanya konteks; pada MVP tidak mengubah skor, Calculator, atau Roadmap.
- AC-DIA-05: Bottleneck tunggal tampil hanya jika syarat data dan selisih skor terpenuhi.
- AC-DIA-06: Jika selisih dua skor teratas ≤10 atau data valid kategori bersaing kurang dari separuh indikator, tampil “belum cukup jelas” dan maksimal dua area pemeriksaan.
- AC-DIA-07: Tampilkan maksimal dua langkah awal beserta alasan dan disclaimer bukan jaminan.
- AC-DIA-08: Tanpa payload valid, tampil CTA Survey, bukan skor default.
- AC-DIA-09: Tautan Calculator/Roadmap tidak membawa parameter atau personalisasi.

### Epic E-04 — Financial Calculator mandiri

#### US-04 — Menghitung hasil dengan input manual (MVP · Must)

Sebagai pemilik usaha, saya ingin memasukkan angka sendiri untuk melihat margin, estimasi laba, titik impas, dan target.

- AC-CAL-01: Input mencakup harga/unit, biaya variabel/unit atau biaya batch dan unit batch, volume/hari, hari operasi/bulan, biaya tetap/bulan, target laba opsional.
- AC-CAL-02: Nilai negatif, non-finite, format invalid, harga nol, hari operasi nol, dan unit batch nol ditolak dengan pesan jelas.
- AC-CAL-03: Hasil valid menampilkan margin kontribusi/unit dan estimasi laba bersih bulanan.
- AC-CAL-04: Jika `M>0` dan `D>0`, titik impas memakai `ceil(F/(M×D))`; jika `F=0`, hasil nol.
- AC-CAL-05: Jika target tercapai, tambahan unit nol, bukan negatif.
- AC-CAL-06: Jika `M≤0`, impas/target volume tidak ditampilkan sebagai hasil valid.
- AC-CAL-07: Kalkulator hanya memakai input manual; tidak membaca/menulis/menafsirkan Diagnosis.
- AC-CAL-08: Perubahan input memperbarui hasil tanpa reload.
- AC-CAL-09: Hasil disimpan lokal; payload rusak tidak ditampilkan sebagai hasil terkini.
- AC-CAL-10: Batas pajak, penyusutan, dan tenaga kerja pemilik dinyatakan bila tidak diinput.

#### US-08 — Membandingkan direct sales dan platform (MVP · Should)

Sebagai pemilik usaha yang memakai platform, saya ingin melihat dampak potongan pada margin.

- AC-PLAT-01: Potongan opsional muncul bila pengguna memilih penjualan platform.
- AC-PLAT-02: Perbandingan memakai input identik selain potongan.
- AC-PLAT-03: Margin platform nol/negatif menghasilkan penjelasan, bukan titik impas menyesatkan.

### Epic E-05 — Roadmap statis

#### US-05 — Membaca Roadmap umum (MVP · Must)

Sebagai pemilik usaha, saya ingin membaca Survival, Improvement, dan Growth agar dapat memilih materi sendiri.

- AC-RMP-01: `/roadmap` menampilkan semua bagian dan empat growth levers.
- AC-RMP-02: Konten mencakup langkah biaya rendah, perbaikan operasi, pertumbuhan; bukan pemasaran digital saja.
- AC-RMP-03: Baca-saja; tanpa kelas pengguna, state, gate, tracking, atau penilaian otomatis.
- AC-RMP-04: Tindakan adalah opsi kontekstual, bukan instruksi universal/jaminan.
- AC-RMP-05: Roadmap terbuka dari navigasi atau Diagnosis tanpa hasil Survey.
- AC-RMP-06: Tautan Diagnosis tidak membawa konteks personal; Roadmap tetap konten umum penuh.

### Epic E-06 — Eksplorasi pasca-MVP (Future · belum disetujui)

Stories ini memerlukan consent eksplisit, minimisasi data, transparansi konteks, evaluasi, fallback non-AI, dan larangan mengganti diagnosis deterministik atau memberi keputusan finansial.

#### US-09 — Mendapat rekomendasi AI (Future · Future)

Sebagai pemilik usaha yang menyetujui AI, saya ingin rekomendasi menghubungkan Survey, indikator, dan topik Roadmap.

- AC-AI-REC-01: Persetujuan dan data yang dikirim dijelaskan sebelum proses.
- AC-AI-REC-02: Rekomendasi merujuk sinyal Survey dan topik Roadmap; tidak mengubah diagnosis deterministik.
- AC-AI-REC-03: Output menjelaskan batasan dan fallback saat layanan gagal.

#### US-10 — Berdiskusi tentang Roadmap (Future · Future)

Sebagai pengguna yang menyetujui AI, saya ingin berdiskusi tentang topik Roadmap dengan konteks yang saya setujui.

- AC-CHAT-01: Pengguna memilih topik, meninjau konteks Survey, lalu menyetujui pemrosesan.
- AC-CHAT-02: Chat memakai konteks disetujui saja dan tidak mengubah Survey/Diagnosis.
- AC-CHAT-03: Tanpa konteks cukup, jawab umum dengan label atau minta data.
- AC-CHAT-04: Gangguan AI tidak menghalangi Roadmap statis.

#### US-11 — Melihat Mindmap UMKM (Future · Future)

Sebagai pemilik usaha, saya ingin melihat hubungan area usaha secara visual.

- AC-MAP-01: Mindmap adalah visualisasi konseptual, bukan skor tervalidasi atau diagnosis.
- AC-MAP-02: Personalisasi memerlukan consent dan menunjukkan sumber konteks.

### Traceability

| Kebutuhan                      | Epic / US           | Halaman                       | AC                            |
| ------------------------------ | ------------------- | ----------------------------- | ----------------------------- |
| Orientasi/navigasi             | E-01 / US-01, US-06 | Landing, semua                | AC-LND, AC-NAV                |
| Survey tersimpan → Diagnosis   | E-02 / US-02, US-07 | Survey → Diagnosis            | AC-SVY, AC-SAVE               |
| Diagnosis dan uncertainty      | E-03 / US-03        | Diagnosis                     | AC-DIA                        |
| Kalkulator mandiri/platform    | E-04 / US-04, US-08 | Calculator                    | AC-CAL, AC-PLAT               |
| Roadmap statis                 | E-05 / US-05        | Roadmap                       | AC-RMP                        |
| AI Recommendation/Chat/Mindmap | E-06 / US-09–11     | Pasca-MVP                     | AC-AI, AC-CHAT, AC-MAP        |
| Opsi Could                     | E-07 / US-12–14     | Survey, Calculator            | AC-MOTION, AC-SCEN, AC-EXPORT |
| Batas Won't for MVP            | E-08 / US-15–18     | Di luar MVP                   | Scope exclusions              |
| Quality/validation             | E-09 / US-19–20     | Survey, Calculator, Diagnosis | AC-HELP, AC-VERIFY            |

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
