import { fs, path } from "@vuepress/utils";
import { logger } from "./utils";

import type { App } from "@vuepress/core";
import type {
  HopeThemeConfig,
  HopeThemeSidebarArrayConfig,
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
  const { pages } = app;
  const dirFullPath = app.dir.source(rootDir, base);

  const result = (
    fs
      // reading dirPath
      .readdirSync(dirFullPath)
      .map((filename) => {
        const fileRelativePath = path.join(base, filename);
        const fileFullPath = path.join(dirFullPath, filename);
        const stat = fs.statSync(fileFullPath);

        // continue to read nest dir
        if (stat.isDirectory()) {
          // get result
          const result = getInfo(app, rootDir, fileRelativePath);

          // dir not including README.md
          if (
            !result.some(
              (subDirFilePath) =>
                subDirFilePath.type === "file" &&
                subDirFilePath.path === "README.md"
            )
          ) {
            if (app.env.isDebug)
              logger.warn(
                `README.md not found in ${path.join(rootDir, fileRelativePath)}`
              );

            return null;
          }

          // get page
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const page = pages.find(
            (page) =>
              page.filePathRelative ===
              path.join(rootDir, fileRelativePath, "README.md")
          )!;

          // get dir infomation
          const dirInfo = (page.frontmatter.dir || {}) as {
            text?: string;
            icon?: string;
            collapsable?: boolean;
            link?: boolean;
            index?: number | boolean;
          };

          return {
            type: "dir",
            // generate infomation
            info: {
              text: dirInfo.text || page.title,
              icon:
                dirInfo.icon || (page.frontmatter.icon as string | undefined),
              collapsable:
                "collapsable" in dirInfo ? dirInfo.collapsable : true,
              ...(dirInfo.link ? { link: page.path } : {}),
              prefix: `${filename}/`,
            },
            index:
              "index" in dirInfo ? (dirInfo.index as number | boolean) : null,
            children: dirInfo.link
              ? // filter README.md
                result.filter(
                  (item) => item.type !== "file" || item.path !== "README.md"
                )
              : result,
          };
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const page = pages.find(
          (page) =>
            page.filePathRelative === path.join(rootDir, fileRelativePath)
        )!;

        return {
          type: "file",
          path: filename,
          title: page.title,
          index:
            "index" in page.frontmatter
              ? (page.frontmatter.index as boolean | number)
              : null,
        };
      })
      // dir without README.md and items with `index: false` should be dropped here
      .filter((item) => item !== null && item.index !== false) as Info[]
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

const getGeneratePaths = (
  sidebarConfig: HopeThemeSidebarArrayConfig
): string[] => {
  const result: string[] = [];

  sidebarConfig.forEach((item) => {
    // it's a sidebar group config
    if (typeof item === "object" && "children" in item) {
      // the children needs to be generated
      if (item.children === "structure") result.push(item.prefix);
      else result.push(...getGeneratePaths(item.children));
    }
  });

  return result;
};

export const prepareSidebarData = async (
  app: App,
  themeConfig: HopeThemeConfig
): Promise<void> => {
  const generatePaths: string[] = [];

  // exact generate sidebar paths
  Object.entries(themeConfig.locales).forEach(([, { sidebar }]) => {
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
  });

  const sidebarData: Record<string, (HopeThemeSidebarGroupItem | string)[]> =
    {};

  generatePaths.forEach((path) => {
    sidebarData[path] = getSidebarItems(getInfo(app, path.replace(/^\//, "")));
  });

  await app.writeTemp(
    "theme-hope/sidebar.js",
    `export const sidebarData = ${JSON.stringify(sidebarData)}`
  );
};
