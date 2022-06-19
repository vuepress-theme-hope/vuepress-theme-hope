import type { HopeThemeSidebarConfig } from "../../sidebar";

export interface HopeThemeSidebarLocaleOptions {
  /**
   * sidebar config
   *
   * @description Set to `false` to disable sidebar in current locale
   * @see https://vuepress-theme-hope.github.io/v2/guide/layout/sidebar.html
   *
   * 侧边栏配置
   *
   * @description 设置为 `false` 以在当前语言中禁用侧边栏
   * @see https://vuepress-theme-hope.gitee.io/v2/zh/guide/layout/sidebar.html
   */
  sidebar?: HopeThemeSidebarConfig | "structure" | "heading" | false;

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
   * via `markdown.extractHeaders.level`.
   *
   * The default value of `markdown.extractHeaders.level` is `[2, 3]`,
   * so the default max value of `headerDepth` is `2`
   *
   * @default 2
   */
  headerDepth?: number;
}
