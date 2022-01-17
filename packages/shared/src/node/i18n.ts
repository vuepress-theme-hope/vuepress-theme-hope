import { checkLang, deepAssign, lang2Path, showLangError } from "../shared";
import type { App, AppOptions, LocaleConfig } from "@vuepress/core";
import type {
  BaseThemeConfig,
  HopeLang,
  ResolvedLocaleConfig,
} from "../shared";

/**
 * Get language of root directory
 *
 * @param app VuePress Node App
 * @returns root language
 */
export const getRootLang = (app: App): HopeLang => {
  // infer from siteLocale
  const siteLocales = app.siteData.locales;

  if (siteLocales?.["/"] && checkLang(siteLocales["/"]?.lang))
    return siteLocales["/"].lang as HopeLang;

  // infer from themeLocale
  const options = app.options as AppOptions<BaseThemeConfig>;
  const themeLocales = options.themeConfig.locales;

  if (themeLocales?.["/"] && checkLang(themeLocales["/"]?.lang))
    return themeLocales["/"].lang as HopeLang;

  showLangError("root");

  return "en-US";
};

/**
 * Get the infer language path from root directory language
 *
 * @param app VuePress Node App
 * @returns infer language
 */
export const getRootLangPath = (app: App): string =>
  lang2Path(getRootLang(app));

export const getLocalePaths = (app: App): string[] =>
  Array.from(
    new Set([
      ...Object.keys(app.siteData.locales),
      ...Object.keys(
        (app.options as AppOptions<BaseThemeConfig>).themeConfig.locales || {}
      ),
    ])
  );

/**
 * Get final locale options to passed to client
 *
 * @param app  VuePress Node App
 * @param defaultI18nConfig default i18n config
 * @param userI18nConfig user i18n config
 * @returns final locale options
 */
export const getLocales = <T>(
  app: App,
  defaultI18nConfig: ResolvedLocaleConfig<T>,
  userI18nConfig: LocaleConfig<T> = {}
): ResolvedLocaleConfig<T> => {
  const rootPath = getRootLangPath(app);

  return Object.fromEntries([
    ...getLocalePaths(app).map<[string, T]>((localePath) => [
      localePath,
      deepAssign(
        {},
        userI18nConfig[localePath] || {},
        defaultI18nConfig[localePath]
      ),
    ]),
    [
      "/",
      deepAssign(
        {},
        userI18nConfig["/"] || userI18nConfig[rootPath] || {},
        defaultI18nConfig[rootPath]
      ),
    ],
  ]);
};
