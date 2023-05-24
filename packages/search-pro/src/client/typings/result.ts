export type Word = [tag: string, content: string] | string;

export interface TitleMatchedItem {
  type: "title";
  id: string;
  display: Word[];
}

export interface HeadingMatchedItem {
  type: "heading";
  id: string;
  display: Word[];
}

export interface CustomMatchedItem {
  type: "custom";
  id: string;
  index: string;
  display: Word[];
}

export interface ContentMatchedItem {
  type: "content";
  id: string;
  header: string;
  display: Word[];
}

export type MatchedItem =
  | TitleMatchedItem
  | HeadingMatchedItem
  | ContentMatchedItem
  | CustomMatchedItem;

export interface Result {
  title: string;
  contents: MatchedItem[];
}
