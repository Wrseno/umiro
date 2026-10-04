import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { SHARED } from "@/content";

interface ComingSoonProps {
  eyebrow: string;
  title: string;
}

/**
 * Halaman MVP yang isinya belum dibuat.
 *
 * Isi rata kiri dan vertikal-tengah — menempati ruang viewport agar tidak
 * terlihat menggantung di atas.
 */
export function ComingSoon({ eyebrow, title }: ComingSoonProps) {
  return (
    <AppShell>
      <div className="mx-auto flex min-h-[62dvh] w-full max-w-[1240px] flex-col justify-center px-5 py-16 md:px-8">
        <p className="overline">{eyebrow}</p>
        <h1 className="mt-3 max-w-[22ch] text-[length:var(--text-section)]">
          {title}
        </h1>
        <p className="mt-4 max-w-[60ch] text-text-secondary">
          {SHARED.comingSoonBody}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-[var(--radius-control)] bg-text-primary px-7 font-medium text-white transition-fluid hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
          >
            {SHARED.backToHome}
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
