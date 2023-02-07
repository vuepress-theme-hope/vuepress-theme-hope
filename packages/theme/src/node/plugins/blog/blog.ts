import { type App, type Page, type Plugin } from "@vuepress/core";
import { type BlogOptions, blogPlugin } from "vuepress-plugin-blog2";
import { keys, startsWith } from "vuepress-shared/node";

import { getCategoryCategory, getTagCategory } from "./category.js";
import { filter } from "./filter.js";
import { injectBasicInfo } from "./info.js";
import { getArticleType, getStarType, getTimelineType } from "./type.js";
import {
  ArticleInfoType,
  type BlogPluginOptions,
  type ThemeData,
  type ThemePageData,
} from "../../../shared/index.js";
import { checkFrontmatter } from "../../frontmatter/check.js";

export const getBlogPlugin = (
  app: App,
  themeData: ThemeData,
  options?: BlogPluginOptions | boolean,
  hotReload = false
): Plugin | null => {
  if (!options) return null;

  const blogOptions = options === true ? {} : options;
  const encryptedPaths = keys(themeData.encrypt.config || {});
  const isPageEncrypted = ({ path }: Page): boolean =>
    encryptedPaths.some((key) => startsWith(decodeURI(path), key));

  return blogPlugin(<BlogOptions>{
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

    filter: blogOptions.filter || filter,

    getInfo: (page: Page<ThemePageData>) => {
      const info: Record<string, unknown> = {};
      const isEncrypted = isPageEncrypted(page);

      checkFrontmatter(page, app.env.isDebug);
      injectBasicInfo(page, info);

      // resolve encrypted
      if (isEncrypted) info[ArticleInfoType.isEncrypted] = true;

      // resolve reading-time
      if (
        // reading time data is sensitive with markdown contents
        // we use this to prevent user triggers a page reload every time
        (hotReload || app.env.isBuild) &&
        // ensure a valid reading time exists
        page.data.readingTime &&
        page.data.readingTime.words !== 0
      )
        info[ArticleInfoType.readingTime] = page.data.readingTime;

      return info;
    },

    category: [
      getCategoryCategory(blogOptions, themeData),
      getTagCategory(blogOptions, themeData),
    ],

    type: [
      getArticleType(blogOptions, themeData),
      getStarType(blogOptions, themeData),
      getTimelineType(blogOptions, themeData),
      ...(blogOptions.type?.map((type) => ({ layout: "BlogType", ...type })) ||
        []),
    ],

    metaScope: "",

    hotReload,
    ...("hotReload" in blogOptions ? { hotReload: blogOptions.hotReload } : {}),
  });
};
