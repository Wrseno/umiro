import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { SURVEY_CATALOG } from "../content/survey.ts";
import { diagnosisKey, loadSurvey, saveSurvey, surveyKey } from "./survey-storage.ts";

class MemoryStorage implements Storage {
  private map = new Map<string, string>();
  failWrites = false;
  get length() {
    return this.map.size;
  }
  key(i: number) {
    return [...this.map.keys()][i] ?? null;
  }
  getItem(k: string) {
    return this.map.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    if (this.failWrites) throw new Error("QuotaExceeded");
    this.map.set(k, v);
  }
  removeItem(k: string) {
    this.map.delete(k);
  }
  clear() {
    this.map.clear();
  }
}

const LENGKAP = Object.fromEntries(SURVEY_CATALOG.questions.map((q) => [q.id, q.options[0].id]));
const V = SURVEY_CATALOG.version;

describe("survey-storage (ADR-003)", () => {
  it("simpan → baca ulang: jawaban + hasil dihitung ulang (AC-03-01/03, AC-04-01)", () => {
    const s = new MemoryStorage();
    assert.equal(saveSurvey(LENGKAP, SURVEY_CATALOG, s), true);
    assert.ok(s.getItem(surveyKey(V)));
    assert.ok(s.getItem(diagnosisKey(V)));
    const r = loadSurvey(SURVEY_CATALOG, s);
    assert.equal(r.status, "ok");
    assert.deepEqual(r.status === "ok" && r.answers, LENGKAP);
  });

  it("jawaban belum lengkap tidak disimpan (AC-02-05)", () => {
    const s = new MemoryStorage();
    const { F1, ...kurang } = LENGKAP;
    void F1;
    assert.equal(saveSurvey(kurang, SURVEY_CATALOG, s), false);
    assert.equal(s.length, 0);
  });

  it("gagal tulis → false, tanpa sisa setengah jadi (AC-03-02)", () => {
    const s = new MemoryStorage();
    s.failWrites = true;
    assert.equal(saveSurvey(LENGKAP, SURVEY_CATALOG, s), false);
    assert.equal(s.length, 0);
  });

  it("payload rusak → status rusak + kunci dihapus (AC-04-08)", () => {
    const s = new MemoryStorage();
    s.setItem(surveyKey(V), "{rusak");
    s.setItem(diagnosisKey(V), "{}");
    assert.equal(loadSurvey(SURVEY_CATALOG, s).status, "rusak");
    assert.equal(s.length, 0);
  });

  it("jawaban dengan opsi tak dikenal → rusak", () => {
    const s = new MemoryStorage();
    s.setItem(surveyKey(V), JSON.stringify({ catalogVersion: V, answers: { ...LENGKAP, F1: "zz" }, savedAt: "x" }));
    assert.equal(loadSurvey(SURVEY_CATALOG, s).status, "rusak");
  });

  it("versi katalog lain dibuang, tidak dibaca", () => {
    const s = new MemoryStorage();
    s.setItem("umiro.survey.v0", JSON.stringify({ catalogVersion: 0, answers: LENGKAP, savedAt: "x" }));
    assert.equal(loadSurvey(SURVEY_CATALOG, s).status, "rusak");
    assert.equal(s.getItem("umiro.survey.v0"), null);
  });

  it("kosong → kosong", () => {
    assert.equal(loadSurvey(SURVEY_CATALOG, new MemoryStorage()).status, "kosong");
  });
});
