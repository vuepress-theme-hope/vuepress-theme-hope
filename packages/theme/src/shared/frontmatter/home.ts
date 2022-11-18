import type { HopeThemePageFrontmatter } from "./base.js";

export interface HopeThemeHomeActionOptions {
  /**
   * Action name
   *
   * 操作名称
   */
  text: string;

  /**
   * Action link
   *
   * 操作链接
   */
  link: string;

  /**
   * Type of action
   *
   * 操作类型
   *
   * @default 'default'
   */
  type?: "primary" | "default";
}

export interface HopeThemeHomeFeatureOptions {
  /**
   * Feature name
   *
   * 功能名称
   */
  title: string;

  /**
   * Feature description
   *
   * 功能描述
   */
  details: string;

  /**
   * Feature icon
   *
   * @description image link or icon fontClass are supported
   *
   * 功能图标
   *
   * @description 支持图片链接或者图标字体类
   */
  icon?: string;

  /**
   * Feature link
   *
   * 功能链接
   */
  link?: string;
}

export interface HopeThemeProjectHomePageFrontmatter
  extends HopeThemePageFrontmatter {
  home: true;
  heroImage?: string;
  heroImageDark?: string;
  heroAlt?: string;
  heroText?: string | false;
  tagline?: string | false;

  actions?: HopeThemeHomeActionOptions[];
  features?: HopeThemeHomeFeatureOptions[];
}
