import type { Plugin, PluginFunction } from "@vuepress/core";
import { colors } from "@vuepress/utils";
import { checkVersion } from "vuepress-shared/node";

import { convertOptions } from "./compact.js";
import { generateDescription } from "./description.js";
import type { SeoOptions } from "./options.js";
import { appendSEO, generateRobotsTxt } from "./seo.js";
import type { ExtendPage } from "./typings/index.js";
import { PLUGIN_NAME, logger } from "./utils.js";

export const seoPlugin =
  (options: SeoOptions, legacy = true): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy) convertOptions(options as SeoOptions & Record<string, unknown>);
    checkVersion(app, PLUGIN_NAME, "2.0.0-rc.0");

    if (app.env.isDebug) logger.info("Options:", options);

    const plugin: Plugin = { name: PLUGIN_NAME };

    if (!options.hostname) {
      logger.error(`Option ${colors.magenta("hostname")} is required!`);

      return plugin;
    }

    return {
      ...plugin,

      extendsPage: (page: ExtendPage): void => {
        if (page.frontmatter.seo !== false)
          generateDescription(page, options.autoDescription !== false);
      },

      onInitialized: (app): void => {
        appendSEO(app, options);
      },

      onGenerated: (app): Promise<void> => generateRobotsTxt(app.dir),
    };
  };
