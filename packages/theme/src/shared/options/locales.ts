import type { Author } from "@mr-hope/vuepress-shared";
import type { LocaleData } from "@vuepress/shared";
import type { HopeThemeAppearanceLocaleData } from "./appearance";
import type {
  HopeThemeFeatureLocaleConfig,
  HopeThemeFeatureLocaleData,
  HopeThemeFeatureLocaleOptions,
} from "./feature";
import type { LocaleData2Option } from "./helpers";
import type {
  HopeThemeLayoutLocaleData,
  HopeThemeLayoutLocaleOptions,
} from "./layout";

export interface HopeThemeLocaleData
  extends HopeThemeAppearanceLocaleData,
    HopeThemeFeatureLocaleData,
    HopeThemeLayoutLocaleData {
  /**
   * Current lang code
   */
  lang: string;
}

export type HopeThemeLocaleOptions =
  LocaleData2Option<HopeThemeAppearanceLocaleData> &
    LocaleData2Option<HopeThemeFeatureLocaleData> &
    HopeThemeFeatureLocaleOptions &
    LocaleData2Option<HopeThemeLayoutLocaleData> &
    HopeThemeLayoutLocaleOptions & {
      /**
       * Global default author
       *
       * 全局默认作者
       */
      author?: Author;
    } & LocaleData;

export type HopeThemeLocaleConfig = HopeThemeLocaleData &
  HopeThemeFeatureLocaleConfig &
  HopeThemeLayoutLocaleOptions & {
    /**
     * Global default author
     *
     * 全局默认作者
     */
    author?: Author;
  } & LocaleData;
