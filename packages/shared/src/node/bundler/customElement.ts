import type { ViteBundlerOptions } from "@vuepress/bundler-vite";
import type { WebpackBundlerOptions } from "@vuepress/bundler-webpack";
import type { App } from "@vuepress/core";

import { getBundlerName } from "./getBundler.js";
import { isString } from "../../shared/index.js";

/**
 * Add tags as customElement
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 * @param customElements tags recognized as custom element
 */
export const addCustomElement = (
  bundlerOptions: unknown,
  app: App,
  customElement: string[] | string | RegExp,
): void => {
  const customElements = isString(customElement)
    ? [customElement]
    : customElement;
  const bundlerName = getBundlerName(app);

  // for vite
  if (bundlerName === "vite") {
    const viteBundlerConfig = <ViteBundlerOptions>bundlerOptions;

    const { isCustomElement } = (((viteBundlerConfig.vuePluginOptions ??=
      {}).template ??= {}).compilerOptions ??= {});

    viteBundlerConfig.vuePluginOptions.template.compilerOptions.isCustomElement =
      (tag: string): boolean | void => {
        if (
          customElements instanceof RegExp
            ? customElements.test(tag)
            : customElements.includes(tag)
        )
          return true;

        return isCustomElement?.(tag);
      };
  }

  // for webpack
  else if (bundlerName === "webpack") {
    const webpackBundlerConfig = <WebpackBundlerOptions>bundlerOptions;

    const { isCustomElement } = ((webpackBundlerConfig.vue ??=
      {}).compilerOptions ??= {});

    webpackBundlerConfig.vue.compilerOptions.isCustomElement = (
      tag: string,
    ): boolean | void => {
      if (
        customElements instanceof RegExp
          ? customElements.test(tag)
          : customElements.includes(tag)
      )
        return true;

      return isCustomElement?.(tag);
    };
  }
};
