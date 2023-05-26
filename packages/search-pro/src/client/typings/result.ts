export type Word = [tag: string, content: string] | string;

export interface TitleMatchedItem {
  type: "title";
  key: string;
  display: Word[];
}

export interface HeadingMatchedItem {
  type: "heading";
  key: string;
  anchor: string;
  display: Word[];
}

export interface CustomMatchedItem {
  type: "custom";
  key: string;
  index: string;
  display: Word[];
}

export interface ContentMatchedItem {
  type: "content";
  key: string;
  header?: string;
  anchor?: string;
  display: Word[];
}

export type MatchedItem =
  | TitleMatchedItem
  | HeadingMatchedItem
  | ContentMatchedItem
  | CustomMatchedItem;

export interface SearchResult {
  title: string;
  contents: MatchedItem[];
}
