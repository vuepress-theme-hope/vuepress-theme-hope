import type { LocaleData } from "@vuepress/core";

export type ConvertLocaleConfig<T extends LocaleData = LocaleData> = Record<
  string,
  T
>;
