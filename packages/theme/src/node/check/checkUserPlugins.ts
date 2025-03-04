import { isString } from "@vuepress/helper";
import type { App } from "vuepress/core";
import { colors } from "vuepress/utils";

import { PLUGIN_CHECKLIST } from "./utils.js";
import { logger } from "../utils.js";

/**
 * @private
 *
 * Check user plugin options for noob users
 */
export const checkUserPlugins = (app: App): void => {
  PLUGIN_CHECKLIST.forEach(([pluginName, optionName = "", hint = ""]) => {
    const themeIndex = app.pluginApi.plugins.findIndex(
      (item) => item.name === "vuepress-theme-hope",
    );
    const pluginsAfterTheme = app.pluginApi.plugins.slice(themeIndex + 1);

    if (pluginsAfterTheme.some(({ name }) => name === pluginName))
      logger.error(
        `You are not allowed to use plugin "${colors.magenta(
          pluginName,
        )}" yourself in ${colors.cyan("vuepress config file")}. ${
          hint ||
          (optionName
            ? `Set "${colors.magenta(isString(optionName) ? optionName : optionName.join(","))}" in ${colors.cyan(
                "theme options",
              )} to customize it.`
            : "")
        }`,
      );
  });
};
