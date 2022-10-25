import { commentPlugin } from "vuepress-plugin-comment2";

import type { PluginObject } from "@vuepress/core";
import type { CommentOptions } from "vuepress-plugin-comment2";

export const getCommentPlugin = (
  options?: Partial<CommentOptions> | false,
  legacy = false
): PluginObject | null => {
  if (options === false || !options?.provider) return null;

  return commentPlugin(
    <CommentOptions>{
      provider: "None",
      ...(options?.provider === "Giscus"
        ? {
            lightTheme:
              "https://unpkg.com/vuepress-theme-hope@next/templates/giscus/light.css",
            darkTheme:
              "https://unpkg.com/vuepress-theme-hope@next/templates/giscus/dark.css",
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
