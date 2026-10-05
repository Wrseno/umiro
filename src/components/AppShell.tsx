"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SHARED } from "@/content";
import { DiagnosisCta } from "@/components/DiagnosisCta";

/**
 * Kerangka aplikasi UMIRO.
 *
 * Menu bar: 3 item statis (Beranda, Kalkulator, Roadmap).
 * Survei/Diagnosis via button pojok dinamis `DiagnosisCta`.
 */

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-30 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-small focus:font-medium"
      >
        {SHARED.skipToContent}
      </a>
      <IslandNav pathname={pathname} />
      <main
        id="konten"
        tabIndex={-1}
        className="flex-1 scroll-mt-24 pb-6 outline-none md:pb-0"
      >
        {children}
      </main>
      <SiteFooter pathname={pathname} />
    </div>
  );
}

function IslandNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className="sticky top-4 z-40 mx-auto w-[calc(100%-2rem)] max-w-[1240px]">
      <div className="relative z-50 flex h-14 items-center gap-2 rounded-full bg-surface/80 py-2 pr-2 pl-3 shadow-[var(--shadow-ambient)] ring-1 ring-black/5 backdrop-blur-2xl sm:pl-4">
        <SiteBrand />
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <nav
            aria-label={NAV.navMainLabel}
            className="ml-4 hidden items-center gap-1 md:flex"
          >
            {NAV.links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`transition-fluid rounded-full px-4 py-2 text-small font-medium tracking-[0.01em] ${
                    active
                      ? "bg-text-primary text-white"
                      : "text-text-secondary hover:bg-black/5 hover:text-text-primary"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <DiagnosisCta pathname={pathname} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? NAV.menuClose : NAV.menuOpen}
            className="transition-fluid grid size-11 shrink-0 place-items-center rounded-full text-text-primary hover:bg-black/5 active:scale-[0.98] md:hidden"
          >
            <span aria-hidden className="relative block size-4">
              <span
                className={`transition-fluid absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-current ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`transition-fluid absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-current ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="menu-mobile"
          className="fixed inset-0 z-40 bg-white/85 backdrop-blur-3xl md:hidden"
        >
          <nav
            aria-label={NAV.navMobileLabel}
            className="mx-auto flex h-full min-h-[100dvh] w-full max-w-[1240px] flex-col gap-1 overflow-y-auto px-8 pt-24 pb-10"
          >
            {NAV.links.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname === href ? "page" : undefined}
                style={{ "--index": i } as React.CSSProperties}
                className={`reveal font-display text-4xl leading-[1.15] font-bold tracking-[-0.01em] sm:text-5xl ${
                  pathname === href
                    ? "text-text-primary"
                    : "text-text-secondary"
                }`}
              >
                {label}
              </Link>
            ))}
            <p className="mt-6 max-w-[40ch] text-small leading-[1.7] text-text-secondary">
              {NAV.menuNote}
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function SiteBrand() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5"
      aria-label={NAV.brand}
    >
      <span
        aria-hidden
        className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-white"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <path d="M3 15.5a1 1 0 0 1 .3-.7l4.4-4.4a1 1 0 0 1 1.4 0l2.1 2.1 4.1-4.1h-1.8a1 1 0 1 1 0-2h4.2a1 1 0 0 1 1 1v4.2a1 1 0 1 1-2 0V9.8l-4.8 4.8a1 1 0 0 1-1.4 0L8.4 12.5l-3.7 3.7A1 1 0 0 1 3 15.5Z" />
        </svg>
      </span>
      <span className="block font-display text-[1.0625rem] font-bold tracking-[-0.01em]">
        {NAV.brand}
      </span>
    </Link>
  );
}

function SiteFooter({ pathname }: { pathname: string }) {
  return (
    <footer className="border-t border-black/5 bg-surface">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-10 px-4 py-12 sm:px-5 md:grid-cols-[1.4fr_1fr_1.2fr] md:px-8">
        <div>
          <p className="font-display text-[1.0625rem] font-bold tracking-[-0.01em]">
            {NAV.brand}
          </p>
          <p className="mt-3 max-w-[46ch] text-small leading-[1.7] text-text-secondary">
            {NAV.footerDescription}
          </p>
        </div>
        <nav aria-label={NAV.navFooterLabel}>
          <p className="overline">{NAV.footerPagesHeading}</p>
          <ul className="mt-3 flex flex-col gap-2 text-small">
            {NAV.links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className="font-medium tracking-[0.01em] text-text-secondary transition-fluid hover:text-text-primary"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="overline">{NAV.footerLimitationsHeading}</p>
          <ul className="mt-3 flex flex-col gap-2 text-small leading-[1.7] text-text-secondary">
            {NAV.footerLimitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-caption leading-[1.6] text-text-secondary">
            {NAV.footerGratis}
          </p>
        </div>
      </div>
      <div className="border-t border-black/5">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-1 px-4 py-4 text-caption leading-[1.6] text-text-secondary sm:flex-row sm:items-center sm:justify-between sm:px-5 md:px-8">
          <p>
            {NAV.brand} · {NAV.brandSub}
          </p>
          <p className="flex gap-4">
            {NAV.legal.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="transition-fluid hover:text-text-primary"
              >
                {label}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
