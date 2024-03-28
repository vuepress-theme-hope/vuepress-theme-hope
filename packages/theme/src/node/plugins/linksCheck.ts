import { isPlainObject } from "@vuepress/helper";
import type { LinksCheckPluginOptions } from "@vuepress/plugin-links-check";
import { linksCheckPlugin } from "@vuepress/plugin-links-check";
import type { Plugin } from "vuepress/core";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-links-check
 */
export const getLinksCheckPlugin = (
  linksCheck?: LinksCheckPluginOptions | boolean,
): Plugin | null => {
  if (linksCheck === false) return null;

  return linksCheckPlugin(isPlainObject(linksCheck) ? linksCheck : {});
};
