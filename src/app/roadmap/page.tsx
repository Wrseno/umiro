import { ComingSoon } from "@/components/ComingSoon";
import { PLACEHOLDERS } from "@/content";

/** Halaman Roadmap — isi menyusul. */
export default function RoadmapPage() {
  return (
    <ComingSoon
      eyebrow={PLACEHOLDERS.roadmap.eyebrow}
      title={PLACEHOLDERS.roadmap.title}
    />
  );
}
