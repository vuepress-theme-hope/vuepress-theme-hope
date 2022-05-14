import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  getLocales,
  useCustomDevServer,
} from "@mr-hope/vuepress-shared";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { pwaLocales } from "./locales";
import { injectLinkstoHead } from "./injectHead";
import { getManifest, generateManifest } from "./generateManifest";
import { generateServiceWorker } from "./generateServiceWorker";
import { appendBase } from "./helper";
import { logger } from "./utils";
import { prepareConfigFile } from "./prepare";

import type { PluginFunction } from "@vuepress/core";
import type { PWAOptions } from "../shared";

export const pwaPlugin =
  (options: PWAOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const { base } = app.options;

    if (options.appendBase) appendBase(base, options);

    const manifest = getManifest(app, options);

    app.options.head = injectLinkstoHead(options, base, app.options.head);

    useSassPalettePlugin(app, { id: "hope" });

    return {
      name: "vuepress-plugin-pwa2",

      define: () => ({
        PWA_LOCALES: getLocales({
          app,
          name: "pwa",
          default: pwaLocales,
          config: options.locales,
        }),
        SW_FORCE_UPDATE: options.update === "force",
        SW_PATH: options.swPath || "service-worker.js",
      }),

      extendsBundlerOptions: (config: unknown, app): void => {
        addViteOptimizeDepsInclude({ app, config }, "register-service-worker");

        addViteSsrNoExternal({ app, config }, "register-service-worker");

        useCustomDevServer(
          config,
          app,
          "/manifest.webmanifest",
          async () => JSON.stringify(await manifest),
          "Unexpected manifest generate error"
        );
      },

      onGenerated: async (app): Promise<void> => {
        await generateManifest(app, manifest);
        await generateServiceWorker(app, options);
      },

      clientConfigFile: (app) => prepareConfigFile(app, options),
    };
  };
