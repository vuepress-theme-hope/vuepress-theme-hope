import type { CommentPluginOptions } from "@vuepress/plugin-comment";
import type { Plugin, PluginObject } from "vuepress/core";
import { colors } from "vuepress/utils";

import { VERSION, logger } from "../utils.js";

let commentPlugin:
  | ((options: CommentPluginOptions, legacy?: boolean) => Plugin)
  | null = null;

try {
  ({ commentPlugin } = await import("@vuepress/plugin-comment"));
} catch {
  // Do nothing
}
/**
 * @private
 *
 * Resolve options for @vuepress/plugin-comment
 */
export const getCommentPlugin = (
  options?: Partial<CommentPluginOptions> | false,
): PluginObject | null => {
  if (options === false || !options?.provider || options.provider === "None")
    return null;

  if (!commentPlugin) {
    logger.error(
      `${colors.cyan("@vuepress/plugin-comment")} is not installed!`,
    );

    return null;
  }

  return commentPlugin({
    provider: "None",
    ...(options.provider === "Giscus"
      ? {
          lightTheme: `https://unpkg.com/vuepress-theme-hope@${VERSION}/templates/giscus/light.css`,
          darkTheme: `https://unpkg.com/vuepress-theme-hope@${VERSION}/templates/giscus/dark.css`,
        }
      : {}),
    ...(options.provider === "Waline" ? { dark: '[data-theme="dark"]' } : {}),
    ...options,
  } as CommentPluginOptions);
};
