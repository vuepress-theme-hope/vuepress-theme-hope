import type { BasePageFrontMatter } from "vuepress-shared";

export interface HopeThemePageFrontmatter extends BasePageFrontMatter {
  /**
   * Whether is home page
   *
   * 是否是主页
   */

  home?: boolean;

  /**
   * Whether enable navbar
   *
   * 是否启用导航栏
   */
  navbar?: boolean;

  /**
   * Sidebar configuration
   *
   * 侧边栏配置
   */
  sidebar?: "heading" | false;

  /**
   * Additional Class for Page container
   *
   * 页面容器的额外类名
   */
  containerClass?: string;

  /**
   * Whether show toc list in desktop mode
   *
   * 是否在桌面模式下展示标题列表
   */
  toc?: boolean;
}
