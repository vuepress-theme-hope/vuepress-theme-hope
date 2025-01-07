import { isPlainObject } from "@vuepress/helper";
import { backToTopPlugin } from "@vuepress/plugin-back-to-top";
import { copyCodePlugin } from "@vuepress/plugin-copy-code";
import { iconPlugin } from "@vuepress/plugin-icon";
import { linksCheckPlugin } from "@vuepress/plugin-links-check";
import { markdownExtPlugin } from "@vuepress/plugin-markdown-ext";
import { markdownHintPlugin } from "@vuepress/plugin-markdown-hint";
import { markdownIncludePlugin } from "@vuepress/plugin-markdown-include";
import { markdownMathPlugin } from "@vuepress/plugin-markdown-math";
import { markdownTabPlugin } from "@vuepress/plugin-markdown-tab";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { photoSwipePlugin } from "@vuepress/plugin-photo-swipe";
import { themeDataPlugin } from "@vuepress/plugin-theme-data";
import type { App, PluginConfig } from "vuepress/core";

import { getActiveHeaderLinksPlugin } from "./activeHeaderLinks.js";
import { getBlogPlugin } from "./blog/index.js";
import { getCatalogPlugin } from "./catalog.js";
import { getCommentPlugin } from "./comment.js";
import { getComponentsPlugin } from "./components.js";
import { getCopyrightPlugin } from "./copyright.js";
import { getFeedPlugin } from "./feed.js";
import { getMarkdownImagePlugin } from "./markdownImage.js";
import { getMarkdownStylizePlugin } from "./markdownStylize.js";
import { getMdEnhancePlugin } from "./mdEnhance.js";
import { getNoticePlugin } from "./notice.js";
import { getPwaPlugin } from "./pwa.js";
import { getRedirectPlugin } from "./redirect.js";
import { getRevealJsPlugin } from "./revealjs.js";
import { getRtlPlugin } from "./rtl.js";
import { getSearchPlugin } from "./search.js";
import { getSEOPlugin } from "./seo.js";
import { getSitemapPlugin } from "./sitemap.js";
import { getWatermarkPlugin } from "./watermark.js";
import type { ThemeData, ThemeOptions } from "../../shared/index.js";
import { checkPluginsOptions } from "../check/index.js";

/**
 * @private
 *
 * Get theme plugins
 */
export const getPlugins = (
  app: App,
  themeData: ThemeData,
  {
    markdown: markdownOptions = {},
    plugins: pluginsOptions = {},
    ...options
  }: Pick<
    ThemeOptions,
    | "hostname"
    | "hotReload"
    | "iconAssets"
    | "iconPrefix"
    | "favicon"
    | "plugins"
    | "markdown"
  >,
  legacy = false,
): PluginConfig => {
  checkPluginsOptions(pluginsOptions);

  const {
    alert = false,
    hint = true,
    include = true,
    linksCheck,
    math,
  } = markdownOptions;
  const { backToTop, copyCode, photoSwipe } = pluginsOptions;

  return [
    /*
     * markdown plugins
     */
    // @vuepress/plugin-links-check
    linksCheck === false
      ? null
      : linksCheckPlugin(isPlainObject(linksCheck) ? linksCheck : {}),
    // @vuepress/plugin-markdown-ext
    markdownExtPlugin(markdownOptions),
    // @vuepress/plugin-markdown-hint
    alert || hint ? markdownHintPlugin({ alert, hint }) : null,
    // @vuepress/plugin-markdown-include
    include
      ? markdownIncludePlugin(isPlainObject(include) ? include : {})
      : null,
    // @vuepress/plugin-markdown-math
    isPlainObject(math)
      ? markdownMathPlugin(math)
      : math
        ? markdownMathPlugin()
        : null,
    // @vuepress/plugin-markdown-tab
    markdownTabPlugin(markdownOptions),
    getMdEnhancePlugin(markdownOptions, legacy),
    getMarkdownImagePlugin(markdownOptions),
    getMarkdownStylizePlugin(markdownOptions),
    getRevealJsPlugin(markdownOptions.revealjs),

    themeDataPlugin({ themeData }),

    /*
     * feature plugins
     */
    // @vuepress/plugin-back-to-top
    backToTop === false
      ? null
      : backToTopPlugin(isPlainObject(backToTop) ? backToTop : {}),
    // @vuepress/plugin-copy-code
    copyCode === false
      ? null
      : copyCodePlugin(isPlainObject(copyCode) ? copyCode : {}),
    // @vuepress/plugin-icon
    iconPlugin(pluginsOptions.icon ?? {}),
    // @vuepress/plugin-photo-swipe
    photoSwipe === false
      ? null
      : photoSwipePlugin(isPlainObject(photoSwipe) ? photoSwipe : {}),

    getComponentsPlugin(pluginsOptions.components, legacy),
    getActiveHeaderLinksPlugin(pluginsOptions.activeHeaderLinks),
    getCatalogPlugin(pluginsOptions.catalog),
    pluginsOptions.nprogress === false ? null : nprogressPlugin(),
    getBlogPlugin(themeData, pluginsOptions.blog, options.hotReload),
    getCommentPlugin(pluginsOptions.comment),
    getCopyrightPlugin(themeData, pluginsOptions.copyright, options.hostname),
    // Seo should work before feed
    getSEOPlugin(themeData, pluginsOptions.seo, options.hostname),
    getFeedPlugin(
      themeData,
      pluginsOptions.feed,
      options.hostname,
      options.favicon,
      legacy,
    ),
    getNoticePlugin(pluginsOptions.notice),
    getPwaPlugin(pluginsOptions.pwa, options.favicon),
    getSearchPlugin(app, themeData, pluginsOptions),
    getSitemapPlugin(pluginsOptions.sitemap, options.hostname),
    getRtlPlugin(themeData),
    getRedirectPlugin(pluginsOptions.redirect),
    getWatermarkPlugin(pluginsOptions.watermark),
  ].filter((item) => item !== null);
};
