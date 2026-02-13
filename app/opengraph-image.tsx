import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

export const alt = "ectyre";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const svgContent = readFileSync(
    join(process.cwd(), "public", "logo1.svg"),
    "utf-8"
  );
  const svgBase64 = Buffer.from(svgContent).toString("base64");
  const svgDataUri = `data:image/svg+xml;base64,${svgBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={svgDataUri} width="420" height="420" />
      </div>
    ),
    {
      ...size,
    }
  );
}
