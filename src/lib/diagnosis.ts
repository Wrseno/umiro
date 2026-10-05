/**
 * Scoring diagnosis — fungsi murni, deterministik (ADR-004, PRD Lampiran A).
 *
 * Lapisan: `lib`. Katalog diterima sebagai argumen agar fungsi bisa diuji
 * dengan katalog apa pun; hanya tipe yang diimpor dari `content`.
 */

import type {
  CategoryKey,
  SurveyQuestion,
} from "../content/survey.ts";

export const CATEGORY_ORDER: CategoryKey[] = ["F", "M", "R", "A", "C"];

/** Selisih minimum (poin) agar satu kategori boleh dinyatakan bottleneck tunggal. */
export const DELTA_MIN = 10;

/** Jawaban: id soal → id opsi. */
export type Answers = Record<string, string>;

export interface CategoryScore {
  key: CategoryKey;
  /** Rata-rata bobot jawaban valid (tanpa "Belum tahu"); `null` bila tak ada jawaban valid. */
  score: number | null;
  total: number;
  valid: number;
  flagged: number;
  /** Jawaban valid < separuh soal kategori (PRD Lampiran A). */
  insufficient: boolean;
}

export interface Driver {
  questionId: string;
  optionId: string;
  weight: number;
  flag: boolean;
}

export type Outcome =
  | { kind: "tunggal"; category: CategoryKey; delta: number }
  | {
      kind: "belum-jelas";
      reason: "selisih" | "data";
      /** Maksimal dua area untuk diperiksa. */
      areas: CategoryKey[];
    };

export interface DiagnosisResult {
  catalogVersion: number;
  scores: CategoryScore[];
  outcome: Outcome;
  /** Jawaban pendorong per kategori: skor ≤ 40 atau "Belum tahu", terburuk dulu. */
  drivers: Record<CategoryKey, Driver[]>;
  /** Jawaban konteks S/G (tidak memengaruhi skor). */
  context: { questionId: string; optionId: string }[];
}

const DRIVER_MAX_WEIGHT = 40;

/** Semua soal terjawab dengan id opsi yang dikenal katalog. */
export function isComplete(answers: Answers, questions: readonly SurveyQuestion[]): boolean {
  return questions.every((q) => q.options.some((o) => o.id === answers[q.id]));
}

export function unanswered(answers: Answers, questions: readonly SurveyQuestion[]): string[] {
  return questions
    .filter((q) => !q.options.some((o) => o.id === answers[q.id]))
    .map((q) => q.id);
}

export function scoreDiagnosis(
  answers: Answers,
  catalog: { version: number; questions: readonly SurveyQuestion[] },
): DiagnosisResult {
  const drivers = { F: [], M: [], R: [], A: [], C: [] } as Record<CategoryKey, Driver[]>;
  const context: DiagnosisResult["context"] = [];

  const scores: CategoryScore[] = CATEGORY_ORDER.map((key) => {
    const qs = catalog.questions.filter((q) => q.category === key);
    let sum = 0;
    let valid = 0;
    let flagged = 0;
    for (const q of qs) {
      const opt = q.options.find((o) => o.id === answers[q.id]);
      if (!opt || opt.weight === null) continue;
      if (opt.flag) {
        flagged++;
        drivers[key].push({ questionId: q.id, optionId: opt.id, weight: 0, flag: true });
        continue;
      }
      valid++;
      sum += opt.weight;
      if (opt.weight <= DRIVER_MAX_WEIGHT) {
        drivers[key].push({ questionId: q.id, optionId: opt.id, weight: opt.weight, flag: false });
      }
    }
    drivers[key].sort((a, b) => a.weight - b.weight || Number(b.flag) - Number(a.flag));
    return {
      key,
      score: valid > 0 ? Math.round(sum / valid) : null,
      total: qs.length,
      valid,
      flagged,
      insufficient: valid * 2 < qs.length,
    };
  });

  for (const q of catalog.questions) {
    if ((q.category === "S" || q.category === "G") && answers[q.id]) {
      context.push({ questionId: q.id, optionId: answers[q.id] });
    }
  }

  return {
    catalogVersion: catalog.version,
    scores,
    outcome: decide(scores),
    drivers,
    context,
  };
}

/**
 * Aturan keputusan (ADR-004):
 * 1. Ada kategori dengan data kurang → "belum jelas" (data). Area: kategori
 *    data kurang dulu, lalu skor terendah; maksimal dua.
 * 2. Selisih skor terendah dan kedua > DELTA_MIN → bottleneck tunggal.
 * 3. Selain itu → "belum jelas" (selisih), dua skor terendah.
 * Seri diurutkan stabil menurut F, M, R, A, C.
 */
export function decide(scores: CategoryScore[]): Outcome {
  const ranked = scores
    .filter((s) => !s.insufficient && s.score !== null)
    .sort((a, b) => (a.score as number) - (b.score as number));

  const lacking = scores.filter((s) => s.insufficient).map((s) => s.key);
  if (lacking.length > 0) {
    const areas = [...lacking, ...ranked.map((s) => s.key)].slice(0, 2);
    return { kind: "belum-jelas", reason: "data", areas };
  }

  const [first, second] = ranked;
  const delta = (second.score as number) - (first.score as number);
  if (delta > DELTA_MIN) {
    return { kind: "tunggal", category: first.key, delta };
  }
  return { kind: "belum-jelas", reason: "selisih", areas: [first.key, second.key] };
}
