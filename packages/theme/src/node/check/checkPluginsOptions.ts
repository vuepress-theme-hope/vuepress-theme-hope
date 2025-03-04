import { keys } from "@vuepress/helper";
import { colors } from "vuepress/utils";

import { PLUGIN_CHECKLIST } from "./utils.js";
import type { PluginsOptions } from "../../shared/index.js";
import { logger } from "../utils.js";

const KNOWN_THEME_PLUGIN_KEYS = PLUGIN_CHECKLIST.flatMap(([, key]) => key)
  .filter((key) => key.startsWith("plugins."))
  .map((key) => key.split(".")[1]);

/**
 * @private
 *
 * Check theme plugin options for noob users
 */
export const checkPluginsOptions = (plugins: PluginsOptions): void => {
  keys(plugins).forEach((key) => {
    if (!KNOWN_THEME_PLUGIN_KEYS.includes(key))
      logger.warn(
        `You are setting "${colors.magenta(
          `plugins.${key}`,
        )}" option in ${colors.cyan(
          "theme options",
        )}, but it's not supported by theme. You need to install the plugin yourself, import it in ${colors.cyan(
          "vuepress config file",
        )} and call it manually in "${colors.magenta("plugins")}" options.`,
      );
  });
};
