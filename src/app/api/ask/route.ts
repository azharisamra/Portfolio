import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import {
  ASK_MODEL,
  MAX_OUTPUT_TOKENS,
  THINKING_LEVEL,
  MAX_QUESTION_CHARS,
  isAskEnabled,
  type AskErrorBody,
  type AskErrorCode,
} from "@/lib/ask/config";
import { buildSystemPrompt } from "@/lib/ask/context";
import { checkLimits, clientIp } from "@/lib/ask/rate-limit";

// The key is read from the server environment only. It is never bundled into
// client code and never returned in a response.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (
  code: AskErrorCode,
  message: string,
  status: number,
  headers?: HeadersInit,
): Response => {
  const body: AskErrorBody = { error: code, message };
  return Response.json(body, { status, headers });
};

export async function POST(request: Request): Promise<Response> {
  if (!isAskEnabled()) {
    return fail(
      "not_configured",
      "This feature is not configured on the server.",
      503,
    );
  }

  let question: unknown;
  try {
    const payload: unknown = await request.json();
    question =
      typeof payload === "object" && payload !== null
        ? (payload as Record<string, unknown>).question
        : undefined;
  } catch {
    return fail("bad_request", "Could not read the request.", 400);
  }

  if (typeof question !== "string" || question.trim().length === 0) {
    return fail("bad_request", "Ask a question first.", 400);
  }

  const trimmed = question.trim();
  if (trimmed.length > MAX_QUESTION_CHARS) {
    return fail(
      "question_too_long",
      `Questions are limited to ${MAX_QUESTION_CHARS} characters.`,
      413,
    );
  }

  const limit = checkLimits(clientIp(request.headers));
  if (!limit.ok) {
    const message =
      limit.reason === "daily_limit"
        ? "This panel has hit its daily question limit. Try again tomorrow, or email Samra directly."
        : "That's a few questions in quick succession — give it a minute.";
    return fail(limit.reason, message, 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  // streamText reports upstream failures through onError rather than throwing
  // from the iterator, so capture it here and consult it after the probe.
  let upstreamError: unknown = null;

  const result = streamText({
    onError: ({ error }) => {
      upstreamError = error;
    },
    model: google(ASK_MODEL),
    system: buildSystemPrompt(),
    prompt: trimmed,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    temperature: 0,
    providerOptions: {
      google: { thinkingConfig: { thinkingLevel: THINKING_LEVEL } },
    },
    abortSignal: request.signal,
  });

  /*
   * streamText is lazy: an auth failure, a 429 from the model API, or any
   * other upstream error surfaces only once the stream is consumed. Returning
   * toTextStreamResponse() directly would therefore send 200 + an empty body
   * for a hard failure, and the client would report it as "empty response".
   *
   * Pulling the first chunk here keeps the status code honest — everything
   * after it still streams normally.
   */
  const iterator = result.textStream[Symbol.asyncIterator]();
  let first: IteratorResult<string>;

  try {
    first = await iterator.next();
  } catch (error) {
    console.error("[ask] upstream failure", error);
    return fail(
      "upstream_error",
      "The answer service could not be reached. Please try again shortly.",
      502,
    );
  }

  if (first.done) {
    if (upstreamError !== null) {
      console.error("[ask] upstream failure", upstreamError);
      return fail(
        "upstream_error",
        "The answer service could not be reached. Please try again shortly.",
        502,
      );
    }
    return fail(
      "empty_response",
      "The model returned nothing. Please try rephrasing your question.",
      502,
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode(first.value));
      try {
        for (;;) {
          const next = await iterator.next();
          if (next.done) break;
          controller.enqueue(encoder.encode(next.value));
        }
      } catch (error) {
        // Headers are already sent, so the caller keeps whatever streamed.
        console.error("[ask] stream interrupted", error);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
