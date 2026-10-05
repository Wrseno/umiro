import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { DiagnosisLink } from "@/components/DiagnosisCta";
import { NOT_FOUND as T, SHARED } from "@/content";

/** 404 bermerek — tiap alur butuh jalan kembali (US-06). */
export default function NotFound() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-20">
        <p className="overline">{T.eyebrow}</p>
        <h1 className="mt-3 max-w-[22ch] text-[length:var(--text-section)]">
          {T.title}
        </h1>
        <p className="mt-4 max-w-[60ch] text-text-secondary">{T.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-[var(--radius-control)] bg-text-primary px-7 font-medium text-white transition-fluid hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
          >
            {SHARED.backToHome}
          </Link>
          <DiagnosisLink
            className="inline-flex h-12 items-center rounded-[var(--radius-control)] border border-border bg-surface px-7 font-medium transition-fluid hover:bg-background active:scale-[0.98]"
          />
        </div>
      </div>
    </AppShell>
  );
}
