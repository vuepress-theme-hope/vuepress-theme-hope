import {
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  getBundlerName,
  tagHint,
} from "vuepress-shared/node";

import type { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack";

/**
 * Add tags as customElement
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param customElements tags recognized as custom element
 */
export const checkTag = (config: unknown, app: App): void => {
  const bundlerName = getBundlerName(app);

  // for vite
  if (bundlerName === "vite") {
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
  else if (bundlerName === "webpack") {
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

export const extendsBundlerOptions = (config: unknown, app: App): void => {
  addViteOptimizeDepsInclude({ app, config }, "@vueuse/core");
  addViteOptimizeDepsExclude({ app, config }, "@theme-hope");

  checkTag(config, app);
};
