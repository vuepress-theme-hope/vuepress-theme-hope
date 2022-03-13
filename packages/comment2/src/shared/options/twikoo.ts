import type { BaseCommentOptions } from "./base";

export interface TwikooInitOptions {
  /**
   * Environment ID for tencloud
   *
   * Link for Vercel
   */
  envId: string;

  /**
   * Tencloud region
   *
   * @default 'ap-shanghai'
   */
  region?: string;
}

export interface TwikooOptions extends BaseCommentOptions, TwikooInitOptions {
  type: "twikoo";
}
