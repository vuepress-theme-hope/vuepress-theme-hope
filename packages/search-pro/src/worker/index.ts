import { type IndexObject, loadIndex } from "slimsearch";
import { entries, fromEntries } from "vuepress-shared/client";

import { type MessageData } from "../client/typings/index.js";
import { getResults } from "../client/worker/result.js";
import {
  IndexField,
  type IndexItem,
  type SearchIndexStore,
} from "../shared/index.js";

declare const SEARCH_PRO_INDEX: string;

const searchIndex: SearchIndexStore = fromEntries(
  entries(<Record<string, IndexObject>>JSON.parse(SEARCH_PRO_INDEX)).map(
    ([localePath, index]) => [
      localePath,
      loadIndex<IndexItem, string>(index, {
        fields: [IndexField.heading, IndexField.text, IndexField.customFields],
        storeFields: [
          IndexField.heading,
          IndexField.text,
          IndexField.customFields,
        ],
      }),
    ]
  )
);

self.onmessage = ({
  data: { query, locale, options },
}: MessageEvent<MessageData>): void => {
  self.postMessage(getResults(query, searchIndex[locale], options));
};
