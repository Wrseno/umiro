/**
 * Status diagnosis untuk CTA dinamis — baca SAJA, tidak menulis.
 *
 * Lapisan: `lib` (I/O `localStorage`, tanpa impor komponen/app).
 * Kontrak kunci mengikuti unit 002 (`umiro.survey.v<V>`,
 * `umiro.diagnosis.v<V>`); cek eksistensi prefix + JSON valid.
 * Pencocokan versi katalog ketat menyusul gate katalog (tasks 002).
 */

const PREFIXES = ["umiro.survey.v", "umiro.diagnosis.v"];

/** Event tab-sama; event `storage` bawaan hanya terpicu dari tab lain. */
export const DIAGNOSIS_STATUS_EVENT = "umiro:diagnosis-status";

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

/** Langganan perubahan status (tab lain + tab sama) untuk `useSyncExternalStore`. */
export function subscribeDiagnosisStatus(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(DIAGNOSIS_STATUS_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(DIAGNOSIS_STATUS_EVENT, onChange);
  };
}

/** Dipanggil penulis (unit 002/003) setelah menulis/menghapus hasil di tab ini. */
export function notifyDiagnosisStatusChange(): void {
  window.dispatchEvent(new Event(DIAGNOSIS_STATUS_EVENT));
}
