import { black, blue, cyan } from "chalk";
import { readFile, statSync, writeFile } from "fs-extra";
import { relative, resolve } from "path";
import { generateSW } from "workbox-build";

import type {
  ManifestEntry,
  ManifestTransform,
  ManifestTransformResult,
} from "workbox-build";

import type { App } from "@vuepress/core";
import type { PWAOptions } from "../shared";

const imageFilter =
  (outDir: string, maxsize = 1024): ManifestTransform =>
  (manifestEntries: ManifestEntry[]): ManifestTransformResult => {
    const warnings: string[] = [];
    const manifest: ManifestEntry[] = [];
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
  console.log(
    blue("PWA:"),
    black.bgYellow("wait"),
    "Generating service worker..."
  );
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
