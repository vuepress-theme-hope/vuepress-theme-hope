import type { SidebarConfig } from "../../sidebar";

export interface HopeThemeSidebarLocaleOptions {
  /**
   * sidebar config
   *
   * Set to `false` to disable sidebar in current locale
   */
  config?: SidebarConfig | "auto" | false;

  /**
   * Whether show icons in the sidebar
   *
   * 是否在侧边栏显示图标
   *
   * @default true
   */
  showIcon?: boolean;

  /**
   * Sidebar heading depth
   *
   * - Set to `0` to disable all levels
   * - Set to `1` to include `<h2>`
   * - Set to `2` to include `<h2>` and `<h3>`
   * - ...
   *
   * The max value depends on which headers you have extracted
   * via `markdown.extractHeaders.level`.
   *
   * The default value of `markdown.extractHeaders.level` is `[2, 3]`,
   * so the default max value of `sidebarDepth` is `2`
   */
  headingDepth?: number;
}
