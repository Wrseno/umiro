/**
 * Kamus Roadmap `/roadmap` — satu-satunya sumber teks halaman ini.
 *
 * Sumber: PRD §5.1 (empat lever), §5.2 (tiga tahap), Lampiran C (15 butir).
 * Aturan: file ini data murni — NOL impor. Bahasa = opsi yang dapat
 * dicoba, bukan janji (AC-06-04); dijaga `roadmap.test.ts`.
 */

export type LeverKey = "margin" | "retensi" | "jangkauan" | "kapasitas";

export interface RoadmapItem {
  judul: string;
  cara: string;
  contoh: string;
  lever: LeverKey;
}

export interface RoadmapTahap {
  id: "survival" | "improvement" | "growth";
  nama: string;
  fokus: string;
  items: RoadmapItem[];
}

export const ROADMAP = {
  meta: {
    title: "Roadmap Usaha | UMIRO",
    description:
      "Panduan baca-saja tahap Survival, Improvement, dan Growth untuk usaha mikro, disusun menurut empat penggerak pertumbuhan.",
  },
  eyebrow: "Roadmap",
  title: "Langkah yang dapat dicoba, dari bertahan sampai bertumbuh",
  intro:
    "Panduan ini terbuka untuk semua orang, tanpa perlu mengisi survei. Bacalah bagian yang paling dekat dengan kondisi usaha Anda saat ini.",
  catatan:
    "Setiap langkah adalah pilihan yang dapat dicoba, bukan perintah yang berlaku untuk semua usaha. Apakah sebuah langkah cocok bergantung pada kondisi, modal, dan waktu Anda.",

  tocLabel: "Bagian roadmap",
  leverTitle: "Empat penggerak pertumbuhan",
  leverIntro:
    "Empat penggerak ini saling memengaruhi. Tidak ada urutan yang berlaku untuk semua usaha.",
  levers: {
    margin: {
      nama: "Margin & biaya per unit",
      tanya: "Apakah setiap penjualan menyisakan uang setelah biaya bahan?",
    },
    retensi: {
      nama: "Pelanggan kembali",
      tanya: "Apakah pembeli datang lagi dan mudah dihubungi dengan sopan?",
    },
    jangkauan: {
      nama: "Jangkauan pembeli",
      tanya: "Apakah calon pembeli yang cocok bisa menemukan usaha Anda?",
    },
    kapasitas: {
      nama: "Kapasitas & cara kerja",
      tanya: "Apakah usaha bisa melayani pesanan tanpa semua beban jatuh ke pemilik?",
    },
  } as Record<LeverKey, { nama: string; tanya: string }>,

  contohLabel: "Contoh",
  leverLabel: "Penggerak",

  tahap: [
    {
      id: "survival",
      nama: "Survival",
      fokus:
        "Menjaga uang tetap mengalir, menutup kebocoran, dan mengetahui angka dasar usaha.",
      items: [
        {
          judul: "Pisahkan uang usaha dan uang rumah tangga",
          cara: "Gunakan dompet, kotak, atau rekening terpisah untuk uang usaha. Ambil gaji untuk diri sendiri dengan jumlah tetap, bukan mengambil sesuka hati dari laci.",
          contoh: "Penjual gorengan menaruh uang jualan di kaleng khusus dan mengambil Rp50.000 sehari untuk belanja dapur.",
          lever: "margin",
        },
        {
          judul: "Catat biaya utama dan jumlah penjualan",
          cara: "Cukup catat tiga hal setiap hari: uang belanja bahan, jumlah yang terjual, dan uang yang masuk. Buku tulis atau catatan di ponsel sudah cukup.",
          contoh: "Pemilik warung nasi mencatat di buku kecil: belanja Rp350.000, terjual 42 porsi, uang masuk Rp420.000.",
          lever: "margin",
        },
        {
          judul: "Hitung biaya per unit untuk produk utama",
          cara: "Jumlahkan biaya bahan untuk satu kali masak, lalu bagi dengan jumlah porsi yang dihasilkan. Kalkulator UMIRO bisa membantu menghitungnya.",
          contoh: "Satu panci soto butuh bahan Rp180.000 dan menghasilkan 30 mangkuk, jadi biaya bahannya Rp6.000 per mangkuk.",
          lever: "margin",
        },
        {
          judul: "Hentikan kebocoran dan kanal yang jelas merugikan",
          cara: "Periksa produk, menu, atau cara jual yang biayanya lebih besar dari harga jualnya. Hentikan atau ubah dulu sebelum menambah penjualan.",
          contoh: "Penjual es teh menyadari pesanan lewat aplikasi rugi setelah potongan, lalu menaikkan harga khusus di aplikasi.",
          lever: "margin",
        },
        {
          judul: "Jaga kualitas dan ketersediaan produk andalan",
          cara: "Pastikan produk yang paling sering dibeli selalu tersedia dan rasanya konsisten. Pembeli lama lebih murah dipertahankan daripada mencari pembeli baru.",
          contoh: "Penjual kue basah menyisihkan stok klepon setiap pagi karena itu yang paling dicari pelanggan tetap.",
          lever: "retensi",
        },
      ],
    },
    {
      id: "improvement",
      nama: "Improvement",
      fokus: "Membuat operasi lebih sehat, rapi, dan bisa diulang setiap hari.",
      items: [
        {
          judul: "Tinjau harga dari biaya dan nilai yang diberikan",
          cara: "Bandingkan harga jual dengan biaya per unit dan biaya tetap. Pertimbangkan juga apa yang membuat produk Anda berbeda, bukan hanya harga tetangga.",
          contoh: "Penjual ayam geprek menaikkan harga Rp1.000 setelah menghitung margin hanya Rp1.500 per porsi, sambil tetap memberi sambal gratis.",
          lever: "margin",
        },
        {
          judul: "Uji ukuran atau paket produk dan kurangi pemborosan",
          cara: "Coba satu perubahan kecil, seperti ukuran porsi, paket hemat, atau cara menyimpan bahan, lalu bandingkan hasilnya selama satu sampai dua minggu.",
          contoh: "Penjual nasi kuning mencoba paket keluarga untuk 4 orang dan menyimpan sisa lauk di wadah tertutup agar tidak terbuang.",
          lever: "margin",
        },
        {
          judul: "Kenali pembeli yang datang berulang, tanpa spam",
          cara: "Catat siapa yang sering membeli dan apa yang mereka suka. Hubungi hanya bila mereka setuju, dan jangan mengirim pesan terlalu sering.",
          contoh: "Penjual katering rumahan menawarkan pengingat menu mingguan lewat WhatsApp kepada pelanggan yang memintanya.",
          lever: "retensi",
        },
        {
          judul: "Rapikan proses produksi, pemesanan, dan pengiriman",
          cara: "Tulis urutan kerja harian dan cari langkah yang sering membuat telat atau salah. Perbaiki satu langkah dulu.",
          contoh: "Penjual dimsum memotong dan membungkus isian sehari sebelumnya, sehingga pagi hari tinggal mengukus.",
          lever: "kapasitas",
        },
        {
          judul: "Uji kanal baru dengan biaya dan ukuran yang sederhana",
          cara: "Sebelum masuk kanal baru, tentukan berapa biaya yang siap dikeluarkan dan angka apa yang dilihat untuk menilai hasilnya, misalnya jumlah pesanan per minggu.",
          contoh: "Penjual sambal botolan mencoba titip jual di dua warung tetangga selama sebulan dan mencatat jumlah botol yang laku.",
          lever: "jangkauan",
        },
      ],
    },
    {
      id: "growth",
      nama: "Growth",
      fokus:
        "Menambah jangkauan dan kapasitas secara terkendali, setelah dasar usaha cukup kuat.",
      items: [
        {
          judul: "Tuliskan cara kerja yang berulang (SOP)",
          cara: "Tuliskan resep, takaran, dan langkah kerja yang selalu sama agar orang lain bisa mengerjakannya dengan hasil serupa.",
          contoh: "Pemilik warung bakso menulis takaran bumbu kuah per 10 liter dan menempelnya di dapur.",
          lever: "kapasitas",
        },
        {
          judul: "Bagi pekerjaan sebelum menerima pesanan besar",
          cara: "Tentukan pekerjaan mana yang bisa dikerjakan orang lain, lalu latih mereka sebelum menerima pesanan dalam jumlah besar.",
          contoh: "Penjual kue kering melatih adiknya menimbang dan mengemas sebelum menerima pesanan Lebaran.",
          lever: "kapasitas",
        },
        {
          judul: "Tambah kapasitas setelah biaya per unit dan proses jelas",
          cara: "Membeli alat baru atau menyewa tempat lebih besar sebaiknya dilakukan setelah tahu margin per unit dan proses kerja sudah rapi.",
          contoh: "Penjual keripik membeli alat pengiris setelah menghitung bahwa tambahan produksi tetap menutup cicilan alat.",
          lever: "kapasitas",
        },
        {
          judul: "Pilih kanal, kemitraan, atau produk baru lewat uji coba kecil",
          cara: "Coba satu hal baru dalam skala kecil dan waktu terbatas. Lanjutkan hanya bila angkanya mendukung.",
          contoh: "Penjual rendang mencoba menitipkan produk di satu kafe selama sebulan sebelum menawarkan ke kafe lain.",
          lever: "jangkauan",
        },
        {
          judul: "Tinjau angka secara berkala sebelum memperbesar usaha",
          cara: "Setiap bulan, lihat lagi penjualan, biaya, dan laba. Gunakan angka itu untuk memutuskan langkah berikutnya.",
          contoh: "Pemilik kedai kopi membandingkan laba tiga bulan terakhir sebelum memutuskan menambah satu karyawan.",
          lever: "margin",
        },
      ],
    },
  ] as RoadmapTahap[],

  penutup: {
    title: "Ingin tahu angka usaha Anda?",
    body: "Hitung margin per unit, laba bulanan, dan titik impas dari angka Anda sendiri.",
    cta: "Buka Kalkulator",
    href: "/kalkulator",
  },
} as const;
