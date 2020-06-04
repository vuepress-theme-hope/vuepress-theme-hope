import { Page, PluginConfig, ResolvedComponent } from "@mr-hope/vuepress-types";
import { ResolvedHopeThemeConfig } from "../types";
import { resolve } from "path";

const pluginConfig = (themeConfig: ResolvedHopeThemeConfig): PluginConfig[] => {
  // 设置作者
  if (themeConfig.comment && themeConfig.author)
    themeConfig.comment.author = themeConfig.author;

  // 设置域名
  if (themeConfig.hostname)
    if (themeConfig.sitemap) {
      if (!themeConfig.sitemap.hostname)
        themeConfig.sitemap.hostname = themeConfig.hostname;
    } else if (themeConfig.sitemap !== false)
      themeConfig.sitemap = { hostname: themeConfig.hostname };

  return [
    /** 评论插件 */
    ["@mr-hope/comment", themeConfig.comment],

    /** 全屏插件 */
    ["@mr-hope/components"],

    /** 更新时间插件 */
    [
      "@mr-hope/last-update",
      themeConfig.lastUpdated === false
        ? false
        : themeConfig.lastUpdatedTransformer
        ? { transformer: themeConfig.lastUpdatedTransformer }
        : {},
    ],

    /** PWA 插件 */
    ["@mr-hope/pwa", themeConfig.pwa],

    /** SEO 增强 */
    ["@mr-hope/seo", themeConfig.seo],

    /** Sitemap 生成 */
    ["@mr-hope/sitemap", themeConfig.sitemap],

    /** 自动激活侧边栏标题 */
    ["@vuepress/active-header-links", themeConfig.activeHeaderLinks],

    /** 博客插件 */
    [
      "@vuepress/blog",
      themeConfig.blog === false
        ? false
        : {
            frontmatters: [
              {
                id: "tag",
                keys: ["tag", "tags"],
                path: "/tag/",
                layout: "Blog",
                scopeLayout: "Blog",
              },
              {
                id: "category",
                keys: ["category", "categories"],
                path: "/category/",
                layout: "Blog",
                scopeLayout: "Blog",
              },
            ],
          },
    ],
    ["@vuepress/last-updated", false],

    /** 进度条 */
    "@vuepress/nprogress",

    /** 搜索插件 */
    [
      "@vuepress/search",
      {
        /** 搜索展示数量 */
        searchMaxSuggestions: themeConfig.searchMaxSuggestions || 10,
      },
    ],

    /** 使 VuePress 站点支持简洁链接 */
    ["clean-urls", { normalSuffix: "/" }],

    /** 复制操作处理 */
    [
      "copyright",
      typeof themeConfig.copyright === "object"
        ? {
            minLength: 100,
            disable: themeConfig.copyright.status === "local",
            clipboardComponent: resolve(
              __dirname,
              "../components/Clipboard.vue"
            ),
            ...themeConfig.copyright,
          }
        : false,
    ],

    /** Markdown 增强插件 */
    ["md-enhance", themeConfig.markdown || false],

    /** Chunk命名 */
    [
      "named-chunks",
      {
        pageChunkName: (page: Page): string => {
          const title = (page.title || "").replace(/[.&*?#\\/:"<>| ]/gu, "");
          return title
            ? `page-${title}-${page.key.slice(1)}`
            : `page-${page.key.slice(1)}`;
        },
        layoutChunkName: (layout: ResolvedComponent): string =>
          `layout-${layout.componentName}`,
      },
    ],

    /** 复制按钮插件 */
    [
      "one-click-copy",
      {
        copySelector: [
          'div[class*="language-"] pre',
          'div[class*="aside-code"] aside',
        ],
        copyMessage: "Copy successfully",
        duration: 500,
      },
    ],

    /** Photo-swipe 插件 */
    ["photo-swipe", themeConfig.photoSwipe],

    /** 平滑滚动 */
    ["smooth-scroll", themeConfig.smoothScroll],

    /** typescript 支持 */
    ["typescript", { tsLoaderOptions: themeConfig.tsLoader || {} }],
  ];
};

export default pluginConfig;
