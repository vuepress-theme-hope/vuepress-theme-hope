import { path } from "@vuepress/utils";
import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  getLocales,
  useCustomDevServer,
  addViteOptimizeDepsExclude,
} from "@mr-hope/vuepress-shared";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { pwaLocales } from "./locales";
import { injectLinkstoHead } from "./injectHead";
import { getManifest, generateManifest } from "./generateManifest";
import { generateServiceWorker } from "./generateServiceWorker";

import type { PluginFunction } from "@vuepress/core";
import type { PWAOptions } from "../shared";
import { appendBase } from "./helper";

export const pwaPlugin =
  (options: PWAOptions = {}): PluginFunction =>
  (app) => {
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

      onInitialized: (app): void => {
        addViteOptimizeDepsInclude(app, ["mitt", "register-service-worker"]);

        addViteSsrNoExternal(app, [
          "@mr-hope/vuepress-shared",
          "register-service-worker",
          "vuepress-plugin-pwa2",
        ]);
        addViteOptimizeDepsExclude(app, "vuepress-plugin-pwa2");

        useCustomDevServer(
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

      clientAppRootComponentFiles: [
        ...(options.update === "hint"
          ? [
              options.hintComponent ||
                path.resolve(
                  __dirname,
                  "../client/global-components/SWHintPopup.js"
                ),
            ]
          : []),
        ...(options.update !== "disable" && options.update !== "force"
          ? [
              options.updateComponent ||
                path.resolve(
                  __dirname,
                  "../client/global-components/SWUpdatePopup.js"
                ),
            ]
          : []),
        ...(options.showInstall !== false
          ? [
              path.resolve(
                __dirname,
                "../client/global-components/PWAInstall.js"
              ),
            ]
          : []),
      ],

      clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),
    };
  };
