import { ACTIONS, actionsForStage } from "./actions";
import { STAGE_NAMES } from "./copy";
import {
  DIAGNOSTIC_DIMENSIONS,
  type Action,
  type Diagnosis,
  type DiagnosticDimensionId,
  type Lever,
  type Stage,
} from "./types";

/**
 * Peta jalan — US-05, dan PRD Lampiran G butir PB-01 untuk lapisan AI.
 *
 * Berbeda dari Diagnosis, isi halaman ini **dinamis**: simpul dan tipsnya
 * disusun ulang oleh model bahasa untuk kondisi usaha yang sedang dibaca.
 *
 * Pembagian tanggung jawabnya tegas, dan inilah yang menjaga klaim produk
 * tetap benar:
 *
 * - **Aturan** yang menetapkan tahap, titik mentok, dan status tiap fase.
 *   Nilai-nilai ini datang dari `diagnose()` dan tidak pernah dikirim ke
 *   model untuk dinilai ulang. AI tidak dapat memindahkan pengguna ke
 *   kelas lain maupun mengganti titik mentoknya.
 * - **AI** yang menyusun isi: ringkasan, judul tiap fase, tindakan beserta
 *   alasan dan langkahnya, serta tips singkat yang menyertainya.
 *
 * Seluruh keluaran model dilewatkan `normalizeRoadmap()` sebelum dipakai,
 * sehingga bentuk datanya terjamin walau model menjawab di luar dugaan.
 * Bila kunci API tidak tersedia atau permintaannya gagal, `buildRoadmap()`
 * menghasilkan peta jalan dari katalog tindakan. Halaman tetap terisi dan
 * demonstrasi langsung tidak pernah bergantung pada satu sambungan — risiko
 * yang justru menjadi alasan AI dikeluarkan dari MVP (PRD Lampiran G.1).
 */

/**
 * Klasifikasi isi tips. Dipakai untuk membedakan nada pada tampilan:
 * prinsip adalah sebab, trik adalah cara, peringatan adalah jebakan.
 */
export type TipKind = "prinsip" | "trik" | "peringatan";

export const TIP_KINDS = ["prinsip", "trik", "peringatan"] as const;

export interface RoadmapTip {
  id: string;
  kind: TipKind;
  /** Satu kalimat. Dibatasi panjangnya saat normalisasi. */
  text: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  /** Teks penjelas: mengapa langkah ini berarti bagi usaha ini. */
  why: string;
  lever: Lever;
  /** Biaya perkiraan, rupiah. Nol berarti gratis. */
  cost: number;
  minutesPerDay: number;
  /** Kebutuhan tenaga, ditulis apa adanya. */
  effort: string;
  steps: string[];
  tips: RoadmapTip[];
  /**
   * Benar bila langkah ini membenahi titik mentok pengguna, sehingga
   * tampilan dapat menyorotnya tanpa menghitung ulang diagnosis.
   */
  fixesBottleneck: boolean;
}

/** Status fase relatif terhadap tahap pengguna. */
export type PhaseState = "selesai" | "sekarang" | "nanti";

export interface RoadmapPhase {
  stage: Stage;
  /** Nama kelas. Tetap, datang dari aturan. */
  title: string;
  /** Satu kalimat tentang apa yang dibuka fase ini. Dinamis. */
  headline: string;
  state: PhaseState;
  nodes: RoadmapNode[];
}

export interface Roadmap {
  /** Pembuka satu sampai dua kalimat yang menyebut kondisi usaha ini. */
  summary: string;
  /** Selalu empat fase, berurutan Kelas 0 sampai Kelas 3. */
  phases: RoadmapPhase[];
  /**
   * Mengapa dimensi itu terpilih sebagai titik mentok, dibawa apa adanya
   * dari `diagnose()`. Tampilan memerlukannya karena kedua alasan menuntut
   * kalimat yang berbeda: "di bawah ambang" berarti ada pekerjaan yang
   * harus dimulai, sedangkan "skor terendah" berarti seluruh bagian sudah
   * sehat dan yang tersisa hanya menjaga bagian terlemah.
   */
  bottleneckReason: Diagnosis["bottleneckReason"];
  /** Dari mana isinya berasal. Dinyatakan terbuka pada antarmuka. */
  source: "ai" | "aturan";
}

