import type { ThemeData as DefaultThemeData } from "@vuepress/plugin-theme-data";

import type {
  AppearanceOptions,
  FeatureOptions,
  InfoOptions,
  LayoutOptions,
  MarkdownOptions,
  PluginsOptions,
  ThemeLocaleOptions,
} from "../../shared/index.js";

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
