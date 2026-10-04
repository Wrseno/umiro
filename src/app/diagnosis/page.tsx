import { ComingSoon } from "@/components/ComingSoon";
import { PLACEHOLDERS } from "@/content";

/** Halaman Diagnosis — isi menyusul. */
export default function DiagnosisPage() {
  return (
    <ComingSoon
      eyebrow={PLACEHOLDERS.diagnosis.eyebrow}
      title={PLACEHOLDERS.diagnosis.title}
    />
  );
}
