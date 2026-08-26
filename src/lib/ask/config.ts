/**
 * Every knob for the "Ask about my experience" feature, in one place.
 *
 * Provider: Google Gemini, free tier (no card required). Only two lines in the
 * codebase are provider-specific - this constant and the import in the route
 * handler - because everything runs through the Vercel AI SDK. Moving to
 * Anthropic or OpenAI later is a package swap plus those two lines.
 *
 * Free-tier limits are low and shared, so expect occasional upstream 429s
 * under load. Those surface to the visitor as a handled error, not a crash.
 *
 * `flash` rather than `flash-lite`: the whole value of this feature is the
 * model refusing to invent experience, and that is instruction-following work.
 *
 * Pinned to an explicit version rather than the `gemini-flash-latest` alias -
 * an alias can move under you and change refusal behaviour without a deploy.
 */
export const ASK_MODEL = "gemini-3.6-flash" as const;

/**
 * Hard ceiling on generated tokens, and the single biggest cost control.
 *
 * Gemini 3.x bills thinking tokens against this budget, so a tight cap starves
 * the visible answer and truncates it mid-sentence. Raised to 800 and paired
 * with thinkingLevel "minimal" below - the answer itself is 2-4 sentences, so
 * the extra headroom is spent on reasoning, not length.
 */
export const MAX_OUTPUT_TOKENS = 800;

/**
 * This is extractive Q&A over ~1,500 tokens of supplied context. Deep
 * reasoning buys nothing here and competes with the answer for budget.
 */
export const THINKING_LEVEL = "minimal" as const;

/**
 * Rejected before the request ever reaches the API. Without this, a single
 * padded question could bill a very large number of input tokens.
 */
export const MAX_QUESTION_CHARS = 500;

/** Per-IP allowance. Best-effort - see rate-limit.ts for what that means. */
export const IP_LIMIT = 5;
export const IP_WINDOW_MS = 10 * 60 * 1000;

/** Global circuit breaker across all callers. */
export const DAILY_LIMIT = 100;

/** True when the server is configured to answer at all. */
export const isAskEnabled = (): boolean =>
  Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

/** Discriminated failure states, mirrored by the client. */
export type AskErrorCode =
  | "not_configured"
  | "bad_request"
  | "question_too_long"
  | "rate_limited"
  | "daily_limit"
  | "empty_response"
  | "upstream_error";

export interface AskErrorBody {
  error: AskErrorCode;
  message: string;
}
