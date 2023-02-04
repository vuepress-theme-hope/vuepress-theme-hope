import { removeEndingSlash } from "@vuepress/shared";

export const getAncestorLinks = (
  path: string,
  routeLocale: string
): string[] => {
  const routePaths = path.replace(routeLocale, "/").split("/");
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
