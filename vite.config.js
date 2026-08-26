import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep bundler output out of /assets so the images copied from
    // public/assets never collide with hashed build chunks.
    assetsDir: "bundle",
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
