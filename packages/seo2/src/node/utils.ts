import { Logger } from "@mr-hope/vuepress-shared";
import type { SiteLocaleConfig } from "@vuepress/shared";
export const logger = new Logger("Seo");

export const getLink = (hostname: string, base: string, url: string): string =>
  `${hostname.match(/https?:\/\//) ? "" : "https://"}${hostname.replace(
    /\/$/u,
    ""
  )}${base}${url.replace(/^\//u, "")}`;

export const getLocales = (
  locales: SiteLocaleConfig = {},
  lang: string
): string[] => {
  const langs: string[] = [];

  for (const path in locales)
    if (locales[path].lang) langs.push(locales[path].lang as string);

  return langs.filter((item) => item !== lang);
};
