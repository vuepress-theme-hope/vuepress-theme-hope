import type { LocaleData } from "@vuepress/shared";
import type {
  HopeThemeFeatureLocaleData,
  HopeThemeFeatureLocaleOptions,
  HopeThemeLayoutLocaleData,
  HopeThemeLayoutLocaleOptions,
} from "./options";

export interface DefaultHopeThemeLocaleData
  extends HopeThemeFeatureLocaleData,
    HopeThemeLayoutLocaleData {
  /**
   * Current lang code
   */
  lang: string;
  /**
   * Theme Color
   */
  themeColorText: string;
  /**
   * Theme mode
   */
  darkmodeText: string;
  /**
   * Encrypt
   */
  encryptLocales: {
    /**
     * Encrypt title
     */
    title: string;
    /**
     * Passwrod error hint
     */
    errorHint: string;
  };
}

export type HopeThemeLocaleData = HopeThemeFeatureLocaleData &
  HopeThemeFeatureLocaleOptions &
  HopeThemeLayoutLocaleData &
  HopeThemeLayoutLocaleOptions &
  LocaleData;
