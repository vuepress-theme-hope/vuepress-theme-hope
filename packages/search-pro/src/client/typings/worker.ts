import type { SearchOptions as _SearchOptions } from "slimsearch";

export type SearchOptions = Omit<
  _SearchOptions,
  // these are handled internally
  "fields"
>;

export interface MessageData {
  /**
   * @default "all"
   */
  type?: "search" | "suggest" | "all";
  query: string;
  locale: string;
  options?: SearchOptions;
}
