import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  EMPTY_FORM,
  calc,
  hargaSetelahPotongan,
  parseBulat,
  parsePersen,
  validateForm,
  type CalcForm,
} from "./calculator.ts";

const base = { H: 10_000, V: 7_700, Q: 40, D: 26, F: 1_800_000, T: null };

// Kasus verifikasi PRD Lampiran B — satu `it` per baris tabel.
describe("calc — PRD Lampiran B", () => {
  it("B1: H=10.000 V=7.700 Q=40 D=26 F=1.800.000 → M 2.300, laba 592.000, impas 31", () => {
    const r = calc(base);
    assert.equal(r.M, 2_300);
    assert.equal(r.laba, 592_000);
    assert.equal(r.impas, 31);
  });

  it("B2: M=0 atau M<0 → tanpa impas/target volume", () => {
    for (const V of [10_000, 12_000]) {
      const r = calc({ ...base, V, T: 1_000_000 });
      assert.equal(r.marginNonPositif, true);
      assert.equal(r.impas, null);
      assert.deepEqual(r.target, { kind: "tidak-valid" });
    }
  });

  it("B3: F=0, M>0, D>0 → impas 0", () => {
    assert.equal(calc({ ...base, F: 0 }).impas, 0);
  });

  it("B4: D=0 atau H=0 → ditolak validasi, tanpa pembagian nol", () => {
    const form: CalcForm = {
      ...EMPTY_FORM,
      harga: "0",
      biayaUnit: "7700",
      volume: "40",
      hari: "0",
      biayaTetap: "1800000",
    };
    const v = validateForm(form);
    assert.equal(v.input, null);
    assert.equal(v.errors.harga, "harga-nol");
    assert.equal(v.errors.hari, "hari-nol");
    // Pertahanan lapis kedua: calc langsung tetap tidak menghasilkan angka palsu.
    assert.equal(calc({ ...base, D: 0 }).impas, null);
    assert.equal(calc({ ...base, H: 0, V: 0 }).impas, null);
  });

  it("B5: T ≤ laba berjalan → tercapai, tambahan 0", () => {
    assert.deepEqual(calc({ ...base, T: 592_000 }).target, { kind: "tercapai", tambahan: 0 });
    assert.deepEqual(calc({ ...base, T: 0 }).target, { kind: "tercapai", tambahan: 0 });
  });

  it("B6: negatif / NaN / tak hingga / format → ditolak", () => {
    assert.deepEqual(parseBulat("-5"), { ok: false, error: "negatif" });
    assert.deepEqual(parseBulat("NaN"), { ok: false, error: "format" });
    assert.deepEqual(parseBulat("Infinity"), { ok: false, error: "format" });
    assert.deepEqual(parseBulat("1e400"), { ok: false, error: "format" });
    assert.deepEqual(parseBulat("10,5"), { ok: false, error: "format" });
    assert.equal(validateForm({ ...EMPTY_FORM, harga: "-1" }).input, null);
  });
});

describe("calc — target di atas laba", () => {
  it("unit/hari = ceil((T+F)/(M×D)), tambahan = selisih dengan Q", () => {
    const r = calc({ ...base, T: 1_000_000 });
    // (1.000.000 + 1.800.000) / (2.300 × 26) = 46,82 → 47
    assert.deepEqual(r.target, { kind: "unit", perHari: 47, tambahan: 7 });
  });
});

describe("parseBulat", () => {
  it("menerima titik ribuan dan spasi", () => {
    assert.deepEqual(parseBulat("10.000"), { ok: true, value: 10_000 });
    assert.deepEqual(parseBulat("1 800 000"), { ok: true, value: 1_800_000 });
    assert.deepEqual(parseBulat("7700"), { ok: true, value: 7_700 });
  });
  it("kosong → null; titik bukan ribuan → format", () => {
    assert.equal(parseBulat("  "), null);
    assert.deepEqual(parseBulat("10.5"), { ok: false, error: "format" });
  });
});

describe("parsePersen", () => {
  it("terima koma/titik desimal, tolak ≥100", () => {
    assert.deepEqual(parsePersen("12,5"), { ok: true, value: 12.5 });
    assert.deepEqual(parsePersen("20"), { ok: true, value: 20 });
    assert.deepEqual(parsePersen("100"), { ok: false, error: "persen-rentang" });
  });
});

describe("validateForm", () => {
  const valid: CalcForm = {
    ...EMPTY_FORM,
    harga: "10.000",
    biayaUnit: "7.700",
    volume: "40",
    hari: "26",
    biayaTetap: "1.800.000",
  };

  it("form valid → input sesuai Lampiran B", () => {
    assert.deepEqual(validateForm(valid).input, { ...base, T: null });
  });

  it("mode batch: V = biaya batch / unit batch; unit batch 0 ditolak", () => {
    const batch = { ...valid, modeBiaya: "batch" as const, biayaBatch: "77.000", unitBatch: "10" };
    assert.equal(validateForm(batch).input?.V, 7_700);
    const nol = validateForm({ ...batch, unitBatch: "0" });
    assert.equal(nol.input, null);
    assert.equal(nol.errors.unitBatch, "unit-batch-nol");
  });

  it("hari > 31 ditolak", () => {
    assert.equal(validateForm({ ...valid, hari: "40" }).errors.hari, "hari-maks");
  });

  it("potongan hanya dibaca saat kanal platform", () => {
    assert.equal(validateForm({ ...valid, potongan: "20" }).potongan, null);
    assert.equal(validateForm({ ...valid, kanal: "platform", potongan: "20" }).potongan, 20);
  });
});

describe("US-09 direct vs platform", () => {
  it("input identik selain potongan; margin platform ≤ 0 → tanpa impas", () => {
    const H = hargaSetelahPotongan(10_000, 20);
    assert.equal(H, 8_000);
    const r = calc({ ...base, H });
    assert.equal(r.M, 300);
    const rugi = calc({ ...base, H: hargaSetelahPotongan(10_000, 30) });
    assert.equal(rugi.marginNonPositif, true);
    assert.equal(rugi.impas, null);
  });
});
