import type { Author } from "@mr-hope/vuepress-shared";
import type { ThemeData } from "@vuepress/plugin-theme-data";
import type {
  HopeThemeAppearanceConfig,
  HopeThemeAppearanceOptions,
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

  /**
   * Link of font icon asset
   *
   * 字体图标资源链接
   *
   * @description `'iconfont'` and `'font-awesome'` keywords are supported
   */
  iconAssets?: string;

  /**
   * Font Icon class prefix
   *
   * 字体图标 class 前缀
   *
   * @default ''
   */
  iconPrefix?: string;
}

export type HopeThemeRootOptions = HopeThemeAppearanceOptions &
  HopeThemeFeatureOptions &
  HopeThemeLayoutOptions &
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
