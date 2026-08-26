import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../Reveal/Reveal";
import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";

const HEADLINE = ["Hi,", "I'm", "Samra"];

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.container} id="top">
      <div className={styles.content}>
        <p className={styles.eyebrow}>Mumbai, India</p>
        <motion.h1
          className={styles.title}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
          initial="hidden"
          animate="visible"
        >
          {HEADLINE.map((word, index) => (
            <motion.span
              key={word}
              className={
                index === HEADLINE.length - 1 ? styles.name : styles.word
              }
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <Reveal width="100%" delay={0.5}>
          <p className={styles.heroText}>
            <b>Software engineer</b> with <b>4+ years</b> across frontend, full
            stack, and <b>AI training &amp; evaluation</b>. I ship{" "}
            <b>React</b> and <b>TypeScript</b> products, write the prompts and
            task scenarios used in AI model training pipelines, and audit AI
            coding benchmarks — rubric design, verifier validation, and catching
            false passes in synthetic environments built on AWS CDK, Docker and
            LocalStack.
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <div className={styles.actions}>
            <a href="#contact" className={styles.contactbtn}>
              Contact Me
            </a>
            <a href="#projects" className={styles.ghostbtn}>
              View Work
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal width="100%" className={styles.imageWrap} direction="left" delay={0.35}>
        <img
          src={getImageUrl("hero/heroImage.png")}
          alt="Illustration of Samra"
          className={styles.heroImg}
          width="480"
          height="480"
        />
      </Reveal>

      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
}

export default Hero;
