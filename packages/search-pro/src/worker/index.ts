import MiniSearch from "minisearch";
import { entries, fromEntries } from "vuepress-shared/client";

import { type MessageData } from "../client/typings/index.js";
import { getResults } from "../client/worker/result.js";
import { type SearchIndex, type SearchIndexStore } from "../shared/index.js";

declare const SEARCH_PRO_INDEX: string;

const searchIndex: SearchIndexStore = fromEntries(
  entries(<Record<string, string>>JSON.parse(SEARCH_PRO_INDEX)).map(
    ([localePath, index]) => [
      localePath,
      MiniSearch.loadJSON<SearchIndex>(index, {
        fields: ["title", "header", "text", "customFields"],
        storeFields: ["title", "header", "text", "customFields"],
      }),
    ]
  )
);

self.onmessage = ({
  data: { query, locale, options },
}: MessageEvent<MessageData>): void => {
  self.postMessage(getResults(query, searchIndex[locale], options));
};
