import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { SURVEY_CATALOG } from "../content/survey.ts";
import { decide, isComplete, scoreDiagnosis, unanswered, type Answers } from "./diagnosis.ts";

const Q = SURVEY_CATALOG.questions;

/** Jawaban dasar: semua kategori sehat (opsi bobot tinggi), konteks terisi. */
const BAIK: Answers = {
  F1: "c", F2: "c", F3: "c",       // 70, 70, 80 → 73
  M1: "c", M2: "c", M3: "c",       // 80, 90, 100 → 90
  R1: "c", R2: "c",                // 70, 80 → 75
  A1: "c", A2: "c",                // 80, 70 → 75
  C1: "c", C2: "c", C3: "c",       // 70, 80, 80 → 77
  S1: "c", G1: "b",
};

const run = (over: Answers) => scoreDiagnosis({ ...BAIK, ...over }, SURVEY_CATALOG);
const score = (r: ReturnType<typeof run>, k: string) => r.scores.find((s) => s.key === k)?.score;

describe("katalog v1", () => {
  it("15 soal: 13 diagnostik F/M/R/A/C + S1, G1 konteks", () => {
    assert.equal(Q.length, 15);
    assert.equal(Q.filter((q) => q.category === "S" || q.category === "G").length, 2);
  });
  it("setiap soal diagnostik punya opsi 'Belum tahu' (AC-02-04), bobot 0–100", () => {
    for (const q of Q) {
      if (q.category === "S" || q.category === "G") continue;
      assert.ok(q.options.some((o) => o.flag), q.id);
      for (const o of q.options) assert.ok(o.weight !== null && o.weight >= 0 && o.weight <= 100, q.id);
    }
  });
  it("isComplete / unanswered", () => {
    assert.equal(isComplete(BAIK, Q), true);
    const { F1, ...kurang } = BAIK;
    void F1;
    assert.deepEqual(unanswered(kurang, Q), ["F1"]);
    assert.equal(isComplete({ ...BAIK, F1: "zzz" }, Q), false);
  });
});

describe("agregasi skor", () => {
  it("rata-rata bobot jawaban valid, dibulatkan", () => {
    const r = run({});
    assert.equal(score(r, "F"), 73);
    assert.equal(score(r, "M"), 90);
  });
  it("'Belum tahu' tidak ikut dirata-rata", () => {
    // F: 100, 100, belum tahu → 100 (bukan 67)
    const r = run({ F1: "d", F2: "d", F3: "x" });
    assert.equal(score(r, "F"), 100);
    assert.equal(r.scores.find((s) => s.key === "F")?.flagged, 1);
  });
  it("S dan G tidak memengaruhi skor (AC-04-04)", () => {
    const a = run({ S1: "a", G1: "a" });
    const b = run({ S1: "c", G1: "c" });
    assert.deepEqual(a.scores, b.scores);
    assert.deepEqual(a.outcome, b.outcome);
    assert.equal(a.context.length, 2);
  });
});

// PRD Lampiran A1 — enam kasus uji aturan diagnosis.
describe("PRD Lampiran A1", () => {
  it("A1-1 margin nol/negatif + jangkauan tinggi → Margin, bukan Jangkauan", () => {
    const r = run({ M1: "a", M2: "a", M3: "a", A1: "d", A2: "d" });
    assert.deepEqual(r.outcome, { kind: "tunggal", category: "M", delta: 73 });
  });

  it("A1-2 margin positif, pelanggan jarang kembali → Retensi", () => {
    const r = run({ R1: "a", R2: "a" });
    assert.equal(r.outcome.kind, "tunggal");
    assert.equal(r.outcome.kind === "tunggal" && r.outcome.category, "R");
  });

  it("A1-3 permintaan melebihi kapasitas → Kapasitas; S tidak mengubah skor", () => {
    const tanpaS = run({ C1: "a", C2: "a", C3: "a" });
    const denganS = run({ C1: "a", C2: "a", C3: "a", S1: "a" });
    assert.equal(tanpaS.outcome.kind === "tunggal" && tanpaS.outcome.category, "C");
    assert.deepEqual(tanpaS.outcome, denganS.outcome);
  });

  it("A1-4 keuangan tidak jelas, kanal banyak → Keuangan tidak tertutup jangkauan", () => {
    const r = run({ F1: "a", F2: "a", F3: "b", A1: "d", A2: "d" });
    assert.equal(r.outcome.kind === "tunggal" && r.outcome.category, "F");
  });

  it("A1-5 dua skor terendah selisih ≤10 → belum jelas, dua area", () => {
    // F = 0, M = 0 (simulasi 3 dokumen)
    const r = run({ F1: "a", F2: "a", F3: "a", M1: "a", M2: "a", M3: "a" });
    assert.deepEqual(r.outcome, { kind: "belum-jelas", reason: "selisih", areas: ["F", "M"] });
  });

  it("A1-5b selisih tepat 10 → belum jelas; 11 → tunggal", () => {
    const base = run({}).scores;
    const mk = (f: number, m: number) =>
      base.map((s) => ({ ...s, score: s.key === "F" ? f : s.key === "M" ? m : 100 }));
    assert.equal(decide(mk(20, 30)).kind, "belum-jelas");
    assert.deepEqual(decide(mk(20, 31)), { kind: "tunggal", category: "F", delta: 11 });
  });

  it("A1-6 kategori bersaing kurang dari separuh jawaban valid → belum jelas (data), bukan bottleneck", () => {
    // R: dua-duanya "Belum tahu" → valid 0 dari 2; M paling rendah tapi tidak boleh jadi tunggal
    const r = run({ R1: "x", R2: "x", M1: "a", M2: "a", M3: "a" });
    assert.deepEqual(r.outcome, { kind: "belum-jelas", reason: "data", areas: ["R", "M"] });
  });

  it("satu 'Belum tahu' di kategori 2 soal masih cukup (valid = separuh)", () => {
    const r = run({ R1: "x" });
    assert.equal(r.scores.find((s) => s.key === "R")?.insufficient, false);
  });
});

describe("pendorong (AC-04-03)", () => {
  it("mencatat jawaban berbobot ≤40 dan 'Belum tahu', terburuk dulu", () => {
    const r = run({ M1: "b", M2: "a", M3: "x" });
    assert.deepEqual(
      r.drivers.M.map((d) => d.questionId),
      ["M3", "M2", "M1"],
    );
  });
});
