import { convertThemeConfig } from "./theme";
import { hopeTheme } from "../theme";
import { logger } from "../utils";

import type { UserConfig } from "@vuepress/cli";
import type {
  HopeThemeNavbarConfig,
  HopeThemeSidebarConfig,
  HopeThemeSidebarArrayConfig,
  HopeThemeSidebarObjectConfig,
  HopeThemeOptions,
} from "../../shared";

/**
 * @deprecated use `navbar` instead
 */
export const defineNavbarConfig = (
  config: HopeThemeNavbarConfig
): HopeThemeNavbarConfig => {
  logger.warn(
    '"defineNavbarConfig" is deprecated, please import and use "navbar" from vuepress-theme-hope instead.'
  );

  return config;
};

/**
 * @deprecated use `sidebar` instead
 */
export const defineSidebarConfig = (
  config: HopeThemeSidebarConfig
): HopeThemeSidebarConfig => {
  logger.warn(
    '"defineSidebarConfig" is deprecated, please import and use "sidebar" from vuepress-theme-hope instead.'
  );

  return config;
};

/**
 * @deprecated use `arraySidebar` instead
 */
export const defineSidebarArrayConfig = (
  config: HopeThemeSidebarArrayConfig
): HopeThemeSidebarArrayConfig => {
  logger.warn(
    '"defineSidebarArrayConfig" is deprecated, please import and use "arraySidebar" from vuepress-theme-hope instead.'
  );

  return config;
};

/**
 * @deprecated use `objectSidebar` instead
 */
export const defineSidebarObjectConfig = (
  config: HopeThemeSidebarObjectConfig
): HopeThemeSidebarObjectConfig => {
  logger.warn(
    '"defineSidebarObjectConfig" is deprecated, please import and use "objectSidebar" from vuepress-theme-hope instead.'
  );

  return config;
};

/**
 * @deprecated import and use `hopeTheme` instead
 */
export const defineThemeConfig = (
  themeConfig: HopeThemeOptions
): HopeThemeOptions => {
  logger.warn(
    '"defineThemeConfig" is deprecated, please import "hopeTheme" from vuepress-theme-hope and use "theme : hopeTheme(themeConfig)" instead.'
  );

  return convertThemeConfig(
    themeConfig as HopeThemeOptions & Record<string, unknown>
  );
};

/**
 * @deprecated import and use `hopeTheme` instead
 */
export const defineHopeConfig = (
  config: UserConfig & Record<string, unknown>
): UserConfig => {
  logger.warn(
    '"defineHopeConfig" is deprecated, please import "hopeTheme" from vuepress-theme-hope and use "theme : hopeTheme(themeConfig)" instead.'
  );

  // check themeConfig
  if ("themeConfig" in config && typeof config["themeConfig"] === "object") {
    config.theme = hopeTheme(config["themeConfig"] as HopeThemeOptions, true);

    logger.warn(
      '"themeConfig" is deprecated, please import "hopeTheme" from vuepress-theme-hope and use "theme : hopeTheme(themeConfig)" instead.'
    );
  }

  // check theme
  if (typeof config.theme !== "function") config.theme = hopeTheme({});

  return config;
};
