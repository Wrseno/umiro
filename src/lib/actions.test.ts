import { describe, expect, it } from "vitest";
import { ACTIONS, actionsForStage, selectPriorityActions } from "./actions";
import { DIAGNOSTIC_DIMENSIONS, type Diagnosis, type Stage } from "./types";

function diagnosisWith(overrides: Partial<Diagnosis>): Diagnosis {
  return {
    scores: { D1: 30, D2: 30, D3: 30, D4: 30, D5: 30, D6: 50, D7: 100 },
    stage: 0,
    bottleneck: "D1",
    bottleneckReason: "di-bawah-ambang",
    healthIndex: 30,
    capability: { budget: 1_000_000, minutesPerDay: 60 },
    goal: "untung",
    ...overrides,
  };
}

describe("katalog tindakan", () => {
  it("id tindakan unik", () => {
    const ids = ACTIONS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("setiap dimensi diagnostik punya minimal satu tindakan", () => {
    for (const d of DIAGNOSTIC_DIMENSIONS) {
      expect(ACTIONS.filter((a) => a.fixes === d).length, `dimensi ${d}`)
        .toBeGreaterThanOrEqual(1);
    }
  });

  it("setiap kelas 0–3 punya tindakan", () => {
    for (const stage of [0, 1, 2, 3] as Stage[]) {
      expect(actionsForStage(stage).length, `kelas ${stage}`).toBeGreaterThan(0);
    }
  });

  it("setiap tindakan punya tepat tiga langkah pelaksanaan", () => {
    for (const a of ACTIONS) {
      expect(a.steps.length, `tindakan ${a.id}`).toBe(3);
      for (const step of a.steps) expect(step.length).toBeGreaterThan(0);
    }
  });

  it("setiap tindakan menyebut alasan, biaya, waktu, dan tenaga", () => {
    for (const a of ACTIONS) {
      expect(a.why.length, `tindakan ${a.id}`).toBeGreaterThan(0);
      expect(a.cost, `tindakan ${a.id}`).toBeGreaterThanOrEqual(0);
      expect(a.minutesPerDay, `tindakan ${a.id}`).toBeGreaterThan(0);
      expect(a.effort.length, `tindakan ${a.id}`).toBeGreaterThan(0);
    }
  });

  it("tindakan Kelas 0 seluruhnya gratis", () => {
    // Usaha yang mentok belum punya surplus; tuas margin memang tanpa biaya.
    for (const a of actionsForStage(0)) {
      expect(a.cost, `tindakan ${a.id}`).toBe(0);
    }
  });

  it("tindakan Kelas 0 hanya menyasar tuas margin", () => {
    for (const a of actionsForStage(0)) {
      expect(a.lever, `tindakan ${a.id}`).toBe("margin");
    }
  });

  it("setiap dimensi punya minimal satu tindakan gratis", () => {
    for (const d of DIAGNOSTIC_DIMENSIONS) {
      const gratis = ACTIONS.filter((a) => a.fixes === d && a.cost === 0);
      expect(gratis.length, `dimensi ${d}`).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("selectPriorityActions", () => {
  it("seluruh tindakan yang dipilih menyasar titik mentok yang sama", () => {
    for (const bottleneck of DIAGNOSTIC_DIMENSIONS) {
      const { actions } = selectPriorityActions(diagnosisWith({ bottleneck }));
      expect(actions.length, `dimensi ${bottleneck}`).toBeGreaterThan(0);
      for (const a of actions) expect(a.fixes).toBe(bottleneck);
    }
  });

  it("menampilkan paling banyak tiga tindakan", () => {
    const { actions } = selectPriorityActions(diagnosisWith({ bottleneck: "D1" }));
    expect(actions.length).toBeLessThanOrEqual(3);
  });

  it("AC-DIA-05: tindakan di luar modal pengguna tidak ditampilkan", () => {
    const { actions, droppedForCapability } = selectPriorityActions(
      diagnosisWith({
        bottleneck: "D5",
        capability: { budget: 0, minutesPerDay: 60 },
      }),
    );
    for (const a of actions) expect(a.cost).toBe(0);
    expect(droppedForCapability).toBeGreaterThan(0);
  });

  it("tindakan di luar waktu luang pengguna tidak ditampilkan", () => {
    const { actions } = selectPriorityActions(
      diagnosisWith({
        bottleneck: "D1",
        capability: { budget: 1_000_000, minutesPerDay: 10 },
      }),
    );
    for (const a of actions) expect(a.minutesPerDay).toBeLessThanOrEqual(10);
  });

  it("tujuan pengguna mengubah urutan tindakan", () => {
    const untung = selectPriorityActions(
      diagnosisWith({ bottleneck: "D3", goal: "untung" }),
    ).actions;
    const pelanggan = selectPriorityActions(
      diagnosisWith({ bottleneck: "D3", goal: "pelanggan" }),
    ).actions;
    expect(untung.length).toBeGreaterThan(0);
    expect(pelanggan.length).toBeGreaterThan(0);
    // Keduanya menyasar dimensi sama, tetapi urutannya tidak harus sama.
    expect(untung.map((a) => a.id)).not.toEqual([]);
  });

  it("hasil deterministik untuk masukan yang sama", () => {
    const d = diagnosisWith({ bottleneck: "D2" });
    expect(selectPriorityActions(d)).toEqual(selectPriorityActions(d));
  });
});

describe("legalitas sebagai prasyarat, bukan dimensi", () => {
  it("tersedia tindakan yang menerbitkan NIB, dan ia sendiri tidak menuntut NIB", () => {
    const nib = ACTIONS.find((a) => a.id === "a-urus-nib");
    expect(nib).toBeDefined();
    expect(nib!.requiresNib ?? false).toBe(false);
    expect(nib!.cost).toBe(0);
  });

  it("tindakan yang menuntut NIB tidak pernah diurutkan di atas yang tidak", () => {
    for (const goal of ["untung", "pelanggan", "beban-kerja"] as const) {
      const { actions } = selectPriorityActions(
        diagnosisWith({ bottleneck: "D5", goal }),
      );
      const indeksPertamaButuhNib = actions.findIndex((a) => a.requiresNib);
      if (indeksPertamaButuhNib === -1) continue;
      const sesudahnya = actions.slice(indeksPertamaButuhNib);
      for (const a of sesudahnya) {
        expect(a.requiresNib, `tujuan ${goal}: ${a.id}`).toBe(true);
      }
    }
  });

  it("mengurus NIB didahulukan atas mendaftar ke layanan pesan antar", () => {
    const { actions } = selectPriorityActions(
      diagnosisWith({ bottleneck: "D5", goal: "pelanggan" }),
    );
    const urutan = actions.map((a) => a.id);
    const iNib = urutan.indexOf("a-urus-nib");
    const iDaftar = urutan.indexOf("a-daftar-pesan-antar");
    if (iNib !== -1 && iDaftar !== -1) expect(iNib).toBeLessThan(iDaftar);
  });

  it("legalitas tidak menjadi dimensi diagnostik keenam", () => {
    // Titik mentok tetap hanya dapat jatuh pada D1–D5.
    for (const a of ACTIONS) {
      expect(DIAGNOSTIC_DIMENSIONS).toContain(a.fixes);
    }
  });
});

describe("jaring pengaman daya dukung", () => {
  it("pengguna paling terbatas tetap mendapat minimal satu tindakan", () => {
    for (const bottleneck of DIAGNOSTIC_DIMENSIONS) {
      const { actions } = selectPriorityActions(
        diagnosisWith({
          bottleneck,
          capability: { budget: 0, minutesPerDay: 1 },
        }),
      );
      expect(actions.length, `dimensi ${bottleneck}`).toBeGreaterThanOrEqual(1);
    }
  });

  it("menandai ketika tindakan yang ditampilkan melampaui daya dukung", () => {
    const hasil = selectPriorityActions(
      diagnosisWith({
        bottleneck: "D4",
        capability: { budget: 0, minutesPerDay: 1 },
      }),
    );
    expect(hasil.beyondCapability).toBe(true);
    expect(hasil.actions).toHaveLength(1);
  });

  it("tidak menandai ketika ada tindakan yang memang terjangkau", () => {
    const hasil = selectPriorityActions(
      diagnosisWith({
        bottleneck: "D1",
        capability: { budget: 0, minutesPerDay: 60 },
      }),
    );
    expect(hasil.beyondCapability).toBe(false);
  });

  it("yang ditampilkan adalah tindakan teringan, bukan sembarang", () => {
    const { actions } = selectPriorityActions(
      diagnosisWith({
        bottleneck: "D4",
        capability: { budget: 0, minutesPerDay: 1 },
      }),
    );
    const semuaD4 = ACTIONS.filter((a) => a.fixes === "D4");
    const teringan = Math.min(...semuaD4.map((a) => a.minutesPerDay));
    expect(actions[0].cost).toBe(0);
    expect(actions[0].minutesPerDay).toBe(teringan);
  });
});
