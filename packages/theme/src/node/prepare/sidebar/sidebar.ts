import { ensureEndingSlash, removeLeadingSlash } from "@vuepress/shared";

import { getSidebarInfo } from "./info.js";
import { getSorter } from "./sorter.js";
import { logger } from "../../utils.js";

import type { App } from "@vuepress/core";
import type {
  HopeThemeConfig,
  HopeThemeSidebarArrayConfig,
  HopeThemeSidebarConfig,
  HopeThemeSidebarGroupItem,
  HopeThemeSidebarSorter,
  HopeThemeSidebarInfo,
} from "../../../shared/index.js";

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
    if (info.type === "file") return info.filename;

    return {
      text: info.title,
      prefix: `${info.dirname}/`,
      ...info.groupInfo,
      children: getSidebarItems(info.children),
    };
  });

export const getSidebarData = (
  app: App,
  themeConfig: HopeThemeConfig,
  sorter?: HopeThemeSidebarSorter
): HopeThemeSidebarConfig => {
  const generatePaths: string[] = [];
  const sorters = getSorter(sorter);

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
      getSidebarItems(
        getSidebarInfo({
          pages: app.pages,
          sorters,
          scope: removeLeadingSlash(ensureEndingSlash(path)),
        })
      ),
    ])
  );

  if (app.env.isDebug)
    logger.info(
      `Sidebar structure data: ${JSON.stringify(sidebarData, null, 2)}`
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
