import { LEVER_LABELS, costLabel, timeLabel } from "@/lib/copy";
import type {
  PhaseState,
  Roadmap,
  RoadmapNode,
  RoadmapPhase,
  RoadmapTip,
  TipKind,
} from "@/lib/roadmap";
import type { Lever } from "@/lib/types";

/**
 * Peta jalan sebagai peta bercabang — US-05.
 *
 * Bentuknya satu tulang punggung menurun dengan empat cabang fase. Pohon
 * yang melebar ke kanan, seperti peta pikiran pada papan tulis, tidak bisa
 * dibaca di layar 360px tanpa menggeser dua arah; tulang punggung menurun
 * memberi hubungan induk-anak yang sama sambil tetap mengalir satu arah.
 *
 * Tiga tingkat kedalamannya: fase sebagai cabang, langkah sebagai simpul,
 * tips sebagai daun. Langkah pelaksanaan disembunyikan di balik `details`
 * supaya satu fase bisa dibaca utuh tanpa menggeser layar, dan supaya
 * membukanya tidak memerlukan skrip.
 */

const LEVER_TILE: Record<Lever, string> = {
  margin: "bg-[#E0E0FF] text-[#4338CA]",
  retensi: "bg-[#D8F5E3] text-[#047857]",
  jangkauan: "bg-[#FFE6CC] text-[#B45309]",
  kapasitas: "bg-[#FFE0E0] text-[#B91C1C]",
};

/**
 * Klasifikasi tips dibedakan warna dan label, bukan hanya warna, karena
 * perbedaan warna saja tidak terbaca oleh sebagian pengguna.
 */
const TIP_STYLE: Record<TipKind, { label: string; className: string }> = {
  prinsip: {
    label: "Sebabnya",
    className: "border-primary/25 bg-primary/8 text-[#3730A3]",
  },
  trik: {
    label: "Caranya",
    className: "border-success/30 bg-success-tint text-[#065F46]",
  },
  peringatan: {
    label: "Hati-hati",
    className: "border-bottleneck-border bg-bottleneck-tint text-[#8a6d1f]",
  },
};

const PHASE_BADGE: Record<PhaseState, { label: string; className: string }> = {
  selesai: {
    label: "sudah dilewati",
    className: "border-success/30 bg-success-tint text-[#065F46]",
  },
  sekarang: {
    label: "posisi Anda sekarang",
    className: "border-primary/30 bg-primary/8 text-[#3730A3]",
  },
  nanti: {
    label: "belum waktunya",
    className: "border-border bg-background text-text-secondary",
  },
};

export function RoadmapMap({ roadmap }: { roadmap: Roadmap }) {
  return (
    <ol className="relative mt-8 flex flex-col gap-7 border-l-2 border-border pl-6 md:pl-8">
      {roadmap.phases.map((phase) => (
        <PhaseBranch
          key={phase.stage}
          phase={phase}
          bottleneckReason={roadmap.bottleneckReason}
        />
      ))}
    </ol>
  );
}

