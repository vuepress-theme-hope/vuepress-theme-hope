import type { LocaleConfig } from "@vuepress/core";

export interface SearchProLocaleOptions {
  fullText?: boolean;
  placeholder?: string;
  frontmatter?: {
    tag?: string;
    category?: string;
  };
}

export interface SearchProOptions extends SearchProLocaleOptions {
  locales?: LocaleConfig<SearchProLocaleOptions>;
}
