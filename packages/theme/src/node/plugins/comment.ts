import type { CommentPluginOptions } from "@vuepress/plugin-comment";
import { commentPlugin } from "@vuepress/plugin-comment";
import type { PluginObject } from "vuepress/core";

import { VERSION } from "../utils.js";

/**
 * @private
 *
 * Resolve options for @vuepress/plugin-comment
 */
export const getCommentPlugin = (
  options?: Partial<CommentPluginOptions> | false,
): PluginObject | null => {
  if (options === false || !options?.provider) return null;

  return commentPlugin(<CommentPluginOptions>{
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
  });
};
