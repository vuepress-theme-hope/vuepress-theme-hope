import { isPlainObject } from "@vuepress/helper";
import type { RevealJsPluginOptions } from "@vuepress/plugin-revealjs";
import type { Plugin } from "vuepress/core";

import { logMissingPkg } from "./utils.js";

let revealJsPlugin: ((options: RevealJsPluginOptions) => Plugin) | null = null;

try {
  ({ revealJsPlugin } = await import("@vuepress/plugin-revealjs"));
} catch {
  // Do nothing
}

/**
 * Resolve options for `@vuepress/plugin-revealjs`
 *
 * @param options Reveal.js plugin options or a boolean to enable it with default options
 * @returns Reveal.js plugin instance or null
 */
export const getRevealJsPlugin = (
  options?: Omit<RevealJsPluginOptions, "layout"> | boolean,
): Plugin | null => {
  if (!options) return null;

  if (!revealJsPlugin) {
    logMissingPkg("@vuepress/plugin-revealjs");

    return null;
  }

  return revealJsPlugin({
    ...(isPlainObject(options) ? options : {}),
    layout: "Slides",
  });
};
