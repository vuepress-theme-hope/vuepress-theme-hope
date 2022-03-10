import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  addViteOptimizeDepsExclude,
  tagHint,
} from "@mr-hope/vuepress-shared";
import { handleCrytoForWebpack } from "./encrypt";

import { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack";

/**
 * Add tags as customElement
 *
 * @param app VuePress Node App
 * @param customElements tags recognized as custom element
 */
export const checkTag = (app: App): void => {
  const { bundler, bundlerConfig } = app.options;

  // for vite
  if (bundler.endsWith("vite")) {
    const viteBundlerConfig: ViteBundlerOptions = bundlerConfig;

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
  if (bundler.endsWith("webpack")) {
    const webpackBundlerConfig: WebpackBundlerOptions = bundlerConfig;

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

export const updateBundlerOptions = (app: App): void => {
  addViteOptimizeDepsInclude(app, [
    "@vueuse/core",
    "bcryptjs",
    "lodash.throttle",
  ]);

  if (app.env.isDev)
    addViteOptimizeDepsInclude(app, [
      "@mr-hope/vuepress-shared/lib/client",
      "dayjs",
      "dayjs/plugin/localizedFormat",
      "dayjs/plugin/objectSupport",
      "dayjs/plugin/timezone",
      "dayjs/plugin/utc",
    ]);

  addViteSsrNoExternal(app, [
    "@mr-hope/vuepress-shared",
    "vuepress-theme-hope",
  ]);
  addViteOptimizeDepsExclude(app, "vuepress-theme-hope");

  checkTag(app);
  handleCrytoForWebpack(app);
};
