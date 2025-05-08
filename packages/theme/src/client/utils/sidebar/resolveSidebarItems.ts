import {
  isArray,
  isPlainObject,
  isString,
  keys,
  startsWith,
} from "@vuepress/helper/client";
import { resolveRoute } from "vuepress/client";

import { sidebarData } from "@temp/theme-hope/sidebar.js";
import type {
  SidebarGroupItem,
  SidebarItem,
  SidebarLinkItem,
} from "@theme-hope/typings/sidebar";
import { isLinkInternal } from "@theme-hope/utils/isLinkInternal";
import { resolveLinkInfo } from "@theme-hope/utils/resolveLinkInfo";
import { resolvePrefix } from "@theme-hope/utils/resolvePrefix";

import type {
  SidebarArrayOptions,
  SidebarItemOptions,
  SidebarObjectOptions,
  SidebarOptions,
} from "../../../shared/index.js";

export interface SidebarArrayItem {
  config: SidebarArrayOptions;
  prefix?: string;
}

/**
 * Resolve sidebar item
 */
export const resolveSidebarItem = (
  item: SidebarItemOptions,
  pathPrefix: string,
): SidebarLinkItem | SidebarGroupItem => {
  const config = isString(item)
    ? resolveLinkInfo(resolvePrefix(pathPrefix, item))
    : isString(item.link)
      ? {
          ...item,
          link: isLinkInternal(item.link)
            ? resolveRoute(resolvePrefix(pathPrefix, item.link)).path
            : item.link,
        }
      : item;

  // Resolved group item
  if ("children" in config) {
    const prefix = resolvePrefix(pathPrefix, config.prefix);

    const children =
      config.children === "structure" ? sidebarData[prefix] : config.children;

    return {
      ...config,
      prefix,
      children: children.map((item) => resolveSidebarItem(item, prefix)),
    };
  }

  return {
    ...config,
  };
};

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = ({
  config,
  prefix = "",
}: SidebarArrayItem): SidebarItem[] =>
  config.map((item) => resolveSidebarItem(item, prefix));

export interface ResolveMultiSidebarOptions {
  config: SidebarObjectOptions;
  routePath: string;
}

/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSidebarItems = ({
  config,
  routePath,
}: ResolveMultiSidebarOptions): SidebarItem[] => {
  const sidebarRoutes = keys(config).sort((x, y) => y.length - x.length);

  // Find matching config
  for (const base of sidebarRoutes)
    if (startsWith(decodeURI(routePath), base)) {
      const matched = config[base];

      return resolveArraySidebarItems({
        config: matched === "structure" ? sidebarData[base] : matched || [],
        prefix: base,
      });
    }

  // eslint-disable-next-line no-console
  console.warn(`${decodeURI(routePath)} is missing it's sidebar config.`);

  return [];
};

export interface ResolveSidebarOptions {
  config: SidebarOptions;
  routeLocale: string;
  routePath: string;
}

/**
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 */
export const resolveSidebarItems = ({
  config,
  routeLocale,
  routePath,
}: ResolveSidebarOptions): SidebarItem[] =>
  // Resolve sidebar items according to the config
  config === "structure"
    ? resolveArraySidebarItems({
        config: sidebarData[routeLocale],
        prefix: routeLocale,
      })
    : isArray(config)
      ? resolveArraySidebarItems({ config })
      : isPlainObject(config)
        ? resolveMultiSidebarItems({ config, routePath })
        : [];
