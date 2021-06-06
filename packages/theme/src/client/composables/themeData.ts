import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from "@vuepress/plugin-theme-data/lib/client";
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from "@vuepress/plugin-theme-data/lib/client";
import type { HopeThemeData } from "../../shared";

export const useThemeData = (): ThemeDataRef<HopeThemeData> =>
  _useThemeData<HopeThemeData>();
export const useThemeLocaleData = (): ThemeLocaleDataRef<HopeThemeData> =>
  _useThemeLocaleData<HopeThemeData>();
