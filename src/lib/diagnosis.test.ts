import { describe, expect, it } from "vitest";
import {
  determineBottleneck,
  determineStage,
  diagnose,
  extractCapability,
  extractGoal,
  healthIndex,
  IncompleteAnswersError,
  scoreDimensions,
  validateAnswers,
} from "./diagnosis";
import { QUESTIONS } from "./questions";
import type { Answers, DimensionScores } from "./types";

/** Jawaban lengkap dengan pilihan ke-n pada setiap pertanyaan. */
function answerAll(pick: (index: number) => number): Answers {
  const answers: Answers = {};
  for (const q of QUESTIONS) {
    const options = q.options;
    const index = Math.min(Math.max(pick(options.length), 0), options.length - 1);
    answers[q.id] = options[index].id;
  }
  return answers;
}

/**
 * Pilihan pertama pada setiap pertanyaan. Pada D1–D5 pilihan pertama
 * adalah yang terbaik, sehingga set ini menghasilkan Kelas 3. Pada D6
 * urutannya mengikuti nominal dari terkecil — pilihan pertama justru
 * berarti tanpa modal — karena menaruh "belum ada sama sekali" di awal
 * lebih ramah bagi pengguna yang memang tidak punya uang lebih.
 */
const PILIHAN_PERTAMA = answerAll(() => 0);
const PILIHAN_TERAKHIR = answerAll((n) => n - 1);

/** Menyusun skor langsung, untuk menguji aturan gerbang secara terpisah. */
function scores(partial: Partial<DimensionScores>): DimensionScores {
  return { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0, D6: 0, D7: 100, ...partial };
}

describe("validateAnswers", () => {
  it("jawaban lengkap diterima", () => {
    expect(() => validateAnswers(PILIHAN_PERTAMA)).not.toThrow();
  });

  it("satu pertanyaan kosong ditolak — tidak ada opsi Lewati", () => {
    const kurang = { ...PILIHAN_PERTAMA };
    delete kurang[QUESTIONS[3].id];
    expect(() => validateAnswers(kurang)).toThrow(IncompleteAnswersError);
  });

  it("pilihan yang tidak terdaftar ditolak", () => {
    expect(() =>
      validateAnswers({ ...PILIHAN_PERTAMA, [QUESTIONS[0].id]: "zz" }),
    ).toThrow(IncompleteAnswersError);
  });

  it("menyebutkan pertanyaan mana yang belum dijawab", () => {
    const kurang = { ...PILIHAN_PERTAMA };
    delete kurang[QUESTIONS[1].id];
    try {
      validateAnswers(kurang);
      expect.unreachable("seharusnya melempar");
    } catch (error) {
      expect((error as IncompleteAnswersError).missing).toEqual([QUESTIONS[1].id]);
    }
  });
});

describe("scoreDimensions", () => {
  it("semua pilihan terbaik menghasilkan 100 pada dimensi diagnostik", () => {
    const s = scoreDimensions(PILIHAN_PERTAMA);
    for (const d of ["D1", "D2", "D3", "D4", "D5"] as const) {
      expect(s[d]).toBe(100);
    }
  });

  it("skor dimensi adalah rata-rata bobot, bukan jumlahnya", () => {
    // D1 punya tiga pertanyaan; satu dijawab terburuk, dua terbaik.
    const campuran: Answers = { ...PILIHAN_PERTAMA, d1q1: "c" }; // bobot 0
    const s = scoreDimensions(campuran);
    expect(s.D1).toBe(Math.round((0 + 100 + 100) / 3));
  });

  it("seluruh skor berada pada rentang 0–100", () => {
    for (const set of [PILIHAN_PERTAMA, PILIHAN_TERAKHIR]) {
      for (const value of Object.values(scoreDimensions(set))) {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(100);
      }
    }
  });
});

