import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from "@vuepress/plugin-theme-data/client";
import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from "@vuepress/plugin-theme-data/client";

import type { ThemeData, ThemeLocaleConfig } from "../../shared/index.js";

export const useThemeData = (): ThemeDataRef<ThemeData> =>
  _useThemeData<ThemeData>();

export const useThemeLocaleData = (): ThemeLocaleDataRef<ThemeLocaleConfig> =>
  _useThemeLocaleData<ThemeLocaleConfig>();
