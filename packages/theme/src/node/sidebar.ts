import { removeLeadingSlash } from "@vuepress/shared";
import { path } from "@vuepress/utils";
import { logger } from "./utils";

import type { App } from "@vuepress/core";
import type {
  HopeThemeConfig,
  HopeThemeSidebarArrayConfig,
  HopeThemeSidebarConfig,
  HopeThemeSidebarGroupItem,
} from "../shared";

interface FileInfo {
  type: "file";
  path: string;
  title: string;
  index: boolean | number | null;
}

interface DirInfo {
  type: "dir";
  info: {
    text: string;
    icon?: string;
    collapsable?: boolean;
    link?: string;
  };
  index: boolean | number | null;
  children: Info[];
}

type Info = FileInfo | DirInfo;

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
            filePathRelative
              .slice(dir.length)
              .match(/^[^/]*(?:\/README.md)?$/) &&
            // scanning root dir
            (dir === ""
              ? // filter other locales
                pathLocale === "/"
              : true)
        )
        .map((page) => {
          const filename = path.relative(
            dir,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            page.filePathRelative!
          );

          // continue to read nest dir
          if (filename?.endsWith("/README.md")) {
            const filePath = path.relative(
              rootDir,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              page.filePathRelative!
            );
            const base = filePath.replace(/README\.md$/, "");
            const dirname = filename.replace(/README\.md$/, "");

            // get result
            const result = getInfo(app, rootDir, base);

            // get dir information
            const dirInfo = (page.frontmatter.dir || {}) as {
              text?: string;
              icon?: string;
              collapsable?: boolean;
              link?: boolean;
              index?: number | boolean;
            };

            return dirInfo.index !== false
              ? {
                  type: "dir",
                  // generate information
                  info: {
                    text: dirInfo.text || page.title,
                    icon:
                      dirInfo.icon ||
                      (page.frontmatter.icon as string | undefined),
                    collapsable:
                      "collapsable" in dirInfo ? dirInfo.collapsable : true,
                    ...(dirInfo.link ? { link: page.path } : {}),
                    prefix: dirname,
                  },
                  index: dirInfo.index || true,
                  children: dirInfo.link
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
                index:
                  "index" in page.frontmatter
                    ? (page.frontmatter.index as boolean | number)
                    : null,
              }
            : null;
        })
        // dir without README.md should be dropped here
        .filter((item) => item !== null) as Info[]
    )
      // sort items
      .sort((itemA: Info, itemB: Info) => {
        // check README.md, it should be first one
        if (itemA.type === "file" && itemA.path === "README.md") return -1;
        if (itemB.type === "file" && itemB.path === "README.md") return 1;

        if (itemA.index) {
          // both item as valid index
          if (itemB.index) return Number(itemA.index) - Number(itemB.index);

          // itemB do not have index
          return -1;
        }
        // itemA do not have index
        else if (itemB.index) return 1;

        // compare title
        return (
          itemA.type === "file" ? itemA.title : itemA.info.text
        ).localeCompare(itemB.type === "file" ? itemB.title : itemB.info.text);
      })
  );
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

const getGeneratePaths = (
  sidebarConfig: HopeThemeSidebarArrayConfig,
  prefix = ""
): string[] => {
  const result: string[] = [];

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
