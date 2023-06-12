import type { LocaleData } from "@vuepress/core";

export type RequiredLocaleConfig<T extends LocaleData = LocaleData> = Record<
  string,
  T
>;
