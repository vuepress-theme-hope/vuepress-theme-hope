import {
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  mergeViteConfig,
  tagHint,
} from "vuepress-shared/node";

import type { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack";
import type { ViteCommonOptions } from "vuepress-shared/node";

/**
 * Add tags as customElement
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param customElements tags recognized as custom element
 */
export const checkTag = (config: unknown, app: App): void => {
  const { bundler } = app.options;

  // for vite
  if (bundler.name.endsWith("vite")) {
    const viteBundlerConfig = config as ViteBundlerOptions;

    if (!viteBundlerConfig.vuePluginOptions)
      viteBundlerConfig.vuePluginOptions = {};

    if (!viteBundlerConfig.vuePluginOptions.template)
      viteBundlerConfig.vuePluginOptions.template = {};

    if (!viteBundlerConfig.vuePluginOptions.template.compilerOptions)
      viteBundlerConfig.vuePluginOptions.template.compilerOptions = {};

    const { isCustomElement } =
      viteBundlerConfig.vuePluginOptions.template.compilerOptions;

    viteBundlerConfig.vuePluginOptions.template.compilerOptions.isCustomElement =
      (tag: string): boolean | void => {
        if (isCustomElement) {
          const result = isCustomElement(tag);

          if (!result) tagHint(tag, app.env.isDebug);

          return result;
        }

        tagHint(tag, app.env.isDebug);
      };
  }

  // for webpack
  if (bundler.name.endsWith("webpack")) {
    const webpackBundlerConfig = config as WebpackBundlerOptions;

    if (!webpackBundlerConfig.vue) webpackBundlerConfig.vue = {};
    if (!webpackBundlerConfig.vue.compilerOptions)
      webpackBundlerConfig.vue.compilerOptions = {};

    const { isCustomElement } = webpackBundlerConfig.vue.compilerOptions;

    webpackBundlerConfig.vue.compilerOptions.isCustomElement = (
      tag: string
    ): boolean | void => {
      if (isCustomElement) {
        const result = isCustomElement(tag);

        if (!result) tagHint(tag, app.env.isDebug);

        return result;
      }

      tagHint(tag, app.env.isDebug);
    };
  }
};

// this optimize shall be at @vuepress/bundler-vite
// TODO: Remove this
const optimizeChunkSplit = ({ app, config }: ViteCommonOptions): void => {
  const { bundler } = app.options;

  if (bundler.name.endsWith("vite")) {
    const bundlerConfig = <ViteBundlerOptions>config;

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

                return undefined;
              },
            },
          },
        },
      }
    );
  }
};

export const extendsBundlerOptions = (config: unknown, app: App): void => {
  addViteOptimizeDepsInclude({ app, config }, "@vueuse/core");
  addViteOptimizeDepsExclude({ app, config }, "@theme-hope");
  optimizeChunkSplit({ app, config });

  checkTag(config, app);
};
