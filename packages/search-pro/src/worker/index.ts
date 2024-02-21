import { entries, fromEntries } from "@vuepress/helper/client";
import type { IndexObject } from "slimsearch";
import { loadIndex } from "slimsearch";

import type { MessageData } from "../client/typings/index.js";
import { getResults } from "../client/worker/result.js";
import { getSuggestions } from "../client/worker/suggestion.js";
import type { IndexItem, SearchIndexStore } from "../shared/index.js";

declare const SEARCH_PRO_INDEX: string;

const searchIndex: SearchIndexStore = fromEntries(
  entries(
    <Record<string, IndexObject<IndexItem>>>JSON.parse(SEARCH_PRO_INDEX),
  ).map(([localePath, index]) => [
    localePath,
    loadIndex<string, IndexItem, IndexItem>(index, {
      fields: [/** Heading */ "h", /** Text */ "t", /** CustomFields */ "c"],
      storeFields: [
        /** Heading */ "h",
        /** Text */ "t",
        /** CustomFields */ "c",
      ],
    }),
  ]),
);

self.onmessage = ({
  data: { type = "all", query, locale, options },
}: MessageEvent<MessageData>): void => {
  if (type === "suggest")
    self.postMessage(getSuggestions(query, searchIndex[locale], options));
  else if (type === "search")
    self.postMessage(getResults(query, searchIndex[locale], options));
  else
    self.postMessage({
      suggestions: getSuggestions(query, searchIndex[locale], options),
      results: getResults(query, searchIndex[locale], options),
    });
};
