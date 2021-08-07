import { black, blue, cyan } from "chalk";
import { readFile, statSync, writeFile } from "fs-extra";
import { resolve } from "path";
import { generateSW } from "workbox-build";
import type { Context } from "@mr-hope/vuepress-types";
import type {
  ManifestEntry,
  ManifestTransform,
  ManifestTransformResult,
} from "workbox-build";
import type { PWAOptions } from "../types";

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
  context: Context
): Promise<void> => {
  console.log(
    blue("PWA:"),
    black.bgYellow("wait"),
    "Generating service worker..."
  );
  const swDest = resolve(context.outDir, "./service-worker.js");

  const additionalManifestEntries: ManifestEntry[] = [];

  const globPatterns = ["**/*.{js,css,svg}", "**/*.{woff,woff2,eot,ttf,otf}"];

  if (options.cacheHTML === false)
    globPatterns.push("./index.html", "./404.html");
  else globPatterns.push("**/*.html");

  if (options.cachePic) globPatterns.push("**/*.{png,jpg,jpeg,bmp,gif,webp}");

  await generateSW({
    swDest,
    globDirectory: context.outDir,
    cacheId: context.siteConfig.name || "mr-hope",
    globPatterns,
    additionalManifestEntries,
    cleanupOutdatedCaches: true,
    clientsClaim: true,
    maximumFileSizeToCacheInBytes: (options.maxSize || 2048) * 1024,
    manifestTransforms: [imageFilter(context.outDir, options.maxPicSize)],
    ...(options.generateSWConfig || {}),
  }).then(({ count, size, warnings }) => {
    console.log(
      blue("PWA:"),
      black.bgGreen("Success"),
      `Generated service worker, which will precache ${cyan(
        `${count} files`
      )}, totaling ${cyan(`${(size / 1024 / 1024).toFixed(2)} Mb`)}.`
    );

    if (warnings.length)
      console.log(
        blue("PWA:"),
        black.bgYellow("Warning"),
        `${warnings.map((warning) => `  · ${warning}`).join("\n")}`
      );

    if (size > 104857600)
      console.log(
        blue("PWA:"),
        black.bgRed("Error"),
        "Cache Size is larger than 100MB, so that it can not be registerd on all browsers.\n",
        blue(
          "Please consider disable `cacheHTML` and `cachePic`, or set `maxSize` and `maxPicSize` option.\n"
        )
      );
    else if (size > 52428800)
      console.log(
        blue("PWA:"),
        black.bgYellow("Warning"),
        "\nCache Size is larger than 50MB, which will not be registerd on Safari.\n",
        blue(
          "Please consider disable `cacheHTML` and `cachePic`, or set `maxSize` and `maxPicSize` option.\n"
        )
      );
  });

  await writeFile(
    swDest,
    await readFile(resolve(__dirname, "./skip-waiting.js"), "utf8"),
    { flag: "a" }
  );
};
