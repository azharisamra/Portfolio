import { readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  profile,
  sectionLinks,
  experience,
  projects,
  education,
  certifications,
  skills,
} from "@/content";

/**
 * These guard the claims on the page, not the rendering.
 *
 * The failure mode they exist for: a placeholder URL, a half-filled entry, or
 * a project dated differently from the repository it links to reaching
 * production because nothing checked it.
 */

const PLACEHOLDER =
  /example\.(com|org|test)|localhost|your-domain|lorem ipsum|TODO|TBD/i;

describe("profile", () => {
  it("has no placeholder text in any field", () => {
    for (const [key, value] of Object.entries(profile)) {
      if (typeof value === "string" && value.length > 0) {
        expect(value, `profile.${key}`).not.toMatch(PLACEHOLDER);
      }
    }
  });

  it("exposes a usable email and absolute social URLs", () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.\w+$/);
    expect(profile.githubUrl).toMatch(/^https:\/\//);
    expect(profile.linkedinUrl).toMatch(/^https:\/\//);
  });

  it("states no year count, which would be unverifiable from this site", () => {
    expect(profile.bio).not.toMatch(/\d+\+?\s*years?/i);
    expect(profile.metaDescription).not.toMatch(/\d+\+?\s*years?/i);
  });
});

describe("projects", () => {
  it("never ships a placeholder link", () => {
    for (const project of projects) {
      for (const url of [project.liveUrl, project.repoUrl]) {
        if (url.length > 0) {
          expect(url, project.slug).toMatch(/^https:\/\//);
          expect(url, project.slug).not.toMatch(PLACEHOLDER);
        }
      }
    }
  });

  it("gives every featured project something to click", () => {
    for (const project of projects.filter((p) => p.featured)) {
      expect(
        project.liveUrl.length + project.repoUrl.length,
        `${project.slug} has no live or repo link`,
      ).toBeGreaterThan(0);
    }
  });

  it("uses unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("describes the problem without naming a technology", () => {
    // The problem line is meant to read as a human problem, not a stack list.
    const tech =
      /\b(react|next\.?js|node|typescript|tailwind|firebase|framer)\b/i;
    for (const project of projects) {
      expect(project.problem, project.slug).not.toMatch(tech);
    }
  });

  it("gives every image explicit dimensions and real alt text", () => {
    for (const project of projects) {
      if (!project.image) continue;
      expect(project.image.src, project.slug).toMatch(/^\/images\/.+\.webp$/);
      expect(project.image.width, project.slug).toBeGreaterThan(0);
      expect(project.image.height, project.slug).toBeGreaterThan(0);
      expect(project.image.alt.length, project.slug).toBeGreaterThan(40);
    }
  });
});

describe("experience", () => {
  it("marks exactly one current role", () => {
    expect(experience.filter((r) => r.endDate === null)).toHaveLength(1);
  });

  it("puts the current role first", () => {
    expect(experience[0]?.endDate).toBeNull();
  });

  it("gives every role at least one bullet", () => {
    for (const role of experience) {
      expect(role.bullets.length, role.company).toBeGreaterThan(0);
    }
  });

  it("starts every bullet with a capital letter and ends with a full stop", () => {
    for (const role of experience) {
      for (const bullet of role.bullets) {
        expect(bullet[0], bullet).toBe(bullet[0]?.toUpperCase());
        expect(bullet.endsWith("."), bullet).toBe(true);
      }
    }
  });
});

describe("education and certifications", () => {
  it("has complete education entries", () => {
    for (const item of education) {
      expect(item.degree.length).toBeGreaterThan(0);
      expect(item.institution.length).toBeGreaterThan(0);
      expect(item.year).toMatch(/^\d{4}$/);
    }
  });

  it("only links a credential when the URL is real", () => {
    for (const cert of certifications) {
      if (cert.credentialUrl !== undefined) {
        expect(cert.credentialUrl, cert.name).toMatch(/^https:\/\//);
        expect(cert.credentialUrl, cert.name).not.toMatch(PLACEHOLDER);
      }
    }
  });
});

describe("house style", () => {
  const DASHES = /[\u2014\u2013]/;

  it("uses no em or en dashes in any visible string", () => {
    const strings: [string, string][] = [
      ...Object.entries(profile).map(
        ([k, v]) => [`profile.${k}`, String(v)] as [string, string],
      ),
      ...projects.flatMap((p) => [
        [`${p.slug}.problem`, p.problem] as [string, string],
        [`${p.slug}.description`, p.description] as [string, string],
        [`${p.slug}.timeframe`, p.timeframe] as [string, string],
      ]),
      ...experience.flatMap((r) =>
        r.bullets.map((b) => [r.company, b] as [string, string]),
      ),
      ...education.map((e) => [e.degree, e.institution] as [string, string]),
      ...certifications.map((c) => [c.name, c.issuer] as [string, string]),
    ];
    for (const [where, value] of strings) {
      expect(value, where).not.toMatch(DASHES);
    }
  });
});

describe("skills", () => {
  it("has no empty groups and no duplicated entries", () => {
    const seen = new Set<string>();
    for (const group of skills) {
      expect(group.items.length, group.category).toBeGreaterThan(0);
      for (const item of group.items) {
        expect(seen.has(item), `${item} listed twice`).toBe(false);
        seen.add(item);
      }
    }
  });
});

describe("pinned project viewer", () => {
  // globals.css hard-codes .work-card-1..3 / .work-shot-1..3 and a
  // timeline-scope naming --work-1..3. A fourth featured project with a
  // screenshot would render with no timeline and never appear in the panel, so
  // fail here rather than silently.
  it("has exactly three featured projects carrying a screenshot", () => {
    const shots = projects.filter(
      (project) => project.featured && project.image,
    );
    expect(shots).toHaveLength(3);
  });

  // The two variants occupy the same box and swap with display, so a size
  // mismatch would change the layout when the reader flips the theme.
  it("gives every dark screenshot the same dimensions as its light one", () => {
    for (const project of projects) {
      if (!project.imageDark) continue;
      expect(project.image).toBeDefined();
      expect(project.imageDark.width).toBe(project.image?.width);
      expect(project.imageDark.height).toBe(project.image?.height);
    }
  });

  it("never pairs a dark screenshot with a missing light one", () => {
    for (const project of projects) {
      if (project.imageDark) expect(project.image).toBeDefined();
    }
  });
});

describe("hero section index", () => {
  // Reads the component sources rather than rendering: a link in the hero that
  // points at an id no section renders any more would scroll nowhere, and that
  // is exactly the failure a refactor causes silently.
  const rendered = (() => {
    const dir = new URL("../components/", import.meta.url);
    const files = readdirSync(dir).filter((f) => f.endsWith(".tsx"));
    const ids = new Set<string>();
    for (const file of files) {
      const src = readFileSync(new URL(file, dir), "utf8");
      for (const m of src.matchAll(/<Section\s+id="([^"]+)"/g)) ids.add(m[1]);
    }
    return ids;
  })();

  it("points every index link at a section the page actually renders", () => {
    for (const link of sectionLinks) {
      expect(rendered.has(link.id), `no <Section id="${link.id}">`).toBe(true);
    }
  });

  it("lists every rendered section", () => {
    const linked = new Set(sectionLinks.map((l) => l.id));
    for (const id of rendered) {
      expect(linked.has(id), `section "${id}" is missing from the index`).toBe(
        true,
      );
    }
  });
});
