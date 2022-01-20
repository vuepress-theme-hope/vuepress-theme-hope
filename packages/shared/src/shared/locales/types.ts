import { lang2PathConfig } from "./config";
import type { LocaleData } from "@vuepress/core";

/** Types for supported lang codes */
export type HopeLang = keyof typeof lang2PathConfig;

export type ConvertLocaleConfig<T extends LocaleData = LocaleData> = Record<
  string,
  T
>;
