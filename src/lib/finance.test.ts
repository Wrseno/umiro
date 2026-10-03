import { describe, expect, it } from "vitest";
import {
  calculate,
  calculateTarget,
  cogsFromBatch,
  formatRupiah,
  simulatePriceIncrease,
  type CalculatorInput,
} from "./finance";

/** Contoh demonstrasi dari PRD Lampiran C. */
const CONTOH: CalculatorInput = {
  price: 10_000,
  cogs: 7_700,
  qtyPerDay: 40,
  operatingDays: 26,
  fixedCost: 1_800_000,
};

describe("calculate — contoh Lampiran C", () => {
  const hasil = calculate(CONTOH);

  it("untung per porsi Rp 2.300, bukan harga jualnya", () => {
    expect(hasil.profitPerUnit).toBe(2_300);
  });

  it("margin 23 persen", () => {
    expect(hasil.marginPercent).toBeCloseTo(23, 10);
  });

  it("untung kotor bulanan Rp 2.392.000", () => {
    expect(hasil.grossMonthly).toBe(2_392_000);
  });

  it("untung bersih bulanan Rp 592.000", () => {
    expect(hasil.netMonthly).toBe(592_000);
  });

  it("titik impas 31 porsi per hari, dibulatkan ke atas dari 30,1", () => {
    expect(hasil.breakEvenPerDay).toBe(31);
  });

  it("tidak ditandai merugi", () => {
    expect(hasil.losesMoneyPerUnit).toBe(false);
    expect(hasil.losesMoneyMonthly).toBe(false);
  });
});

describe("calculate — keadaan merugi", () => {
  it("margin nol: titik impas tidak terdefinisi", () => {
    const hasil = calculate({ ...CONTOH, cogs: 10_000 });
    expect(hasil.profitPerUnit).toBe(0);
    expect(hasil.breakEvenPerDay).toBeNull();
    expect(hasil.losesMoneyPerUnit).toBe(true);
  });

  it("margin negatif: setiap penjualan menambah kerugian", () => {
    const hasil = calculate({ ...CONTOH, cogs: 12_000 });
    expect(hasil.profitPerUnit).toBe(-2_000);
    expect(hasil.breakEvenPerDay).toBeNull();
    expect(hasil.losesMoneyPerUnit).toBe(true);
    expect(hasil.netMonthly).toBeLessThan(0);
  });

  it("margin positif tetapi biaya tetap terlalu besar: rugi bulanan, titik impas tetap ada", () => {
    const hasil = calculate({ ...CONTOH, fixedCost: 3_000_000 });
    expect(hasil.losesMoneyPerUnit).toBe(false);
    expect(hasil.losesMoneyMonthly).toBe(true);
    expect(hasil.netMonthly).toBe(-608_000);
    expect(hasil.breakEvenPerDay).toBe(51);
  });

  it("harga jual nol: persentase margin tidak terdefinisi, bukan pembagian nol", () => {
    expect(calculate({ ...CONTOH, price: 0 }).marginPercent).toBeNull();
  });
});

describe("calculate — pembulatan titik impas", () => {
  it("hasil bulat tidak ikut dibulatkan ke atas", () => {
    // F / (M × D) = 520.000 / (2.000 × 26) = 10 tepat
    const hasil = calculate({
      price: 10_000,
      cogs: 8_000,
      qtyPerDay: 40,
      operatingDays: 26,
      fixedCost: 520_000,
    });
    expect(hasil.breakEvenPerDay).toBe(10);
  });

  it("sisa sekecil apa pun tetap dibulatkan ke atas", () => {
    const hasil = calculate({
      price: 10_000,
      cogs: 8_000,
      qtyPerDay: 40,
      operatingDays: 26,
      fixedCost: 520_001,
    });
    expect(hasil.breakEvenPerDay).toBe(11);
  });
});

