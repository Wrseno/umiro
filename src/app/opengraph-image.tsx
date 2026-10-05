import { ImageResponse } from "next/og";
import { NAV, SITE } from "@/content";

/** Gambar pratinjau sosial dibuat saat build — tanpa domain luar. */
export const alt = SITE.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#f4f7f5",
          color: "#101915",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "#047857",
            }}
          />
          <div style={{ fontSize: 44, fontWeight: 700 }}>{NAV.brand}</div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 960,
          }}
        >
          {SITE.ogHeadline}
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#4a5950", maxWidth: 920 }}>
          {SITE.description}
        </div>
      </div>
    ),
    size,
  );
}
