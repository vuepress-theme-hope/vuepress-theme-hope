import { getStructure } from "./structure.js";
import { getTitle } from "./title.js";

import type { Page } from "@vuepress/core";
import type {
  HopeThemeNormalPageFrontmatter,
  HopeThemePageData,
  HopeThemeSidebarDirInfo,
  HopeThemeSidebarFileInfo,
  HopeThemeSidebarInfo,
  HopeThemeSidebarSorterFunction,
} from "../../../shared/index.js";
import type { StructureInfo } from "./structure.js";

export interface FileInfo {
  type: "file";
  filename: string;
  path: string;
}

export interface DirInfo {
  type: "dir";
  dirname: string;
  path: string;
  items: (DirInfo | FileInfo)[];
}

export interface HopeThemeSidebarInfoOptions {
  pages: Page[];
  sorters: HopeThemeSidebarSorterFunction[];
  scope: string;
}

const getChildrenInfo = (
  { scope, pages, sorters }: HopeThemeSidebarInfoOptions,
  children: StructureInfo[]
): HopeThemeSidebarInfo[] =>
  children
    .map((item) => getInfoFromStructure({ pages, scope, sorters }, item))
    .filter((item): item is HopeThemeSidebarInfo => item !== null)
    // sort items
    .sort((infoA, infoB) => {
      for (let i = 0; i < sorters.length; i++) {
        const result = sorters[i](infoA, infoB);

        if (result !== 0) return result;
      }

      return 0;
    });

const getInfoFromStructure = (
  { scope, pages, sorters }: HopeThemeSidebarInfoOptions,
  info: StructureInfo
): HopeThemeSidebarInfo | null => {
  // handle file
  if (info.type === "file") {
    const page = <Page<HopeThemePageData, HopeThemeNormalPageFrontmatter>>(
      pages.find(
        ({ filePathRelative }) => filePathRelative === `${scope}${info.path}`
      )!
    );

    if (page.frontmatter.index === false) return null;

    const fileInfo: HopeThemeSidebarFileInfo = {
      type: "file",
      filename: info.filename,

      title: page.frontmatter.shortTitle || page.title,
      order: "order" in page.frontmatter ? page.frontmatter.order : null,

      frontmatter: page.frontmatter,
      pageData: page.data,
    };

    return fileInfo;
  }

  // handle dir

  // performance improvements
  const relatedPages = pages.filter(({ filePathRelative }) =>
    filePathRelative?.startsWith(`${scope}${info.path}/`)
  );
  const READMEFile = info.children.find(
    (info) =>
      info.type === "file" && info.filename.toLowerCase() === "readme.md"
  );

  if (READMEFile) {
    const readmePage = <
      Page<HopeThemePageData, HopeThemeNormalPageFrontmatter>
    >relatedPages.find(
      ({ filePathRelative }) =>
        filePathRelative === `${scope}${READMEFile.path}`
    )!;

    // get dir information
    const dirOptions = readmePage.frontmatter.dir;

    const title =
      dirOptions?.text || readmePage.frontmatter.shortTitle || readmePage.title;
    const icon = dirOptions?.icon || readmePage.frontmatter.icon;
    const collapsible =
      dirOptions && "collapsible" in dirOptions ? dirOptions.collapsible : true;

    if (dirOptions?.index === false) return null;

    const dirInfo: HopeThemeSidebarDirInfo = {
      type: "dir",
      dirname: info.dirname,
      children: getChildrenInfo(
        { pages: relatedPages, scope, sorters },
        dirOptions?.link
          ? // filter README.md
            info.children.filter(
              (item) =>
                item.type !== "file" ||
                item.filename.toLowerCase() !== "readme.md"
            )
          : info.children
      ),

      title,
      order: dirOptions?.order || null,
      // group information
      groupInfo: {
        ...(collapsible ? { collapsible } : {}),
        ...(icon ? { icon } : {}),
        ...(dirOptions?.link ? { link: readmePage.path } : {}),
      },

      frontmatter: readmePage.frontmatter,
      pageData: readmePage.data,
    };

    return dirInfo;
  }

  const dirInfo: HopeThemeSidebarDirInfo = {
    type: "dir",
    dirname: info.dirname,
    children: getChildrenInfo(
      { pages: relatedPages, scope, sorters },
      info.children
    ),

    title: getTitle(info.dirname),
    order: null,

    // generate information
    // group information
    groupInfo: {
      collapsible: true,
    },

    frontmatter: null,
    pageData: null,
  };

  return dirInfo;
};

export const getSidebarInfo = ({
  pages,
  sorters,
  scope,
}: HopeThemeSidebarInfoOptions): // base = ""
HopeThemeSidebarInfo[] =>
  getStructure(pages, scope)
    .map((info) => getInfoFromStructure({ scope, pages, sorters }, info))
    .filter((item): item is HopeThemeSidebarInfo => item !== null)
    // sort items
    .sort((infoA, infoB) => {
      for (let i = 0; i < sorters.length; i++) {
        const result = sorters[i](infoA, infoB);

        if (result !== 0) return result;
      }

      return 0;
    });
