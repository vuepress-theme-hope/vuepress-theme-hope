import type { ThemeData } from "@vuepress/plugin-theme-data";

import type {
  HopeThemeLocaleOptions,
  HopeThemePluginsOptions,
  HopeThemeRootOptions,
} from "./options";

export interface HopeThemeData
  extends HopeThemeRootOptions,
    ThemeData<HopeThemeLocaleOptions> {
  plugins?: HopeThemePluginsOptions;
}
