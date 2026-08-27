import Image from "next/image";
import { projects } from "@/content";
import type { Project, ProjectImage } from "@/content";
import { Section } from "@/components/section";

/**
 * One entry per screenshot a project renders. A project whose subject has both
 * themes yields two, tagged so CSS can show whichever matches the reader's
 * theme; every other project yields one, shown in both. The switch is class
 * driven, never prefers-color-scheme - see globals.css for why.
 */
function shotsFor(project: Project): { image: ProjectImage; theme: string }[] {
  if (!project.image) return [];
  if (!project.imageDark) return [{ image: project.image, theme: "" }];
  return [
    { image: project.image, theme: "shot-light" },
    { image: project.imageDark, theme: "shot-dark" },
  ];
}

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

      {shotsFor(project).map((shot) => (
        <Image
          key={shot.image.src}
          src={shot.image.src}
          alt={shot.image.alt}
          width={shot.image.width}
          height={shot.image.height}
          sizes={SHOT_SIZES}
          className={`work-card-shot ${shot.theme} mt-6 h-auto w-full border border-rule`}
        />
      ))}

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
  const panelShots = featured.flatMap((project, index) =>
    shotsFor(project).map((shot) => ({
      key: shot.image.src,
      image: shot.image,
      theme: shot.theme,
      shotClass: SHOT_CLASS[index] ?? "",
    })),
  );

  return (
    <Section id="selected-work" title="Selected work" wide>
      <div className="work-viewer">
        {/* Presentational. The accessible copy of every screenshot stays in its
            own card, next to the heading and description it belongs to, so a
            screen reader hears it in context rather than as three loose images
            stacked in a panel. */}
        <div className="work-panel" aria-hidden="true">
          {panelShots.map((shot) => (
            <Image
              key={shot.key}
              src={shot.image.src}
              alt=""
              width={shot.image.width}
              height={shot.image.height}
              sizes={SHOT_SIZES}
              className={`work-shot ${shot.shotClass} ${shot.theme}`}
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
