/**
 * Katalog soal Survey v1 + kamus halaman `/survey`.
 *
 * Sumber: `work-docs/Pembuatan Survei Diagnosis UMKM.md` (soal, bobot
 * 0–100, flag "Belum tahu"); teks disederhanakan ke bahasa sehari-hari
 * (AC-02-06), bobot TIDAK diubah. Aturan scoring: ADR-004.
 * Ubah soal/bobot = naikkan `version` (ADR-003: payload lama dibuang).
 *
 * Aturan: file ini data murni — NOL impor.
 */

export type CategoryKey = "F" | "M" | "R" | "A" | "C";
export type ContextKey = "S" | "G";

export interface SurveyOption {
  id: string;
  label: string;
  /** Bobot 0–100 (soal diagnostik); `null` untuk soal konteks S/G. */
  weight: number | null;
  /** Jawaban "Belum tahu" — tidak dirata-rata, dihitung untuk kecukupan data. */
  flag?: true;
}

export interface SurveyQuestion {
  id: string;
  category: CategoryKey | ContextKey;
  text: string;
  /** Penjelasan istilah, tampil bila diminta (AC-02-06). */
  bantuan?: string;
  options: SurveyOption[];
}

const BELUM_TAHU = "Belum tahu / tidak yakin";

export const SURVEY_CATALOG = {
  version: 1,
  questions: [
    // ── F: Kejelasan keuangan ─────────────────────────────────
    {
      id: "F1",
      category: "F",
      text: "Bagaimana uang hasil jualan disimpan?",
      options: [
        { id: "a", label: "Dicampur dengan uang belanja rumah tangga, di dompet yang sama.", weight: 0 },
        { id: "b", label: "Dipisah (laci atau amplop lain), tapi sering terpakai untuk keperluan rumah tanpa dicatat.", weight: 30 },
        { id: "c", label: "Ada kas atau rekening khusus usaha, dan setiap uang yang diambil untuk pribadi selalu dicatat.", weight: 70 },
        { id: "d", label: "Rekening usaha terpisah, dan semua uang keluar-masuk tercatat rapi di aplikasi atau komputer.", weight: 100 },
        { id: "x", label: BELUM_TAHU, weight: 0, flag: true },
      ],
    },
    {
      id: "F2",
      category: "F",
      text: "Bagaimana Anda mencatat uang masuk dan keluar?",
      options: [
        { id: "a", label: "Tidak dicatat, hanya diingat atau melihat sisa uang.", weight: 0 },
        { id: "b", label: "Kadang dicatat, biasanya hanya pemasukan yang besar.", weight: 30 },
        { id: "c", label: "Dicatat setiap hari di buku: semua uang masuk dan keluar.", weight: 70 },
        { id: "d", label: "Tercatat otomatis lewat aplikasi kasir atau aplikasi pembukuan.", weight: 100 },
        { id: "x", label: BELUM_TAHU, weight: 0, flag: true },
      ],
    },
    {
      id: "F3",
      category: "F",
      text: "Apakah Anda tahu usaha untung atau rugi bulan lalu?",
      options: [
        { id: "a", label: "Tidak tahu. Selama besok masih bisa belanja bahan, usaha dianggap jalan.", weight: 0 },
        { id: "b", label: "Hanya perkiraan dari sisa uang di akhir bulan.", weight: 30 },
        { id: "c", label: "Tahu angkanya setelah menjumlah semua pemasukan dan pengeluaran sebulan.", weight: 80 },
        { id: "d", label: "Tahu angkanya, termasuk setelah dikurangi penyusutan alat dan pajak.", weight: 100 },
        { id: "x", label: "Belum pernah menghitung", weight: 0, flag: true },
      ],
    },

    // ── M: Harga dan margin ───────────────────────────────────
    {
      id: "M1",
      category: "M",
      text: "Bagaimana Anda menentukan harga jual?",
      bantuan:
        "HPP (Harga Pokok Penjualan) adalah biaya untuk membuat satu porsi atau satu barang: bahan, kemasan, gas, dan tenaga.",
      options: [
        { id: "a", label: "Mengikuti harga pesaing di sekitar, tanpa menghitung modal sendiri.", weight: 0 },
        { id: "b", label: "Menghitung bahan utama saja, lalu ditambah perkiraan untung.", weight: 30 },
        { id: "c", label: "Menghitung semua biaya per porsi (bahan, kemasan, tenaga), lalu ditambah untung.", weight: 80 },
        { id: "d", label: "Menghitung semua biaya per porsi dan memastikan harga juga menutup biaya bulanan (sewa, listrik, gas).", weight: 100 },
        { id: "x", label: BELUM_TAHU, weight: 0, flag: true },
      ],
    },
    {
      id: "M2",
      category: "M",
      text: "Kalau berjualan lewat aplikasi (ojek online atau marketplace), bagaimana harganya?",
      bantuan:
        "Aplikasi pesan-antar dan marketplace biasanya memotong sekitar 15–25% dari harga jual sebagai komisi.",
      options: [
        { id: "a", label: "Sama dengan harga di tempat; potongan aplikasi saya tanggung sendiri.", weight: 0 },
        { id: "b", label: "Dinaikkan sedikit, tapi belum menutup seluruh potongan aplikasi.", weight: 40 },
        { id: "c", label: "Dinaikkan sesuai potongan, sehingga untung per porsi sama dengan jualan langsung.", weight: 90 },
        { id: "d", label: "Saya tidak berjualan lewat aplikasi yang memotong harga.", weight: 100 },
        { id: "x", label: "Belum tahu / belum memikirkan potongan", weight: 0, flag: true },
      ],
    },
    {
      id: "M3",
      category: "M",
      text: "Seberapa sering Anda meninjau ulang harga jual?",
      options: [
        { id: "a", label: "Tidak pernah diubah sejak awal berjualan, takut pembeli pergi.", weight: 0 },
        { id: "b", label: "Jarang, hanya saat harga bahan naik sangat tinggi.", weight: 30 },
        { id: "c", label: "Rutin, misalnya tiap 1–3 bulan, lalu harga atau porsi disesuaikan bila perlu.", weight: 100 },
        { id: "x", label: BELUM_TAHU, weight: 0, flag: true },
      ],
    },

    // ── R: Pelanggan kembali ──────────────────────────────────
    {
      id: "R1",
      category: "R",
      text: "Dari pembeli Anda, seberapa banyak yang datang lagi?",
      options: [
        { id: "a", label: "Hampir semua orang baru; jarang ada yang membeli untuk kedua kali.", weight: 0 },
        { id: "b", label: "Ada satu-dua yang kembali, tapi usaha sangat bergantung pada pembeli baru.", weight: 40 },
        { id: "c", label: "Seimbang; saya mulai mengenali cukup banyak pembeli tetap.", weight: 70 },
        { id: "d", label: "Sebagian besar pelanggan tetap yang terus kembali tanpa perlu diajak.", weight: 100 },
        { id: "x", label: "Belum tahu / tidak memperhatikan", weight: 0, flag: true },
      ],
    },
    {
      id: "R2",
      category: "R",
      text: "Apa yang Anda lakukan dengan kontak pembeli?",
      options: [
        { id: "a", label: "Tidak ada; setelah membayar, selesai.", weight: 0 },
        { id: "b", label: "Beberapa nomor tersimpan di WhatsApp, tapi tidak pernah dihubungi lagi.", weight: 40 },
        { id: "c", label: "Saya kumpulkan kontak dan sesekali mengabarkan menu atau promo dengan sopan.", weight: 80 },
        { id: "d", label: "Ada program pelanggan (kartu poin, member) atau catatan belanja tiap pelanggan.", weight: 100 },
        { id: "x", label: "Belum tahu / belum terpikir", weight: 0, flag: true },
      ],
    },

    // ── A: Jangkauan ──────────────────────────────────────────
    {
      id: "A1",
      category: "A",
      text: "Dari mana sebagian besar pembeli baru datang?",
      options: [
        { id: "a", label: "Hanya orang yang kebetulan lewat di depan tempat usaha.", weight: 10 },
        { id: "b", label: "Dari cerita orang ke orang, tanpa saya ajak.", weight: 40 },
        { id: "c", label: "Saya rutin promosi: unggah di media sosial atau WhatsApp, atau sebar brosur.", weight: 80 },
        { id: "d", label: "Usaha mudah ditemukan di Google Maps atau aplikasi pesan-antar, dan saya memasang iklan.", weight: 100 },
        { id: "x", label: "Belum tahu dari mana mereka datang", weight: 0, flag: true },
      ],
    },
    {
      id: "A2",
      category: "A",
      text: "Bagaimana calon pembeli bisa melihat produk Anda?",
      options: [
        { id: "a", label: "Tidak ada tempat jualan atau katalog; orang tahu hanya dari pesan pribadi.", weight: 0 },
        { id: "b", label: "Ada warung atau toko, tapi tidak muncul di pencarian internet atau peta.", weight: 40 },
        { id: "c", label: "Jualan online saja tanpa tempat untuk tamu, tapi katalog online rapi.", weight: 70 },
        { id: "d", label: "Ada tempat jualan yang mudah didatangi dan juga katalog online (Google Maps, media sosial).", weight: 100 },
        { id: "x", label: "Belum tahu / belum memikirkan", weight: 0, flag: true },
      ],
    },

    // ── C: Kapasitas ──────────────────────────────────────────
    {
      id: "C1",
      category: "C",
      text: "Kalau besok pesanan tiba-tiba naik tiga kali lipat, apa yang terjadi?",
      options: [
        { id: "a", label: "Saya terpaksa menolak pesanan atau tutup karena tidak sanggup.", weight: 0 },
        { id: "b", label: "Saya harus bekerja sendirian lebih dari 15 jam.", weight: 30 },
        { id: "c", label: "Bisa, karena ada keluarga atau pekerja lepas yang siap dipanggil.", weight: 70 },
        { id: "d", label: "Sangat sanggup; alat, jadwal masak, dan tenaga masih jauh dari batas.", weight: 100 },
        { id: "x", label: BELUM_TAHU, weight: 0, flag: true },
      ],
    },
    {
      id: "C2",
      category: "C",
      text: "Kalau Anda sakit sehari, bagaimana usaha?",
      options: [
        { id: "a", label: "Tutup total; semua saya kerjakan sendiri.", weight: 0 },
        { id: "b", label: "Kebanyakan tetap di tangan saya, tapi ada yang membantu pekerjaan ringan (cuci, bungkus).", weight: 40 },
        { id: "c", label: "Tetap jalan 1–2 hari; pekerja sudah paham tugas utamanya.", weight: 80 },
        { id: "d", label: "Tetap jalan berminggu-minggu; ada pembagian kerja dan pengawas.", weight: 100 },
        { id: "x", label: "Belum tahu / belum terpikir", weight: 0, flag: true },
      ],
    },
    {
      id: "C3",
      category: "C",
      text: "Apakah resep, takaran, dan cara kerja sudah tertulis?",
      bantuan: "Cara kerja tertulis (SOP) membuat orang lain bisa mengerjakan dengan hasil yang sama.",
      options: [
        { id: "a", label: "Tidak ada takaran tetap; semua pakai perasaan dan ingatan saya.", weight: 0 },
        { id: "b", label: "Ada takarannya, tapi hanya di kepala saya.", weight: 30 },
        { id: "c", label: "Sudah ditulis di buku dan bisa ditiru oleh yang membantu.", weight: 80 },
        { id: "d", label: "Tertulis rinci, ada target waktu, dan setiap pekerja baru dilatih.", weight: 100 },
        { id: "x", label: "Belum tahu / belum sempat", weight: 0, flag: true },
      ],
    },

    // ── Konteks (tidak masuk skor) ────────────────────────────
    {
      id: "S1",
      category: "S",
      text: "Selain urusan teknis usaha, apa hambatan terbesar Anda saat ini?",
      options: [
        { id: "a", label: "Uang usaha sedang menipis.", weight: null },
        { id: "b", label: "Waktu habis karena punya pekerjaan lain.", weight: null },
        { id: "c", label: "Modal dan waktu cukup, tapi bingung harus mulai dari mana.", weight: null },
      ],
    },
    {
      id: "G1",
      category: "G",
      text: "Apa tujuan utama usaha Anda setahun ke depan?",
      options: [
        { id: "a", label: "Bertahan: uang harian cukup.", weight: null },
        { id: "b", label: "Membaik: untung lebih stabil tanpa terlalu lelah.", weight: null },
        { id: "c", label: "Bertumbuh: menambah cabang atau kapasitas besar.", weight: null },
      ],
    },
  ] as SurveyQuestion[],
} as const;

