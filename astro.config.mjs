import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml";
import svelte from "@astrojs/svelte";

export default defineConfig({
  site: "https://dylanjedwards.com",
  integrations: [svelte()],
  vite: {
    plugins: [yaml()],
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ["src/styles"],
        },
      },
    },
  },
});
