import { describe, expect, it } from "vitest";
import {
  profile,
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
