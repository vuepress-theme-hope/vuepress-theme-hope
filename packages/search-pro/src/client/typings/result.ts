export type Word = [tag: string, content: string] | string;

export const enum ResultType {
  title = "t",
  heading = "h",
  text = "p",
  custom = "c",
}

export const enum ResultField {
  type = "t",
  key = "k",
  anchor = "a",
  header = "h",
  index = "i",
  display = "d",
}

export interface TitleMatchedItem {
  [ResultField.type]: ResultType.title;
  [ResultField.key]: string;
  [ResultField.display]: Word[][];
}

export interface HeadingMatchedItem {
  [ResultField.type]: ResultType.heading;
  [ResultField.key]: string;
  [ResultField.anchor]: string;
  [ResultField.display]: Word[][];
}

export interface ContentMatchedItem {
  [ResultField.type]: ResultType.text;
  [ResultField.key]: string;
  [ResultField.header]?: string;
  [ResultField.anchor]?: string;
  [ResultField.display]: Word[][];
}

export interface CustomMatchedItem {
  [ResultField.type]: ResultType.custom;
  [ResultField.key]: string;
  [ResultField.index]: string;
  [ResultField.display]: Word[][];
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
