import { getLocales } from "@mr-hope/vuepress-shared";
import { themeLocalesData } from "./locales";
import type { HopeThemeOptions } from "../shared";
import type { App } from "@vuepress/core";

const defaultRootOptions: HopeThemeOptions = {
  iconPrefix: "icon-",
};

/**
 * Assign default options to `themeConfig`
 */
export const assignDefaultLocaleOptions = (
  app: App,
  localeOptions: HopeThemeOptions
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
