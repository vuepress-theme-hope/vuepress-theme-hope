import type { ThemeData } from "@vuepress/plugin-theme-data";
import type { Author } from "vuepress-shared";
import type {
  HopeThemeAppearanceRootConfig,
  HopeThemeAppearanceRootOptions,
} from "./appearance.js";
import type {
  HopeThemeFeatureRootConfig,
  HopeThemeFeatureRootOptions,
} from "./feature/index.js";
import type { HopeThemeLayoutRootOptions } from "./layout/index.js";
import type {
  HopeThemeLocaleConfig,
  HopeThemeLocaleOptions,
} from "./locales.js";
import type { HopeThemePluginsOptions } from "./plugins/index.js";

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

export type HopeThemeRootOptions = HopeThemeAppearanceRootOptions &
  HopeThemeFeatureRootOptions &
  HopeThemeLayoutRootOptions &
  HopeThemeRootInfoOptions;

export type HopeThemeRootConfig = HopeThemeAppearanceRootConfig &
  HopeThemeFeatureRootConfig &
  HopeThemeLayoutRootOptions &
  HopeThemeRootInfoOptions;

export interface HopeThemeOptions
  extends HopeThemeRootOptions,
    ThemeData<HopeThemeLocaleOptions> {
  plugins?: HopeThemePluginsOptions;
}

export type HopeThemeConfig = HopeThemeRootConfig & {
  locales: Record<string, HopeThemeLocaleConfig>;
};
