import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HEAD_SANITIZER_SCRIPT } from "./head-sanitizer";

/**
 * No jsdom in this suite, so the script runs against a hand-built stand-in
 * for document.head: linked nodes with the same nodeType/nextSibling/
 * removeChild surface the real DOM gives it. That keeps the test on the
 * script's actual behaviour rather than on its source text.
 */

interface FakeNode {
  nodeType: number;
  nodeValue: string | null;
  nextSibling: FakeNode | null;
}

const ELEMENT = 1;
const TEXT = 3;
const COMMENT = 8;

interface FakeHead {
  firstChild: FakeNode | null;
  removed: FakeNode[];
  removeChild(node: FakeNode): void;
}

const buildHead = (nodes: FakeNode[]): FakeHead => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node) node.nextSibling = nodes[i + 1] ?? null;
  }
  const head: FakeHead = {
    firstChild: nodes[0] ?? null,
    removed: [],
    removeChild(node: FakeNode) {
      this.removed.push(node);
      if (this.firstChild === node) this.firstChild = node.nextSibling;
    },
  };
  return head;
};

const run = (head: FakeHead): void => {
  new Function("document", HEAD_SANITIZER_SCRIPT)({ head });
};

const el = (): FakeNode => ({ nodeType: ELEMENT, nodeValue: null, nextSibling: null });
const comment = (text: string): FakeNode => ({ nodeType: COMMENT, nodeValue: text, nextSibling: null });
const text = (value: string): FakeNode => ({ nodeType: TEXT, nodeValue: value, nextSibling: null });

describe("HEAD_SANITIZER_SCRIPT", () => {
  it("removes the injected comment and its newline, nothing else", () => {
    const charset = el();
    const newline = text("\n");
    const injected = comment(" This site is hosted on Netlify. ");
    const viewport = el();
    const head = buildHead([charset, newline, injected, viewport]);

    run(head);

    expect(head.removed).toContain(injected);
    expect(head.removed).toContain(newline);
    expect(head.removed).not.toContain(charset);
    expect(head.removed).not.toContain(viewport);
  });

  it("keeps meaningful text nodes", () => {
    const title = text("Samra Hifzur Rahman");
    const head = buildHead([title]);

    run(head);

    expect(head.removed).toHaveLength(0);
  });

  it("survives a document that throws, as locked-down browsers can", () => {
    expect(() => {
      new Function("document", HEAD_SANITIZER_SCRIPT)({
        get head(): never {
          throw new Error("blocked");
        },
      });
    }).not.toThrow();
  });
});

describe("layout wiring", () => {
  const layout = readFileSync(
    new URL("../app/layout.tsx", import.meta.url),
    "utf8",
  );

  it("renders the sanitizer in <head> before the theme init script", () => {
    const sanitizerAt = layout.indexOf("HEAD_SANITIZER_SCRIPT");
    const themeAt = layout.indexOf("THEME_INIT_SCRIPT");
    expect(sanitizerAt).toBeGreaterThan(-1);
    expect(themeAt).toBeGreaterThan(-1);
    // Both scripts strip or mutate before hydration; the sanitizer must come
    // first so a future comment injected between them cannot split the pair.
    expect(sanitizerAt).toBeLessThan(themeAt);
  });
});
