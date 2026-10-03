import type {
  Action,
  Capability,
  Diagnosis,
  DiagnosticDimensionId,
  Goal,
  Stage,
} from "./types";

/**
 * Katalog tindakan — PRD US-02 dan US-05.
 *
 * Setiap tindakan menyebut tuas yang disasarnya, dimensi yang
 * diperbaikinya, serta biaya dan waktu yang dibutuhkan, sehingga dapat
 * disaring oleh D6 dan diurutkan oleh D7 (Lampiran A.4).
 *
 * Tindakan pada kelas awal sengaja dibuat gratis: usaha yang mentok
 * belum punya surplus, dan satu-satunya tuas tanpa biaya adalah margin
 * (PRD Bagian 3.1).
 */
export const ACTIONS: Action[] = [
  // ── Kelas 0 Bertahan — margin dan pencatatan ──────────────────────
  {
    id: "a-pisah-uang",
    title: "Pisahkan uang usaha dari uang dapur",
    why: "Selama tercampur, Anda tidak akan pernah tahu usaha ini untung atau tidak.",
    lever: "margin",
    stage: 0,
    fixes: "D1",
    cost: 0,
    minutesPerDay: 5,
    effort: "sendiri",
    steps: [
      "Siapkan satu wadah khusus: toples, amplop, atau dompet terpisah.",
      "Setiap selesai jualan, masukkan seluruh uang hasil jualan ke situ.",
      "Ambil uang belanja rumah sekali saja seminggu, catat berapa yang diambil.",
    ],
    serves: ["untung"],
  },
  {
    id: "a-catat-harian",
    title: "Catat uang masuk dan keluar setiap hari",
    why: "Tanpa catatan, tidak ada yang bisa diperbaiki karena tidak ada yang terukur.",
    lever: "margin",
    stage: 0,
    fixes: "D1",
    cost: 0,
    minutesPerDay: 10,
    effort: "sendiri",
    steps: [
      "Siapkan satu buku tulis khusus, taruh di tempat jualan.",
      "Tulis dua angka saja tiap hari: uang masuk dan uang belanja bahan.",
      "Setiap akhir minggu, jumlahkan keduanya dan lihat selisihnya.",
    ],
    serves: ["untung"],
  },
  {
    id: "a-hitung-hpp",
    title: "Hitung biaya bahan untuk satu porsi",
    why: "Ini angka yang menentukan apakah harga Anda sudah benar atau justru merugi.",
    lever: "margin",
    stage: 0,
    fixes: "D2",
    cost: 0,
    minutesPerDay: 15,
    effort: "sendiri",
    steps: [
      "Catat total belanja bahan untuk satu kali masak.",
      "Hitung berapa porsi yang jadi dari sekali masak itu.",
      "Bagi total belanja dengan jumlah porsi — itulah biaya satu porsi.",
    ],
    serves: ["untung"],
  },
  {
    id: "a-tinjau-harga",
    title: "Tinjau ulang harga jual Anda",
    why: "Harga bahan naik tiap tahun. Kalau harga jual diam, untung Anda menipis sendiri.",
    lever: "margin",
    stage: 0,
    fixes: "D2",
    cost: 0,
    minutesPerDay: 15,
    effort: "sendiri",
    steps: [
      "Kurangkan biaya satu porsi dari harga jual Anda sekarang.",
      "Kalau sisanya di bawah seperempat harga jual, harga perlu dinaikkan.",
      "Naikkan sedikit demi sedikit, mulai dari menu yang paling laku.",
    ],
    serves: ["untung"],
  },

  // ── Kelas 1 Sehat — retensi pelanggan ─────────────────────────────
  {
    id: "a-kumpul-nomor",
    title: "Kumpulkan nomor 20 pembeli minggu ini",
    why: "Mengajak orang yang sudah pernah beli jauh lebih murah daripada mencari pembeli baru.",
    lever: "retensi",
    stage: 1,
    fixes: "D3",
    cost: 0,
    minutesPerDay: 10,
    effort: "sendiri",
    steps: [
      "Siapkan buku kecil di meja kasir.",
      "Tanyakan nomor WhatsApp sambil menyerahkan pesanan, seadanya saja.",
      "Berhenti setelah terkumpul 20 nomor, jangan dipaksakan.",
    ],
    serves: ["pelanggan", "untung"],
  },
  {
    id: "a-kabari-pembeli",
    title: "Kirim satu kabar ke pembeli lama",
    why: "Sebagian orang tidak kembali bukan karena kecewa, tapi karena lupa.",
    lever: "retensi",
    stage: 1,
    fixes: "D3",
    cost: 0,
    minutesPerDay: 20,
    effort: "sendiri",
    steps: [
      "Pilih 10 nomor dari daftar yang sudah Anda kumpulkan.",
      "Kirim satu pesan singkat: menu hari ini dan jam buka.",
      "Catat berapa yang membalas atau datang dalam tiga hari.",
    ],
    serves: ["pelanggan"],
  },
  {
    id: "a-penanda-langganan",
    title: "Buat penanda untuk pelanggan tetap",
    why: "Orang kembali kalau merasa dikenali, bukan hanya karena harganya murah.",
    lever: "retensi",
    stage: 1,
    fixes: "D3",
    cost: 50_000,
    minutesPerDay: 10,
    effort: "sendiri",
    steps: [
      "Cetak kartu kecil, beri 10 kotak untuk dicap.",
      "Beri satu cap setiap pembelian, gratis satu porsi setelah penuh.",
      "Catat berapa kartu yang kembali setiap bulan.",
    ],
    serves: ["pelanggan", "untung"],
  },

  // ── Kelas 2 Bertumbuh — jangkauan ─────────────────────────────────
  {
    id: "a-wa-bisnis",
    title: "Siapkan WhatsApp khusus untuk jualan",
    why: "Pembeli perlu satu tempat pasti untuk memesan, terpisah dari obrolan pribadi.",
    lever: "jangkauan",
    stage: 2,
    fixes: "D5",
    cost: 0,
    minutesPerDay: 15,
    effort: "sendiri",
    steps: [
      "Pasang WhatsApp Business, isi nama usaha dan jam buka.",
      "Masukkan daftar menu beserta harganya ke katalog.",
      "Tempel nomor itu di tempat jualan agar mudah terlihat.",
    ],
    serves: ["pelanggan"],
  },
  {
    id: "a-foto-menu",
    title: "Foto ulang menu andalan Anda",
    why: "Orang yang belum pernah beli memutuskan dari foto, bukan dari daftar harga.",
    lever: "jangkauan",
    stage: 2,
    fixes: "D5",
    cost: 0,
    minutesPerDay: 20,
    effort: "sendiri",
    steps: [
      "Potret tiga menu terlaris di dekat jendela pada siang hari.",
      "Pakai alas polos, jangan ada barang lain di sekitarnya.",
      "Pilih satu foto terbaik per menu, pakai di semua tempat.",
    ],
    serves: ["pelanggan"],
  },
  {
    id: "a-urus-nib",
    title: "Urus Nomor Induk Berusaha lewat OSS",
    why: "Tanpa ini, pintu ke pembiayaan berbunga rendah dan sebagian lokapasar tetap tertutup, sebaik apa pun usaha Anda berjalan.",
    lever: "jangkauan",
    stage: 2,
    fixes: "D5",
    cost: 0,
    minutesPerDay: 30,
    effort: "sendiri, perlu KTP dan NPWP",
    steps: [
      "Siapkan KTP dan NPWP pribadi.",
      "Buka situs OSS, daftar sebagai pelaku usaha perseorangan.",
      "Isi data usaha sampai NIB terbit; tidak ada biaya resmi.",
    ],
    serves: ["untung", "pelanggan"],
  },
  {
    id: "a-daftar-pesan-antar",
    title: "Daftarkan usaha ke layanan pesan antar",
    why: "Ini cara termurah agar orang yang belum pernah lewat depan tempat Anda bisa menemukan usaha Anda.",
    lever: "jangkauan",
    stage: 2,
    fixes: "D5",
    cost: 100_000,
    minutesPerDay: 30,
    effort: "sendiri, perlu dokumen usaha",
    steps: [
      "Siapkan KTP, NIB, foto tempat usaha, dan daftar menu berikut harga.",
      "Daftar lewat aplikasi mitra, ikuti langkahnya sampai selesai.",
      "Setelah aktif, periksa pesanan masuk dua kali sehari.",
    ],
    serves: ["pelanggan", "untung"],
    requiresNib: true,
  },

  // ── Kelas 3 Berkembang — kapasitas dan delegasi ───────────────────
  {
    id: "a-resep-takaran",
    title: "Tulis resep dengan takaran yang pasti",
    why: "Selama resepnya hanya ada di kepala Anda, tidak ada yang bisa menggantikan Anda.",
    lever: "kapasitas",
    stage: 3,
    fixes: "D4",
    cost: 0,
    minutesPerDay: 20,
    effort: "sendiri",
    steps: [
      "Masak seperti biasa, tapi timbang tiap bahan sebelum dimasukkan.",
      "Tulis takarannya, jangan pakai ukuran kira-kira.",
      "Minta orang lain memasak dari tulisan itu, lalu cicipi hasilnya.",
    ],
    serves: ["beban-kerja"],
  },
  {
    id: "a-siapkan-bahan",
    title: "Siapkan bahan sehari sebelumnya",
    why: "Menggeser pekerjaan ke malam hari membuat jam sibuk tidak lagi jadi penghalang.",
    lever: "kapasitas",
    stage: 3,
    fixes: "D4",
    cost: 0,
    minutesPerDay: 30,
    effort: "sendiri",
    steps: [
      "Potong dan bumbui bahan untuk besok pada malam hari.",
      "Simpan dalam wadah terpisah sesuai urutan masak.",
      "Catat berapa lama waktu masak berkurang keesokan harinya.",
    ],
    serves: ["beban-kerja"],
  },
  {
    id: "a-tambah-tenaga",
    title: "Cari satu orang untuk jam tersibuk",
    why: "Kapasitas Anda mentok di jumlah jam yang Anda punya, bukan di jumlah pembeli.",
    lever: "kapasitas",
    stage: 3,
    fixes: "D4",
    cost: 500_000,
    minutesPerDay: 30,
    effort: "perlu orang lain",
    steps: [
      "Tentukan dua jam paling sibuk dalam sehari.",
      "Cari satu orang untuk jam itu saja, bukan sehari penuh.",
      "Latih dengan resep bertakaran yang sudah Anda tulis.",
    ],
    serves: ["beban-kerja", "pelanggan"],
  },
];

