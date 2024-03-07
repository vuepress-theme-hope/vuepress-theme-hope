import type { SearchOptions } from "slimsearch";

import type { IndexItem } from "../../shared/index.js";

export type WorkerSearchOptions = Omit<
  SearchOptions<string, IndexItem>,
  // These are handled internally
  | "fields"
  // These can not pass to worker
  | "filter"
  | "boostDocument"
  | "tokenize"
  | "processTerm"
>;

export interface MessageData {
  /**
   * @default "all"
   */
  type?: "search" | "suggest" | "all";
  query: string;
  locale: string;
  options?: WorkerSearchOptions;
  id: number;
}