const ALL_STAGES: Stage[] = [0, 1, 2, 3];

/** Batas yang berlaku untuk keluaran AI maupun jalur cadangan. */
const MAX_NODES_PER_PHASE = 4;
const MAX_TIPS_PER_NODE = 3;
const MAX_STEPS_PER_NODE = 4;
const MAX_TIP_LENGTH = 160;
const MAX_SUMMARY_LENGTH = 320;

/**
 * Tips bawaan per dimensi, dipakai jalur cadangan dan dikirim ke model
 * sebagai contoh nada yang dituju — bukan sebagai daftar yang harus
 * dipakai ulang. Panjangnya sengaja satu kalimat: pengguna sasaran
 * membaca di telepon genggam (PRD Bagian 4.1).
 */
export const FALLBACK_TIPS: Record<
  DiagnosticDimensionId,
  ReadonlyArray<{ kind: TipKind; text: string }>
> = {
  D1: [
    {
      kind: "prinsip",
      text: "Uang yang masuk bukan keuntungan. Keuntungan adalah yang tersisa setelah semua belanja dibayar.",
    },
    {
      kind: "trik",
      text: "Catat dua angka saja setiap hari: uang masuk dan uang belanja. Lebih dari itu biasanya berhenti di minggu kedua.",
    },
    {
      kind: "peringatan",
      text: "Mengambil uang dari kas jualan untuk belanja rumah tanpa dicatat membuat catatan sebulan jadi tidak berguna.",
    },
  ],
  D2: [
    {
      kind: "prinsip",
      text: "Harga pesaing adalah harga pesaing, bukan biaya Anda. Mereka mungkin belanja lebih murah.",
    },
    {
      kind: "trik",
      text: "Naikkan harga mulai dari menu paling laku; di situ pembeli datang karena rasanya, bukan karena harganya.",
    },
    {
      kind: "peringatan",
      text: "Tenaga Anda sendiri juga biaya. Kalau tidak dihitung, untung di kertas bisa hilang di kenyataan.",
    },
  ],
  D3: [
    {
      kind: "prinsip",
      text: "Pembeli yang kembali tidak perlu diyakinkan lagi, jadi biayanya jauh lebih murah daripada pembeli baru.",
    },
    {
      kind: "trik",
      text: "Minta nomor WhatsApp sambil menyerahkan pesanan, bukan sambil pembeli menunggu.",
    },
    {
      kind: "peringatan",
      text: "Mengirim pesan setiap hari membuat nomor Anda diblokir. Sekali seminggu sudah cukup.",
    },
  ],
  D4: [
    {
      kind: "prinsip",
      text: "Selama resepnya hanya ada di kepala Anda, usaha ini berhenti setiap kali Anda berhenti.",
    },
    {
      kind: "trik",
      text: "Timbang bahan sekali saja saat memasak seperti biasa, lalu tulis takarannya. Tidak perlu hari khusus.",
    },
    {
      kind: "peringatan",
      text: "Menambah orang sebelum resepnya tertulis hanya memindahkan kesalahan, bukan mengurangi beban.",
    },
  ],
  D5: [
    {
      kind: "prinsip",
      text: "Jangkauan baru berguna setelah untung per porsi sudah positif. Kalau belum, ramai justru menambah rugi.",
    },
    {
      kind: "trik",
      text: "Foto menu di dekat jendela pada siang hari dengan alas polos; hasilnya mengalahkan kebanyakan foto berbayar.",
    },
    {
      kind: "peringatan",
      text: "Komisi layanan pesan antar memotong setiap pesanan. Hitung dulu sisanya sebelum mendaftar.",
    },
  ],
};

