/* eslint-disable @typescript-eslint/naming-convention */
import { i18n } from "@mr-hope/vuepress-shared-utils";
import { resolve } from "path";
import chalk = require("chalk");
import fs = require("fs-extra");
import workboxBuild = require("workbox-build");

import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { PWAOptions } from "../types";

export = (
  options: PWAOptions,
  { base, outDir, themeConfig }: Context
): PluginOptionAPI => {
  const baseLang = options.baseLang || themeConfig.baseLang || "en-US";
  const baseLangPath = i18n.lang2path(baseLang);
  const pwaConfig = i18n.config.pwa;
  const option =
    Object.keys(options).length > 0 ? options : themeConfig.pwa || {};

  pwaConfig["/"] = pwaConfig[baseLangPath];

  const config: PluginOptionAPI = {
    name: "pwa",

    define: { SW_BASE_URL: base || "/", PWA_I18N: pwaConfig },

    globalUIComponents: option.popupComponent || "SWUpdatePopup",

    enhanceAppFiles: resolve(__dirname, "../src/enhanceAppFile.js"),
  };

  config.generated = async (): Promise<void> => {
    console.log(chalk.cyan("wait"), "Generating service worker...");

    const swFilePath = resolve(outDir, "./service-worker.js");

    await workboxBuild.generateSW({
      swDest: swFilePath,
      globDirectory: outDir,
      globPatterns: [
        "**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}",
      ],
      ...(option.generateSWConfig || {}),
    });
    await fs.writeFile(
      swFilePath,
      await fs.readFile(resolve(__dirname, "./skip-waiting.js"), "utf8"),
      { flag: "a" }
    );
  };

  return config;
};
