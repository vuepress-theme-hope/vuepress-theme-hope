import { isPlainObject, keys } from "@vuepress/helper";
import type { RedirectPluginOptions } from "@vuepress/plugin-redirect";
import type { Plugin } from "vuepress/core";
import { colors } from "vuepress/utils";

import { logger } from "../utils.js";

let redirectPlugin: (options: RedirectPluginOptions) => Plugin;

try {
  ({ redirectPlugin } = await import("@vuepress/plugin-redirect"));
} catch (e) {
  // Do nothing
}

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-redirect
 */
export const getRedirectPlugin = (
  options: RedirectPluginOptions | boolean = false,
): Plugin | null => {
  // Disable redirect if no options for redirect plugin
  if (options === false || (isPlainObject(options) && !keys(options).length))
    return null;

  if (!redirectPlugin) {
    logger.error(
      `${colors.cyan("@vuepress/plugin-redirect")} is not installed!`,
    );

    return null;
  }

  return redirectPlugin(
    isPlainObject(options) ? options : { switchLocale: "modal" },
  );
};
