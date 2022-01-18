import type { MediaType } from "./medialinks";

/**
 * 博客选项
 *
 * Blog configuration
 */
export interface HopeBlogOptions {
  /**
   * 博主名称
   *
   * Name of the Blogger, default is `themeConfig.author`
   */
  name?: string;

  /**
   * 博主头像，应为绝对路径
   *
   * Blogger avatar, must be an absolute path
   */
  avatar?: string;

  /**
   * 博主的个人介绍地址
   *
   * Intro page about blogger
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
   *   Gmail: "mailto:zhangbowang1998@gmail.com",
   *   Zhihu: "https://www.zhihu.com/people/mister-hope",
   *   Steam: "https://steamcommunity.com/id/Mr-Hope/",
   *   Weibo: "https://weibo.com/misterhope",
   * }
   * ```
   */
  links?: Record<MediaType, string>;

  /**
   * 是否剪裁头像为圆形形状
   *
   * Whether cliping the avatar with round shape
   *
   * @default true
   */
  roundAvatar?: boolean;

  /**
   * 是否在侧边栏展示博主信息
   *
   * Whether to display blogger info in sidebar
   *
   * @default 'none'
   */
  sidebarDisplay?: "mobile" | "none" | "always";

  /**
   * 时间轴自定义文字
   *
   * Custom text for timeline
   *
   * @default 'Yesterday once more'
   */
  timeline?: string;
  /**
   * 每页的文章数量
   *
   * Article number per page
   *
   * @default 10
   */
  perPage?: number;
}

export interface HopeThemeFeatureOptions {
  /**
   * Dark mode support options:
   *
   * - `'auto-switch'`: "off | automatic | on" three-stage switch (Default)
   * - `'switch'`: "Close | Open" toggle switch
   * - `'auto'`: Automatically decide whether to apply dark mode based on user device’s color-scheme or current time
   * - `'disable'`: disable dark mode
   *
   * 深色模式支持选项:
   *
   * - `'auto-switch'`: "关闭 | 自动 | 打开" 的三段式开关 (默认)
   * - `'switch'`: "关闭 | 打开" 的切换式开关
   * - `'auto'`: 自动根据用户设备主题或当前时间决定是否应用深色模式
   * - `'disable'`: 禁用深色模式
   *
   * @default 'auto-switch'
   */
  darkmode?: "auto-switch" | "auto" | "switch" | "disable";

  /**
   * 主题色选项配置。
   *
   * Theme color configuration.
   *
   * E.g.:
   * ```js
   * {
   *   blue: '#2196f3',
   *   red: '#f26d6d',
   *   green: '#3eaf7c',
   *   orange: '#fb9b5f'
   * }
   * ```
   *
   * @default { blue: '#2196f3', red: '#f26d6d', green: '#3eaf7c', orange: '#fb9b5f' }
   */
  themeColor?: Record<string, string> | false;

  blog?: HopeBlogOptions | false;
}
