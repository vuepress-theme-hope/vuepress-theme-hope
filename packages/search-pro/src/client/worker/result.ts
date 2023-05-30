import {
  type MatchInfo,
  type SearchIndex,
  getStoredFields,
  search,
} from "slimsearch";
import { entries } from "vuepress-shared/client";

import { getMatchedContent } from "./matchContent.js";
import { getSearchOptions } from "./utils.js";
import {
  type CustomFieldIndexItem,
  type HeadingIndexItem,
  type IndexItem,
  type PageIndexItem,
  type TextIndexItem,
} from "../../shared/index.js";
import {
  type MatchedItem,
  type SearchOptions,
  type SearchResult,
  type Word,
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
    const isText = id.includes("/");
    const isHeading = !isText && id.includes("#");
    const isCustomField = id.includes("@");
    const [key, info] = id.split(/[#@]/);

    const { contents } = (resultMap[key] ??= {
      title: "",
      contents: [],
    });

    if (isHeading) {
      contents.push([
        {
          type: "heading",
          key: key,
          anchor: (<HeadingIndexItem>result).a,
          display: terms
            .map((term) =>
              getMatchedContent((<HeadingIndexItem>result).h, term)
            )
            .filter((item): item is Word[] => item !== null),
        },
        score,
      ]);
    }
    // TextIndexItem
    else if (isText) {
      const [headingIndex] = info.split("/");

      const { h: heading = "", a: anchor = "" } =
        (getStoredFields(localeIndex, `${key}#${headingIndex}`) as unknown as
          | HeadingIndexItem
          | undefined) || {};

      contents.push([
        {
          type: "text",
          key: key,
          header: heading,
          anchor: anchor,
          display: terms
            .map((term) => getMatchedContent((<TextIndexItem>result).t, term))
            .filter((item): item is Word[] => item !== null),
        },
        score,
      ]);
    } else if (isCustomField) {
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
    }
    // PageIndexItem
    else {
      contents.push([
        {
          type: "title",
          key: key,
          display: terms
            .map((term) => getMatchedContent((<PageIndexItem>result).h, term))
            .filter((item): item is Word[] => item !== null),
        },
        score,
      ]);
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
