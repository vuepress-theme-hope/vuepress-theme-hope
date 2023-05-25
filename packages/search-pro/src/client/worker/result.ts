import { type MatchInfo, type SearchIndex, search } from "slimsearch";
import { entries, keys } from "vuepress-shared/client";

import { getMatchedContent } from "./matchContent.js";
import {
  type IndexItem,
  type PageIndex,
  type SectionIndex,
} from "../../shared/index.js";
import {
  type MatchedItem,
  type SearchOptions,
  type SearchResult,
} from "../typings/index.js";

export interface MiniSearchPageResult extends PageIndex {
  terms: string[];
  score: number;
  match: MatchInfo;
}

export interface MiniSearchSectionResult extends SectionIndex {
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
  }) as unknown as (MiniSearchPageResult | MiniSearchSectionResult)[];

  results.forEach((result) => {
    const { title, id, terms, score } = result;
    const key = id.split("#")[0];

    if (!suggestions[key]) suggestions[key] = { title, contents: [] };

    const { contents } = suggestions[key];

    const collectMatched = (target: string): void => {
      const titleContent = getMatchedContent(result.title, target);

      if (titleContent)
        contents.push({
          type: "title",
          id,
          display: titleContent,
          score,
        });

      if ("header" in result) {
        const headerContent = getMatchedContent(result.header, target);

        if (headerContent)
          contents.push({
            type: "heading",
            id: id.split("#")[0],
            display: headerContent,
            score,
          });
      }

      if ("text" in result)
        for (const text of result.text) {
          const matchedContent = getMatchedContent(text, target);

          if (matchedContent)
            contents.push({
              type: "content",
              header: "header" in result ? result.header : result.title,
              id: id.split("#")[0],
              display: matchedContent,
              score,
            });
        }

      if ("customFields" in result)
        entries(result.customFields).forEach(([index, customFields]) => {
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
        });
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
    .map((id) => suggestions[id]);
};
