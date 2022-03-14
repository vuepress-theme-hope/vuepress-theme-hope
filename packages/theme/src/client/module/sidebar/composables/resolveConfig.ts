import { sidebarData } from "@temp/theme-hope/sidebar";
import {
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
import { useRoute } from "vue-router";

import { useAutoLink, useThemeLocaleData } from "@theme-hope/composables";
import { resolvePrefix } from "./utils";

import type { PageHeader } from "@vuepress/client";
import type {
  HopeThemeNormalPageFrontmatter,
  HopeThemeSidebarArrayConfig,
  HopeThemeSidebarObjectConfig,
  HopeThemeSidebarItem,
  ResolvedSidebarItem,
  ResolvedHopeThemeSidebarHeaderItem,
  ResolvedHopeThemeSidebarPageItem,
  ResolvedHopeThemeSidebarGroupItem,
} from "../../../../shared";

/**
 * Util to transform page header to sidebar item
 */
export const headerToSidebarItem = (
  header: PageHeader,
  headingDepth: number
): ResolvedHopeThemeSidebarHeaderItem => {
  const page = usePageData();

  return {
    type: "heading",
    text: header.title,
    link: `${page.value.path}#${header.slug}`,
    children: headersToSidebarItemChildren(header.children, headingDepth),
  };
};

export const headersToSidebarItemChildren = (
  headers: PageHeader[],
  headingDepth: number
): ResolvedHopeThemeSidebarHeaderItem[] =>
  headingDepth > 0
    ? headers.map((header) => headerToSidebarItem(header, headingDepth - 1))
    : [];

/**
 * Resolve sidebar items if the config is `heading`
 */
export const resolveHeadingSidebarItems = (
  headingDepth: number
): ResolvedHopeThemeSidebarHeaderItem[] => {
  const page = usePageData();

  return headersToSidebarItemChildren(page.value.headers, headingDepth);
};

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (
  sidebarConfig: HopeThemeSidebarArrayConfig,
  headingDepth: number,
  prefix = ""
): ResolvedSidebarItem[] => {
  const page = usePageData();
  const route = useRoute();

  if (!Array.isArray(sidebarConfig)) {
    console.warn(
      `Expecting array, but getting invalid sidebar config${
        prefix ? ` under ${prefix}` : ""
      } with:`,
      sidebarConfig
    );

    return [];
  }

  const handleChildItem = (
    item: HopeThemeSidebarItem,
    pathPrefix = prefix
  ): ResolvedHopeThemeSidebarPageItem | ResolvedHopeThemeSidebarGroupItem => {
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

      if (!Array.isArray(children)) {
        console.warn(
          `Expecting array, but getting invalid sidebar config${
            prefix ? ` under ${prefix}` : ""
          } with:`,
          children
        );

        return {
          type: "group",
          ...childItem,
          children: [],
        };
      }

      return {
        type: "group",
        ...childItem,
        children: children.map((item) => handleChildItem(item, prefix)),
      };
    }

    return {
      type: "page",
      ...childItem,
      children:
        // if the sidebar item is current page and children is not set
        // use headers of current page as children
        childItem.link === route.path
          ? headersToSidebarItemChildren(
              // skip h1 header
              page.value.headers[0]?.level === 1
                ? page.value.headers[0].children
                : page.value.headers,
              headingDepth
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
  sidebarConfig: HopeThemeSidebarObjectConfig,
  headingDepth: number
): ResolvedSidebarItem[] => {
  const route = useRoute();
  const keys = Object.keys(sidebarConfig).sort((x, y) => y.length - x.length);

  // find matching config
  for (const base of keys) {
    if (decodeURI(route.path).startsWith(base)) {
      const matchedConfig = sidebarConfig[base];

      return matchedConfig
        ? resolveArraySidebarItems(
            matchedConfig === "structure" ? sidebarData[base] : matchedConfig,
            headingDepth,
            base
          )
        : [];
    }
  }

  console.warn(`${route.path} do not have valid sidebar config`);

  return [];
};

/**
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 */
export const resolveSidebarItems = (): ResolvedSidebarItem[] => {
  const routeLocale = useRouteLocale();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
  const themeLocale = useThemeLocaleData();

  // get sidebar config from frontmatter > themeConfig
  const sidebarConfig = frontmatter.value.home
    ? false
    : frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? "structure";
  const headingDepth =
    frontmatter.value.headingDepth ?? themeLocale.value.headingDepth ?? 2;

  // resolve sidebar items according to the config
  return sidebarConfig === false
    ? []
    : sidebarConfig === "heading"
    ? resolveHeadingSidebarItems(headingDepth)
    : sidebarConfig === "structure"
    ? resolveArraySidebarItems(
        sidebarData[routeLocale.value],
        headingDepth,
        routeLocale.value
      )
    : isArray(sidebarConfig)
    ? resolveArraySidebarItems(sidebarConfig, headingDepth)
    : isPlainObject(sidebarConfig)
    ? resolveMultiSidebarItems(sidebarConfig, headingDepth)
    : [];
};
