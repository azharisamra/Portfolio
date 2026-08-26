import { ImageResponse } from "next/og";
import { profile } from "@/content";
import { OG_COLORS } from "@/lib/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Monogram favicon: accent ground, first initial from the content layer. */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: OG_COLORS.accent,
        color: OG_COLORS.ground,
        fontSize: 22,
        fontWeight: 700,
      }}
    >
      {profile.name.charAt(0).toUpperCase()}
    </div>,
    size,
  );
}
