import type { Page } from "@vuepress/core";
import type { HopeThemePageData } from "../shared";

export const extendsPage = (page: Page<HopeThemePageData>): void => {
  // save relative file path into page data to generate edit link
  page.data.filePathRelative = page.filePathRelative;
  // save basic info to routeMeta
  page.routeMeta = {
    ...page.routeMeta,
    title: page.title,
    icon: page.frontmatter.icon,
    // author: page.frontmatter.author,
    // category: page.frontmatter.category || page.frontmatter.categories,
    // tag: page.frontmatter.tags || page.frontmatter.tag,
  };
};
