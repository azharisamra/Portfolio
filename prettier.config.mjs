/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  arrowParens: "always",

  plugins: ["prettier-plugin-tailwindcss"],

  // Tailwind v4 has no tailwind.config.js — the plugin needs to be pointed at
  // the CSS entry point that holds the `@import "tailwindcss"` and @theme,
  // or class sorting silently does nothing.
  tailwindStylesheet: "./src/app/globals.css",
};

export default config;
