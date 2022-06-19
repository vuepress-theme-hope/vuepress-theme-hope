import { commentPlugin } from "vuepress-plugin-comment2";

import type { PluginObject } from "@vuepress/core";
import type { CommentOptions } from "vuepress-plugin-comment2";

export const getCommentPlugin = (
  options?: Partial<CommentOptions> | false,
  legacy = false
): PluginObject | null => {
  if (options === false || !options?.provider) return null;

  return commentPlugin(
    {
      provider: "None",
      ...(options?.provider === "Waline"
        ? { dark: 'html[data-theme="dark"]' }
        : {}),
      ...(options || {}),
    } as CommentOptions,
    legacy
  );
};
