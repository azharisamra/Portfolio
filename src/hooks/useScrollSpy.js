import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently under the navbar.
 * Pass a module-level constant array for `ids` so the effect isn't
 * re-subscribed on every render.
 */
export const useScrollSpy = (ids, offset = 140) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    let frame = null;

    const measure = () => {
      frame = null;
      const marker = window.scrollY + offset;
      let current = "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = id;
      }

      // Pin the last section once the page is scrolled to the bottom, so a
      // short final section still lights up.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (atBottom) current = ids[ids.length - 1];

      setActiveId(current);
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return activeId;
};
