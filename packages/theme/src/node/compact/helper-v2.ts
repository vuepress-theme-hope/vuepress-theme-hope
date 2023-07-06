import type { UserConfig } from "@vuepress/cli";
import { colors } from "@vuepress/utils";
import { isFunction, isPlainObject } from "vuepress-shared/node";

import { convertThemeOptions } from "./theme.js";
import { deprecatedMsg } from "./utils.js";
import type {
  NavbarOptions,
  SidebarArrayOptions,
  SidebarObjectOptions,
  SidebarOptions,
  ThemeOptions,
} from "../../shared/index.js";
import { hopeTheme } from "../theme.js";
import { logger } from "../utils.js";

/**
 * @deprecated use `import { navbar } from "vuepress-theme-hope";` instead
 */
export const defineNavbarConfig = (config: NavbarOptions): NavbarOptions => {
  deprecatedMsg(
    "defineNavbarConfig",
    'import { navbar } from "vuepress-theme-hope";',
  );

  return config;
};

/**
 * @deprecated use `import { sidebar } from "vuepress-theme-hope";` instead
 */
export const defineSidebarConfig = (config: SidebarOptions): SidebarOptions => {
  deprecatedMsg(
    "defineSidebarConfig",
    'import { sidebar } from "vuepress-theme-hope";',
  );

  return config;
};

/**
 * @deprecated use `import { arraySidebar } from "vuepress-theme-hope";` instead
 */
export const defineSidebarArrayConfig = (
  config: SidebarArrayOptions,
): SidebarArrayOptions => {
  deprecatedMsg(
    "defineSidebarArrayConfig",
    'import { arraySidebar } from "vuepress-theme-hope";',
  );

  return config;
};

/**
 * @deprecated use `import { objectSidebar } from "vuepress-theme-hope";` instead
 */
export const defineSidebarObjectConfig = (
  config: SidebarObjectOptions,
): SidebarObjectOptions => {
  deprecatedMsg(
    "defineSidebarObjectConfig",
    'import { objectSidebar } from "vuepress-theme-hope";',
  );

  return config;
};

/**
 * @deprecated use `import { hopeThemeLegacy } from "vuepress-theme-hope";` instead
 */
export const defineThemeConfig = (themeConfig: ThemeOptions): ThemeOptions => {
  deprecatedMsg(
    "defineThemeConfig",
    'import { hopeThemeLegacy } from "vuepress-theme-hope";',
  );

  return convertThemeOptions(
    themeConfig as ThemeOptions & Record<string, unknown>,
  );
};

/**
 * @deprecated import and use `hopeTheme` instead
 */
export const defineHopeConfig = (
  config: UserConfig & Record<string, unknown>,
): UserConfig => {
  logger.warn(
    `\
"${colors.magenta("defineHopeConfig")}" is ${colors.red(
      "deprecated",
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
`,
  );

  // check themeConfig
  if ("themeConfig" in config && isPlainObject(config["themeConfig"]))
    config.theme = hopeTheme(config["themeConfig"] as ThemeOptions);

  // check theme
  if (!isFunction(config.theme)) config.theme = hopeTheme({});

  return config;
};
