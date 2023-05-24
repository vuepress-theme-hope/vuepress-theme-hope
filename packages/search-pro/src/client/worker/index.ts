import MiniSearch from "minisearch";

import database from "@temp/search-pro/index";

import { getResults } from "./result.js";
import { type SearchIndex } from "../../shared/index.js";
import { type MessageData } from "../typings/index.js";

self.onmessage = async ({
  data: { query, routeLocale, options },
}: MessageEvent<MessageData>): Promise<void> => {
  const { default: localeIndex } = await database[routeLocale]();

  const searchLocaleIndex = MiniSearch.loadJSON<SearchIndex>(localeIndex, {
    fields: ["title", "header", "text", "customFields"],
    storeFields: ["title", "header", "text", "customFields"],
  });

  self.postMessage(getResults(query, searchLocaleIndex, options));
};
