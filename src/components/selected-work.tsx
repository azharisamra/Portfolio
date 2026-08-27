import Image from "next/image";
import { projects } from "@/content";
import type { Project } from "@/content";
import { Section } from "@/components/section";

/**
 * Card and panel deliberately share one `sizes`. At 1024px and up both copies
 * of a screenshot are in the document at once - the panel's visible, the
 * card's clipped to a pixel for screen readers - and a matching `sizes` makes
 * them resolve to the same srcset candidate, so the file is fetched once.
 */
const SHOT_SIZES = "(min-width: 1024px) 38vw, (min-width: 768px) 704px, 100vw";

/**
 * Written out rather than built from the index so the class names are literal
 * in the source. Each entry pairs a card with the panel image it drives; the
 * matching `view-timeline-name` and `animation-timeline` rules live in
 * globals.css. content.test.ts asserts the count still matches.
 */
const CARD_CLASS = ["work-card-1", "work-card-2", "work-card-3"] as const;
const SHOT_CLASS = ["work-shot-1", "work-shot-2", "work-shot-3"] as const;

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const timelineClass = CARD_CLASS[index] ?? "";

  return (
    <li
      className={`${timelineClass} reveal-on-scroll border-b border-rule py-8 first:border-t`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-condensed text-label text-accent">{number}</span>
        <span className="font-condensed text-label text-muted uppercase tabular-nums">
          {project.timeframe}
        </span>
      </div>

      <h3 className="mt-2 font-condensed text-section uppercase">
        {project.title}
      </h3>

      <p className="mt-3 text-lead text-ink">{project.problem}</p>

      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes={SHOT_SIZES}
          className="work-card-shot mt-6 h-auto w-full border border-rule"
        />
      ) : null}

      <p className="mt-6 text-meta text-muted">{project.description}</p>

      <p className="mt-4 font-condensed text-label text-muted uppercase">
        {project.stack.join(" · ")}
      </p>

      {project.liveUrl || project.repoUrl ? (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3 font-condensed text-lead text-ground uppercase no-underline"
            >
              View live site
              <span aria-hidden="true">→</span>
            </a>
          ) : null}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-condensed text-label text-muted uppercase"
            >
              Source code
            </a>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

export function SelectedWork() {
  const featured = projects.filter((project) => project.featured);
  const shots = featured.flatMap((project) =>
    project.image ? [{ slug: project.slug, image: project.image }] : [],
  );

  return (
    <Section id="selected-work" title="Selected work" wide>
      <div className="work-viewer">
        {/* Presentational. The accessible copy of every screenshot stays in its
            own card, next to the heading and description it belongs to, so a
            screen reader hears it in context rather than as three loose images
            stacked in a panel. */}
        <div className="work-panel" aria-hidden="true">
          {shots.map((shot, index) => (
            <Image
              key={shot.slug}
              src={shot.image.src}
              alt=""
              width={shot.image.width}
              height={shot.image.height}
              sizes={SHOT_SIZES}
              className={`work-shot ${SHOT_CLASS[index] ?? ""}`}
            />
          ))}
        </div>

        <ol className="mt-2">
          {featured.map((project, index) => (
            <ProjectEntry key={project.slug} project={project} index={index} />
          ))}
        </ol>
      </div>
    </Section>
  );
}
