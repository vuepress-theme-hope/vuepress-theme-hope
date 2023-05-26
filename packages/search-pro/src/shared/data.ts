import { type SearchIndex } from "slimsearch";

export const enum IndexField {
  heading = "h",
  text = "t",
  customFields = "c",
}

export interface IndexItem {
  id: string;
  [IndexField.heading]: string;
  [IndexField.text]?: string[];
  [IndexField.customFields]?: Record<string, string[]>;
}

export type LocaleIndex = Record<string, IndexItem[]>;

export type SearchIndexStore = Record<string, SearchIndex<IndexItem, string>>;
