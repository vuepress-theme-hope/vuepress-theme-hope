import { usePagesData } from "@vuepress/client";
import { isFunction, isString } from "@vuepress/shared";
// import { hash } from "@vuepress/utils";

import type { Router } from "vue-router";
import type { NavLink } from "../../../shared";

/**
 * Resolve a route with redirection
 */
export const resolveRouteWithRedirect = (
  router: Router,
  ...args: Parameters<Router["resolve"]>
): ReturnType<Router["resolve"]> => {
  const route = router.resolve(...args);
  const lastMatched = route.matched[route.matched.length - 1];
  if (!lastMatched?.redirect) {
    return route;
  }
  const { redirect } = lastMatched;
  const resolvedRedirect = isFunction(redirect) ? redirect(route) : redirect;
  const resolvedRedirectObj = isString(resolvedRedirect)
    ? { path: resolvedRedirect }
    : resolvedRedirect;

  return resolveRouteWithRedirect(router, {
    hash: route.hash,
    query: route.query,
    params: route.params,
    ...resolvedRedirectObj,
  });
};

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { icon: 'home', text: 'Home', link: '/' }
 */
export const getLink = async (
  router: Router,
  item: string
): Promise<NavLink> => {
  const resolved = resolveRouteWithRedirect(router, item);
  const pages = usePagesData();
  // FIXME: Find a way to get page key
  const pageKey = resolved.path;
  // const pageKey = hash(resolved.path);

  return {
    icon: (await pages.value[pageKey]?.())?.frontmatter.icon as
      | string
      | undefined,
    text: resolved.meta.title || item,
    link: resolved.name === "404" ? item : resolved.fullPath,
  };
};
