import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import styles from "./Project.module.css";
import { Reveal, Stagger, RevealItem } from "../Reveal/Reveal";

export const Projects = () => {
  return (
    <section className={styles.container} id="projects">
      <Reveal slide>
        <h2 className={styles.title}>Projects</h2>
      </Reveal>

      <Stagger className={styles.project} stagger={0.1}>
        {projects.map((project) => (
          <RevealItem key={project.title} className={styles.projectItem}>
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </Stagger>
    </section>
  );
};
