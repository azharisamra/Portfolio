import { getImageUrl } from "../../utils";
import styles from "./About.module.css";
import about from "../../data/about.json";
import { Reveal } from "./Reveal";

const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <Reveal>
          <img
            src={getImageUrl("about/aboutImage.png")}
            alt="Me sitting with laptop"
            className={styles.aboutimg}
          />
        </Reveal>

        <div className={styles.aboutitems}>
          {about.map((about, id) => {
            return (
              <div key={id}>
                <div className={styles.aboutItem}>
                  <Reveal>
                    <img src={getImageUrl(about.imageSrc)} />
                  </Reveal>
                  <div className={styles.aboutItemText}>
                    <Reveal>
                      <h3>{about.title}</h3>
                    </Reveal>
                    <Reveal>
                      <p>{about.description}</p>
                    </Reveal>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
