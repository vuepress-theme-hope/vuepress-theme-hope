import type { RouteLocationNormalizedLoaded } from "vuepress/client";
import { isActiveLink } from "vuepress-shared/client";

import type { AutoLinkOptions } from "../../shared/nav.js";

export const isActiveItem = (
  route: RouteLocationNormalizedLoaded,
  item: Partial<AutoLinkOptions>,
): boolean =>
  item.activeMatch
    ? new RegExp(item.activeMatch, "u").test(route.path)
    : isActiveLink(route, item.link);