describe("determineStage — aturan gerbang, bukan rata-rata", () => {
  it("seluruh prasyarat terpenuhi menghasilkan Kelas 3", () => {
    expect(determineStage(scores({ D1: 80, D2: 80, D3: 80, D4: 80, D5: 80 }))).toBe(3);
  });

  it("Kelas 1 menuntut D1 dan D2 sehat", () => {
    expect(determineStage(scores({ D1: 60, D2: 60 }))).toBe(1);
    expect(determineStage(scores({ D1: 60, D2: 49 }))).toBe(0);
    expect(determineStage(scores({ D1: 49, D2: 60 }))).toBe(0);
  });

  it("Kelas 2 menuntut syarat Kelas 1 ditambah D3", () => {
    expect(determineStage(scores({ D1: 60, D2: 60, D3: 60 }))).toBe(2);
  });

  it("Kelas 3 menuntut D4 dan D5 sekaligus", () => {
    const dasar = { D1: 60, D2: 60, D3: 60 };
    expect(determineStage(scores({ ...dasar, D4: 60, D5: 49 }))).toBe(2);
    expect(determineStage(scores({ ...dasar, D4: 49, D5: 60 }))).toBe(2);
  });

  it("ambang 50 bersifat inklusif", () => {
    expect(determineStage(scores({ D1: 50, D2: 50 }))).toBe(1);
  });

  it("jangkauan luas tanpa kejelasan keuangan tetap Kelas 0", () => {
    // Inilah sebab rata-rata ditolak: rata-ratanya 56, terdengar sehat.
    const timpang = scores({ D1: 20, D2: 20, D3: 80, D4: 80, D5: 80 });
    expect(healthIndex(timpang)).toBe(56);
    expect(determineStage(timpang)).toBe(0);
  });
});

describe("determineBottleneck — urutan prasyarat", () => {
  it("D1 di bawah ambang selalu menang, meski bukan yang terendah", () => {
    const hasil = determineBottleneck(scores({ D1: 45, D2: 40, D3: 10, D4: 10, D5: 5 }));
    expect(hasil.bottleneck).toBe("D1");
    expect(hasil.reason).toBe("di-bawah-ambang");
  });

  it("AC-DIA-03: D1/D2 lemah dan D5 juga lemah, yang terpilih bukan D5", () => {
    const hasil = determineBottleneck(scores({ D1: 80, D2: 30, D3: 80, D4: 80, D5: 10 }));
    expect(hasil.bottleneck).toBe("D2");
  });

  it("melewati dimensi yang sudah sehat", () => {
    const hasil = determineBottleneck(scores({ D1: 90, D2: 90, D3: 30, D4: 10, D5: 10 }));
    expect(hasil.bottleneck).toBe("D3");
  });

  it("semua sehat: yang terpilih adalah skor terendah", () => {
    const hasil = determineBottleneck(scores({ D1: 90, D2: 90, D3: 90, D4: 60, D5: 90 }));
    expect(hasil.bottleneck).toBe("D4");
    expect(hasil.reason).toBe("skor-terendah");
  });

  it("semua sehat dan seri: dimensi yang lebih awal yang dipilih", () => {
    const hasil = determineBottleneck(scores({ D1: 60, D2: 60, D3: 90, D4: 90, D5: 90 }));
    expect(hasil.bottleneck).toBe("D1");
  });

  it("selalu menghasilkan tepat satu titik mentok", () => {
    const hasil = determineBottleneck(scores({ D1: 100, D2: 100, D3: 100, D4: 100, D5: 100 }));
    expect(["D1", "D2", "D3", "D4", "D5"]).toContain(hasil.bottleneck);
  });
});

describe("extractCapability dan extractGoal", () => {
  it("membaca modal dan waktu dari D6", () => {
    const mampu: Answers = { ...PILIHAN_PERTAMA, d6q1: "d", d6q2: "d" };
    expect(extractCapability(mampu)).toEqual({
      budget: 1_000_000,
      minutesPerDay: 60,
    });
  });

  it("pengguna tanpa modal dan tanpa waktu terbaca apa adanya", () => {
    const hemat: Answers = { ...PILIHAN_PERTAMA, d6q1: "a", d6q2: "a" };
    expect(extractCapability(hemat)).toEqual({ budget: 0, minutesPerDay: 5 });
  });

  it("membaca tujuan dari D7", () => {
    expect(extractGoal({ ...PILIHAN_PERTAMA, d7q1: "b" })).toBe("pelanggan");
    expect(extractGoal({ ...PILIHAN_PERTAMA, d7q1: "c" })).toBe("beban-kerja");
  });
});

