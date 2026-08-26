import Image from "next/image";
import { projects } from "@/content";
import type { Project } from "@/content";
import { Section } from "@/components/section";

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <li className="reveal-on-scroll border-b border-rule py-8 first:border-t">
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
          sizes="(min-width: 768px) 704px, 100vw"
          className="mt-6 h-auto w-full border border-rule"
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

  return (
    <Section id="selected-work" title="Selected work">
      <ol className="mt-2">
        {featured.map((project, index) => (
          <ProjectEntry key={project.slug} project={project} index={index} />
        ))}
      </ol>
    </Section>
  );
}
