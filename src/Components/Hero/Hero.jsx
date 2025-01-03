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
              Innovative <b>Software Developer</b> with over <b>2 years of experience</b> and
              a Master's in Computer Applications (MCA). Specializing in
              <b>React.js, JavaScript, TypeScript, Java, and Agile/Scrum methodologies</b>, I excel
              at building scalable, high-performance applications. Passionate
              about solving complex problems with strong <b>Data Structures and
              Algorithms (DSA)</b> expertise.
            </li>
            {/*               <li>
                Specializing in React.js and TypeScript development within 
                Agile/Scrum teams, and was previously employed as a 
                Frontend Developer (Early Career Trainee) at Baker Hughes.
              </li>
              <li>
                Proficient in designing, coding, and testing software modules,
                with a focus on ensuring code reliability and maintainability
                through the use of Jest, Redux, and other testing libraries. {" "}
              </li>
               <li>
                Currently seeking opportunities as a Frontend Developer to 
                 contribute expertise and drive innovation in software development.
              </li> */}
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
