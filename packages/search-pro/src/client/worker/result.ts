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

declare const SEARCH_PRO_SORT_STRATEGY: "max" | "total";

export type MiniSearchResult = IndexItem & {
  terms: string[];
  score: number;
  match: MatchInfo;
};

interface PageResult {
  title: string;
  contents: [result: MatchedItem, score: number][];
}

interface ResultMap {
  [key: string]: PageResult;
}

const sortWithTotal = (valueA: PageResult, valueB: PageResult): number =>
  valueB.contents.reduce((total, [, score]) => total + score, 0) -
  valueA.contents.reduce((total, [, score]) => total + score, 0);

const sortWithMax = (valueA: PageResult, valueB: PageResult): number =>
  Math.max(...valueB.contents.map(([, score]) => score)) -
  Math.max(...valueA.contents.map(([, score]) => score));

export const getResults = (
  query: string,
  localeIndex: SearchIndex<IndexItem, string>,
  searchOptions: SearchOptions = {},
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
    }),
  );

  results.forEach((result) => {
    const { id, terms, score } = result;
    const isCustomField = id.includes("@");
    const isSection = id.includes("#");
    const [key, info] = id.split(/[#@]/);

    const displayTerms = terms
      .sort((a, b) => a.length - b.length)
      .filter((item, index) =>
        terms.slice(index + 1).every((term) => !term.includes(item)),
      );

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
          display: displayTerms
            .map((term) =>
              (<CustomFieldIndexItem>result).c.map((field) =>
                getMatchedContent(field, term),
              ),
            )
            .flat()
            .filter((item): item is Word[] => item !== null),
        },
        score,
      ]);
    } else {
      const headerContent = displayTerms
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
          const matchedContent = displayTerms
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
    .sort(([, valueA], [, valueB]) =>
      SEARCH_PRO_SORT_STRATEGY === "total"
        ? sortWithTotal(valueA, valueB)
        : sortWithMax(valueA, valueB),
    )
    .map(([id, { title, contents }]) => {
      // search to get title
      if (!title) {
        const pageIndex = getStoredFields(
          localeIndex,
          id,
        ) as unknown as PageIndexItem;

        if (pageIndex) title = pageIndex.h;
      }

      return {
        title,
        contents: contents.map(([result]) => result),
      };
    });
};
