import type { BaseCommentOptions } from "./base";

export interface DisableCommentOptions extends BaseCommentOptions {
  type: "disable";
  comment: never;
}
