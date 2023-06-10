import type { SearchIndex } from "slimsearch";

export const enum IndexField {
  heading = "h",
  anchor = "a",
  text = "t",
  customFields = "c",
}

export type PageIndexId = `v-${string}`;

export interface PageIndexItem {
  id: PageIndexId;
  /** heading */ h: string;
  /** text */ t?: string[];
}

export type SectionIndexId = `${PageIndexId}#${string}`;

export interface SectionIndexItem {
  id: SectionIndexId;
  /** heading */ h: string;
  /** text */ t?: string[];
}

export type CustomFieldIndexID = `${PageIndexId}@${number}`;

export interface CustomFieldIndexItem {
  id: string;
  /** customFields */ c: string[];
}

export type IndexItem = PageIndexItem | SectionIndexItem | CustomFieldIndexItem;

export type LocaleIndex = Record<string, IndexItem[]>;

export type SearchIndexStore = Record<string, SearchIndex<IndexItem, string>>;
