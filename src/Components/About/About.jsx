import { getImageUrl } from "../../utils";
import styles from "./About.module.css";
import about from "../../data/about.json";
import { Reveal } from "./Reveal";

const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <p className={styles.aboutText}>
        As a versatile developer, I specialize in creating seamless digital
        experiences. With expertise in both frontend and backend development, I
        build responsive and optimized websites that deliver exceptional
        performance. My skills in UI design allow me to craft intuitive and
        engaging interfaces, ensuring a user-friendly experience across all
        platforms. Frontend Developer
      </p>
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
