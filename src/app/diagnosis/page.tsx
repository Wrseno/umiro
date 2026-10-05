import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { DIAGNOSIS as T } from "@/content";
import { Diagnosis } from "./Diagnosis";

export const metadata: Metadata = {
  title: T.meta.title,
  description: T.meta.description,
};

/** Diagnosis — unit 003 (US-04, US-08). */
export default function DiagnosisPage() {
  return (
    <AppShell>
      <div className="pt-6">
        <Diagnosis />
      </div>
    </AppShell>
  );
}
