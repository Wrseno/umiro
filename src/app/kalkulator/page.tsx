import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { KALKULATOR as T } from "@/content";
import { Calculator } from "./Calculator";

export const metadata: Metadata = {
  title: T.meta.title,
  description: T.meta.description,
};

/** Kalkulator keuangan — unit 004 (US-05, US-09, US-10). */
export default function KalkulatorPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1240px] px-4 py-12 sm:px-5 md:px-8 md:py-16">
        <header className="mb-10 max-w-[64ch]">
          <p className="eyebrow">{T.eyebrow}</p>
          <h1 className="mt-5 text-[length:var(--text-section)]">{T.title}</h1>
          <p className="mt-3 text-text-secondary">{T.intro}</p>
        </header>
        <Calculator />
      </div>
    </AppShell>
  );
}
