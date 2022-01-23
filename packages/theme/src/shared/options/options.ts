import type { Author } from "@mr-hope/vuepress-shared";
import type { LocaleData } from "@vuepress/shared";
import type { HopeThemeAppearanceOptions } from "./appearance";
import type {
  HopeThemeFeatureLocaleData,
  HopeThemeFeatureLocaleOptions,
  HopeThemeFeatureOptions,
} from "./feature";
import type { LocaleData2Option } from "./helpers";
import type {
  HopeThemeLayoutLocaleData,
  HopeThemeLayoutLocaleOptions,
  HopeThemeLayoutOptions,
} from "./layout";

export type HopeThemeLocaleOptions =
  LocaleData2Option<HopeThemeFeatureLocaleData> &
    HopeThemeFeatureLocaleOptions &
    LocaleData2Option<HopeThemeLayoutLocaleData> &
    HopeThemeLayoutLocaleOptions &
    LocaleData;

export interface HopeThemeRootOptions
  extends HopeThemeAppearanceOptions,
    HopeThemeFeatureOptions,
    HopeThemeLayoutOptions {
  /**
   * 作者
   */
  author?: Author;
}

// /**
//  * Custom block config
//  *
//  * Default title of TIP custom block
//  */
// tip?: string;

// /**
//  * Custom block config
//  *
//  * Default title of WARNING custom block
//  */
// warning?: string;

// /**
//  * Custom block config
//  *
//  * Default title of DANGER custom block
//  */
// danger?: string;
