/**
 * Simpan/baca jawaban Survey + ringkasan Diagnosis di `localStorage`.
 *
 * Lapisan: `lib`. Kontrak ADR-003: kunci berversi `umiro.survey.v<V>` dan
 * `umiro.diagnosis.v<V>` (V = versi katalog); payload rusak atau versi
 * asing dihapus aman dan tidak ditampilkan (AC-04-08).
 */

import type { SurveyQuestion } from "../content/survey.ts";
import { isComplete, scoreDiagnosis, type Answers, type DiagnosisResult } from "./diagnosis.ts";
import { notifyDiagnosisStatusChange } from "./diagnosis-status.ts";

type Catalog = { version: number; questions: readonly SurveyQuestion[] };

export const surveyKey = (v: number) => `umiro.survey.v${v}`;
export const diagnosisKey = (v: number) => `umiro.diagnosis.v${v}`;

interface SurveyPayload {
  catalogVersion: number;
  answers: Answers;
  savedAt: string;
}

export type LoadSurvey =
  | { status: "kosong" }
  | { status: "rusak" }
  | { status: "ok"; answers: Answers; savedAt: string; result: DiagnosisResult };

function safeRemove(storage: Storage, key: string) {
  try {
    storage.removeItem(key);
  } catch {
    // abaikan
  }
}

/** Hapus kunci survey/diagnosis dari versi katalog lain (versi asing → buang). */
function purgeOtherVersions(storage: Storage, version: number) {
  try {
    const stale: string[] = [];
    for (let i = 0; i < storage.length; i++) {
      const k = storage.key(i);
      if (
        k &&
        (k.startsWith("umiro.survey.v") || k.startsWith("umiro.diagnosis.v")) &&
        k !== surveyKey(version) &&
        k !== diagnosisKey(version)
      ) {
        stale.push(k);
      }
    }
    stale.forEach((k) => safeRemove(storage, k));
    return stale.length > 0;
  } catch {
    return false;
  }
}

/** Simpan jawaban lengkap + hasil deterministik. `false` bila gagal (AC-03-02). */
export function saveSurvey(
  answers: Answers,
  catalog: Catalog,
  storage: Storage = localStorage,
): boolean {
  if (!isComplete(answers, catalog.questions)) return false;
  const savedAt = new Date().toISOString();
  const payload: SurveyPayload = { catalogVersion: catalog.version, answers, savedAt };
  const result = scoreDiagnosis(answers, catalog);
  try {
    storage.setItem(surveyKey(catalog.version), JSON.stringify(payload));
    storage.setItem(diagnosisKey(catalog.version), JSON.stringify({ ...result, savedAt }));
  } catch {
    safeRemove(storage, surveyKey(catalog.version));
    safeRemove(storage, diagnosisKey(catalog.version));
    return false;
  }
  purgeOtherVersions(storage, catalog.version);
  notify();
  return true;
}

/**
 * Baca jawaban dan HITUNG ULANG hasil dari katalog saat ini — jawaban
 * adalah sumber kebenaran; ringkasan tersimpan hanya cache.
 */
export function loadSurvey(catalog: Catalog, storage: Storage = localStorage): LoadSurvey {
  const purged = purgeOtherVersions(storage, catalog.version);
  let raw: string | null;
  try {
    raw = storage.getItem(surveyKey(catalog.version));
  } catch {
    return { status: "kosong" };
  }
  if (raw === null) {
    if (purged) notify();
    return purged ? { status: "rusak" } : { status: "kosong" };
  }
  try {
    const p = JSON.parse(raw) as Partial<SurveyPayload>;
    if (
      p.catalogVersion === catalog.version &&
      p.answers &&
      typeof p.answers === "object" &&
      typeof p.savedAt === "string" &&
      isComplete(p.answers, catalog.questions)
    ) {
      return {
        status: "ok",
        answers: p.answers,
        savedAt: p.savedAt,
        result: scoreDiagnosis(p.answers, catalog),
      };
    }
  } catch {
    // jatuh ke rusak
  }
  clearSurvey(catalog.version, storage);
  return { status: "rusak" };
}

export function clearSurvey(version: number, storage: Storage = localStorage): void {
  safeRemove(storage, surveyKey(version));
  safeRemove(storage, diagnosisKey(version));
  notify();
}

function notify() {
  if (typeof window !== "undefined") notifyDiagnosisStatusChange();
}
