import { stripTags } from "@mr-hope/vuepress-shared";
import { generateRobotsTxt, appendSEO } from "./seo";
import { logger, md2text } from "./utils";

import type { PluginObject } from "@vuepress/core";
import type { ExtendPage, SeoOptions } from "../shared";

export const seoPlugin = (options: SeoOptions): PluginObject => {
  if (!options.hostname) {
    logger.error("Option 'hostname' is required!");

    return { name: "vuepress-plugin-seo2" };
  }

  return {
    name: "vuepress-plugin-seo2",

    extendsPage: (page: ExtendPage, app): void => {
      // generate summary
      if (!page.frontmatter.description)
        page.frontmatter.summary =
          stripTags(page.excerpt) || md2text(page.content).slice(0, 180) || "";

      appendSEO(page, options, app);
    },

    onGenerated: (app): Promise<void> => generateRobotsTxt(app.dir),
  };
};
