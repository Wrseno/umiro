import { QUESTIONS } from "./questions";
import {
  DIAGNOSTIC_DIMENSIONS,
  HEALTHY_THRESHOLD,
  type Answers,
  type Capability,
  type Diagnosis,
  type DiagnosticDimensionId,
  type DimensionId,
  type DimensionScores,
  type Goal,
  type Question,
  type Stage,
} from "./types";

/**
 * Mesin diagnosis — PRD Lampiran A.
 *
 * Deterministik dan berbasis aturan. Tidak memakai AI, tidak memakai
 * acak, dan tidak bergantung pada waktu, sehingga masukan yang sama
 * selalu menghasilkan keluaran yang sama dan dapat dijelaskan secara
 * lisan pada sesi Product Defense.
 *
 * Dijalankan di sisi peladen agar hasil yang tersimpan pada basis data
 * tidak dapat dimanipulasi dari peramban (PRD Bagian 13.3 butir 3).
 */

const DIMENSION_LABELS: Record<DiagnosticDimensionId, string> = {
  D1: "Kejelasan Keuangan",
  D2: "Margin dan Penetapan Harga",
  D3: "Retensi Pelanggan",
  D4: "Kapasitas dan Ketergantungan",
  D5: "Jangkauan dan Kehadiran Digital",
};

/** Label pendek untuk bar skor di layar sempit. */
const DIMENSION_SHORT: Record<DiagnosticDimensionId, string> = {
  D1: "Keuangan",
  D2: "Margin",
  D3: "Retensi",
  D4: "Kapasitas",
  D5: "Jangkauan",
};

export function dimensionLabel(id: DiagnosticDimensionId): string {
  return DIMENSION_LABELS[id];
}

export function dimensionShortLabel(id: DiagnosticDimensionId): string {
  return DIMENSION_SHORT[id];
}

export class IncompleteAnswersError extends Error {
  constructor(public readonly missing: string[]) {
    super(
      `Survei belum lengkap. Pertanyaan yang belum dijawab: ${missing.join(", ")}`,
    );
    this.name = "IncompleteAnswersError";
  }
}

function questionById(id: string): Question {
  const q = QUESTIONS.find((item) => item.id === id);
  if (!q) throw new Error(`Pertanyaan tidak dikenal: ${id}`);
  return q;
}

/**
 * Memastikan seluruh pertanyaan terjawab. Seluruh pertanyaan wajib
 * dijawab (AC-SVY-04), sehingga setiap dimensi selalu memiliki skor
 * lengkap dan tidak ada keadaan dimensi yang tidak terdefinisi.
 */
export function validateAnswers(answers: Answers): void {
  const missing = QUESTIONS.filter((q) => {
    const choice = answers[q.id];
    return !choice || !q.options.some((o) => o.id === choice);
  }).map((q) => q.id);
  if (missing.length > 0) throw new IncompleteAnswersError(missing);
}

/** Skor dimensi = rata-rata bobot jawaban pada dimensi itu (Lampiran A.1). */
export function scoreDimensions(answers: Answers): DimensionScores {
  validateAnswers(answers);

  const totals = new Map<DimensionId, { sum: number; count: number }>();
  for (const question of QUESTIONS) {
    const option = question.options.find((o) => o.id === answers[question.id])!;
    const bucket = totals.get(question.dimension) ?? { sum: 0, count: 0 };
    bucket.sum += option.weight;
    bucket.count += 1;
    totals.set(question.dimension, bucket);
  }

  const scores = {} as DimensionScores;
  for (const [dimension, { sum, count }] of totals) {
    scores[dimension] = Math.round(sum / count);
  }
  return scores;
}

/**
 * Tahap ditetapkan melalui aturan gerbang, bukan rata-rata (Lampiran A.2).
 *
 * Rata-rata dapat menyembunyikan kelemahan mendasar: pelaku usaha dengan
 * jangkauan luas namun tanpa kejelasan keuangan akan memperoleh rata-rata
 * sedang, padahal kondisinya belum sehat. Gerbang menuntut prasyarat
 * terpenuhi berurutan.
 */
