import { removeEndingSlash } from "@vuepress/shared";
import type { RouteLocation } from "vue-router";

export const getAncestorLinks = (
  route: RouteLocation,
  routeLocale: string
): string[] => {
  const routePaths = route.path.replace(routeLocale, "/").split("/");
  const links: string[] = [];
  let link = removeEndingSlash(routeLocale);

  // generate links
  routePaths.forEach((element, index) => {
    if (index !== routePaths.length - 1) {
      link += `${element}/`;
      links.push(link);
    } else if (element !== "") {
      link += element;
      links.push(link);
    }
  });

  return links;
};
