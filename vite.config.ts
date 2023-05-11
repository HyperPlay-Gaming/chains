import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public",

  plugins: [],
  build: {
    copyPublicDir: true,
    minify: "esbuild",
    lib: {
      entry: resolve("src", "index.ts"),
      name: "Chains",
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
  },
});
