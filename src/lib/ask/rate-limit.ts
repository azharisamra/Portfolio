import { DAILY_LIMIT, IP_LIMIT, IP_WINDOW_MS } from "./config";

/**
 * IMPORTANT - what this does and does not guarantee.
 *
 * State lives in the module scope of one serverless instance. Netlify may run
 * several instances concurrently and recycles them on cold start, so:
 *
 *   - it reliably stops accidental hammering and casual curiosity;
 *   - it does NOT stop a determined script, which can spread requests across
 *     instances or rotate IPs.
 *
 * The only limit that cannot be bypassed from outside is the spend limit set
 * on the Anthropic Console. Treat that as the real backstop and this as a
 * courtesy control. Swapping in a shared store (Netlify Blobs, Upstash) means
 * replacing the two Maps below and nothing else.
 */

const ipHits = new Map<string, number[]>();

let dayKey = "";
let dayCount = 0;

const today = (): string => new Date().toISOString().slice(0, 10);

export type LimitResult =
  | { ok: true }
  | { ok: false; reason: "rate_limited" | "daily_limit"; retryAfter: number };

export const checkLimits = (ip: string): LimitResult => {
  const now = Date.now();

  // Global daily budget, reset on date rollover (UTC).
  const key = today();
  if (key !== dayKey) {
    dayKey = key;
    dayCount = 0;
  }
  if (dayCount >= DAILY_LIMIT) {
    const midnight = Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate() + 1,
    );
    return {
      ok: false,
      reason: "daily_limit",
      retryAfter: Math.ceil((midnight - now) / 1000),
    };
  }

  // Per-IP sliding window.
  const recent = (ipHits.get(ip) ?? []).filter((t) => now - t < IP_WINDOW_MS);
  if (recent.length >= IP_LIMIT) {
    const oldest = recent[0] ?? now;
    return {
      ok: false,
      reason: "rate_limited",
      retryAfter: Math.ceil((IP_WINDOW_MS - (now - oldest)) / 1000),
    };
  }

  recent.push(now);
  ipHits.set(ip, recent);
  dayCount += 1;

  // Opportunistic cleanup so the Map cannot grow without bound.
  if (ipHits.size > 500) {
    for (const [k, stamps] of ipHits) {
      if (stamps.every((t) => now - t >= IP_WINDOW_MS)) ipHits.delete(k);
    }
  }

  return { ok: true };
};

/** Netlify sets x-nf-client-connection-ip; x-forwarded-for is the fallback. */
export const clientIp = (headers: Headers): string =>
  headers.get("x-nf-client-connection-ip") ??
  headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "unknown";
