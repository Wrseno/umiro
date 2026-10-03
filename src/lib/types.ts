/** Tipe inti diagnosis — PRD Bagian 8 dan Lampiran A. */

/**
 * D1–D5 menentukan tahap dan titik mentok (dimensi diagnostik).
 * D6 menyaring kelayakan tindakan. D7 mengurutkan tindakan.
 * D6 dan D7 tidak memengaruhi tahap maupun titik mentok.
 */
export type DimensionId = "D1" | "D2" | "D3" | "D4" | "D5" | "D6" | "D7";

/** Urutan prasyarat pemeriksaan titik mentok — Lampiran A.3. */
export const DIAGNOSTIC_DIMENSIONS = ["D1", "D2", "D3", "D4", "D5"] as const;
export type DiagnosticDimensionId = (typeof DIAGNOSTIC_DIMENSIONS)[number];

/**
 * Ambang sehat berlaku seragam untuk kelima dimensi diagnostik.
 * Keputusan rancangan, bukan angka empiris — lihat PRD Bagian 14.2.
 * Ditulis sebagai satu tetapan agar penyesuaian setelah validasi
 * lapangan hanya mengubah nilai di sini.
 */
export const HEALTHY_THRESHOLD = 50;

/** Tuas pertumbuhan yang disasar sebuah tindakan — PRD Bagian 3.1. */
export type Lever = "margin" | "retensi" | "jangkauan" | "kapasitas";

/** Tahap pertumbuhan 0–3 — PRD Bagian 3.2. */
export type Stage = 0 | 1 | 2 | 3;

/** Orientasi utama pengguna, dari D7. Mengurutkan tindakan. */
export type Goal = "untung" | "pelanggan" | "beban-kerja";

export interface AnswerOption {
  id: string;
  label: string;
  /** Bobot 0–100. */
  weight: number;
  /**
   * Menandai pilihan yang menyatakan ketidaktahuan secara terbuka
   * (AC-SVY-05). Bobotnya ditetapkan per pertanyaan, bukan seragam:
   * pada D1 dan D2 ketidaktahuan memang temuan diagnosis, sehingga
   * diberi bobot terendah — lihat Lampiran A.1 butir 4.
   */
  isUnknown?: boolean;
  /** Nilai yang dibawa pilihan ini untuk D6 dan D7. */
  capability?: Partial<Capability>;
  goal?: Goal;
}

export interface Question {
  id: string;
  dimension: DimensionId;
  /** Label dimensi yang tampil di atas pertanyaan. */
  eyebrow: string;
  text: string;
  /** Teks bantuan berbahasa sehari-hari, tanpa istilah teknis (AC-SVY-02). */
  helper: string;
  options: AnswerOption[];
}

/** Daya dukung pengguna, dari D6. Menyaring tindakan yang tidak terjangkau. */
export interface Capability {
  /** Dana yang dapat dialokasikan, rupiah. */
  budget: number;
  /** Waktu luang per hari di luar operasional, menit. */
  minutesPerDay: number;
}

/** Jawaban mentah: id pertanyaan → id pilihan. */
export type Answers = Record<string, string>;

export type DimensionScores = Record<DimensionId, number>;

export interface Action {
  id: string;
  title: string;
  /** Mengapa tindakan ini menjawab titik mentok. */
  why: string;
  lever: Lever;
  /** Fase tempat tindakan ini berada, 0–3. */
  stage: Stage;
  /** Dimensi yang diperbaiki tindakan ini. */
  fixes: DiagnosticDimensionId;
  /** Biaya perkiraan, rupiah. Nol berarti gratis. */
  cost: number;
  /** Waktu perkiraan per hari, menit. */
  minutesPerDay: number;
  /** Kebutuhan tenaga, ditulis apa adanya untuk ditampilkan. */
  effort: string;
  /** Langkah pelaksanaan 1-2-3 (AC-DIA-04). */
  steps: [string, string, string];
  /** Tujuan yang paling terbantu tindakan ini; mengurutkan prioritas. */
  serves: Goal[];
  /**
   * Benar bila tindakan ini menuntut Nomor Induk Berusaha atau izin formal
   * lainnya.
   *
   * Legalitas diperlakukan sebagai **pembuka kunci**, bukan sebagai tuas
   * pertumbuhan maupun dimensi diagnostik. Ketiadaan NIB tidak membuat
   * sebuah usaha mentok; ia menutup akses ke pembiayaan formal dan
   * sebagian lokapasar. Karena itu legalitas tidak ikut berebut menjadi
   * titik mentok, melainkan ditandai pada tindakan yang membutuhkannya
   * agar pengguna tidak menemui jalan buntu di tengah pengerjaan.
   */
  requiresNib?: boolean;
}

export interface Diagnosis {
  scores: DimensionScores;
  stage: Stage;
  /** Tepat satu titik mentok — PRD Bagian 3.3. */
  bottleneck: DiagnosticDimensionId;
  /** Alasan dimensi tersebut terpilih, untuk ditampilkan (AC-DIA-02). */
  bottleneckReason: "di-bawah-ambang" | "skor-terendah";
  /** Rata-rata D1–D5, disimpan meski belum ditampilkan — Lampiran A.5. */
  healthIndex: number;
  capability: Capability;
  goal: Goal;
}
