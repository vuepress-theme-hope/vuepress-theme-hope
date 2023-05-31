import { type ThemeHopePageFrontmatter } from "./home.js";

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
}

export interface ThemeProjectHomeFeatureItemOptions {
  /**
   * Feature name, supports HTML string
   *
   * 功能名称，支持 HTML 字符串
   */
  title: string;

  /**
   * Feature description, supports HTML string
   *
   * 功能描述，支持 HTML 字符串
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

export interface ThemeProjectHomeFeatureOptions {
  /**
   * Feature header
   *
   * 功能标题
   */
  header?: string;

  /**
   * Feature config
   *
   * 功能配置
   */
  features: ThemeProjectHomeFeatureItemOptions[];
}

export interface ThemeProjectHomeHighlightItem {
  /**
   * Highlight Item title, supports HTML string
   *
   * 高亮项目标题，支持 HTML 字符串
   */
  title: string;

  /**
   * Highlight item details, supports HTML string
   *
   * 高亮项目详情，支持 HTML 字符串
   */
  details?: string;

  /**
   * Highlight item icon
   *
   * 高亮项目图标
   */
  icon?: string;

  /**
   * Highlight item link
   *
   * 高亮项目链接
   */
  link?: string;
}

export interface ThemeProjectHomeHighlightSection {
  /**
   * Highlight section header, supports HTML string
   *
   * 高亮标题，支持 HTML 字符串
   */
  header: string;

  /**
   * Highlight section description, supports HTML string
   *
   * 高亮描述，支持 HTML 字符串
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
   * 高亮图像
   */
  image?: string;

  /**
   * Highlight section image used in darkmode
   *
   * 夜间模式使用的高亮图片
   *
   * @default image
   */
  imageDark?: string;

  /**
   * Highlight Background image
   *
   * 高亮背景图
   */
  bgImage?: string;

  /**
   * Highlight Background image used in darkmode
   *
   * 夜间模式使用的高亮背景图
   *
   * @default bgImage
   */
  bgImageDark?: string;

  /**
   * Highlight section list type
   *
   * 高亮列表类型
   *
   * @default un-order
   */
  type?: "order" | "un-order" | "no-order";

  /**
   * Highlights
   *
   * 高亮
   */
  highlights?: ThemeProjectHomeHighlightItem[];
}

export interface ThemeProjectHomePageFrontmatter
  extends ThemeHopePageFrontmatter {
  actions?: ThemeProjectHomeActionOptions[];
  features?:
    | ThemeProjectHomeFeatureItemOptions[]
    | ThemeProjectHomeFeatureOptions[];
  highlights?: (
    | ThemeProjectHomeHighlightSection
    | ThemeProjectHomeFeatureOptions
  )[];
}
