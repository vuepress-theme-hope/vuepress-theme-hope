import type { BaseCommentOptions } from "./base.js";

export interface DisableCommentOptions extends BaseCommentOptions {
  provider?: "None";
  comment?: never;
}
