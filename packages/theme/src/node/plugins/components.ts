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
        ...(typeof options.iconPrefix === "string"
          ? { prefix: options.iconPrefix }
          : {}),
      },
      rootComponents: {
        ...rootComponents,
        backToTop:
          typeof options.backToTop === "number"
            ? options.backToTop
            : options.backToTop !== false,
      },
    },
    legacy
  );