/** Status fase relatif terhadap tahap pengguna. */
export function phaseState(stage: Stage, userStage: Stage): PhaseState {
  if (stage < userStage) return "selesai";
  if (stage === userStage) return "sekarang";
  return "nanti";
}

/**
 * Judul bawaan tiap fase untuk jalur cadangan. Ditulis sebagai capaian,
 * bukan sebagai nama kategori, agar pengguna tahu apa yang dibuka fase itu.
 */
const FALLBACK_HEADLINES: Record<Stage, string> = {
  0: "Membuat angka usaha terlihat, supaya keputusan berikutnya bukan tebakan.",
  1: "Membuat pembeli kembali, supaya penghasilan tidak bergantung pada orang baru setiap hari.",
  2: "Membuat usaha Anda bisa ditemukan orang yang belum pernah lewat depan tempat Anda.",
  3: "Membuat usaha tetap berjalan ketika Anda tidak sedang di tempat.",
};

function tipsForAction(action: Action): RoadmapTip[] {
  return FALLBACK_TIPS[action.fixes].slice(0, MAX_TIPS_PER_NODE).map((tip, i) => ({
    id: `${action.id}-t${i + 1}`,
    kind: tip.kind,
    text: tip.text,
  }));
}

function nodeFromAction(action: Action, bottleneck: DiagnosticDimensionId): RoadmapNode {
  return {
    id: action.id,
    title: action.title,
    why: action.why,
    lever: action.lever,
    cost: action.cost,
    minutesPerDay: action.minutesPerDay,
    effort: action.effort,
    steps: [...action.steps],
    tips: tipsForAction(action),
    fixesBottleneck: action.fixes === bottleneck,
  };
}

/**
 * Peta jalan dari katalog tindakan, tanpa AI.
 *
 * Dipakai dua kali: sebagai jalur cadangan ketika model tidak tersedia,
 * dan sebagai bahan rujukan yang dikirim ke model agar sarannya berpijak
 * pada katalog yang sudah diuji, bukan pada ingatan model.
 *
 * Pengurutan di dalam fase menaruh tindakan yang membenahi titik mentok
 * lebih dahulu, lalu yang lebih murah dan lebih ringan — sejalan dengan
 * `selectPriorityActions()`.
 */
export function buildRoadmap(diagnosis: Diagnosis): Roadmap {
  const phases = ALL_STAGES.map<RoadmapPhase>((stage) => {
    const ranked = [...actionsForStage(stage)].sort((a, b) => {
      const bottleneckDelta =
        Number(b.fixes === diagnosis.bottleneck) -
        Number(a.fixes === diagnosis.bottleneck);
      if (bottleneckDelta !== 0) return bottleneckDelta;
      const nibDelta =
        Number(a.requiresNib ?? false) - Number(b.requiresNib ?? false);
      if (nibDelta !== 0) return nibDelta;
      if (a.cost !== b.cost) return a.cost - b.cost;
      if (a.minutesPerDay !== b.minutesPerDay) {
        return a.minutesPerDay - b.minutesPerDay;
      }
      return a.id.localeCompare(b.id);
    });

    return {
      stage,
      title: STAGE_NAMES[stage],
      headline: FALLBACK_HEADLINES[stage],
      state: phaseState(stage, diagnosis.stage),
      nodes: ranked
        .slice(0, MAX_NODES_PER_PHASE)
        .map((action) => nodeFromAction(action, diagnosis.bottleneck)),
    };
  });

  return {
    summary: `Usaha Anda ada di Kelas ${diagnosis.stage} — ${STAGE_NAMES[diagnosis.stage]}. Peta jalan ini dimulai dari satu hambatan yang paling awal menahan langkah Anda, lalu menyusun sisanya berurutan.`,
    phases,
    bottleneckReason: diagnosis.bottleneckReason,
    source: "aturan",
  };
}

/* ──────────────────────────────────────────────────────────────
   Lapisan AI
   ────────────────────────────────────────────────────────────── */

