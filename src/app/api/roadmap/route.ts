import { NextResponse } from "next/server";
import { ACTIONS } from "@/lib/actions";
import { diagnose, IncompleteAnswersError } from "@/lib/diagnosis";
import {
  buildRoadmap,
  extractJsonObject,
  FALLBACK_TIPS,
  normalizeRoadmap,
  roadmapContext,
  ROADMAP_SCHEMA,
  type Roadmap,
} from "@/lib/roadmap";
import type { Answers, Diagnosis } from "@/lib/types";

/**
 * POST /api/roadmap — menyusun peta jalan dinamis dari jawaban survei.
 *
 * Alurnya sengaja mengulang perhitungan, bukan menerima diagnosis dari
 * peramban: badan permintaan hanya memuat jawaban mentah, lalu tahap dan
 * titik mentok dihitung ulang di sini. Dengan begitu peta jalan tidak bisa
 * dipaksa ke kelas lain dengan menyunting penyimpanan sesi (PRD Bagian
 * 13.3 butir 3) — alasan yang sama dengan `/api/diagnosis`.
 *
 * Penyusunnya memakai model gratis di OpenRouter. Kunci dibaca dari
 * `OPENROUTER_API_KEY`, tanpa awalan `NEXT_PUBLIC_`, sehingga tidak pernah
 * sampai ke peramban. Tanpa kunci, rute ini tetap menjawab 200 dengan peta
 * jalan hasil aturan; antarmuka membedakan keduanya lewat ruas `source`.
 */

/** Model gratis bisa lambat, terutama yang menalar sebelum menjawab. */
export const maxDuration = 60;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Rantai model, seluruhnya berjenjang gratis (`:free`) dan mendukung
 * structured output. OpenRouter mencoba berurutan dan pindah ke berikutnya
 * bila satu model menolak, kehabisan kuota, atau sedang tidak tersedia —
 * keadaan yang sering terjadi pada jenjang gratis.
 *
 * Diperiksa pada 3 Oktober 2026 lewat `GET /api/v1/models`. Katalog gratis
 * OpenRouter berubah cukup sering, jadi bila seluruh rantai gagal dan
 * peta jalan selalu jatuh ke aturan, periksa dahulu apakah id-id ini masih
 * ada sebelum menduga ada kesalahan pada kode.
 *
 * Entri terakhir adalah perute bawaan OpenRouter yang memilih sendiri dari
 * model gratis yang tersedia; ia tidak pernah kedaluwarsa, sehingga
 * berfungsi sebagai jaring pengaman ketika id di atasnya hilang.
 */
const MODELS = [
  "nvidia/nemotron-3-super-120b-a12b:free",
  "qwen/qwen3.8-27b:free",
  "dots-studio/dots-3-note-preview:free",
  "openrouter/free",
];

/** Jatah keluaran. Cukup lapang untuk empat fase berisi, tidak lebih. */
const MAX_TOKENS = 8000;

/**
 * Batas waktu satu permintaan. Lebih pendek dari `maxDuration` supaya
 * peladen masih punya waktu menyusun jalur cadangan dan menjawab 200,
 * bukan dipotong platform di tengah jalan.
 */
const TIMEOUT_MS = 45_000;

/**
 * Nada tulisan diatur di sini, bukan di dalam skema, karena ini urusan
 * keterbacaan dan bukan urusan bentuk data.
 *
 * Dua aturan terakhir menjaga janji produk: model tidak boleh menyentuh
 * penetapan tahap maupun titik mentok, dan setiap temuan negatif harus
 * disusul jalan keluar (PRD Bagian 12 risiko nomor 4).
 */
