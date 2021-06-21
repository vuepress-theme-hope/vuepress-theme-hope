import { inject } from "vue";
import {
  usePageData,
  usePageFrontmatter,
  usePagesData,
} from "@vuepress/client";
import {
  isArray,
  isPlainObject,
  isString,
  resolveLocalePath,
} from "@vuepress/shared";
// import { hash } from "@vuepress/utils";
import { getLink } from "./getLink";

import type { ComputedRef, InjectionKey } from "vue";
import type { Router } from "vue-router";
import type { PageHeader } from "@vuepress/client";
import type {
  HopeThemeNormalPageFrontmatter,
  SidebarConfig,
  SidebarConfigArray,
  SidebarConfigObject,
  SidebarItem,
  ResolvedSidebarItem,
  ResolvedSidebarHeaderItem,
  ResolvedSidebarPageItem,
  ResolvedSidebarGroupItem,
} from "../../../shared";

/**
 * Util to transform page header to sidebar item
 */
export const headerToSidebarItem = (
  header: PageHeader,
  sidebarDepth: number
): ResolvedSidebarHeaderItem => {
  const page = usePageData();

  return {
    type: "heading",
    text: header.title,
    link: `${page.value.path}#${header.slug}`,
    children: headersToSidebarItemChildren(header.children, sidebarDepth),
  };
};

export const headersToSidebarItemChildren = (
  headers: PageHeader[],
  sidebarDepth: number
): ResolvedSidebarHeaderItem[] =>
  sidebarDepth > 0
    ? headers.map((header) => headerToSidebarItem(header, sidebarDepth - 1))
    : [];

/**
 * Resolve sidebar items if the config is `auto`
 */
export const resolveAutoSidebarItems = (
  sidebarDepth: number
): ResolvedSidebarGroupItem[] => {
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
  const page = usePageData();

  return [
    {
      type: "group",
      text: page.value.title,
      icon: frontmatter.value.icon,
      children: headersToSidebarItemChildren(page.value.headers, sidebarDepth),
    },
  ];
};

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = async (
  router: Router,
  sidebarConfig: SidebarConfigArray,
  sidebarDepth: number
): Promise<ResolvedSidebarItem[]> => {
  const pages = usePagesData();

  const handleChildItem = async (
    item: SidebarItem
  ): Promise<ResolvedSidebarPageItem | ResolvedSidebarGroupItem> => {
    const childItem = isString(item) ? await getLink(router, item) : item;

    // resolved group item
    if ("children" in childItem) {
      const children = await Promise.all(
        childItem.children.map(async (item) => await handleChildItem(item))
      );

      return {
        type: "group",
        ...childItem,
        children,
      };
    }

    // FIXME: Find a way to get page key
    const pageKey = childItem.link;
    // const pageKey = hash(childItem.link);
    const pageData = pages.value[pageKey] ? await pages.value[pageKey]() : null;

    return {
      type: "page",
      ...childItem,
      children: pageData
        ? headersToSidebarItemChildren(
            // skip h1 header
            pageData.headers[0]?.level === 1
              ? pageData.headers[0].children
              : pageData.headers,
            sidebarDepth
          )
        : [],
    };
  };

  return await Promise.all(sidebarConfig.map((item) => handleChildItem(item)));
};

/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSidebarItems = async (
  router: Router,
  path: string,
  sidebarConfig: SidebarConfigObject,
  sidebarDepth: number
): Promise<ResolvedSidebarItem[]> => {
  const sidebarPath = resolveLocalePath(sidebarConfig, path);
  const matchedSidebarConfig = sidebarConfig[sidebarPath] ?? [];

  return await resolveArraySidebarItems(
    router,
    matchedSidebarConfig,
    sidebarDepth
  );
};

/**
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 */
export const resolveSidebarItems = async (
  router: Router,
  path: string,
  sidebarConfig: SidebarConfig | false | "auto",
  sidebarDepth: number
): Promise<ResolvedSidebarItem[]> =>
  // resolve sidebar items according to the config
  sidebarConfig === false
    ? []
    : sidebarConfig === "auto"
    ? resolveAutoSidebarItems(sidebarDepth)
    : isArray(sidebarConfig)
    ? await resolveArraySidebarItems(router, sidebarConfig, sidebarDepth)
    : isPlainObject(sidebarConfig)
    ? await resolveMultiSidebarItems(router, path, sidebarConfig, sidebarDepth)
    : [];

export type SidebarItemsRef = ComputedRef<ResolvedSidebarItem[]>;

export const sidebarItemsSymbol: InjectionKey<SidebarItemsRef> =
  Symbol.for("sidebarItems");

/**
 * Inject sidebar items global computed
 */
export const useSidebarItems = (): SidebarItemsRef => {
  const sidebarItems = inject(sidebarItemsSymbol);
  if (!sidebarItems) {
    throw new Error("useSidebarItems() is called without provider.");
  }
  return sidebarItems;
};
