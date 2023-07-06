import { getPageText, stripTags } from "vuepress-shared/node";

import type { ExtendPage } from "./typings/index.js";

export const generateDescription = (
  page: ExtendPage,
  autoDescription = true,
): void => {
  // generate description
  if (!page.frontmatter.description && autoDescription) {
    if (page.data.excerpt) {
      page.frontmatter.description = stripTags(page.data.excerpt)
        // convert link breaks into spaces
        .replace(/(?:\r?\n)+/g, " ")
        // convert 2 or more spaces into 1
        .replace(/ +/g, " ")
        .trim();
    } else {
      const pageText = getPageText(page);

      page.frontmatter.description =
        pageText.length > 180 ? `${pageText.slice(0, 177)}...` : pageText;
    }

    page.data.autoDesc = true;
  }
};
