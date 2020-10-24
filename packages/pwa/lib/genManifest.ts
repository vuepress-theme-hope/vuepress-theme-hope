/* eslint-disable @typescript-eslint/naming-convention */
import { resolve } from "path";
import { existsSync, readFile, writeJSON } from "fs-extra";
import { black, blue } from "chalk";

import { ManifestOption, PWAOptions } from "../types";
import { Context } from "@mr-hope/vuepress-types";

export const getManifest = async (
  options: PWAOptions,
  context: Context
): Promise<ManifestOption> => {
  const { sourceDir, siteConfig, themeConfig } = context;
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
    existsSync(userManifestPath)
      ? await readFile(userManifestPath, "utf8")
      : existsSync(userManifestJSONPath)
      ? await readFile(userManifestJSONPath, "utf8")
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

  return finalManifest;
};

export const genManifest = async (
  options: PWAOptions,
  context: Context
): Promise<void> => {
  console.log(
    blue("PWA:"),
    black.bgYellow("wait"),
    "Generating manifest.webmanifest..."
  );

  const manifest = getManifest(options, context);

  await writeJSON(resolve(context.outDir, "manifest.webmanifest"), manifest, {
    flag: "w",
  });

  console.log(
    blue("PWA:"),
    black.bgGreen("Success"),
    "Generated manifest.webmanifest"
  );
};
