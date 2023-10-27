import type { PluginFunction, PluginObject } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import { checkVersion } from "vuepress-shared/node";

import { convertOptions } from "./compact/index.js";
import { generateSiteMap } from "./generateSitemap.js";
import type { SitemapOptions } from "./options.js";
import { PLUGIN_NAME, logger } from "./utils.js";

export const sitemapPlugin =
  (options: SitemapOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy)
      convertOptions(options as SitemapOptions & Record<string, unknown>);
    checkVersion(app, PLUGIN_NAME, "2.0.0-beta.67");

    if (app.env.isDebug) logger.info("Options:", options);

    const plugin: PluginObject = {
      name: PLUGIN_NAME,
    };

    if (!options.hostname) {
      logger.error(`Option ${colors.magenta("hostname")} is required!`);

      return plugin;
    }

    return {
      ...plugin,

      onGenerated: (app): Promise<void> => generateSiteMap(app, options),
    };
  };
