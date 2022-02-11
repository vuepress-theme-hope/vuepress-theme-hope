import type { BaseCommentOptions } from "./base";

export interface DisableCommentOptions extends BaseCommentOptions {
  type?: "none";
  comment: never;
}
