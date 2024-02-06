import type { ExactLocaleConfig } from "@vuepress/helper";
import type { WalineInitOptions, WalineLocale } from "@waline/client";

import type { BaseCommentOptions } from "./base.js";

export type WalineLocaleData = Partial<WalineLocale>;

export type WalineLocaleConfig = ExactLocaleConfig<WalineLocaleData>;

export interface WalineOptions
  extends BaseCommentOptions,
    Omit<WalineInitOptions, "el" | "comment" | "locale"> {
  /**
   * Whether enable page views count by default
   *
   * 是否启用访问量
   *
   * @default true
   */
  pageview?: boolean;
}
