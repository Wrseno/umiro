import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ROADMAP } from "../content/roadmap.ts";

const allText = JSON.stringify(ROADMAP);

describe("ROADMAP — PRD Lampiran C + AC-06", () => {
  it("tiga tahap Survival/Improvement/Growth, masing-masing 5 butir (15 total)", () => {
    assert.deepEqual(
      ROADMAP.tahap.map((t) => t.id),
      ["survival", "improvement", "growth"],
    );
    for (const t of ROADMAP.tahap) assert.equal(t.items.length, 5, t.id);
  });

  it("AC-06-01/02: keempat lever dipakai, bukan pemasaran saja", () => {
    const used = new Set(ROADMAP.tahap.flatMap((t) => t.items.map((i) => i.lever)));
    assert.deepEqual([...used].sort(), ["jangkauan", "kapasitas", "margin", "retensi"]);
  });

  it("tiap butir punya cara dan contoh", () => {
    for (const t of ROADMAP.tahap)
      for (const i of t.items) {
        assert.ok(i.cara.length > 20, i.judul);
        assert.ok(i.contoh.length > 20, i.judul);
      }
  });

  it("AC-06-04: tanpa bahasa janji", () => {
    const forbidden = [/\bpasti\b/i, /\bdijamin\b/i, /\bjaminan\b/i, /\bnaik\s+\d+\s*%/i, /\bpasti untung\b/i];
    for (const re of forbidden) assert.doesNotMatch(allText, re);
  });
});
