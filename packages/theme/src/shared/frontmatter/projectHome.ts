import type { ThemeHopePageFrontmatter } from "./home.js";

export interface ThemeProjectHomeActionOptions {
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
   * @default "default"
   */
  type?: "primary" | "default";

  /**
   * Action icon
   *
   * 操作图标
   */
  icon?: string;
}

export interface ThemeProjectHomeHighlightItem {
  /**
   * Item name, supports HTML string
   *
   * 项目名称，支持 HTML 字符串
   */
  title: string;

  /**
   * Item description, supports HTML string
   *
   * 项目描述，支持 HTML 字符串
   */
  details?: string;

  /**
   * Item icon
   *
   * @description image link or icon fontClass are supported
   *
   * 项目图标
   *
   * @description 支持图片链接或者图标字体类
   */
  icon?: string;

  /**
   * Item link
   *
   * 项目链接
   */
  link?: string;
}

export type ThemeProjectHomeFeatureItem = ThemeProjectHomeHighlightItem;

export interface ThemeProjectHomeHighlightOptions {
  /**
   * Highlight section header, supports HTML string
   *
   * 亮点标题，支持 HTML 字符串
   */
  header: string;

  /**
   * Highlight section description, supports HTML string
   *
   * 亮点描述，支持 HTML 字符串
   */
  description?: string;

  /**
   * Text color
   *
   * 文字颜色
   */
  color?: string;

  /**
   * Highlight section image
   *
   * 亮点图像
   */
  image?: string;

  /**
   * Highlight section image used in darkmode
   *
   * 夜间模式使用的亮点图片
   *
   * @default image
   */
  imageDark?: string;

  /**
   * Highlight Background image
   *
   * 亮点背景图
   */
  bgImage?: string;

  /**
   * Highlight Background image used in darkmode
   *
   * 夜间模式使用的亮点背景图
   *
   * @default bgImage
   */
  bgImageDark?: string;

  /**
   * Highlight Background image style
   *
   * 亮点背景图样式
   */
  bgImageStyle?: Record<string, string> | string;

  /**
   * Highlight section list type
   *
   * 亮点列表类型
   *
   * @default un-order
   */
  type?: "order" | "un-order" | "no-order";

  /**
   * Highlights
   *
   * 亮点
   */
  highlights?: ThemeProjectHomeHighlightItem[];
}

export interface ThemeProjectHomeFeatureOptions {
  /**
   * Feature header
   *
   * 功能标题
   */
  header?: string;

  /**
   * Feature section description, supports HTML string
   *
   * 功能描述，支持 HTML 字符串
   */
  description?: string;

  /**
   * Text color
   *
   * 文字颜色
   */
  color?: string;

  /**
   * Feature section image
   *
   * 功能图像
   */
  image?: string;

  /**
   * Feature section image used in darkmode
   *
   * 夜间模式使用的功能图片
   *
   * @default image
   */
  imageDark?: string;

  /**
   * Feature Background image
   *
   * 功能背景图
   */
  bgImage?: string;

  /**
   * Feature Background image used in darkmode
   *
   * 夜间模式使用的功能背景图
   *
   * @default bgImage
   */
  bgImageDark?: string;

  /**
   * Feature Background image style
   *
   * 功能背景图样式
   */
  bgImageStyle?: Record<string, string> | string;

  /**
   * Features
   *
   * 功能
   */
  features: ThemeProjectHomeFeatureItem[];
}

export interface ThemeProjectHomePageFrontmatter
  extends ThemeHopePageFrontmatter {
  actions?: ThemeProjectHomeActionOptions[];
  features?: ThemeProjectHomeFeatureItem[];
  highlights?: (
    | ThemeProjectHomeFeatureOptions
    | ThemeProjectHomeHighlightOptions
  )[];
}
