import { colors } from "@vuepress/utils";
import { getPageText, stripTags } from "vuepress-shared/node";

import { convertOptions } from "./compact/index.js";
import { appendSEO, generateRobotsTxt } from "./seo.js";
import { logger } from "./utils.js";

import type { Plugin, PluginFunction } from "@vuepress/core";
import type { SeoOptions } from "./options.js";
import type { ExtendPage } from "./typings/index.js";

export const seoPlugin =
  (options: SeoOptions, legacy = false): PluginFunction =>
  (app) => {
    // TODO: Remove this in v2 stable
    if (legacy) convertOptions(options as SeoOptions & Record<string, unknown>);
    if (app.env.isDebug) logger.info(`Options: ${options.toString()}`);

    const plugin: Plugin = { name: "vuepress-plugin-seo2" };

    if (!options.hostname) {
      logger.error(`Option ${colors.magenta("hostname")} is required!`);

      return plugin;
    }

    return {
      ...plugin,

      extendsPage: (page: ExtendPage, app): void => {
        // generate description
        if (
          !page.frontmatter.description &&
          options.autoDescription !== false
        ) {
          if (page.data.excerpt)
            page.frontmatter.description = stripTags(page.data.excerpt)
              // convert link breaks into spaces
              .replace(/(?:\r?\n)+/g, " ")
              // convert 2 or more spaces into 1
              .replace(/ +/g, " ")
              .trim();
          else {
            const pageText = getPageText(page.content);

            page.frontmatter.description =
              pageText.length > 180 ? `${pageText.slice(0, 177)}...` : pageText;
          }

          page.data.autoDesc = true;
        }

        appendSEO(page, options, app);
      },

      onGenerated: (app): Promise<void> => generateRobotsTxt(app.dir),
    };
  };
