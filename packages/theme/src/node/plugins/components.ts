import { type Plugin } from "@vuepress/core";
import { isString } from "@vuepress/shared";
import {
  type ComponentOptions,
  componentsPlugin,
} from "vuepress-plugin-components";

import { type ThemeOptions } from "../../shared/index.js";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-components
 */
export const getComponentsPlugin = (
  options: Pick<
    ThemeOptions,
    "backToTop" | "hostname" | "hotReload" | "iconAssets" | "iconPrefix"
  >,
  {
    components = ["Badge", "FontIcon"],
    componentOptions = {},
    rootComponents = {},
  }: ComponentOptions = {},
  legacy = true
): Plugin =>
  componentsPlugin(
    {
      // FontIcon component is used by theme so we MUST enable it
      components: components.includes("FontIcon")
        ? components
        : ["FontIcon", ...components],
      componentOptions: {
        fontIcon: {
          ...(options.iconAssets ? { assets: options.iconAssets } : {}),
          ...(isString(options.iconPrefix)
            ? { prefix: options.iconPrefix }
            : {}),
        },
        ...componentOptions,
      },
      rootComponents: {
        backToTop:
          typeof options.backToTop === "number"
            ? options.backToTop
            : options.backToTop !== false,
        ...rootComponents,
      },
    },
    legacy
  );
