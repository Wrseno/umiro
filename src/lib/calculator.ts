/**
 * Kalkulator keuangan — fungsi murni, satu sumber rumus (PRD Lampiran B).
 *
 * Lapisan: `lib` (tanpa impor). Mengembalikan KODE masalah, bukan teks;
 * teks pesan ada di `src/content/kalkulator.ts` (ADR-001).
 * Tidak membaca/menulis Diagnosis (AC-05-07).
 */

/** H harga/unit, V biaya variabel/unit, Q unit/hari, D hari/bulan, F biaya tetap/bulan, T target laba/bulan. */
export interface CalcInput {
  H: number;
  V: number;
  Q: number;
  D: number;
  F: number;
  T: number | null;
}

export type TargetResult =
  | { kind: "kosong" }
  | { kind: "tercapai"; tambahan: 0 }
  | { kind: "unit"; perHari: number; tambahan: number }
  | { kind: "tidak-valid" };

export interface CalcResult {
  /** Margin kontribusi/unit, rupiah. */
  M: number;
  /** Estimasi laba bersih/bulan, rupiah (dibulatkan). */
  laba: number;
  /** Titik impas unit/hari; `null` bila tidak valid (M ≤ 0 atau D ≤ 0). */
  impas: number | null;
  target: TargetResult;
  marginNonPositif: boolean;
}

/** Toleransi galat pecahan biner sebelum `ceil` (mis. 30.000000001 → 30). */
const EPS = 1e-9;
const ceilUnit = (x: number) => Math.ceil(x - EPS);

export function calc({ H, V, Q, D, F, T }: CalcInput): CalcResult {
  const M = H - V;
  const laba = Math.round(M * Q * D - F);
  const denom = M * D;
  const validVolume = M > 0 && D > 0 && H > 0 && denom > 0;

  const impas = validVolume ? (F === 0 ? 0 : ceilUnit(F / denom)) : null;

  let target: TargetResult;
  if (T === null) {
    target = { kind: "kosong" };
  } else if (!validVolume) {
    target = { kind: "tidak-valid" };
  } else if (T <= laba) {
    target = { kind: "tercapai", tambahan: 0 };
  } else if (T + F > 0) {
    const perHari = ceilUnit((T + F) / denom);
    target = { kind: "unit", perHari, tambahan: Math.max(0, perHari - ceilUnit(Q)) };
  } else {
    target = { kind: "tidak-valid" };
  }

  return { M: Math.round(M), laba, impas, target, marginNonPositif: M <= 0 };
}

/** Harga efektif setelah potongan platform (persen dari harga jual, US-09). */
export function hargaSetelahPotongan(H: number, potonganPersen: number): number {
  return H * (1 - potonganPersen / 100);
}

// ── Validasi form ──────────────────────────────────────────────

export type FieldError =
  | "wajib"
  | "format"
  | "negatif"
  | "harga-nol"
  | "hari-nol"
  | "hari-maks"
  | "unit-batch-nol"
  | "persen-rentang";

export type Kanal = "langsung" | "platform";
export type ModeBiaya = "unit" | "batch";

/** Nilai mentah form — string apa adanya dari input pengguna. */
export interface CalcForm {
  harga: string;
  modeBiaya: ModeBiaya;
  biayaUnit: string;
  biayaBatch: string;
  unitBatch: string;
  volume: string;
  hari: string;
  biayaTetap: string;
  target: string;
  kanal: Kanal;
  potongan: string;
}

export type FormField = Exclude<keyof CalcForm, "modeBiaya" | "kanal">;

export const EMPTY_FORM: CalcForm = {
  harga: "",
  modeBiaya: "unit",
  biayaUnit: "",
  biayaBatch: "",
  unitBatch: "",
  volume: "",
  hari: "",
  biayaTetap: "",
  target: "",
  kanal: "langsung",
  potongan: "",
};

type Parsed = { ok: true; value: number } | { ok: false; error: FieldError };

/**
 * Bilangan bulat non-negatif: terima `10000`, `10.000`, `10 000`.
 * Tolak koma desimal / format lain (rupiah bulat).
 */
export function parseBulat(raw: string): Parsed | null {
  const s = raw.trim().replace(/\s+/g, "");
  if (s === "") return null;
  if (s.startsWith("-")) return { ok: false, error: "negatif" };
  if (!/^(\d+|\d{1,3}(\.\d{3})+)$/.test(s)) return { ok: false, error: "format" };
  const value = Number(s.replace(/\./g, ""));
  if (!Number.isFinite(value)) return { ok: false, error: "format" };
  return { ok: true, value };
}

/** Persen 0–<100, desimal boleh dengan koma atau titik (`12,5`). */
export function parsePersen(raw: string): Parsed | null {
  const s = raw.trim().replace(",", ".");
  if (s === "") return null;
  if (s.startsWith("-")) return { ok: false, error: "negatif" };
  if (!/^\d+(\.\d+)?$/.test(s)) return { ok: false, error: "format" };
  const value = Number(s);
  if (!Number.isFinite(value)) return { ok: false, error: "format" };
  if (value >= 100) return { ok: false, error: "persen-rentang" };
  return { ok: true, value };
}

export interface Validated {
  input: CalcInput | null;
  /** Potongan platform (persen) bila kanal platform dan terisi. */
  potongan: number | null;
  errors: Partial<Record<FormField, FieldError>>;
}

export function validateForm(form: CalcForm): Validated {
  const errors: Partial<Record<FormField, FieldError>> = {};
  const req = (field: FormField): number | null => {
    const p = parseBulat(form[field]);
    if (p === null) {
      errors[field] = "wajib";
      return null;
    }
    if (!p.ok) {
      errors[field] = p.error;
      return null;
    }
    return p.value;
  };

  const H = req("harga");
  if (H === 0) errors.harga = "harga-nol";

  let V: number | null = null;
  if (form.modeBiaya === "unit") {
    V = req("biayaUnit");
  } else {
    const batch = req("biayaBatch");
    const unit = req("unitBatch");
    if (unit === 0) errors.unitBatch = "unit-batch-nol";
    if (batch !== null && unit) V = batch / unit;
  }

  const Q = req("volume");
  const D = req("hari");
  if (D === 0) errors.hari = "hari-nol";
  if (D !== null && D > 31) errors.hari = "hari-maks";
  const F = req("biayaTetap");

  let T: number | null = null;
  const pt = parseBulat(form.target);
  if (pt && !pt.ok) errors.target = pt.error;
  if (pt && pt.ok) T = pt.value;

  let potongan: number | null = null;
  if (form.kanal === "platform") {
    const pp = parsePersen(form.potongan);
    if (pp && !pp.ok) errors.potongan = pp.error;
    if (pp && pp.ok) potongan = pp.value;
  }

  if (
    Object.keys(errors).length > 0 ||
    H === null || V === null || Q === null || D === null || F === null
  ) {
    return { input: null, potongan: null, errors };
  }
  return { input: { H, V, Q, D, F, T }, potongan, errors };
}
