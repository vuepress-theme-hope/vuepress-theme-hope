/* eslint-disable @typescript-eslint/naming-convention */
import { i18n } from "@mr-hope/vuepress-shared-utils";
import { resolve } from "path";
import { genManifest } from "./genManifest";
import chalk = require("chalk");
import fs = require("fs-extra");
import WorkboxBuild = require("workbox-build");

import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { PWAOptions } from "../types";

export = (options: PWAOptions, context: Context): PluginOptionAPI => {
  const { base, outDir, themeConfig, siteConfig } = context;
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
    console.log(
      chalk.blue("PWA:"),
      chalk.black.bgYellow("wait"),
      "Generating service worker..."
    );

    const swDest = resolve(outDir, "./service-worker.js");

    const additionalManifestEntries: WorkboxBuild.ManifestEntry[] = [];

    const globPatterns = [
      "**/*.{js,css,html}",
      "**/*.{woff,woff2,eot,ttf,otf}",
    ];

    if (options.cachePic) globPatterns.push("**/*.{png,jpg,jpeg,svg}");

    await WorkboxBuild.generateSW({
      swDest,
      globDirectory: outDir,
      cacheId: siteConfig.name || "mr-hope",
      globPatterns,
      additionalManifestEntries,
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      maximumFileSizeToCacheInBytes: (options.cacheMaxSize || 1024) * 1024,
      ...(option.generateSWConfig || {}),
    }).then(({ count, size, warnings }) => {
      console.log(
        chalk.blue("PWA:"),
        chalk.black.bgGreen("Success"),
        `Generated service worker, which will precache ${count} files, totaling ${size} bytes.\n${
          warnings.length > 0 ? `Warnings: ${warnings.toString()}:""` : ""
        }`
      );
    });

    await fs.writeFile(
      swDest,
      await fs.readFile(resolve(__dirname, "./skip-waiting.js"), "utf8"),
      { flag: "a" }
    );

    await genManifest(options, context);
  };

  return config;
};
