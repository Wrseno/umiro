/**
 * Rumus Kalkulator Untung Sebenarnya — PRD Lampiran B.
 *
 * Seluruh nilai uang adalah bilangan bulat rupiah. Perhitungan keuangan
 * tidak memakai bilangan pecahan agar tidak muncul galat pembulatan pada
 * angka yang dibaca pengguna.
 *
 * Modul ini murni: tanpa I/O, tanpa tanggal, tanpa acak. Dipakai di sisi
 * peladen untuk menyimpan, dan di sisi klien agar penggeser pengandaian
 * harga bereaksi seketika tanpa bolak-balik ke peladen.
 */

export interface CalculatorInput {
  /** H — harga jual per unit, rupiah */
  price: number;
  /** B — biaya bahan per unit, rupiah */
  cogs: number;
  /** Q — unit terjual per hari */
  qtyPerDay: number;
  /** D — hari operasional per bulan */
  operatingDays: number;
  /** F — biaya tetap per bulan, rupiah */
  fixedCost: number;
  /**
   * P — potongan platform pesan antar atau lokapasar, dalam persen harga
   * jual. Opsional; diisi hanya oleh pengguna yang berjualan lewat aplikasi.
   *
   * Komponen ini sering luput padahal justru memakan untung: pelaku usaha
   * melihat pesanan ramai di aplikasi dan menyimpulkan usahanya laris,
   * tanpa menyadari sisa yang benar-benar diterima jauh lebih kecil.
   */
  platformFeePercent?: number;
}

export interface CalculatorResult {
  /** M — keuntungan per unit, rupiah. Dapat bernilai negatif. */
  profitPerUnit: number;
  /** M / H × 100. `null` bila harga jual nol. */
  marginPercent: number | null;
  /** M × Q × D, rupiah */
  grossMonthly: number;
  /** M × Q × D − F, rupiah. Dapat bernilai negatif. */
  netMonthly: number;
  /**
   * F / (M × D), dibulatkan ke atas.
   * `null` bila M ≤ 0 — setiap penjualan justru menambah kerugian,
   * sehingga titik impas tidak terdefinisi (Lampiran B ketentuan 1).
   */
  breakEvenPerDay: number | null;
  /** Benar bila M ≤ 0. */
  losesMoneyPerUnit: boolean;
  /** Benar bila netMonthly < 0. */
  losesMoneyMonthly: boolean;
  /**
   * Hasil yang sama dihitung ulang untuk penjualan lewat aplikasi.
   * `null` bila pengguna tidak mengisi potongan platform.
   */
  viaPlatform: PlatformResult | null;
}

/**
 * Keadaan apabila seluruh penjualan berlangsung lewat aplikasi. Disajikan
 * berdampingan dengan hasil penjualan langsung agar selisihnya terlihat.
 */
export interface PlatformResult {
  /** Potongan platform dalam rupiah per unit. */
  feePerUnit: number;
  /** Keuntungan per unit setelah potongan. Dapat bernilai negatif. */
  profitPerUnit: number;
  marginPercent: number | null;
  /** Keuntungan bersih bulanan bila seluruh penjualan lewat aplikasi. */
  netMonthly: number;
  breakEvenPerDay: number | null;
  losesMoneyPerUnit: boolean;
}

export interface TargetInput {
  /** T — target penghasilan bersih per bulan, rupiah */
  targetIncome: number;
  /** Kapasitas maksimum per hari yang dinyatakan pengguna, bila diketahui. */
  maxCapacityPerDay?: number;
}

export interface TargetResult {
  /**
   * (T + F) / (M × D), dibulatkan ke atas.
   * `null` bila M ≤ 0 — target tidak dapat dicapai dengan volume berapa pun.
   */
  requiredQtyPerDay: number | null;
  /** Selisih terhadap penjualan saat ini. `null` bila requiredQtyPerDay null. */
  gapPerDay: number | null;
  /** Benar bila target sudah terpenuhi oleh penjualan saat ini. */
  alreadyReached: boolean;
  /**
   * Benar bila kebutuhan per hari melampaui kapasitas yang dinyatakan,
   * atau bila margin tidak positif. Pada keadaan ini sistem tidak boleh
   * menyarankan penambahan volume (Lampiran B ketentuan 2).
   */
  exceedsCapacity: boolean;
}

/** Pembulatan ke atas yang aman untuk galat pembulatan biner. */
function ceilSafe(value: number): number {
  const rounded = Math.round(value);
  return Math.abs(value - rounded) < 1e-9 ? rounded : Math.ceil(value);
}

function assertFinite(input: CalculatorInput): void {
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    if (!Number.isFinite(value)) {
      throw new TypeError(`Nilai ${key} harus berupa angka, diterima: ${value}`);
    }
    if (value < 0) {
      throw new RangeError(`Nilai ${key} tidak boleh negatif, diterima: ${value}`);
    }
  }
  if (input.platformFeePercent !== undefined && input.platformFeePercent > 100) {
    throw new RangeError(
      `Potongan platform tidak boleh melebihi 100 persen, diterima: ${input.platformFeePercent}`,
    );
  }
}

