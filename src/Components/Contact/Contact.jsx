import { getImageUrl } from "../../utils";
import styles from "./Contact.module.css"

function Contact() {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel Free to Contact</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img src={getImageUrl("contact/emailIcon.png")} alt="Email ICon" />
          <a href="mailto:azharisamra@gmail.com">azharisamra@gmail.com</a>
        </li>
        <li className={styles.link}>
          <img
            src={getImageUrl("contact/linkedinIcon.png")}
            alt="Linkedin ICon"
          />
          <a href="https://www.linkedin.com/in/ansarisamra/">ansarisamra</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github ICon" />
          <a href="https://github.com/azharisamra">azharisamra</a>
        </li>
      </ul>
    </footer>
  );
}

export default Contact;
