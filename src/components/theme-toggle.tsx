"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  THEMES,
  THEME_STORAGE_KEY,
  applyTheme,
  isTheme,
  resolveTheme,
  type Theme,
} from "@/lib/theme";

/* ---------------------------------------------------------------------------
   localStorage is an external store, so it is read through
   useSyncExternalStore rather than copied into state inside an effect. That
   keeps the server render and the hydrated render explicitly different
   instead of accidentally different.
   --------------------------------------------------------------------------- */

const listeners = new Set<() => void>();

const emit = (): void => {
  for (const listener of listeners) listener();
};

const subscribe = (onChange: () => void): (() => void) => {
  listeners.add(onChange);
  // `storage` fires when another tab changes the choice.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
};

const getSnapshot = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : "system";
  } catch {
    return "system";
  }
};

// The server cannot know the visitor's choice; "system" is the honest default.
const getServerSnapshot = (): Theme => "system";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // Follow the OS while, and only while, the choice is "system".
  useEffect(() => {
    if (theme !== "system") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (): void => {
      applyTheme(resolveTheme("system"));
    };
    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
    };
  }, [theme]);

  const choose = (next: Theme): void => {
    applyTheme(resolveTheme(next));
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode). The choice still applies to this
      // page view, it just will not persist.
    }
    emit();
  };

  /**
   * Radiogroup keyboard contract: arrows move between options and select as
   * they go, Home/End jump to the ends. Combined with the roving tabindex
   * below, the whole control is a single tab stop rather than three.
   */
  const onKeyDown = (event: React.KeyboardEvent, index: number): void => {
    const last = THEMES.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = index === 0 ? last : index - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    if (next === null) return;
    event.preventDefault();
    const option = THEMES[next];
    if (option === undefined) return;
    choose(option);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      // bg-ground, not transparent: the control sits in the pinned bar, so the
      // shrinking name passes behind it on its way out. Without an opaque
      // ground the name shows through the two unselected buttons. Identical to
      // the page behind it at rest, so nothing changes at scroll 0.
      className="inline-flex border border-rule bg-ground"
    >
      {THEMES.map((option, index) => {
        const selected = theme === option;
        return (
          <button
            key={option}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            // Roving tabindex: only the selected option is in the tab order.
            tabIndex={selected ? 0 : -1}
            onClick={() => {
              choose(option);
            }}
            onKeyDown={(event) => {
              onKeyDown(event, index);
            }}
            className={[
              "cursor-pointer border-r border-rule px-3 py-1.5 font-condensed text-label uppercase last:border-r-0",
              selected
                ? "bg-accent text-ground"
                : "text-muted transition-colors hover:text-ink",
            ].join(" ")}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
