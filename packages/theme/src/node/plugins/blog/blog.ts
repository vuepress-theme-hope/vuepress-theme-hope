import { keys, startsWith } from "@vuepress/helper";
import type { BlogPluginOptions } from "@vuepress/plugin-blog";
import { blogPlugin } from "@vuepress/plugin-blog";
import type { Page, Plugin } from "vuepress/core";

import { getBlogCategoryCategory, getBlogTagCategory } from "./category.js";
import { blogFilter } from "./filter.js";
import { injectBlogBasicInfo } from "./info.js";
import {
  getBlogArticleType,
  getBlogStarType,
  getBlogTimelineType,
} from "./type.js";
import type {
  ArticleInfoData,
  BlogOptions,
  ThemeData,
  ThemePageData,
} from "../../../shared/index.js";

/** @private */
export const getBlogPlugin = (
  themeData: ThemeData,
  options?: BlogOptions | boolean,
  hotReload = false,
): Plugin | null => {
  if (!options) return null;

  const {
    excerpt = true,
    excerptLength,
    excerptSeparator,
    filter = blogFilter,
    slugify,
    ...blogOptions
  } = options === true ? {} : options;
  const encryptedPaths = keys(themeData.encrypt.config ?? {});
  const isPageEncrypted = ({ path }: Page): boolean =>
    encryptedPaths.some((key) => startsWith(decodeURI(path), key));

  return blogPlugin({
    excerpt,
    excerptLength,
    excerptSeparator,
    filter,
    slugify,

    excerptFilter: (page) => {
      const isEncrypted = isPageEncrypted(page);

      return !isEncrypted && !page.frontmatter.excerpt;
    },

    getInfo: (page: Page<ThemePageData>) => {
      const info: Partial<ArticleInfoData> = {};
      const isEncrypted = isPageEncrypted(page);

      injectBlogBasicInfo(page, info);

      // Resolve encrypted
      if (isEncrypted) info.isEncrypted = true;

      // Resolve reading-time
      if (
        // Ensure a valid reading time exists
        page.data.readingTime &&
        page.data.readingTime.words !== 0
      )
        info.readingTime = page.data.readingTime;

      return info as Record<string, unknown>;
    },

    category: [
      getBlogCategoryCategory(blogOptions, themeData),
      getBlogTagCategory(blogOptions, themeData),
    ],

    type: [
      getBlogArticleType(blogOptions, themeData),
      getBlogStarType(blogOptions, themeData),
      getBlogTimelineType(blogOptions, themeData),
      ...(blogOptions.type?.map((type) => ({ layout: "Blog", ...type })) ?? []),
    ],

    metaScope: "",

    hotReload: blogOptions.hotReload ?? hotReload,
  } as BlogPluginOptions);
};
