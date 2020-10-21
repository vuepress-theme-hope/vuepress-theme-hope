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
    "./.vuepress/public/manifest.json"
  );
  const optionManifest = options.manifest || {};
  const userManifest = JSON.parse(
    fs.existsSync(userManifestPath)
      ? await fs.readFile(userManifestPath, "utf8")
      : "{}"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as Record<string, any>;

  const finalManifest: ManifestOption = {
    name:
      siteConfig.title || (themeConfig.title as string | undefined) || "Site",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    short_name:
      siteConfig.title || (themeConfig.title as string | undefined) || "Site",
    description:
      siteConfig.description || "A site built with vuepress-theme-hope",
    lang: options.baseLang || themeConfig.baseLang || "en-US",
    orientation: "portrait-primary",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    start_url: context.base,
    scope: context.base,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    background_color: "#ffffff",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    theme_color: "#46bd87",
    ...userManifest,
    ...optionManifest,
  };

  await fs.writeJSON(resolve(outDir, "./manifest.json"), finalManifest, {
    flag: "w",
  });

  console.log(
    chalk.blue("PWA:"),
    chalk.black.bgGreen("Success"),
    "Generated manifest.json"
  );
};
