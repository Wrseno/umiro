import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { SURVEY as T } from "@/content";
import { Survey } from "./Survey";

export const metadata: Metadata = {
  title: T.meta.title,
  description: T.meta.description,
};

/** Survey — unit 002 (US-02, US-03). */
export default function SurveyPage() {
  return (
    <AppShell>
      <div className="w-full px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <Survey />
      </div>
    </AppShell>
  );
}
