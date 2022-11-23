import { path } from "@vuepress/utils";

import type { App, Page } from "@vuepress/core";
import type { HopeThemeSidebarSorterFunction } from "../../../shared/index.js";

export interface FileInfo {
  type: "file";
  filename: string;
  path: string;
}

export interface DirInfo {
  type: "dir";
  dirname: string;
  path: string;
  children: StructureInfo[];
}

export type StructureInfo = DirInfo | FileInfo;

export interface HopeThemeSidebarInfoOptions {
  app: App;
  sorters: HopeThemeSidebarSorterFunction[];
  nestingDepth?: number;
}

export const getStructure = (pages: Page[], scope: string): StructureInfo[] => {
  const relatedPages = pages.filter(
    ({ filePathRelative, pathLocale }) =>
      // generated from file and inside currect scope
      filePathRelative?.startsWith(scope) &&
      // root dir should filter other locales
      (scope !== "" || pathLocale === "/")
  );

  const sortedPages = relatedPages
    // sort pages
    .sort(
      (
        { filePathRelative: filePathRelative1 },
        { filePathRelative: filePathRelative2 }
      ) => filePathRelative1!.localeCompare(filePathRelative2!)
    );

  const structure: StructureInfo[] = [];

  sortedPages.forEach((page) => {
    const relativePath = path.relative(scope, page.filePathRelative!);
    const filename = path.basename(relativePath);

    let currectDir = structure;
    const levels = relativePath.split("/");

    levels.forEach((level, index) => {
      // already gets filename
      if (index === levels.length - 1)
        currectDir.push({ type: "file", filename, path: relativePath });
      // still generateing dir
      else {
        const result = currectDir.find<DirInfo>(
          (item): item is DirInfo =>
            item.type === "dir" && item.dirname === level
        );

        if (result) currectDir = result.children;
        // we shall create this dir
        else {
          const dirInfo: DirInfo = {
            type: "dir",
            dirname: level,
            path: levels.slice(0, index + 1).join("/"),
            children: [],
          };

          currectDir.push(dirInfo);

          currectDir = dirInfo.children;
        }
      }
    });
  });

  return structure;
};
