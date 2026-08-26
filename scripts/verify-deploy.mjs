#!/usr/bin/env node
/**
 * Post-deploy verification. Run against a preview URL before promoting:
 *
 *   node scripts/verify-deploy.mjs https://your-preview.vercel.app
 *
 * Checks the things that only break once deployed — assets that were never
 * copied into the build, absolute URLs pointing at the wrong host, dead
 * outbound links, and a social card that renders as an empty box.
 *
 * Exits non-zero if anything fails, so it can gate a promotion.
 */

const base = process.argv[2]?.replace(/\/$/, "");
if (!base) {
  console.error("usage: node scripts/verify-deploy.mjs <deployment-url>");
  process.exit(2);
}

const results = [];
const record = (ok, label, detail = "") => {
  results.push({ ok, label, detail });
  const mark = ok ? "  PASS" : "  FAIL";
  console.log(`${mark}  ${label}${detail ? `  — ${detail}` : ""}`);
};

const abs = (u) => (u.startsWith("http") ? u : new URL(u, base).href);

const head = async (url) => {
  try {
    // Some hosts reject HEAD; fall back to a ranged GET.
    let r = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (r.status === 405 || r.status === 501) {
      r = await fetch(url, {
        headers: { Range: "bytes=0-0" },
        redirect: "follow",
      });
    }
    return { status: r.status, type: r.headers.get("content-type") ?? "" };
  } catch (error) {
    return { status: 0, type: "", error: String(error) };
  }
};

console.log(`\nVerifying ${base}\n${"-".repeat(60)}`);

// ---------------------------------------------------------------- page loads
const pageRes = await fetch(base, { redirect: "follow" });
record(pageRes.ok, "page returns 200", `HTTP ${pageRes.status}`);
const html = await pageRes.text();

// ------------------------------------------------------------------- images
const imgSrcs = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) =>
  m[1].replace(/&amp;/g, "&"),
);
if (imgSrcs.length === 0) {
  record(true, "images", "none on the page");
} else {
  let bad = 0;
  for (const src of new Set(imgSrcs)) {
    const r = await head(abs(src));
    const ok = r.status === 200 && r.type.startsWith("image/");
    if (!ok) {
      bad += 1;
      console.log(`        broken image: ${src} -> ${r.status} ${r.type}`);
    }
  }
  record(
    bad === 0,
    `images load (${new Set(imgSrcs).size} unique)`,
    bad ? `${bad} broken` : "",
  );
}

// -------------------------------------------------------------------- alt text
const imgTags = [...html.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
const missingAlt = imgTags.filter((t) => !/\balt=/.test(t));
record(
  missingAlt.length === 0,
  "every <img> has an alt attribute",
  missingAlt.length ? `${missingAlt.length} missing` : "",
);

// --------------------------------------------------------------------- links
const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
const placeholders = hrefs.filter(
  (h) => h === "" || h === "#" || /example\.(com|org|test)/i.test(h),
);
record(
  placeholders.length === 0,
  "no empty / '#' / example.com hrefs",
  placeholders.length ? [...new Set(placeholders)].join(", ") : "",
);

const external = [...new Set(hrefs.filter((h) => /^https?:\/\//.test(h)))];
let deadLinks = 0;
for (const url of external) {
  const r = await head(url);
  const ok = r.status > 0 && r.status < 400;
  if (!ok) {
    deadLinks += 1;
    console.log(`        dead link: ${url} -> ${r.status}`);
  }
}
record(
  deadLinks === 0,
  `external links resolve (${external.length})`,
  deadLinks ? `${deadLinks} dead` : "",
);

const mailtos = [...new Set(hrefs.filter((h) => h.startsWith("mailto:")))];
record(
  mailtos.length > 0 &&
    mailtos.every((m) => /^mailto:[^@\s]+@[^@\s]+\.\w+$/.test(m)),
  "mailto link is well formed",
  mailtos.join(", "),
);

// ------------------------------------------------------- canonical & og host
const meta = (re) => html.match(re)?.[1] ?? null;
const canonical = meta(/<link rel="canonical" href="([^"]+)"/);
const ogUrl = meta(/<meta property="og:url" content="([^"]+)"/);
const ogImage = meta(/<meta property="og:image" content="([^"]+)"/)?.replace(
  /&amp;/g,
  "&",
);
const ogTitle = meta(/<meta property="og:title" content="([^"]+)"/);
const ogDesc = meta(/<meta property="og:description" content="([^"]+)"/);