const SYSTEM_PROMPT = `Anda menyusun peta jalan pertumbuhan untuk pelaku usaha mikro di Indonesia — warung makan, toko kelontong, penjual kue, dan sejenisnya.

Pembacanya berdagang bertahun-tahun tanpa penghasilan yang meningkat, membaca di telepon genggam, dan tidak terbiasa dengan istilah bisnis.

Cara menulis:
- Bahasa Indonesia sehari-hari. Sapa pembaca dengan "Anda".
- Tanpa istilah teknis. Jangan pakai kata seperti HPP, margin, retensi, cash flow, funnel, atau branding. Tulis maksudnya: "biaya bahan per porsi", "untung per porsi", "pembeli yang kembali".
- Satu langkah berisi satu pekerjaan yang bisa dimulai hari ini, bukan proyek berminggu-minggu.
- Angka biaya dan waktu harus masuk akal untuk usaha bermodal kecil, dan harus menghormati dana serta waktu luang yang disebutkan pengguna.
- Setiap hal buruk yang Anda sebutkan harus langsung disusul jalan keluarnya. Jangan tinggalkan pembaca dengan temuan tanpa tindakan.

Batas wewenang Anda:
- Tahap dan titik mentok sudah ditetapkan aturan baku di luar Anda. Terima apa adanya. Jangan menilai ulang, jangan mengusulkan kelas lain, dan jangan menyebut bahwa pengguna mungkin berada di kelas yang berbeda.
- Fase harus tetap empat, berurutan Kelas 0 sampai Kelas 3, karena Kelas berikutnya memang mensyaratkan Kelas sebelumnya.
- Urutan prasyaratnya D1 keuangan, D2 harga, D3 pelanggan kembali, D4 kapasitas, D5 jangkauan. Jangan menyarankan menambah jangkauan sebelum keuangan dan harga beres: menambah pembeli ketika untung per porsi masih tipis hanya menambah lelah.

Jawab hanya dengan satu objek JSON sesuai skema yang diminta. Tanpa penjelasan di luar JSON, tanpa blok kode, tanpa komentar.`;

/**
 * Gambaran bentuk jawaban, ditulis ringkas di dalam prompt.
 *
 * Mengulang apa yang sudah dijamin `response_format` memang berlebihan
 * bagi model yang mematuhinya. Ini untuk keadaan sebaliknya: bila rantai
 * jatuh ke model yang mengabaikan skema, petunjuk inilah yang membuat
 * jawabannya masih bisa dinormalisasi alih-alih dibuang seluruhnya.
 */
const SHAPE_HINT = `{"summary":"...","phases":[{"stage":0,"headline":"...","nodes":[{"title":"...","why":"...","lever":"margin|retensi|jangkauan|kapasitas","cost":0,"minutesPerDay":10,"effort":"sendiri","steps":["...","...","..."],"tips":[{"kind":"prinsip|trik|peringatan","text":"..."}]}]}]}`;

/** Katalog tindakan sebagai bahan rujukan, bukan daftar yang wajib dipakai. */
function catalogBrief(): string {
  return ACTIONS.map(
    (a) =>
      `- [Kelas ${a.stage}, membenahi ${a.fixes}, tuas ${a.lever}] ${a.title} — ${a.why} (biaya Rp ${a.cost.toLocaleString("id-ID")}, ${a.minutesPerDay} menit/hari, ${a.effort})`,
  ).join("\n");
}

/** Contoh nada tips, satu per dimensi, supaya ragam klasifikasinya terbaca. */
function tipToneBrief(): string {
  return Object.entries(FALLBACK_TIPS)
    .map(([dimension, tips]) =>
      tips.map((t) => `- [${dimension}, ${t.kind}] ${t.text}`).join("\n"),
    )
    .join("\n");
}

function userPrompt(diagnosis: Diagnosis): string {
  return `Kondisi usaha yang sedang dibaca:

${roadmapContext(diagnosis)}

Katalog tindakan yang sudah teruji di lapangan. Pakai ini sebagai pijakan: ambil yang cocok, susun ulang kalimatnya agar menyebut kondisi usaha di atas, dan tambahkan langkah lain bila memang ada yang lebih tepat untuk kondisi ini.

${catalogBrief()}

Contoh nada tips yang dituju beserta klasifikasinya:

${tipToneBrief()}

Susun peta jalannya sekarang. Ketentuannya:
- Empat fase, Kelas 0 sampai Kelas 3.
- Fase Kelas ${diagnosis.stage} adalah tempat pengguna berada sekarang. Isi fase ini dengan langkah yang paling mendesak, dan taruh langkah yang membenahi ${diagnosis.bottleneck} di urutan pertama.
- Fase sebelum Kelas ${diagnosis.stage} sudah dilewati pengguna. Tulis langkahnya sebagai hal yang perlu dijaga agar tidak mundur, bukan sebagai pekerjaan baru.
- Fase sesudah Kelas ${diagnosis.stage} belum waktunya. Tulis singkat saja supaya pengguna tahu arahnya.
- Dua sampai empat langkah per fase. Tepat tiga langkah pelaksanaan pada setiap langkah. Dua sampai tiga tips pada setiap langkah, dan pakai ketiga klasifikasi secara berimbang di seluruh peta.

Bentuk jawabannya:
${SHAPE_HINT}`;
}

