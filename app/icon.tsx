import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Favicon: the brand mark on a transparent field (stays pink, reads on light and
// dark tab bars). Next.js sizes it automatically from `size`. Sourced from a PNG
// copy of the AVIF mark because the OG renderer does not decode AVIF.
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default async function Icon() {
  const mark = await readFile(join(process.cwd(), "public/brand/mark.png"));
  const src = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={src} width={96} height={96} alt="" />
      </div>
    ),
    size,
  );
}
