import { resolvePagePermalink } from "@vuepress/core";
import { generateRobotsTxt, generateSeo } from "./seo";
import { appendMeta } from "./meta";

import type { Page, Plugin } from "@vuepress/core";
import type { PageSeoInfo, SeoContent, SeoOptions } from "./types";

export * from "./types";

export const seoPlugin: Plugin<SeoOptions> = (options, app) => {
  const { base, themeConfig } = app.options;

  const seoOption =
    Object.keys(options).length > 0
      ? options
      : (themeConfig.seo as SeoOptions) || {};

  return {
    name: "seo",

    extendsPageData(page): void {
      const meta = page.frontmatter.head || [];
      const pageSeoInfo: PageSeoInfo = {
        page: page as Page & { lastUpdatedTime?: number } & Record<
            string,
            unknown
          >,
        app,
        permalink: resolvePagePermalink(page),
      };
      const metaContext: SeoContent = {
        ...generateSeo(seoOption, base, pageSeoInfo),
        ...(seoOption.seo ? seoOption.seo(pageSeoInfo) : {}),
      };

      appendMeta(meta, metaContext, seoOption);
      if (seoOption.customHead) seoOption.customHead(meta, pageSeoInfo);

      page.frontmatter.meta = meta;
    },

    async onGenerated(): Promise<void> {
      await generateRobotsTxt(app.dir);
    },

    plugins: [["@vuepress/last-updated"]],
  };
};

export default seoPlugin;
