# Dokumen Persyaratan Produk (PRD) — UIRO (Usaha dan Growth)

| Atribut | Keterangan |
|---|---|
| Nama Produk | UIRO (Usaha dan Growth) |
| Kompetisi | SIFest Digital Innovation Challenge 2026 |
| Track | Digital Economy |
| Versi | 5.0 |
| Status | Draf 5 — siap ditinjau; kerangka diagnosis dan ambang masih perlu validasi lapangan |
| Terakhir Diperbarui | 4 Oktober 2026 |

## 1. Ringkasan Eksekutif

UIRO adalah aplikasi web yang membantu pelaku usaha mikro memahami kondisi usaha, menemukan hambatan pertumbuhan yang paling mendesak, lalu memilih tindakan yang realistis. Produk tidak menjanjikan prediksi keberhasilan. Kerangka diagnosis dan kategori keluaran di bawah ini merupakan **usulan produk yang masih perlu divalidasi** melalui wawancara dan uji penggunaan.

MVP terdiri dari lima halaman: Landing, Survey, Diagnosis, Financial Calculator, dan Roadmap. Survey menghasilkan ringkasan indikator dan bottleneck indikatif yang disimpan pada `localStorage` browser agar dapat dibaca halaman Diagnosis, Calculator, dan tautan konteks Roadmap. Penyimpanan bersifat lokal: hasil hilang jika data situs dihapus dan tidak otomatis tersedia pada browser atau perangkat lain.

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

| Lever | Pertanyaan diagnostik | Contoh intervensi |
|---|---|---|
| Margin & unit economics | Apakah tiap penjualan menyisakan kontribusi setelah biaya variabel? | Hitung HPP, tinjau harga, kurangi pemborosan |
| Retensi & relasi pelanggan | Apakah pembeli kembali dan mudah dihubungi secara etis? | Kualitas produk, pengingat pembelian ulang, layanan |
| Reach & acquisition | Apakah calon pembeli yang relevan dapat menemukan usaha? | Kanal lokal, katalog, kemitraan, konten |
| Capacity & operating system | Apakah usaha dapat melayani permintaan tanpa seluruh beban berada pada pemilik? | SOP sederhana, batching, pembagian kerja |

Keempat lever saling memengaruhi. Tidak ada urutan universal bahwa margin selalu harus dibenahi lebih dahulu. Produk dapat menampilkan margin sebagai prioritas bila indikator data menunjukkan risiko, tetapi keputusan akhir harus dijelaskan sebagai rekomendasi berbasis aturan dan perlu diuji pada pengguna.

### 5.2 Tahap pertumbuhan sebagai narasi

Roadmap memakai tiga tahap naratif berikut agar cakupannya mudah dipahami:

| Tahap naratif | Fokus | Contoh keluaran |
|---|---|---|
| Survival | Menjaga arus kas, mengurangi kebocoran, mengetahui angka dasar, dan mempertahankan operasi | Pisahkan uang, hitung biaya, pilih produk utama, hindari keputusan yang memperbesar rugi |
| Improvement | Membuat operasi lebih sehat dan berulang | Tinjau harga, tingkatkan retensi, rapikan proses, uji kanal dengan biaya rendah |
| Growth | Meningkatkan jangkauan dan kapasitas secara terkendali | Delegasi, SOP, kanal baru, pengukuran dan eksperimen |

Tahap ini hanya pengelompokan konten roadmap dan tidak menentukan akses atau perilaku pengguna.

### 5.2a Rujukan Churchill–Lewis dan konteks skala UMKM

Model *The Five Stages of Small-Business Growth* karya Neil C. Churchill dan Virginia L. Lewis diterbitkan di *Harvard Business Review* pada 1983. Artikel aslinya menggunakan istilah *small business*, bukan klasifikasi hukum UMKM Indonesia berdasarkan batas omzet atau jumlah karyawan. Skala dianalisis melalui ukuran usaha, keragaman, kompleksitas manajemen, struktur organisasi, sistem formal, tujuan strategis, dan keterlibatan pemilik.

Dalam konteks UIRO, model ini dapat dipakai sebagai **rujukan konseptual untuk membaca rentang perjalanan usaha dari mikro hingga menengah**, bukan sebagai bukti bahwa setiap tahap setara secara hukum dengan kategori Mikro, Kecil, atau Menengah:

