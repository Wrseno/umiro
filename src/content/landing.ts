/**
 * Kamus Landing `/` — satu-satunya sumber teks halaman utama.
 *
 * Aturan: file ini data murni — NOL impor. Ubah teks di sini,
 * jangan di `src/app/page.tsx`.
 */

export const LANDING = {
  title: "Baca kondisi usaha Anda, sebelum memilih langkah.",
  introLead:
    "UMIRO membantu pemilik usaha mikro membaca lima sinyal kondisi usaha (keuangan, harga, pelanggan, jangkauan, kapasitas), lalu menunjukkan",
  introStrong: "satu area pemeriksaan indikatif",
  introTail: ", langkah awal berbiaya rendah, dan panduan usaha yang bisa dibaca langsung.",
  primaryCta: "Mulai Survei",
  primaryHref: "/survey",
  reassurance: "Gratis · tanpa daftar · jawaban tersimpan di browser ini saja dan hilang bila data situs dihapus",
  sorotan: [
    { angka: "±3 mnt", label: "Survei satu pertanyaan per layar" },
    { angka: "5 sinyal", label: "Keuangan, harga, pelanggan, jangkauan, kapasitas" },
  ] as Array<{ angka: string; label: string }>,
  sinyalEyebrow: "Sinyal yang diperiksa",
  sinyalTitle: "Enam dugaan yang perlu diperiksa satu per satu",
  sinyalBody:
    "Ini hipotesis awal yang masih perlu validasi lapangan, bukan fakta yang terbukti. Survei memeriksa sinyalnya pada usaha Anda sebelum menampilkan area pemeriksaan.",
  sinyal: [
    "Uang usaha dan rumah tangga tercampur sehingga omzet dianggap keuntungan.",
    "Harga ditetapkan tanpa memahami biaya dan margin per porsi.",
    "Waktu pemilik habis untuk operasional; menambah pembeli menambah lelah.",
    "Pembeli berulang belum dikenali atau dikelola.",
    "Jangkauan bertambah sebelum fondasi usaha siap.",
    "Tidak ada pencatatan sederhana untuk membandingkan perubahan.",
  ],
  fokusEyebrow: "Fokus perbaikan",
  fokusTitle: "Lingkaran tertutup: kenapa usaha tetap mentok",
  fokusBody:
    "Banyak pelaku usaha menyangka mereka kurang gigih atau kurang beriklan. Kenyataannya, mereka terjebak dalam lingkaran yang menahan pertumbuhan. Tanpa surplus, tidak ada yang bisa diputar kembali.",
  penyebab: [
    {
      no: "01",
      title: "Uang usaha dan uang dapur tercampur",
      body: "Omzet dikira keuntungan. Uang belanja bahan terpakai untuk kebutuhan rumah, sehingga tidak pernah ketahuan apakah ada surplus yang nyata.",
    },
    {
      no: "02",
      title: "Harga ikut tetangga, bukan dihitung",
      body: "Harga ditetapkan tanpa menghitung biaya bahan per porsi. Begitu harga cabai dan minyak naik, keuntungan menipis sendiri tanpa ada yang memberitahu.",
    },
    {
      no: "03",
      title: "Tenaga pemilik sudah habis",
      body: "Semua dikerjakan sendiri. Menambah pembeli hanya menambah jam kerja, padahal jam kerjanya sudah tidak tersisa.",
    },
  ],
  arahEyebrow: "Arah perbaikan",
  arahTitle: "Tiga kebiasaan yang membuka jalan",
  arahBody:
    "Perbaikan diarahkan pada area yang sinyal risikonya paling kuat, bukan urutan universal.",
  arah: [
    {
      title: "Pisahkan uang usaha dari uang rumah",
      body: "Catat masuk dan keluar setiap hari. Selama tercampur, tidak ada keputusan yang bisa dihitung.",
    },
    {
      title: "Hitung harga dari biaya bahan",
      body: "Harga yang dihitung melindungi untung ketika harga bahan naik. Harga yang ditebak tidak.",
    },
    {
      title: "Periksa satu area dalam satu waktu",
      body: "Fokus pada satu perbaikan kecil dalam satu minggu sebelum pindah ke area lain.",
    },
  ],
  peringatan: {
    title: "Ramai belum tentu untung.",
    body: "Masuk aplikasi pesan-antar sebelum margin dihitung bisa membuat penjualan terlihat ramai, padahal potongan 15–25% per pesanan menghabiskan untung per porsi.",
    cta: "Cek di Kalkulator",
    href: "/kalkulator",
  },
  tuasEyebrow: "Kerangka",
  tuasTitle: "Empat penggerak pertumbuhan usaha mikro",
  tuasBody:
    "UMIRO membaca usaha lewat empat penggerak ini, ditambah kejelasan keuangan. Keempatnya saling memengaruhi; tidak ada urutan yang berlaku untuk semua usaha.",
  tuasLabel: (n: number) => `Penggerak ${n}`,
  tuasContohLabel: "Contoh langkah",
  tuas: [
    { key: "margin", contoh: "Hitung HPP, tinjau harga, kurangi pemborosan" },
    { key: "retensi", contoh: "Jaga kualitas, ingatkan pembelian ulang dengan sopan" },
    { key: "jangkauan", contoh: "Kanal lokal, katalog sederhana, kemitraan" },
    { key: "kapasitas", contoh: "Takaran tertulis, masak bertahap, bagi pekerjaan" },
  ] as Array<{ key: "margin" | "retensi" | "jangkauan" | "kapasitas"; contoh: string }>,
  faqEyebrow: "Tanya jawab",
  faqTitle: "Pertanyaan yang sering diajukan",
  faq: [
    {
      q: "Kenapa hanya satu area yang ditandai?",
      a: "Pemilik usaha mikro biasanya tidak kekurangan saran, tetapi kebanyakan saran sekaligus. Satu area membantu memulai. Bila dua area skornya berdekatan atau datanya kurang, UMIRO menyatakan \"belum cukup jelas\" dan menunjukkan dua area, bukan memaksakan satu.",
    },
    {
      q: "Apakah hasilnya pasti benar?",
      a: "Tidak. Hasil dibaca dari jawaban Anda dengan aturan sederhana yang bisa ditinjau. Bobot dan ambangnya masih diuji. Anggap hasilnya bahan untuk memutuskan apa yang diperiksa lebih dulu, bukan vonis.",
    },
    {
      q: "Apakah jawaban dan angka saya aman?",
      a: "Jawaban dan angka disimpan di browser Anda saja dan tidak dikirim ke server mana pun. Tidak perlu akun. Konsekuensinya, data hilang bila data situs dihapus atau Anda berganti perangkat.",
    },
    {
      q: "Apakah harus mengisi survei untuk memakai Kalkulator dan Roadmap?",
      a: "Tidak. Kalkulator dan Roadmap terbuka penuh tanpa survei, dan keduanya tidak membaca hasil diagnosis.",
    },
    {
      q: "Apakah UMIRO menentukan status usaha mikro atau kecil secara hukum?",
      a: "Tidak. UMIRO tidak menetapkan klasifikasi hukum, kelayakan kredit, kewajiban pajak, atau kepatuhan regulasi.",
    },
  ] as Array<{ q: string; a: string }>,
  proofEyebrow: "Contoh hasil survei",
  proofValue: "2 area",
  proofBody: "Area pemeriksaan yang ditandai setelah survei tiga menit. Indikatif, bukan vonis.",
  proofRows: [
    ["Waktu isi", "±3 menit"],
    ["Pertanyaan", "satu per layar"],
    ["Hasil", "indikatif"],
  ] as Array<[string, string]>,
  ctaTitle: "Mulai dari survei tiga menit",
  ctaBody: "Hasilnya indikatif: bahan memutuskan area mana yang diperiksa lebih dahulu, bukan vonis atas usaha Anda.",
  ctaButton: "Mulai Survei",
} as const;
