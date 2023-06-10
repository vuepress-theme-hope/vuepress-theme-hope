import type { WalineInitOptions, WalineLocale } from "@waline/client";
import type { RequiredLocaleConfig } from "vuepress-shared";

import type { BaseCommentOptions } from "./base.js";

export type WalineLocaleData = Partial<WalineLocale>;

export type WalineLocaleConfig = RequiredLocaleConfig<WalineLocaleData>;

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
