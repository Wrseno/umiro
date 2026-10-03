import type { DiagnosticDimensionId, Lever, Stage } from "./types";

/**
 * Teks yang dibaca pengguna.
 *
 * Dipisahkan dari logika agar dapat disunting tanpa menyentuh mesin skor,
 * dan agar mudah ditinjau bersama saat menguji keterbacaan.
 *
 * Aturan penulisan: bahasa sehari-hari, tanpa istilah teknis, dan setiap
 * temuan negatif selalu disusul jalan keluar — PRD Bagian 12 risiko nomor 4.
 */

export const STAGE_NAMES: Record<Stage, string> = {
  0: "Bertahan",
  1: "Sehat",
  2: "Bertumbuh",
  3: "Berkembang",
};

export const STAGE_SUMMARIES: Record<Stage, string> = {
  0: "Usaha Anda berjalan dan ada pembelinya, tetapi belum terlihat apakah benar-benar menghasilkan.",
  1: "Anda sudah tahu angkanya dan harga sudah dihitung. Fondasinya ada.",
  2: "Sudah ada pembeli yang kembali, jadi usaha tidak lagi bergantung pada orang baru setiap hari.",
  3: "Usaha Anda tidak lagi berhenti ketika Anda berhenti.",
};

export const LEVER_LABELS: Record<Lever, string> = {
  margin: "Margin",
  retensi: "Pelanggan",
  jangkauan: "Jangkauan",
  kapasitas: "Kapasitas",
};

export interface BottleneckCopy {
  /** Nama dimensi sebagaimana ditampilkan sebagai judul kotak utama. */
  title: string;
  /** Apa yang sedang terjadi, dalam bahasa pengguna. */
  explanation: string;
  /** Akibatnya bila dibiarkan — AC-DIA-02. */
  consequence: string;
}

export const BOTTLENECK_COPY: Record<DiagnosticDimensionId, BottleneckCopy> = {
  D1: {
    title: "Kejelasan Keuangan",
    explanation:
      "Uang usaha dan uang rumah masih bercampur, dan belum ada catatan yang bisa dilihat. Akibatnya Anda tidak tahu usaha ini benar-benar menghasilkan atau tidak.",
    consequence:
      "Selama angkanya tidak terlihat, setiap keputusan — menaikkan harga, menambah stok, membeli alat — hanyalah tebakan.",
  },
  D2: {
    title: "Margin dan Penetapan Harga",
    explanation:
      "Harga jual Anda belum dihitung dari biaya bahan. Anda mungkin sudah bekerja keras setiap hari untuk keuntungan yang sangat tipis.",
    consequence:
      "Harga bahan naik setiap tahun. Bila harga jual tidak ikut ditinjau, keuntungan Anda menipis sendiri tanpa ada yang memberitahu.",
  },
  D3: {
    title: "Pelanggan yang Kembali",
    explanation:
      "Hampir semua pembeli Anda orang baru. Anda terus mengeluarkan tenaga mencari pembeli, padahal mengajak kembali orang yang sudah pernah beli jauh lebih murah.",
    consequence:
      "Penghasilan Anda jadi rapuh karena bergantung pada arus pembeli baru setiap hari. Satu minggu sepi langsung terasa.",
  },
  D4: {
    title: "Kapasitas dan Ketergantungan",
    explanation:
      "Usaha ini berhenti ketika Anda berhenti. Semuanya bergantung pada tenaga Anda sendiri.",
    consequence:
      "Penghasilan tidak bisa naik tanpa menambah jam kerja — dan jam Anda sudah habis. Menambah pembeli hanya akan menambah lelah.",
  },
  D5: {
    title: "Jangkauan",
    explanation:
      "Hanya orang yang kebetulan lewat yang tahu usaha Anda ada. Pembeli baru nyaris tidak punya cara menemukan Anda.",
    consequence:
      "Pertumbuhan Anda terkunci pada seramai apa jalan di depan tempat usaha, bukan pada seberapa baik produk Anda.",
  },
};

/** Label pendek untuk bar skor. */
export const DIMENSION_SHORT: Record<DiagnosticDimensionId, string> = {
  D1: "Keuangan",
  D2: "Harga",
  D3: "Pelanggan",
  D4: "Kapasitas",
  D5: "Jangkauan",
};

/**
 * Langkah berikutnya setelah halaman Diagnosis mengikuti titik mentok,
 * bukan menu — PRD Bagian 6. Titik mentok pada keuangan atau harga
 * diarahkan ke Kalkulator, karena di situlah angkanya terbongkar.
 */
export function nextStepFor(bottleneck: DiagnosticDimensionId): {
  href: string;
  label: string;
  reason: string;
} {
  if (bottleneck === "D1" || bottleneck === "D2") {
    return {
      href: "/calculator",
      label: "Hitung Untung Sebenarnya",
      reason: "Mari lihat dulu berapa untung Anda yang sebenarnya per porsi.",
    };
  }
  return {
    href: "/roadmap",
    label: "Lihat Peta Jalan",
    reason: "Mari lihat urutan langkah yang sesuai dengan kondisi usaha Anda.",
  };
}

/** Format rupiah ringkas untuk label biaya tindakan. */
export function costLabel(cost: number): string {
  if (cost === 0) return "Gratis";
  return `Rp ${cost.toLocaleString("id-ID")}`;
}

/** Format waktu untuk label tindakan. */
export function timeLabel(minutesPerDay: number): string {
  if (minutesPerDay >= 60) {
    const hours = minutesPerDay / 60;
    return `${Number.isInteger(hours) ? hours : hours.toFixed(1)} jam/hari`;
  }
  return `${minutesPerDay} menit/hari`;
}
