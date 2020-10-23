/* eslint-disable @typescript-eslint/naming-convention */
import { i18n } from "@mr-hope/vuepress-shared-utils";
import { resolve } from "path";
import { head } from "./head";
import { genManifest } from "./genManifest";
import { blue, black } from "chalk";
import { readFile, writeFile } from "fs-extra";
import WorkboxBuild = require("workbox-build");

import { Context, PluginOptionAPI } from "@mr-hope/vuepress-types";
import { PWAOptions } from "../types";

const pwaPlugin = (options: PWAOptions, context: Context): PluginOptionAPI => {
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
      blue("PWA:"),
      black.bgYellow("wait"),
      "Generating service worker..."
    );

    const swDest = resolve(outDir, "./service-worker.js");

    const additionalManifestEntries: WorkboxBuild.ManifestEntry[] = [];

    const globPatterns = ["**/*.{js,css,svg}", "**/*.{woff,woff2,eot,ttf,otf}"];

    if (options.cacheHTML === false)
      globPatterns.push("./index.html", "./404.html");
    else globPatterns.push("**/*.html");

    if (options.cachePic) globPatterns.push("**/*.{png,jpg,jpeg,gif,webp}");

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
        blue("PWA:"),
        black.bgGreen("Success"),
        `Generated service worker, which will precache ${count} files, totaling ${Math.ceil(
          size / 1024 / 1024
        )} Mb.\n${
          warnings.length > 0 ? `Warnings: ${warnings.toString()}:""` : ""
        }`
      );

      if (size > 104857600)
        console.log(
          black.bgRed("Error"),
          "Cache Size is larger than 100MB, so that it can not be registerd on all browsers.\n",
          blue("Please consider disable `cacheHTMl` and `cachePic`")
        );
      else if (size > 52428800)
        console.log(
          black.bgYellow("Warning"),
          "\nCache Size is larger than 50Mb, which will not be registerd on Safari.\n",
          blue("Please consider disable `cacheHTMl` and `cachePic`")
        );
    });

    await writeFile(
      swDest,
      await readFile(resolve(__dirname, "./skip-waiting.js"), "utf8"),
      { flag: "a" }
    );

    await genManifest(options, context);
  };

  return config;
};

pwaPlugin.head = head;

export = pwaPlugin;
