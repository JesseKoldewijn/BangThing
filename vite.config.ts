import tailwind from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

import { printBangsPlugin } from "./src/bang/plugin";
import { webmanifest } from "./src/webmanifest";

export default defineConfig({
  plugins: [
    tailwind(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: webmanifest,
    }),
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
});
