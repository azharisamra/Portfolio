import { profile } from "@/content";
import { SITE_URL } from "@/lib/site";

/**
 * Person structured data. Every value is read from the content layer, so it
 * cannot contradict what the page renders.
 *
 * Email is deliberately omitted: it is already a visible mailto link for
 * humans, and there is no reason to hand it to scrapers in machine-readable
 * form as well.
 */
export function PersonJsonLd() {
  const [locality, country] = profile.location.split(",").map((s) => s.trim());

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressCountry: country,
    },
    sameAs: [profile.githubUrl, profile.linkedinUrl],
  };

  return (
    <script
      type="application/ld+json"
      // Values are our own content, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
