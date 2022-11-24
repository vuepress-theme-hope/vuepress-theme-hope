import { defineUserConfig } from "@vuepress/cli";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { getDirname, path } from "@vuepress/utils";
import {
  addViteOptimizeDepsInclude,
  mergeViteConfig,
} from "vuepress-shared/node";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { UserConfig } from "@vuepress/cli";

const __dirname = getDirname(import.meta.url);

const BASE = <"/" | `/${string}/`>process.env["BASE"] || "/";

export const config = (
  {
    base = "",
    indexName,
  }: {
    base?: string;
    indexName: string | false;
  },
  { alias = {}, plugins = [], ...config }: UserConfig
): UserConfig =>
  defineUserConfig({
    base: base ? `${BASE}${base}/` : BASE,

    dest: "./dist",

    markdown: {
      code: {
        lineNumbers: 10,
      },
    },

    plugins: [
      ...(indexName
        ? [
            docsearchPlugin({
              appId: "VXIEHELDL1",
              apiKey: "595796f71b6ba14326719682c3738c0c",
              indexName,
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

      ...plugins,
    ],

    alias: {
      "@theme-hope/components/HomeHero.js": path.resolve(
        __dirname,
        "./components/HopeHero.js"
      ),
      ...alias,
    },

    extendsBundlerOptions: (config: unknown, app): void => {
      const { bundler } = app.options;

      // const cache = new Map<string, boolean>();
      // const isStaticallyImportedByEntry = (
      //   id: string,
      //   getModuleInfo: GetModuleInfo,
      //   importStack: string[] = []
      // ): boolean => {
      //   if (cache.has(id)) {
      //     return !!cache.get(id);
      //   }
      //   if (importStack.includes(id)) {
      //     // circular deps!
      //     cache.set(id, false);

      //     return false;
      //   }
      //   const mod = getModuleInfo(id);

      //   if (!mod) {
      //     cache.set(id, false);

      //     return false;
      //   }
      //   if (mod.isEntry) {
      //     cache.set(id, true);

      //     return true;
      //   }
      //   const someImporterIs = mod.importers.some((item) =>
      //     isStaticallyImportedByEntry(
      //       item,
      //       getModuleInfo,
      //       importStack.concat(id)
      //     )
      //   );

      //   cache.set(id, someImporterIs);

      //   return someImporterIs;
      // };

      addViteOptimizeDepsInclude({ app, config }, [
        "three",
        "three/examples/jsm/controls/OrbitControls",
        "three/examples/jsm/loaders/STLLoader",
      ]);

      if (bundler.name.endsWith("vite")) {
        const bundlerConfig = <ViteBundlerOptions>config;

        // const dataFolder = app.dir.temp("internal");
        // const clientConfigFile = app.dir.temp("internal/clientConfigs.js");

        bundlerConfig.viteOptions = mergeViteConfig(
          bundlerConfig.viteOptions || {},
          {
            build: {
              rollupOptions: {
                output: {
                  manualChunks(id: string) {
                    // move known framework code into a stable chunk so that
                    // custom theme changes do not invalidate hash for all pages
                    if (
                      id.includes("plugin-vue:export-helper") ||
                      /node_modules\/@vuepress\/shared\//.test(id) ||
                      /node_modules\/vue(-router)?\//.test(id)
                    ) {
                      return "framework";
                    }

                    // split vuepress temp files to a chunk
                    // if (id.includes(dataFolder) && id !== clientConfigFile) {
                    //   return "data";
                    // }

                    // check if a module is statically imported by at least one entry.
                    // if (
                    //   id.includes("node_modules/") &&
                    //   !/\.css($|\\?)/.test(id) &&
                    //   isStaticallyImportedByEntry(id, ctx.getModuleInfo)
                    // ) {
                    //   return "vendor";
                    // }

                    return undefined;
                  },
                },
              },
            },
          }
        );
      }
    },

    shouldPrefetch: false,

    ...config,
  });
