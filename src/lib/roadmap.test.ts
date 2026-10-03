import { describe, expect, it } from "vitest";
import { ACTIONS } from "./actions";
import {
  buildRoadmap,
  extractJsonObject,
  normalizeRoadmap,
  phaseState,
  ROADMAP_SCHEMA,
  roadmapContext,
  TIP_KINDS,
  type TipKind,
} from "./roadmap";
import type { Diagnosis, DiagnosticDimensionId, Stage } from "./types";

function diagnosisWith(
  overrides: Partial<Diagnosis> & {
    stage: Stage;
    bottleneck: DiagnosticDimensionId;
  },
): Diagnosis {
  return {
    scores: { D1: 40, D2: 40, D3: 40, D4: 40, D5: 40, D6: 50, D7: 100 },
    bottleneckReason: "di-bawah-ambang",
    healthIndex: 40,
    capability: { budget: 100_000, minutesPerDay: 30 },
    goal: "untung",
    ...overrides,
  };
}

const KELAS_0 = diagnosisWith({ stage: 0, bottleneck: "D1" });
const KELAS_2 = diagnosisWith({ stage: 2, bottleneck: "D5" });

describe("phaseState", () => {
  it("fase sebelum tahap pengguna sudah dilewati", () => {
    expect(phaseState(0, 2)).toBe("selesai");
    expect(phaseState(1, 2)).toBe("selesai");
  });

  it("fase pada tahap pengguna adalah posisi sekarang", () => {
    expect(phaseState(2, 2)).toBe("sekarang");
  });

  it("fase sesudahnya belum waktunya", () => {
    expect(phaseState(3, 2)).toBe("nanti");
  });
});

