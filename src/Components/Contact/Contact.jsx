import { getImageUrl } from "../../utils";
import styles from "./Contact.module.css";
import { Reveal } from "../About/Reveal";

function Contact() {
  return (
    <footer id="contact" className={styles.container}>
      <Reveal>
        <div className={styles.text}>
          <h2>Contact</h2>
          <p>Feel Free to Contact</p>
        </div>
      </Reveal>
      <div className={styles.main}>
        <div className={styles.up}>
          <a href="mailto:azharisamra@gmail.com">
            <button className={styles.card1}>
              <img
                src={getImageUrl("contact/emailIcon.png")}
                alt="Email"
                width="30px"
                height="30px"
                className={styles.Instagram}
              />
            </button>
          </a>
          <a href="https://www.linkedin.com/in/ansarisamra/">
            <button className={styles.card2}>
              <img
                src={getImageUrl("contact/linkedinIcon.png")}
                alt="linkedIn"
                width="30px"
                height="30px"
                className={styles.LinkedIn}
              />
            </button>
          </a>
        </div>
        <div className={styles.down}>
          <a href="https://github.com/azharisamra">
            <button className={styles.card3}>
              <img
                src={getImageUrl("contact/githubIcon.png")}
                alt="GitHub"
                width="30px"
                height="30px"
                className={styles.github}
              />
            </button>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
