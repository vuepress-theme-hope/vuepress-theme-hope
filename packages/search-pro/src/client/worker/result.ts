import MiniSearch, { type MatchInfo } from "minisearch";
import { entries, keys } from "vuepress-shared/client";

import { getMatchedContent } from "./matchContent.js";
import {
  type PageIndex,
  type SearchIndex,
  type SectionIndex,
} from "../../shared/index.js";
import { type MatchedItem, type Result } from "../typings/index.js";

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
  queryString: string,
  localeIndex: MiniSearch<SearchIndex>
): Result[] => {
  const suggestions: Record<
    string,
    { title: string; contents: (MatchedItem & { score: number })[] }
  > = {};

  const results = localeIndex.search(queryString, {
    fuzzy: 0.2,
    prefix: true,
    boost: { header: 4, text: 2, title: 1 },
  }) as unknown as (MiniSearchPageResult | MiniSearchSectionResult)[];

  results.forEach((result) => {
    const { title, id, score } = result;

    const key = id.split("#")[0];

    if (!suggestions[key]) suggestions[key] = { title, contents: [] };

    const { contents } = suggestions[key];

    const titleContent = getMatchedContent(result.title, queryString);

    if (titleContent)
      contents.push({
        type: "title",
        id,
        display: titleContent,
        score,
      });

    if ("header" in result) {
      const headerContent = getMatchedContent(result.header, queryString);

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
        const matchedContent = getMatchedContent(text, queryString);

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
          const customFieldContent = getMatchedContent(
            customField,
            queryString
          );

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
