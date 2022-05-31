import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  getLocales,
  useCustomDevServer,
} from "vuepress-shared";

import { covertOptions } from "./compact";
import { getManifest, generateManifest } from "./generateManifest";
import { generateServiceWorker } from "./generateServiceWorker";
import { appendBase } from "./helper";
import { injectLinkstoHead } from "./injectHead";
import { pwaLocales } from "./locales";
import { prepareConfigFile } from "./prepare";
import { logger } from "./utils";

import type { PluginFunction } from "@vuepress/core";
import type { PWAOptions } from "../shared";

export const pwaPlugin =
  (options: PWAOptions = {}, legacy = false): PluginFunction =>
  (app) => {
    // TODO: Remove it in v2 stable
    if (legacy) covertOptions(options as PWAOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const { base, shouldPrefetch = true } = app.options;

    if (options.appendBase) appendBase(base, options);

    if (shouldPrefetch === true)
      logger.warn(
        'The plugin will register service worker to handle assets, so we recommend you to set "shouldPrefetch: false" in VuePress config file.'
      );

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
