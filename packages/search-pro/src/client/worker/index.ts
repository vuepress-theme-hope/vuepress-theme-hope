import MiniSearch from "minisearch";

import database from "@temp/search-pro/index";

import { getResults } from "./result.js";

self.onmessage = async ({
  data,
}: MessageEvent<{ query: string; routeLocale: string }>): Promise<void> => {
  const { default: localeIndex } = await database[data.routeLocale]();

  self.postMessage(
    getResults(
      data.query,
      MiniSearch.loadJSON(localeIndex, {
        fields: ["title", "header", "text", "customFields"],
        storeFields: ["title", "header", "text", "customFields"],
      })
    )
  );
};
