import { startsWith } from "@vuepress/helper";
import type { App, Page } from "vuepress/core";
import { path } from "vuepress/utils";

import type { SidebarSorterFunction } from "../../../shared/index.js";

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

export interface ThemeSidebarInfoOptions {
  app: App;
  sorters: SidebarSorterFunction[];
  nestingDepth?: number;
}

/**
 * @private
 */
export const getStructureInfo = (
  pages: Page[],
  scope: string,
): StructureInfo[] => {
  const relatedPages = pages.filter(
    ({ filePathRelative, pathLocale }) =>
      // Generated from file and inside current scope
      startsWith(filePathRelative, scope) &&
      // Filter other locales in root dir
      (scope !== "" || pathLocale === "/"),
  );

  const sortedPages = relatedPages
    // Sort pages
    .sort(
      (
        { filePathRelative: filePathRelative1 },
        { filePathRelative: filePathRelative2 },
      ) =>
        filePathRelative1!.localeCompare(filePathRelative2!, undefined, {
          numeric: true,
          sensitivity: "accent",
        }),
    );

  const structure: StructureInfo[] = [];

  sortedPages.forEach((page) => {
    const relativePath = path.relative(scope, page.filePathRelative!);
    const filename = path.basename(relativePath);

    let currentDir = structure;
    const levels = relativePath.split("/");

    levels.forEach((level, index) => {
      // Already gets filename
      if (index === levels.length - 1) {
        currentDir.push({ type: "file", filename, path: relativePath });
      }
      // Still generating dir
      else {
        const result = currentDir.find<DirInfo>(
          (item): item is DirInfo =>
            item.type === "dir" && item.dirname === level,
        );

        if (result) {
          currentDir = result.children;
        }
        // We shall create this dir
        else {
          const dirInfo: DirInfo = {
            type: "dir",
            dirname: level,
            path: levels.slice(0, index + 1).join("/"),
            children: [],
          };

          currentDir.push(dirInfo);

          currentDir = dirInfo.children;
        }
      }
    });
  });

  return structure;
};