/**
 * Tiga tindakan prioritas — AC-DIA-04 dan AC-DIA-05.
 *
 * 1. Hanya tindakan yang memperbaiki titik mentok yang dipertimbangkan,
 *    agar seluruh saran mengarah pada satu hambatan yang sama.
 * 2. Tindakan yang biaya atau waktunya melampaui daya dukung pengguna
 *    (D6) dikeluarkan — menyarankan yang tidak terjangkau sama saja
 *    dengan tidak menyarankan apa pun.
 * 3. Sisanya diurutkan menurut kesesuaian dengan tujuan pengguna (D7),
 *    lalu yang lebih murah dan lebih ringan didahulukan.
 */
export function selectPriorityActions(
  diagnosis: Diagnosis,
  limit = 3,
): PriorityActions {
  const relevant = ACTIONS.filter((a) => a.fixes === diagnosis.bottleneck);
  const affordable = relevant.filter((a) => isAffordable(a, diagnosis.capability));

  const rank = (list: Action[]) =>
    [...list].sort((a, b) => {
      // Prasyarat mendahului preferensi: tindakan yang menuntut NIB tidak
      // boleh berada di atas tindakan yang tidak menuntutnya, agar pengguna
      // tidak diarahkan pada langkah yang pintunya belum terbuka.
      const nibDelta = Number(a.requiresNib ?? false) - Number(b.requiresNib ?? false);
      if (nibDelta !== 0) return nibDelta;
      const goalDelta = goalRank(b, diagnosis.goal) - goalRank(a, diagnosis.goal);
      if (goalDelta !== 0) return goalDelta;
      if (a.cost !== b.cost) return a.cost - b.cost;
      if (a.minutesPerDay !== b.minutesPerDay) return a.minutesPerDay - b.minutesPerDay;
      return a.id.localeCompare(b.id);
    });

  // Jaring pengaman: pengguna dengan modal dan waktu paling terbatas bisa
  // tersaring habis. Menampilkan nol tindakan melanggar metrik "minimal
  // satu tindakan yang dapat dikerjakan" (PRD Bagian 7), jadi tindakan
  // teringan tetap ditampilkan dengan penanda bahwa kebutuhannya sedikit
  // melebihi daya dukung yang dinyatakan pengguna.
  if (affordable.length === 0) {
    const lightest = [...relevant].sort(
      (a, b) =>
        Number(a.requiresNib ?? false) - Number(b.requiresNib ?? false) ||
        a.cost - b.cost ||
        a.minutesPerDay - b.minutesPerDay,
    )[0];
    return {
      actions: lightest ? [lightest] : [],
      droppedForCapability: relevant.length,
      beyondCapability: true,
    };
  }

  return {
    actions: rank(affordable).slice(0, limit),
    droppedForCapability: relevant.length - affordable.length,
    beyondCapability: false,
  };
}

