import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'

export default defineConfig({
  publicDir: "public",
  build: {
    copyPublicDir: true,
    minify: "esbuild",
    lib: {
      entry: resolve("src", "index.ts"),
      name: "Chains",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [dts()]
});
