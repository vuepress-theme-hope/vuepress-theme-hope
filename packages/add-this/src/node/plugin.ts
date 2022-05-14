import { chalk, path } from "@vuepress/utils";

import type { Plugin, PluginObject } from "@vuepress/core";
import type { AddThisOptions } from "../shared";
import { logger } from "./utils";

/**
 * `vuepress-plugin-add-this` Plugin
 */
export const addThisPlugin = ({ pubid }: AddThisOptions): Plugin => {
  const plugin: PluginObject = {
    name: "vuepress-plugin-add-this",
  };

  if (!pubid) {
    logger.error(`Option ${chalk.magenta("pubid")} is required`);

    return plugin;
  }

  return (app) => {
    if (app.env.isDebug) logger.info(`pubid: ${pubid}`);

    return {
      ...plugin,

      define: () => ({ PUB_ID: pubid }),

      clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    };
  };
};
