import react from "@astrojs/react";
import vercelAdapter from "@astrojs/vercel";
import tailwind from "@tailwindcss/vite";
import astroPwa from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";

import { webmanifest } from "./src/webmanifest";

const devOnlyPlugins =
  process.env.ANALYZE === "true"
    ? ([
        visualizer({
          emitFile: true,
          filename: "stats.html",
        }),
      ] as any)
    : [];

const config = defineConfig({
  output: "static",
  adapter: vercelAdapter(),
  integrations: [
    react(),
    astroPwa({
      registerType: "autoUpdate",
      scope: "/",
      filename: "sw.js",
      manifest: webmanifest,
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
  vite: {
    plugins: [tailwind(), ...devOnlyPlugins],
    resolve: {
      alias: {
        "~": "/src",
      },
    },
    build: {
      rollupOptions: {
        treeshake: true,
        external: ["workbox-window"],
      },
    },
  },
});

export default config;
