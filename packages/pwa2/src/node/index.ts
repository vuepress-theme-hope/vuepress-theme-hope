import { path } from "@vuepress/utils";
import { getRootLangPath } from "@mr-hope/vuepress-shared";
// import { getRootLangPath, useCustomDevServer } from "@mr-hope/vuepress-shared";
import { usePalettePlugin } from "vuepress-plugin-sass-palette";
import { i18n } from "./i18n";
import { injectLinkstoHead } from "./injectHead";
import { genManifest } from "./genManifest";
// import { getManifest, genManifest } from "./genManifest";
import { genServiceWorker } from "./genServiceWorker";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin, PluginObject } from "@vuepress/core";
import type { PWAI18nConfig, PWAOptions } from "../shared";

export * from "../shared";

const pwaPlugin: Plugin<PWAOptions> = (options, app) => {
  const { base, themeConfig } = app.options;
  const pwaI18nConfig = i18n as PluginI18nConvert<PWAI18nConfig>;
  const pwaOption =
    Object.keys(options).length > 0
      ? options
      : (themeConfig.pwa as PWAOptions) || {};

  pwaI18nConfig["/"] = pwaI18nConfig[getRootLangPath(app)];

  usePalettePlugin(app, { id: "hope" });

  // TODO: Wait until a valid fix
  // useCustomDevServer(
  //   app,
  //   "manifest.webmanifest",
  //   () => getManifest(pwaOption, app),
  //   "Unexpected manifest generate error"
  // );

  const config: PluginObject = {
    name: "vuepress-plugin-pwa2",

    define: () => ({
      PWA_I18N: pwaI18nConfig,
      SW_PATH: options.swPath || "service-worker.js",
    }),

    clientAppRootComponentFiles: [
      pwaOption.popupComponent ||
        path.resolve(__dirname, "../client/global-components/SWUpdatePopup.js"),
    ],

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),

    onPrepared(): void {
      app.siteData.head = injectLinkstoHead(pwaOption, base, app.siteData.head);
    },

    async onGenerated(): Promise<void> {
      await genManifest(pwaOption, app);
      await genServiceWorker(pwaOption, app);
    },
  };

  if (pwaOption.showInstall !== false)
    (config.clientAppRootComponentFiles as string[]).push(
      path.resolve(__dirname, "../client/global-components/PWAInstall.js")
    );

  return config;
};

export default pwaPlugin;
