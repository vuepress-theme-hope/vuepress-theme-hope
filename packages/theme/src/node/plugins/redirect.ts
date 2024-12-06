import { isPlainObject, keys } from "@vuepress/helper";
import type { RedirectPluginOptions } from "@vuepress/plugin-redirect";
import { redirectPlugin } from "@vuepress/plugin-redirect";
import type { Plugin } from "vuepress/core";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-redirect
 */
export const getRedirectPlugin = (
  options?: RedirectPluginOptions | boolean,
): Plugin | null => {
  // Disable redirect if no options for redirect plugin
  if (options === false || (isPlainObject(options) && !keys(options).length))
    return null;

  return redirectPlugin(
    isPlainObject(options) ? options : { switchLocale: "modal" },
  );
};
