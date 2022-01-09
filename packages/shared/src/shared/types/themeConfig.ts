import type { ThemeConfig } from "@vuepress/core";
import type { Author } from "./utils";

export interface BaseThemeConfig extends ThemeConfig {
  /**
   * Theme locales config
   *
   * 主题多语言配置
   */
  locales?: Record<string, Record<string, unknown> & { lang?: string }>;
  /**
   * Whether enable pure mode
   *
   * 是否开启纯净模式
   *
   * @default false
   */
  pure?: boolean;
  /**
   * 作者
   */
  author?: Author;
  /**
   * Font class 图标前缀
   *
   * Font class Icon prefix
   *
   * @default 'icon-'
   */
  iconPrefix?: string;
  /**
   * Blog Config
   */
  blog: unknown | false;
}
