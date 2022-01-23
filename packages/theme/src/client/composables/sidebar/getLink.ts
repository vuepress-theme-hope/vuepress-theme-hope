import { isFunction, isString } from "@vuepress/shared";

import type { Router } from "vue-router";
import type { AutoLink } from "../../../shared";

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
 * Resolve AutoLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { icon: 'home', text: 'Home', link: '/' }
 */
export const getLink = (router: Router, item: string): AutoLink => {
  const resolved = resolveRouteWithRedirect(router, item);

  return {
    icon: resolved.meta.icon,
    text: resolved.meta.title || item,
    link: resolved.name === "404" ? item : resolved.fullPath,
  };
};
