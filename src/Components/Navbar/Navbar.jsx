import { useState } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const downloadResume =
    "https://drive.google.com/file/d/1w09rBYGpTiEOhWrXA9HtmxUUZO7Wk5bz/view?usp=drive_link";
  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">
        Portfolio
      </a>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        ></img>
        <ul
          className={`${styles.menuitems}  ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <div className={styles.button} data-tooltip="Size: 20Mb">
              <div className={styles.button_wrapper}>
                <a href={downloadResume} className={styles.text}>Resume</a>
                <a href={downloadResume} className={styles.icon}>
                  <img
                    src={getImageUrl("nav/download.png")} // Replace "path/to/download-icon.png" with the actual path to your PNG image
                    alt="Download Icon"
                    width="2em"
                    height="2em"
                  />
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
