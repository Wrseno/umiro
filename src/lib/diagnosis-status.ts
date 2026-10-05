/**
 * Status diagnosis untuk CTA dinamis — baca SAJA, tidak menulis.
 *
 * Lapisan: `lib` (I/O `localStorage`, tanpa impor komponen/app).
 * Kontrak kunci mengikuti unit 002 (`umiro.survey.v<V>`,
 * `umiro.diagnosis.v<V>`); cek eksistensi prefix + JSON valid.
 * Pencocokan versi katalog ketat menyusul gate katalog (tasks 002).
 */

const PREFIXES = ["umiro.survey.v", "umiro.diagnosis.v"];

function hasPayload(prefix: string): boolean {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const raw = localStorage.getItem(key);
        if (raw) {
          JSON.parse(raw);
          return true;
        }
      }
    }
  } catch {
    return false;
  }
  return false;
}

/** `true` bila ada hasil survey/diagnosis valid di browser ini. */
export function hasValidResult(): boolean {
  if (typeof window === "undefined") return false;
  return PREFIXES.some(hasPayload);
}
