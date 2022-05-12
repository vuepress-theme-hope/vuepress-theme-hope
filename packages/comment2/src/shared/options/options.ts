import type { DisableCommentOptions } from "./disable";
import type { GiscusOptions } from "./giscus";
import type { TwikooOptions } from "./twikoo";
import type { WalineOptions } from "./waline";

/**
 * 评论选项
 *
 * Comment options
 */
export type CommentOptions =
  | GiscusOptions
  | TwikooOptions
  | WalineOptions
  | DisableCommentOptions;
