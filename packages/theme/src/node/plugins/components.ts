import type { Plugin } from "vuepress/core";
import type { ComponentPluginOptions } from "vuepress-plugin-components";
import { componentsPlugin } from "vuepress-plugin-components";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-components
 */
export const getComponentsPlugin = (
  {
    components = ["Badge"],
    componentOptions = {},
    rootComponents = {},
  }: ComponentPluginOptions = {},
  legacy = false,
): Plugin =>
  componentsPlugin(
    {
      components,
      componentOptions,
      rootComponents,
    },
    legacy,
  );
