import { ImageResponse } from "next/og";
import { profile } from "@/content";
import { OG_COLORS } from "@/lib/site";
import { displayUrl } from "@/lib/format";

export const alt = `${profile.name} | ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Every string below comes from the content layer, so the card cannot drift
// out of sync with the page.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: OG_COLORS.ground,
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: OG_COLORS.muted,
          }}
        >
          {profile.location}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 92,
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: -1,
            textTransform: "uppercase",
            color: OG_COLORS.ink,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 40,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: OG_COLORS.accent,
          }}
        >
          {profile.headline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: `2px solid ${OG_COLORS.rule}`,
          paddingTop: 28,
          fontSize: 26,
          color: OG_COLORS.muted,
        }}
      >
        <div style={{ display: "flex" }}>{displayUrl(profile.githubUrl)}</div>
        <div style={{ display: "flex" }}>{profile.email}</div>
      </div>
    </div>,
    size,
  );
}
