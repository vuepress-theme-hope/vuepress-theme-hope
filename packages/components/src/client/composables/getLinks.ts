import { RouteLocation } from "vue-router";

export const getLinks = (route: RouteLocation): string[] => {
  const routePaths = route.path.split("/");
  const links: string[] = [];
  let link = "";

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
