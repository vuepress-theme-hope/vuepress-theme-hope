import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import {
  addViteOptimizeDepsExclude,
  getLocales,
  useCustomDevServer,
} from "vuepress-shared/node";

import { convertOptions } from "./compact/index.js";
import { generateManifest, getManifest } from "./generateManifest.js";
import { generateServiceWorker } from "./generateServiceWorker.js";
import { appendBase } from "./helper.js";
import { injectLinksToHead } from "./injectHead.js";
import { pwaLocales } from "./locales.js";
import { prepareConfigFile } from "./prepare.js";
import { logger } from "./utils.js";

import type { PluginFunction } from "@vuepress/core";
import type { PWAOptions } from "./options.js";

export const pwaPlugin =
  (options: PWAOptions = {}, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy) convertOptions(options as PWAOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info("Options:", options);

    const { base, shouldPrefetch = true } = app.options;

    if (options.appendBase) appendBase(base, options);

    if (shouldPrefetch === true)
      logger.warn(
        'The plugin will register service worker to handle assets, so we recommend you to set "shouldPrefetch: false" in VuePress config file.'
      );

    const manifest = getManifest(app, options);

    app.options.head = injectLinksToHead(options, base, app.options.head);

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

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteOptimizeDepsExclude(bundlerOptions, app, [
          "mitt",
          "register-service-worker",
        ]);

        useCustomDevServer(bundlerOptions, app, {
          path: "/manifest.webmanifest",
          response: async (_, response) => {
            response.setHeader("Content-Type", "application/manifest+json");

            return JSON.stringify(await manifest);
          },
          errMsg: "Unexpected manifest generate error",
        });
      },

      onGenerated: async (app): Promise<void> => {
        await generateManifest(app, manifest);
        await generateServiceWorker(app, options);
      },

      clientConfigFile: (app) => prepareConfigFile(app, options),
    };
  };
