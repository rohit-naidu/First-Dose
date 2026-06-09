import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "First Dose Health · precision medicine, before the first dose";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0e14",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#7fb5c9",
            }}
          />
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#c97f7f",
            }}
          />
          <span style={{ color: "rgba(240,244,248,0.55)", fontSize: 28 }}>
            First Dose Health
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#f0f4f8",
              fontSize: 64,
              fontWeight: 300,
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            Medicine has been built for the average patient.
          </span>
          <span style={{ color: "#c97f7f", fontSize: 38, marginTop: 16 }}>
            There is no average patient.
          </span>
        </div>

        <span style={{ color: "rgba(240,244,248,0.35)", fontSize: 24 }}>
          Precision drug-response prediction · Starting with GLP-1s
        </span>
      </div>
    ),
    size
  );
}
