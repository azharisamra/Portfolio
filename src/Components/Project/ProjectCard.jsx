import { getImageUrl } from "../../utils";
import styles from "./ProjectCard.module.css";

/* eslint-disable react/prop-types */
export const ProjectCard = ({
  project: { title, imageSrc, description, skills, source, demo, period },
}) => {
  const hasSource = Boolean(source);
  const hasDemo = Boolean(demo);
  // Multi-word titles use one letter per word; a single word uses its first
  // two, so "Artify" and "Athletee" don't both collapse to "A".
  const words = title.split(" ").filter((word) => /^[a-z]/i.test(word));
  const initials =
    words.length > 1
      ? words.slice(0, 2).map((word) => word[0].toUpperCase()).join("")
      : (words[0] ?? title).slice(0, 2).toUpperCase();

  return (
    <article className={styles.container}>
      <div className={styles.imageWrap}>
        {imageSrc ? (
          <img
            src={getImageUrl(imageSrc)}
            alt={`Screenshot of ${title}`}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          // No screenshot on file — a designed monogram beats a broken image.
          <div className={styles.placeholder} aria-hidden="true">
            <span>{initials}</span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.heading}>
          <h3 className={styles.title}>{title}</h3>
          {period && <span className={styles.period}>{period}</span>}
        </div>

        <p className={styles.description}>{description}</p>

        <ul className={styles.skills}>
          {skills.map((skill) => (
            <li key={skill} className={styles.skill}>
              {skill}
            </li>
          ))}
        </ul>

        {/* Only render links that actually go somewhere. */}
        {(hasSource || hasDemo) && (
          <div className={styles.links}>
            {hasDemo && (
              <a
                href={demo}
                className={styles.link}
                target="_blank"
                rel="noreferrer"
              >
                Demo
              </a>
            )}
            {hasSource && (
              <a
                href={source}
                className={`${styles.link} ${styles.linkGhost}`}
                target="_blank"
                rel="noreferrer"
              >
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
