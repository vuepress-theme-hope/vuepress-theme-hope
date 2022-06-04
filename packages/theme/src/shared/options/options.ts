import type { ThemeData } from "@vuepress/plugin-theme-data";
import type { Author } from "vuepress-shared";
import type {
  HopeThemeAppearanceConfig,
  HopeThemeAppearanceOptions,
  HopeThemeAppearanceRootOptions,
} from "./appearance";
import type {
  HopeThemeFeatureConfig,
  HopeThemeFeatureOptions,
} from "./feature";
import type { HopeThemeLayoutOptions } from "./layout";
import type { HopeThemeLocaleConfig, HopeThemeLocaleOptions } from "./locales";
import type { HopeThemePluginsOptions } from "./plugins";

export interface HopeThemeRootInfoOptions {
  /**
   * Global default author
   *
   * 全局默认作者
   */
  author?: Author;

  /**
   * domain which to be deployed to
   *
   * 网站部署域名
   */
  hostname?: string;
}

export type HopeThemeRootOptions = HopeThemeAppearanceOptions &
  HopeThemeFeatureOptions &
  HopeThemeLayoutOptions &
  HopeThemeAppearanceRootOptions &
  HopeThemeRootInfoOptions;

export type HopeThemeRootConfig = HopeThemeAppearanceConfig &
  HopeThemeFeatureConfig &
  HopeThemeLayoutOptions &
  HopeThemeRootInfoOptions;

export interface HopeThemeOptions
  extends HopeThemeRootOptions,
    ThemeData<HopeThemeLocaleOptions> {
  plugins?: HopeThemePluginsOptions;
}

export type HopeThemeConfig = HopeThemeRootConfig & {
  locales: Record<string, HopeThemeLocaleConfig>;
};
