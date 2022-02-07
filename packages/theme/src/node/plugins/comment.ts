import type { CommentOptions } from "vuepress-plugin-comment2";

export const resolveCommentOptions = (
  options?: Partial<CommentOptions> | false
): CommentOptions | false =>
  options === false
    ? false
    : ({
        type: "disable",
        ...(options?.type === "waline"
          ? { dark: 'html[data-theme="dark"]' }
          : {}),
        ...(options || {}),
      } as CommentOptions);
