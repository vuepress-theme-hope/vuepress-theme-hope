/* eslint-disable @typescript-eslint/naming-convention */
import { resolve } from "path";
import chalk = require("chalk");
import fs = require("fs-extra");

import { ManifestOption, PWAOptions } from "../types";
import { Context } from "@mr-hope/vuepress-types";

export const genManifest = async (
  options: PWAOptions,
  context: Context
): Promise<void> => {
  const { sourceDir, outDir, siteConfig, themeConfig } = context;
  const userManifestPath = resolve(
    sourceDir,
    "./.vuepress/public/manifest.webmanifest"
  );
  const userManifestJSONPath = resolve(
    sourceDir,
    "./.vuepress/public/manifest.json"
  );

  const optionManifest = options.manifest || {};

  const userManifest = JSON.parse(
    fs.existsSync(userManifestPath)
      ? await fs.readFile(userManifestPath, "utf8")
      : fs.existsSync(userManifestJSONPath)
      ? await fs.readFile(userManifestJSONPath, "utf8")
      : "{}"
  ) as ManifestOption;

  const finalManifest: ManifestOption = {
    name:
      siteConfig.title || (themeConfig.title as string | undefined) || "Site",
    short_name:
      siteConfig.title || (themeConfig.title as string | undefined) || "Site",
    description:
      siteConfig.description || "A site built with vuepress-theme-hope",
    lang: options.baseLang || themeConfig.baseLang || "en-US",
    start_url: context.base,
    scope: context.base,

    display: "standalone",
    theme_color: options.themeColor || "#46bd87",
    background_color: "#ffffff",
    orientation: "portrait-primary",
    prefer_related_applications: false,

    ...userManifest,
    ...optionManifest,
  };

  await fs.writeJSON(resolve(outDir, "manifest.webmanifest"), finalManifest, {
    flag: "w",
  });

  console.log(
    chalk.blue("PWA:"),
    chalk.black.bgGreen("Success"),
    "Generated manifest.webmanifest"
  );
};
