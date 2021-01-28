import type { PageHeader } from "@mr-hope/vuepress-types";

export interface SidebarHeader extends PageHeader {
  children?: PageHeader[];
}

/** Group lower level headings under h2 children */
export const groupHeaders = (headers: PageHeader[]): SidebarHeader[] => {
  const headerscopy = headers.map((header) => ({ ...header }));
  let lastH2: SidebarHeader;

  // group other headings under h2 headings
  headerscopy.forEach((header) => {
    if (header.level === 2) lastH2 = header;
    else if (lastH2) {
      if (!lastH2.children) lastH2.children = [];
      lastH2.children.push(header);
    }
  });

  // filter only h2 headings
  return headerscopy.filter((header) => header.level === 2);
};
