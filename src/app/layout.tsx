import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { profile } from "@/content";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { SITE_URL } from "@/lib/site";
import { PersonJsonLd } from "@/components/person-jsonld";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
  // No custom `fallback`: supplying one suppresses the metric-adjusted
  // fallback face next/font would otherwise generate, which is what keeps
  // layout from shifting when the real font swaps in.
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
  // No custom `fallback`: supplying one suppresses the metric-adjusted
  // fallback face next/font would otherwise generate, which is what keeps
  // layout from shifting when the real font swaps in.
});

const siteTitle = `${profile.name} | ${profile.headline}`;

export const metadata: Metadata = {
  // Makes every relative URL below absolute, including the generated OG image.
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: `%s · ${profile.name}`,
  },
  description: profile.metaDescription,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title: siteTitle,
    description: profile.metaDescription,
    // images is populated automatically from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: profile.metaDescription,
    // No `site`/`creator`: there is no X handle on record, and inventing one
    // would attribute the card to someone else's account.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the init script below mutates <html> before
    // React hydrates, so server and client markup differ here by design.
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <PersonJsonLd />
      </head>
      <body>
        {/* First tab stop on every page: lets a keyboard user jump past the
            theme control and the header links straight into the sections. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:bg-accent focus:px-4 focus:py-2 focus:font-condensed focus:text-label focus:text-ground focus:uppercase"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
