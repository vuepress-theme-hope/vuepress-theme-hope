import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  addViteOptimizeDepsExclude,
  tagHint,
} from "@mr-hope/vuepress-shared";
import { handleCrytoForWebpack } from "./encrypt";

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

export const updateBundlerConfig = (config: unknown, app: App): void => {
  addViteOptimizeDepsInclude(config, app, [
    "@vueuse/core",
    "bcryptjs",
    "lodash.throttle",
  ]);

  if (app.env.isDev)
    addViteOptimizeDepsInclude(config, app, [
      "@mr-hope/vuepress-shared/lib/client",
      "dayjs",
      "dayjs/plugin/localizedFormat",
      "dayjs/plugin/objectSupport",
      "dayjs/plugin/timezone",
      "dayjs/plugin/utc",
    ]);

  addViteSsrNoExternal(config, app, [
    "@mr-hope/vuepress-shared",
    "vuepress-theme-hope",
  ]);
  addViteOptimizeDepsExclude(config, app, "vuepress-theme-hope");

  checkTag(config, app);
  handleCrytoForWebpack(config, app);
};
