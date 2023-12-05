import type { UserConfig } from "@vuepress/cli";
import { defineUserConfig } from "@vuepress/cli";
import type { HeadConfig } from "@vuepress/core";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { getDirname, path } from "@vuepress/utils";
import { redirectPlugin } from "vuepress-plugin-redirect";
import { addViteOptimizeDepsInclude } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

const IS_GITEE = "GITEE" in process.env;
const IS_NETLIFY = "NETLIFY" in process.env;
const IS_GITHUB = !IS_GITEE && !IS_NETLIFY;

export interface ConfigOptions {
  name: string;
  base?: string;
  indexName?: string | false;
  pwa?: boolean;
}

const assetsBase = "https://theme-hope-assets.vuejs.press/";

export const config = (
  {
    name,
    base = name.replace(/\d+$/, ""),
    indexName,
    pwa = false,
  }: ConfigOptions,
  { alias = {}, head = [], plugins = [], ...config }: UserConfig,
): UserConfig => {
  const docsBase = IS_NETLIFY
    ? "/"
    : base
      ? <`/${string}/`>`/v2/${base}/`
      : "/v2/";
  const docsearchIndexName =
    indexName === false ? false : `vuepress-theme-hope-${indexName || name}`;

  return defineUserConfig({
    base: docsBase,

    dest: "./dist",

    head: [
      ...(pwa
        ? []
        : <HeadConfig[]>[
            [
              "link",
              {
                rel: "icon",
                href: `${assetsBase}icon/chrome-mask-512.png`,
                type: "image/png",
                sizes: "512x512",
              },
            ],
            [
              "link",
              {
                rel: "icon",
                href: `${assetsBase}icon/chrome-mask-192.png`,
                type: "image/png",
                sizes: "512x512",
              },
            ],
            [
              "link",
              {
                rel: "icon",
                href: `${assetsBase}icon/chrome-512.png`,
                type: "image/png",
                sizes: "192x192",
              },
            ],
            [
              "link",
              {
                rel: "icon",
                href: `${assetsBase}icon/chrome-192.png`,
                type: "image/png",
                sizes: "192x192",
              },
            ],
            ["meta", { name: "theme-color", content: "#46bd87" }],
            [
              "link",
              {
                rel: "apple-touch-icon",
                href: `${assetsBase}icon/apple-icon-152.png`,
              },
            ],
            [
              "meta",
              {
                name: "apple-mobile-web-app-status-bar-style",
                content: "black",
              },
            ],
          ]),
      ...head,
    ],
    markdown: {
      code: {
        lineNumbers: 10,
      },
    },

    plugins: [
      ...(docsearchIndexName
        ? [
            docsearchPlugin({
              appId: "VXIEHELDL1",
              apiKey: "595796f71b6ba14326719682c3738c0c",
              indexName: docsearchIndexName,
              indexBase: base ? <`/${string}/`>`/v2/${base}/` : "/v2/",
              locales: {
                "/zh/": {
                  placeholder: "搜索文档",
                  translations: {
                    button: {
                      buttonText: "搜索文档",
                      buttonAriaLabel: "搜索文档",
                    },
                    modal: {
                      searchBox: {
                        resetButtonTitle: "清除查询条件",
                        resetButtonAriaLabel: "清除查询条件",
                        cancelButtonText: "取消",
                        cancelButtonAriaLabel: "取消",
                      },
                      startScreen: {
                        recentSearchesTitle: "搜索历史",
                        noRecentSearchesText: "没有搜索历史",
                        saveRecentSearchButtonTitle: "保存至搜索历史",
                        removeRecentSearchButtonTitle: "从搜索历史中移除",
                        favoriteSearchesTitle: "收藏",
                        removeFavoriteSearchButtonTitle: "从收藏中移除",
                      },
                      errorScreen: {
                        titleText: "无法获取结果",
                        helpText: "你可能需要检查你的网络连接",
                      },
                      footer: {
                        selectText: "选择",
                        navigateText: "切换",
                        closeText: "关闭",
                        searchByText: "搜索提供者",
                      },
                      noResultsScreen: {
                        noResultsText: "无法找到相关结果",
                        suggestedQueryText: "你可以尝试查询",
                        reportMissingResultsText: "你认为该查询应该有结果？",
                        reportMissingResultsLinkText: "点击反馈",
                      },
                    },
                  },
                },
              },
            }),
          ]
        : []),
      redirectPlugin({ switchLocale: "modal" }),
      ...plugins,
    ],

    alias: {
      "@theme-hope/components/HeroInfo": path.resolve(
        __dirname,
        "./components/HopeHero.js",
      ),
      "@theme-hope/components/NotFoundHint": path.resolve(
        __dirname,
        "./components/HopeNotFoundHint.js",
      ),
      ...alias,
    },

    define: () => ({ IS_GITEE, IS_GITHUB, IS_NETLIFY }),

    extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
      addViteOptimizeDepsInclude(bundlerOptions, app, [
        "three",
        "three/examples/jsm/controls/OrbitControls",
        "three/examples/jsm/loaders/STLLoader",
      ]);
    },

    onInitialized: (app) => {
      if (IS_NETLIFY) {
        app.pages.find((page) => page.path === "/")!.frontmatter["footer"] = `\
<a href="https://www.netlify.com" target="_blank">
  <img src="https://www.netlify.com/img/global/badges/netlify-light.svg" alt="Deploys by Netlify" data-mode="lightmode-only">
  <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" alt="Deploys by Netlify" data-mode="darkmode-only">
</a>
<br/>
Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope
`;
        app.pages.find((page) => page.path === "/zh/")!.frontmatter["footer"] =
          `\
<a href="https://www.netlify.com" target="_blank">
  <img src="https://www.netlify.com/img/global/badges/netlify-light.svg" alt="由 Netlify 部署" data-mode="lightmode-only">
  <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" alt="由 Netlify 部署" data-mode="darkmode-only">
</a>
<br/>
使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope
`;
      }
    },

    shouldPreload: false,
    ...(pwa ? { shouldPrefetch: false } : {}),

    clientConfigFile: path.resolve(__dirname, "./client.js"),

    ...config,
  });
};
