"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { KALKULATOR as T } from "@/content";
import {
  EMPTY_FORM,
  calc,
  hargaSetelahPotongan,
  validateForm,
  type CalcForm,
  type CalcInput,
  type CalcResult,
  type FormField,
  type Kanal,
  type ModeBiaya,
} from "@/lib/calculator";
import { clearCalc, loadCalc, saveCalc, type LoadResult } from "@/lib/calc-storage";
import { formatAngka, formatRupiah } from "@/lib/format";

const noopSubscribe = () => () => {};

/**
 * Pembungkus hidrasi: server dan render pertama klien memakai form kosong;
 * setelah hidrasi, form di-mount ulang dengan isian tersimpan (ADR-003).
 */
export function Calculator() {
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const loaded: LoadResult = hydrated ? loadCalc() : { status: "kosong" };
  return <CalculatorForm key={hydrated ? "klien" : "server"} loaded={loaded} />;
}

interface Valid {
  input: CalcInput;
  potongan: number | null;
}

type SaveStatus = "idle" | "tersimpan" | "gagal";

function CalculatorForm({ loaded }: { loaded: LoadResult }) {
  const initial = loaded.status === "ok" ? loaded.form : EMPTY_FORM;
  const [form, setForm] = useState<CalcForm>(initial);
  const [lastValid, setLastValid] = useState<Valid | null>(() => {
    const v = validateForm(initial);
    return v.input ? { input: v.input, potongan: v.potongan } : null;
  });
  const [touched, setTouched] = useState<Partial<Record<FormField, true>>>({});
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(
    loaded.status === "ok" ? "tersimpan" : "idle",
  );
  const [showContoh, setShowContoh] = useState(true);

  const validated = validateForm(form);
  const stale = validated.input === null && lastValid !== null;

  function update(next: CalcForm) {
    setForm(next);
    const v = validateForm(next);
    if (v.input) {
      setLastValid({ input: v.input, potongan: v.potongan });
      setSaveStatus(saveCalc(next) ? "tersimpan" : "gagal");
    }
  }

  function setField(field: FormField, value: string) {
    update({ ...form, [field]: value });
  }

  function reset() {
    clearCalc();
    setForm(EMPTY_FORM);
    setLastValid(null);
    setTouched({});
    setSaveStatus("idle");
  }

  const fieldError = (field: FormField) => {
    const code = validated.errors[field];
    if (!code) return undefined;
    // "Wajib" baru tampil setelah kolom ditinggalkan, agar form kosong tidak penuh merah.
    if (code === "wajib" && !touched[field]) return undefined;
    return T.errors[code];
  };

  const input = (field: FormField) => (
    <NumberField
      field={field}
      value={form[field]}
      error={fieldError(field)}
      onChange={(v) => setField(field, v)}
      onBlur={() => setTouched((t) => ({ ...t, [field]: true }))}
    />
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
      <div className="flex min-w-0 flex-col gap-6">
        {loaded.status === "rusak" ? (
          <p role="status" className="rounded-[var(--radius-panel)] border border-bottleneck-border bg-surface px-4 py-3 text-small text-bottleneck">
            {T.simpan.rusak}
          </p>
        ) : null}

        <ContohPanel open={showContoh} onToggle={() => setShowContoh((v) => !v)} />

        <form
          className="card flex flex-col gap-8 p-5 sm:p-7"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <FormSection title={T.sections.jual}>
            {input("harga")}
            {input("volume")}
            {input("hari")}
          </FormSection>

          <FormSection title={T.sections.biaya}>
            <Segmented<ModeBiaya>
              legend={T.modeBiaya.legend}
              name="modeBiaya"
              value={form.modeBiaya}
              options={[
                ["unit", T.modeBiaya.unit],
                ["batch", T.modeBiaya.batch],
              ]}
              onChange={(modeBiaya) => update({ ...form, modeBiaya })}
            />
            {form.modeBiaya === "unit" ? (
              input("biayaUnit")
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {input("biayaBatch")}
                {input("unitBatch")}
              </div>
            )}
            {input("biayaTetap")}
          </FormSection>

          <FormSection title={T.sections.kanal}>
            <Segmented<Kanal>
              legend={T.kanal.legend}
              name="kanal"
              value={form.kanal}
              options={[
                ["langsung", T.kanal.langsung],
                ["platform", T.kanal.platform],
              ]}
              onChange={(kanal) => update({ ...form, kanal })}
            />
            {form.kanal === "platform" ? (
              <>
                {input("potongan")}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="potongan-slider" className="text-caption text-text-secondary">
                    {T.banding.slider}
                  </label>
                  <input
                    id="potongan-slider"
                    type="range"
                    min={0}
                    max={40}
                    step={1}
                    value={Math.min(40, Number(form.potongan.replace(",", ".")) || 0)}
                    onChange={(e) => setField("potongan", e.target.value)}
                    className="w-full accent-[var(--color-primary)]"
                  />
                  <div className="flex justify-between font-mono text-caption text-text-secondary" aria-hidden>
                    <span>0%</span>
                    <span>20%</span>
                    <span>40%</span>
                  </div>
                </div>
              </>
            ) : null}
          </FormSection>

          <FormSection title={T.sections.target}>{input("target")}</FormSection>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-5">
            <p className="text-caption text-text-secondary" role="status">
              {saveStatus === "tersimpan" ? T.simpan.tersimpan : null}
              {saveStatus === "gagal" ? T.simpan.gagal : null}
            </p>
            <button
              type="button"
              onClick={reset}
              className="transition-fluid inline-flex h-11 items-center rounded-[var(--radius-control)] border border-border bg-surface px-5 text-small font-medium hover:bg-background active:scale-[0.98]"
            >
              {T.simpan.reset}
            </button>
          </div>
        </form>

        <Istilah />
      </div>

      <div className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-24">
        <ResultPanel valid={lastValid} stale={stale} />
        {lastValid && form.kanal === "platform" ? (
          <Banding valid={lastValid} />
        ) : null}
        <Batasan />
      </div>
    </div>
  );
}

