import { path } from "@vuepress/utils";
import {
  addViteOptimizeDeps,
  getLocales,
  useCustomDevServer,
} from "@mr-hope/vuepress-shared";
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import { pwaLocales } from "./locales";
import { injectLinkstoHead } from "./injectHead";
import { getManifest, genManifest } from "./genManifest";
import { genServiceWorker } from "./genServiceWorker";

import type { Plugin, PluginConfig, PluginObject } from "@vuepress/core";
import type { PWAOptions } from "../shared";

export const pwaPlugin: Plugin<PWAOptions> = (options, app) => {
  const { base } = app.options;

  addViteOptimizeDeps(app, ["mitt", "register-service-worker"]);

  if (app.env.isDev)
    addViteOptimizeDeps(app, "@mr-hope/vuepress-shared/lib/client");

  useSassPalettePlugin(app, { id: "hope" });

  useCustomDevServer(
    app,
    "/manifest.webmanifest",
    () => getManifest(options, app),
    "Unexpected manifest generate error"
  );

  const config: PluginObject = {
    name: "vuepress-plugin-pwa2",

    define: () => ({
      PWA_LOCALES: getLocales(app, pwaLocales, options.locales),
      SW_PATH: options.swPath || "service-worker.js",
    }),

    clientAppRootComponentFiles: [
      options.popupComponent ||
        path.resolve(__dirname, "../client/global-components/SWUpdatePopup.js"),
    ],

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),

    onPrepared(): void {
      app.siteData.head = injectLinkstoHead(options, base, app.siteData.head);
    },

    async onGenerated(): Promise<void> {
      await genManifest(options, app);
      await genServiceWorker(options, app);
    },
  };

  if (options.showInstall !== false)
    (config.clientAppRootComponentFiles as string[]).push(
      path.resolve(__dirname, "../client/global-components/PWAInstall.js")
    );

  return config;
};

export const pwa = (options: PWAOptions | false): PluginConfig<PWAOptions> => [
  pwaPlugin,
  options,
];
