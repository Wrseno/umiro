/**
 * Simpan/pulihkan input kalkulator valid terakhir di `localStorage`.
 *
 * Lapisan: `lib`. Kontrak ADR-003: kunci berversi, payload rusak dibuang
 * aman dan tidak ditampilkan sebagai hasil terkini (AC-05-09).
 * Versi PRD: satu entri terakhir (riwayat bertumpuk = amandemen usulan).
 */

import { EMPTY_FORM, type CalcForm } from "./calculator.ts";

export const CALC_KEY = "umiro.calc.v1";

interface StoredCalc {
  form: CalcForm;
  savedAt: string;
}

export type LoadResult =
  | { status: "kosong" }
  | { status: "rusak" }
  | { status: "ok"; form: CalcForm; savedAt: string };

function isForm(x: unknown): x is CalcForm {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    (Object.keys(EMPTY_FORM) as (keyof CalcForm)[]).every(
      (k) => typeof o[k] === "string",
    ) &&
    (o.modeBiaya === "unit" || o.modeBiaya === "batch") &&
    (o.kanal === "langsung" || o.kanal === "platform")
  );
}

export function loadCalc(storage: Storage = localStorage): LoadResult {
  let raw: string | null;
  try {
    raw = storage.getItem(CALC_KEY);
  } catch {
    return { status: "kosong" };
  }
  if (raw === null) return { status: "kosong" };
  try {
    const parsed = JSON.parse(raw) as Partial<StoredCalc>;
    if (isForm(parsed.form) && typeof parsed.savedAt === "string") {
      return { status: "ok", form: parsed.form, savedAt: parsed.savedAt };
    }
  } catch {
    // jatuh ke penanganan rusak di bawah
  }
  try {
    storage.removeItem(CALC_KEY);
  } catch {
    // abaikan — penyimpanan tidak tersedia
  }
  return { status: "rusak" };
}

/** `false` bila penyimpanan tidak tersedia/penuh — UI tidak boleh klaim tersimpan. */
export function saveCalc(form: CalcForm, storage: Storage = localStorage): boolean {
  try {
    const payload: StoredCalc = { form, savedAt: new Date().toISOString() };
    storage.setItem(CALC_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

export function clearCalc(storage: Storage = localStorage): void {
  try {
    storage.removeItem(CALC_KEY);
  } catch {
    // abaikan
  }
}