/**
 * Skema keluaran model.
 *
 * Dikirim sebagai `output_config.format` sehingga bentuk jawabannya
 * dijamin API, bukan diharapkan dari petunjuk pada prompt. Perhatikan
 * yang **tidak** ada di sini: `state`, `title` fase, `fixesBottleneck`,
 * dan tahap pengguna. Keempatnya ditetapkan aturan dan ditambahkan
 * setelah keluaran model diterima.
 *
 * Batasan skema yang didukung membuat jumlah unsur array tidak bisa
 * dipatok di sini; pembatasannya dikerjakan `normalizeRoadmap()`.
 */
export const ROADMAP_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "phases"],
  properties: {
    summary: {
      type: "string",
      description:
        "Satu sampai dua kalimat pembuka yang menyebut kondisi usaha ini secara khusus. Sapa pengguna dengan 'Anda'.",
    },
    phases: {
      type: "array",
      description: "Tepat empat fase, satu untuk setiap kelas 0 sampai 3.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["stage", "headline", "nodes"],
        properties: {
          stage: { type: "integer", enum: [0, 1, 2, 3] },
          headline: {
            type: "string",
            description:
              "Satu kalimat tentang apa yang dibuka fase ini bagi usaha ini. Capaian, bukan nama kategori.",
          },
          nodes: {
            type: "array",
            description: "Dua sampai empat langkah untuk fase ini.",
            items: {
              type: "object",
              additionalProperties: false,
              required: [
                "title",
                "why",
                "lever",
                "cost",
                "minutesPerDay",
                "effort",
                "steps",
                "tips",
              ],
              properties: {
                title: {
                  type: "string",
                  description: "Kalimat perintah singkat. Mulai dengan kata kerja.",
                },
                why: {
                  type: "string",
                  description:
                    "Satu sampai dua kalimat: mengapa langkah ini berarti bagi usaha ini.",
                },
                lever: {
                  type: "string",
                  enum: ["margin", "retensi", "jangkauan", "kapasitas"],
                },
                cost: {
                  type: "integer",
                  description: "Biaya perkiraan dalam rupiah. Nol bila gratis.",
                },
                minutesPerDay: {
                  type: "integer",
                  description: "Waktu perkiraan per hari dalam menit.",
                },
                effort: {
                  type: "string",
                  description:
                    "Kebutuhan tenaga, misalnya 'sendiri' atau 'perlu orang lain'.",
                },
                steps: {
                  type: "array",
                  description: "Tepat tiga langkah pelaksanaan yang bisa dikerjakan hari ini.",
                  items: { type: "string" },
                },
                tips: {
                  type: "array",
                  description: "Dua sampai tiga tips singkat, masing-masing satu kalimat.",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["kind", "text"],
                    properties: {
                      kind: {
                        type: "string",
                        enum: ["prinsip", "trik", "peringatan"],
                        description:
                          "prinsip = sebab di baliknya; trik = cara melakukannya; peringatan = jebakan yang sering terjadi.",
                      },
                      text: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

/**
 * Mengambil satu objek JSON dari jawaban model.
 *
 * `response_format` seharusnya membuat jawaban berupa JSON bersih, tetapi
 * jenjang gratis dipakai bergantian oleh beberapa model dan tidak semuanya
 * patuh. Yang sering terjadi: JSON dibungkus blok kode, atau didahului
 * satu kalimat pengantar. Dua hal itu tidak layak membuat peta jalan jatuh
 * ke aturan, karena isinya sendiri sudah benar.
 *
 * Mengembalikan `null` bila tidak ada objek JSON yang dapat diuraikan.
 * Pemeriksaan isinya diserahkan ke `normalizeRoadmap()`.
 */
export function extractJsonObject(text: string): unknown | null {
  const trimmed = text.trim();

  const isPlainObject = (value: unknown): boolean =>
    typeof value === "object" && value !== null && !Array.isArray(value);

  /** Menguraikan satu calon. `undefined` berarti bukan JSON yang sah. */
  const parse = (candidate: string): unknown | undefined => {
    try {
      return JSON.parse(candidate);
    } catch {
      return undefined;
    }
  };

  // Bila seluruh teks sudah berupa JSON yang sah, keputusannya selesai di
  // sini: objek diterima, array dan nilai tunggal ditolak. Tanpa jalan
  // keluar lebih awal ini, jalan terakhir di bawah akan memotong objek
  // pertama dari dalam sebuah array dan mengembalikannya sebagai jawaban —
  // padahal yang dikirim model bukan objek yang diminta.
  const whole = parse(trimmed);
  if (whole !== undefined) return isPlainObject(whole) ? whole : null;

  // Blok kode, dengan atau tanpa penanda bahasa.
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) {
    const inside = parse(fenced[1].trim());
    if (inside !== undefined) return isPlainObject(inside) ? inside : null;
  }

  // Jalan terakhir: potong dari kurung kurawal pertama ke yang terakhir.
  // Ini menangani kalimat pengantar maupun penutup di luar JSON.
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end > start) {
    const sliced = parse(trimmed.slice(start, end + 1));
    if (sliced !== undefined && isPlainObject(sliced)) return sliced;
  }

  return null;
}

/** Bentuk keluaran model sebelum dinormalisasi. */
interface RoadmapDraft {
  summary?: unknown;
  phases?: unknown;
}

function asString(value: unknown, limit: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.length > limit ? `${trimmed.slice(0, limit - 1).trimEnd()}…` : trimmed;
}

function asLever(value: unknown): Lever | null {
  return value === "margin" ||
    value === "retensi" ||
    value === "jangkauan" ||
    value === "kapasitas"
    ? value
    : null;
}

function asTipKind(value: unknown): TipKind | null {
  return value === "prinsip" || value === "trik" || value === "peringatan"
    ? value
    : null;
}

/** Bilangan bulat tak negatif. Nilai di luar itu dianggap tidak diketahui. */
function asCount(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return null;
  return Math.round(value);
}

function normalizeTips(value: unknown, nodeId: string): RoadmapTip[] {
  if (!Array.isArray(value)) return [];
  const tips: RoadmapTip[] = [];
  for (const item of value) {
    if (tips.length === MAX_TIPS_PER_NODE) break;
    if (typeof item !== "object" || item === null) continue;
    const kind = asTipKind((item as { kind?: unknown }).kind);
    const text = asString((item as { text?: unknown }).text, MAX_TIP_LENGTH);
    if (!kind || !text) continue;
    tips.push({ id: `${nodeId}-t${tips.length + 1}`, kind, text });
  }
  return tips;
}

/**
 * Menyelaraskan satu simpul keluaran model dengan tipe `RoadmapNode`.
 *
 * `fixesBottleneck` tidak diambil dari model. Ia ditentukan di sini: benar
 * hanya bila judul simpul cocok dengan tindakan katalog yang memang
 * membenahi titik mentok, atau bila tuasnya sama dengan tuas tindakan
 * katalog untuk titik mentok itu. Dengan begitu penanda "dibenahi lebih
 * dahulu" pada antarmuka tetap bersumber pada aturan.
 */
function normalizeNode(
  value: unknown,
  id: string,
  bottleneckLevers: ReadonlySet<Lever>,
): RoadmapNode | null {
  if (typeof value !== "object" || value === null) return null;
  const draft = value as Record<string, unknown>;

  const title = asString(draft.title, 120);
  const why = asString(draft.why, 320);
  const lever = asLever(draft.lever);
  if (!title || !why || !lever) return null;

  const steps = Array.isArray(draft.steps)
    ? draft.steps
        .map((step) => asString(step, 240))
        .filter((step): step is string => step !== null)
        .slice(0, MAX_STEPS_PER_NODE)
    : [];
  if (steps.length === 0) return null;

  return {
    id,
    title,
    why,
    lever,
    cost: asCount(draft.cost) ?? 0,
    minutesPerDay: asCount(draft.minutesPerDay) ?? 0,
    effort: asString(draft.effort, 80) ?? "sendiri",
    steps,
    tips: normalizeTips(draft.tips, id),
    fixesBottleneck: bottleneckLevers.has(lever),
  };
}

/**
 * Mengubah keluaran model menjadi `Roadmap` yang sah.
 *
 * Fase yang tidak dikirim model, atau yang simpulnya tidak satu pun
 * terbaca, diisi dari jalur cadangan. Jadi peta jalan selalu utuh empat
 * fase walau jawaban model hanya sebagian — pengguna tidak pernah melihat
 * cabang kosong.
 */
export function normalizeRoadmap(payload: unknown, diagnosis: Diagnosis): Roadmap {
  const fallback = buildRoadmap(diagnosis);
  if (typeof payload !== "object" || payload === null) return fallback;

  const draft = payload as RoadmapDraft;

  // Tuas yang dipakai tindakan katalog untuk membenahi titik mentok.
  // Dipakai menandai simpul AI tanpa mempercayai klaim model.
  const bottleneckLevers = new Set<Lever>(
    ACTIONS.filter((a) => a.fixes === diagnosis.bottleneck).map((a) => a.lever),
  );

  const byStage = new Map<Stage, RoadmapPhase>();
  if (Array.isArray(draft.phases)) {
    for (const item of draft.phases) {
      if (typeof item !== "object" || item === null) continue;
      const phase = item as Record<string, unknown>;
      const stage = phase.stage;
      if (stage !== 0 && stage !== 1 && stage !== 2 && stage !== 3) continue;
      if (byStage.has(stage)) continue;

      const nodes = Array.isArray(phase.nodes)
        ? phase.nodes
            .slice(0, MAX_NODES_PER_PHASE)
            .map((node, i) => normalizeNode(node, `s${stage}-n${i + 1}`, bottleneckLevers))
            .filter((node): node is RoadmapNode => node !== null)
        : [];
      if (nodes.length === 0) continue;

      byStage.set(stage, {
        stage,
        title: STAGE_NAMES[stage],
        headline: asString(phase.headline, 200) ?? FALLBACK_HEADLINES[stage],
        state: phaseState(stage, diagnosis.stage),
        nodes,
      });
    }
  }

  if (byStage.size === 0) return fallback;

  return {
    summary: asString(draft.summary, MAX_SUMMARY_LENGTH) ?? fallback.summary,
    phases: ALL_STAGES.map(
      (stage) => byStage.get(stage) ?? fallback.phases[stage],
    ),
    bottleneckReason: diagnosis.bottleneckReason,
    source: "ai",
  };
}

/**
 * Konteks yang dikirim ke model.
 *
 * Ditulis sebagai fungsi terpisah supaya dapat diuji dan, yang lebih
 * penting, supaya dapat ditampilkan apa adanya kepada pengguna sebelum
 * permintaan dikirim — AC-AI-03 menuntut keterbukaan mengenai data yang
 * dianalisis. Tidak ada data pengenal di dalamnya: hanya skor, tahap,
 * titik mentok, daya dukung, dan tujuan.
 */
export function roadmapContext(diagnosis: Diagnosis): string {
  const scores = DIAGNOSTIC_DIMENSIONS.map(
    (d) => `${d}=${diagnosis.scores[d]}`,
  ).join(", ");

  return [
    `Tahap: Kelas ${diagnosis.stage} (${STAGE_NAMES[diagnosis.stage]})`,
    `Titik mentok: ${diagnosis.bottleneck} (${
      diagnosis.bottleneckReason === "di-bawah-ambang"
        ? "di bawah ambang sehat"
        : "skor terendah, seluruh dimensi sudah sehat"
    })`,
    `Skor dimensi (0-100): ${scores}`,
    `Dana yang bisa dialokasikan: Rp ${diagnosis.capability.budget.toLocaleString("id-ID")}`,
    `Waktu luang di luar operasional: ${diagnosis.capability.minutesPerDay} menit per hari`,
    `Yang paling diinginkan pengguna: ${diagnosis.goal}`,
  ].join("\n");
}
