"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { NumberField } from "@/components/RupiahInput";
import {
  calculate,
  calculateTarget,
  cogsFromBatch,
  formatRupiah,
  simulatePriceIncrease,
  type CalculatorInput,
} from "@/lib/finance";

/**
 * Halaman Kalkulator — US-03 dan US-04.
 *
 * Satu-satunya halaman yang boleh padat angka, karena di sinilah angka
 * memang produknya.
 *
 * Perhitungan dijalankan di peramban memakai modul yang sama dengan
 * peladen, agar penggeser pengandaian harga bereaksi seketika. Yang akan
 * disimpan ke basis data adalah masukan mentahnya, bukan hasilnya, sehingga
 * angka dapat diturunkan ulang bila rumus diperbaiki (PRD Bagian 13.2).
 */

type CogsMode = "per-porsi" | "per-masak";

export default function KalkulatorPage() {
  const [price, setPrice] = useState<number | null>(null);
  const [cogsMode, setCogsMode] = useState<CogsMode>("per-masak");
  const [cogsDirect, setCogsDirect] = useState<number | null>(null);
  const [batchCost, setBatchCost] = useState<number | null>(null);
  const [batchUnits, setBatchUnits] = useState<number | null>(null);
  const [qtyPerDay, setQtyPerDay] = useState<number | null>(null);
  const [operatingDays, setOperatingDays] = useState<number | null>(26);
  const [fixedCost, setFixedCost] = useState<number | null>(null);
  const [usesPlatform, setUsesPlatform] = useState(false);
  const [platformFee, setPlatformFee] = useState<number | null>(20);
  const [priceIncrease, setPriceIncrease] = useState(0);
  const [targetIncome, setTargetIncome] = useState<number | null>(null);

  const cogs = useMemo(() => {
    if (cogsMode === "per-porsi") return cogsDirect;
    if (batchCost === null || !batchUnits) return null;
    return cogsFromBatch(batchCost, batchUnits);
  }, [batchCost, batchUnits, cogsDirect, cogsMode]);

  const input: CalculatorInput | null = useMemo(() => {
    if (
      price === null ||
      cogs === null ||
      qtyPerDay === null ||
      !operatingDays ||
      fixedCost === null
    ) {
      return null;
    }
    return {
      price,
      cogs,
      qtyPerDay,
      operatingDays,
      fixedCost,
      ...(usesPlatform && platformFee !== null
        ? { platformFeePercent: platformFee }
        : {}),
    };
  }, [cogs, fixedCost, operatingDays, platformFee, price, qtyPerDay, usesPlatform]);

  const result = useMemo(() => (input ? calculate(input) : null), [input]);
  const simulated = useMemo(
    () => (input && priceIncrease > 0 ? simulatePriceIncrease(input, priceIncrease) : null),
    [input, priceIncrease],
  );
  const target = useMemo(
    () =>
      input && targetIncome !== null
        ? calculateTarget(input, { targetIncome })
        : null,
    [input, targetIncome],
  );

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1180px] px-5 py-10 md:px-10 md:py-12">
        <h1 className="text-[length:var(--text-section)]">
          Hitung Untung Sebenarnya
        </h1>
        <p className="mt-2 max-w-[60ch] text-small text-text-secondary">
          Isi apa adanya. Angka ini tidak dikirim ke siapa pun, dan tidak ada
          jawaban yang memalukan.
        </p>

        {/* Isian di kiri, hasil di kanan dan menempel saat digulir — supaya
            angka berubah di depan mata sambil pengguna mengetik. */}
        <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-start lg:gap-12">
        {/* ── Masukan ──────────────────────────────────────────────── */}
        <section className="flex flex-col gap-5">
          <NumberField
            label="Harga jual per porsi"
            prefix="Rp"
            value={price}
            onChange={setPrice}
          />

          <div className="flex flex-col gap-3">
            <p className="overline">Biaya bahan</p>
            <div className="flex gap-2" role="group" aria-label="Cara mengisi biaya bahan">
              <ModeButton
                active={cogsMode === "per-masak"}
                onClick={() => setCogsMode("per-masak")}
              >
                Per sekali masak
              </ModeButton>
              <ModeButton
                active={cogsMode === "per-porsi"}
                onClick={() => setCogsMode("per-porsi")}
              >
                Sudah tahu per porsi
              </ModeButton>
            </div>

            {cogsMode === "per-masak" ? (
              <div className="flex flex-col gap-4 rounded-[var(--radius-panel)] border border-border bg-surface p-4">
                <p className="text-caption text-text-secondary">
                  Tidak apa-apa kalau belum pernah menghitung per porsi. Isi
                  belanja sekali masak, nanti kami yang membagi.
                </p>
                <NumberField
                  label="Sekali masak habis berapa"
                  prefix="Rp"
                  value={batchCost}
                  onChange={setBatchCost}
                />
                <NumberField
                  label="Jadi berapa porsi"
                  suffix="porsi"
                  value={batchUnits}
                  onChange={setBatchUnits}
                />
                {cogs !== null ? (
                  <p className="text-small">
                    Biaya bahan per porsi:{" "}
                    <strong className="font-mono">{formatRupiah(cogs)}</strong>
                  </p>
                ) : null}
              </div>
            ) : (
              <NumberField
                label="Biaya bahan per porsi"
                prefix="Rp"
                value={cogsDirect}
                onChange={setCogsDirect}
              />
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <NumberField
              label="Porsi terjual per hari"
              suffix="porsi"
              value={qtyPerDay}
              onChange={setQtyPerDay}
            />
            <NumberField
              label="Hari buka per bulan"
              suffix="hari"
              value={operatingDays}
              onChange={setOperatingDays}
              max={31}
            />
          </div>

          <NumberField
            label="Biaya tetap per bulan"
            hint="Sewa, listrik, gas, air — di luar biaya bahan. Gaji Anda sendiri belum dihitung di sini."
            prefix="Rp"
            value={fixedCost}
            onChange={setFixedCost}
          />

          <div className="rounded-[var(--radius-panel)] border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={usesPlatform}
                onChange={(e) => setUsesPlatform(e.target.checked)}
                className="size-5 accent-primary"
              />
              <span className="text-small">
                Saya juga berjualan lewat aplikasi pesan antar
              </span>
            </label>
            {usesPlatform ? (
              <div className="mt-4">
                <NumberField
                  label="Potongan aplikasi"
                  hint="Biasanya tertulis di perjanjian mitra. Kalau tidak yakin, 20% adalah angka yang umum."
                  suffix="%"
                  value={platformFee}
                  onChange={setPlatformFee}
                  max={100}
                />
              </div>
            ) : null}
          </div>
        </section>

        {/* ── Hasil ────────────────────────────────────────────────── */}
        {result && input ? (
          <section className="mt-10 lg:sticky lg:top-10 lg:mt-0">
            <div
              className={`overflow-hidden rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-lift)] md:p-7 ${
                result.losesMoneyPerUnit
                  ? "bg-gradient-to-br from-[#E8554E] to-[#B91C1C] text-white"
                  : "bg-gradient-to-br from-[#5B5BF0] to-[#4338CA] text-white"
              }`}
            >
              <p className="overline text-white/70">Untung Anda per porsi</p>
              <p className="mt-1 font-mono text-[length:var(--text-headline)] leading-none">
                {formatRupiah(result.profitPerUnit)}
              </p>
              <p className="mt-3 text-small text-white/80">
                bukan {formatRupiah(input.price)}.
                {result.marginPercent !== null
                  ? ` Dari tiap Rp 100 yang masuk, Rp ${Math.round(result.marginPercent)} jadi milik Anda.`
                  : ""}
              </p>
            </div>

            <dl className="mt-5 flex flex-col" data-tabular>
              <Row
                label="Untung bersih per bulan"
                value={formatRupiah(result.netMonthly)}
                alert={result.losesMoneyMonthly}
              />
              <Row
                label="Balik modal butuh"
                value={
                  result.breakEvenPerDay === null
                    ? "tidak tercapai"
                    : `${result.breakEvenPerDay} porsi/hari`
                }
                alert={result.breakEvenPerDay === null}
              />
              <Row
                label="Sekarang Anda jual"
                value={`${input.qtyPerDay} porsi/hari`}
              />
            </dl>

            {result.losesMoneyPerUnit ? (
              <p className="mt-4 rounded-[var(--radius-panel)] bg-loss-tint px-4 py-3 text-small text-error">
                Setiap porsi yang terjual justru menambah kerugian. Yang perlu
                dibenahi lebih dahulu adalah harga jual atau biaya bahan, bukan
                jumlah pembeli.
              </p>
            ) : null}

            {/* ── Perbandingan jalur aplikasi ─────────────────────── */}
            {result.viaPlatform ? (
              <div className="card mt-6 p-5">
                <p className="overline">Kalau dijual lewat aplikasi</p>
                <p className="mt-2 text-small text-text-secondary">
                  Potongan aplikasi{" "}
                  <strong className="font-mono">
                    {formatRupiah(result.viaPlatform.feePerUnit)}
                  </strong>{" "}
                  per porsi.
                </p>
                <dl className="mt-3 flex flex-col" data-tabular>
                  <Row
                    label="Untung per porsi"
                    value={formatRupiah(result.viaPlatform.profitPerUnit)}
                    alert={result.viaPlatform.losesMoneyPerUnit}
                  />
                  <Row
                    label="Balik modal butuh"
                    value={
                      result.viaPlatform.breakEvenPerDay === null
                        ? "tidak tercapai"
                        : `${result.viaPlatform.breakEvenPerDay} porsi/hari`
                    }
                    alert={result.viaPlatform.breakEvenPerDay === null}
                  />
                  <Row
                    label="Untung bersih per bulan"
                    value={formatRupiah(result.viaPlatform.netMonthly)}
                    alert={result.viaPlatform.netMonthly < 0}
                  />
                </dl>
                <p className="mt-3 max-w-[58ch] text-caption text-text-secondary">
                  Angka ini berlaku bila seluruh penjualan lewat aplikasi.
                  Pesanan yang terlihat ramai di aplikasi belum tentu berarti
                  untung bertambah.
                </p>
              </div>
            ) : null}

            {/* ── Pengandaian kenaikan harga ──────────────────────── */}
            <div className="card mt-6 p-5">
              <label htmlFor="naik" className="overline">
                Andai harga dinaikkan
              </label>
              <input
                id="naik"
                type="range"
                min={0}
                max={5000}
                step={500}
                value={priceIncrease}
                onChange={(e) => setPriceIncrease(Number(e.target.value))}
                className="mt-3 w-full accent-primary"
              />
              <p className="mt-1 font-mono text-small">
                + {formatRupiah(priceIncrease)} per porsi
              </p>
              {simulated ? (
                <div className="mt-4 rounded-[var(--radius-panel)] bg-bottleneck-tint px-4 py-3">
                  <p className="text-small">Untung bersih jadi</p>
                  <p className="font-mono text-[length:var(--text-subhead)]">
                    {formatRupiah(simulated.netMonthly)} / bulan
                  </p>
                  <p className="mt-1 text-caption text-text-secondary">
                    tanpa menambah satu pembeli pun.
                  </p>
                </div>
              ) : null}
            </div>

            {/* ── Target penghasilan ──────────────────────────────── */}
            <div className="mt-6 border-t border-border pt-6">
              <h2 className="text-[0.9375rem]">Berapa yang ingin Anda bawa pulang?</h2>
              <div className="mt-4">
                <NumberField
                  label="Target penghasilan per bulan"
                  prefix="Rp"
                  value={targetIncome}
                  onChange={setTargetIncome}
                />
              </div>

              {target ? (
                <div className="card mt-4 p-5">
                  {target.requiredQtyPerDay === null ? (
                    <p className="text-small text-error">
                      Dengan untung per porsi seperti sekarang, target ini tidak
                      tercapai berapa pun jumlah yang Anda jual. Yang perlu
                      dibenahi adalah harganya, bukan jumlahnya.
                    </p>
                  ) : target.alreadyReached ? (
                    <p className="text-small">
                      Target ini sudah terlampaui dengan penjualan Anda sekarang.
                    </p>
                  ) : (
                    <>
                      <p className="font-mono text-[length:var(--text-subhead)]">
                        {target.requiredQtyPerDay} porsi/hari
                      </p>
                      <p className="mt-1 text-small text-text-secondary">
                        Sekarang {input.qtyPerDay} porsi. Kurang{" "}
                        {target.gapPerDay} porsi setiap hari.
                      </p>
                      {target.requiredQtyPerDay > input.qtyPerDay * 2 ? (
                        <p className="mt-3 text-small text-error">
                          Ini lebih dari dua kali lipat penjualan Anda sekarang.
                          Menaikkan harga sedikit biasanya lebih mudah daripada
                          melipatgandakan jumlah pembeli — coba geser pengandaian
                          harga di atas.
                        </p>
                      ) : null}
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </section>
        ) : (
          <p className="mt-10 rounded-[var(--radius-panel)] border border-dashed border-border px-4 py-5 text-small text-text-secondary lg:sticky lg:top-10 lg:mt-0">
            Hasilnya muncul begitu harga jual, biaya bahan, jumlah porsi, dan
            biaya tetap terisi.
          </p>
        )}
        </div>
      </div>
    </AppShell>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-10 flex-1 rounded-[var(--radius-control)] border px-3 text-small transition-colors ${
        active
          ? "border-primary bg-primary/8 font-medium text-text-primary"
          : "border-border bg-surface text-text-secondary hover:border-neutral"
      }`}
    >
      {children}
    </button>
  );
}

function Row({
  label,
  value,
  alert,
}: {
  label: string;
  value: string;
  alert?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-2.5 last:border-b-0">
      <dt className="text-small text-text-secondary">{label}</dt>
      <dd className={`font-mono text-small ${alert ? "text-error" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
