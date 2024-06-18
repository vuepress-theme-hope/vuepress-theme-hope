import { keys } from "@vuepress/helper";
import { colors } from "vuepress/utils";

import { PLUGIN_CHECKLIST } from "./utils.js";
import type { PluginsOptions } from "../../shared/index.js";
import { logger } from "../utils.js";

const KNOWN_THEME_PLUGINS = PLUGIN_CHECKLIST.map(([, config]) => config).filter(
  Boolean,
);

/**
 * @private
 *
 * Check theme plugin options for noob users
 */
export const checkPluginsOptions = (plugins: PluginsOptions): void => {
  keys(plugins).forEach((key) => {
    if (!KNOWN_THEME_PLUGINS.includes(key))
      logger.warn(
        `You are setting "${colors.magenta(
          `plugins.${key}`,
        )}" option in ${colors.cyan(
          "theme options",
        )}, but it's not supported by theme. You need to install the plugin yourself and import then call it manually in "${colors.magenta(
          "plugins",
        )}" options in ${colors.cyan("vuepress config file")} directly.`,
      );
  });
};
