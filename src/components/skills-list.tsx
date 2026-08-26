import { skills } from "@/content";
import { Section } from "@/components/section";

export function SkillsList() {
  return (
    <Section id="skills" title="Skills">
      {/* A description list, not a logo grid: each category is the term and
          its technologies are the definition. */}
      <dl className="mt-2">
        {skills.map((group) => (
          <div
            key={group.category}
            className="reveal-on-scroll grid gap-1 border-b border-rule py-4 first:border-t sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6"
          >
            <dt className="font-condensed text-label text-muted uppercase">
              {group.category}
            </dt>
            <dd className="max-w-none text-body">{group.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
