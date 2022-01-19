import type { ThemeData } from "@vuepress/plugin-theme-data";

import type { HopeThemeRootOptions, HopeThemeLocaleOptions } from "./options";

export type HopeThemeData = HopeThemeRootOptions &
  ThemeData<HopeThemeLocaleOptions>;
