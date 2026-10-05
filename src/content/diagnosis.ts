/**
 * Kamus Diagnosis `/diagnosis` — satu-satunya sumber teks halaman ini.
 *
 * Langkah awal diambil dari butir Roadmap (`roadmap.ts`) agar konsisten;
 * tautan Roadmap memakai anchor tahap statis, bukan personalisasi (AC-06-06).
 * Aturan: file ini data murni — NOL impor.
 */

export interface CategoryCopy {
  nama: string;
  /** Kalimat pendek: apa yang diukur kategori ini. */
  arti: string;
  /** Penjelasan saat kategori ini jadi hambatan utama. */
  kenapa: string;
  langkah: { judul: string; cara: string }[];
  roadmap: { href: string; label: string };
  kalkulator: boolean;
}

export const DIAGNOSIS = {
  meta: {
    title: "Hasil Diagnosis | UMIRO",
    description: "Ringkasan indikator usaha dan satu area yang paling perlu diperiksa lebih dulu.",
  },
  eyebrow: "Hasil diagnosis",
  indikatif:
    "Hasil ini indikatif: dibaca dari jawaban Anda dengan aturan yang sederhana, bukan kepastian atau penilaian ahli.",

  kosong: {
    title: "Belum ada hasil di browser ini",
    body: "Isi survei singkat dulu. Hasilnya tersimpan di browser ini saja.",
    cta: "Mulai Survei",
    href: "/survey",
  },
  rusak: "Data hasil sebelumnya rusak atau berasal dari versi survei lama, jadi sudah dibersihkan.",

  tunggal: {
    label: "Area yang paling perlu diperiksa lebih dulu",
  },
  belumJelas: {
    title: "Belum cukup jelas",
    selisih:
      "Dua area dengan skor terendah nilainya berdekatan, sehingga satu hambatan utama tidak bisa ditetapkan. Periksa keduanya.",
    data: "Banyak jawaban \"Belum tahu\" di area berikut, sehingga hambatan utama belum bisa ditetapkan. Mulailah dengan mencari tahu angka atau kondisinya.",
    kurangData: "Data kurang",
  },

  indikatorTitle: "Indikator per area",
  indikatorNote: "Skor 0–100 dari jawaban Anda. Bukan nilai lulus atau gagal.",
  alasanTitle: "Jawaban yang mendorong hasil ini",
  alasanKosong: "Tidak ada jawaban yang sangat lemah di area ini; skornya rendah dibanding area lain.",
  belumTahu: "Belum tahu",
  langkahTitle: "Langkah awal yang dapat dicoba",
  langkahNote:
    "Langkah ini pilihan yang dapat dicoba, bukan jaminan hasil. Sesuaikan dengan modal dan waktu Anda.",
  kalkulatorCta: "Hitung di Kalkulator",
  konteksTitle: "Konteks dari Anda",
  konteksNote: "Ditampilkan sebagai catatan saja; tidak mengubah skor atau saran.",
  ulang: "Isi survei lagi",
  ulangNote: "Hasil baru akan menggantikan hasil ini.",
  disimpan: (tanggal: string) => `Disimpan ${tanggal} di browser ini.`,

  kategori: {
    F: {
      nama: "Keuangan",
      arti: "Pemisahan uang usaha, pencatatan, dan pengetahuan untung-rugi.",
      kenapa:
        "Tanpa angka yang jelas, sulit tahu apakah usaha benar-benar untung. Keputusan lain jadi menebak.",
      langkah: [
        { judul: "Pisahkan uang usaha dan uang rumah tangga", cara: "Pakai dompet, kotak, atau rekening khusus usaha, lalu ambil gaji untuk diri sendiri dengan jumlah tetap." },
        { judul: "Catat biaya utama dan jumlah penjualan", cara: "Cukup tiga hal setiap hari: uang belanja bahan, jumlah terjual, dan uang masuk." },
      ],
      roadmap: { href: "/roadmap#survival", label: "Baca bagian Survival" },
      kalkulator: true,
    },
    M: {
      nama: "Harga & margin",
      arti: "Cara menentukan harga, potongan aplikasi, dan peninjauan harga.",
      kenapa:
        "Bila harga tidak menutup biaya per porsi, menambah penjualan justru menambah rugi. Ini perlu dibenahi sebelum promosi.",
      langkah: [
        { judul: "Hitung biaya per unit untuk produk utama", cara: "Jumlahkan biaya bahan satu kali masak, lalu bagi dengan jumlah porsi yang dihasilkan." },
        { judul: "Tinjau harga dari biaya dan potongan aplikasi", cara: "Pastikan harga di tempat dan di aplikasi sama-sama menyisakan untung setelah biaya bahan dan potongan." },
      ],
      roadmap: { href: "/roadmap#improvement", label: "Baca bagian Improvement" },
      kalkulator: true,
    },
    R: {
      nama: "Pelanggan kembali",
      arti: "Seberapa banyak pembeli yang datang lagi dan bagaimana mereka dihubungi.",
      kenapa:
        "Bila pembeli jarang kembali, usaha harus terus mencari pembeli baru. Kualitas dan hubungan dengan pembeli lama perlu diperiksa.",
      langkah: [
        { judul: "Jaga kualitas dan ketersediaan produk andalan", cara: "Pastikan produk yang paling sering dibeli selalu ada dan rasanya konsisten." },
        { judul: "Kenali pembeli yang datang berulang, tanpa spam", cara: "Catat siapa yang sering membeli dan hubungi hanya bila mereka setuju." },
      ],
      roadmap: { href: "/roadmap#improvement", label: "Baca bagian Improvement" },
      kalkulator: false,
    },
    A: {
      nama: "Jangkauan",
      arti: "Dari mana pembeli baru datang dan apakah usaha mudah ditemukan.",
      kenapa:
        "Calon pembeli yang cocok belum banyak menemukan usaha Anda. Pastikan dulu margin cukup sebelum mengeluarkan biaya promosi.",
      langkah: [
        { judul: "Uji kanal baru dengan biaya dan ukuran sederhana", cara: "Tentukan biaya yang siap dikeluarkan dan angka yang dilihat, misalnya jumlah pesanan per minggu." },
        { judul: "Pastikan usaha bisa ditemukan", cara: "Mulai dari yang gratis: titik lokasi di peta dan katalog sederhana yang mudah dibagikan." },
      ],
      roadmap: { href: "/roadmap#improvement", label: "Baca bagian Improvement" },
      kalkulator: false,
    },
    C: {
      nama: "Kapasitas",
      arti: "Kesanggupan melayani pesanan dan ketergantungan pada pemilik.",
      kenapa:
        "Bila semua bergantung pada Anda, menambah pembeli hanya menambah lelah. Rapikan cara kerja sebelum menambah permintaan.",
      langkah: [
        { judul: "Tuliskan cara kerja yang berulang", cara: "Tulis resep, takaran, dan urutan kerja agar orang lain bisa membantu dengan hasil serupa." },
        { judul: "Bagi pekerjaan sebelum menerima pesanan besar", cara: "Pilih satu pekerjaan ringan, seperti membungkus, dan latih orang lain mengerjakannya." },
      ],
      roadmap: { href: "/roadmap#growth", label: "Baca bagian Growth" },
      kalkulator: false,
    },
  } as Record<"F" | "M" | "R" | "A" | "C", CategoryCopy>,
} as const;