| Tahap Churchill–Lewis | Kecenderungan konteks UMKM | Relevansi terhadap UIRO |
|---|---|---|
| Existence | Sering menyerupai usaha mikro yang sedang membuktikan produk, pelanggan, dan arus kas. | Menjadi konteks tambahan, tetapi pengguna primer UIRO umumnya sudah berjualan. |
| Survival | Sering menyerupai usaha mikro yang sudah memiliki pelanggan dan berfokus menjaga arus kas serta kelangsungan operasi. | Sangat relevan untuk isi roadmap dan masalah utama produk. |
| Success | Dapat mencerminkan usaha kecil yang sudah stabil, menghasilkan laba, dan mulai mendelegasikan pekerjaan. | Relevan untuk materi improvement dan kesiapan sistem, tetapi tidak dipakai sebagai label hasil survey. |
| Take-off | Dapat mencerminkan usaha yang mulai memperbesar penjualan, kapasitas, modal, dan struktur manajemen. | Relevan untuk materi growth yang terkendali; bukan target wajib semua pengguna. |
| Resource Maturity | Dapat menyerupai usaha menengah yang memiliki sistem, sumber daya, dan manajemen lebih formal. | Menjadi konteks lanjutan roadmap, bukan sasaran MVP atau klaim kondisi pengguna. | |

Pemetaan mikro–kecil–menengah tersebut adalah **interpretasi praktis lintas konteks**, bukan klasifikasi yang dinyatakan secara eksplisit oleh Churchill dan Lewis. Usaha dapat melompati, berhenti, kembali, atau berkembang tidak linear antar tahap. Karena itu, UIRO tidak boleh menyimpulkan skala hukum usaha, kelayakan kredit, atau status formal hanya dari jawaban survey.

Sumber utama model adalah artikel HBR asli (Churchill & Lewis, 1983). Sumber sekunder dapat menjelaskan penerapannya di Indonesia, tetapi tidak membuktikan validitas instrumen scoring UIRO. Pemetaan ini perlu diuji melalui wawancara dan review ahli UMKM sebelum dipakai sebagai logika diagnosis.

### 5.3 Bottleneck dan indikator

Diagnosis menampilkan satu bottleneck **indikatif**: area dengan sinyal risiko paling kuat atau data paling tidak jelas menurut aturan scoring yang dapat ditinjau. Jika skor berdekatan atau data tidak cukup, UI harus menyatakan ketidakpastian dan menampilkan area yang perlu diperiksa, bukan mengklaim kepastian.

### 5.4 Kategori keluaran survey

Survey mengusulkan tujuh kategori berikut:

| Kode | Kategori | Variabel/indikator display |
|---|---|---|
| F | Financial clarity | pemisahan uang, pencatatan, pengetahuan biaya, pengetahuan surplus |
| M | Margin & pricing | cara menentukan harga, biaya per unit, frekuensi review harga, potongan kanal |
| R | Retention | pembeli berulang, pengenalan pelanggan, alasan pembelian ulang |
| A | Reach | sumber pelanggan baru, kanal penjualan, keterlihatan lokal/digital |
| C | Capacity | jam kerja, batas produksi, ketergantungan pada pemilik, bantuan/SOP |
| S | Stability & constraints | kestabilan permintaan, modal yang dapat dipakai, waktu tersedia |
| G | Goal & direction | target penghasilan, tujuan utama, horizon keputusan |

F–C adalah dimensi diagnostik utama. S adalah konteks pembatas untuk menyaring tindakan. G adalah konteks arah untuk memilih contoh tindakan. Display indicators bukan gate tahap dan bukan bukti bottleneck tunggal. Ambang, bobot, jumlah pertanyaan, serta hubungan indikator dengan bottleneck adalah keputusan rancangan yang harus diuji dan dapat berubah.

## 6. Gambaran Solusi dan Inventaris Halaman

MVP memiliki halaman berikut:

