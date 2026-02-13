import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ectyre";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "serif",
          letterSpacing: "-0.02em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* Simplified E logo mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "200px",
              height: "200px",
              borderRadius: "40px",
              background: "white",
              color: "black",
              fontSize: "140px",
              fontWeight: "bold",
            }}
          >
            E
          </div>
          <div style={{ fontSize: "80px", fontWeight: 700 }}>ectyre</div>
          <div style={{ fontSize: "28px", color: "#888", fontWeight: 400 }}>
            ectyre.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
