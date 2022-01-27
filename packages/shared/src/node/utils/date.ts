import { getDate, timeTransformer } from "../../shared";

import type { Page } from "@vuepress/core";
import type { GitPluginPageData } from "@vuepress/plugin-git";
import type { DateOptions } from "../../shared";

export const injectLocalizedDate = (
  page: Page<{ localizedDate?: string } & Partial<GitPluginPageData>>,
  options: DateOptions
): void => {
  if (!page.data.localizedDate) {
    if (page.frontmatter.date) {
      const date = getDate(page.frontmatter.date, options)?.value;

      if (date) page.data.localizedDate = timeTransformer(date, options);
    } else if (page.data.git?.createdTime)
      page.data.localizedDate = timeTransformer(
        new Date(page.data.git?.createdTime),
        options
      );
  }
};