| Halaman | Rute | Fungsi MVP |
|---|---|---|
| Landing | `/` | Menjelaskan masalah, batasan hasil, dan CTA ke Survey. |
| Survey | `/survey` | Pertanyaan singkat satu per layar, progres, navigasi mundur, dan penyimpanan lokal sementara. |
| Diagnosis | `/diagnosis` | Menampilkan ringkasan indikator, bottleneck indikatif, alasan, ketidakpastian bila ada, dan langkah awal. Memuat tautan ke roadmap dan kalkulator. |
| Financial Calculator | `/kalkulator` | Menghitung margin kontribusi, estimasi laba bersih, titik impas, dan target penjualan berdasarkan input pengguna. |
| Roadmap | `/roadmap` | Panduan baca-saja survival, improvement, dan growth untuk empat growth levers; tidak memiliki kelas, status terkunci, atau pelacakan progres. |

Roadmap adalah halaman MVP nyata, bukan bagian tersamar pada Landing atau Diagnosis. Kontennya luas dan statis; Diagnosis hanya menautkan pengguna ke bagian roadmap yang relevan.

Halaman tambahan non-MVP:

- `/recommendation`: AI Recommendation, memberi saran personal setelah keamanan, privasi, dan kualitas rekomendasi divalidasi.
- `/mindmap`: UMKM Mindmap, memvisualisasikan hubungan area usaha dan tindakan.
- `/chat`: Conversational AI, percakapan yang terhubung pada topik roadmap, jawaban survey, dan indikator diagnosis. Ini future scope/Should consider, bukan MVP dan bukan Won't Have.

Alur utama: Landing → Survey → Diagnosis → Financial Calculator. Diagnosis dan navigasi menyediakan akses langsung ke Roadmap. Jika data lokal tidak tersedia atau hasil belum ada, Diagnosis menampilkan ajakan mengisi Survey; tidak ada pemulihan lintas perangkat.

## 7. Metrik Keberhasilan

Target berikut adalah target uji MVP, bukan klaim performa yang sudah tercapai:

| Tujuan | Indikator | Target awal |
|---|---|---|
| Penyelesaian | Pengguna uji menyelesaikan Survey tanpa bantuan | ≥80% dari 5 pengguna |
| Pemahaman | Pengguna dapat menjelaskan bottleneck sebagai indikasi, bukan kepastian | ≥80% dari 5 pengguna |
| Relevansi | Pengguna menilai minimal satu langkah awal relevan dan realistis | ≥4 dari 5 pengguna |
| Keuangan | Pengguna dapat menyebut margin/titik impas setelah kalkulator | ≥80% dari 5 pengguna |
| Keandalan lokal | Hasil tetap tersedia setelah berpindah halaman pada browser yang sama | 100% pengujian manual |
| Kejelasan batasan | Pengguna memahami hasil lokal hilang jika data situs dihapus atau browser/perangkat diganti | 100% pengguna uji memahami |
| Roadmap | Pengguna dapat menemukan bagian Survival, Improvement, dan Growth serta satu tindakan yang sesuai konteks | ≥80% dari 5 pengguna |

Validasi jangka panjang, dampak rupiah, akurasi bottleneck, dan peningkatan pendapatan belum dapat diklaim dari MVP.

## 8. User Stories dan Acceptance Criteria

### US-01 — Landing

Sebagai pemilik usaha, saya ingin memahami manfaat dan batasan produk, agar saya dapat memutuskan apakah Survey relevan.

- AC-LND-01: Landing menjelaskan lima halaman MVP dan CTA menuju `/survey`.
- AC-LND-02: Landing menyatakan diagnosis bersifat indikatif dan bukan audit/konsultasi.
- AC-LND-03: Landing menjelaskan hasil tersimpan lokal pada browser dan keterbatasan penghapusan/pergantian browser atau perangkat.

### US-02 — Survey

Sebagai pemilik usaha, saya ingin menjawab pertanyaan singkat dengan bahasa sehari-hari, agar saya dapat memberi konteks tanpa memahami istilah bisnis.

