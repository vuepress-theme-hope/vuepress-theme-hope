import type { LocaleData } from "vuepress/shared";

export type RequiredLocaleConfig<T extends LocaleData = LocaleData> = Record<
  string,
  T
>;