describe("diagnose — keutuhan dan determinisme", () => {
  it("masukan sama selalu menghasilkan keluaran sama", () => {
    expect(diagnose(PILIHAN_PERTAMA)).toEqual(diagnose(PILIHAN_PERTAMA));
  });

  it("jawaban diagnostik terbaik: Kelas 3", () => {
    expect(diagnose(PILIHAN_PERTAMA).stage).toBe(3);
  });

  it("jawaban diagnostik terburuk: Kelas 0 dengan titik mentok D1", () => {
    const hasil = diagnose(PILIHAN_TERAKHIR);
    expect(hasil.stage).toBe(0);
    expect(hasil.bottleneck).toBe("D1");
  });

  it("AC-DIA-06: mengubah jawaban harga mengubah titik mentok", () => {
    const dasar: Answers = { ...PILIHAN_PERTAMA, d2q1: "c", d2q2: "c", d2q3: "c" };
    expect(diagnose(dasar).bottleneck).toBe("D2");

    const diperbaiki: Answers = { ...dasar, d2q1: "a", d2q2: "a", d2q3: "a" };
    expect(diagnose(diperbaiki).bottleneck).not.toBe("D2");
  });

  it("D6 dan D7 tidak memengaruhi tahap maupun titik mentok", () => {
    const kaya: Answers = { ...PILIHAN_PERTAMA, d6q1: "d", d6q2: "d", d7q1: "a" };
    const miskin: Answers = { ...PILIHAN_PERTAMA, d6q1: "a", d6q2: "a", d7q1: "c" };
    const a = diagnose(kaya);
    const b = diagnose(miskin);
    expect(a.stage).toBe(b.stage);
    expect(a.bottleneck).toBe(b.bottleneck);
  });

  it("indeks kesehatan tersimpan meski belum ditampilkan", () => {
    expect(diagnose(PILIHAN_PERTAMA).healthIndex).toBe(100);
  });
});

describe("mutu bank soal", () => {
  it("id pertanyaan unik", () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("id pilihan unik di dalam tiap pertanyaan", () => {
    for (const q of QUESTIONS) {
      const ids = q.options.map((o) => o.id);
      expect(new Set(ids).size, `pertanyaan ${q.id}`).toBe(ids.length);
    }
  });

  it("jumlah pertanyaan 14–16 sesuai PRD", () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(14);
    expect(QUESTIONS.length).toBeLessThanOrEqual(16);
  });

  it("setiap dimensi diagnostik punya minimal dua pertanyaan", () => {
    for (const d of ["D1", "D2", "D3", "D4", "D5"] as const) {
      const jumlah = QUESTIONS.filter((q) => q.dimension === d).length;
      expect(jumlah, `dimensi ${d}`).toBeGreaterThanOrEqual(2);
    }
  });

  it("setiap pertanyaan punya minimal dua pilihan dan teks bantuan", () => {
    for (const q of QUESTIONS) {
      expect(q.options.length, `pertanyaan ${q.id}`).toBeGreaterThanOrEqual(2);
      expect(q.helper.length, `pertanyaan ${q.id}`).toBeGreaterThan(0);
    }
  });

  it("bobot berada pada rentang 0–100", () => {
    for (const q of QUESTIONS) {
      for (const o of q.options) {
        expect(o.weight, `${q.id}/${o.id}`).toBeGreaterThanOrEqual(0);
        expect(o.weight, `${q.id}/${o.id}`).toBeLessThanOrEqual(100);
      }
    }
  });

  it("setiap pertanyaan diagnostik punya pilihan bobot tinggi dan bobot rendah", () => {
    const diagnostik = QUESTIONS.filter((q) => q.dimension.startsWith("D") && +q.dimension[1] <= 5);
    for (const q of diagnostik) {
      const weights = q.options.map((o) => o.weight);
      expect(Math.max(...weights), `pertanyaan ${q.id}`).toBeGreaterThanOrEqual(80);
      expect(Math.min(...weights), `pertanyaan ${q.id}`).toBeLessThanOrEqual(35);
    }
  });

  it("pilihan ketidaktahuan pada D1 dan D2 diberi bobot rendah", () => {
    // Ketidaktahuan atas untung dan harga memang temuan diagnosis,
    // bukan data yang hilang — Lampiran A.1 butir 4.
    for (const q of QUESTIONS.filter((x) => x.dimension === "D1" || x.dimension === "D2")) {
      for (const o of q.options.filter((x) => x.isUnknown)) {
        expect(o.weight, `${q.id}/${o.id}`).toBeLessThanOrEqual(20);
      }
    }
  });

  it("istilah teknis tidak muncul di hadapan pengguna", () => {
    const terlarang = ["HPP", "margin", "retensi", "omzet", "dimensi", "skor"];
    for (const q of QUESTIONS) {
      const teks = `${q.text} ${q.helper} ${q.options.map((o) => o.label).join(" ")}`.toLowerCase();
      for (const kata of terlarang) {
        expect(teks, `pertanyaan ${q.id} memuat "${kata}"`).not.toContain(kata.toLowerCase());
      }
    }
  });
});
