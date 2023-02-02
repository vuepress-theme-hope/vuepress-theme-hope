import { type UserConfig } from "@vuepress/cli";
import { type ThemeFunction } from "@vuepress/core";
import { isFunction, isPlainObject } from "@vuepress/shared";
import { colors } from "@vuepress/utils";

import { convertThemeOptions } from "./theme.js";
import { deprecatedMsg } from "./utils.js";
import {
  type NavbarOptions,
  type SidebarArrayOptions,
  type SidebarObjectOptions,
  type SidebarOptions,
  type ThemeOptions,
} from "../../shared/index.js";
import { hopeTheme } from "../theme.js";
import { logger } from "../utils.js";

/**
 * import and use `hopeTheme` instead
 *
 * @description This function will be removed in v2 future release and is only available before v2 touch stable
 */
export const hopeThemeLegacy = (themeOptions: ThemeOptions): ThemeFunction =>
  hopeTheme(themeOptions, true);

/**
 * @deprecated use `import { navbar } from "vuepress-theme-hope";` instead
 */
export const defineNavbarConfig = (config: NavbarOptions): NavbarOptions => {
  deprecatedMsg(
    "defineNavbarConfig",
    'import { navbar } from "vuepress-theme-hope";'
  );

  return config;
};

/**
 * @deprecated use `import { sidebar } from "vuepress-theme-hope";` instead
 */
export const defineSidebarConfig = (config: SidebarOptions): SidebarOptions => {
  deprecatedMsg(
    "defineSidebarConfig",
    'import { sidebar } from "vuepress-theme-hope";'
  );

  return config;
};

/**
 * @deprecated use `import { arraySidebar } from "vuepress-theme-hope";` instead
 */
export const defineSidebarArrayConfig = (
  config: SidebarArrayOptions
): SidebarArrayOptions => {
  deprecatedMsg(
    "defineSidebarArrayConfig",
    'import { arraySidebar } from "vuepress-theme-hope";'
  );

  return config;
};

/**
 * @deprecated use `import { objectSidebar } from "vuepress-theme-hope";` instead
 */
export const defineSidebarObjectConfig = (
  config: SidebarObjectOptions
): SidebarObjectOptions => {
  deprecatedMsg(
    "defineSidebarObjectConfig",
    'import { objectSidebar } from "vuepress-theme-hope";'
  );

  return config;
};

/**
 * @deprecated use `import { hopeThemeLegacy } from "vuepress-theme-hope";` instead
 */
export const defineThemeConfig = (themeConfig: ThemeOptions): ThemeOptions => {
  deprecatedMsg(
    "defineThemeConfig",
    'import { hopeThemeLegacy } from "vuepress-theme-hope";'
  );

  return convertThemeOptions(
    themeConfig as ThemeOptions & Record<string, unknown>
  );
};

/**
 * @deprecated import and use `hopeTheme` instead
 */
export const defineHopeConfig = (
  config: UserConfig & Record<string, unknown>
): UserConfig => {
  logger.warn(
    `\
"${colors.magenta("defineHopeConfig")}" is ${colors.red(
      "deprecated"
    )}, please use the following code instead:

${colors.magenta(`\
import { defineUserConfig } from "vuepress";
import { hopeThemeLegacy } from "vuepress-theme-hope";

export default {
  // site config
  // ...

  theme : hopeThemeLegacy({
    // theme config
    // ...
  }),
};
`)}
`
  );

  // check themeConfig
  if ("themeConfig" in config && isPlainObject(config["themeConfig"])) {
    config.theme = hopeThemeLegacy(config["themeConfig"] as ThemeOptions);
  }

  // check theme
  if (!isFunction(config.theme)) config.theme = hopeThemeLegacy({});

  return config;
};
