import { type PluginObject } from "@vuepress/core";
import { type CommentOptions, commentPlugin } from "vuepress-plugin-comment2";

import { VERSION } from "../utils.js";

/**
 * @private
 *
 * Resolve options for vuepress-plugin-comment2
 */
export const getCommentPlugin = (
  options?: Partial<CommentOptions> | false,
  legacy = true
): PluginObject | null => {
  if (options === false || !options?.provider) return null;

  return commentPlugin(
    <CommentOptions>{
      provider: "None",
      ...(options?.provider === "Giscus"
        ? {
            lightTheme: `https://unpkg.com/vuepress-theme-hope@${VERSION}/templates/giscus/light.css`,
            darkTheme: `https://unpkg.com/vuepress-theme-hope@${VERSION}/templates/giscus/dark.css`,
          }
        : {}),
      ...(options?.provider === "Waline"
        ? { dark: 'html[data-theme="dark"]' }
        : {}),
      ...(options || {}),
    },
    legacy
  );
};
