import type { LocaleData } from "@vuepress/shared";
import type { Author } from "vuepress-shared";

import type { AppearanceLocaleData } from "./appearance.js";
import type {
  FeatureLocaleConfig,
  FeatureLocaleData,
  FeatureLocaleOptions,
} from "./feature/index.js";
import type { LocaleDataToOption } from "./helpers.js";
import type {
  LayoutLocaleConfig,
  LayoutLocaleData,
  LayoutLocaleOptions,
} from "./layout/index.js";

export interface ThemeLocaleData
  extends AppearanceLocaleData,
    FeatureLocaleData,
    LayoutLocaleData {
  /**
   * Current lang code
   */
  lang: string;
}

export interface ThemeLocaleOptions
  extends LocaleData,
    LocaleDataToOption<AppearanceLocaleData>,
    LocaleDataToOption<FeatureLocaleData>,
    FeatureLocaleOptions,
    LocaleDataToOption<LayoutLocaleData>,
    LayoutLocaleOptions {
  /**
   * Global default author
   *
   * 全局默认作者
   */
  author?: Author;
}

export interface ThemeLocaleConfig
  extends LocaleData,
    ThemeLocaleData,
    FeatureLocaleConfig,
    LayoutLocaleConfig {
  /**
   * Global default author
   *
   * 全局默认作者
   */
  author?: Author;
}
