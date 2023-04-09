import { type ViteBundlerOptions } from "@vuepress/bundler-vite";
import { type WebpackBundlerOptions } from "@vuepress/bundler-webpack";
import { type App } from "@vuepress/core";
import { colors } from "@vuepress/utils";

import { getBundlerName } from "./getBundler.js";
import { isString } from "../../shared/index.js";
import { HTML_TAGS, SVG_TAGS } from "../utils/index.js";

export const tagHint = (tag: string, isDebug = false): void => {
  if (
    isDebug &&
    !HTML_TAGS.includes(tag) &&
    !SVG_TAGS.includes(tag) &&
    tag === tag.toLowerCase() &&
    !tag.includes("-")
  )
    console.warn(
      colors.yellow("warning: "),
      `${tag} is used and it’s not a standard tag or standard custom element name`
    );
};

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
  customElement: string[] | string | RegExp
): void => {
  const customElements = isString(customElement)
    ? [customElement]
    : customElement;
  const bundlerName = getBundlerName(app);

  // for vite
  if (bundlerName === "vite") {
    const viteBundlerConfig = <ViteBundlerOptions>bundlerOptions;

    const {
      isCustomElement = (tag: string): void => tagHint(tag, app.env.isDebug),
    } = (((viteBundlerConfig.vuePluginOptions ??= {}).template ??=
      {}).compilerOptions ??= {});

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
    const webpackBundlerConfig = <WebpackBundlerOptions>bundlerOptions;

    const {
      isCustomElement = (tag: string): void => tagHint(tag, app.env.isDebug),
    } = ((webpackBundlerConfig.vue ??= {}).compilerOptions ??= {});

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
