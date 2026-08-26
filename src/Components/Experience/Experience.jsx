import skills from "../../data/skills.json";
import history from "../../data/history.json";
import education from "../../data/education.json";
import { getImageUrl } from "../../utils";
import styles from "./Experience.module.css";
import { Reveal, Stagger, RevealItem } from "../Reveal/Reveal";

function Experience() {
  return (
    <section className={styles.container} id="experience">
      <Reveal slide>
        <h2 className={styles.title}>Experience</h2>
      </Reveal>

      <div className={styles.content}>
        <div className={styles.skillsColumn}>
          <h3 className={styles.subhead}>Technical Skills</h3>

          <Stagger className={styles.skills} stagger={0.07}>
            {skills.map((group) => (
              <RevealItem
                key={group.category}
                className={styles.skillGroup}
                direction="right"
              >
                <h4 className={styles.skillCategory}>{group.category}</h4>
                <ul className={styles.skillList}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.skillChip}>
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </Stagger>

          <h3 className={`${styles.subhead} ${styles.subheadSpaced}`}>
            Education
          </h3>
          <Stagger className={styles.education} stagger={0.1}>
            {education.map((item) => (
              <RevealItem
                key={item.degree}
                className={styles.educationItem}
                direction="right"
              >
                <h4>{item.degree}</h4>
                <p>
                  {item.institution} · {item.location}
                </p>
                <span className={styles.year}>{item.year}</span>
              </RevealItem>
            ))}
          </Stagger>
        </div>

        <div className={styles.historyColumn}>
          <h3 className={styles.subhead}>Professional Experience</h3>

          <Stagger className={styles.history} stagger={0.1} as="ul">
            {history.map((historyItem) => (
              <RevealItem
                key={`${historyItem.organisation}-${historyItem.startDate}`}
                className={styles.historyItem}
                direction="left"
                as="li"
              >
                <img
                  className={styles.historyItemLogo}
                  src={getImageUrl(historyItem.imageSrc)}
                  alt={`${historyItem.organisation} logo`}
                />
                <div className={styles.historyItemDetails}>
                  <h4>{historyItem.role}</h4>
                  <p className={styles.org}>
                    {historyItem.organisation}
                    {historyItem.location ? ` · ${historyItem.location}` : ""}
                  </p>
                  <p className={styles.dates}>
                    {`${historyItem.startDate} — ${historyItem.endDate}`}
                  </p>
                  <ul>
                    {historyItem.experiences.map((experience) => (
                      <li key={experience}>{experience}</li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

export default Experience;
