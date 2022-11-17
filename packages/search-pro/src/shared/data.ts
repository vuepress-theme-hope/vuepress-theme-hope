export interface PageHeaderContent {
  header: string;
  slug: string;
  contents: string[];
}

export interface PageIndex {
  title: string;
  contents: PageHeaderContent[];
  customFields?: Record<string, string[]>;
}

export type LocaleIndex = Record<string, PageIndex>;

export type SearchIndex = Record<string, LocaleIndex>;
