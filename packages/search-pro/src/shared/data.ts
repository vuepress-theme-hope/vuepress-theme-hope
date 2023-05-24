import type MiniSearch from "minisearch";

export interface PageIndex {
  id: string;
  title: string;
  text?: string[];
  customFields?: Record<string, string[]>;
}

export interface SectionIndex {
  id: string;
  title: string;
  header: string;
  text?: string[];
}

export type SearchIndex = PageIndex | SectionIndex;

export type LocaleIndex = Record<string, SearchIndex[]>;

export type SearchIndexStore = Record<string, MiniSearch<SearchIndex>>;
