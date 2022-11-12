import { chalk } from "@vuepress/utils";
import { stripTags } from "vuepress-shared/node";

import { convertOptions } from "./compact/index.js";
import { appendSEO, generateRobotsTxt } from "./seo.js";
import { extractContent, logger } from "./utils.js";

import type { Plugin, PluginFunction } from "@vuepress/core";
import type { ExtendPage, SeoOptions } from "../shared/index.js";

export const seoPlugin =
  (options: SeoOptions, legacy = false): PluginFunction =>
  (app) => {
    // TODO: Remove it in v2 stable
    if (legacy) convertOptions(options as SeoOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const plugin: Plugin = { name: "vuepress-plugin-seo2" };

    if (!options.hostname) {
      logger.error(`Option ${chalk.magenta("hostname")} is required!`);

      return plugin;
    }

    return {
      ...plugin,

      extendsPage: (page: ExtendPage, app): void => {
        // generate summary
        if (!page.frontmatter.description && options.autoDescription)
          page.frontmatter.description =
            stripTags(page.excerpt) ||
            extractContent(page.content).slice(0, 180) ||
            "";

        appendSEO(page, options, app);
      },

      onGenerated: (app): Promise<void> => generateRobotsTxt(app.dir),
    };
  };
