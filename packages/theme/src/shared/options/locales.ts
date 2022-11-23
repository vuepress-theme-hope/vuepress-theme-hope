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
  LayoutLocaleData,
  LayoutLocaleConfig,
  LayoutLocaleOptions,
} from "./layout/index.js";

export interface HopeThemeLocaleData
  extends AppearanceLocaleData,
    FeatureLocaleData,
    LayoutLocaleData {
  /**
   * Current lang code
   */
  lang: string;
}

export type HopeThemeLocaleOptions = LocaleDataToOption<AppearanceLocaleData> &
  LocaleDataToOption<FeatureLocaleData> &
  FeatureLocaleOptions &
  LocaleDataToOption<LayoutLocaleData> &
  LayoutLocaleOptions & {
    /**
     * Global default author
     *
     * 全局默认作者
     */
    author?: Author;
  } & LocaleData;

export type HopeThemeLocaleConfig = HopeThemeLocaleData &
  FeatureLocaleConfig &
  LayoutLocaleConfig & {
    /**
     * Global default author
     *
     * 全局默认作者
     */
    author?: Author;
  } & LocaleData;
