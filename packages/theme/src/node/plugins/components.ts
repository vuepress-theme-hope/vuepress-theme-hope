import { isPlainObject } from "@vuepress/helper";
import type { Plugin } from "vuepress/core";
import type { ComponentPluginOptions } from "vuepress-plugin-components";
import { componentsPlugin } from "vuepress-plugin-components";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-components
 */
export const getComponentsPlugin = (
  options?: ComponentPluginOptions | false,
  legacy = false,
): Plugin | null =>
  options === false
    ? null
    : componentsPlugin(
        {
          components: ["Badge"],
          ...(isPlainObject(options) ? options : {}),
        },
        legacy,
      );