export function determineStage(scores: DimensionScores): Stage {
  const healthy = (d: DiagnosticDimensionId) => scores[d] >= HEALTHY_THRESHOLD;

  // Kelas 1 Sehat: tahu untungnya dan harga sudah dihitung.
  if (!healthy("D1") || !healthy("D2")) return 0;
  // Kelas 2 Bertumbuh: sudah punya pelanggan berulang.
  if (!healthy("D3")) return 1;
  // Kelas 3 Berkembang: kapasitas dan jangkauan tidak lagi menahan.
  if (!healthy("D4") || !healthy("D5")) return 2;
  return 3;
}

/**
 * Titik mentok adalah dimensi **pertama** dalam urutan prasyarat
 * D1 → D2 → D3 → D4 → D5 yang berada di bawah ambang (Lampiran A.3).
 *
 * Urutan ini mengikuti Bagian 3.1: perbaikan margin tidak memerlukan
 * biaya, sedangkan penambahan jangkauan memerlukan biaya, sehingga
 * margin wajib dibenahi lebih dahulu. Karena itu D5 tidak akan pernah
 * terpilih selama D1 atau D2 masih di bawah ambang (AC-DIA-03).
 *
 * Bila seluruh dimensi sudah sehat, titik mentok adalah skor terendah;
 * bila seri, dimensi yang lebih awal dalam urutan prasyarat yang dipilih.
 */
export function determineBottleneck(scores: DimensionScores): {
  bottleneck: DiagnosticDimensionId;
  reason: Diagnosis["bottleneckReason"];
} {
  for (const dimension of DIAGNOSTIC_DIMENSIONS) {
    if (scores[dimension] < HEALTHY_THRESHOLD) {
      return { bottleneck: dimension, reason: "di-bawah-ambang" };
    }
  }

  let lowest: DiagnosticDimensionId = DIAGNOSTIC_DIMENSIONS[0];
  for (const dimension of DIAGNOSTIC_DIMENSIONS) {
    if (scores[dimension] < scores[lowest]) lowest = dimension;
  }
  return { bottleneck: lowest, reason: "skor-terendah" };
}

/** Rata-rata D1–D5. Disimpan meski belum ditampilkan — Lampiran A.5. */
export function healthIndex(scores: DimensionScores): number {
  const sum = DIAGNOSTIC_DIMENSIONS.reduce((acc, d) => acc + scores[d], 0);
  return Math.round(sum / DIAGNOSTIC_DIMENSIONS.length);
}

/** Daya dukung dari D6: nilai terendah yang dipilih pengguna yang berlaku. */
export function extractCapability(answers: Answers): Capability {
  const capability: Capability = { budget: 0, minutesPerDay: 0 };
  for (const [questionId, choice] of Object.entries(answers)) {
    const option = questionById(questionId).options.find((o) => o.id === choice);
    if (option?.capability?.budget !== undefined) {
      capability.budget = option.capability.budget;
    }
    if (option?.capability?.minutesPerDay !== undefined) {
      capability.minutesPerDay = option.capability.minutesPerDay;
    }
  }
  return capability;
}

/** Orientasi utama dari D7. Bawaan "untung" bila tidak terbaca. */
export function extractGoal(answers: Answers): Goal {
  for (const [questionId, choice] of Object.entries(answers)) {
    const option = questionById(questionId).options.find((o) => o.id === choice);
    if (option?.goal) return option.goal;
  }
  return "untung";
}

/** Diagnosis utuh dari satu set jawaban. */
export function diagnose(answers: Answers): Diagnosis {
  const scores = scoreDimensions(answers);
  const { bottleneck, reason } = determineBottleneck(scores);
  return {
    scores,
    stage: determineStage(scores),
    bottleneck,
    bottleneckReason: reason,
    healthIndex: healthIndex(scores),
    capability: extractCapability(answers),
    goal: extractGoal(answers),
  };
}
