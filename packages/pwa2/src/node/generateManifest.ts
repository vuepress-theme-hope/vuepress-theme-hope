/* eslint-disable @typescript-eslint/naming-convention */
import { chalk, fs, path } from "@vuepress/utils";
import { getRootLang } from "vuepress-shared";

import { logger } from "./utils";

import type { App } from "@vuepress/core";
import type { ManifestOption, PWAOptions } from "../shared";

export const getManifest = async (
  app: App,
  options: PWAOptions
): Promise<ManifestOption> => {
  const { dir, siteData } = app;

  const { base } = app.options;
  const userManifestPath = dir.source(".vuepress/public/manifest.webmanifest");
  const userManifestJSONPath = dir.source(".vuepress/public/manifest.json");

  const optionManifest = options.manifest || {};

  const userManifest = JSON.parse(
    fs.existsSync(userManifestPath)
      ? await fs.readFile(userManifestPath, "utf8")
      : fs.existsSync(userManifestJSONPath)
      ? await fs.readFile(userManifestJSONPath, "utf8")
      : "{}"
  ) as ManifestOption;

  const finalManifest: ManifestOption = {
    name: siteData.title || siteData.locales["/"]?.title || "Site",
    short_name: siteData.title || siteData.locales["/"]?.title || "Site",
    description:
      siteData.description ||
      siteData.locales["/"]?.description ||
      "A site built with vuepress",
    lang: getRootLang(app),
    start_url: base,
    scope: base,

    display: "standalone",
    theme_color: options.themeColor || "#46bd87",
    background_color: "#ffffff",
    orientation: "portrait-primary",
    prefer_related_applications: false,

    ...userManifest,
    ...optionManifest,
  };

  return finalManifest;
};

export const generateManifest = async (
  app: App,
  manifest: Promise<ManifestOption>
): Promise<void> => {
  logger.load("Generating manifest.webmanifest");

  const { dir } = app;
  const manifestPath = dir.dest("manifest.webmanifest");

  await fs.writeJSON(manifestPath, await manifest, {
    flag: "w",
  });

  logger.succeed();
  logger.update(
    `Manifest generated and saved to ${chalk.cyan(
      path.relative(process.cwd(), manifestPath)
    )}!`
  );
};
