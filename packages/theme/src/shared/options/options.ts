import type { ThemeData } from "@vuepress/plugin-theme-data";
import type { AppearanceConfig, AppearanceOptions } from "./appearance.js";
import type { FeatureConfig, FeatureOptions } from "./feature/index.js";
import type { LayoutConfig, LayoutOptions } from "./layout/index.js";
import type { InfoOptions } from "./info.js";
import type { ThemeLocaleConfig, ThemeLocaleOptions } from "./locales.js";
import type { PluginsOptions } from "./plugins/index.js";

export interface ThemeOptions
  extends AppearanceOptions,
    FeatureOptions,
    InfoOptions,
    LayoutOptions,
    ThemeData<ThemeLocaleOptions> {
  plugins?: PluginsOptions;
}

export interface ThemeConfig
  extends AppearanceConfig,
    FeatureConfig,
    InfoOptions,
    LayoutConfig {
  locales: Record<string, ThemeLocaleConfig>;
}
