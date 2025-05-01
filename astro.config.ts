import react from "@astrojs/react";
import vercelAdapter from "@astrojs/vercel";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { VitePWA } from "vite-plugin-pwa";

import { webmanifest } from "./src/webmanifest";

const config = defineConfig({
  output: "static",
  adapter: vercelAdapter(),
  integrations: [react()],
  vite: {
    plugins: [
      tailwind(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: webmanifest,
      }) as any,
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id, _meta) => {
            if (id.includes("bang")) {
              return "bangs";
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        "~": "/src",
      },
    },
  },
});

export default config;
