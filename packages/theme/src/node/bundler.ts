import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack";
import type { App } from "@vuepress/core";
import {
  addViteConfig,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  getBundlerName,
  tagHint,
} from "vuepress-shared/node";

/**
 * Add tags as customElement
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 * @param customElements tags recognized as custom element
 */
export const checkTag = (bundlerOptions: unknown, app: App): void => {
  const bundlerName = getBundlerName(app);

  // for vite
  if (bundlerName === "vite") {
    const viteBundlerConfig = <ViteBundlerOptions>bundlerOptions;

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
    const webpackBundlerConfig = bundlerOptions as WebpackBundlerOptions;

    if (!webpackBundlerConfig.vue) webpackBundlerConfig.vue = {};
    if (!webpackBundlerConfig.vue.compilerOptions)
      webpackBundlerConfig.vue.compilerOptions = {};

    const { isCustomElement } = webpackBundlerConfig.vue.compilerOptions;

    webpackBundlerConfig.vue.compilerOptions.isCustomElement = (
      tag: string,
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

/**
 * @private
 */
export const extendsBundlerOptions = (
  bundlerOptions: unknown,
  app: App,
): void => {
  addViteConfig(bundlerOptions, app, {
    build: {
      chunkSizeWarningLimit: 1024,
    },
  });
  addViteOptimizeDepsInclude(bundlerOptions, app, "@vueuse/core");
  addViteOptimizeDepsExclude(bundlerOptions, app, "@theme-hope");

  checkTag(bundlerOptions, app);
};
