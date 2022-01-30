import type { Author } from "@mr-hope/vuepress-shared";
import type { ThemeData } from "@vuepress/plugin-theme-data";
import type { HopeThemeAppearanceOptions } from "./appearance";
import type {
  HopeThemeFeatureConfig,
  HopeThemeFeatureOptions,
} from "./feature";
import type { HopeThemeLayoutOptions } from "./layout";
import type { HopeThemeLocaleConfig, HopeThemeLocaleOptions } from "./locales";
import type { HopeThemePluginsOptions } from "./plugins";

export interface HopeThemeRootOptions
  extends HopeThemeAppearanceOptions,
    HopeThemeFeatureOptions,
    HopeThemeLayoutOptions {
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

export interface HopeThemeRootConfig
  extends HopeThemeAppearanceOptions,
    HopeThemeFeatureConfig,
    HopeThemeLayoutOptions {
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

export interface HopeThemeOptions
  extends HopeThemeRootOptions,
    ThemeData<HopeThemeLocaleOptions> {
  plugins?: HopeThemePluginsOptions;
}

export type HopeThemeConfig = HopeThemeRootConfig &
  ThemeData<HopeThemeLocaleConfig>;
