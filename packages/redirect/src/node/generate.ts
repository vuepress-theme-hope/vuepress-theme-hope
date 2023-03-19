import { type App, type Page } from "@vuepress/core";
import {
  isArray,
  isFunction,
  isLinkHttp,
  isPlainObject,
  removeEndingSlash,
  removeLeadingSlash,
} from "@vuepress/shared";
import { fs, path, withSpinner } from "@vuepress/utils";
import { entries, fromEntries, isAbsoluteUrl } from "vuepress-shared/node";

import { type RedirectLocaleOptions, type RedirectOptions } from "./options.js";
import { type RedirectPluginFrontmatterOption } from "./typings/index.js";
import { getLocaleRedirectHTML, getRedirectHTML } from "./utils.js";

export const generateLocaleRedirects = async (
  app: App,
  localeOptions: Required<RedirectLocaleOptions>
): Promise<void> => {
  const rootPaths = app.pages
    .filter(({ pathLocale }) => pathLocale === "/")
    .map(({ path }) => path);
  const localeRedirectMap: Record<string, string[]> = {};

  app.pages
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
        const filePath = app.dir.dest(removeLeadingSlash(rootPath));

        return fs
          .ensureDir(path.dirname(filePath))
          .then(() =>
            fs.writeFile(
              filePath,
              getLocaleRedirectHTML(localeOptions, availableLocales)
            )
          );
      })
    )
  );
};

export const generateRedirects = async (
  app: App,
  options: RedirectOptions
): Promise<void> => {
  const {
    dir,
    options: { base },
    pages,
  } = app;

  const config = isFunction(options.config)
    ? options.config(app)
    : isPlainObject(options.config)
    ? options.config
    : {};

  const redirectMap = fromEntries(
    (<Page<Record<string, never>, RedirectPluginFrontmatterOption>[]>pages)
      .map<[string, string][]>(({ frontmatter, path }) =>
        isArray(frontmatter.redirectFrom)
          ? frontmatter.redirectFrom.map((from) => [
              from.replace(/\/$/, "/index.html"),
              path,
            ])
          : frontmatter.redirectFrom
          ? [[frontmatter.redirectFrom.replace(/\/$/, "/index.html"), path]]
          : []
      )
      .flat()
  );

  const hostname = options.hostname
    ? isLinkHttp(options.hostname)
      ? removeEndingSlash(options.hostname)
      : `https://${removeEndingSlash(options.hostname)}`
    : "";

  await withSpinner("Generating redirect files")(() =>
    Promise.all(
      entries({ ...config, ...redirectMap }).map(([from, to]) => {
        const filePath = dir.dest(removeLeadingSlash(from));
        const redirectUrl = isAbsoluteUrl(to)
          ? `${hostname}${base}${removeLeadingSlash(to)}`
          : to;

        return fs
          .ensureDir(path.dirname(filePath))
          .then(() => fs.writeFile(filePath, getRedirectHTML(redirectUrl)));
      })
    )
  );
};