describe("buildRoadmap", () => {
  it("selalu empat fase berurutan Kelas 0 sampai 3", () => {
    for (const stage of [0, 1, 2, 3] as Stage[]) {
      const roadmap = buildRoadmap(diagnosisWith({ stage, bottleneck: "D1" }));
      expect(roadmap.phases.map((p) => p.stage)).toEqual([0, 1, 2, 3]);
    }
  });

  it("menandai dirinya sebagai hasil aturan, bukan AI", () => {
    expect(buildRoadmap(KELAS_0).source).toBe("aturan");
  });

  it("tepat satu fase berstatus sekarang, dan fase itu sesuai tahap", () => {
    const roadmap = buildRoadmap(KELAS_2);
    const sekarang = roadmap.phases.filter((p) => p.state === "sekarang");
    expect(sekarang).toHaveLength(1);
    expect(sekarang[0].stage).toBe(2);
  });

  it("setiap fase punya simpul — tidak ada cabang kosong", () => {
    for (const phase of buildRoadmap(KELAS_0).phases) {
      expect(phase.nodes.length).toBeGreaterThan(0);
    }
  });

  /**
   * Inti janji halaman ini: urutan mengikuti titik mentok. Bila tindakan
   * yang membenahi titik mentok ada pada sebuah fase, ia harus berada di
   * urutan pertama fase itu.
   */
  it("tindakan yang membenahi titik mentok didahulukan di fasenya", () => {
    const roadmap = buildRoadmap(KELAS_0);
    const fase = roadmap.phases.find((p) =>
      p.nodes.some((n) => n.fixesBottleneck),
    );
    expect(fase).toBeDefined();
    expect(fase!.nodes[0].fixesBottleneck).toBe(true);
  });

  it("penanda titik mentok hanya pada tindakan yang memang membenahinya", () => {
    const roadmap = buildRoadmap(KELAS_2);
    for (const phase of roadmap.phases) {
      for (const node of phase.nodes) {
        const action = ACTIONS.find((a) => a.id === node.id)!;
        expect(node.fixesBottleneck).toBe(action.fixes === "D5");
      }
    }
  });

  it("setiap simpul membawa tips yang terklasifikasi dan tiga langkah", () => {
    for (const phase of buildRoadmap(KELAS_0).phases) {
      for (const node of phase.nodes) {
        expect(node.steps).toHaveLength(3);
        expect(node.tips.length).toBeGreaterThan(0);
        for (const tip of node.tips) {
          expect(TIP_KINDS).toContain(tip.kind);
          expect(tip.text.length).toBeGreaterThan(0);
        }
      }
    }
  });

  /**
   * Tampilan menandai simpul titik mentok tanpa melihat fase, dengan
   * alasan bahwa tindakan yang membenahi satu dimensi berkumpul pada satu
   * kelas. Bila katalog nanti menyebar tindakan satu dimensi ke beberapa
   * kelas, penanda "dibenahi lebih dahulu" akan muncul di dua fase dan
   * pengguna melihat dua hambatan. Uji ini menjaga anggapan itu.
   */
  it("tindakan untuk satu dimensi berkumpul pada satu kelas", () => {
    const dimensions: DiagnosticDimensionId[] = ["D1", "D2", "D3", "D4", "D5"];
    for (const dimension of dimensions) {
      const stages = new Set(
        ACTIONS.filter((a) => a.fixes === dimension).map((a) => a.stage),
      );
      expect(stages.size, `dimensi ${dimension}`).toBe(1);
    }
  });

  it("id simpul tidak berulang di seluruh peta", () => {
    const ids = buildRoadmap(KELAS_0).phases.flatMap((p) =>
      p.nodes.map((n) => n.id),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("roadmapContext", () => {
  it("memuat tahap, titik mentok, skor, daya dukung, dan tujuan", () => {
    const context = roadmapContext(KELAS_2);
    expect(context).toContain("Kelas 2");
    expect(context).toContain("D5");
    expect(context).toContain("D1=40");
    expect(context).toContain("30 menit");
    expect(context).toContain("untung");
  });
});

/**
 * Skema dikirim ke OpenRouter dengan `strict: true`. Mode itu menuntut
 * setiap objek menyetel `additionalProperties: false` dan mencantumkan
 * seluruh propertinya pada `required`. Bila satu saja tidak patuh,
 * permintaan dijawab 400 dan peta jalan selalu jatuh ke jalur aturan —
 * tanpa gejala yang terlihat di antarmuka, karena jalur aturan memang
 * menghasilkan halaman yang utuh. Uji ini membuat pelanggaran itu gagal
 * di sini, bukan diam-diam di produksi.
 */
describe("ROADMAP_SCHEMA", () => {
  // Seluruh ruas readonly karena `ROADMAP_SCHEMA` ditulis `as const`;
  // tipe yang dapat diubah tidak dapat menerimanya.
  type Node = {
    readonly type?: string;
    readonly properties?: Readonly<Record<string, Node>>;
    readonly items?: Node;
    readonly required?: readonly string[];
    readonly additionalProperties?: boolean;
  };

  function walk(node: Node, path: string, check: (n: Node, p: string) => void) {
    check(node, path);
    if (node.properties) {
      for (const [key, child] of Object.entries(node.properties)) {
        walk(child, `${path}.${key}`, check);
      }
    }
    if (node.items) walk(node.items, `${path}[]`, check);
  }

  it("setiap objek menolak properti tambahan dan mewajibkan seluruhnya", () => {
    walk(ROADMAP_SCHEMA as Node, "root", (node, path) => {
      if (node.type !== "object") return;
      expect(node.additionalProperties, `${path}.additionalProperties`).toBe(false);
      expect(
        [...(node.required ?? [])].sort(),
        `${path}.required`,
      ).toEqual(Object.keys(node.properties ?? {}).sort());
    });
  });

  it("akarnya objek, sesuai tuntutan mode ketat", () => {
    expect((ROADMAP_SCHEMA as Node).type).toBe("object");
  });

  /**
   * Nilai yang diterima `lever` dan `kind` harus sama dengan yang dikenali
   * normalisasi. Kalau skema membolehkan nilai yang kemudian dibuang
   * normalisasi, simpul hasil AI akan hilang tanpa sebab yang jelas.
   */
  it("enum pada skema sama dengan yang dikenali normalisasi", () => {
    const phases = (ROADMAP_SCHEMA as Node).properties!.phases;
    const node = phases.items!.properties!.nodes.items!;
    expect(node.properties!.lever).toMatchObject({
      enum: ["margin", "retensi", "jangkauan", "kapasitas"],
    });
    expect(node.properties!.tips.items!.properties!.kind).toMatchObject({
      enum: [...TIP_KINDS],
    });
  });
});

describe("extractJsonObject", () => {
  it("JSON bersih diuraikan apa adanya", () => {
    expect(extractJsonObject('{"a":1}')).toEqual({ a: 1 });
  });

  it("JSON di dalam blok kode diambil", () => {
    expect(extractJsonObject('```json\n{"a":1}\n```')).toEqual({ a: 1 });
    expect(extractJsonObject('```\n{"a":1}\n```')).toEqual({ a: 1 });
  });

  it("kalimat pengantar dan penutup di luar JSON diabaikan", () => {
    const jawaban = 'Tentu! Ini peta jalannya:\n{"a":1}\nSemoga membantu.';
    expect(extractJsonObject(jawaban)).toEqual({ a: 1 });
  });

  it("objek bersarang tetap utuh sampai kurawal terakhir", () => {
    const jawaban = 'Ini:\n{"phases":[{"stage":0,"nodes":[{"t":1}]}]}\nselesai';
    expect(extractJsonObject(jawaban)).toEqual({
      phases: [{ stage: 0, nodes: [{ t: 1 }] }],
    });
  });

  it("array, nilai tunggal, dan teks tanpa JSON ditolak", () => {
    for (const jawaban of ['[{"a":1}]', '"teks"', "42", "maaf, saya tidak bisa", ""]) {
      expect(extractJsonObject(jawaban)).toBeNull();
    }
  });

  /**
   * Keluaran yang terpotong karena jatah token habis. Potongan seperti ini
   * tidak dapat diselamatkan, dan harus berakhir di jalur cadangan — bukan
   * di peta jalan setengah jadi.
   */
  it("JSON terpotong ditolak", () => {
    expect(extractJsonObject('{"summary":"Usaha Anda","phases":[{"stage"')).toBeNull();
  });
});

/* ──────────────────────────────────────────────────────────────
   Normalisasi keluaran model
   ────────────────────────────────────────────────────────────── */

function node(overrides: Record<string, unknown> = {}) {
  return {
    title: "Catat uang masuk setiap hari",
    why: "Tanpa catatan, tidak ada yang bisa diperbaiki.",
    lever: "margin",
    cost: 0,
    minutesPerDay: 10,
    effort: "sendiri",
    steps: ["Siapkan buku", "Tulis dua angka", "Jumlahkan tiap minggu"],
    tips: [{ kind: "trik", text: "Taruh bukunya di tempat jualan." }],
    ...overrides,
  };
}

function phase(stage: number, overrides: Record<string, unknown> = {}) {
  return { stage, headline: "Judul fase.", nodes: [node()], ...overrides };
}

function fullPayload() {
  return {
    summary: "Usaha Anda belum terlihat angkanya.",
    phases: [0, 1, 2, 3].map((s) => phase(s)),
  };
}

describe("normalizeRoadmap", () => {
  it("keluaran lengkap diterima dan ditandai berasal dari AI", () => {
    const roadmap = normalizeRoadmap(fullPayload(), KELAS_0);
    expect(roadmap.source).toBe("ai");
    expect(roadmap.summary).toBe("Usaha Anda belum terlihat angkanya.");
    expect(roadmap.phases.map((p) => p.stage)).toEqual([0, 1, 2, 3]);
  });

  it("status fase dan nama kelas datang dari aturan, bukan dari model", () => {
    const payload = {
      ...fullPayload(),
      // Model mencoba menyatakan statusnya sendiri; harus diabaikan.
      phases: [0, 1, 2, 3].map((s) =>
        phase(s, { state: "sekarang", title: "Kelas Rekaan" }),
      ),
    };
    const roadmap = normalizeRoadmap(payload, KELAS_2);
    expect(roadmap.phases.map((p) => p.state)).toEqual([
      "selesai",
      "selesai",
      "sekarang",
      "nanti",
    ]);
    expect(roadmap.phases[2].title).toBe("Bertumbuh");
  });

  it("fase yang tidak dikirim model diisi dari jalur cadangan", () => {
    const payload = { summary: "Ringkasan.", phases: [phase(0), phase(1)] };
    const roadmap = normalizeRoadmap(payload, KELAS_0);
    expect(roadmap.phases.map((p) => p.stage)).toEqual([0, 1, 2, 3]);
    for (const p of roadmap.phases) {
      expect(p.nodes.length).toBeGreaterThan(0);
    }
    // Kelas 2 dan 3 jatuh ke katalog, jadi id-nya id tindakan.
    expect(ACTIONS.some((a) => a.id === roadmap.phases[2].nodes[0].id)).toBe(true);
  });

  it("fase berganda dengan stage sama hanya diambil yang pertama", () => {
    const payload = {
      summary: "Ringkasan.",
      phases: [
        phase(0, { headline: "Pertama." }),
        phase(0, { headline: "Kedua." }),
      ],
    };
    const roadmap = normalizeRoadmap(payload, KELAS_0);
    expect(roadmap.phases[0].headline).toBe("Pertama.");
  });

  it("simpul tanpa judul, alasan, tuas sah, atau langkah dibuang", () => {
    const payload = {
      summary: "Ringkasan.",
      phases: [
        phase(0, {
          nodes: [
            node({ title: "   " }),
            node({ lever: "pemasaran" }),
            node({ steps: [] }),
            node({ title: "Satu-satunya yang sah" }),
          ],
        }),
      ],
    };
    const roadmap = normalizeRoadmap(payload, KELAS_0);
    expect(roadmap.phases[0].nodes).toHaveLength(1);
    expect(roadmap.phases[0].nodes[0].title).toBe("Satu-satunya yang sah");
  });

  it("fase yang seluruh simpulnya tidak sah jatuh ke jalur cadangan", () => {
    const payload = {
      summary: "Ringkasan.",
      phases: [phase(0, { nodes: [node({ lever: "entah" })] })],
    };
    const roadmap = normalizeRoadmap(payload, KELAS_0);
    expect(ACTIONS.some((a) => a.id === roadmap.phases[0].nodes[0].id)).toBe(true);
  });

  it("jumlah simpul dan tips dibatasi", () => {
    const payload = {
      summary: "Ringkasan.",
      phases: [
        phase(0, {
          nodes: Array.from({ length: 9 }, (_, i) =>
            node({
              title: `Langkah ${i + 1}`,
              tips: Array.from({ length: 7 }, (_, j) => ({
                kind: "trik" as TipKind,
                text: `Tips ${j + 1}`,
              })),
            }),
          ),
        }),
      ],
    };
    const roadmap = normalizeRoadmap(payload, KELAS_0);
    expect(roadmap.phases[0].nodes.length).toBeLessThanOrEqual(4);
    for (const n of roadmap.phases[0].nodes) {
      expect(n.tips.length).toBeLessThanOrEqual(3);
    }
  });

  it("tips dengan klasifikasi tidak dikenal dibuang, simpulnya tetap", () => {
    const payload = {
      summary: "Ringkasan.",
      phases: [
        phase(0, {
          nodes: [
            node({
              tips: [
                { kind: "motivasi", text: "Semangat!" },
                { kind: "prinsip", text: "Omzet bukan keuntungan." },
              ],
            }),
          ],
        }),
      ],
    };
    const roadmap = normalizeRoadmap(payload, KELAS_0);
    const tips = roadmap.phases[0].nodes[0].tips;
    expect(tips).toHaveLength(1);
    expect(tips[0].kind).toBe("prinsip");
  });

  it("biaya dan waktu yang tidak masuk akal dinormalkan ke nol", () => {
    const payload = {
      summary: "Ringkasan.",
      phases: [
        phase(0, {
          nodes: [node({ cost: -5000, minutesPerDay: Number.NaN })],
        }),
      ],
    };
    const n = normalizeRoadmap(payload, KELAS_0).phases[0].nodes[0];
    expect(n.cost).toBe(0);
    expect(n.minutesPerDay).toBe(0);
  });

  it("keluaran yang sama sekali tidak terbaca jatuh ke jalur cadangan", () => {
    for (const payload of [null, "bukan objek", {}, { phases: [] }, 42]) {
      const roadmap = normalizeRoadmap(payload, KELAS_0);
      expect(roadmap.source).toBe("aturan");
      expect(roadmap.phases).toHaveLength(4);
    }
  });

  it("id simpul hasil AI tidak berulang", () => {
    const ids = normalizeRoadmap(fullPayload(), KELAS_0).phases.flatMap((p) =>
      p.nodes.map((n) => n.id),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });
});
