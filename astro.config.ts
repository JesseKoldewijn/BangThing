import react from "@astrojs/react";
import vercelAdapter from "@astrojs/vercel";
import tailwind from "@tailwindcss/vite";
import astroPwa from "@vite-pwa/astro";
import { defineConfig } from "astro/config";
import { visualizer } from "rollup-plugin-visualizer";

import { webmanifest } from "./src/webmanifest";

const nodeEnv = process.env.NODE_ENV || "development";

const envSpecificPluginsMapping = {
  ANALYZE: [
    visualizer({
      emitFile: true,
      filename: "stats.html",
    }),
  ],
  NODE_ENV: {
    production: [],
    development: [],
  },
};

const getEnvSpecificPlugins = () => {
  const envSpecificPlugins = [] as any;
  for (const [key, value] of Object.entries(envSpecificPluginsMapping)) {
    if (key === "NODE_ENV") {
      if (nodeEnv === "production" && "production" in value) {
        envSpecificPlugins.push(...(value?.production as any));
      } else if (nodeEnv === "development" && "development" in value) {
        envSpecificPlugins.push(...(value?.development as any));
      }
    } else if (process.env[key]) {
      envSpecificPlugins.push(...(value as any));
    }
  }
  return envSpecificPlugins;
};

const EnvSpecificPlugins = getEnvSpecificPlugins();

const config = defineConfig({
  output: "static",
  adapter: vercelAdapter(),
  integrations: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    astroPwa({
      registerType: "autoUpdate",
      injectRegister: "auto",
      scope: "/",
      filename: "sw.js",
      manifest: webmanifest,
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
  vite: {
    plugins: [tailwind(), ...EnvSpecificPlugins],
    resolve: {
      alias: {
        "~": "/src",
      },
    },
    build: {
      /**
       * As of configuration the only chunk that triggers
       * A warning is the bang.js chunk which is to be expected.
       * This file doesn't get actively used in prod bug only in dev.
       */
      chunkSizeWarningLimit: 5000,
      rollupOptions: {
        treeshake: true,
        external: ["workbox-window"],
        output: {
          manualChunks(id) {
            if (id.includes("bang/source/base")) {
              return `bang`;
            }
            if (id.includes("ClientRouter")) {
              return `client-router`;
            }
          },
        },
      },
    },
  },
});

export default config;
