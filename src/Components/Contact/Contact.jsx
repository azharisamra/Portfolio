import { getImageUrl } from "../../utils";
import styles from "./Contact.module.css";
import { Reveal, Stagger, RevealItem } from "../Reveal/Reveal";

const LINKS = [
  {
    label: "Email Samra",
    href: "mailto:azharisamra@gmail.com",
    icon: "contact/emailIcon.png",
    cardClass: "cardEmail",
  },
  {
    label: "Samra on LinkedIn",
    href: "https://www.linkedin.com/in/ansarisamra/",
    icon: "contact/linkedinIcon.png",
    cardClass: "cardLinkedin",
  },
  {
    label: "Samra on GitHub",
    href: "https://github.com/azharisamra",
    icon: "contact/githubIcon.png",
    cardClass: "cardGithub",
  },
];

function Contact() {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.inner}>
        <Reveal width="auto" className={styles.textWrap}>
          <div className={styles.text}>
            <h2>Contact</h2>
            <p>Feel free to reach out — I&apos;m open to new opportunities.</p>
          </div>
        </Reveal>

        {/* Anchors carry the styling directly; a <button> nested inside an
            <a> is invalid markup and breaks keyboard activation. */}
        <Stagger className={styles.grid} stagger={0.1}>
          {LINKS.map(({ label, href, icon, cardClass }) => (
            <RevealItem key={label} direction="down">
              <a
                className={`${styles.card} ${styles[cardClass]}`}
                href={href}
                aria-label={label}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                <img src={getImageUrl(icon)} alt="" width="30" height="30" />
              </a>
            </RevealItem>
          ))}
        </Stagger>
      </div>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} Samra Hifzur Rahman. Built with React &amp; Vite.
      </p>
    </footer>
  );
}

export default Contact;
