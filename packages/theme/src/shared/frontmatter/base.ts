import type { BasePageFrontMatter } from "vuepress-shared";

import type { SidebarArrayOptions } from "../sidebar.js";

export interface ThemePageFrontmatter extends BasePageFrontMatter {
  /**
   * Whether is home page
   *
   * 是否是主页
   *
   * @default false
   */

  home?: boolean;

  /**
   * Whether enable navbar
   *
   * 是否启用导航栏
   *
   * @default true
   */
  navbar?: boolean;

  /**
   * Sidebar configuration
   *
   * 侧边栏配置
   */
  sidebar?: false | SidebarArrayOptions;

  /**
   * Additional Class for Page container
   *
   * 页面容器的额外类名
   */
  containerClass?: string;

  /**
   * Whether show external link icon
   *
   * 是否启用外部链接图标
   *
   * @default true
   */
  externalLinkIcon?: boolean;
}
