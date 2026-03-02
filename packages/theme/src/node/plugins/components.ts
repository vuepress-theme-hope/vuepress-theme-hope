import { isPlainObject } from "@vuepress/helper";
import type { Plugin } from "vuepress/core";
import type { ComponentPluginOptions } from "vuepress-plugin-components";
import { componentsPlugin } from "vuepress-plugin-components";

/**
 * Resolve options for `vuepress-plugin-components`
 *
 * @param options - theme component plugin options
 * @param compact - whether to use compact mode
 *
 * @returns component plugin instance or null
 */
export const getComponentsPlugin = (
  options?: ComponentPluginOptions | false,
  compact = false,
): Plugin | null =>
  options === false
    ? null
    : componentsPlugin(
        {
          components: ["Badge"],
          ...(isPlainObject(options) ? options : {}),
        },
        compact,
      );