- AC-SVY-01: Survey menampilkan satu pertanyaan per layar, progres, tombol Kembali, dan pilihan jawaban.
- AC-SVY-02: Pertanyaan mencakup kategori F, M, R, A, C, S, dan G; jumlah final ditentukan setelah uji durasi maksimal tiga menit.
- AC-SVY-03: Setiap jawaban tersimpan lokal dan tidak hilang saat berpindah pertanyaan.
- AC-SVY-04: Pilihan “Belum tahu/Belum pernah menghitung” tersedia bila relevan dan diperlakukan sebagai sinyal ketidakjelasan.
- AC-SVY-05: Pengguna tidak dapat menyelesaikan Survey tanpa menjawab pertanyaan wajib.
- AC-SVY-06: Setelah selesai, jawaban dan hasil scoring tersimpan dalam `localStorage` dengan payload berversi, lalu pengguna diarahkan ke Diagnosis.

### US-03 — Diagnosis

Sebagai pemilik usaha, saya ingin melihat area yang perlu diperiksa lebih dahulu, agar saya dapat memilih langkah awal yang realistis.

- AC-DIA-01: Diagnosis membaca hasil dari `localStorage` browser yang sama.
- AC-DIA-02: Diagnosis menampilkan indikator per kategori, satu bottleneck indikatif, alasan pemilihan, dan tingkat ketidakpastian bila data berdekatan/tidak cukup.
- AC-DIA-03: Diagnosis membedakan indikator display dari aturan scoring; hasil tidak menentukan akses ke konten.
- AC-DIA-04: Langkah awal mengacu pada bottleneck dan mempertimbangkan S serta G sebagai konteks, tanpa menjanjikan hasil.
- AC-DIA-05: Diagnosis menyediakan tautan ke Financial Calculator dan roadmap statis.
- AC-DIA-06: Akses tanpa hasil `localStorage` yang valid menampilkan CTA kembali ke Survey.

### US-04 — Financial Calculator

Sebagai pemilik usaha, saya ingin menghitung margin dan kebutuhan penjualan, agar keputusan harga dan target memakai angka usaha saya sendiri.

- AC-CAL-01: Input mencakup harga jual/unit, biaya variabel/unit, unit terjual/hari, hari operasional/bulan, biaya tetap/bulan, dan target laba bersih opsional.
- AC-CAL-02: Pengguna dapat memasukkan biaya variabel per unit atau total biaya produksi beserta jumlah unit hasil produksi; jika biaya produksi dibagi nol, sistem menolak perhitungan.
- AC-CAL-03: Sistem menampilkan margin kontribusi/unit, estimasi laba bersih bulanan, titik impas unit/hari, dan unit/hari untuk target bila terdefinisi.
- AC-CAL-04: Sistem menolak nilai negatif untuk harga, biaya, volume, hari operasi, dan biaya tetap. Harga nol atau hari operasi nol menghasilkan validasi, bukan hasil numerik.
- AC-CAL-05: Jika margin kontribusi `M ≤ 0`, sistem menyatakan penjualan tambahan tidak memperbaiki hasil dan tidak menampilkan titik impas atau target berbasis volume.
- AC-CAL-06: Jika biaya tetap `F = 0` dan `M > 0`, titik impas ditampilkan sebagai 0 unit/hari. Jika target laba `T` kurang dari atau sama dengan estimasi laba saat ini, kebutuhan target tidak boleh ditampilkan negatif; UI menyatakan target sudah tercapai.
- AC-CAL-07: Hasil memakai pembulatan unit ke atas dan format Rupiah; UI menyatakan pajak, penyusutan, dan tenaga kerja pemilik tidak tercakup bila tidak dimasukkan.
- AC-CAL-08: Hasil kalkulator disimpan lokal pada browser yang sama dan tetap dapat dipakai tanpa hasil diagnosis.

### US-05 — Roadmap statis

Sebagai pemilik usaha, saya ingin membaca langkah survival, improvement, dan growth, agar saya dapat memilih pembelajaran lanjutan sesuai kondisi.

- AC-RMP-01: `/roadmap` menampilkan bagian Survival, Improvement, dan Growth serta tindakan terkait empat growth levers.
- AC-RMP-02: Roadmap mencakup langkah biaya rendah, langkah perbaikan, serta langkah growth; konten tidak hanya membahas pemasaran digital.
- AC-RMP-03: Roadmap bersifat baca-saja; tidak ada kelas pengguna, penanda progres, status terkunci, penyelesaian tindakan, atau syarat akses.
- AC-RMP-04: Tindakan ditulis sebagai opsi/contoh yang perlu disesuaikan, bukan instruksi universal atau jaminan hasil.
- AC-RMP-05: Pengguna dapat membuka Roadmap tanpa mengisi Survey; tautan dari Diagnosis boleh menyorot topik relevan tanpa menyembunyikan bagian lain.

