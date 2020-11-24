import { HopeThemeConfig, ResolvedHopeThemeConfig } from "./theme";
import { SiteConfig } from "@mr-hope/vuepress-types";

export * from "./locale";
export * from "./plugin";
export * from "./theme";

/** vuepress-theme-hope 项目配置 */
export interface HopeVuepressConfig extends SiteConfig {
  /** 自定义主题的配置 */
  themeConfig: HopeThemeConfig;
}

/** 处理过的 vuepress-theme-hope 项目配置 */
export interface ResolvedHopeVuepressConfig extends HopeVuepressConfig {
  /** 使用的自定义主题 */
  theme: "hope";
  /** 自定义主题的配置 */
  themeConfig: ResolvedHopeThemeConfig;
}
