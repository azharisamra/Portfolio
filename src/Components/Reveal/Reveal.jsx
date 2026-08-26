/* eslint-disable react/prop-types */
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const OFFSETS = {
  up: { x: 0, y: 60 },
  down: { x: 0, y: -60 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
};

const EASE = [0.22, 1, 0.36, 1];

/**
 * Scroll-triggered entrance.
 *
 * `slide` draws the blue wipe panel over the content as it enters. It is
 * opt-in rather than always-on so it stays a deliberate accent on section
 * headings instead of firing on every paragraph on the page.
 */
export const Reveal = ({
  children,
  className,
  width = "fit-content",
  direction = "up",
  delay = 0.1,
  duration = 0.55,
  slide = false,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const reduceMotion = useReducedMotion();

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (!isInView) return;
    mainControls.start("visible");
    slideControls.start("visible");
  }, [isInView, mainControls, slideControls]);

  const offset = reduceMotion ? { x: 0, y: 0 } : OFFSETS[direction] ?? OFFSETS.up;

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", width, overflow: slide ? "hidden" : undefined }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, ...offset },
          visible: { opacity: 1, x: 0, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.div>

      {slide && !reduceMotion && (
        <motion.div
          aria-hidden="true"
          variants={{ hidden: { left: 0 }, visible: { left: "100%" } }}
          initial="hidden"
          animate={slideControls}
          transition={{ duration: 0.5, delay: delay * 0.5, ease: "easeIn" }}
          style={{
            position: "absolute",
            top: 4,
            bottom: 4,
            left: 0,
            right: 0,
            background: "var(--color-secondary)",
            zIndex: 20,
          }}
        />
      )}
    </div>
  );
};

/**
 * Wraps a list so its `RevealItem` children cascade in rather than all
 * firing at once. Renders as a plain div, so pass the layout className
 * straight through and keep the CSS module in charge of layout.
 */
export const Stagger = ({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.1,
  as: Tag = "div",
  ...rest
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const MotionTag = motion[Tag] ?? motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export const RevealItem = ({
  children,
  className,
  direction = "up",
  duration = 0.5,
  as: Tag = "div",
  ...rest
}) => {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? { x: 0, y: 0 } : OFFSETS[direction] ?? OFFSETS.up;
  const MotionTag = motion[Tag] ?? motion.div;

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ duration, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};
