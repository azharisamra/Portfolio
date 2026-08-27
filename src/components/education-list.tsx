import { education } from "@/content";
import { Section } from "@/components/section";

export function EducationList() {
  return (
    <Section id="education" title="Education">
      <ol className="mt-2">
        {education.map((item) => (
          <li
            key={item.degree}
            className="rule-row reveal-on-scroll grid gap-1 py-5 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-6"
          >
            <span className="font-condensed text-label text-muted uppercase tabular-nums">
              {item.year}
            </span>
            <div>
              <h3 className="font-condensed text-lead uppercase">
                {item.degree}
              </h3>
              <p className="text-meta text-accent">
                {item.institution} · {item.location}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
