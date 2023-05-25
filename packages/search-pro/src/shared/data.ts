import { type SearchIndex } from "slimsearch";

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

export type IndexItem = PageIndex | SectionIndex;

export type LocaleIndex = Record<string, IndexItem[]>;

export type SearchIndexStore = Record<string, SearchIndex<IndexItem>>;
