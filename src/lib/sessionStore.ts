"use client";

import { useSyncExternalStore } from "react";

/**
 * Penyimpanan sesi sebagai sumber data di luar React.
 *
 * Dibungkus agar dapat dibaca lewat `useSyncExternalStore` — jalur yang
 * memang disediakan React untuk sumber luar — sehingga tidak perlu
 * menyetel state di dalam effect, dan tidak terjadi ketidakcocokan saat
 * halaman dihidrasi (pada peladen nilainya selalu `null`).
 *
 * Penyimpanan ini bersifat sementara. Ketika basis data Neon tersedia,
 * modul inilah yang ditukar, bukan halaman-halamannya.
 */

const EVENT = "nk:session-change";
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeSession(listener: () => void): () => void {
  listeners.add(listener);
  // Perubahan dari tab lain juga perlu terbaca.
  const onStorage = () => listener();
  window.addEventListener("storage", onStorage);
  window.addEventListener(EVENT, onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(EVENT, onStorage);
  };
}

export function writeSession(key: string, value: unknown): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Mode penyamaran atau kuota penuh — abaikan, jangan sampai menghentikan
    // pengisian yang sedang berjalan.
  }
  emit();
}

export function clearSession(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* lihat catatan pada writeSession */
  }
  emit();
}

const serverSnapshot = () => null;

/** Membaca satu kunci sebagai teks mentah. `null` di peladen. */
export function useSessionRaw(key: string): string | null {
  return useSyncExternalStore(
    subscribeSession,
    () => sessionStorage.getItem(key),
    serverSnapshot,
  );
}

/** Membaca satu kunci dan menguraikannya. `null` bila kosong atau rusak. */
export function parseSession<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export const KEY_ANSWERS = "nk_answers";
export const KEY_DIAGNOSIS = "nk_diagnosis";
/**
 * Peta jalan yang sudah disusun. Disimpan agar halaman Peta Jalan tidak
 * memanggil model ulang setiap kali pengguna berpindah tab dan kembali —
 * satu pengisian survei cukup menghasilkan satu peta jalan.
 */
export const KEY_ROADMAP = "nk_roadmap";
