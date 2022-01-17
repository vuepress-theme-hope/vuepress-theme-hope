import { resolvePagePermalink } from "@vuepress/core";
import { generateRobotsTxt, generateSeo } from "./seo";
import { appendSEO } from "./inject";
import { logger } from "./utils";

import type { Plugin } from "@vuepress/core";
import type { ExtendPage, PageSeoInfo, SeoContent, SeoOptions } from "./types";

export * from "./types";

export const seoPlugin: Plugin<SeoOptions> = (options, app) => {
  const { themeConfig } = app.options;

  const seoOptions =
    Object.keys(options).length > 0
      ? (options as SeoOptions)
      : {
          hostname: themeConfig.hostname as string,
          ...((themeConfig.seo as Partial<SeoOptions>) || {}),
        };

  if (!seoOptions.hostname) {
    logger.error('Required option "hostname" is missing');

    return { name: "seo2" };
  }

  return {
    name: "seo2",

    extendsPage(page): void {
      const head = page.frontmatter.head || [];
      const pageSeoInfo: PageSeoInfo = {
        page: page as ExtendPage,
        app,
        permalink: resolvePagePermalink(page),
      };
      const { OGP, JSONLD } = generateSeo(seoOptions, pageSeoInfo);
      const metaContext: SeoContent = {
        ...OGP,
        ...(seoOptions.ogp ? seoOptions.ogp(pageSeoInfo) : {}),
      };

      appendSEO(head, metaContext, seoOptions);
      if (JSONLD)
        head.push([
          "script",
          { type: "application/ld+json" },
          JSON.stringify(JSONLD),
        ]);
      if (seoOptions.customHead) seoOptions.customHead(head, pageSeoInfo);

      page.frontmatter.head = head;
    },

    async onGenerated(): Promise<void> {
      await generateRobotsTxt(app.dir);
    },
  };
};

export default seoPlugin;
