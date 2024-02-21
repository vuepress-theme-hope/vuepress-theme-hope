import type { SearchIndex } from "slimsearch";

export const enum IndexField {
  heading = "h",
  anchor = "a",
  text = "t",
  customFields = "c",
}

export type PageIndexId = `${number}`;

export interface PageIndexItem {
  id: PageIndexId;
  /** Heading */ h: string;
  /** Text */ t?: string[];
}

export type SectionIndexId = `${PageIndexId}#${string}`;

export interface SectionIndexItem {
  id: SectionIndexId;
  /** Heading */ h: string;
  /** Text */ t?: string[];
}

export type CustomFieldIndexID = `${PageIndexId}@${number}`;

export interface CustomFieldIndexItem {
  id: string;
  /** CustomFields */ c: string[];
}

export type IndexItem = PageIndexItem | SectionIndexItem | CustomFieldIndexItem;

export type LocaleIndex = Record<string, IndexItem[]>;

export type SearchIndexStore = Record<
  string,
  SearchIndex<string, IndexItem, IndexItem>
>;
