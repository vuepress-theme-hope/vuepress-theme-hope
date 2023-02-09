import { entries, keys } from "vuepress-shared/client";

import { type Word, getMatchedContent } from "./matchContent.js";
import { type LocaleIndex } from "../../shared/index.js";

export interface TitleMatchedItem {
  type: "title";
  display: Word[];
  path: string;
}

export interface HeadingMatchedItem {
  type: "heading";
  display: Word[];
  path: string;
}

export interface CustomMatchedItem {
  type: "custom";
  path: string;
  index: string;
  display: Word[];
}

export interface ContentMatchedItem {
  type: "content";
  path: string;
  header: string;
  display: Word[];
}

export type MatchedItem =
  | TitleMatchedItem
  | HeadingMatchedItem
  | ContentMatchedItem
  | CustomMatchedItem;

export interface Result {
  title: string;
  contents: MatchedItem[];
}

const getResultsWeight = (matchedItem: MatchedItem[]): number =>
  matchedItem.reduce<number>(
    (current, { type }) =>
      current +
      (type === "title"
        ? 50
        : type === "heading"
        ? 20
        : type === "custom"
        ? 10
        : 1),
    0
  );

export const getResults = (
  queryString: string,
  localeIndex: LocaleIndex
): Result[] => {
  const suggestions = <Record<string, MatchedItem[]>>{};

  for (const [path, pageIndex] of entries(localeIndex)) {
    const parentPageTitle =
      localeIndex[path.replace(/\/[^\\]*$/, "")]?.title || "";
    const title = `${parentPageTitle ? `${parentPageTitle} > ` : ""}${
      pageIndex.title
    }`;

    const titleContent = getMatchedContent(pageIndex.title, queryString);

    if (titleContent)
      suggestions[title] = [
        ...(suggestions[title] || []),
        {
          type: "title",
          path,
          display: titleContent,
        },
      ];

    if (pageIndex.customFields)
      entries(pageIndex.customFields).forEach(([index, customFields]) => {
        customFields.forEach((customField) => {
          const customFieldContent = getMatchedContent(
            customField,
            queryString
          );

          if (customFieldContent)
            suggestions[title] = [
              ...(suggestions[title] || []),
              {
                type: "custom",
                path,
                index,
                display: customFieldContent,
              },
            ];
        });
      });

    for (const headerIndex of pageIndex.contents) {
      const headerContent = getMatchedContent(headerIndex.header, queryString);

      if (headerContent)
        suggestions[title] = [
          ...(suggestions[title] || []),
          {
            type: "heading",
            path: path + (headerIndex.slug ? `#${headerIndex.slug}` : ""),
            display: headerContent,
          },
        ];

      for (const content of headerIndex.contents) {
        const matchedContent = getMatchedContent(content, queryString);

        if (matchedContent)
          suggestions[title] = [
            ...(suggestions[title] || []),
            {
              type: "content",
              header: headerIndex.header,
              path: path + (headerIndex.slug ? `#${headerIndex.slug}` : ""),
              display: matchedContent,
            },
          ];
      }
    }
  }

  return keys(suggestions)
    .sort(
      (titleA, titleB) =>
        getResultsWeight(suggestions[titleA]) -
        getResultsWeight(suggestions[titleB])
    )
    .map((title) => ({ title, contents: suggestions[title] }));
};
