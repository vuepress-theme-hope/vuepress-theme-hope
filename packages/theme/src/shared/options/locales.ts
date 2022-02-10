import type { LocaleData } from "@vuepress/shared";
import type { HopeThemeAppearanceLocaleData } from "./appearance";
import type {
  HopeThemeFeatureConfig,
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
    HopeThemeLayoutLocaleOptions &
    LocaleData;

export type HopeThemeLocaleConfig = HopeThemeLocaleData &
  HopeThemeFeatureLocaleConfig &
  HopeThemeFeatureConfig &
  HopeThemeLayoutLocaleData &
  HopeThemeLayoutLocaleOptions &
  LocaleData;
