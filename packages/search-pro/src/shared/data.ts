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
  [IndexField.heading]: string;
}

export type HeadingIndexId = `${PageIndexId}#${number}`;

export interface HeadingIndexItem {
  id: HeadingIndexId;
  [IndexField.anchor]: string;
  [IndexField.heading]: string;
}

export type CustomFieldIndexID = `${PageIndexId}@${number}`;

export interface CustomFieldIndexItem {
  id: string;
  [IndexField.customFields]: string[];
}

export type TextIndexID = `${HeadingIndexId}/${number}`;

export interface TextIndexItem {
  id: string;
  [IndexField.text]: string;
}

export type IndexItem =
  | PageIndexItem
  | HeadingIndexItem
  | CustomFieldIndexItem
  | TextIndexItem;

export type LocaleIndex = Record<string, IndexItem[]>;

export type SearchIndexStore = Record<string, SearchIndex<IndexItem, string>>;
