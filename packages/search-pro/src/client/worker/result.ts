import {
  type MatchInfo,
  type SearchIndex,
  getStoredFields,
  search,
} from "slimsearch";
import { entries, keys } from "vuepress-shared/client";

import { getMatchedContent } from "./matchContent.js";
import { IndexField, type IndexItem } from "../../shared/index.js";
import {
  type MatchedItem,
  type SearchOptions,
  type SearchResult,
} from "../typings/index.js";

export interface MiniSearchResult extends IndexItem {
  terms: string[];
  score: number;
  match: MatchInfo;
}

export const getResults = (
  query: string,
  localeIndex: SearchIndex<IndexItem>,
  miniSearchOptions: SearchOptions = {}
): SearchResult[] => {
  const suggestions: Record<
    string,
    { title: string; contents: (MatchedItem & { score: number })[] }
  > = {};

  const results = search(localeIndex, query, {
    fuzzy: 0.2,
    prefix: true,
    boost: { header: 4, text: 2, title: 1 },
    ...miniSearchOptions,
  }) as unknown as MiniSearchResult[];

  results.forEach((result) => {
    const { id, terms, score } = result;
    const isPage = id.includes("#");
    const key = id.split("#")[0];

    if (!suggestions[key]) suggestions[key] = { title: "", contents: [] };

    // set title info
    if (isPage) suggestions[key].title = result[IndexField.heading];

    const { contents } = suggestions[key];

    const collectMatched = (target: string): void => {
      const headerContent = getMatchedContent(
        result[IndexField.heading],
        target
      );

      if (headerContent)
        contents.push({
          type: isPage ? "title" : "heading",
          id: key,
          display: headerContent,
          score,
        });

      if (IndexField.text in result)
        for (const text of result[IndexField.text]) {
          const matchedContent = getMatchedContent(text, target);

          if (matchedContent)
            contents.push({
              type: "content",
              header: result[IndexField.heading],
              id: key,
              display: matchedContent,
              score,
            });
        }

      if (IndexField.customFields in result)
        entries(result[IndexField.customFields]).forEach(
          ([index, customFields]) => {
            customFields.forEach((customField) => {
              const customFieldContent = getMatchedContent(customField, target);

              if (customFieldContent)
                contents.push({
                  type: "custom",
                  id,
                  index,
                  display: customFieldContent,
                  score,
                });
            });
          }
        );
    };

    terms.forEach((term) => {
      collectMatched(term);
    });
  });

  return keys(suggestions)
    .sort(
      (idA, idB) =>
        suggestions[idB].contents.reduce(
          (total, { score }) => total + score,
          0
        ) -
        suggestions[idA].contents.reduce((total, { score }) => total + score, 0)
    )
    .map((id) => {
      const item = suggestions[id];

      // search to get title
      if (!item.title) {
        const pageIndex = getStoredFields(localeIndex, id);

        if (pageIndex) item.title = <string>pageIndex[IndexField.heading];
      }

      return item;
    });
};
