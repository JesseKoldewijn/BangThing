import preact from "@astrojs/preact";
import tailwind from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { VitePWA } from "vite-plugin-pwa";

import { printBangsPlugin } from "./src/bang/plugin";
import { webmanifest } from "./src/webmanifest";

const config = defineConfig({
  integrations: [preact()],
  vite: {
    plugins: [
      tailwind(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: webmanifest,
      }) as any,
      printBangsPlugin(),
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
