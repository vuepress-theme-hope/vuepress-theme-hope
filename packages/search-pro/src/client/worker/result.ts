import {
  type MatchInfo,
  type SearchIndex,
  getStoredFields,
  search,
} from "slimsearch";
import { entries } from "vuepress-shared/client";

import { getMatchedContent } from "./matchContent.js";
import {
  type CustomFieldIndexItem,
  type HeadingIndexItem,
  IndexField,
  type IndexItem,
  type PageIndexItem,
  type TextIndexItem,
} from "../../shared/index.js";
import {
  type MatchedItem,
  ResultField,
  ResultType,
  type SearchOptions,
  type SearchResult,
  type Word,
} from "../typings/index.js";

const CHINESE_CHARACTERS = /[\u4e00-\u9fa5]/g;

export type MiniSearchResult = IndexItem & {
  terms: string[];
  score: number;
  match: MatchInfo;
};

interface Suggestions {
  [key: string]: {
    title: string;
    contents: [result: MatchedItem, score: number][];
  };
}

export const getResults = (
  query: string,
  localeIndex: SearchIndex<IndexItem, string>,
  miniSearchOptions: SearchOptions = {}
): SearchResult[] => {
  const suggestions: Suggestions = {};

  const results = search<IndexItem, string, IndexItem>(localeIndex, query, {
    fuzzy: 0.2,
    prefix: true,
    boost: {
      [IndexField.heading]: 2,
      [IndexField.text]: 1,
      [IndexField.customFields]: 4,
    },
    processTerm: (term) => {
      const chineseCharacters = term.match(CHINESE_CHARACTERS) || [];
      const englishTerm = term.replace(CHINESE_CHARACTERS, "").toLowerCase();

      return englishTerm
        ? [englishTerm, ...chineseCharacters]
        : [...chineseCharacters];
    },
    ...miniSearchOptions,
  });

  results.forEach((result) => {
    const { id, terms, score } = result;
    const isText = id.includes("/");
    const isHeading = !isText && id.includes("#");
    const isCustomField = id.includes("@");
    const [key, info] = id.split(/[#@]/);

    const { contents } = (suggestions[key] ??= {
      title: "",
      contents: [],
    });

    if (isHeading) {
      contents.push([
        {
          [ResultField.type]: ResultType.heading,
          [ResultField.key]: key,
          [ResultField.anchor]: (<HeadingIndexItem>result)[IndexField.anchor],
          [ResultField.display]: terms
            .map((term) =>
              getMatchedContent(
                (<HeadingIndexItem>result)[IndexField.heading],
                term
              )
            )
            .filter((item): item is Word[] => item !== null),
        },
        score,
      ]);
    }
    // TextIndexItem
    else if (isText) {
      const [headingIndex] = info.split("/");

      const {
        [IndexField.heading]: heading = "",
        [IndexField.anchor]: anchor = "",
      } =
        (getStoredFields(localeIndex, `${key}#${headingIndex}`) as unknown as
          | HeadingIndexItem
          | undefined) || {};

      contents.push([
        {
          [ResultField.type]: ResultType.text,
          [ResultField.key]: key,
          [ResultField.header]: heading,
          [ResultField.anchor]: anchor,
          [ResultField.display]: terms
            .map((term) =>
              getMatchedContent((<TextIndexItem>result)[IndexField.text], term)
            )
            .filter((item): item is Word[] => item !== null),
        },
        score,
      ]);
    } else if (isCustomField) {
      contents.push([
        {
          [ResultField.type]: ResultType.custom,
          [ResultField.key]: key,
          [ResultField.index]: info,
          [ResultField.display]: terms
            .map((term) =>
              (<CustomFieldIndexItem>result)[IndexField.customFields].map(
                (field) => getMatchedContent(field, term)
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
          [ResultField.type]: ResultType.title,
          [ResultField.key]: key,
          [ResultField.display]: terms
            .map((term) =>
              getMatchedContent(
                (<PageIndexItem>result)[IndexField.heading],
                term
              )
            )
            .filter((item): item is Word[] => item !== null),
        },
        score,
      ]);
    }
  });

  return entries(suggestions)
    .sort(
      ([, valueA], [, valueB]) =>
        valueB.contents.reduce((total, [, score]) => total + score, 0) -
        valueA.contents.reduce((total, [, score]) => total + score, 0)
    )
    .map(([id, { title, contents }]) => {
      // search to get title
      if (!title) {
        const pageIndex = getStoredFields(localeIndex, id);

        if (pageIndex) title = <string>pageIndex[IndexField.heading];
      }

      return {
        title,
        contents: contents.map(([result]) => result),
      };
    });
};
