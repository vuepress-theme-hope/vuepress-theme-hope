import type { CommentOptions } from "vuepress-plugin-comment2";

export const resolveCommentOptions = (
  options?: Partial<CommentOptions>
): CommentOptions => {
  return {
    type: "disable",
    ...(options || null),
  } as CommentOptions;
};
