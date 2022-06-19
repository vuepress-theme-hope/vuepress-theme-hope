import type { BaseCommentOptions } from "./base";

export interface DisableCommentOptions extends BaseCommentOptions {
  provider?: "None";
  comment?: never;
}
