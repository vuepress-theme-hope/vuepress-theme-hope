/* eslint-disable @typescript-eslint/naming-convention */
import { getRootLang } from "@mr-hope/vuepress-shared";
import { cyan } from "chalk";
import { existsSync, readFile, writeJSON } from "fs-extra";
import { relative } from "path";
import { logger } from "./logger";

import type { App } from "@vuepress/core";
import type { ManifestOption, PWAOptions } from "../shared";

export const getManifest = async (
  options: PWAOptions,
  app: App
): Promise<ManifestOption> => {
  const { dir, siteData } = app;
  const { base, themeConfig } = app.options;
  const userManifestPath = dir.source(".vuepress/public/manifest.webmanifest");
  const userManifestJSONPath = dir.source(".vuepress/public/manifest.json");

  const optionManifest = options.manifest || {};

  const userManifest = JSON.parse(
    existsSync(userManifestPath)
      ? await readFile(userManifestPath, "utf8")
      : existsSync(userManifestJSONPath)
      ? await readFile(userManifestJSONPath, "utf8")
      : "{}"
  ) as ManifestOption;

  const finalManifest: ManifestOption = {
    name: siteData.title || (themeConfig.title as string | undefined) || "Site",
    short_name:
      siteData.title || (themeConfig.title as string | undefined) || "Site",
    description:
      siteData.description || "A site built with vuepress-theme-hope",
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

export const genManifest = async (
  options: PWAOptions,
  app: App
): Promise<void> => {
  logger.load("Generating manifest.webmanifest");

  const { dir } = app;
  const manifest = await getManifest(options, app);
  const manifestPath = dir.dest("manifest.webmanifest");

  await writeJSON(manifestPath, manifest, {
    flag: "w",
  });

  logger.success();
  logger.update(
    `Manifest generated and saved to ${cyan(
      relative(process.cwd(), manifestPath)
    )}!`
  );
};
