import { i18n, lang2path } from "@mr-hope/vuepress-utils";
import { resolve } from "path";
import { head } from "./head";
import { getManifest, genManifest } from "./genManifest";
import { genServiceWorker } from "./genServiceWorker";

import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { PWAOptions } from "../types";

const pwaPlugin = (options: PWAOptions, context: Context): PluginOptionAPI => {
  const { base, themeConfig } = context;
  const baseLang = options.baseLang || themeConfig.baseLang || "en-US";
  const baseLangPath = lang2path(baseLang);
  const pwaI18N = i18n.pwa;
  const pwaOption =
    Object.keys(options).length > 0 ? options : themeConfig.pwa || {};

  pwaI18N["/"] = pwaI18N[baseLangPath];

  const config: PluginOptionAPI = {
    name: "pwa",

    define: () => ({
      PWA_I18N: pwaI18N,
      SW_BASE_URL: base || "/",
    }),

    globalUIComponents: [pwaOption.popupComponent || "SWUpdatePopup"],

    enhanceAppFiles: resolve(__dirname, "../client/enhanceAppFile.js"),

    beforeDevServer(app) {
      app.get(`${base || "/"}manifest.webmanifest`, (_req, res) => {
        getManifest(pwaOption, context)
          .then((manifest) => {
            res.send(manifest);
          })
          .catch(() =>
            res.status(500).send("Unexpected manifest generate error")
          );
      });
    },

    async generated(): Promise<void> {
      await genManifest(pwaOption, context);
      await genServiceWorker(pwaOption, context);
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (pwaOption.showInstall !== false)
    (config.globalUIComponents as string[]).push("PWAInstall");

  return config;
};

pwaPlugin.head = head;

export = pwaPlugin;
