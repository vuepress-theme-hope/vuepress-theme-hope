import type { ThemeData as DefaultThemeData } from "@vuepress/plugin-theme-data";

import type { AppearanceConfig, AppearanceOptions } from "./appearance.js";
import type { FeatureConfig, FeatureOptions } from "./feature/index.js";
import type { InfoConfig, InfoOptions } from "./info.js";
import type { LayoutOptions } from "./layout/index.js";
import type { ThemeLocaleConfig, ThemeLocaleOptions } from "./locales.js";
import type { MarkdownOptions } from "./markdown.js";
import type { PluginsOptions } from "./plugins/index.js";

export interface ThemeOptions
  extends AppearanceOptions,
    FeatureOptions,
    InfoOptions,
    LayoutOptions,
    DefaultThemeData<ThemeLocaleOptions> {
  /**
   * Theme markdown options
   *
   * 主题 markdown 选项
   */
  markdown?: MarkdownOptions;

  /**
   * Theme plugins options
   *
   * 主题插件选项
   */
  plugins?: PluginsOptions;
}

export interface ThemeData extends AppearanceConfig, FeatureConfig, InfoConfig {
  locales: Record<string, ThemeLocaleConfig>;
}
