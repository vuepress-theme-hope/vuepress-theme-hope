import { type ThemeNormalPageFrontmatter } from "../../frontmatter/index.js";
import { type ThemePageData } from "../../page.js";
import { type SidebarOptions } from "../../sidebar.js";

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
  infoB: SidebarInfo
) => number;

export type SidebarSorter =
  | SidebarSorterFunction
  | SidebarSorterFunction[]
  | SidebarSorterKeyword
  | SidebarSorterKeyword[];

export interface SidebarLocaleOptions {
  /**
   * sidebar config
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

  /**
   * Whether show icons in the sidebar
   *
   * 是否在侧边栏显示图标
   *
   * @default true
   */
  sidebarIcon?: boolean;

  /**
   * Heading depth for sidebar and toc
   *
   * - Set to `0` to disable all levels
   * - Set to `1` to include `<h2>`
   * - Set to `2` to include `<h2>` and `<h3>`
   * - ...
   *
   * The max value depends on which headers you have extracted
   * via `markdown.headers.level`.
   *
   * The default value of `markdown.headers.level` is `[2, 3]`,
   * so the default max value of `headerDepth` is `2`
   *
   * 侧边栏和页面目录的标题深度
   *
   * - 设置 `0` 来禁用所有级别的标题
   * - 设置 `1` 来包含 `<h2>`
   * - 设置 `2` 来包含 `<h2>` 和 `<h3>`
   * - ...
   *
   * `markdown.headers.level` 的默认值是 `[2, 3]`,
   * 所以 `headerDepth` 的默认最大值是 `2`
   *
   * @default 2
   */
  headerDepth?: number;
}
