import { colors } from "@vuepress/utils";

import { convertOptions } from "./compact/index.js";
import { appendSEO, generateRobotsTxt } from "./seo.js";
import { generateDescription } from "./description.js";
import { logger } from "./utils.js";

import type { Plugin, PluginFunction } from "@vuepress/core";
import type { SeoOptions } from "./options.js";
import type { ExtendPage } from "./typings/index.js";

export const seoPlugin =
  (options: SeoOptions, legacy = false): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy) convertOptions(options as SeoOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info("Options:", options);

    const plugin: Plugin = { name: "vuepress-plugin-seo2" };

    if (!options.hostname) {
      logger.error(`Option ${colors.magenta("hostname")} is required!`);

      return plugin;
    }

    return {
      ...plugin,

      extendsPage: (page: ExtendPage): void => {
        generateDescription(page, options.autoDescription !== false);
      },

      onInitialized: (app): void => {
        appendSEO(app, options);
      },

      onGenerated: (app): Promise<void> => generateRobotsTxt(app.dir),
    };
  };
