import { type ThemeData as DefaultThemeData } from "@vuepress/plugin-theme-data";

import { type AppearanceConfig, type AppearanceOptions } from "./appearance.js";
import { type FeatureConfig, type FeatureOptions } from "./feature/index.js";
import { type InfoOptions } from "./info.js";
import { type LayoutConfig, type LayoutOptions } from "./layout/index.js";
import { type ThemeLocaleConfig, type ThemeLocaleOptions } from "./locales.js";
import { type PluginsOptions } from "./plugins/index.js";

export interface ThemeOptions
  extends AppearanceOptions,
    FeatureOptions,
    InfoOptions,
    LayoutOptions,
    DefaultThemeData<ThemeLocaleOptions> {
  plugins?: PluginsOptions;
}

export interface ThemeData
  extends AppearanceConfig,
    FeatureConfig,
    InfoOptions,
    LayoutConfig {
  locales: Record<string, ThemeLocaleConfig>;
}
