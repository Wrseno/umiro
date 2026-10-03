import { NextResponse } from "next/server";
import { selectPriorityActions, type PriorityActions } from "@/lib/actions";
import { diagnose, IncompleteAnswersError } from "@/lib/diagnosis";
import type { Answers, Diagnosis } from "@/lib/types";

/**
 * POST /api/diagnosis — menghitung diagnosis dari jawaban survei.
 *
 * Perhitungan dijalankan di sisi peladen, bukan di peramban, sehingga
 * tahap dan titik mentok yang tersimpan tidak dapat dimanipulasi dari sisi
 * klien (PRD Bagian 13.3 butir 3).
 *
 * Penyimpanan ke basis data menyusul begitu `DATABASE_URL` tersedia;
 * yang perlu ditambahkan hanya satu panggilan repositori di sini, tanpa
 * mengubah bentuk tanggapan maupun halaman yang memakainya.
 */

export interface DiagnosisResponse {
  diagnosis: Diagnosis;
  priority: PriorityActions;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Jawaban tidak terbaca. Coba ulangi survei." },
      { status: 400 },
    );
  }

  const answers = (body as { answers?: Answers } | null)?.answers;
  if (!answers || typeof answers !== "object") {
    return NextResponse.json(
      { error: "Jawaban tidak terbaca. Coba ulangi survei." },
      { status: 400 },
    );
  }

  try {
    const diagnosis = diagnose(answers);
    const payload: DiagnosisResponse = {
      diagnosis,
      priority: selectPriorityActions(diagnosis),
    };
    return NextResponse.json(payload);
  } catch (error) {
    if (error instanceof IncompleteAnswersError) {
      return NextResponse.json(
        {
          error: "Masih ada pertanyaan yang belum dijawab.",
          missing: error.missing,
        },
        { status: 400 },
      );
    }
    throw error;
  }
}
