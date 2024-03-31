import { getImageUrl } from "../../utils";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({
  // eslint-disable-next-line react/prop-types
  project: { title, imageSrc, description, skills, source },
}) => {
  return (
    <div className={styles.container}>
      <img
        src={getImageUrl(imageSrc)}
        alt={`image of ${title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {
          // eslint-disable-next-line react/prop-types
          skills.map((skill, id) => {
            return (
              <li key={id} className={styles.skill}>
                {skill}
              </li>
            );
          })
        }
      </ul>
      <div className={styles.links}>
        {/* <a href={demo} className={styles.link}>demo</a> */}
        <a href={source} className={styles.link}> Source</a>
      </div>
    </div>
  );
};
