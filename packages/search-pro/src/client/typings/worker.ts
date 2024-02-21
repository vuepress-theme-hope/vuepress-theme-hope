import type { SearchOptions as _SearchOptions } from "slimsearch";

export interface SearchOptions<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ID = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Index extends Record<string, any> = Record<never, never>,
> extends Omit<
    _SearchOptions<ID, Index>,
    // These are handled internally
    "fields"
  > {
  locales?: Record<
    string,
    Omit<
      _SearchOptions<ID, Index>,
      // These are handled internally
      "fields"
    >
  >;
}

export interface MessageData {
  /**
   * @default "all"
   */
  type?: "search" | "suggest" | "all";
  query: string;
  locale: string;
  options?: SearchOptions;
}