### US-06 — Navigasi dan batas lokal

- AC-NAV-01: Navigasi menghubungkan Landing, Survey, Diagnosis, Financial Calculator, dan Roadmap.
- AC-NAV-02: Layout responsif pada ponsel.
- AC-NAV-03: Penghapusan data situs atau perpindahan browser/perangkat diperlakukan sebagai tidak adanya hasil tersimpan.

## 9. Prioritas MoSCoW

### Must Have (MVP)

1. Landing dengan proposisi nilai dan batasan.
2. Survey kategori F/M/R/A/C/S/G, progres, validasi, dan penyimpanan lokal.
3. Diagnosis indikator, bottleneck indikatif, penjelasan, ketidakpastian, dan langkah awal.
4. Financial Calculator dengan margin, estimasi hasil bersih, titik impas, dan target.
5. Roadmap statis survival/improvement/growth untuk empat growth levers.
6. Navigasi responsif dan penanganan penyimpanan lokal.

### Should Have (MVP bila waktu memungkinkan)

1. Bantuan bahasa sehari-hari dan contoh pengisian.
2. Perbandingan penjualan langsung dan potongan platform sebagai input kalkulator opsional.
3. Ringkasan hasil yang dapat disalin manual, tanpa sinkronisasi akun.
4. Uji manual bobot, ambang, dan perubahan input.

### Could Have

1. Animasi transisi survey.
2. Simulasi beberapa skenario harga/biaya.
3. Ekspor atau print hasil lokal, setelah privasi ditinjau.

### Won't Have untuk MVP

1. Akun, login, backend persistence, kode pemulihan, dan sinkronisasi lintas perangkat.
2. Pencatatan transaksi harian.
3. Integrasi marketplace/pembayaran.
4. Dashboard pendamping dan komunitas.
5. Halaman AI Recommendation dan UMKM Mindmap.

Conversational AI tetap berada pada backlog masa depan yang diprioritaskan setelah validasi; fitur ini tidak termasuk daftar Won't Have permanen.

## 10. Ruang Lingkup

### Termasuk MVP

Lima halaman nyata: Landing, Survey, Diagnosis, Financial Calculator, dan Roadmap; diagnosis indikatif deterministik berbasis aturan lokal; kalkulator lokal; roadmap statis baca-saja; layout responsif; dan browser-local persistence.

### Tidak termasuk MVP

Layanan AI, rekomendasi generatif, mindmap interaktif, akun, server database untuk hasil pengguna, pemulihan lintas perangkat, tracking progres roadmap dan evaluasi longitudinal.

## 11. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Kerangka dan bobot belum tervalidasi | Diagnosis bisa tidak relevan | Labeli sebagai usulan, uji 5–10 pengguna, revisi setelah bukti |
| Survey terlalu panjang | Penyelesaian turun | Uji waktu, kurangi pertanyaan, pertahankan coverage kategori |
| Pengguna salah memasukkan biaya | Hasil kalkulator menyesatkan | Contoh input, validasi, penjelasan batasan |
| Data lokal dihapus/incognito/perangkat berganti | Hasil tidak tersedia | Pesan batasan jelas; gunakan `localStorage`; jangan klaim recovery |
| Bottleneck tunggal terlalu menyederhanakan | Saran salah prioritas | Tampilkan alasan dan ketidakpastian; sediakan indikator lain |
| Bahasa roadmap dianggap janji | Ekspektasi tidak realistis | Gunakan “contoh/langkah yang dapat dicoba”, bukan hasil pasti |
| AI di masa depan mengekspos data survey | Risiko privasi | Persetujuan eksplisit, minimisasi data, kebijakan retensi, fallback lokal |

## 12. Teknologi dan Persistensi

