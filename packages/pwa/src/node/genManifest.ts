/* eslint-disable @typescript-eslint/naming-convention */
import { getRootLang } from "@mr-hope/vuepress-shared";
import { black, blue, cyan } from "chalk";
import { existsSync, readFile, writeJSON } from "fs-extra";
import { relative, resolve } from "path";

import type { Context } from "@mr-hope/vuepress-types";
import type { ManifestOption, PWAOptions } from "../types";

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
    lang: getRootLang(context),
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

  const { cwd, outDir } = context;
  const manifest = await getManifest(options, context);
  const manifestPath = resolve(outDir, "manifest.webmanifest");

  await writeJSON(manifestPath, manifest, {
    flag: "w",
  });

  console.log(
    blue("PWA:"),
    black.bgGreen("Success"),
    `Manifest generated and saved to ${cyan(relative(cwd, manifestPath))}`
  );
};
