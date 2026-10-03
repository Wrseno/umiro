import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RoadmapMap } from "./RoadmapMap";
import { buildRoadmap, normalizeRoadmap } from "@/lib/roadmap";
import type { Diagnosis } from "@/lib/types";

/**
 * Uji perenderan peta jalan.
 *
 * Tujuannya bukan memeriksa kelas CSS, melainkan memastikan ketiga tingkat
 * kedalaman benar-benar sampai ke markup — fase, langkah, dan tips — serta
 * penanda titik mentok hanya muncul pada fase yang sedang dijalani.
 */

const DIAGNOSIS: Diagnosis = {
  scores: { D1: 70, D2: 70, D3: 70, D4: 30, D5: 40, D6: 50, D7: 100 },
  stage: 2,
  bottleneck: "D4",
  bottleneckReason: "di-bawah-ambang",
  healthIndex: 56,
  capability: { budget: 500_000, minutesPerDay: 30 },
  goal: "beban-kerja",
};

describe("RoadmapMap", () => {
  it("merender empat fase beserta status dan judulnya", () => {
    const html = renderToStaticMarkup(
      <RoadmapMap roadmap={buildRoadmap(DIAGNOSIS)} />,
    );
    for (const stage of [0, 1, 2, 3]) {
      expect(html).toContain(`Kelas ${stage} —`);
    }
    expect(html).toContain("posisi Anda sekarang");
    expect(html).toContain("sudah dilewati");
    expect(html).toContain("belum waktunya");
  });

  it("merender langkah dan label klasifikasi tips", () => {
    const html = renderToStaticMarkup(
      <RoadmapMap roadmap={buildRoadmap(DIAGNOSIS)} />,
    );
    expect(html).toContain("Pisahkan uang usaha dari uang dapur");
    expect(html).toContain("Sebabnya");
    expect(html).toContain("Caranya");
    expect(html).toContain("Hati-hati");
  });

  /**
   * Titik mentok pengguna ini adalah kapasitas, dan seluruh tindakan
   * kapasitas di katalog berada pada Kelas 3 — satu fase di depan kelasnya.
   * Penanda harus mengikuti titik mentok ke fase itu, dan fase tersebut
   * harus menyatakan mengapa pekerjaannya dimulai dari sana.
   */
  it("penanda titik mentok mengikuti hambatan, bukan kelas pengguna", () => {
    const html = renderToStaticMarkup(
      <RoadmapMap roadmap={buildRoadmap(DIAGNOSIS)} />,
    );
    const kelas3 = html.slice(html.indexOf("Kelas 3 —"));
    expect(kelas3).toContain("ini yang dibenahi lebih dahulu");
    expect(html).toContain("Hambatan Anda dibenahi di fase ini");
  });

  it("penanda titik mentok tidak tersebar ke lebih dari satu fase", () => {
    const html = renderToStaticMarkup(
      <RoadmapMap roadmap={buildRoadmap(DIAGNOSIS)} />,
    );
    const batas = [0, 1, 2, 3].map((s) => html.indexOf(`Kelas ${s} —`));
    const fasePenanda = [0, 1, 2, 3].filter((s) => {
      const akhir = s === 3 ? html.length : batas[s + 1];
      return html
        .slice(batas[s], akhir)
        .includes("ini yang dibenahi lebih dahulu");
    });
    expect(fasePenanda).toEqual([3]);
  });

  /**
   * Usaha yang seluruh dimensinya sudah sehat tetap punya titik mentok,
   * yaitu dimensi terendah. Pada keadaan itu penandanya tidak boleh
   * berbunyi seperti pekerjaan yang belum dimulai — fasenya justru sudah
   * dilewati pengguna.
   */
  it("titik mentok karena skor terendah memakai kalimat menjaga, bukan memulai", () => {
    const sehat: Diagnosis = {
      ...DIAGNOSIS,
      scores: { D1: 60, D2: 80, D3: 80, D4: 80, D5: 80, D6: 50, D7: 100 },
      stage: 3,
      bottleneck: "D1",
      bottleneckReason: "skor-terendah",
      healthIndex: 76,
    };
    const html = renderToStaticMarkup(<RoadmapMap roadmap={buildRoadmap(sehat)} />);
    expect(html).toContain("bagian terlemah, jaga jangan sampai mundur");
    expect(html).toContain("Bagian terlemah usaha Anda ada di fase ini");
    expect(html).not.toContain("ini yang dibenahi lebih dahulu");
    expect(html).not.toContain("Anda belum ada di Kelas");
  });

  it("merender peta jalan hasil AI tanpa simpul katalog", () => {
    const roadmap = normalizeRoadmap(
      {
        summary: "Ringkasan.",
        phases: [0, 1, 2, 3].map((stage) => ({
          stage,
          headline: `Judul fase ${stage}.`,
          nodes: [
            {
              title: `Langkah rakitan ${stage}`,
              why: "Alasannya.",
              lever: "kapasitas",
              cost: 0,
              minutesPerDay: 15,
              effort: "sendiri",
              steps: ["Satu", "Dua", "Tiga"],
              tips: [{ kind: "peringatan", text: "Jangan tergesa." }],
            },
          ],
        })),
      },
      DIAGNOSIS,
    );
    const html = renderToStaticMarkup(<RoadmapMap roadmap={roadmap} />);
    expect(roadmap.source).toBe("ai");
    expect(html).toContain("Langkah rakitan 2");
    expect(html).toContain("Jangan tergesa.");
    expect(html).not.toContain("Pisahkan uang usaha dari uang dapur");
  });
});
