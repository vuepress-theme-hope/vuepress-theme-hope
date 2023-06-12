import type { MatchInfo, SearchIndex } from "slimsearch";
import { getStoredFields, search } from "slimsearch";
import { entries } from "vuepress-shared/client";

import { getMatchedContent } from "./matchContent.js";
import { getSearchOptions } from "./utils.js";
import type {
  CustomFieldIndexItem,
  IndexItem,
  PageIndexItem,
} from "../../shared/index.js";
import type {
  HeadingMatchedItem,
  MatchedItem,
  SearchOptions,
  SearchResult,
  TitleMatchedItem,
  Word,
} from "../typings/index.js";

export type MiniSearchResult = IndexItem & {
  terms: string[];
  score: number;
  match: MatchInfo;
};

interface ResultMap {
  [key: string]: {
    title: string;
    contents: [result: MatchedItem, score: number][];
  };
}

export const getResults = (
  query: string,
  localeIndex: SearchIndex<IndexItem, string>,
  searchOptions: SearchOptions = {}
): SearchResult[] => {
  const resultMap: ResultMap = {};

  const results = search<IndexItem, string, IndexItem>(
    localeIndex,
    query,
    getSearchOptions({
      boost: {
        [/** heading */ "h"]: 2,
        [/** text */ "t"]: 1,
        [/** customFields */ "c"]: 4,
      },
      ...searchOptions,
    })
  );

  results.forEach((result) => {
    const { id, terms, score } = result;
    const isCustomField = id.includes("@");
    const isSection = id.includes("#");
    const [key, info] = id.split(/[#@]/);

    const { contents } = (resultMap[key] ??= {
      title: "",
      contents: [],
    });

    // CustomFieldIndexItem
    if (isCustomField) {
      contents.push([
        {
          type: "customField",
          key: key,
          index: info,
          display: terms
            .map((term) =>
              (<CustomFieldIndexItem>result).c.map((field) =>
                getMatchedContent(field, term)
              )
            )
            .flat()
            .filter((item): item is Word[] => item !== null),
        },
        score,
      ]);
    } else {
      const headerContent = terms
        .map((term) => getMatchedContent((<PageIndexItem>result).h, term))
        .filter((item): item is Word[] => item !== null);

      if (headerContent.length)
        contents.push([
          <TitleMatchedItem | HeadingMatchedItem>{
            type: isSection ? "heading" : "title",
            key: key,
            ...(isSection && { anchor: info }),
            display: headerContent,
          },
          score,
        ]);

      if (/** text */ "t" in result)
        for (const text of result.t) {
          const matchedContent = terms
            .map((term) => getMatchedContent(text, term))
            .filter((item): item is Word[] => item !== null);

          if (matchedContent.length)
            contents.push([
              {
                type: "text",
                key,
                ...(isSection && { anchor: info }),
                display: matchedContent,
              },
              score,
            ]);
        }
    }
  });

  return entries(resultMap)
    .sort(
      ([, valueA], [, valueB]) =>
        valueB.contents.reduce((total, [, score]) => total + score, 0) -
        valueA.contents.reduce((total, [, score]) => total + score, 0)
    )
    .map(([id, { title, contents }]) => {
      // search to get title
      if (!title) {
        const pageIndex = getStoredFields(
          localeIndex,
          id
        ) as unknown as PageIndexItem;

        if (pageIndex) title = pageIndex.h;
      }

      return {
        title,
        contents: contents.map(([result]) => result),
      };
    });
};
