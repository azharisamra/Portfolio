import type { MetadataRoute } from "next";
import { profile } from "@/content";
import { OG_COLORS } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.headline}`,
    // Derived, not hard-coded: manifests want a short label.
    short_name: profile.name.split(" ")[0],
    description: profile.metaDescription,
    start_url: "/",
    display: "standalone",
    background_color: OG_COLORS.ground,
    theme_color: OG_COLORS.ground,
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
