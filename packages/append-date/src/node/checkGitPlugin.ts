import { createRequire } from "node:module";

import type { App } from "vuepress/core";
import { colors } from "vuepress/utils";

import { logger } from "./utils.js";

const require = createRequire(import.meta.url);

const GIT_PLUGIN_NAME = "@vuepress/plugin-git";

export const isGitPluginEnabled = (app: App): boolean => {
  if (
    app.pluginApi.plugins.every((plugin) => plugin.name !== GIT_PLUGIN_NAME)
  ) {
    try {
      require.resolve(GIT_PLUGIN_NAME);

      logger.info(`${colors.magenta(GIT_PLUGIN_NAME)} is not enabled.`);

      return false;
    } catch (err) {
      logger.error(
        `${colors.magenta(
          GIT_PLUGIN_NAME,
        )} is required for this plugin, please install it.`,
      );
    }

    return false;
  }

  return true;
};