/** Titik impas harian untuk satu nilai keuntungan per unit. */
function breakEven(
  profitPerUnit: number,
  operatingDays: number,
  fixedCost: number,
): number | null {
  const monthlyProfitPerDailyUnit = profitPerUnit * operatingDays;
  return monthlyProfitPerDailyUnit > 0
    ? ceilSafe(fixedCost / monthlyProfitPerDailyUnit)
    : null;
}

export function calculate(input: CalculatorInput): CalculatorResult {
  assertFinite(input);
  const { price, cogs, qtyPerDay, operatingDays, fixedCost } = input;

  const profitPerUnit = price - cogs;
  const monthlyUnits = qtyPerDay * operatingDays;
  const grossMonthly = profitPerUnit * monthlyUnits;
  const netMonthly = grossMonthly - fixedCost;

  return {
    profitPerUnit,
    marginPercent: price > 0 ? (profitPerUnit / price) * 100 : null,
    grossMonthly,
    netMonthly,
    breakEvenPerDay: breakEven(profitPerUnit, operatingDays, fixedCost),
    losesMoneyPerUnit: profitPerUnit <= 0,
    losesMoneyMonthly: netMonthly < 0,
    viaPlatform: calculateViaPlatform(input),
  };
}

/**
 * Keadaan apabila seluruh penjualan berlangsung lewat aplikasi.
 *
 * Potongan dibulatkan ke rupiah terdekat lebih dahulu, baru dikurangkan,
 * agar seluruh nilai uang tetap berupa bilangan bulat rupiah sesuai
 * ketentuan Lampiran B.
 */
export function calculateViaPlatform(
  input: CalculatorInput,
): PlatformResult | null {
  const fee = input.platformFeePercent;
  if (fee === undefined) return null;

  const { price, cogs, qtyPerDay, operatingDays, fixedCost } = input;
  const feePerUnit = Math.round((price * fee) / 100);
  const profitPerUnit = price - feePerUnit - cogs;
  const netMonthly = profitPerUnit * qtyPerDay * operatingDays - fixedCost;

  return {
    feePerUnit,
    profitPerUnit,
    marginPercent: price > 0 ? (profitPerUnit / price) * 100 : null,
    netMonthly,
    breakEvenPerDay: breakEven(profitPerUnit, operatingDays, fixedCost),
    losesMoneyPerUnit: profitPerUnit <= 0,
  };
}

export function calculateTarget(
  input: CalculatorInput,
  target: TargetInput,
): TargetResult {
  assertFinite(input);
  if (!Number.isFinite(target.targetIncome) || target.targetIncome < 0) {
    throw new RangeError(
      `Nilai targetIncome tidak boleh negatif, diterima: ${target.targetIncome}`,
    );
  }

  const { price, cogs, qtyPerDay, operatingDays, fixedCost } = input;
  const monthlyProfitPerDailyUnit = (price - cogs) * operatingDays;

  if (monthlyProfitPerDailyUnit <= 0) {
    return {
      requiredQtyPerDay: null,
      gapPerDay: null,
      alreadyReached: false,
      exceedsCapacity: true,
    };
  }

  const requiredQtyPerDay = ceilSafe(
    (target.targetIncome + fixedCost) / monthlyProfitPerDailyUnit,
  );
  const gapPerDay = requiredQtyPerDay - qtyPerDay;

  return {
    requiredQtyPerDay,
    gapPerDay,
    alreadyReached: gapPerDay <= 0,
    exceedsCapacity:
      target.maxCapacityPerDay !== undefined &&
      requiredQtyPerDay > target.maxCapacityPerDay,
  };
}

/**
 * Pengandaian kenaikan harga sebesar `increase` rupiah per unit.
 * Dipakai oleh penggeser pada halaman Kalkulator; biaya bahan, volume,
 * dan biaya tetap dianggap tidak berubah.
 */
export function simulatePriceIncrease(
  input: CalculatorInput,
  increase: number,
): CalculatorResult {
  if (!Number.isFinite(increase)) {
    throw new TypeError(`Nilai increase harus berupa angka, diterima: ${increase}`);
  }
  return calculate({ ...input, price: input.price + increase });
}

/**
 * Biaya bahan per unit dihitung dari satu kali produksi, untuk pengguna
 * yang mengetahui belanja sekali masak tetapi tidak mengetahui biaya per
 * porsi (PRD Bagian 12 risiko nomor 2). Dibulatkan ke rupiah terdekat.
 */
export function cogsFromBatch(batchCost: number, unitsProduced: number): number {
  if (!Number.isFinite(batchCost) || batchCost < 0) {
    throw new RangeError(`Nilai batchCost tidak sah: ${batchCost}`);
  }
  if (!Number.isInteger(unitsProduced) || unitsProduced <= 0) {
    throw new RangeError(
      `Jumlah unit sekali produksi harus bilangan bulat positif, diterima: ${unitsProduced}`,
    );
  }
  return Math.round(batchCost / unitsProduced);
}

/** Format rupiah dengan pemisah ribuan, tanpa angka di belakang koma. */
export function formatRupiah(value: number): string {
  const rounded = Math.round(value);
  const formatted = Math.abs(rounded).toLocaleString("id-ID");
  return rounded < 0 ? `−Rp ${formatted}` : `Rp ${formatted}`;
}
