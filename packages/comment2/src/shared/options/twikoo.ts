import type { BaseCommentOptions } from "./base";

export interface TwikooInitOptions {
  /**
   * Environment ID for tencloud or Link for Vercel
   *
   * 腾讯云环境链接或 Vercel Link
   */
  envId: string;

  /**
   * Tencloud region
   *
   * 腾讯云区域
   *
   * @default 'ap-shanghai'
   */
  region?: string;
}

export interface TwikooOptions extends BaseCommentOptions, TwikooInitOptions {
  provider: "Twikoo";
}
