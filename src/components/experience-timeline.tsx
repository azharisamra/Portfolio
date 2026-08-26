import { experience } from "@/content";
import { formatRange } from "@/lib/format";
import { Section } from "@/components/section";

export function ExperienceTimeline() {
  return (
    <Section id="experience" title="Experience">
      <ol className="timeline mt-2">
        {experience.map((role) => {
          const isCurrent = role.endDate === null;

          return (
            <li
              key={`${role.company}-${role.startDate}`}
              className="timeline-row reveal-on-scroll py-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-condensed text-label text-muted uppercase tabular-nums">
                  {formatRange(role.startDate, role.endDate)}
                </span>
                {isCurrent ? (
                  <span className="bg-accent px-2 py-0.5 font-condensed text-label text-ground uppercase">
                    Current
                  </span>
                ) : null}
              </div>

              <h3 className="mt-2 font-condensed text-lead uppercase">
                {role.title}
              </h3>
              <p className="text-meta text-ink">
                {role.company} · {role.location}
              </p>

              <ul className="mt-3 max-w-none list-disc space-y-1 pl-5 text-meta text-muted">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
