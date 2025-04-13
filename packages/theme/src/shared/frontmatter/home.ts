import type { ThemeBasePageFrontmatter } from "./base.js";

export interface ThemeHomePageFrontmatter extends ThemeBasePageFrontmatter {
  home: true;

  /**
   * Hero text, if not set, will use the title of the current locale
   *
   * Hero 文本，如果没有设置，则使用当前语言环境的标题
   *
   * @default siteLocale.title
   */
  heroText?: string;

  /**
   * Hero tagline, if not set, will use the description of the current locale
   *
   * Hero 标语，如果没有设置，则使用当前语言环境的描述
   *
   * @default siteLocale.description
   */
  tagline?: string;

  /**
   * Hero image alt, if not set, will use the hero text
   *
   * Hero 图片替代文字，如果没有设置，则使用 Hero 文本
   *
   * @default heroText
   */
  heroAlt?: string;

  /**
   * Hero image
   *
   * Hero 图片
   */
  heroImage?: string;

  /**
   * Hero image used in dark mode
   *
   * 深色模式下使用的 Hero 图片
   */
  heroImageDark?: string;

  /**
   * Hero image CSS style
   */
  heroImageStyle?: Record<string, string> | string;

  /**
   * Whether to use full screen for hero
   *
   * 是否使用全屏 Hero
   *
   * @default false
   */
  heroFullScreen?: boolean;

  /**
   * Hero style
   *
   * Hero 样式
   */
  heroStyle?: string;

  /**
   * Hero background image
   *
   * Hero 背景图片
   */
  bgImage?: string | false;

  /**
   * Hero background image used in dark mode
   *
   * 深色模式下使用的 Hero 背景图片
   */
  bgImageDark?: string | false;

  /**
   * Hero background image CSS style
   *
   * Hero 背景图片 CSS 样式
   */
  bgImageStyle?: Record<string, string> | string;
}
