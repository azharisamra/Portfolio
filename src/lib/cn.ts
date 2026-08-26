type ClassValue = string | number | null | undefined | false;

/**
 * Joins conditional class names.
 *
 * Deliberately dependency-free: `clsx` + `tailwind-merge` are the usual
 * backing for this helper, but neither is on the approved stack list. If
 * conflicting-utility resolution is wanted later (e.g. `p-2` overriding
 * `p-4` from a prop), `tailwind-merge` is the piece to add.
 */
export const cn = (...classes: ClassValue[]): string =>
  classes.filter((value): value is string => typeof value === "string" && value.length > 0).join(" ");
