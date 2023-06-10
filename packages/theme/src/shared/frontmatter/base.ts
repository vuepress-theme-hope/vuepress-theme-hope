import type { BasePageFrontMatter } from "vuepress-shared";

export interface ThemePageFrontmatter extends BasePageFrontMatter {
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
}
