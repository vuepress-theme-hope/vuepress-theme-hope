import { removeLeadingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";

import { getSorter } from "./sorter.js";
import { logger } from "../../utils.js";

import type { App, Page } from "@vuepress/core";
import type {
  HopeThemeConfig,
  HopeThemeNormalPageFrontmatter,
  HopeThemePageData,
  HopeThemeSidebarArrayConfig,
  HopeThemeSidebarConfig,
  HopeThemeSidebarGroupItem,
  HopeThemeSidebarSorter,
  HopeThemeSidebarInfo,
  HopeThemeSidebarSorterFunction,
} from "../../../shared/index.js";

const getInfo = (
  app: App,
  rootDir: string,
  sidebarSorters: HopeThemeSidebarSorterFunction[],
  base = ""
): HopeThemeSidebarInfo[] => {
  const dir = `${rootDir}${base}`;

  return (
    (
      (<Page<HopeThemePageData, HopeThemeNormalPageFrontmatter>[]>app.pages)
        .filter(
          ({ filePathRelative, pathLocale }) =>
            // generated from file
            filePathRelative &&
            // inside dir
            filePathRelative.startsWith(dir) &&
            // filter only current level
            /^[^/]*(?:\/README.md)?$/.test(
              filePathRelative.slice(dir.length)
            ) &&
            // root dir should filter other locales
            (dir !== "" || pathLocale === "/")
        )
        .map((page) => {
          const filename = path.relative(dir, page.filePathRelative!);

          // continue to read nest dir
          if (filename?.endsWith("/README.md")) {
            const filePath = path.relative(rootDir, page.filePathRelative!);
            const base = filePath.replace(/README\.md$/, "");
            const dirname = filename.replace(/README\.md$/, "");

            // get result
            const result = getInfo(app, rootDir, sidebarSorters, base);

            // get dir information
            const dirInfo = page.frontmatter.dir;

            return dirInfo?.index !== false
              ? {
                  type: "dir",

                  order: dirInfo?.order || null,
                  frontmatter: page.frontmatter,
                  pageData: page.data,

                  // generate information
                  info: {
                    text:
                      dirInfo?.text ||
                      page.frontmatter.shortTitle ||
                      page.title,
                    icon: dirInfo?.icon || page.frontmatter.icon,
                    collapsable:
                      dirInfo && "collapsable" in dirInfo
                        ? dirInfo.collapsable
                        : true,
                    ...(dirInfo?.link ? { link: page.path } : {}),
                    prefix: dirname,
                  },

                  children: dirInfo?.link
                    ? // filter README.md
                      result.filter(
                        (item) =>
                          !(item.type === "file" && item.path === "README.md")
                      )
                    : result,
                }
              : null;
          }

          // it’s a markdown
          return page.frontmatter.index !== false
            ? {
                type: "file",
                path: filename,
                title: page.frontmatter.shortTitle || page.title,
                frontmatter: page.frontmatter,
                order:
                  "order" in page.frontmatter ? page.frontmatter.order : null,
              }
            : null;
        })
        // dir without README.md should be dropped here
        .filter((info) => info !== null) as HopeThemeSidebarInfo[]
    )
      // sort items
      .sort((infoA, infoB) => {
        for (let i = 0; i < sidebarSorters.length; i++) {
          const result = sidebarSorters[i](infoA, infoB);

          if (result !== 0) return result;
        }

        return 0;
      })
  );
};

const getGeneratePaths = (
  sidebarConfig: HopeThemeSidebarArrayConfig,
  prefix = ""
): string[] => {
  const result: string[] = [];

  if (!Array.isArray(sidebarConfig)) {
    logger.error(
      `Expecting array, but getting invalid sidebar config${
        prefix ? ` under ${prefix}` : ""
      } with: ${JSON.stringify(sidebarConfig)}`
    );

    return result;
  }

  sidebarConfig.forEach((item) => {
    // it’s a sidebar group config
    if (typeof item === "object" && "children" in item) {
      const childPrefix = `${prefix}${item.prefix || ""}`;

      // the children needs to be generated
      if (item.children === "structure") result.push(childPrefix);
      else result.push(...getGeneratePaths(item.children, childPrefix));
    }
  });

  return result;
};

const getSidebarItems = (
  infos: HopeThemeSidebarInfo[]
): (HopeThemeSidebarGroupItem | string)[] =>
  infos.map((info) => {
    if (info.type === "file") return info.path;

    return {
      ...info.info,
      children: getSidebarItems(info.children),
    };
  });

export const getSidebarData = (
  app: App,
  themeConfig: HopeThemeConfig,
  sorter?: HopeThemeSidebarSorter
): HopeThemeSidebarConfig => {
  const generatePaths: string[] = [];
  const sidebarSorters = getSorter(sorter);

  // exact generate sidebar paths
  Object.entries(themeConfig.locales).forEach(([localePath, { sidebar }]) => {
    if (Array.isArray(sidebar))
      generatePaths.push(...getGeneratePaths(sidebar));
    else if (typeof sidebar === "object")
      Object.entries(sidebar).forEach(([prefix, config]) => {
        if (config === "structure") generatePaths.push(prefix);
        else if (Array.isArray(config))
          generatePaths.push(
            ...getGeneratePaths(config).map((item) => `${prefix}${item}`)
          );
      });
    else if (sidebar === "structure") generatePaths.push(localePath);
  });

  const sidebarData = Object.fromEntries(
    generatePaths.map((path) => [
      path,
      getSidebarItems(getInfo(app, removeLeadingSlash(path), sidebarSorters)),
    ])
  );

  if (app.env.isDebug)
    logger.info(
      `Sidebar structure data:${JSON.stringify(sidebarData, null, 2)}`
    );

  return sidebarData;
};

export const prepareSidebarData = async (
  app: App,
  themeConfig: HopeThemeConfig,
  sorter?: HopeThemeSidebarSorter
): Promise<void> => {
  const sidebarData = getSidebarData(app, themeConfig, sorter);

  await app.writeTemp(
    "theme-hope/sidebar.js",
    `\
export const sidebarData = ${JSON.stringify(sidebarData)};
`
  );
};
