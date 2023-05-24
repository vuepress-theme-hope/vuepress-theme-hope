import { type SearchOptions as _SearchOptions } from "minisearch";

export type SearchOptions = Omit<
  _SearchOptions,
  // these are handled internally
  "fields"
>;

export interface MessageData {
  query: string;
  locale: string;
  options?: SearchOptions;
}
