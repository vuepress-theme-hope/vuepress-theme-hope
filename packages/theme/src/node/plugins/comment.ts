import { commentPlugin } from "vuepress-plugin-comment2";

import type { PluginObject } from "@vuepress/core";
import type { CommentOptions } from "vuepress-plugin-comment2";

export const getCommentPlugin = (
  options?: Partial<CommentOptions> | false
): PluginObject | null => {
  if (options === false || !options?.type) return null;

  return commentPlugin({
    type: "disable",
    ...(options?.type === "waline" ? { dark: 'html[data-theme="dark"]' } : {}),
    ...(options || {}),
  } as CommentOptions);
};
