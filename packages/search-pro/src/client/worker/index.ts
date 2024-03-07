import { loadJSONIndex } from "slimsearch";

import database from "@temp/search-pro/index.js";

import { getResults } from "./result.js";
import { getSuggestions } from "./suggestion.js";
import type { IndexItem } from "../../shared/index.js";
import type { MessageData } from "../typings/index.js";

self.onmessage = async ({
  data: { type = "all", query, locale, options, id },
}: MessageEvent<MessageData>): Promise<void> => {
  const { default: localeIndex } = await database[locale ?? "/"]();

  const searchLocaleIndex = loadJSONIndex<string, IndexItem, IndexItem>(
    localeIndex,
    {
      fields: [/** Heading */ "h", /** Text */ "t", /** CustomFields */ "c"],
      storeFields: [
        /** Heading */ "h",
        /** Text */ "t",
        /** CustomFields */ "c",
      ],
    },
  );

  if (type === "suggest")
    self.postMessage([
      type,
      id,
      getSuggestions(query, searchLocaleIndex, options),
    ]);
  else if (type === "search")
    self.postMessage([type, id, getResults(query, searchLocaleIndex, options)]);
  else
    self.postMessage({
      suggestions: [
        type,
        id,
        getSuggestions(query, searchLocaleIndex, options),
      ],
      results: [type, id, getResults(query, searchLocaleIndex, options)],
    });
};
