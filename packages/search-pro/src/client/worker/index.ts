import { loadJSONIndex } from "slimsearch";

import database from "@temp/search-pro/index";

import { getResults } from "./result.js";
import { IndexField, type IndexItem } from "../../shared/index.js";
import { type MessageData } from "../typings/index.js";

self.onmessage = async ({
  data: { query, locale, options },
}: MessageEvent<MessageData>): Promise<void> => {
  const { default: localeIndex } = await database[locale]();

  const searchLocaleIndex = loadJSONIndex<IndexItem, string>(localeIndex, {
    fields: [IndexField.heading, IndexField.text, IndexField.customFields],
    storeFields: [IndexField.heading, IndexField.text, IndexField.customFields],
  });

  self.postMessage(getResults(query, searchLocaleIndex, options));
};