- Next.js App Router dan TypeScript.
- Tailwind CSS dan shadcn/ui bila sudah tersedia di proyek; tidak menambah dependency tanpa kebutuhan.
- Scoring, kategori, dan kalkulasi berjalan lokal/deterministik pada MVP.
- `localStorage` menyimpan jawaban survey, ringkasan diagnosis, dan hasil kalkulator dalam payload berversi dan berukuran terbatas. Saat data rusak/tidak dikenal, sistem mengabaikannya dengan aman, menghapus payload rusak, dan meminta pengguna mengulang survey bila perlu.
- Pengguna diberi tahu data hanya tersedia pada browser yang sama dan dapat hilang saat data situs dibersihkan atau mode privat ditutup. Tidak ada data sensitif yang dikirim ke server pada MVP.
- Tidak ada Neon/Postgres, Route Handler, identitas anonim, API key, atau layanan AI yang diperlukan untuk MVP. Arsitektur server/database hanya dipertimbangkan jika kebutuhan sinkronisasi disetujui kemudian.
- Nilai uang menggunakan bilangan rupiah; validasi mencegah input negatif yang tidak bermakna dan pembagian dengan nol.
- Build quality gate: lint, typecheck, unit test rumus kalkulator, dan production build.

## 13. Keputusan dan Hal yang Perlu Validasi

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

Aturan bottleneck awal: pilih kategori diagnostik dengan skor terendah hanya jika terdapat cukup data yang terjawab dan selisih skor terendah dengan skor berikutnya lebih besar dari 10 poin. Jika selisih ≤10 poin, atau jawaban valid kurang dari separuh indikator kategori mana pun yang bersaing, tampilkan “belum cukup jelas” beserta maksimal dua area yang perlu diperiksa; jangan paksa satu pemenang. S dan G hanya konteks untuk menyaring/menyusun contoh langkah, tidak mengubah skor diagnostik. Skala, bobot, ambang selisih, dan kecukupan data adalah hipotesis rancangan yang harus diuji, bukan nilai tervalidasi.

Output Diagnosis:

1. Ringkasan indikator per kategori, tanpa label “lulus/gagal”.
2. Satu bottleneck indikatif atau pernyataan “belum cukup jelas”.
3. Alasan berbasis jawaban pengguna.
4. Dua atau tiga langkah awal berbiaya rendah bila tersedia.
5. Tautan ke kalkulator dan bagian roadmap yang relevan.

## Lampiran A1 — Kasus uji aturan diagnosis

| Kasus | Hasil yang diharapkan |
|---|---|
| Margin kontribusi nol/negatif dan jangkauan tinggi | Prioritaskan pemeriksaan margin/biaya; jangan menyarankan penambahan promosi sebagai langkah pertama. |
| Margin positif tetapi pelanggan jarang kembali | Tampilkan sinyal retensi bila lebih kuat daripada kategori diagnostik lain. |
| Permintaan melebihi kemampuan produksi pemilik | Tampilkan sinyal kapasitas; S menyaring tindakan menurut waktu/modal, bukan mengubah skor kategori. |
| Keuangan tidak jelas sementara kanal penjualan banyak | Jangan biarkan jangkauan tinggi menutupi sinyal keuangan yang kuat. |
| Dua kategori memiliki skor terendah dengan selisih ≤10 | Tampilkan “belum cukup jelas” dan dua area untuk diperiksa; jangan tetapkan bottleneck tunggal. |
| Jawaban kategori bersaing kurang dari separuh indikator valid | Tampilkan kekurangan informasi dan jangan tetapkan kategori itu sebagai bottleneck. |

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

| Input/kondisi | Expected behavior |
|---|---|
| `H=10.000`, `V=7.700`, `Q=40`, `D=26`, `F=1.800.000` | `M=2.300`; estimasi laba bersih `592.000`; titik impas `31` unit/hari. |
| `M=0` atau `M<0` | Penjelasan margin nol/negatif; tidak ada hasil impas/target berbasis volume. |
| `F=0`, `M>0`, `D>0` | Titik impas `0` unit/hari. |
| `D=0` atau `H=0` | Validasi input; tidak ada pembagian nol atau angka target palsu. |
| `T` ≤ laba bersih berjalan | Target dinyatakan tercapai; tambahan unit `0`. |
| Biaya atau volume negatif, `NaN`, atau tak hingga | Input ditolak dan hasil sebelumnya tidak diganti oleh angka invalid. |

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
