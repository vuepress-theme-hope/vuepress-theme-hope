import { isPlainObject, keys } from "@vuepress/helper";
import type { RedirectPluginOptions } from "@vuepress/plugin-redirect";
import { redirectPlugin } from "@vuepress/plugin-redirect";
import type { Plugin } from "vuepress/core";

/**
 * Resolve options for `@vuepress/plugin-redirect`
 *
 * @param options Redirect plugin options or a boolean to enable it with default options
 * @returns Redirect plugin instance or null
 */
export const getRedirectPlugin = (options?: RedirectPluginOptions | boolean): Plugin | null => {
  // Disable redirect if no options for redirect plugin
  if (options === false || (isPlainObject(options) && keys(options).length === 0)) return null;

  return redirectPlugin(isPlainObject(options) ? options : { switchLocale: "modal" });
};
