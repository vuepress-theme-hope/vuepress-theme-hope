import { keys, startsWith } from "@vuepress/helper";
import type { BlogPluginOptions } from "@vuepress/plugin-blog";
import { blogPlugin } from "@vuepress/plugin-blog";
import type { App, Page, Plugin } from "vuepress/core";

import { getBlogCategoryCategory, getBlogTagCategory } from "./category.js";
import { blogFilter } from "./filter.js";
import { injectBlogBasicInfo } from "./info.js";
import {
  getBlogArticleType,
  getBlogStarType,
  getBlogTimelineType,
} from "./type.js";
import type {
  BlogOptions,
  ThemeData,
  ThemePageData,
} from "../../../shared/index.js";
import { ArticleInfo } from "../../../shared/index.js";

/** @private */
export const getBlogPlugin = (
  app: App,
  themeData: ThemeData,
  options?: BlogOptions | boolean,
  hotReload = false,
): Plugin | null => {
  if (!options) return null;

  const blogOptions = options === true ? {} : options;
  const encryptedPaths = keys(themeData.encrypt.config || {});
  const isPageEncrypted = ({ path }: Page): boolean =>
    encryptedPaths.some((key) => startsWith(decodeURI(path), key));

  return blogPlugin(<BlogPluginOptions>{
    excerpt: blogOptions.excerpt !== false,

    ...("excerptLength" in blogOptions
      ? { excerptLength: blogOptions.excerptLength }
      : {}),

    ...("excerptSeparator" in blogOptions
      ? { excerptSeparator: blogOptions.excerptSeparator }
      : {}),

    excerptFilter: (page) => {
      const isEncrypted = isPageEncrypted(page);

      return !isEncrypted && !("excerpt" in page.frontmatter);
    },

    filter: blogOptions.filter || blogFilter,

    getInfo: (page: Page<ThemePageData>) => {
      const info: Record<string, unknown> = {};
      const isEncrypted = isPageEncrypted(page);

      injectBlogBasicInfo(page, info);

      // Resolve encrypted
      if (isEncrypted) info[ArticleInfo.isEncrypted] = true;

      // Resolve reading-time
      if (
        /*
         * Reading time data is sensitive with markdown contents
         * we use this to prevent user triggers a page reload every time
         */
        (hotReload || app.env.isBuild) &&
        // Ensure a valid reading time exists
        page.data.readingTime &&
        page.data.readingTime.words !== 0
      )
        info[ArticleInfo.readingTime] = page.data.readingTime;

      return info;
    },

    category: [
      getBlogCategoryCategory(blogOptions, themeData),
      getBlogTagCategory(blogOptions, themeData),
    ],

    type: [
      getBlogArticleType(blogOptions, themeData),
      getBlogStarType(blogOptions, themeData),
      getBlogTimelineType(blogOptions, themeData),
      ...(blogOptions.type?.map((type) => ({ layout: "BlogType", ...type })) ||
        []),
    ],

    metaScope: "",

    hotReload,
    ...("hotReload" in blogOptions ? { hotReload: blogOptions.hotReload } : {}),
    ...("slugify" in blogOptions ? { slugify: blogOptions.slugify } : {}),
  });
};
