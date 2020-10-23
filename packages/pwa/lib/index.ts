/* eslint-disable @typescript-eslint/naming-convention */
import { i18n } from "@mr-hope/vuepress-shared-utils";
import { resolve } from "path";
import { head } from "./head";
import { genManifest } from "./genManifest";

import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { PWAOptions } from "../types";
import { genServiceWorker } from "./genServiceWorker";

const pwaPlugin = (options: PWAOptions, context: Context): PluginOptionAPI => {
  const { base, themeConfig } = context;
  const baseLang = options.baseLang || themeConfig.baseLang || "en-US";
  const baseLangPath = i18n.lang2path(baseLang);
  const pwaConfig = i18n.config.pwa;
  const pwaOption =
    Object.keys(options).length > 0 ? options : themeConfig.pwa || {};

  pwaConfig["/"] = pwaConfig[baseLangPath];

  const config: PluginOptionAPI = {
    name: "pwa",

    define: { SW_BASE_URL: base || "/", PWA_I18N: pwaConfig },

    globalUIComponents: pwaOption.popupComponent || "SWUpdatePopup",

    enhanceAppFiles: resolve(__dirname, "../src/enhanceAppFile.js"),

    async generated(): Promise<void> {
      await genManifest(pwaOption, context);
      await genServiceWorker(pwaOption, context);
    },
  };

  return config;
};

pwaPlugin.head = head;

export = pwaPlugin;
