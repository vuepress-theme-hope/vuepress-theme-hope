import { path } from "@vuepress/utils";
import { getRootLangPath } from "@mr-hope/vuepress-shared";
import { i18n } from "./i18n";
import { injectLinkstoHead } from "./injectHead";
import { genManifest } from "./genManifest";
// import { getManifest, genManifest } from "./genManifest";
import { genServiceWorker } from "./genServiceWorker";

import type { PluginI18nConvert } from "@mr-hope/vuepress-shared";
import type { Plugin, PluginObject } from "@vuepress/core";
import type { PWAI18NConfig, PWAOptions } from "../shared";

const pwaPlugin: Plugin<PWAOptions> = (options, app) => {
  const { base, themeConfig } = app.options;
  const pwaI18nConfig = i18n as PluginI18nConvert<PWAI18NConfig>;
  const pwaOption =
    Object.keys(options).length > 0
      ? options
      : (themeConfig.pwa as PWAOptions) || {};

  pwaI18nConfig["/"] = pwaI18nConfig[getRootLangPath(app)];

  const config: PluginObject = {
    name: "pwa2",

    define: () => ({
      PWA_I18N: pwaI18nConfig,
      SW_PATH: options.swPath || "service-worker.js",
    }),

    clientAppRootComponentFiles:
      pwaOption.popupComponent ||
      path.resolve(__dirname, "../client/global-components/SWUpdatePopup.js"),

    clientAppSetupFiles: path.resolve(__dirname, "../client/appSetup.js"),

    // beforeDevServer(app) {
    //   app.get(`${base || "/"}manifest.webmanifest`, (_req, res) => {
    //     getManifest(pwaOption, app)
    //       .then((manifest) => {
    //         res.send(manifest);
    //       })
    //       .catch(() =>
    //         res.status(500).send("Unexpected manifest generate error")
    //       );
    //   });
    // },

    onPrepared(): void {
      app.siteData.head = injectLinkstoHead(pwaOption, base, app.siteData.head);
    },

    plugins: ["@mr-hope/palette"],

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
