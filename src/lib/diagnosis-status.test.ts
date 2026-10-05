import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  hasValidResult,
  notifyDiagnosisStatusChange,
  subscribeDiagnosisStatus,
} from "./diagnosis-status.ts";

class MemoryStorage {
  private map = new Map<string, string>();
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
    this.map.set(k, v);
  }
  clear() {
    this.map.clear();
  }
}

const g = globalThis as Record<string, unknown>;
const storage = new MemoryStorage();

describe("hasValidResult", () => {
  beforeEach(() => {
    storage.clear();
    g.localStorage = storage;
    g.window = new EventTarget();
  });
  afterEach(() => {
    delete g.localStorage;
    delete g.window;
  });

  it("false tanpa window (SSR)", () => {
    delete g.window;
    storage.setItem("umiro.survey.v1", "{}");
    assert.equal(hasValidResult(), false);
  });

  it("false bila storage kosong", () => {
    assert.equal(hasValidResult(), false);
  });

  it("true bila ada hasil survey atau diagnosis ber-JSON valid", () => {
    storage.setItem("umiro.diagnosis.v1", '{"faktor":"margin"}');
    assert.equal(hasValidResult(), true);
  });

  it("abaikan kunci di luar prefix", () => {
    storage.setItem("umiro.calc.v1", "{}");
    storage.setItem("lain", "{}");
    assert.equal(hasValidResult(), false);
  });

  it("false bila payload rusak", () => {
    storage.setItem("umiro.survey.v1", "{rusak");
    assert.equal(hasValidResult(), false);
  });
});

describe("subscribeDiagnosisStatus", () => {
  beforeEach(() => {
    g.window = new EventTarget();
  });
  afterEach(() => {
    delete g.window;
  });

  it("terpicu oleh notify tab-sama dan berhenti setelah unsubscribe", () => {
    let calls = 0;
    const unsubscribe = subscribeDiagnosisStatus(() => calls++);
    notifyDiagnosisStatusChange();
    assert.equal(calls, 1);
    unsubscribe();
    notifyDiagnosisStatusChange();
    assert.equal(calls, 1);
  });
});