record(Boolean(canonical), "canonical tag present", canonical ?? "");
record(Boolean(ogTitle), "og:title present", ogTitle ?? "");
record(
  Boolean(ogDesc),
  "og:description present",
  ogDesc ? `${ogDesc.slice(0, 60)}…` : "",
);

// The check that catches a host mismatch after moving providers.
const sameHost = (a) => {
  try {
    return new URL(a).host === new URL(base).host;
  } catch {
    return false;
  }
};
record(
  canonical ? sameHost(canonical) : false,
  "canonical host matches the deployment",
  canonical ? `${new URL(canonical).host} vs ${new URL(base).host}` : "",
);
record(
  ogUrl ? sameHost(ogUrl) : false,
  "og:url host matches the deployment",
  ogUrl ? new URL(ogUrl).host : "",
);

if (ogImage) {
  const r = await head(ogImage);
  record(
    r.status === 200 && r.type.startsWith("image/"),
    "og:image renders",
    `HTTP ${r.status} ${r.type}`,
  );
  record(
    sameHost(ogImage),
    "og:image host matches the deployment",
    new URL(ogImage).host,
  );
} else {
  record(false, "og:image present");
}

// ------------------------------------------------------------ icons & routes
for (const path of ["/robots.txt", "/sitemap.xml", "/manifest.webmanifest"]) {
  const r = await head(`${base}${path}`);
  record(r.status === 200, `${path} resolves`, `HTTP ${r.status}`);
}

const iconHrefs = [
  ...html.matchAll(/<link rel="(?:icon|apple-touch-icon)"[^>]+href="([^"]+)"/g),
].map((m) => m[1].replace(/&amp;/g, "&"));
for (const href of iconHrefs) {
  const r = await head(abs(href));
  record(
    r.status === 200 && r.type.startsWith("image/"),
    `icon ${href.split("?")[0]} resolves`,
    `HTTP ${r.status}`,
  );
}

// robots/sitemap should advertise this host, not the previous one.
const robots = await (await fetch(`${base}/robots.txt`)).text();
record(
  robots.includes(new URL(base).host),
  "robots.txt references this host",
  robots
    .split("\n")
    .find((l) => /Sitemap|Host/i.test(l))
    ?.trim() ?? "",
);

// -------------------------------------------------------------- structured data
const jsonLd = html.match(
  /<script type="application\/ld\+json">(.*?)<\/script>/s,
)?.[1];
let ldOk = false;
try {
  const parsed = JSON.parse(jsonLd ?? "");
  ldOk = parsed["@type"] === "Person" && Array.isArray(parsed.sameAs);
} catch {
  ldOk = false;
}
record(ldOk, "JSON-LD Person block parses");

// -------------------------------------------------------------- headings / a11y
record(
  (html.match(/<h1/g) ?? []).length === 1,
  "exactly one <h1>",
  `${(html.match(/<h1/g) ?? []).length} found`,
);
record(/href="#main-content"/.test(html), "skip link present");

// ------------------------------------------------------------------- ask panel
const askPresent = /aria-labelledby="ask"/.test(html);
if (askPresent) {
  const r = await fetch(`${base}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: "Has she worked with AWS?" }),
  });
  const body = await r.text();
  record(
    r.status === 200 && body.trim().length > 0,
    "ask panel rendered and /api/ask answered",
    `HTTP ${r.status}`,
  );
  if (r.status === 200)
    console.log(`        answer: ${body.slice(0, 100).replace(/\n/g, " ")}…`);
} else {
  record(
    true,
    "ask panel",
    "not rendered (no API key at build time) — expected if unset",
  );
}

// ------------------------------------------------------------------- summary
const failed = results.filter((r) => !r.ok);
console.log("-".repeat(60));
console.log(
  `${results.length - failed.length}/${results.length} checks passed`,
);
if (failed.length) {
  console.log("\nFAILED:");
  for (const f of failed)
    console.log(`  - ${f.label}${f.detail ? `  (${f.detail})` : ""}`);
}
process.exit(failed.length ? 1 : 0);