export const SURVEY = {
  meta: {
    title: "Survei Usaha | UMIRO",
    description: "Jawab 15 pertanyaan singkat tentang usaha Anda. Sekitar tiga menit.",
  },
  title: "Survei kondisi usaha",
  intro:
    "Jawab sesuai keadaan usaha Anda sekarang, bukan yang ideal. Hasilnya menunjukkan area yang paling perlu diperiksa lebih dulu.",
  meta1: "15 pertanyaan · sekitar 3 menit",
  badge: "Tanpa akun · tersimpan di browser",
  kategoriKonteks: "Konteks usaha",
  progress: (n: number, total: number) => `Pertanyaan ${n} dari ${total}`,
  persen: (p: number) => `${p}%`,
  belumTahuNote:
    "Memilih \"Belum tahu\" tidak apa-apa. Jawaban jujur membuat hasil lebih tepat daripada menebak.",
  back: "Kembali",
  next: "Lanjut",
  submit: "Lihat hasil",
  submitting: "Menyimpan…",
  pilihDulu: "Pilih satu jawaban untuk lanjut.",
  belumLengkap: (n: number) => `Masih ada ${n} pertanyaan yang belum dijawab.`,
  keSoal: "Ke pertanyaan itu",
  gagalSimpan:
    "Jawaban tidak bisa disimpan di browser ini (penyimpanan penuh atau diblokir). Hasil belum tersimpan.",
  privasi: "Jawaban disimpan di browser ini saja dan tidak dikirim ke mana pun.",
} as const;
