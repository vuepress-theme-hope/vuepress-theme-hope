/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  isArray,
  isLinkExternal,
  isPlainObject,
  isString,
  keys,
  startsWith,
} from "@vuepress/helper/client";
import type { PageData } from "vuepress/client";

import { sidebarData } from "@temp/theme-hope/sidebar.js";
import { resolveLinkInfo, resolvePrefix } from "@theme-hope/utils/index";

import type {
  SidebarArrayOptions,
  SidebarItem,
  SidebarObjectOptions,
  SidebarOptions,
} from "../../../../shared/index.js";
import type {
  ResolvedSidebarGroupItem,
  ResolvedSidebarItem,
  ResolvedSidebarPageItem,
} from "../utils/index.js";

export interface ResolveArraySidebarOptions {
  config: SidebarArrayOptions;
  page: PageData;
  headerDepth: number;
  prefix?: string;
}

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = ({
  config,
  prefix = "",
}: ResolveArraySidebarOptions): ResolvedSidebarItem[] => {
  const handleChildItem = (
    item: SidebarItem,
    pathPrefix = prefix,
  ): ResolvedSidebarPageItem | ResolvedSidebarGroupItem => {
    const childItem = isString(item)
      ? resolveLinkInfo(resolvePrefix(pathPrefix, item))
      : item.link
        ? {
            ...item,
            ...(isLinkExternal(item.link)
              ? {}
              : {
                  link: resolveLinkInfo(resolvePrefix(pathPrefix, item.link))
                    .link,
                }),
          }
        : item;

    // Resolved group item
    if ("children" in childItem) {
      const prefix = resolvePrefix(pathPrefix, childItem.prefix);

      const children =
        childItem.children === "structure"
          ? sidebarData[prefix]
          : childItem.children;

      return {
        type: "group",
        ...childItem,
        prefix,
        children: children.map((item) => handleChildItem(item, prefix)),
      };
    }

    return {
      type: "page",
      ...childItem,
    };
  };

  return config.map((item) => handleChildItem(item));
};

export interface ResolveMultiSidebarOptions {
  config: SidebarObjectOptions;
  page: PageData;
  headerDepth: number;
}

/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSidebarItems = ({
  config,
  page,
  headerDepth,
}: ResolveMultiSidebarOptions): ResolvedSidebarItem[] => {
  const sidebarRoutes = keys(config).sort((x, y) => y.length - x.length);

  // Find matching config
  for (const base of sidebarRoutes)
    if (startsWith(decodeURI(page.path), base)) {
      const matched = config[base];

      return matched
        ? resolveArraySidebarItems({
            config:
              matched === "structure"
                ? <SidebarArrayOptions>sidebarData[base]
                : matched,
            page,
            headerDepth,
            prefix: base,
          })
        : [];
    }

  console.warn(`${page.path} is missing sidebar config.`);

  return [];
};

export interface ResolveSidebarOptions {
  config: SidebarOptions;
  routeLocale: string;
  page: PageData;
  headerDepth: number;
}

/**
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 */
export const resolveSidebarItems = ({
  config,
  routeLocale,
  page,
  headerDepth,
}: ResolveSidebarOptions): ResolvedSidebarItem[] =>
  // Resolve sidebar items according to the config
  config === "structure"
    ? resolveArraySidebarItems({
        config: <SidebarArrayOptions>sidebarData[routeLocale],
        page,
        headerDepth,
        prefix: routeLocale,
      })
    : isArray(config)
      ? resolveArraySidebarItems({ config, page, headerDepth })
      : isPlainObject(config)
        ? resolveMultiSidebarItems({ config, page, headerDepth })
        : [];