describe("calculateTarget", () => {
  it("target Rp 4 juta butuh 97 porsi per hari, kurang 57 dari sekarang", () => {
    // (4.000.000 + 1.800.000) / (2.300 × 26) = 96,99 → 97
    const hasil = calculateTarget(CONTOH, { targetIncome: 4_000_000 });
    expect(hasil.requiredQtyPerDay).toBe(97);
    expect(hasil.gapPerDay).toBe(57);
    expect(hasil.alreadyReached).toBe(false);
  });

  it("target yang sudah terlampaui ditandai tercapai, selisihnya negatif", () => {
    const hasil = calculateTarget(CONTOH, { targetIncome: 300_000 });
    expect(hasil.alreadyReached).toBe(true);
    expect(hasil.gapPerDay).toBeLessThanOrEqual(0);
  });

  it("kebutuhan melampaui kapasitas: sistem menolak saran tambah volume", () => {
    const hasil = calculateTarget(CONTOH, {
      targetIncome: 4_000_000,
      maxCapacityPerDay: 60,
    });
    expect(hasil.exceedsCapacity).toBe(true);
  });

  it("kebutuhan masih di bawah kapasitas", () => {
    const hasil = calculateTarget(CONTOH, {
      targetIncome: 4_000_000,
      maxCapacityPerDay: 120,
    });
    expect(hasil.exceedsCapacity).toBe(false);
  });

  it("margin tidak positif: target mustahil lewat volume berapa pun", () => {
    const hasil = calculateTarget(
      { ...CONTOH, cogs: 10_000 },
      { targetIncome: 1_000_000 },
    );
    expect(hasil.requiredQtyPerDay).toBeNull();
    expect(hasil.gapPerDay).toBeNull();
    expect(hasil.exceedsCapacity).toBe(true);
    expect(hasil.alreadyReached).toBe(false);
  });
});

describe("simulatePriceIncrease", () => {
  it("naik Rp 2.000 per porsi menjadikan untung bersih Rp 2.672.000", () => {
    const hasil = simulatePriceIncrease(CONTOH, 2_000);
    expect(hasil.profitPerUnit).toBe(4_300);
    expect(hasil.netMonthly).toBe(2_672_000);
  });

  it("tanpa penambahan satu pembeli pun — volume tidak berubah", () => {
    const sebelum = calculate(CONTOH);
    const sesudah = simulatePriceIncrease(CONTOH, 2_000);
    expect(sesudah.netMonthly - sebelum.netMonthly).toBe(
      2_000 * CONTOH.qtyPerDay * CONTOH.operatingDays,
    );
  });

  it("penurunan harga menurunkan untung bersih", () => {
    expect(simulatePriceIncrease(CONTOH, -1_000).netMonthly).toBe(-448_000);
  });
});

