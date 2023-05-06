declare module "@temp/search-pro/database" {
  interface PageHeaderContent {
    header: string;
    slug: string;
    contents: string[];
  }

  interface PageIndex {
    title: string;
    contents: PageHeaderContent[];
    customFields?: Record<string, string[]>;
  }

  type LocaleIndex = Record<string, PageIndex>;

  type SearchIndex = Record<string, LocaleIndex>;

  export const database: SearchIndex;
}
