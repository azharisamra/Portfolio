import { Reveal } from "../About/Reveal";
import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";
function Hero() {
  return (
    
      <section className={styles.container}>
        <div className={styles.content}>
          <Reveal>
            <h1 className={styles.title}>Hi, I'm Samra</h1>
          </Reveal>
          <Reveal>
            <ul className={styles.HeroText}>
              <li>
                Highly motivated IT professional with a Master's in
                Computer Application (MCA) and expertise in the Software
                Development Life Cycle.
              </li>
              <li>
                Previously employed as a Frontend Developer (Early Career
                Trainee) at Baker Hughes, specializing in React and TypeScript
                development within Agile/Scrum teams.
              </li>
              <li>
                Proficient in designing, coding, and testing software modules,
                with a focus on ensuring code reliability and maintainability
                through the use of Jest, Redux, and other testing libraries.{" "}
              </li>
            </ul>
          </Reveal>

          <a href="mailto:azharisamra@gmail.com" className={styles.contactbtn}>
            {" "}
            Contact Me{" "}
          </a>
        </div>
        <Reveal>
          <img
            src={getImageUrl("hero/heroImage.png")}
            alt="Samra"
            className={styles.HeroImg}
          />
        </Reveal>
        <div className={styles.topBlur} />
        <div className={styles.BottomBlur} />
      </section>
    
  );
}

export default Hero;
