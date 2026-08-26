import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";
import { useScrollSpy } from "../../hooks/useScrollSpy";

// Served from public/resume so the link always points at the copy
// deployed with this build, not a stale Drive file.
const RESUME_URL = `${import.meta.env.BASE_URL}resume/Samra-Hifzur-Rahman-Resume.pdf`;

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = SECTIONS.map((section) => section.id);

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <a className={styles.title} href="#top">
        Portfolio
      </a>

      <div className={styles.menu}>
        <button
          type="button"
          className={styles.menuBtn}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <img
            src={
              menuOpen
                ? getImageUrl("nav/closeIcon.png")
                : getImageUrl("nav/menuIcon.png")
            }
            alt=""
          />
        </button>

        <ul
          id="primary-navigation"
          className={`${styles.menuitems} ${menuOpen ? styles.menuOpen : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeId === id ? styles.active : undefined}
                aria-current={activeId === id ? "true" : undefined}
              >
                {label}
              </a>
            </li>
          ))}

          <li>
            <a
              className={styles.resumeBtn}
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.resumeText}>Resume</span>
              <span className={styles.resumeIcon} aria-hidden="true">
                <img src={getImageUrl("nav/download.png")} alt="" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
