import { type App } from "@vuepress/core";
import { fs, path, withSpinner } from "@vuepress/utils";
import {
  entries,
  isAbsoluteUrl,
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "vuepress-shared/node";

import { getLocaleRedirectHTML, getRedirectHTML } from "./utils.js";
import { type LocaleRedirectConfig } from "../shared/index.js";

export const generateAutoLocaleRedirects = async (
  { dir, options, pages }: App,
  localeOptions: LocaleRedirectConfig
): Promise<void> => {
  const rootPaths = pages
    .filter(({ pathLocale }) => pathLocale === "/")
    .map(({ path }) => path);
  const localeRedirectMap: Record<string, string[]> = {};

  pages
    .filter(({ pathLocale }) => pathLocale !== "/")
    .forEach(({ path, pathLocale }) => {
      const rootPath = path
        .replace(pathLocale, "/")
        .replace(/\/$/, "/index.html");

      if (!rootPaths.includes(rootPath))
        (localeRedirectMap[rootPath] ??= []).push(pathLocale);
    });

  await withSpinner("Generating locale redirect files")(() =>
    Promise.all(
      entries(localeRedirectMap).map(([rootPath, availableLocales]) => {
        const filePath = dir.dest(removeLeadingSlash(rootPath));

        return fs.existsSync(filePath)
          ? Promise.resolve()
          : fs
              .ensureDir(path.dirname(filePath))
              .then(() =>
                fs.writeFile(
                  filePath,
                  getLocaleRedirectHTML(
                    localeOptions,
                    availableLocales,
                    options.base
                  )
                )
              );
      })
    )
  );
};

export const generateRedirects = async (
  { dir, options }: App,
  config: Record<string, string>,
  hostname = ""
): Promise<void> => {
  const resolvedHostname = hostname
    ? isLinkHttp(hostname)
      ? removeEndingSlash(hostname)
      : `https://${removeEndingSlash(hostname)}`
    : "";

  await withSpinner("Generating redirect files")(() =>
    Promise.all(
      entries(config).map(([from, to]) => {
        const filePath = dir.dest(removeLeadingSlash(from));
        const redirectUrl = isAbsoluteUrl(to)
          ? `${resolvedHostname}${options.base}${removeLeadingSlash(to)}`
          : to;

        return fs.existsSync(filePath)
          ? Promise.resolve()
          : fs
              .ensureDir(path.dirname(filePath))
              .then(() => fs.writeFile(filePath, getRedirectHTML(redirectUrl)));
      })
    )
  );
};
