import type { PageInfo } from "../../info.js";

export interface HopeThemeBlogLocaleData {
  /** 文章文字 */
  article: string;
  /** 文章列表文字 */
  articleList: string;
  /** 分类文字 */
  category: string;
  /** 标签文字 */
  tag: string;
  /** 时间轴文字 */
  timeline: string;
  /** 时间轴标题文字 */
  timelineTitle: string;
  /** 全部文字 */
  all: string;
  /** 个人介绍 */
  intro: string;
  /** 搜藏文字 */
  star: string;
  /** 幻灯片 */
  slides: string;
  /** 加密 */
  encrypt: string;
}

export interface HopeThemePaginationLocaleData {
  /**
   * Previous page button label text
   *
   * 上一页文字
   */
  prev: string;

  /**
   * Next page button label text
   *
   * 下一页文字
   */
  next: string;

  /**
   * Navigation hint label text
   *
   * 跳转提示文字
   */
  navigate: string;

  /**
   * Navigation button label text
   *
   * 跳转按钮文字
   */
  action: string;

  /**
   * Error text when invalid page number
   *
   * @description `$page` will be replaced by total page number automatically
   *
   * 页码错误文字
   *
   * @description 其中 `$page` 会自动替换为当前的总页数
   */
  errorText: string;
}

/**
 * 博客选项
 *
 * Blog configuration
 */
export interface HopeThemeBlogOptions {
  /**
   * Name of the Blogger
   *
   * 博主名称
   *
   * @default themeConfig.author
   */
  name?: string;

  /**
   * Blogger avatar, must be an absolute path
   *
   * 博主头像，应为绝对路径
   *
   * @default themeConfig.navbar.logo
   */
  avatar?: string;

  /**
   * Motto, slogan or a short description
   *
   * 口号、座右铭或介绍语
   */
  description?: string;

  /**
   * Blogger introduction page link
   *
   * 博主的个人介绍页地址
   */
  intro?: string;

  /**
   * 媒体链接配置
   *
   * Media links configuration
   *
   * E.g.
   *
   * ```js
   * {
   *   QQ: "http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes",
   *   Qzone: "https://1178522294.qzone.qq.com/",
   *   Gmail: "mailto:mister-hope@outlook.com",
   *   Zhihu: "https://www.zhihu.com/people/mister-hope",
   *   Steam: "https://steamcommunity.com/id/Mr-Hope/",
   *   Weibo: "https://weibo.com/misterhope",
   * }
   * ```
   */
  medias?: Record<string, [string, string] | string>;

  /**
   * Whether clipping the avatar with round shape
   *
   * 是否剪裁头像为圆形形状
   *
   * @default false
   */
  roundAvatar?: boolean;

  /**
   * Whether to display blogger info in sidebar
   *
   * 是否在侧边栏展示博主信息
   *
   * @default 'mobile'
   */
  sidebarDisplay?: "mobile" | "none" | "always";

  /**
   * Custom text for timeline
   *
   * 时间轴自定义文字
   *
   * @default 'Yesterday once more'
   */
  timeline?: string;

  /**
   * Article number per page
   *
   * 每页的文章数量
   *
   * @default 10
   */
  articlePerPage?: number;

  /**
   * Article info displayed in article list
   *
   * 文章列表中展示的文章信息
   *
   * @default ["Author", "Original", "Date", "PageView", "Category", "Tag", "ReadingTime"]
   */
  articleInfo?: PageInfo[];
}

export type HopeThemeBlogConfig = HopeThemeBlogOptions;
