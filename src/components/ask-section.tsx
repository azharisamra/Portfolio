import { Section } from "@/components/section";
import { AskPanel } from "@/components/ask-panel";
import { isAskEnabled } from "@/lib/ask/config";

/**
 * Server Component gate. With no GOOGLE_GENERATIVE_AI_API_KEY set, this renders nothing
 * at all — no section heading, no client JS — and the rest of the page is
 * unaffected.
 */
export function AskSection() {
  if (!isAskEnabled()) return null;

  return (
    <Section id="ask" title="Ask about my experience">
      <p className="mt-4 text-meta text-muted">
        A grounded question-answering panel. It reads only the content on this
        page, and will say so when something isn&apos;t there rather than
        guessing.
      </p>
      <AskPanel />
    </Section>
  );
}
