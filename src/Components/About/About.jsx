import { getImageUrl } from "../../utils";
import styles from "./About.module.css";
import about from "../../data/about.json";
import { Reveal, Stagger, RevealItem } from "../Reveal/Reveal";

const About = () => {
  return (
    <section className={styles.container} id="about">
      <Reveal slide>
        <h2 className={styles.title}>About</h2>
      </Reveal>

      <Reveal width="100%" delay={0.15}>
        <p className={styles.aboutText}>
          I&apos;m a software engineer based in Mumbai, working where product
          engineering meets AI evaluation. I&apos;ve built real-time dashboards
          for oil and gas well data at Baker Hughes, and I now own quality
          standards for AI coding benchmarks at Outlier AI — writing task
          rubrics, auditing verifier scripts, and hardening tasks that
          aren&apos;t testing what they claim to. I care about the same thing in
          both: shipping work that holds up when someone actually leans on it.
        </p>
      </Reveal>

      <div className={styles.content}>
        <Reveal width="100%" className={styles.imageWrap} direction="right">
          <img
            src={getImageUrl("about/aboutImage.png")}
            alt="Illustration of Samra sitting with a laptop"
            className={styles.aboutimg}
          />
        </Reveal>

        <Stagger className={styles.aboutitems} stagger={0.12}>
          {about.map((item) => (
            <RevealItem
              key={item.title}
              className={styles.aboutItem}
              direction="left"
            >
              <div className={styles.aboutItemIcon}>
                <img src={getImageUrl(item.imageSrc)} alt="" />
              </div>
              <div className={styles.aboutItemText}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default About;
