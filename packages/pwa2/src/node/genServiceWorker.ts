import { blue, cyan } from "chalk";
import { statSync } from "fs-extra";
import { relative, resolve } from "path";
import { generateSW } from "workbox-build";
import { logger } from "./logger";

import type {
  ManifestEntry,
  ManifestTransform,
  ManifestTransformResult,
} from "workbox-build";

import type { App } from "@vuepress/core";
import type { PWAOptions } from "../shared";

const imageFilter =
  (outDir: string, maxsize = 1024): ManifestTransform =>
  (
    manifestEntries: (ManifestEntry & { size: number })[]
  ): ManifestTransformResult => {
    const warnings: string[] = [];
    const manifest: (ManifestEntry & { size: number })[] = [];
    const imageExtensions = [".png", ".jpg", ".jpeg", "webp", "bmp", "gif"];

    for (const entry of manifestEntries)
      if (imageExtensions.some((ext) => entry.url.endsWith(ext))) {
        const stats = statSync(resolve(outDir, entry.url));

        if (stats.size > maxsize * 1024)
          warnings.push(
            `Skipped ${entry.url}, as its ${Math.ceil(stats.size / 1024)} KB.\n`
          );
        else manifest.push(entry);
      } else manifest.push(entry);

    return { warnings, manifest };
  };

export const genServiceWorker = async (
  options: PWAOptions,
  app: App
): Promise<void> => {
  logger.load("Generating service worker");

  const { dest } = app.dir;
  const swDest = dest("service-worker.js");
  const destDir = relative(process.cwd(), dest());

  const additionalManifestEntries: ManifestEntry[] = [];

  const globPatterns = ["**/*.{js,css,svg}", "**/*.{woff,woff2,eot,ttf,otf}"];

  if (options.cacheHTML === false)
    globPatterns.push("./index.html", "./404.html");
  else globPatterns.push("**/*.html");

  if (options.cachePic) globPatterns.push("**/*.{png,jpg,jpeg,bmp,gif,webp}");

  await generateSW({
    swDest,
    globDirectory: destDir,
    cacheId: app.siteData.title || "hope",
    globPatterns,
    additionalManifestEntries,
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    maximumFileSizeToCacheInBytes: (options.maxSize || 2048) * 1024,
    manifestTransforms: [imageFilter(destDir, options.maxPicSize)],
    ...(options.generateSWConfig || {}),
  }).then(({ count, size, warnings }) => {
    logger.success();

    logger.info(
      `Precache ${cyan(`${count} files`)}, totaling ${cyan(
        `${(size / 1024 / 1024).toFixed(2)} Mb.`
      )}.`
    );

    if (warnings.length)
      logger.warn(`${warnings.map((warning) => `  · ${warning}`).join("\n")}`);

    if (size > 104857600)
      logger.error(
        `Cache Size is larger than 100MB, so that it can not be registerd on all browsers.\n${blue(
          "Please consider disable `cacheHTML` and `cachePic`, or set `maxSize` and `maxPicSize` option.\n"
        )}`
      );
    else if (size > 52428800)
      logger.warn(
        `\nCache Size is larger than 50MB, which will not be registerd on Safari.\n${blue(
          "Please consider disable `cacheHTML` and `cachePic`, or set `maxSize` and `maxPicSize` option.\n"
        )}`
      );
  });
};
