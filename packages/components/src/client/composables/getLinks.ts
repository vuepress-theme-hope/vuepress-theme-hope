import { useRouteLocale } from "@vuepress/client";
import { removeEndingSlash } from "@vuepress/shared";
import type { RouteLocation } from "vue-router";

export const getLinks = (route: RouteLocation): string[] => {
  const routeLocale = useRouteLocale();
  const routePaths = route.path.replace(routeLocale.value, "/").split("/");
  const links: string[] = [];
  let link = removeEndingSlash(routeLocale.value);

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
