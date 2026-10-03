import type { Question } from "./types";

/**
 * Bank soal survei diagnosis — PRD Bagian 8 dan US-01.
 *
 * Aturan penulisan:
 * - Bahasa sehari-hari. Istilah "HPP", "margin", "retensi", dan "omzet"
 *   tidak dipakai di hadapan pengguna (AC-SVY-02).
 * - Seluruh pertanyaan wajib dijawab; tidak ada opsi Lewati (AC-SVY-04).
 * - Pilihan `isUnknown` disediakan hanya pada pertanyaan yang jawabannya
 *   memang bisa tidak diketahui. Pertanyaan tentang kebiasaan sehari-hari
 *   tidak diberi jalan keluar, agar pengguna tidak menghindar.
 */
export const QUESTIONS: Question[] = [
  // ── D1 Kejelasan Keuangan ──────────────────────────────────────────
  {
    id: "d1q1",
    dimension: "D1",
    eyebrow: "Keuangan",
    text: "Uang hasil jualan disimpan terpisah dari uang kebutuhan rumah?",
    helper:
      "Misalnya ada dompet, laci, atau rekening khusus yang isinya hanya uang usaha.",
    options: [
      { id: "a", label: "Ya, selalu terpisah", weight: 100 },
      { id: "b", label: "Kadang terpisah, kadang tercampur", weight: 50 },
      { id: "c", label: "Tercampur jadi satu", weight: 0 },
    ],
  },
  {
    id: "d1q2",
    dimension: "D1",
    eyebrow: "Keuangan",
    text: "Apakah Anda mencatat uang yang masuk dan keluar?",
    helper: "Catatan di buku tulis atau di HP sama saja — yang penting dicatat.",
    options: [
      { id: "a", label: "Ya, hampir setiap hari", weight: 100 },
      { id: "b", label: "Kadang-kadang saja", weight: 50 },
      { id: "c", label: "Tidak pernah mencatat", weight: 0 },
    ],
  },
  {
    id: "d1q3",
    dimension: "D1",
    eyebrow: "Keuangan",
    text: "Berapa keuntungan bersih Anda dari satu porsi yang terjual?",
    helper:
      "Keuntungan bersih itu harga jual dikurangi semua biaya bahan — bukan harga jualnya.",
    options: [
      { id: "a", label: "Saya tahu persis angkanya", weight: 100 },
      { id: "b", label: "Kira-kira tahu, tapi belum pernah dihitung", weight: 40 },
      { id: "c", label: "Belum pernah menghitung", weight: 0, isUnknown: true },
    ],
  },

  // ── D2 Margin dan Penetapan Harga ──────────────────────────────────
  {
    id: "d2q1",
    dimension: "D2",
    eyebrow: "Harga",
    text: "Harga jual Anda ditentukan atas dasar apa?",
    helper: "Pilih yang paling mendekati cara Anda menentukan harga saat ini.",
    options: [
      { id: "a", label: "Dihitung dari biaya bahan, lalu ditambah untung", weight: 100 },
      { id: "b", label: "Ikut harga pedagang lain di sekitar", weight: 35 },
      { id: "c", label: "Kira-kira saja, yang penting laku", weight: 0 },
    ],
  },
  {
    id: "d2q2",
    dimension: "D2",
    eyebrow: "Harga",
    text: "Kapan terakhir kali Anda menaikkan harga?",
    helper:
      "Harga bahan naik setiap tahun. Kalau harga jual tidak ikut ditinjau, untung menipis sendiri.",
    options: [
      { id: "a", label: "Dalam 6 bulan terakhir", weight: 100 },
      { id: "b", label: "Sekitar 1–2 tahun lalu", weight: 50 },
      { id: "c", label: "Lebih dari 2 tahun lalu, atau belum pernah", weight: 0 },
      { id: "d", label: "Tidak ingat", weight: 15, isUnknown: true },
    ],
  },
  {
    id: "d2q3",
    dimension: "D2",
    eyebrow: "Harga",
    text: "Kalau harga bahan naik, apa yang Anda lakukan?",
    helper: "Tidak ada jawaban yang salah — pilih yang biasanya Anda lakukan.",
    options: [
      { id: "a", label: "Harga jual ikut disesuaikan", weight: 100 },
      { id: "b", label: "Porsi dikurangi, harga tetap", weight: 55 },
      { id: "c", label: "Dibiarkan saja, untung berkurang", weight: 0 },
    ],
  },

  // ── D3 Retensi Pelanggan ───────────────────────────────────────────
  {
    id: "d3q1",
    dimension: "D3",
    eyebrow: "Pembeli",
    text: "Dari sepuluh pembeli hari ini, berapa yang sudah langganan?",
    helper: "Langganan maksudnya orang yang sudah pernah beli sebelumnya.",
    options: [
      { id: "a", label: "Tujuh orang atau lebih", weight: 100 },
      { id: "b", label: "Sekitar empat sampai enam orang", weight: 65 },
      { id: "c", label: "Satu sampai tiga orang", weight: 30 },
      { id: "d", label: "Hampir semuanya orang baru", weight: 0 },
    ],
  },
  {
    id: "d3q2",
    dimension: "D3",
    eyebrow: "Pembeli",
    text: "Kalau mau memberi kabar ke pembeli lama, Anda bisa menghubungi mereka?",
    helper:
      "Misalnya punya nomor WhatsApp-nya, atau mereka ikut grup yang Anda buat.",
    options: [
      { id: "a", label: "Bisa, nomornya ada", weight: 100 },
      { id: "b", label: "Beberapa saja yang ada nomornya", weight: 50 },
      { id: "c", label: "Tidak ada sama sekali", weight: 0 },
    ],
  },

  // ── D4 Kapasitas dan Ketergantungan ────────────────────────────────
  {
    id: "d4q1",
    dimension: "D4",
    eyebrow: "Tenaga",
    text: "Kalau Anda sakit atau pergi sehari, usaha tetap jalan?",
    helper: "Pikirkan hari biasa, bukan hari libur yang memang tutup.",
    options: [
      { id: "a", label: "Tetap jalan, ada yang menggantikan", weight: 100 },
      { id: "b", label: "Jalan sebagian, tapi tersendat", weight: 50 },
      { id: "c", label: "Tutup, tidak ada yang bisa menggantikan", weight: 0 },
    ],
  },
  {
    id: "d4q2",
    dimension: "D4",
    eyebrow: "Tenaga",
    text: "Kalau besok ada yang pesan dua kali lipat dari biasanya, Anda sanggup?",
    helper: "Sanggup di sini maksudnya tanpa menolak pesanan lain.",
    options: [
      { id: "a", label: "Sanggup tanpa kesulitan", weight: 100 },
      { id: "b", label: "Sanggup, tapi sangat kerepotan", weight: 45 },
      { id: "c", label: "Terpaksa menolak", weight: 0 },
    ],
  },

  // ── D5 Jangkauan dan Kehadiran Digital ─────────────────────────────
  {
    id: "d5q1",
    dimension: "D5",
    eyebrow: "Jangkauan",
    text: "Lewat mana saja orang bisa membeli dari Anda?",
    helper: "Pilih yang paling banyak mendatangkan pembeli.",
    options: [
      { id: "a", label: "Datang langsung, pesan antar, dan aplikasi", weight: 100 },
      { id: "b", label: "Datang langsung dan pesan lewat WhatsApp", weight: 60 },
      { id: "c", label: "Hanya yang datang langsung", weight: 20 },
    ],
  },
  {
    id: "d5q2",
    dimension: "D5",
    eyebrow: "Jangkauan",
    text: "Orang yang belum kenal Anda, bagaimana bisa menemukan usaha Anda?",
    helper: "Maksudnya orang yang belum pernah lewat depan tempat Anda.",
    options: [
      { id: "a", label: "Bisa ketemu di internet atau aplikasi pesan antar", weight: 100 },
      { id: "b", label: "Biasanya dari cerita teman ke teman", weight: 55 },
      { id: "c", label: "Hanya kalau kebetulan lewat", weight: 0 },
    ],
  },

  // ── D6 Modal dan Waktu Tersedia (menyaring tindakan) ───────────────
  {
    id: "d6q1",
    dimension: "D6",
    eyebrow: "Kemampuan",
    text: "Berapa uang yang bisa Anda sisihkan bulan ini untuk memperbaiki usaha?",
    helper: "Jawab apa adanya. Kami hanya menyarankan yang sanggup Anda kerjakan.",
    options: [
      { id: "a", label: "Belum ada sama sekali", weight: 0, capability: { budget: 0 } },
      {
        id: "b",
        label: "Sekitar Rp 100.000",
        weight: 40,
        capability: { budget: 100_000 },
      },
      {
        id: "c",
        label: "Sekitar Rp 500.000",
        weight: 70,
        capability: { budget: 500_000 },
      },
      {
        id: "d",
        label: "Rp 1.000.000 atau lebih",
        weight: 100,
        capability: { budget: 1_000_000 },
      },
    ],
  },
  {
    id: "d6q2",
    dimension: "D6",
    eyebrow: "Kemampuan",
    text: "Di luar waktu berjualan, berapa lama Anda bisa meluangkan waktu per hari?",
    helper: "Waktu untuk membenahi usaha, misalnya mencatat atau menghubungi pembeli.",
    options: [
      {
        id: "a",
        label: "Hampir tidak ada",
        weight: 10,
        capability: { minutesPerDay: 5 },
      },
      {
        id: "b",
        label: "Sekitar 15 menit",
        weight: 45,
        capability: { minutesPerDay: 15 },
      },
      {
        id: "c",
        label: "Sekitar 30 menit",
        weight: 75,
        capability: { minutesPerDay: 30 },
      },
      {
        id: "d",
        label: "Satu jam atau lebih",
        weight: 100,
        capability: { minutesPerDay: 60 },
      },
    ],
  },

  // ── D7 Target dan Tujuan (mengurutkan tindakan) ────────────────────
  {
    id: "d7q1",
    dimension: "D7",
    eyebrow: "Tujuan",
    text: "Kalau boleh memilih satu, mana yang paling Anda inginkan sekarang?",
    helper: "Jawaban ini menentukan urutan langkah yang kami sarankan.",
    options: [
      {
        id: "a",
        label: "Untung lebih besar dari jualan yang sekarang",
        weight: 100,
        goal: "untung",
      },
      { id: "b", label: "Pembeli bertambah banyak", weight: 100, goal: "pelanggan" },
      {
        id: "c",
        label: "Kerja tidak terlalu berat seperti sekarang",
        weight: 100,
        goal: "beban-kerja",
      },
    ],
  },
];

/** Jumlah pertanyaan, dipakai bilah progres. */
export const TOTAL_QUESTIONS = QUESTIONS.length;
