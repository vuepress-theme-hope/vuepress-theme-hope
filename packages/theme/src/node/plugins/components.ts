import { isString } from "@vuepress/shared";
import { componentsPlugin } from "vuepress-plugin-components";

import type { ComponentOptions } from "vuepress-plugin-components";
import type { Plugin } from "@vuepress/core";
import type { ThemeOptions } from "../../shared/index.js";

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
  legacy = false
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
        },
        ...(isString(options.iconPrefix) ? { prefix: options.iconPrefix } : {}),
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
