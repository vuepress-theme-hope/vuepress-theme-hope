import { removeEndingSlash } from "@vuepress/helper/client";

export const getAncestorLinks = (
  path: string,
  routeLocale: string,
): { link: string; name: string }[] => {
  const routePaths = path.replace(routeLocale, "/").split("/");
  const result: { link: string; name: string }[] = [];
  let link = removeEndingSlash(routeLocale);

  // Generate links
  routePaths.forEach((name, index) => {
    if (index !== routePaths.length - 1) {
      link += `${name}/`;
      result.push({ link, name: name || "Home" });
    } else if (name !== "") {
      link += name;
      result.push({ link, name });
    }
  });

  return result;
};
