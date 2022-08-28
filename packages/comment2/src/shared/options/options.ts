import type { DisableCommentOptions } from "./disable.js";
import type { GiscusOptions } from "./giscus.js";
import type { TwikooOptions } from "./twikoo.js";
import type { WalineOptions } from "./waline.js";

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
