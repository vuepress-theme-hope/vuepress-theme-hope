import { comment } from "vuepress-plugin-comment2";

import type { PluginConfig } from "@vuepress/core";
import type { CommentOptions } from "vuepress-plugin-comment2";

export const resolveCommentPlugin = (
  options?: Partial<CommentOptions> | false
): PluginConfig => {
  if (options === false) return ["", false];

  return comment({
    type: "disable",
    ...(options?.type === "waline" ? { dark: 'html[data-theme="dark"]' } : {}),
    ...(options || {}),
  } as CommentOptions);
};
