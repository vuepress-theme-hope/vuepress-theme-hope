import { getLocales } from "@mr-hope/vuepress-shared";
import { themeLocalesData } from "./locales";
import type { HopeThemeData } from "../shared";
import type { App } from "@vuepress/core";

const defaultRootOptions = {};

/**
 * Assign default options to `themeConfig`
 */
export const assignDefaultLocaleOptions = (
  app: App,
  localeOptions: HopeThemeData
): void => {
  if (!localeOptions.locales) localeOptions.locales = {};

  if (!localeOptions.locales["/"]) localeOptions.locales["/"] = {};

  Object.assign(localeOptions, {
    ...defaultRootOptions,
    ...localeOptions,
  });

  localeOptions.locales = getLocales(
    app,
    themeLocalesData,
    localeOptions.locales
  );
};