describe("potongan platform — fenomena ilusi penjualan", () => {
  const LEWAT_APLIKASI: CalculatorInput = { ...CONTOH, platformFeePercent: 20 };

  it("tanpa potongan platform, hasilnya tidak ada", () => {
    expect(calculate(CONTOH).viaPlatform).toBeNull();
  });

  it("potongan 20% dari harga Rp 10.000 adalah Rp 2.000 per porsi", () => {
    expect(calculate(LEWAT_APLIKASI).viaPlatform!.feePerUnit).toBe(2_000);
  });

  it("untung per porsi jatuh dari Rp 2.300 menjadi Rp 300", () => {
    const hasil = calculate(LEWAT_APLIKASI);
    expect(hasil.profitPerUnit).toBe(2_300);
    expect(hasil.viaPlatform!.profitPerUnit).toBe(300);
  });

  it("pesanan ramai di aplikasi justru berarti rugi Rp 1.488.000 per bulan", () => {
    expect(calculate(LEWAT_APLIKASI).viaPlatform!.netMonthly).toBe(-1_488_000);
  });

  it("titik impas melonjak dari 31 menjadi 231 porsi per hari", () => {
    const hasil = calculate(LEWAT_APLIKASI);
    expect(hasil.breakEvenPerDay).toBe(31);
    expect(hasil.viaPlatform!.breakEvenPerDay).toBe(231);
  });

  it("persentase margin ikut jatuh", () => {
    expect(calculate(LEWAT_APLIKASI).viaPlatform!.marginPercent).toBeCloseTo(3, 10);
  });

  it("potongan besar membuat setiap pesanan aplikasi menambah kerugian", () => {
    const hasil = calculate({ ...CONTOH, platformFeePercent: 30 });
    expect(hasil.viaPlatform!.profitPerUnit).toBe(-700);
    expect(hasil.viaPlatform!.losesMoneyPerUnit).toBe(true);
    expect(hasil.viaPlatform!.breakEvenPerDay).toBeNull();
    // Penjualan langsung tetap sehat — inilah selisih yang perlu dilihat.
    expect(hasil.losesMoneyPerUnit).toBe(false);
  });

  it("potongan nol persen tetap dihitung, bukan dianggap kosong", () => {
    const hasil = calculate({ ...CONTOH, platformFeePercent: 0 });
    expect(hasil.viaPlatform).not.toBeNull();
    expect(hasil.viaPlatform!.feePerUnit).toBe(0);
    expect(hasil.viaPlatform!.profitPerUnit).toBe(hasil.profitPerUnit);
  });

  it("potongan di atas 100 persen ditolak", () => {
    expect(() => calculate({ ...CONTOH, platformFeePercent: 101 })).toThrow(RangeError);
  });

  it("potongan negatif ditolak", () => {
    expect(() => calculate({ ...CONTOH, platformFeePercent: -5 })).toThrow(RangeError);
  });

  it("potongan dibulatkan ke rupiah terdekat, bukan disimpan pecahan", () => {
    // 12,5% dari Rp 10.000 = Rp 1.250 tepat; 12,5% dari Rp 9.999 = 1.249,875
    expect(calculate({ ...CONTOH, platformFeePercent: 12.5 }).viaPlatform!.feePerUnit)
      .toBe(1_250);
    const ganjil = calculate({ ...CONTOH, price: 9_999, platformFeePercent: 12.5 });
    expect(Number.isInteger(ganjil.viaPlatform!.feePerUnit)).toBe(true);
  });

  it("kenaikan harga ikut menaikkan potongan platform", () => {
    // Menaikkan harga tidak sepenuhnya masuk kantong bila lewat aplikasi.
    const sesudah = simulatePriceIncrease(LEWAT_APLIKASI, 2_000);
    expect(sesudah.viaPlatform!.feePerUnit).toBe(2_400);
    expect(sesudah.viaPlatform!.profitPerUnit).toBe(1_900);
  });
});

describe("cogsFromBatch", () => {
  it("Rp 385.000 untuk 50 porsi menjadi Rp 7.700 per porsi", () => {
    expect(cogsFromBatch(385_000, 50)).toBe(7_700);
  });

  it("dibulatkan ke rupiah terdekat", () => {
    expect(cogsFromBatch(100_000, 3)).toBe(33_333);
  });

  it("jumlah unit nol ditolak, bukan menghasilkan tak hingga", () => {
    expect(() => cogsFromBatch(385_000, 0)).toThrow(RangeError);
  });

  it("jumlah unit pecahan ditolak", () => {
    expect(() => cogsFromBatch(385_000, 2.5)).toThrow(RangeError);
  });
});

describe("validasi masukan", () => {
  it("nilai negatif ditolak", () => {
    expect(() => calculate({ ...CONTOH, price: -1 })).toThrow(RangeError);
  });

  it("NaN ditolak — tidak merambat diam-diam ke layar pengguna", () => {
    expect(() => calculate({ ...CONTOH, cogs: Number.NaN })).toThrow(TypeError);
  });

  it("target negatif ditolak", () => {
    expect(() => calculateTarget(CONTOH, { targetIncome: -1 })).toThrow(RangeError);
  });
});

describe("formatRupiah", () => {
  it("memakai pemisah ribuan Indonesia", () => {
    expect(formatRupiah(2_672_000)).toBe("Rp 2.672.000");
  });

  it("nilai negatif memakai tanda minus di depan", () => {
    expect(formatRupiah(-608_000)).toBe("−Rp 608.000");
  });

  it("pecahan dibulatkan ke rupiah terdekat", () => {
    expect(formatRupiah(2_300.6)).toBe("Rp 2.301");
  });
});
