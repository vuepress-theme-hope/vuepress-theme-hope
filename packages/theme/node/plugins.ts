import { resolve } from "path";

import type {
  Page,
  PluginConfig,
  ResolvedComponent,
} from "@mr-hope/vuepress-types";
import type { ResolvedHopeThemeConfig } from "../types";

export const getPluginConfig = (
  themeConfig: ResolvedHopeThemeConfig
): PluginConfig[] => {
  // set author for comment plugin
  if (themeConfig.comment && themeConfig.author)
    themeConfig.comment.author = themeConfig.author;

  return [
    ["@mr-hope/comment", themeConfig.comment],

    ["@mr-hope/components"],

    ["@mr-hope/feed", themeConfig.feed],

    ["@mr-hope/last-update", themeConfig.lastUpdate],

    ["@mr-hope/pwa", themeConfig.pwa],

    ["@mr-hope/seo", themeConfig.seo],

    ["@mr-hope/sitemap", themeConfig.sitemap],

    ["@vuepress/active-header-links", themeConfig.activeHeaderLinks],

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

    "@vuepress/nprogress",

    [
      "@vuepress/search",
      {
        searchMaxSuggestions: themeConfig.searchMaxSuggestions || 10,
      },
    ],

    ["add-this", typeof themeConfig.addThis === "string"],

    ["clean-urls", { normalSuffix: "/" }],

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

    ["md-enhance", themeConfig.mdEnhance || {}],

    [
      "named-chunks",
      themeConfig.namedChunks === false
        ? false
        : themeConfig.namedChunks || {
            pageChunkName: (page: Page): string => {
              const title = (page.title || "").replace(
                /[.&*?#\\/:"<>| ]/gu,
                ""
              );
              return title ? `page-${title}` : `page-${page.key.slice(1)}`;
            },
            layoutChunkName: (layout: ResolvedComponent): string =>
              `layout-${layout.componentName}`,
          },
    ],

    ["@mr-hope/copy-code", themeConfig.copyCode],

    ["photo-swipe", themeConfig.photoSwipe],

    ["smooth-scroll", themeConfig.smoothScroll],

    [
      "typescript",
      themeConfig.typescript
        ? {
            tsLoaderOptions:
              typeof themeConfig.typescript === "object"
                ? themeConfig.typescript
                : {},
          }
        : false,
    ],
  ];
};
