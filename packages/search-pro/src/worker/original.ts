import { getResults } from "../client/utils/index.js";
import { type SearchIndex } from "../shared/index.js";

declare const SEARCH_PRO_INDEX: string;

const searchIndex: SearchIndex = <SearchIndex>JSON.parse(SEARCH_PRO_INDEX);

self.onmessage = ({
  data,
}: MessageEvent<{ query: string; routeLocale: string }>): void => {
  self.postMessage(getResults(data.query, searchIndex[data.routeLocale]));
};
