import type { SiteLocaleConfig } from "@vuepress/shared";

export const resolveUrl = (base: string, url: string): string =>
  `${base}${url.replace(/^\//u, "")}`;

export const getLocales = (locales: SiteLocaleConfig = {}): string[] => {
  const langs: string[] = [];

  for (const path in locales)
    if (locales[path].lang) langs.push(locales[path].lang as string);

  return langs;
};
