/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  type PageHeader,
  usePageData,
  usePageFrontmatter,
  useRouteLocale,
} from "@vuepress/client";
import {
  isArray,
  isLinkExternal,
  isPlainObject,
  isString,
} from "@vuepress/shared";
import { keys, startsWith } from "vuepress-shared/client";

import { sidebarData } from "@temp/theme-hope/sidebar";
import { useAutoLink, useThemeLocaleData } from "@theme-hope/composables/index";

import { resolvePrefix } from "./utils.js";
import {
  type SidebarArrayOptions,
  type SidebarItem,
  type SidebarObjectOptions,
  type ThemeNormalPageFrontmatter,
} from "../../../../shared/index.js";
import {
  type ResolvedSidebarGroupItem,
  type ResolvedSidebarHeaderItem,
  type ResolvedSidebarItem,
  type ResolvedSidebarPageItem,
} from "../utils/index.js";

/**
 * Util to transform page header to sidebar item
 */
export const headerToSidebarItem = (
  header: PageHeader,
  headerDepth: number
): ResolvedSidebarHeaderItem => {
  const page = usePageData();

  return {
    type: "heading",
    text: header.title,
    link: `${page.value.path}#${header.slug}`,
    children: headersToSidebarItemChildren(header.children, headerDepth),
  };
};

export const headersToSidebarItemChildren = (
  headers: PageHeader[],
  headerDepth: number
): ResolvedSidebarHeaderItem[] =>
  headerDepth > 0
    ? headers.map((header) => headerToSidebarItem(header, headerDepth - 1))
    : [];

/**
 * Resolve sidebar items if the config is `heading`
 */
export const resolveHeadingSidebarItems = (
  headerDepth: number
): ResolvedSidebarHeaderItem[] => {
  const page = usePageData();

  return headersToSidebarItemChildren(page.value.headers, headerDepth);
};

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (
  sidebarConfig: SidebarArrayOptions,
  headerDepth: number,
  prefix = ""
): ResolvedSidebarItem[] => {
  const page = usePageData();

  const handleChildItem = (
    item: SidebarItem,
    pathPrefix = prefix
  ): ResolvedSidebarPageItem | ResolvedSidebarGroupItem => {
    const childItem = isString(item)
      ? useAutoLink(resolvePrefix(pathPrefix, item))
      : item.link
      ? {
          ...item,
          ...(!isLinkExternal(item.link)
            ? { link: useAutoLink(resolvePrefix(pathPrefix, item.link)).link }
            : {}),
        }
      : item;

    // resolved group item
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
      children:
        // if the sidebar item is current page and children is not set
        // use headers of current page as children
        childItem.link === page.value.path
          ? headersToSidebarItemChildren(
              // skip h1 header
              page.value.headers[0]?.level === 1
                ? page.value.headers[0].children
                : page.value.headers,
              headerDepth
            )
          : [],
    };
  };

  return sidebarConfig.map((item) => handleChildItem(item));
};

/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSidebarItems = (
  sidebarConfig: SidebarObjectOptions,
  headerDepth: number
): ResolvedSidebarItem[] => {
  const page = usePageData();
  const sidebarRoutes = keys(sidebarConfig).sort((x, y) => y.length - x.length);

  // find matching config
  for (const base of sidebarRoutes)
    if (startsWith(decodeURI(page.value.path), base)) {
      const matchedConfig = sidebarConfig[base];

      return matchedConfig
        ? resolveArraySidebarItems(
            matchedConfig === "structure"
              ? sidebarData[base]
              : matchedConfig === "heading"
              ? resolveHeadingSidebarItems(headerDepth)
              : matchedConfig,
            headerDepth,
            base
          )
        : [];
    }

  console.warn(`${page.value.path} is missing sidebar config.`);

  return [];
};

/**
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 */
export const resolveSidebarItems = (): ResolvedSidebarItem[] => {
  const routeLocale = useRouteLocale();
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
  const themeLocale = useThemeLocaleData();

  // get sidebar config from frontmatter > themeConfig
  const sidebarConfig = frontmatter.value.home
    ? false
    : frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? "structure";
  const headerDepth =
    frontmatter.value.headerDepth ?? themeLocale.value.headerDepth ?? 2;

  // resolve sidebar items according to the config
  return sidebarConfig === false
    ? []
    : sidebarConfig === "heading"
    ? resolveHeadingSidebarItems(headerDepth)
    : sidebarConfig === "structure"
    ? resolveArraySidebarItems(
        sidebarData[routeLocale.value],
        headerDepth,
        routeLocale.value
      )
    : isArray(sidebarConfig)
    ? resolveArraySidebarItems(sidebarConfig, headerDepth)
    : isPlainObject(sidebarConfig)
    ? resolveMultiSidebarItems(sidebarConfig, headerDepth)
    : [];
};
