import { type App } from "@vuepress/core";
import { colors, fs, path } from "@vuepress/utils";
import { endsWith } from "vuepress-shared/node";
import {
  type ManifestEntry,
  type ManifestTransform,
  type ManifestTransformResult,
  generateSW,
} from "workbox-build";

import { type PWAOptions } from "./options.js";
import { logger } from "./utils.js";

const imageFilter =
  (outDir: string, maxSize = 1024): ManifestTransform =>
  (
    manifestEntries: (ManifestEntry & { size: number })[]
  ): ManifestTransformResult => {
    const warnings: string[] = [];
    const manifest: (ManifestEntry & { size: number })[] = [];
    const imageExtensions = [".png", ".jpg", ".jpeg", "webp", "bmp", "gif"];

    for (const entry of manifestEntries)
      if (imageExtensions.some((ext) => endsWith(entry.url, ext))) {
        const stats = fs.statSync(path.resolve(outDir, entry.url));

        if (stats.size > maxSize * 1024)
          warnings.push(
            `Skipped ${entry.url}, as it's ${Math.ceil(stats.size / 1024)} KB.`
          );
        else manifest.push(entry);
      } else {
        manifest.push(entry);
      }

    return { warnings, manifest };
  };

export const generateServiceWorker = async (
  app: App,
  options: PWAOptions
): Promise<void> => {
  logger.load("Generating service worker");

  const { dest } = app.dir;
  const swDest = dest("service-worker.js");
  const destDir = path.relative(process.cwd(), dest());

  const globPatterns = ["**/*.{js,css,svg,woff,woff2,eot,ttf,otf}"];

  if (options.cacheHTML) globPatterns.push("**/*.html");
  else globPatterns.push("./index.html", "./404.html");

  if (options.cachePic) globPatterns.push("**/*.{png,jpg,jpeg,bmp,gif,webp}");

  await generateSW({
    swDest,
    globDirectory: destDir,
    globPatterns,
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    maximumFileSizeToCacheInBytes: (options.maxSize || 2048) * 1024,
    manifestTransforms: [imageFilter(destDir, options.maxPicSize)],
    ...(options.generateSWConfig || {}),
  }).then(({ count, size, warnings }) => {
    logger.succeed();

    logger.info(
      `Precache ${colors.cyan(`${count} files`)}, totaling ${colors.cyan(
        `${(size / 1024 / 1024).toFixed(2)} Mb.`
      )}.`
    );

    if (warnings.length)
      logger.warn(
        `\n${warnings.map((warning) => `  · ${warning}`).join("\n")}`
      );

    if (size > 104857600)
      logger.error(
        `Cache Size is larger than 100MB, so that it can not be registered on all browsers.\n${colors.blue(
          "Please consider disable `cacheHTML` and `cachePic`, or set `maxSize` and `maxPicSize` option.\n"
        )}`
      );
    else if (size > 52428800)
      logger.warn(
        `\nCache Size is larger than 50MB, which will not be registered on Safari.\n${colors.blue(
          "Please consider disable `cacheHTML` and `cachePic`, or set `maxSize` and `maxPicSize` option.\n"
        )}`
      );
  });
};
