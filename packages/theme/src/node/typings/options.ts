import type { ThemeData as CommonThemeData } from "@vuepress/plugin-theme-data";

import type { ThemeMarkdownOptions } from "./markdown.js";
import type { ThemePluginsOptions } from "./plugins/index.js";
import type {
  AppearanceOptions,
  FeatureOptions,
  InfoOptions,
  LayoutOptions,
  ThemeLocaleOptions,
} from "../../shared/index.js";

export interface ThemeOptions
  extends
    CommonThemeData<ThemeLocaleOptions>,
    AppearanceOptions,
    FeatureOptions,
    InfoOptions,
    LayoutOptions {
  /**
   * Theme markdown options
   *
   * 主题 Markdown 选项
   */
  markdown?: ThemeMarkdownOptions;

  /**
   * Theme plugins options
   *
   * 主题插件选项
   */
  plugins?: ThemePluginsOptions;
}
