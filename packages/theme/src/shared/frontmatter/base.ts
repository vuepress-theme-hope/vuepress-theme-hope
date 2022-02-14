import type { BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { HopeThemeSidebarConfig } from "../sidebar";

export interface HopeThemePageFrontmatter extends BasePageFrontMatter {
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
  sidebar?: "auto" | false | HopeThemeSidebarConfig;

  /**
   * Addtional Class for Page container
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
