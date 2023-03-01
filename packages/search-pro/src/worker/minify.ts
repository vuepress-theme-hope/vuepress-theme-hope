import { atou } from "vuepress-shared/client";

import { getResults } from "../client/utils/index.js";
import { type SearchIndex } from "../shared/index.js";

const searchIndex: SearchIndex = <SearchIndex>JSON.parse(
  // @ts-ignore
  atou(SEARCH_PRO_INDEX as string)
);

self.onmessage = ({
  data,
}: MessageEvent<{ query: string; routeLocale: string }>): void => {
  self.postMessage(getResults(data.query, searchIndex[data.routeLocale]));
};
