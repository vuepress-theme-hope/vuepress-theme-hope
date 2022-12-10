import { colors } from "@vuepress/utils";
import { getBundlerName } from "./getBundler.js";
import { HTML_TAGS, SVG_TAGS } from "../utils/index.js";

import type { App } from "@vuepress/core";
import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack";

export const tagHint = (tag: string, isDebug = false): void => {
  if (
    isDebug &&
    !HTML_TAGS.includes(tag) &&
    !SVG_TAGS.includes(tag) &&
    tag === tag.toLowerCase() &&
    !tag.includes("-")
  ) {
    console.warn(
      colors.yellow("warning: "),
      `${tag} is used and it’s not a standard tag or standard custom element name`
    );
  }
};

export interface CustomElementCommonOptions {
  app: App;
  config: unknown;
}

/**
 * Add tags as customElement
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param customElements tags recognized as custom element
 */
export const addCustomElement = (
  { app, config }: CustomElementCommonOptions,
  customElement: string[] | string | RegExp
): void => {
  const customElements =
    typeof customElement === "string" ? [customElement] : customElement;
  const bundlerName = getBundlerName(app);

  // for vite
  if (bundlerName === "vite") {
    const viteBundlerConfig = <ViteBundlerOptions>config;

    if (!viteBundlerConfig.vuePluginOptions)
      viteBundlerConfig.vuePluginOptions = {};

    if (!viteBundlerConfig.vuePluginOptions.template)
      viteBundlerConfig.vuePluginOptions.template = {};

    if (!viteBundlerConfig.vuePluginOptions.template.compilerOptions)
      viteBundlerConfig.vuePluginOptions.template.compilerOptions = {};

    const {
      isCustomElement = (tag: string): void => tagHint(tag, app.env.isDebug),
    } = viteBundlerConfig.vuePluginOptions.template.compilerOptions;

    viteBundlerConfig.vuePluginOptions.template.compilerOptions.isCustomElement =
      (tag: string): boolean | void => {
        if (
          customElements instanceof RegExp
            ? customElements.test(tag)
            : customElements.includes(tag)
        )
          return true;

        return isCustomElement(tag);
      };
  }

  // for webpack
  else if (bundlerName === "webpack") {
    const webpackBundlerConfig = <WebpackBundlerOptions>config;

    if (!webpackBundlerConfig.vue) webpackBundlerConfig.vue = {};
    if (!webpackBundlerConfig.vue.compilerOptions)
      webpackBundlerConfig.vue.compilerOptions = {};

    const {
      isCustomElement = (tag: string): void => tagHint(tag, app.env.isDebug),
    } = webpackBundlerConfig.vue.compilerOptions;

    webpackBundlerConfig.vue.compilerOptions.isCustomElement = (
      tag: string
    ): boolean | void => {
      if (
        customElements instanceof RegExp
          ? customElements.test(tag)
          : customElements.includes(tag)
      )
        return true;

      return isCustomElement(tag);
    };
  }
};
