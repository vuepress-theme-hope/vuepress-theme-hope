import type { ThemeData } from "@vuepress/plugin-theme-data";
import type { AppearanceConfig, AppearanceOptions } from "./appearance.js";
import type { FeatureConfig, FeatureOptions } from "./feature/index.js";
import type { LayoutConfig, LayoutOptions } from "./layout/index.js";
import type { InfoOptions } from "./info.js";
import type {
  HopeThemeLocaleConfig,
  HopeThemeLocaleOptions,
} from "./locales.js";
import type { PluginsOptions } from "./plugins/index.js";

export type HopeThemeRootOptions = AppearanceOptions &
  FeatureOptions &
  LayoutOptions &
  InfoOptions;

export type HopeThemeRootConfig = AppearanceConfig &
  FeatureConfig &
  LayoutConfig &
  InfoOptions;

export interface HopeThemeOptions
  extends HopeThemeRootOptions,
    ThemeData<HopeThemeLocaleOptions> {
  plugins?: PluginsOptions;
}

export type HopeThemeConfig = HopeThemeRootConfig & {
  locales: Record<string, HopeThemeLocaleConfig>;
};
