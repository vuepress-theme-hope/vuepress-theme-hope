import { type SearchOptions } from "minisearch";

export type MiniSearchOptions = Omit<
  SearchOptions,
  // these are handled internally
  "fields"
>;

export interface MessageData {
  query: string;
  routeLocale: string;
  options: MiniSearchOptions;
}