export interface PriorityActions {
  actions: Action[];
  /** Berapa tindakan relevan yang dikeluarkan karena di luar daya dukung. */
  droppedForCapability: number;
  /**
   * Benar bila tidak ada satu pun tindakan yang terjangkau, sehingga yang
   * ditampilkan adalah tindakan teringan di luar daya dukung pengguna.
   * Antarmuka wajib menyatakan hal ini secara terbuka.
   */
  beyondCapability: boolean;
}

function isAffordable(action: Action, capability: Capability): boolean {
  return (
    action.cost <= capability.budget &&
    action.minutesPerDay <= capability.minutesPerDay
  );
}

function goalRank(action: Action, goal: Goal): number {
  const index = action.serves.indexOf(goal);
  if (index === -1) return 0;
  // Tujuan yang disebut lebih awal pada `serves` dianggap lebih terbantu.
  return action.serves.length - index;
}

/** Seluruh tindakan pada satu kelas, untuk halaman Peta Jalan. */
export function actionsForStage(stage: Stage): Action[] {
  return ACTIONS.filter((a) => a.stage === stage);
}

/** Tindakan yang memperbaiki satu dimensi tertentu. */
export function actionsFixing(dimension: DiagnosticDimensionId): Action[] {
  return ACTIONS.filter((a) => a.fixes === dimension);
}
