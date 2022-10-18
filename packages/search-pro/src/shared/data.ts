import type { App, LocaleConfig, Page } from "@vuepress/core";
import type { Ref } from "vue";

export interface SearchPageFrontmatter {
  category: string[] | null;
  tag: string[] | null;
}

export interface PageContent {
  header: string;
  slug: string;
  content: string;
}

export interface PageIndex {
  title: Page["title"];
  path: Page["path"];
  pathLocale: Page["pathLocale"];
  frontmatter: SearchPageFrontmatter;
  contents: PageContent[];
}

export interface Word {
  type: string;
  str: string;
}

export interface Suggestion {
  path: string;
  parentPageTitle: string;
  title: string;
  display: Word[];
  page: PageIndex;
  frontmatter: SearchPageFrontmatter;
  content: PageContent | null;
  point: number;
}

export type SearchIndex = PageIndex[];
export type SearchIndexRef = Ref<SearchIndex>;

export type Options = {
  fullText?: boolean;
  placeholder?: string;
  frontmatter?: {
    tag?: string;
    category?: string;
  };
};

export interface LocaleOptions extends Options {
  locales?: LocalesOptions;
}

export type VuepressApp = Pick<App, "env" | "writeTemp"> & {
  pages: VuepressPage[];
};

export type VuepressPage = Pick<
  Page,
  | "pathLocale"
  | "title"
  | "path"
  | "headers"
  | "contentRendered"
  | "frontmatter"
>;

export type LocalesOptions = LocaleConfig<Options>;

export type LocaleData = Record<string, any>;
