import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { SYARAT as T, SHARED } from "@/content";

export default function SyaratPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
        <p className="overline">{T.eyebrow}</p>
        <h1 className="mt-3 max-w-[22ch] text-[length:var(--text-section)]">
          {T.title}
        </h1>
        <p className="mt-4 max-w-[62ch] text-text-secondary">{T.body}</p>
        <ul className="mt-6 flex max-w-[62ch] flex-col gap-3 text-small text-text-secondary">
          {T.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center rounded-[var(--radius-control)] border border-border bg-surface px-5 text-small font-medium transition-fluid hover:bg-background active:scale-[0.98]"
        >
          {SHARED.backToHomeArrow}
        </Link>
      </div>
    </AppShell>
  );
}