function PhaseBranch({
  phase,
  bottleneckReason,
}: {
  phase: RoadmapPhase;
  bottleneckReason: Roadmap["bottleneckReason"];
}) {
  const badge = PHASE_BADGE[phase.state];
  const current = phase.state === "sekarang";

  /**
   * Fase tempat titik mentok dibenahi tidak selalu fase yang sedang
   * dijalani. Pengguna di Kelas 2 yang mentok pada kapasitas adalah
   * contohnya: seluruh tindakan kapasitas di katalog berada pada Kelas 3,
   * karena di situlah pekerjaan itu biasanya dikerjakan.
   *
   * Fase semacam itu tidak boleh diredupkan maupun dibiarkan tanpa
   * keterangan. Meredupkannya akan menyembunyikan satu-satunya pekerjaan
   * yang membuka hambatan pengguna, dan membuat halaman ini bertentangan
   * dengan halaman Diagnosis yang menampilkan tindakan yang sama sebagai
   * langkah prioritas.
   */
  const carriesBottleneck = phase.nodes.some((node) => node.fixesBottleneck);

  return (
    <li className="relative">
      {/* Simpul pada tulang punggung. Digeser setengah lebar penanda plus
          tebal garis supaya titiknya benar-benar duduk di atas garis. */}
      <span
        aria-hidden
        className={`absolute -left-[calc(1.5rem+9px)] top-1.5 size-4 rounded-full border-2 md:-left-[calc(2rem+9px)] ${
          current
            ? "border-primary bg-primary"
            : phase.state === "selesai"
              ? "border-success bg-success-tint"
              : "border-border bg-surface"
        }`}
      />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <h2 className="text-[length:var(--text-subhead)]">
          Kelas {phase.stage} — {phase.title}
        </h2>
        <span
          className={`rounded-[var(--radius-chip)] border px-2 py-0.5 text-overline ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      <p className="mt-1.5 max-w-[62ch] text-small text-text-secondary">
        {phase.headline}
      </p>

      {carriesBottleneck && !current ? (
        <p className="mt-2 max-w-[62ch] rounded-[var(--radius-panel)] border border-bottleneck-border bg-bottleneck-tint px-3 py-2 text-small text-[#8a6d1f]">
          {bottleneckReason === "di-bawah-ambang"
            ? `Hambatan Anda dibenahi di fase ini. Anda belum ada di Kelas ${phase.stage}, tetapi pekerjaan inilah yang membukanya — jadi mulailah dari sini, bukan dari fase sebelumnya.`
            : "Bagian terlemah usaha Anda ada di fase ini. Seluruh bagian sudah sehat, jadi ini soal menjaga agar tidak mundur, bukan pekerjaan baru."}
        </p>
      ) : null}

      {/* Fase yang belum waktunya tetap ditampilkan utuh, tetapi diredupkan
          agar mata pengguna jatuh pada pekerjaan yang relevan sekarang. */}
      <ul
        className={`mt-4 grid gap-3 ${
          current || carriesBottleneck ? "" : "opacity-80"
        } ${phase.nodes.length > 1 ? "lg:grid-cols-2" : ""}`}
      >
        {phase.nodes.map((node, i) => (
          <NodeCard
            key={node.id}
            node={node}
            number={i + 1}
            markerLabel={
              bottleneckReason === "di-bawah-ambang"
                ? "← ini yang dibenahi lebih dahulu"
                : "← bagian terlemah, jaga jangan sampai mundur"
            }
          />
        ))}
      </ul>
    </li>
  );
}

function NodeCard({
  node,
  number,
  markerLabel,
}: {
  node: RoadmapNode;
  number: number;
  /**
   * Kalimat penanda titik mentok. Berbeda menurut alasannya: dimensi di
   * bawah ambang adalah pekerjaan yang harus dimulai, sedangkan dimensi
   * terendah pada usaha yang seluruhnya sehat hanya perlu dijaga.
   */
  markerLabel: string;
}) {
  // Penandanya mengikuti titik mentok, bukan fase. Di katalog, tindakan
  // yang membenahi satu dimensi berkumpul pada satu kelas, sehingga
  // penanda ini tetap muncul pada satu fase saja.
  const highlight = node.fixesBottleneck;

  return (
    <li
      className={`card card-interactive flex min-w-0 flex-col p-5 ${
        highlight ? "border-bottleneck-border bg-bottleneck-tint" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={`grid size-9 shrink-0 place-items-center rounded-[var(--radius-panel)] font-mono text-small font-medium ${LEVER_TILE[node.lever]}`}
        >
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[0.9375rem]">{node.title}</h3>
            <span className="shrink-0 rounded-[var(--radius-chip)] bg-background px-2 py-1 text-overline text-text-secondary">
              {LEVER_LABELS[node.lever]}
            </span>
          </div>
          <p className="mt-1.5 text-small text-text-secondary">{node.why}</p>
        </div>
      </div>

      {highlight ? (
        <p className="mt-3 text-caption font-medium text-[#8a6d1f]">
          {markerLabel}
        </p>
      ) : null}

      <p className="mt-3 text-caption text-text-secondary">
        {costLabel(node.cost)} · {timeLabel(node.minutesPerDay)} · {node.effort}
      </p>

      <details className="group mt-3">
        <summary className="cursor-pointer list-none text-small font-medium text-primary">
          <span className="group-open:hidden">Lihat cara mengerjakannya</span>
          <span className="hidden group-open:inline">Tutup langkah</span>
        </summary>
        <ol className="mt-2 flex list-decimal flex-col gap-1 pl-5 text-small">
          {node.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </details>

      {node.tips.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2 border-t border-border pt-3">
          {node.tips.map((tip) => (
            <TipLeaf key={tip.id} tip={tip} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function TipLeaf({ tip }: { tip: RoadmapTip }) {
  const style = TIP_STYLE[tip.kind];
  return (
    <li className="flex flex-wrap items-baseline gap-2 text-small">
      <span
        className={`shrink-0 rounded-[var(--radius-chip)] border px-1.5 py-0.5 text-overline ${style.className}`}
      >
        {style.label}
      </span>
      <span className="min-w-0 flex-1 text-text-secondary">{tip.text}</span>
    </li>
  );
}
