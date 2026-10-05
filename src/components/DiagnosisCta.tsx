"use client";

import { useEffect, useState, useMemo } from "react";
import { NAV } from "@/content";
import { hasValidResult } from "@/lib/diagnosis-status";

export function useDiagnosisTarget(pathname?: string) {
  const initialReady = useMemo(() => hasValidResult(), []);
  const [ready, setReady] = useState(initialReady);

  useEffect(() => {
    const onStorage = () => setReady(hasValidResult());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [pathname]);

  return ready
    ? { href: NAV.diagnosisCta.readyHref, label: NAV.diagnosisCta.readyLabel }
    : { href: NAV.diagnosisCta.emptyHref, label: NAV.diagnosisCta.emptyLabel };
}

export function DiagnosisCta({ pathname }: { pathname: string }) {
  const target = useDiagnosisTarget(pathname);
  const shortLabel = target.href === "/diagnosis" ? "Diagnosis" : "Survei";

  return (
    <a
      href={target.href}
      aria-current={pathname === target.href ? "page" : undefined}
      className="group transition-fluid flex h-11 shrink-0 items-center gap-2 rounded-full bg-text-primary py-1 pr-1 pl-4 text-small font-semibold tracking-[0.01em] whitespace-nowrap text-white hover:shadow-[var(--shadow-ambient)] active:scale-[0.98] sm:pl-5"
    >
      <span className="sm:hidden">{shortLabel}</span>
      <span className="hidden sm:inline">{target.label}</span>
      <span
        aria-hidden
        className="transition-fluid grid size-8 shrink-0 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          className="size-3.5"
        >
          <path
            d="M3 13 13 3M5 3h8v8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

export function DiagnosisLink({
  className,
  icon,
}: {
  className?: string;
  icon?: React.ReactNode;
}) {
  const target = useDiagnosisTarget();
  return (
    <a href={target.href} className={className}>
      {target.label}
      {icon}
    </a>
  );
}