export interface RoadmapResponse {
  roadmap: Roadmap;
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

  let diagnosis: Diagnosis;
  try {
    diagnosis = diagnose(answers);
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

  const roadmap = await composeRoadmap(diagnosis);
  return NextResponse.json({ roadmap } satisfies RoadmapResponse);
}

/**
 * Menyusun peta jalan lewat model, dan jatuh ke aturan bila gagal.
 *
 * Kegagalan apa pun — kunci tidak ada, kuota jenjang gratis habis, seluruh
 * model dalam rantai menolak, jaringan putus, jawaban model tidak terbaca —
 * berakhir di peta jalan hasil aturan, bukan di pesan galat. Halaman ini
 * adalah keluaran utama produk; menampilkan layar kosong karena satu
 * layanan pihak ketiga sedang terganggu adalah kegagalan yang lebih besar
 * daripada menampilkan saran yang kurang disesuaikan.
 */
async function composeRoadmap(diagnosis: Diagnosis): Promise<Roadmap> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return buildRoadmap(diagnosis);

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Dipakai OpenRouter untuk atribusi pada papan peringkatnya.
        // Tidak memengaruhi jawaban, dan tidak memuat data pengguna.
        "X-Title": "Naik Kelas",
      },
      body: JSON.stringify({
        // Rantai cadangan OpenRouter, dipakai sebagai ganti ruas `model`
        // dan bukan pendampingnya. Dicoba berurutan sampai ada yang
        // menjawab; batas kuota, pemadaman, dan penolakan moderasi
        // semuanya memicu pindah ke entri berikutnya. Tanpa ini, satu
        // model gratis yang sedang penuh sudah cukup membuat peta jalan
        // jatuh ke aturan.
        models: MODELS,
        max_tokens: MAX_TOKENS,
        // Model penalar pada daftar ini bisa menghabiskan jatah keluaran
        // untuk menalar. Penalarannya dibuat ringan dan tidak diminta
        // kembali, karena yang dipakai halaman hanya JSON-nya.
        reasoning: { effort: "low", exclude: true },
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "roadmap",
            strict: true,
            schema: ROADMAP_SCHEMA,
          },
        },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt(diagnosis) },
        ],
      }),
    });

    if (!response.ok) {
      console.error(
        `[roadmap] OpenRouter menjawab ${response.status}:`,
        (await response.text()).slice(0, 500),
      );
      return buildRoadmap(diagnosis);
    }

    const payload = (await response.json()) as {
      choices?: { message?: { content?: unknown } }[];
      error?: { message?: string };
      /** Model yang akhirnya melayani permintaan, bukan yang diminta. */
      model?: string;
    };

    // Dicatat karena rantai cadangan membuat model yang melayani tidak
    // selalu yang pertama. Ketika hasilnya terasa aneh, inilah petunjuk
    // pertama untuk menilai apakah entri rantai perlu disusun ulang.
    if (payload.model) console.info("[roadmap] dilayani oleh", payload.model);

    // OpenRouter dapat menjawab 200 dengan galat di dalam badan, misalnya
    // ketika seluruh model dalam rantai menolak permintaan.
    if (payload.error) {
      console.error("[roadmap] OpenRouter:", payload.error.message);
      return buildRoadmap(diagnosis);
    }

    const content = payload.choices?.[0]?.message?.content;
    if (typeof content !== "string" || content.trim().length === 0) {
      console.error("[roadmap] jawaban model kosong");
      return buildRoadmap(diagnosis);
    }

    const parsed = extractJsonObject(content);
    if (parsed === null) {
      console.error("[roadmap] jawaban model bukan JSON:", content.slice(0, 300));
      return buildRoadmap(diagnosis);
    }

    return normalizeRoadmap(parsed, diagnosis);
  } catch (error) {
    // Dicatat di peladen supaya kegagalan tetap dapat dilacak, tanpa
    // menampilkan rinciannya kepada pengguna.
    console.error("[roadmap] penyusunan lewat model gagal:", error);
    return buildRoadmap(diagnosis);
  }
}
