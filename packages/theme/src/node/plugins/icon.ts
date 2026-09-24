import { isArray, isPlainObject } from "@vuepress/helper";
import type { IconPluginOptions } from "@vuepress/plugin-icon";
import { iconPlugin } from "@vuepress/plugin-icon";
import type { Plugin } from "vuepress/core";

import type { ThemeData } from "../../shared/index.js";

/**
 * Front matter paths of the icons used by the theme
 *
 * 主题所用的图标所在的 Front matter 路径
 *
 * The icons are detected from the page content automatically, so only the icons stored in the front
 * matter fields of the theme need to be scanned.
 *
 * 图标会从页面内容中自动检测，因此这里只需扫描存储在主题 Front matter 字段中的图标。
 */
const ICON_FRONTMATTER_PATHS = [
  // Base page
  "icon",
  "dir.icon",
  "prev.icon",
  "next.icon",

  // Project home
  "actions[*].icon",
  "features[*].icon",
  "highlights[*].features[*].icon",
  "highlights[*].highlights[*].icon",

  // Blog home
  "projects[*].icon",

  // Portfolio
  "medias[*].icon",
];

/**
 * Collect the icons used by the theme config
 *
 * 收集主题配置中使用的图标
 *
 * The icons of navbar, sidebar and blog medias are stored in the theme config instead of the pages,
 * so they cannot be detected from the pages.
 *
 * 导航栏、侧边栏与博客媒体的图标存储在主题配置而非页面中，因此无法从页面中检测。
 *
 * @param themeData - Theme data / 主题数据
 * @returns Icons used by the theme config / 主题配置中使用的图标
 */
const getThemeIcons = (themeData: ThemeData): string[] => {
  const icons = new Set<string>();

  const walk = (value: unknown): void => {
    if (isArray(value)) {
      value.forEach((item) => {
        walk(item);
      });

      return;
    }

    if (!isPlainObject(value)) return;

    for (const [key, item] of Object.entries(value)) {
      if (key === "icon" && typeof item === "string") icons.add(item);
      else walk(item);
    }
  };

  Object.values(themeData.locales).forEach((locale) => {
    walk(locale);
  });

  return [...icons];
};

/**
 * Resolve options for `@vuepress/plugin-icon`
 *
 * `@vuepress/plugin-icon` 的选项处理
 *
 * @param themeData - Theme data / 主题数据
 * @param options - Icon plugin options or a boolean to enable it with default options /
 *   图标插件选项，或用于以默认选项启用它的布尔值
 * @returns Icon plugin instance or null / 图标插件实例或 null
 */
export const getIconPlugin = (
  themeData: ThemeData,
  options?: Omit<IconPluginOptions, "component"> | boolean,
): Plugin | null => {
  if (options === false) return null;

  const { scan, ...rest } = isPlainObject(options) ? options : {};

  const themeIcons = getThemeIcons(themeData);

  return iconPlugin({
    ...rest,
    // force to use VPIcon component
    component: "VPIcon",
    scan: {
      ...scan,
      // include the icons used by the theme front matter
      frontmatter: [...new Set([...ICON_FRONTMATTER_PATHS, ...(scan?.frontmatter ?? [])])],
      scanner: async (app) => {
        const icons = [...themeIcons];
        const iconsFromUser = scan?.scanner ? await scan.scanner(app) : [];

        if (isArray(iconsFromUser))
          icons.push(...iconsFromUser.filter((icon) => typeof icon === "string"));

        return icons;
      },
    },
  });
};
