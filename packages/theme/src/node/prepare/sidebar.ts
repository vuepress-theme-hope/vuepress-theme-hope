import { removeLeadingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";
import { logger } from "../utils";

import type { App, Page } from "@vuepress/core";
import type {
  HopeThemeConfig,
  HopeThemeNormalPageFrontmatter,
  HopeThemeSidebarArrayConfig,
  HopeThemeSidebarConfig,
  HopeThemeSidebarGroupItem,
} from "../../shared";

interface FileInfo {
  type: "file";
  path: string;
  title: string;
  order: number | null;
}

interface DirInfo {
  type: "dir";
  info: {
    text: string;
    icon?: string;
    collapsable?: boolean;
    link?: string;
  };
  order: number | null;
  children: Info[];
}

type Info = FileInfo | DirInfo;

export const orderSort = (
  orderA: number | null,
  orderB: number | null
): number => {
  // itemA order is absent
  if (orderA === null) {
    // both item do not have orders
    if (orderB === null)
      // compare title
      return 0;

    // itemA order is absent while itemB order is present
    return orderB;
  }

  // itemA order is present while itemB order is absent
  if (orderB === null) return -orderA;

  // now we are sure both order exisit

  // itemA order is positive
  if (orderA > 0) {
    // both order are negative
    if (orderB > 0) return orderA - orderB;

    // orderA is positive while orderB is negative
    return -1;
  }

  // both order are negative
  if (orderB < 0) return orderA - orderB;

  // orderA is negative while orderB is positive
  return 1;
};

const getInfo = (app: App, rootDir: string, base = ""): Info[] => {
  const dir = `${rootDir}${base}`;

  return (
    (
      app.pages
        .filter(
          ({ filePathRelative, pathLocale }) =>
            // generated from file
            filePathRelative &&
            // inside dir
            filePathRelative.startsWith(dir) &&
            // filter only currect level
            /^[^/]*(?:\/README.md)?$/.test(
              filePathRelative.slice(dir.length)
            ) &&
            // scanning root dir
            (dir === ""
              ? // filter other locales
                pathLocale === "/"
              : true)
        )
        .map(
          (
            page: Page<Record<never, never>, HopeThemeNormalPageFrontmatter>
          ) => {
            const filename = path.relative(dir, page.filePathRelative!);

            // continue to read nest dir
            if (filename?.endsWith("/README.md")) {
              const filePath = path.relative(rootDir, page.filePathRelative!);
              const base = filePath.replace(/README\.md$/, "");
              const dirname = filename.replace(/README\.md$/, "");

              // get result
              const result = getInfo(app, rootDir, base);

              // get dir information
              const dirInfo = page.frontmatter.dir;

              return dirInfo?.index !== false
                ? {
                    type: "dir",
                    order: dirInfo?.order || null,
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
                  title: page.title,
                  order:
                    "order" in page.frontmatter ? page.frontmatter.order : null,
                }
              : null;
          }
        )
        // dir without README.md should be dropped here
        .filter((item) => item !== null) as Info[]
    )
      // sort items
      .sort((itemA: Info, itemB: Info) => {
        // check README.md, it should be first one
        if (itemA.type === "file" && itemA.path === "README.md") return -1;
        if (itemB.type === "file" && itemB.path === "README.md") return 1;

        const sortResult = orderSort(itemA.order, itemB.order);

        if (sortResult === 0)
          // compare title
          return (
            itemA.type === "file" ? itemA.title : itemA.info.text
          ).localeCompare(
            itemB.type === "file" ? itemB.title : itemB.info.text
          );

        return sortResult;
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
  infos: Info[]
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
  themeConfig: HopeThemeConfig
): HopeThemeSidebarConfig => {
  const generatePaths: string[] = [];

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
      getSidebarItems(getInfo(app, removeLeadingSlash(path))),
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
  themeConfig: HopeThemeConfig
): Promise<void> => {
  const sidebarData = getSidebarData(app, themeConfig);

  await app.writeTemp(
    "theme-hope/sidebar.js",
    `export const sidebarData = ${JSON.stringify(sidebarData)}`
  );
};