// ── Bagian form ───────────────────────────────────────────────

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-5">
      <legend className="overline mb-4">{title}</legend>
      {children}
    </fieldset>
  );
}

function NumberField({
  field,
  value,
  error,
  onChange,
  onBlur,
}: {
  field: FormField;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const id = useId();
  const meta = T.fields[field];
  const hintId = `${id}-hint`;
  const errId = `${id}-err`;
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-medium">
        {meta.label}
      </label>
      <div
        className={`transition-fluid flex h-12 items-center rounded-[var(--radius-control)] border bg-surface focus-within:shadow-[var(--shadow-focus-ring)] ${
          error ? "border-error" : "border-border focus-within:border-primary"
        }`}
      >
        <input
          id={id}
          name={field}
          inputMode={field === "potongan" ? "decimal" : "numeric"}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${errId} ${hintId}` : hintId}
          data-tabular
          className="h-full min-w-0 flex-1 bg-transparent px-3.5 font-mono text-[0.9375rem] outline-none [&:focus-visible]:outline-none"
        />
        <span aria-hidden className="pr-3.5 font-mono text-caption text-text-secondary">
          {meta.suffix}
        </span>
      </div>
      {error ? (
        <p id={errId} className="text-caption font-medium text-error">
          {error}
        </p>
      ) : null}
      <p id={hintId} className="text-caption text-text-secondary">
        {meta.hint}
      </p>
    </div>
  );
}

function Segmented<V extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: V;
  options: [V, string][];
  onChange: (v: V) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-small font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(([v, label]) => (
          <label
            key={v}
            className={`transition-fluid cursor-pointer rounded-full px-4 py-2 text-small font-medium ring-1 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary ${
              value === v
                ? "bg-text-primary text-white ring-text-primary"
                : "bg-surface text-text-secondary ring-border hover:text-text-primary"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={v}
              checked={value === v}
              onChange={() => onChange(v)}
              className="sr-only"
            />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ContohPanel({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  if (!open) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="self-start text-small font-medium text-primary underline-offset-4 hover:underline"
      >
        {T.contoh.open}
      </button>
    );
  }
  return (
    <aside className="rounded-[var(--radius-card)] border border-dashed border-border bg-surface/60 p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="overline">{T.contoh.title}</p>
        <button
          type="button"
          onClick={onToggle}
          className="text-small font-medium text-primary underline-offset-4 hover:underline"
        >
          {T.contoh.close}
        </button>
      </div>
      <p className="mt-2 max-w-[62ch] text-small text-text-secondary">{T.contoh.body}</p>
      <p className="mt-2 text-caption text-text-secondary italic">{T.contoh.note}</p>
    </aside>
  );
}

function Istilah() {
  return (
    <section aria-labelledby="istilah-title" className="flex flex-col gap-3">
      <h2 id="istilah-title" className="overline">
        {T.istilah.title}
      </h2>
      <div className="flex flex-col divide-y divide-black/5 border-y border-black/5">
        {T.istilah.items.map(({ term, body }) => (
          <details key={term} className="group py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-small font-semibold">
              {term}
              <span aria-hidden className="transition-fluid text-text-secondary group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 max-w-[62ch] text-small text-text-secondary">{body}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ── Hasil ─────────────────────────────────────────────────────

function targetText(r: CalcResult): { value: string | null; note: string | null } {
  switch (r.target.kind) {
    case "kosong":
      return { value: null, note: null };
    case "tercapai":
      return { value: null, note: T.hasil.targetTercapai };
    case "tidak-valid":
      return { value: null, note: T.hasil.targetTidakValid };
    case "unit":
      return {
        value: `${formatAngka(r.target.perHari)} ${T.hasil.unitPerHari}`,
        note: r.target.tambahan > 0 ? T.hasil.targetTambahan(r.target.tambahan) : null,
      };
  }
}

function ResultPanel({ valid, stale }: { valid: Valid | null; stale: boolean }) {
  if (!valid) {
    return (
      <section aria-live="polite" className="card p-6">
        <h2 className="overline">{T.hasil.title}</h2>
        <p className="mt-3 text-small text-text-secondary">{T.hasil.kosong}</p>
      </section>
    );
  }
  const r = calc(valid.input);
  const tgt = targetText(r);
  const persen = Math.round((r.M / valid.input.H) * 100);
  return (
    <div aria-live="polite" className="flex flex-col gap-4">
      <section className="card p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="overline">{T.hasil.margin}</h2>
          <span
            className={`rounded-full px-2.5 py-0.5 font-mono text-caption font-medium ${
              r.marginNonPositif ? "bg-error/10 text-error" : "bg-primary/10 text-primary"
            }`}
            data-tabular
          >
            {T.hasil.marginPersen(persen)}
          </span>
        </div>
        <p data-tabular className="mt-3 font-mono text-[2.5rem] leading-none font-medium tracking-tight">
          {formatRupiah(r.M)}
          <span className="ml-1.5 font-sans text-small font-normal text-text-secondary">{T.hasil.perUnit}</span>
        </p>
        <p className="mt-3 text-small text-text-secondary">
          {T.hasil.marginSub(formatRupiah(valid.input.H), formatRupiah(r.M))}
        </p>

        {stale ? (
          <p className="mt-4 rounded-[var(--radius-panel)] border border-bottleneck-border px-3 py-2 text-caption text-bottleneck">
            {T.hasil.usang}
          </p>
        ) : null}

        <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Tile
            label={T.hasil.impas}
            value={r.impas !== null ? `${formatAngka(r.impas)} ${T.hasil.unitPerHari}` : T.hasil.tidakDihitung}
            note={T.hasil.impasNote}
          />
          <Tile
            label={T.hasil.laba}
            value={formatRupiah(r.laba)}
            note={r.laba < 0 ? T.hasil.labaNegatif : T.hasil.labaNote}
            tone={r.laba < 0 ? "negatif" : "positif"}
          />
        </dl>

        {r.marginNonPositif ? (
          <p className="mt-4 rounded-[var(--radius-panel)] bg-error/5 px-3 py-2.5 text-small leading-[1.65] text-error">
            {T.hasil.marginNonPositif}
          </p>
        ) : null}
      </section>

      {r.target.kind !== "kosong" ? (
        <section className="card p-6">
          <h2 className="overline">{T.hasil.target}</h2>
          {tgt.value ? (
            <p data-tabular className="mt-3 font-mono text-[1.75rem] leading-none font-medium">
              {tgt.value}
            </p>
          ) : null}
          {tgt.note ? <p className="mt-3 text-small text-text-secondary">{tgt.note}</p> : null}
        </section>
      ) : null}
    </div>
  );
}

function Tile({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone?: "positif" | "negatif";
}) {
  return (
    <div className="rounded-[var(--radius-panel)] border border-border bg-background/60 p-4">
      <dt className="text-caption text-text-secondary">{label}</dt>
      <dd
        data-tabular
        className={`mt-1 font-mono text-[1.25rem] font-medium ${
          tone === "negatif" ? "text-error" : tone === "positif" ? "text-primary" : ""
        }`}
      >
        {value}
      </dd>
      <dd className="mt-1 text-caption text-text-secondary">{note}</dd>
    </div>
  );
}

function Banding({ valid }: { valid: Valid }) {
  if (valid.potongan === null) {
    return (
      <section className="card p-6">
        <h2 className="overline">{T.banding.title}</h2>
        <p className="mt-3 text-small text-text-secondary">{T.banding.isiPotongan}</p>
      </section>
    );
  }
  const direct = calc(valid.input);
  const hargaPlatform = hargaSetelahPotongan(valid.input.H, valid.potongan);
  const platform = calc({ ...valid.input, H: hargaPlatform });
  const impas = (r: CalcResult) =>
    r.impas === null ? T.hasil.tidakDihitung : `${formatAngka(r.impas)} ${T.hasil.unitPerHari}`;
  const rows: [string, string, string][] = [
    [T.banding.hargaDiterima, formatRupiah(valid.input.H), formatRupiah(hargaPlatform)],
    [T.hasil.margin, formatRupiah(direct.M), formatRupiah(platform.M)],
    [T.hasil.laba, formatRupiah(direct.laba), formatRupiah(platform.laba)],
    [T.hasil.impas, impas(direct), impas(platform)],
  ];
  return (
    <section className="card p-6">
      <h2 className="overline">{T.banding.title}</h2>
      <p className="mt-2 text-small text-text-secondary">{T.banding.intro}</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-small">
          <thead>
            <tr className="text-left text-caption text-text-secondary">
              <th className="py-2 pr-3 font-medium" />
              <th className="py-2 pr-3 text-right font-medium">{T.banding.langsung}</th>
              <th className="py-2 text-right font-medium">{T.banding.platform}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {rows.map(([label, a, b]) => (
              <tr key={label}>
                <th scope="row" className="py-2.5 pr-3 text-left font-normal text-text-secondary">
                  {label}
                </th>
                <td className="py-2.5 pr-3 text-right font-mono whitespace-nowrap">{a}</td>
                <td className="py-2.5 text-right font-mono whitespace-nowrap">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {platform.marginNonPositif ? (
        <p className="mt-4 rounded-[var(--radius-panel)] border border-bottleneck-border px-3 py-2.5 text-small text-bottleneck">
          {T.banding.marginPlatformNonPositif}
        </p>
      ) : null}
    </section>
  );
}

function Batasan() {
  return (
    <section className="rounded-[var(--radius-card)] border border-border p-5">
      <h2 className="overline">{T.batasan.title}</h2>
      <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-4 text-small text-text-secondary">
        {T.batasan.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
