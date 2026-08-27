import { certifications } from "@/content";
import { Section } from "@/components/section";

export function CertificationsList() {
  return (
    <Section id="certifications" title="Certifications">
      <ol className="mt-2">
        {certifications.map((cert) => (
          <li
            key={cert.name}
            className="rule-row reveal-on-scroll grid gap-1 py-5 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-6"
          >
            <span className="font-condensed text-label text-muted uppercase tabular-nums">
              {cert.date}
            </span>
            <div>
              <h3 className="font-condensed text-lead uppercase">
                {cert.name}
              </h3>
              <p className="text-meta text-accent">{cert.issuer}</p>

              {/* Only rendered once a real credential URL exists. */}
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block font-condensed text-label text-muted uppercase"
                >
                  View credential
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
