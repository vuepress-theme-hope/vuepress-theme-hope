import type { App, LocaleConfig } from "@vuepress/core";
import type { LocaleData } from "@vuepress/shared";

import { lang2PathConfig, path2langConfig } from "./config.js";
import type { HopeLang } from "./types.js";
import type { RequiredLocaleConfig } from "../../shared/index.js";
import { deepAssign, fromEntries, keys } from "../../shared/index.js";
import { Logger } from "../utils/index.js";

/** Get language from path */
export const path2Lang = (path = "", debug = false): HopeLang => {
  if (path in path2langConfig) return path2langConfig[path];

  if (debug)
    console.warn(
      `${path} isn’t assign with a lang, and will return "en-US" instead.`,
    );

  return "en-US";
};

/** Get path from language */
export const lang2Path = (lang = "", debug = false): string => {
  if (lang in lang2PathConfig) return lang2PathConfig[lang as HopeLang];

  if (debug)
    console.warn(`${lang} has no path config, and will return "/" instead.`);

  return "/";
};

/**
 * Get language of root directory
 *
 * @param app VuePress Node App
 * @returns root language
 */
export const getRootLang = (app: App): string => {
  // infer from siteLocale
  const siteLocales = app.siteData.locales;

  if (siteLocales?.["/"] && siteLocales["/"]?.lang)
    return siteLocales["/"].lang;

  return app.siteData.lang;
};

/**
 * Get the infer language path from root directory language
 *
 * @param app VuePress Node App
 * @returns infer language
 */
export const getRootLangPath = (app: App): string =>
  lang2Path(getRootLang(app), app.env.isDebug);

/**
 * Get locale paths
 *
 * @param app VuePress Node app
 * @returns locale paths
 */
export const getLocalePaths = (app: App): string[] =>
  Array.from(new Set(keys(app.siteData.locales)));

export interface GetLocalesOptions<T extends LocaleData> {
  /** VuePress Node app */
  app: App;
  /** Default locale config */
  default: RequiredLocaleConfig<T>;
  /** user locale config */
  config?: LocaleConfig<T> | undefined;
  /** plugin name */
  name?: string;
}

/**
 * Get final locale config for client
 *
 * @returns final locale config
 */
export const getLocales = <T extends LocaleData>({
  app,
  name,
  default: defaultLocalesConfig,
  config: userLocalesConfig = {},
}: GetLocalesOptions<T>): RequiredLocaleConfig<T> => {
  const rootPath = getRootLangPath(app);
  const logger = new Logger(name);

  return fromEntries([
    ...getLocalePaths(app)
      .filter((localePath) => localePath !== "/")
      .map<[string, T]>((localePath) => {
        const defaultLocaleData =
          defaultLocalesConfig[localePath] ||
          (lang2Path(app.options.locales[localePath].lang) === "/"
            ? null
            : defaultLocalesConfig[
                lang2Path(app.options.locales[localePath].lang)
              ]);

        if (!defaultLocaleData)
          logger.warn(`Locale ${localePath} is missing it's i18n config`);

        return [
          localePath,
          deepAssign(
            {},
            defaultLocaleData || defaultLocalesConfig[rootPath] || {},
            userLocalesConfig[localePath] || {},
          ),
        ];
      }),
    [
      "/",
      deepAssign(
        {},
        defaultLocalesConfig[rootPath],
        userLocalesConfig["/"] || userLocalesConfig[rootPath] || {},
      ),
    ],
  ]);
};
