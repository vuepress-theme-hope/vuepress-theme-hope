import { type SearchIndex } from "slimsearch";

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
}

export type HeadingIndexId = `${PageIndexId}#${number}`;

export interface HeadingIndexItem {
  id: HeadingIndexId;
  /** anchor */ a: string;
  /** heading */ h: string;
}

export type CustomFieldIndexID = `${PageIndexId}@${number}`;

export interface CustomFieldIndexItem {
  id: string;
  /** customFields */ c: string[];
}

export type TextIndexID = `${HeadingIndexId}/${number}`;

export interface TextIndexItem {
  id: string;
  /** text */ t: string;
}

export type IndexItem =
  | PageIndexItem
  | HeadingIndexItem
  | CustomFieldIndexItem
  | TextIndexItem;

export type LocaleIndex = Record<string, IndexItem[]>;

export type SearchIndexStore = Record<string, SearchIndex<IndexItem, string>>;
