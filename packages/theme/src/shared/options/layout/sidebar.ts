import type { ThemeNormalPageFrontmatter } from "../../frontmatter/index.js";
import type { ThemePageData } from "../../page.js";
import type { SidebarOptions } from "../../sidebar.js";

export interface SidebarFileInfo {
  type: "file";
  filename: string;

  title: string;
  order: number | null;
  path?: string | null;

  frontmatter: ThemeNormalPageFrontmatter;
  pageData: ThemePageData;
}

export interface SidebarDirInfo {
  type: "dir";
  dirname: string;
  children: SidebarInfo[];

  title: string;
  order: number | null;

  groupInfo: {
    icon?: string;
    expanded?: boolean;
    collapsible?: boolean;
    link?: string;
  };

  frontmatter: ThemeNormalPageFrontmatter | null;
  pageData: ThemePageData | null;
}

export type SidebarInfo = SidebarFileInfo | SidebarDirInfo;

export type SidebarSorterKeyword =
  | "readme"
  | "order"
  | "date"
  | "date-desc"
  | "filename"
  | "title";

export type SidebarSorterFunction = (
  infoA: SidebarInfo,
  infoB: SidebarInfo,
) => number;

export type SidebarSorter =
  | SidebarSorterFunction
  | SidebarSorterFunction[]
  | SidebarSorterKeyword
  | SidebarSorterKeyword[];

export interface SidebarLocaleOptions {
  /**
   * Sidebar config
   *
   * @description Set to `false` to disable sidebar in current locale
   * @see https://theme-hope.vuejs.press/guide/layout/sidebar.html
   *
   * 侧边栏配置
   *
   * @description 设置为 `false` 以在当前语言中禁用侧边栏
   * @see https://theme-hope.vuejs.press/zh/guide/layout/sidebar.html
   */
  sidebar?: SidebarOptions;
}
