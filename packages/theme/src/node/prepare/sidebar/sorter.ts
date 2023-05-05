import { isArray, isFunction, isString, keys } from "vuepress-shared/node";

import {
  type SidebarInfo,
  type SidebarSorter,
  type SidebarSorterFunction,
} from "../../../shared/index.js";

export const sidebarReadmeSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo
): number => {
  if (infoA.type === "file" && infoA.filename.toLowerCase() === "readme.md")
    return -1;

  if (infoB.type === "file" && infoB.filename.toLowerCase() === "readme.md")
    return 1;

  return 0;
};

export const sidebarOrderSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo
): number => {
  // itemA order is absent
  if (infoA.order === null) {
    // both item do not have orders
    if (infoB.order === null) return 0;

    // itemA order is absent while itemB order is present
    return infoB.order;
  }

  // itemA order is present while itemB order is absent
  if (infoB.order === null) return -infoA.order;

  // now we are sure both order exist

  // itemA order is positive
  if (infoA.order > 0) {
    // both order are negative
    if (infoB.order > 0) return infoA.order - infoB.order;

    // infoA.order is positive while infoB.order is negative
    return -1;
  }

  // both order are negative
  if (infoB.order < 0) return infoA.order - infoB.order;

  // infoA.order is negative while infoB.order is positive
  return 1;
};

export const sidebarDateSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo
): number => {
  if (infoA.frontmatter?.date instanceof Date) {
    if (infoB.frontmatter?.date instanceof Date)
      return (
        infoA.frontmatter?.date.getTime() - infoB.frontmatter.date.getTime()
      );

    return -1;
  }

  if (infoB.frontmatter?.date instanceof Date) return 1;

  return 0;
};

export const sidebarDateDescSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo
): number => {
  if (infoA.frontmatter?.date instanceof Date) {
    if (infoB.frontmatter?.date instanceof Date)
      return (
        infoB.frontmatter.date.getTime() - infoA.frontmatter.date.getTime()
      );

    return -1;
  }

  if (infoB.frontmatter?.date instanceof Date) return 1;

  return 0;
};

const getFilename = (info: SidebarInfo): string =>
  info.type === "file" ? info.filename.replace(/\.md$/, "") : info.dirname;

export const sidebarFilenameSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo
): number => {
  const result = getFilename(infoA).localeCompare(
    getFilename(infoB),
    undefined,
    {
      numeric: true,
      sensitivity: "accent",
    }
  );

  if (result !== 0) return result;

  if (infoA.type === "file" && infoB.type === "dir") return -1;
  if (infoA.type === "dir" && infoB.type === "file") return 1;

  return 0;
};

export const sidebarTitleSorter = (
  infoA: SidebarInfo,
  infoB: SidebarInfo
): number =>
  infoA.title.localeCompare(infoB.title, undefined, {
    numeric: true,
  });

const sortKeyMap: Record<string, SidebarSorterFunction> = {
  readme: sidebarReadmeSorter,
  order: sidebarOrderSorter,
  date: sidebarDateSorter,
  "date-desc": sidebarDateDescSorter,
  filename: sidebarFilenameSorter,
  title: sidebarTitleSorter,
};

const availableKeywords = keys(sortKeyMap);

/** @private */
export const getSidebarSorter = (
  sorter?: SidebarSorter
): SidebarSorterFunction[] => {
  if (isString(sorter) && availableKeywords.includes(sorter))
    return [sortKeyMap[sorter]];

  if (isFunction(sorter)) return [sorter];

  if (isArray(sorter)) {
    const result = sorter
      .map((item) => (isString(item) ? sortKeyMap[item] : item))
      .filter((item) => isFunction(item));

    if (result.length) return result;
  }

  return [
    sidebarReadmeSorter,
    sidebarOrderSorter,
    sidebarTitleSorter,
    sidebarFilenameSorter,
  ];
};
