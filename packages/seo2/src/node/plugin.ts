import { stripTags } from "@mr-hope/vuepress-shared";
import { resolvePagePermalink } from "@vuepress/core";
import { generateRobotsTxt, generateSeo } from "./seo";
import { appendSEO } from "./inject";
import { logger, md2text } from "./utils";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type {
  ExtendPage,
  PageSeoInfo,
  SeoContent,
  SeoOptions,
} from "../shared";

export const seoPlugin: Plugin<SeoOptions> = (options) => {
  if (!options.hostname) {
    logger.error("Option 'hostname' is required!");

    return { name: "vuepress-plugin-seo2" };
  }

  return {
    name: "vuepress-plugin-seo2",

    extendsPage: (page, app): void => {
      // generate summary
      if (!page.frontmatter.description)
        page.frontmatter.summary =
          stripTags(page.excerpt) || md2text(page.content).slice(0, 180) || "";

      const head = page.frontmatter.head || [];
      const pageSeoInfo: PageSeoInfo = {
        page: page as ExtendPage,
        app,
        permalink: resolvePagePermalink(page),
      };

      const { OGP, JSONLD } = generateSeo(options as SeoOptions, pageSeoInfo);

      const ogpContent: SeoContent = options.ogp
        ? options.ogp(OGP, pageSeoInfo)
        : OGP;

      const jsonLDContent = options.jsonLd
        ? options.jsonLd(JSONLD, pageSeoInfo)
        : null;

      appendSEO(head, ogpContent, options as SeoOptions);

      if (jsonLDContent)
        head.push([
          "script",
          { type: "application/ld+json" },
          JSON.stringify(jsonLDContent),
        ]);

      if (options.customHead) options.customHead(head, pageSeoInfo);

      page.frontmatter.head = head;
    },

    onGenerated: (app): Promise<void> => generateRobotsTxt(app.dir),
  };
};

export const seo = (options: SeoOptions | false): PluginConfig<SeoOptions> => [
  "seo2",
  options,
];
