import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import styles from "./Project.module.css"

export const Projects = () => {
  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title} >Projects</h2>
      <div className={styles.project}>
        {projects.map((project, id) => {
          return <ProjectCard key={id} project={project}></ProjectCard>;
        })}
      </div>
    </section>
  );
};
