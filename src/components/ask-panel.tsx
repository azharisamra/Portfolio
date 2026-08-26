"use client";

import { useRef, useState } from "react";
import type { AskErrorBody } from "@/lib/ask/config";
import { MAX_QUESTION_CHARS } from "@/lib/ask/config";

const STARTERS = [
  "Has she worked with AWS?",
  "What has she built with React?",
  "What does she do at Outlier AI?",
  "Does she have any backend experience?",
] as const;

type Status = "idle" | "streaming" | "done" | "error";

export function AskPanel() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const ask = async (raw: string): Promise<void> => {
    const trimmed = raw.trim();
    if (trimmed.length === 0 || status === "streaming") return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setQuestion(trimmed);
    setAnswer("");
    setErrorText("");
    setStatus("streaming");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let message = "Something went wrong. Please try again.";
        try {
          const body = (await response.json()) as AskErrorBody;
          if (typeof body.message === "string") message = body.message;
        } catch {
          // Non-JSON error body - keep the generic message.
        }
        setErrorText(message);
        setStatus("error");
        return;
      }

      if (response.body === null) {
        setErrorText("The answer came back empty. Please try again.");
        setStatus("error");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let received = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        received += decoder.decode(value, { stream: true });
        setAnswer(received);
      }

      // An OK response that streamed nothing is still a failure to the reader.
      if (received.trim().length === 0) {
        setErrorText("The answer came back empty. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("done");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setErrorText(
        "Could not reach the answer service. Check your connection and try again.",
      );
      setStatus("error");
    }
  };

  const remaining = MAX_QUESTION_CHARS - question.length;

  return (
    <div className="mt-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void ask(question);
        }}
        className="flex flex-col gap-3 border border-rule p-4 sm:flex-row sm:items-center"
      >
        <label htmlFor="ask-input" className="sr-only">
          Ask a question about Samra&apos;s experience
        </label>
        <input
          id="ask-input"
          type="text"
          value={question}
          maxLength={MAX_QUESTION_CHARS}
          onChange={(event) => {
            setQuestion(event.target.value);
          }}
          placeholder="Has she worked with AWS?"
          className="placeholder:text-fg-subtle min-w-0 flex-1 bg-transparent text-body outline-none"
          aria-describedby="ask-hint"
        />
        <button
          type="submit"
          disabled={status === "streaming" || question.trim().length === 0}
          className="cursor-pointer bg-accent px-5 py-2 font-condensed text-label text-ground uppercase disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "streaming" ? "Answering…" : "Ask"}
        </button>
      </form>

      <p id="ask-hint" className="mt-2 text-meta text-muted">
        Answers come only from what is on this page. {remaining} characters
        left.
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {STARTERS.map((starter) => (
          <li key={starter}>
            <button
              type="button"
              onClick={() => {
                void ask(starter);
              }}
              disabled={status === "streaming"}
              className="cursor-pointer border border-rule px-3 py-1 text-meta text-muted transition-colors hover:border-accent hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              {starter}
            </button>
          </li>
        ))}
      </ul>

      {/* One live region for both answers and failures, so a screen reader
          hears the result either way. */}
      <div aria-live="polite" aria-atomic="false" className="mt-5 empty:mt-0">
        {status === "error" ? (
          <p className="border-l-2 border-accent py-1 pl-4 text-body">
            {errorText}
          </p>
        ) : null}

        {answer.length > 0 && status !== "error" ? (
          <p className="border-l-2 border-rule py-1 pl-4 text-body whitespace-pre-wrap">
            {answer}
            {status === "streaming" ? (
              <span className="text-accent" aria-hidden="true">
                ▌
              </span>
            ) : null}
          </p>
        ) : null}

        {status === "streaming" && answer.length === 0 ? (
          <p className="text-meta text-muted">Thinking…</p>
        ) : null}
      </div>
    </div>
  );
}
